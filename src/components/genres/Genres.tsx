import { Box, Chip, IconButton, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

import { useGenres } from "../../hooks/useGenres";

import "swiper/css";

export function Genres() {
    const { data: genres } = useGenres();

    return (
        <Box sx={{ width: "100%", mb: 3 }}>

            {/* Header */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 2,
                    
                }}
            >
                <Typography variant="h5" >
                    Select Categories
                </Typography>

                <Box sx={{ display: "flex", gap: 1 }}>
                    <IconButton
                        className="genre-prev"
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
                        className="genre-next"
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

            {/* Genres Slider */}
            <Swiper
                modules={[Navigation]}
                navigation={{
                    prevEl: ".genre-prev",
                    nextEl: ".genre-next",
                }}
                spaceBetween={10}
                slidesPerView="auto"
                breakpoints={{
                    600: {
                        spaceBetween: 12,
                    },
                    900: {
                        spaceBetween: 14,
                    },
                }}
                style={{
                    width: "100%",
                    paddingBottom: "8px",
                }}
            >
                {genres?.map((genre) => (
                    <SwiperSlide
                        key={genre.id}
                        style={{
                            width: "auto",
                        }}
                    >
                        <Chip
                            label={genre.name}
                            clickable
                            variant="outlined"
                            sx={{
                                px: 1.5,
                                py: 2.5,
                                borderRadius: 2,
                                fontSize: 14,
                                fontWeight: 500,
                                transition: "all 0.2s ease",

                                "&:hover": {
                                    bgcolor: "#F25912",
                                    color: "#fff",
                                    borderColor: "#F25912",
                                },
                            }}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    );
}