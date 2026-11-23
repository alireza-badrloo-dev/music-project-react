
import { useEffect, useState } from "react";
import {
    Box,
    CardMedia,
    Divider,
    IconButton,
    List,
    ListItemButton,
    Typography,
} from "@mui/material";

import { FastAverageColor } from "fast-average-color";
import { useParams } from "react-router-dom";
import { useTrackById } from "../hooks/useTrackById";

import { PiPlayFill } from "react-icons/pi";
import { BiComment, BiShuffle } from "react-icons/bi";
import { IoAdd } from "react-icons/io5";
import { FiDownload } from "react-icons/fi";
import { MdFavoriteBorder } from "react-icons/md";

import BasicMenu from "../components/ui/BasicMenu";
import { useAppDispatch } from "../store/Hooks";
import { setCurrentTrack } from "../features/player/PlayerSlice";

export function TrackPage() {
    const { id } = useParams();

    const {
        data: track,
        isLoading,
        isError,
    } = useTrackById(Number(id));

    const [backgroundColor, setBackgroundColor] = useState("#20212B");

    const dispatch = useAppDispatch();

    const handlePlayTrack = () => {
        if (track) {
            dispatch(setCurrentTrack(track.id));
        }
    };

    useEffect(() => {
        if (!track?.cover_url) return;

        const fac = new FastAverageColor();
        const image = new Image();

        let cancelled = false;

        image.crossOrigin = "anonymous";

        image.onload = async () => {
            try {
                const color = await fac.getColorAsync(image);

                if (!cancelled) {
                    setBackgroundColor(color.hex);
                }
            } catch (error) {
                console.error("Color extraction failed:", error);
            } finally {
                fac.destroy();
            }
        };

        image.onerror = () => {
            console.error("Cover image could not be loaded");
            fac.destroy();
        };

        image.src = track.cover_url;

        return () => {
            cancelled = true;
            image.onload = null;
            image.onerror = null;
            fac.destroy();
        };
    }, [track?.cover_url]);

    if (isLoading) {
        return <Typography>در حال بارگذاری...</Typography>;
    }

    if (isError || !track) {
        return <Typography>خطا در دریافت اطلاعات آهنگ</Typography>;
    }

    return (
        <Box

            sx={{
                width: "100%",
                p: { xs: 1.5, sm: 2, md: 3 },
                position: "relative",
                overflow: "hidden",
                isolation: "isolate",
             background: {
    xs: `linear-gradient(
        180deg,
        ${backgroundColor} 0px,
        ${backgroundColor} 1px,
        #20212B 220px,
        #20212B 100%
    )`,
    sm: `linear-gradient(
        180deg,
        ${backgroundColor} 0px,
        ${backgroundColor} 1px,
        #20212B 330px,
        #20212B 100%
    )`,
    md: `linear-gradient(
        180deg,
        ${backgroundColor} 0px,
        ${backgroundColor} 1px,
        #20212B 360px,
        #20212B 100%
    )`,
    lg: `linear-gradient(
        180deg,
        ${backgroundColor} 0px,
        ${backgroundColor} 1px,
        #20212B 390px,
        #20212B 100%
    )`,
},

                transition: "background 0.5s ease",
                color: "#fff",
            }}


        >
            {/* Track information */}
            <Box
                sx={{
                    display: "flex",
                    gap: { xs: 1.5, sm: 2, md: 3 },
                }}
            >
                <CardMedia
                    component="img"
                    image={track.cover_url}
                    alt={track.title}
                    sx={{
                        width: {
                            xs: 140,
                            sm: 200,
                            md: 250,
                            lg: 280,
                        },
                        height: {
                            xs: 140,
                            sm: 200,
                            md: 250,
                            lg: 280,
                        },
                        flexShrink: 0,
                        objectFit: "cover",
                        boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
                    }}
                />

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        minWidth: 0,
                    }}
                >
                    <Box sx={{ mb: { xs: 1, sm: 2, md: 3 } }}>
                        <Typography
                            variant="h2"
                            sx={{
                                fontWeight: 900,
                                mb: 1,
                                fontSize: {
                                    xs: "1.1rem",
                                    sm: "1.6rem",
                                    md: "2.3rem",
                                    lg: "3rem",
                                },
                                overflowWrap: "anywhere",
                            }}
                        >
                            {track.title}
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: {
                                    xs: "0.85rem",
                                    sm: "1.2rem",
                                    md: "1.5rem",
                                    lg: "2rem",
                                },
                            }}
                        >
                            {track.artists?.name}
                        </Typography>
                    </Box>

                    <Box>
                        {track.genres?.map((genre, index) => (
                            <Typography
                                key={index}
                                sx={{
                                    pb: 1,
                                    fontSize: {
                                        xs: "0.7rem",
                                        sm: "0.85rem",
                                        md: "1rem",
                                        lg: "1.25rem",
                                    },
                                }}
                            >
                                {genre.name}
                            </Typography>
                        ))}

                        <Typography
                            sx={{
                                fontSize: {
                                    xs: "0.7rem",
                                    sm: "0.85rem",
                                    md: "1rem",
                                },
                            }}
                        >
                            {track.release_date}
                        </Typography>
                    </Box>
                </Box>
            </Box>

            {/* Action buttons */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    mt: { xs: 2, sm: 3 },
                    gap: { xs: 0.5, sm: 1, md: 2 },
                }}
            >
                <IconButton
                    onClick={handlePlayTrack}
                    sx={{
                        backgroundColor: "#f56a00",
                        "&:hover": {
                            backgroundColor: "#f7842c",
                        },
                        "& svg": {
                            fontSize: {
                                xs: 19,
                                sm: 22,
                                md: 24,
                            },
                        },
                    }}
                >
                    <PiPlayFill />
                </IconButton>

                <IconButton
                    sx={{
                        "& svg": {
                            fontSize: { xs: 19, sm: 22, md: 24 },
                        },
                    }}
                >
                    <BiShuffle />
                </IconButton>

                <IconButton
                    sx={{
                        "& svg": {
                            fontSize: { xs: 19, sm: 22, md: 24 },
                        },
                    }}
                >
                    <BiComment />
                </IconButton>

                <IconButton
                    sx={{
                        "& svg": {
                            fontSize: { xs: 19, sm: 22, md: 24 },
                        },
                    }}
                >
                    <MdFavoriteBorder />
                </IconButton>
            </Box>

            {/* Track list */}
            <List
                sx={{
                    width: "100%",
                    mt: { xs: 2, sm: 3 },
                    p: 0,
                }}
            >
                <ListItemButton
                    onClick={handlePlayTrack}
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        px: { xs: 1, sm: 2 },
                        gap: 1,
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 0.5,
                            minWidth: 0,
                            flex: 1,
                        }}
                    >
                        <Typography
                            variant="body1"
                            sx={{
                                fontWeight: 600,
                                fontSize: {
                                    xs: 12,
                                    sm: 14,
                                    md: 16,
                                },
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {track.title}
                        </Typography>

                        <Typography
                            variant="caption"
                            sx={{
                                fontSize: {
                                    xs: 10,
                                    sm: 12,
                                },
                            }}
                        >
                            {track.artists?.name}
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: { xs: 0, sm: 1 },
                            flexShrink: 0,
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: {
                                    xs: 10,
                                    sm: 12,
                                },
                                minWidth: 30,
                            }}
                        >
                            {`${Math.floor(track.duration / 60)}:${String(
                                track.duration % 60
                            ).padStart(2, "0")}`}
                        </Typography>

                        <IconButton
                            size="small"
                            sx={{ p: { xs: 0.5, sm: 1 } }}
                        >
                            <FiDownload size={19} />
                        </IconButton>

                        <IconButton
                            size="small"
                            sx={{ p: { xs: 0.5, sm: 1 } }}
                        >
                            <IoAdd size={22} />
                        </IconButton>

                        <BasicMenu />
                    </Box>
                </ListItemButton>

                <Divider />
            </List>
        </Box>
    );
}
