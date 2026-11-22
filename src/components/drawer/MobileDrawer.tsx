
import {
    Box,
    Collapse,
    Drawer as MuiDrawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";

import { useState } from "react";

import { FiMenu, FiX } from "react-icons/fi";
import { LuLogOut } from "react-icons/lu";
import {
    MdExpandLess,
    MdExpandMore,
    MdStarBorder,
} from "react-icons/md";
import { PiPlaylistLight } from "react-icons/pi";
import { RiHomeLine } from "react-icons/ri";
import { RxPerson } from "react-icons/rx";
import { TbCategory } from "react-icons/tb";


export function MobileDrawer() {

    const [mobileOpen, setMobileOpen] = useState(false);
    const [playlistOpen, setPlaylistOpen] = useState(true);

    const handleClose = () => {
        setMobileOpen(false);
    };

    return (
        <>
            {/* Hamburger Button */}
            <IconButton
                onClick={() => setMobileOpen(true)}
                sx={{
                    color: "text.primary",
                    p: 1,
                }}
            >
                <FiMenu size={25} />
            </IconButton>

            {/* Mobile Drawer */}
            <MuiDrawer
                anchor="left"
                open={mobileOpen}
                onClose={handleClose}
                sx={{
                    "& .MuiDrawer-paper": {
                        width: 280,
                        maxWidth: "85vw",
                        boxSizing: "border-box",
                    },
                }}
            >
                <Box
                    sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        py: 2,
                    }}
                >

                    {/* Header */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            px: 2,
                            mb: 3,
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 800,
                                fontSize: 22,
                                color: "#f56a00",
                            }}
                        >
                            Pulse
                        </Typography>

                        <IconButton onClick={handleClose}>
                            <FiX size={22} />
                        </IconButton>
                    </Box>

                    {/* Menu Items */}
                    <List
                        sx={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            py: 0,
                        }}
                    >

                        {/* Home */}
                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={handleClose}
                                sx={{ mx: 1, my: 0.5, borderRadius: "9px" }}
                            >
                                <ListItemIcon sx={{ minWidth: 35, color: "inherit" }}>
                                    <RiHomeLine size={20} />
                                </ListItemIcon>

                                <ListItemText primary="Home" />
                            </ListItemButton>
                        </ListItem>

                        {/* Categories */}
                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={handleClose}
                                sx={{ mx: 1, my: 0.5, borderRadius: "9px" }}
                            >
                                <ListItemIcon sx={{ minWidth: 35, color: "inherit" }}>
                                    <TbCategory size={20} />
                                </ListItemIcon>

                                <ListItemText primary="Categories" />
                            </ListItemButton>
                        </ListItem>

                        {/* Artists */}
                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={handleClose}
                                sx={{ mx: 1, my: 0.5, borderRadius: "9px" }}
                            >
                                <ListItemIcon sx={{ minWidth: 35, color: "inherit" }}>
                                    <RxPerson size={20} />
                                </ListItemIcon>

                                <ListItemText primary="Artists" />
                            </ListItemButton>
                        </ListItem>

                        {/* Playlist */}
                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={() => setPlaylistOpen(!playlistOpen)}
                                sx={{ mx: 1, my: 0.5, borderRadius: "9px" }}
                            >
                                <ListItemIcon sx={{ minWidth: 35, color: "inherit" }}>
                                    <PiPlaylistLight size={20} />
                                </ListItemIcon>

                                <ListItemText primary="Play List" />

                                {playlistOpen ? (
                                    <MdExpandLess />
                                ) : (
                                    <MdExpandMore />
                                )}
                            </ListItemButton>
                        </ListItem>

                        {/* Playlist Submenu */}
                        <Collapse
                            in={playlistOpen}
                            timeout="auto"
                            unmountOnExit
                        >
                            <List component="div" disablePadding>
                                <ListItemButton
                                    onClick={handleClose}
                                    sx={{
                                        pl: 4,
                                        mx: 1,
                                        borderRadius: "9px",
                                    }}
                                >
                                    <ListItemIcon sx={{ minWidth: 35, color: "inherit" }}>
                                        <MdStarBorder />
                                    </ListItemIcon>

                                    <ListItemText primary="YourPlayList" />
                                </ListItemButton>
                            </List>
                        </Collapse>

                        {/* Logout */}
                        <ListItem disablePadding sx={{ mt: "auto" }}>
                            <ListItemButton
                                onClick={handleClose}
                                sx={{ mx: 1, my: 0.5, borderRadius: "9px" }}
                            >
                                <ListItemIcon sx={{ minWidth: 35, color: "inherit" }}>
                                    <LuLogOut size={20} />
                                </ListItemIcon>

                                <ListItemText primary="Log Out" />
                            </ListItemButton>
                        </ListItem>

                    </List>
                </Box>
            </MuiDrawer>
        </>
    );
}

export default MobileDrawer;
