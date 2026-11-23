
import { Collapse, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Typography } from "@mui/material";
import { useState } from "react";


import { MdExpandLess, MdExpandMore, MdStarBorder } from "react-icons/md";
import { PiPlaylistLight } from "react-icons/pi";
import { RiHomeLine } from "react-icons/ri";
import { RxPerson } from "react-icons/rx";

import { TbCategory } from "react-icons/tb";
import { NavLink, useNavigate } from "react-router-dom";

export function Drawer() {
    const [open, setOpen] = useState(true);
    const navigate = useNavigate()
    return (
        <Paper elevation={5} sx={{
            width: '100%',
            height: '100%',

            borderRadius: '0px',
        }}>
            <List sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                py: 2
            }}>


                <Typography sx={{
                    textAlign: 'center',
                    fontWeight: '800',
                    color: '#f56a00',
                    mb: 4
                }}>
                    Pulse
                </Typography>

                <ListItem disablePadding>

                    <ListItemButton
                        component={NavLink}
                        to="/"
                        sx={{
                            color: 'text.primary',
                            mx: 1,
                            my: 0.5,
                            borderRadius: '9px',
                            "&.active": {
                                backgroundColor: "action.selected",

                            },
                        }}
                        onClick={() => navigate('/')}

                    >
                        <ListItemIcon >
                            <RiHomeLine size={20} />
                        </ListItemIcon>

                        <ListItemText primary="Home" />
                    </ListItemButton>

                </ListItem>
                <ListItem disablePadding>

                    <ListItemButton
                        component={NavLink}
                        to="/categories"
                        sx={{
                            color: 'text.primary',
                            mx: 1,
                            my: 0.5,
                            borderRadius: '9px',
                            "&.active": {
                                backgroundColor: "action.selected",

                            },
                        }}
                        onClick={() => navigate('/categories')}

                    >
                        <ListItemIcon sx={{
                            color: 'inherit',
                            minWidth: 35,
                        }}>
                            <TbCategory size={20} />
                        </ListItemIcon>

                        <ListItemText primary="Categories" />
                    </ListItemButton>

                </ListItem>
                <ListItem disablePadding>

                    <ListItemButton
                        component={NavLink}
                        to="/artists"
                        sx={{
                            color: 'text.primary',
                            mx: 1,
                            my: 0.5,
                            borderRadius: '9px',
                            "&.active": {
                                backgroundColor: "action.selected",

                            },
                        }}
                        onClick={() => navigate('/artists')}

                    >
                        <ListItemIcon sx={{
                            color: 'inherit',
                            minWidth: 35,
                        }}>
                            <RxPerson size={20} />
                        </ListItemIcon>

                        <ListItemText primary="Artists" />
                    </ListItemButton>

                </ListItem>
                <Divider />
                <ListItem disablePadding>
                    <ListItemButton sx={{
                        color: 'text.primary',
                        mx: 1,
                        my: 0.5,
                        borderRadius: '9px',

                    }} onClick={() => setOpen(!open)}>
                        <ListItemIcon>
                            <PiPlaylistLight size={20} />
                        </ListItemIcon>
                        <ListItemText primary="Play List" />
                        {open ? <MdExpandLess /> : <MdExpandMore />}
                    </ListItemButton>
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <MdStarBorder />
                            </ListItemIcon>
                            <ListItemText primary="YourPlayList" />

                        </ListItemButton>
                    </List>
                </Collapse>

                
            </List>

        </Paper>
    )
}