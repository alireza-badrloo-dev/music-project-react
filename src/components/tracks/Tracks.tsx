
import { Box, Card, CardMedia, Grid, IconButton, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

import { useTracks } from "../../hooks/useTracks";

import "swiper/css";
import BasicMenu from "../ui/BasicMenu";

export function Tracks() {
    const { data: tracks } = useTracks();

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
                        slidesPerView: 2
                    },
                    600: {
                        spaceBetween: 14,
                        slidesPerView: 3

                    },
                    900: {
                        spaceBetween: 16,
                        slidesPerView: 4
                    },
                    1200: {
                        spaceBetween: 18,
                        slidesPerView: 6
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
                            padding: "5px 0px"
                        }}

                    >
                        <Card
                            sx={{
                                display: "flex",
                                flexDirection: 'column',
                                alignItems: "center",
                                gap: 2,
                                p: 1.5,
                                borderRadius: 1,
                                boxShadow: 1,
                                cursor: 'pointer',
                                border: 'solid 1px #ffffff00',
                             

                                transition: "all 0.3s ease",
                                "&:hover": {
                                    transform: "translateY(-3px)",
                                    boxShadow: 3,
                                    border: 'solid 1px orange'
                                },
                            }}
                        >
                            <Box sx={{
                               
                                
                                justifyContent: 'start',
                                position:'absolute',
                                left: 2
                            }}>
                                <BasicMenu />
                            </Box>
                            <CardMedia
                                component="img"
                                image={
                                   track.cover_url
                                    
                                }
                                alt={track.title}
                                sx={{
                                    width: '100%',
                                    height: '150px',
                                    borderRadius: 1,
                                    objectFit: "cover",
                                }}
                            />

                            <Box sx={{ minWidth: 0, flex: 1 }}>
                                <Typography
                                    variant="subtitle1"
                                    noWrap
                                >
                                    {track.title}
                                </Typography>

                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    {track.play_count.toLocaleString()} Plays
                                </Typography>
                            </Box>
                        </Card>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Grid>
    );
}
