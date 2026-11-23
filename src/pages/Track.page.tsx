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

    const { data: track, isLoading, isError } = useTrackById(Number(id));

    const [backgroundColor, setBackgroundColor] = useState("#20212B");

    const dispatch = useAppDispatch();

    const handlePlayTrack = () => {
        dispatch(setCurrentTrack(track!.id));
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

    if (isLoading) return <Typography>در حال بارگذاری...</Typography>;

    if (isError || !track) {
        return <Typography>خطا در دریافت اطلاعات آهنگ</Typography>;
    }

    return (
        <>
            <Box
                sx={{
                    width: "100%",
                    p: 3,
                    position: "relative",
                    overflow: "hidden",
                    isolation: "isolate",

                    background: `linear-gradient(
        180deg,
        ${backgroundColor},
        #20212B
    )`,

                    "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "75%",
                        zIndex: -1,

                        background: `linear-gradient(
            180deg,
            ${backgroundColor},
            transparent
        )`,

                        filter: "blur(70px)",
                        opacity: 0.8,
                    },

                    transition: "background 0.5s ease",
                    color: "#fff",
                }}
            >
                <Box sx={{
                    display: "flex",
                    gap: 3,
                }}>
                    <CardMedia
                        component="img"
                        image={track.cover_url}
                        alt={track.title}
                        sx={{
                            width: "280px",
                            height: "280px",
                            objectFit: "cover",

                            boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
                        }}
                    />

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                        }}
                    >
                        <Box sx={{ mb: 3 }}>
                            <Typography
                                variant="h2"
                                sx={{ fontWeight: 900, mb: 1 }}
                            >
                                {track.title}
                            </Typography>

                            <Typography variant="h4">
                                {track.artists?.name}
                            </Typography>
                        </Box>

                        <Box>
                            {track.genres?.map((genre, index) => (
                                <Typography key={index} sx={{ pb: 1 }} variant="h6">
                                    {genre.name}
                                </Typography>
                            ))}

                            <Typography variant="body1" >
                                {track.release_date}
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mt: 3,
                    gap: 2
                }}>
                    <IconButton
                        size="large"
                        onClick={handlePlayTrack}
                        sx={{
                            backgroundColor: '#f56a00',

                            "&:hover": {
                                backgroundColor: '#f7842c'
                            },
                        }} >
                        <PiPlayFill size={24} />
                    </IconButton>

                    <IconButton>
                        <BiShuffle size={24} />
                    </IconButton>
                    <IconButton>
                        <BiComment size={24} />
                    </IconButton>
                    <IconButton>
                        <MdFavoriteBorder size={24} />
                    </IconButton>
                </Box>
                <List sx={{ width: '100%', mt: 3 }}>
                    <ListItemButton
                        onClick={handlePlayTrack}
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }} >
                            <Typography variant="body1" sx={{ fontWeight: '600' }}>
                                {track.title}
                            </Typography>
                            <Typography variant="caption">
                                {track.artists?.name}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                flexWrap: "nowrap",
                            }}
                        >
                            <Typography sx={{ fontSize: 12 }}>
                                {`${Math.floor(track.duration / 60)}:${String(track.duration % 60).padStart(2, "0")}`}
                            </Typography>

                            <IconButton size="small">
                                <FiDownload size={19} />
                            </IconButton>

                            <IconButton size="small">
                                <IoAdd size={22} />
                            </IconButton>

                            <BasicMenu />
                        </Box>
                    </ListItemButton>
                    <Divider />
                </List>
            </Box>


        </>
    );
}