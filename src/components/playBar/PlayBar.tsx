
import { useEffect, useRef, useState } from "react";

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

// Format time
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

    const audioRef = useRef<HTMLAudioElement>(null);

    // Tracks received from Supabase
    const availableTracks = tracks ?? [];

    // States
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(70);
    const [isLiked, setIsLiked] = useState(false);
    const [isShuffle, setIsShuffle] = useState(false);
    const [isRepeat, setIsRepeat] = useState(false);

    // Audio URL
    const [audioUrl, setAudioUrl] = useState("");
    const [isAudioLoading, setIsAudioLoading] = useState(false);

    const currentTrack = availableTracks[currentIndex];

    // Get playable URL
    const getAudioUrl = async (path: string) => {
        // If audio_url is already a complete URL
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
    };

    // Load audio when track changes
    useEffect(() => {
        let cancelled = false;

        const loadAudio = async () => {
            setAudioUrl("");
            setCurrentTime(0);
            setDuration(0);
            setIsPlaying(false);

            audioRef.current?.pause();

            if (!currentTrack?.audio_url) {
                setIsAudioLoading(false);
                return;
            }

            try {
                setIsAudioLoading(true);

                const url = await getAudioUrl(currentTrack.audio_url);

                if (!cancelled) {
                    setAudioUrl(url);
                }
            } catch (error) {
                console.error("Audio URL error:", error);
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
    }, [currentTrack?.id, currentTrack?.audio_url]);

    // Volume
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume / 100;
        }
    }, [volume]);

    // Play / Pause
    const handlePlay = async () => {
        if (!audioRef.current || !audioUrl) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            try {
                await audioRef.current.play();
                setIsPlaying(true);
            } catch (error) {
                console.error("Playback error:", error);
            }
        }
    };

    // Next Track
    const handleNext = () => {
        if (!availableTracks.length) return;

        let nextIndex: number;

        if (isShuffle && availableTracks.length > 1) {
            do {
                nextIndex = Math.floor(
                    Math.random() * availableTracks.length
                );
            } while (nextIndex === currentIndex);
        } else {
            nextIndex = (currentIndex + 1) % availableTracks.length;
        }

        setCurrentIndex(nextIndex);
    };

    // Previous Track
    const handlePrevious = () => {
        if (!availableTracks.length) return;

        if (audioRef.current && audioRef.current.currentTime > 3) {
            audioRef.current.currentTime = 0;
            setCurrentTime(0);
            return;
        }

        setCurrentIndex(
            (currentIndex - 1 + availableTracks.length) %
                availableTracks.length
        );
    };

    // Seek
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

    // Track Ended
    const handleEnded = async () => {
        if (isRepeat && audioRef.current) {
            audioRef.current.currentTime = 0;

            try {
                await audioRef.current.play();
            } catch (error) {
                console.error("Playback error:", error);
            }
        } else {
            handleNext();
        }
    };

    // Loading
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

    // Error
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

    return (
        <Paper
            elevation={4}
            sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                width: "100%",
                height: {
                    xs: 105,
                    sm: 100,
                    md: 60,
                },
                zIndex: 1000,
                display: "flex",
                flexDirection: "row",
                flexWrap: {
                    xs: "wrap",
                    md: "nowrap",
                },
                alignItems: "center",
                alignContent: "center",
                justifyContent: "space-between",
                px: {
                    xs: 1,
                    sm: 2,
                    md: 3,
                },
                py: {
                    xs: 1,
                    sm: 1,
                    md: 0,
                },
                gap: {
                    xs: 0.5,
                    md: 3,
                },
                color: "#fff",
                borderRadius: 0,
                borderTop: "1px solid rgba(255,255,255,0.08)",
                boxSizing: "border-box",
            }}
        >
            {/* Audio Element */}
            <audio
                ref={audioRef}
                src={audioUrl || undefined}
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
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={handleEnded}
                onError={() => {
                    console.error("Audio file could not be loaded.");
                }}
            />

            {/* Left: Current Track */}
            <Box
                sx={{
                    width: {
                        xs: "45%",
                        md: "25%",
                    },
                    minWidth: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: {
                        xs: 0.8,
                        md: 1.5,
                    },
                    order: {
                        xs: 1,
                        md: 1,
                    },
                }}
            >
                {/* Track Image */}
                <Box
                    component="img"
                    src={currentTrack?.cover_url || ""}
                    alt={currentTrack?.title || "Track cover"}
                    sx={{
                        width: {
                            xs: 34,
                            sm: 38,
                            md: 42,
                        },
                        height: {
                            xs: 34,
                            sm: 38,
                            md: 42,
                        },
                        borderRadius: 2,
                        objectFit: "cover",
                        flexShrink: 0,
                    }}
                />

                {/* Track Info */}
                <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography
                        sx={{
                            fontSize: {
                                xs: 10,
                                sm: 12,
                                md: 15,
                            },
                            fontWeight: 600,
                        }}
                        noWrap
                    >
                        {currentTrack?.title || "No Track"}
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: {
                                xs: 9,
                                sm: 11,
                                md: 13,
                            },
                            color: "#A4A5B2",
                        }}
                        noWrap
                    >
                        Unknown Artist
                    </Typography>
                </Box>
            </Box>

            {/* Right: Extra Controls */}
            <Box
                sx={{
                    width: {
                        xs: "50%",
                        md: "20%",
                    },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    gap: {
                        xs: 0,
                        md: 1,
                    },
                    flexShrink: 0,
                    order: {
                        xs: 2,
                        md: 3,
                    },
                }}
            >
                {/* Like */}
                <IconButton
                    onClick={() => setIsLiked(!isLiked)}
                    sx={{
                        color: isLiked ? "#F25912" : "#E5E5EB",
                        p: {
                            xs: 0.5,
                            md: 1,
                        },
                    }}
                >
                    {isLiked ? (
                        <IoHeart size={21} />
                    ) : (
                        <IoHeartOutline size={21} />
                    )}
                </IconButton>

                {/* Shuffle */}
                <IconButton
                    onClick={() => setIsShuffle(!isShuffle)}
                    sx={{
                        color: isShuffle ? "#F25912" : "#E5E5EB",
                        p: {
                            xs: 0.5,
                            md: 1,
                        },
                    }}
                >
                    <IoShuffle size={21} />
                </IconButton>

                {/* Repeat */}
                <IconButton
                    onClick={() => setIsRepeat(!isRepeat)}
                    sx={{
                        color: isRepeat ? "#F25912" : "#E5E5EB",
                        p: {
                            xs: 0.5,
                            md: 1,
                        },
                    }}
                >
                    <IoRepeat size={21} />
                </IconButton>

                {/* Volume */}
                <Box
                    sx={{
                        display: {
                            xs: "none",
                            md: "flex",
                        },
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
                    flex: {
                        xs: "1 1 100%",
                        md: 1,
                    },
                    minWidth: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: {
                        xs: 1,
                        md: 3,
                    },
                    order: {
                        xs: 3,
                        md: 2,
                    },
                }}
            >
                {/* Playback Buttons */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: {
                            xs: 0,
                            md: 1,
                        },
                        flexShrink: 0,
                    }}
                >
                    {/* Previous */}
                    <IconButton
                        onClick={handlePrevious}
                        disabled={!availableTracks.length}
                        sx={{
                            color: "#E5E5EB",
                            p: {
                                xs: 0.5,
                                md: 1,
                            },
                        }}
                    >
                        <IoPlaySkipBack size={21} />
                    </IconButton>

                    {/* Play / Pause */}
                    <IconButton
                        onClick={handlePlay}
                        disabled={!audioUrl || isAudioLoading}
                        sx={{
                            width: {
                                xs: 34,
                                md: 42,
                            },
                            height: {
                                xs: 34,
                                md: 42,
                            },
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

                    {/* Next */}
                    <IconButton
                        onClick={handleNext}
                        disabled={!availableTracks.length}
                        sx={{
                            color: "#E5E5EB",
                            p: {
                                xs: 0.5,
                                md: 1,
                            },
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
                        gap: {
                            xs: 0.5,
                            md: 1,
                        },
                    }}
                >
                    {/* Current Time */}
                    <Typography
                        sx={{
                            fontSize: 10,
                            color: "#A4A5B2",
                            minWidth: 30,
                            display: {
                                xs: "none",
                                sm: "block",
                            },
                        }}
                    >
                        {formatTime(currentTime)}
                    </Typography>

                    {/* Progress Slider */}
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

                    {/* Duration */}
                    <Typography
                        sx={{
                            fontSize: 10,
                            color: "#A4A5B2",
                            minWidth: 30,
                            textAlign: "right",
                            display: {
                                xs: "none",
                                sm: "block",
                            },
                        }}
                    >
                        {formatTime(duration)}
                    </Typography>
                </Box>
            </Box>
        </Paper>
    );
}
