
import { Box, Typography, IconButton } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay } from 'swiper/modules';

import { IoPlay, IoPause } from 'react-icons/io5';
import { useState } from 'react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import './MusicSlider.css';

import music1 from '../../assets/images/image1.jpg';
import music2 from '../../assets/images/image2.jpg';
import music3 from '../../assets/images/image3.png';
import music4 from '../../assets/images/image4.jpg';
import music5 from '../../assets/images/image5.jpg';

interface Song {
    id: number;
    title: string;
    artist: string;
    image: string;
}

const songs: Song[] = [
    {
        id: 1,
        title: 'Echoes of Midnight',
        artist: 'Jon Hickman',
        image: music1,
    },
    {
        id: 2,
        title: 'Lost in Dreams',
        artist: 'Alex Morgan',
        image: music2,
    },
    {
        id: 3,
        title: 'Midnight Memories',
        artist: 'David Carter',
        image: music3,
    },
    {
        id: 4,
        title: 'Silent Waves',
        artist: 'Luna James',
        image: music4,
    },
    {
        id: 5,
        title: 'Dark Paradise',
        artist: 'Ryan Smith',
        image: music5,
    },
    {
        id: 6,
        title: 'Midnight Memories',
        artist: 'David Carter',
        image: music3,
    },
    {
        id: 7,
        title: 'Lost in Dreams',
        artist: 'Alex Morgan',
        image: music2,
    },
];

export const MusicSlider = () => {
    const [activeSong, setActiveSong] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <Box className="music-slider-container">

            <Swiper

                modules={[EffectCoverflow, Autoplay]}
                effect="coverflow"
                centeredSlides={true}
                slidesPerView="auto"
                loop={true}
                initialSlide={1}
                loopAdditionalSlides={5}
                speed={800}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                    reverseDirection: true
                }}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 20,
                    depth: 150,
                    modifier: 1.2,
                    slideShadows: true,
                }}
                onSlideChange={(swiper) => {
                    setActiveSong(swiper.realIndex);
                    setIsPlaying(false);
                }}
                className="music-swiper"
            >
                {songs.map((song, index) => {
                    const isActive = activeSong === index;

                    return (
                        <SwiperSlide key={song.id}>
                            <Box
                                className={`music-card ${isActive ? 'active' : ''}`}
                                sx={{
                                    backgroundImage: `url(${song.image})`,
                                }}
                            >
                                <Box className="music-overlay" />

                                {isActive && (
                                    <Box className="music-info">
                                        <Box>
                                            <Typography className="music-title">
                                                {song.title}
                                            </Typography>

                                            <Typography className="music-artist">
                                                {song.artist}
                                            </Typography>
                                        </Box>

                                        <IconButton
                                            className="music-play-button"
                                            onClick={() => setIsPlaying(prev => !prev)}
                                        >
                                            {isPlaying
                                                ? <IoPause size={23} />
                                                : <IoPlay size={23} />
                                            }
                                        </IconButton>
                                    </Box>
                                )}
                            </Box>
                        </SwiperSlide>
                    );
                })}
            </Swiper>

        </Box>
    );
};


