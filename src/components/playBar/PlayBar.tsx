
import { useCallback, useEffect, useRef, useState } from "react";

import {
    Box,
    Paper,
    Typography,
    IconButton,
    Slider,
} from "@mui/material";

import {
    IoPlay,
    IoPause,
    IoPlaySkipBack,
    IoPlaySkipForward,
    IoShuffle,
    IoRepeat,
    IoHeartOutline,
    IoVolumeHigh,
    IoHeart,
} from "react-icons/io5";

import { useTracks } from "../../hooks/useTracks";
import { supabase } from "../../services/supabase";

import { useAppDispatch, useAppSelector } from "../../store/Hooks";
import {
    setIsPlaying,
    setCurrentTrack,
} from "../../features/player/PlayerSlice";

// تبدیل ثانیه به دقیقه و ثانیه
const formatTime = (seconds: number) => {
    if (!Number.isFinite(seconds)) return "0:00";

    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);

    return `${min}:${sec.toString().padStart(2, "0")}`;
};

export function PlayBar() {
    const {
        data: tracks,
        isLoading,
        isError,
        error,
    } = useTracks();

    const dispatch = useAppDispatch();

    // اطلاعات پلیر از Redux
    const currentTrackId = useAppSelector(
        (state) => state.player.currentTrackId
    );

    const isPlaying = useAppSelector(
        (state) => state.player.isPlaying
    );

    const audioRef = useRef<HTMLAudioElement>(null);

    // آهنگ‌های دریافت‌شده
    const availableTracks = tracks ?? [];

    const currentIndex = availableTracks.findIndex(
        (track) => track.id === currentTrackId
    );

    const currentTrack = availableTracks.find(
        (track) => track.id === currentTrackId
    );

    // Stateهای مربوط به رابط کاربری
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(70);

    const [isLiked, setIsLiked] = useState(false);
    const [isShuffle, setIsShuffle] = useState(false);
    const [isRepeat, setIsRepeat] = useState(false);

    const [audioUrl, setAudioUrl] = useState("");
    const [isAudioLoading, setIsAudioLoading] = useState(false);
    const [audioError, setAudioError] = useState("");

    // دریافت آدرس فایل صوتی
    const getAudioUrl = useCallback(async (path: string) => {
        if (path.startsWith("http://") || path.startsWith("https://")) {
            return path;
        }

        const { data, error } = await supabase.storage
            .from("music-files")
            .createSignedUrl(path, 3600);

        if (error) {
            throw new Error(error.message);
        }

        return data.signedUrl;
    }, []);

    // بارگذاری آهنگ انتخاب‌شده
    useEffect(() => {
        if (!currentTrack) return;

        let cancelled = false;

        const loadAudio = async () => {
            setAudioUrl("");
            setCurrentTime(0);
            setDuration(0);
            setAudioError("");
            setIsLiked(false);
            setIsAudioLoading(true);

            // توقف آهنگ قبلی
            audioRef.current?.pause();

            try {
                const url = await getAudioUrl(currentTrack.audio_url);

                if (!cancelled) {
                    setAudioUrl(url);
                }
            } catch (error) {
                if (!cancelled) {
                    const message =
                        error instanceof Error
                            ? error.message
                            : "خطا در دریافت فایل صوتی";

                    setAudioError(message);
                    console.error("Audio URL error:", error);
                }
            } finally {
                if (!cancelled) {
                    setIsAudioLoading(false);
                }
            }
        };

        loadAudio();

        return () => {
            cancelled = true;
        };
    }, [currentTrack?.id, currentTrack?.audio_url, getAudioUrl]);

    // هماهنگ کردن وضعیت Redux با تگ Audio
    // اگر آهنگ انتخاب شده و isPlaying برابر true باشد، خودکار پخش می‌شود.
    useEffect(() => {
        const audio = audioRef.current;

        if (!audio || !audioUrl) return;

        let cancelled = false;

        if (isPlaying) {
            const playAudio = async () => {
                try {
                    await audio.play();
                } catch (error) {
                    if (!cancelled) {
                        console.error("Playback error:", error);
                        dispatch(setIsPlaying(false));
                    }
                }
            };

            playAudio();
        } else {
            audio.pause();
        }

        return () => {
            cancelled = true;
        };
    }, [audioUrl, isPlaying, dispatch]);

    // تنظیم صدا
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume / 100;
        }
    }, [volume]);

    // Play / Pause
    const handlePlay = () => {
        if (!audioUrl || isAudioLoading) return;

        dispatch(setIsPlaying(!isPlaying));
    };

    // آهنگ بعدی
    const handleNext = () => {
        if (!availableTracks.length || currentIndex < 0) return;

        // اگر فقط یک آهنگ وجود دارد
        if (availableTracks.length === 1) {
            if (audioRef.current) {
                audioRef.current.currentTime = 0;
                dispatch(setIsPlaying(true));
            }
            return;
        }

        let nextIndex: number;

        if (isShuffle) {
            do {
                nextIndex = Math.floor(
                    Math.random() * availableTracks.length
                );
            } while (nextIndex === currentIndex);
        } else {
            nextIndex = (currentIndex + 1) % availableTracks.length;
        }

        dispatch(setCurrentTrack(availableTracks[nextIndex].id));
    };

    // آهنگ قبلی
    const handlePrevious = () => {
        if (!availableTracks.length || currentIndex < 0) return;

        if (audioRef.current && audioRef.current.currentTime > 3) {
            audioRef.current.currentTime = 0;
            setCurrentTime(0);
            return;
        }

        const previousIndex =
            (currentIndex - 1 + availableTracks.length) %
            availableTracks.length;

        dispatch(setCurrentTrack(availableTracks[previousIndex].id));
    };

    // جابه‌جایی در تایم‌لاین
    const handleSeek = (
        _: Event,
        value: number | number[]
    ) => {
        const newValue = value as number;

        if (audioRef.current) {
            audioRef.current.currentTime = newValue;
        }

        setCurrentTime(newValue);
    };

    // پایان آهنگ
    const handleEnded = async () => {
        if (isRepeat && audioRef.current) {
            audioRef.current.currentTime = 0;

            try {
                await audioRef.current.play();
            } catch (error) {
                console.error("Playback error:", error);
                dispatch(setIsPlaying(false));
            }
        } else {
            handleNext();
        }
    };

    // قبل از انتخاب آهنگ، PlayBar نمایش داده نمی‌شود
    if (currentTrackId === null) {
        return null;
    }

    if (isLoading) {
        return (
            <Paper
                sx={{
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: 60,
                    zIndex: 1000,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "#20212B",
                    color: "#fff",
                }}
            >
                در حال دریافت آهنگ‌ها...
            </Paper>
        );
    }

    if (isError) {
        console.error("Tracks error:", error);

        return (
            <Paper
                sx={{
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: 60,
                    zIndex: 1000,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "#20212B",
                    color: "#fff",
                }}
            >
                خطا در دریافت آهنگ‌ها
            </Paper>
        );
    }

    if (!currentTrack) return null;

    return (
        <Paper
            elevation={4}
            sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                width: "100%",
                height: { xs: 105, sm: 100, md: 60 },
                zIndex: 1000,
                display: "flex",
                flexDirection: "row",
                flexWrap: { xs: "wrap", md: "nowrap" },
                alignItems: "center",
                alignContent: "center",
                justifyContent: "space-between",
                px: { xs: 1, sm: 2, md: 3 },
                py: { xs: 1, sm: 1, md: 0 },
                gap: { xs: 0.5, md: 3 },
                color: "#fff",
                borderRadius: 0,
                borderTop: "1px solid rgba(255,255,255,0.08)",
                boxSizing: "border-box",
            }}
        >
            {/* Audio */}
            <audio
                ref={audioRef}
                src={audioUrl || undefined}
                preload="metadata"
                onTimeUpdate={() => {
                    if (audioRef.current) {
                        setCurrentTime(audioRef.current.currentTime);
                    }
                }}
                onLoadedMetadata={() => {
                    if (audioRef.current) {
                        setDuration(audioRef.current.duration);
                    }
                }}
                onPlay={() => dispatch(setIsPlaying(true))}
                onEnded={handleEnded}
                onError={() => {
                    if (audioUrl) {
                        setAudioError("خطا در بارگذاری فایل صوتی");
                        console.error("Audio file could not be loaded.");
                    }
                }}
            />

            {/* Left: Current Track */}
            <Box
                sx={{
                    width: { xs: "45%", md: "25%" },
                    minWidth: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: { xs: 0.8, md: 1.5 },
                    order: { xs: 1, md: 1 },
                }}
            >
                <Box
                    component="img"
                    src={currentTrack.cover_url || ""}
                    alt={currentTrack.title || "Track cover"}
                    sx={{
                        width: { xs: 34, sm: 38, md: 42 },
                        height: { xs: 34, sm: 38, md: 42 },
                        borderRadius: 2,
                        objectFit: "cover",
                        flexShrink: 0,
                    }}
                />

                <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography
                        sx={{
                            fontSize: { xs: 10, sm: 12, md: 15 },
                            fontWeight: 600,
                        }}
                        noWrap
                    >
                        {currentTrack.title}
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: { xs: 9, sm: 11, md: 13 },
                            color: "#A4A5B2",
                        }}
                        noWrap
                    >
                        {currentTrack.artists?.name ?? "Unknown Artist"}
                    </Typography>

                    {audioError && (
                        <Typography
                            sx={{ fontSize: 10, color: "#ff7777" }}
                            noWrap
                        >
                            {audioError}
                        </Typography>
                    )}
                </Box>
            </Box>

            {/* Right: Extra Controls */}
            <Box
                sx={{
                    width: { xs: "50%", md: "20%" },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    gap: { xs: 0, md: 1 },
                    flexShrink: 0,
                    order: { xs: 2, md: 3 },
                }}
            >
                <IconButton
                    onClick={() => setIsLiked((prev) => !prev)}
                    sx={{
                        color: isLiked ? "#F25912" : "#E5E5EB",
                        p: { xs: 0.5, md: 1 },
                    }}
                >
                    {isLiked ? (
                        <IoHeart size={21} />
                    ) : (
                        <IoHeartOutline size={21} />
                    )}
                </IconButton>

                <IconButton
                    onClick={() => setIsShuffle((prev) => !prev)}
                    sx={{
                        color: isShuffle ? "#F25912" : "#E5E5EB",
                        p: { xs: 0.5, md: 1 },
                    }}
                >
                    <IoShuffle size={21} />
                </IconButton>

                <IconButton
                    onClick={() => setIsRepeat((prev) => !prev)}
                    sx={{
                        color: isRepeat ? "#F25912" : "#E5E5EB",
                        p: { xs: 0.5, md: 1 },
                    }}
                >
                    <IoRepeat size={21} />
                </IconButton>

                <Box
                    sx={{
                        display: { xs: "none", md: "flex" },
                        alignItems: "center",
                        gap: 1,
                        width: 110,
                    }}
                >
                    <IoVolumeHigh size={21} />

                    <Slider
                        size="small"
                        min={0}
                        max={100}
                        value={volume}
                        onChange={(_, value) =>
                            setVolume(value as number)
                        }
                        sx={{
                            color: "#E5E5EB",
                            height: 3,
                            "& .MuiSlider-thumb": {
                                width: 10,
                                height: 10,
                                bgcolor: "#fff",
                            },
                            "& .MuiSlider-rail": {
                                bgcolor: "#555663",
                                opacity: 1,
                            },
                        }}
                    />
                </Box>
            </Box>

            {/* Center: Playback Controls and Progress */}
            <Box
                sx={{
                    flex: { xs: "1 1 100%", md: 1 },
                    minWidth: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: { xs: 1, md: 3 },
                    order: { xs: 3, md: 2 },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: { xs: 0, md: 1 },
                        flexShrink: 0,
                    }}
                >
                    <IconButton
                        onClick={handlePrevious}
                        disabled={!availableTracks.length}
                        sx={{
                            color: "#E5E5EB",
                            p: { xs: 0.5, md: 1 },
                        }}
                    >
                        <IoPlaySkipBack size={21} />
                    </IconButton>

                    <IconButton
                        onClick={handlePlay}
                        disabled={!audioUrl || isAudioLoading}
                        sx={{
                            width: { xs: 34, md: 42 },
                            height: { xs: 34, md: 42 },
                            bgcolor: "#51525F",
                            color: "#fff",
                            border: "1px solid rgba(255,255,255,0.12)",
                            "&:hover": {
                                bgcolor: "#696A78",
                                transform: "scale(1.05)",
                            },
                            "&.Mui-disabled": {
                                bgcolor: "#41424D",
                                color: "#999",
                            },
                            transition: "all 0.2s ease",
                        }}
                    >
                        {isPlaying ? (
                            <IoPause size={23} />
                        ) : (
                            <IoPlay size={23} />
                        )}
                    </IconButton>

                    <IconButton
                        onClick={handleNext}
                        disabled={!availableTracks.length}
                        sx={{
                            color: "#E5E5EB",
                            p: { xs: 0.5, md: 1 },
                        }}
                    >
                        <IoPlaySkipForward size={21} />
                    </IconButton>
                </Box>

                {/* Progress */}
                <Box
                    sx={{
                        flex: 1,
                        minWidth: 0,
                        display: "flex",
                        alignItems: "center",
                        gap: { xs: 0.5, md: 1 },
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: 10,
                            color: "#A4A5B2",
                            minWidth: 30,
                            display: { xs: "none", sm: "block" },
                        }}
                    >
                        {formatTime(currentTime)}
                    </Typography>

                    <Slider
                        size="small"
                        min={0}
                        max={duration || 100}
                        value={Math.min(currentTime, duration || 100)}
                        onChange={handleSeek}
                        disabled={!duration}
                        sx={{
                            color: "#E7E7EC",
                            height: 3,
                            py: 1,
                            "& .MuiSlider-thumb": {
                                width: 11,
                                height: 11,
                                bgcolor: "#fff",
                                boxShadow: "0 0 5px rgba(255,255,255,0.3)",
                            },
                            "& .MuiSlider-track": {
                                bgcolor: "#E7E7EC",
                                border: "none",
                            },
                            "& .MuiSlider-rail": {
                                bgcolor: "#555663",
                                opacity: 1,
                            },
                        }}
                    />

                    <Typography
                        sx={{
                            fontSize: 10,
                            color: "#A4A5B2",
                            minWidth: 30,
                            textAlign: "right",
                            display: { xs: "none", sm: "block" },
                        }}
                    >
                        {formatTime(duration)}
                    </Typography>
                </Box>
            </Box>
        </Paper>
    );
}
