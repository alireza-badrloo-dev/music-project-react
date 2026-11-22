
import {  Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Typography } from "@mui/material";
import { useState } from "react";

import { LuLogOut } from "react-icons/lu";
import { MdExpandLess, MdExpandMore, MdStarBorder } from "react-icons/md";
import { PiPlaylistLight } from "react-icons/pi";
import { RiHomeLine } from "react-icons/ri";
import { RxPerson } from "react-icons/rx";

import { TbCategory } from "react-icons/tb";

export function Drawer() {
    const [open, setOpen] = useState(true);
    return (
        <Paper elevation={5}  sx={{
            width: '100%',
            height: '100%',
           
            borderRadius: '12px',
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
                        sx={{
                            color: 'text.primary',
                            mx: 1,
                            my: 0.5,
                            borderRadius: '9px',

                        }}

                    >
                        <ListItemIcon >
                            <RiHomeLine size={20} />
                        </ListItemIcon>

                        <ListItemText primary="Home" />
                    </ListItemButton>

                </ListItem>
                <ListItem disablePadding>

                    <ListItemButton
                        sx={{
                            color: 'text.primary',
                            mx: 1,
                            my: 0.5,
                            borderRadius: '9px',

                        }}

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
                        sx={{
                            color: 'text.primary',
                            mx: 1,
                            my: 0.5,
                            borderRadius: '9px',

                        }}

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
                <ListItem disablePadding>
                    <ListItemButton sx={{
                        color: 'text.primary',
                        mx: 1,
                        my: 0.5,
                        borderRadius: '9px',

                    }} onClick={() => setOpen(!open)}>
                        <ListItemIcon>
                            <PiPlaylistLight size={20}  /> 
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

                <ListItem disablePadding sx={{  mt: 'auto'}}>

                    <ListItemButton 
                        sx={{
                            color: 'text.primary',
                            mx: 1,
                            my: 0.5,
                            borderRadius: '9px',
                          

                        }}

                    >
                        <ListItemIcon sx={{
                            color: 'inherit',
                            minWidth: 35,
                        }}>
                            <LuLogOut size={20} />
                        </ListItemIcon>

                        <ListItemText primary="Log Out" />
                    </ListItemButton>

                </ListItem>
            </List>

        </Paper>
    )
}