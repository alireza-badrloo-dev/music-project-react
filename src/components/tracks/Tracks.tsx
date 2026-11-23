
import {
    Box,
    Card,
    CardMedia,
    Grid,
    IconButton,
    Typography,
} from "@mui/material";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import {
    MdChevronLeft,
    MdChevronRight,
} from "react-icons/md";

import { BiPlay } from "react-icons/bi";

import { useTracks } from "../../hooks/useTracks";
import { useNavigate } from "react-router-dom";



import "swiper/css";
import { useAppDispatch } from "../../store/Hooks";
import { setCurrentTrack, setIsPlaying } from "../../features/player/PlayerSlice";

export function Tracks() {
    const { data: tracks, isLoading, isError } = useTracks();

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    // پخش آهنگ در همین صفحه
    const handlePlayTrack = (trackId: number) => {
        dispatch(setCurrentTrack(trackId));
        dispatch(setIsPlaying(true));
    };

    if (isLoading) return <p>Loading...</p>;

    if (isError) return <p>Error loading tracks!</p>;

    return (
        <Grid size={12} sx={{ width: "100%" }}>

            {/* Header */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 2,
                }}
            >
                <Typography variant="h5">
                    Popular Tracks
                </Typography>

                <Box sx={{ display: "flex", gap: 1 }}>
                    <IconButton
                        className="track-prev"
                        size="small"
                        sx={{
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 2,
                        }}
                    >
                        <MdChevronLeft />
                    </IconButton>

                    <IconButton
                        className="track-next"
                        size="small"
                        sx={{
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 2,
                        }}
                    >
                        <MdChevronRight />
                    </IconButton>
                </Box>
            </Box>

            {/* Tracks Slider */}
            <Swiper
                modules={[Navigation]}
                navigation={{
                    prevEl: ".track-prev",
                    nextEl: ".track-next",
                }}
                breakpoints={{
                    0: {
                        spaceBetween: 12,
                        slidesPerView: 2,
                    },
                    600: {
                        spaceBetween: 14,
                        slidesPerView: 3,
                    },
                    900: {
                        spaceBetween: 16,
                        slidesPerView: 4,
                    },
                    1200: {
                        spaceBetween: 18,
                        slidesPerView: 6,
                    },
                }}
                style={{
                    width: "100%",
                    paddingBottom: "8px",
                }}
            >
                {tracks?.map((track) => (
                    <SwiperSlide
                        key={track.id}
                        style={{
                            width: "130px",
                            padding: "5px 0",
                        }}
                    >
                        <Card
                            onClick={() => navigate(`/track/${track.id}`)}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 2,
                                p: 1.5,
                                borderRadius: 1,
                                boxShadow: 1,
                                cursor: "pointer",
                                border: "1px solid #ffffff00",
                                transition: "all 0.3s ease",

                                "&:hover": {
                                    transform: "translateY(-3px)",
                                    boxShadow: 3,
                                    border: "1px solid orange",
                                },

                                "&:hover .play-button": {
                                    opacity: 1,
                                    transform: "translateY(0)",
                                },
                            }}
                        >
                            {/* Cover */}
                            <Box
                                sx={{
                                    width: "100%",
                                    position: "relative",
                                    overflow: "hidden",
                                    borderRadius: 1,
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    image={track.cover_url}
                                    alt={track.title}
                                    sx={{
                                        width: "100%",
                                        height: "150px",
                                        objectFit: "cover",
                                    }}
                                />

                                {/* Play Button */}
                                <IconButton
                                    className="play-button"
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        handlePlayTrack(track.id);
                                    }}
                                    sx={{
                                        position: "absolute",
                                        bottom: 8,
                                        left: 8,
                                        bgcolor: "#f99346",
                                        color: "white",
                                        opacity: 0,
                                        transform: "translateY(8px)",
                                        transition: "all 0.3s ease",

                                        "&:hover": {
                                            bgcolor: "#fc852b",
                                        },
                                    }}
                                >
                                    <BiPlay size={21} />
                                </IconButton>
                            </Box>

                            {/* Track Info */}
                            <Box sx={{ minWidth: 0, width: "100%" }}>
                                <Typography variant="subtitle1" noWrap>
                                    {track.title}
                                </Typography>

                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    noWrap
                                >
                                    {track.artists?.name}
                                </Typography>
                            </Box>
                        </Card>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Grid>
    );
}
