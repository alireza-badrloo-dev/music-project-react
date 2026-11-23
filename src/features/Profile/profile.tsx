
import { useState } from "react";

import {
    Avatar,
    Box,
    Typography,
    Menu,
    MenuItem,
    Divider,
} from "@mui/material";

import { deepOrange } from "@mui/material/colors";

export function Profile() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Box
                onClick={handleClick}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    cursor: "pointer",
                }}
            >
                <Avatar
                    sx={{
                        bgcolor: deepOrange[500],
                        width: 46,
                        height: 46,
                    }}
                >
                    A
                </Avatar>

                <Box
                    sx={{
                        display: {
                            xs: "none",
                            sm: "flex",
                        },
                        flexDirection: "column",
                        gap: 0.3,
                    }}
                >
                    <Typography variant="subtitle2">
                        Alireza Badrloo
                    </Typography>

                    <Box>
                        <Typography
                            variant="caption"
                            sx={{
                                backgroundColor: "#12544F",
                                py: 0.3,
                                px: 1,
                                borderRadius: "100px",
                            }}
                        >
                            premium
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                slotProps={{
                    paper: {
                        sx: {
                            mt: 1.5,
                            minWidth: 190,
                            borderRadius: 2,
                            bgcolor: "#20212B",
                            color: "#fff",
                            border: "1px solid rgba(255,255,255,0.08)",
                        },
                    },
                }}
            >
                <MenuItem onClick={handleClose}>
                   Profile
                </MenuItem>

                <MenuItem onClick={handleClose}>
                   Settings
                </MenuItem>

                <Divider sx={{ borderColor: "rgba(255,255,255,0.12)" }} />

                <MenuItem
                    onClick={handleClose}
                    sx={{ color: "#F25912" }}
                >
                   Logout
                </MenuItem>
            </Menu>
        </>
    );
}
