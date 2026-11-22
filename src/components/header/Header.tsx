
import {
    Avatar,
    Box,
    InputAdornment,
    Paper,
    TextField,
    Typography,
} from "@mui/material";

import { deepOrange } from "@mui/material/colors";

import { CiSettings } from "react-icons/ci";
import { IoSearch } from "react-icons/io5";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import MobileDrawer from "../drawer/MobileDrawer";




export function Header() {

    return (
        <Box
            sx={{
                width: "100%",
                minHeight: "80px",
                display: "flex",
                alignItems: "center",
                boxSizing: "border-box",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 2,
                }}
            >

                {/* Mobile Hamburger + Search */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        flex: 1,
                        minWidth: 0,
                    }}
                >

                    {/* Mobile Drawer */}
                    <Box
                        sx={{
                            display: { xs: "block", lg: "none" },
                            flexShrink: 0,
                        }}
                    >
                        <MobileDrawer />
                    </Box>

                    {/* Search */}
                    <Paper
                        elevation={5}
                        sx={{
                            width: { xs: "100%", sm: "100%", lg: "30%" },
                            maxWidth: { xs: "100%", lg: "400px" },
                            borderRadius: "100px",
                            flex: { xs: 1, lg: "initial" },
                        }}
                    >
                        <TextField
                            fullWidth
                            id="filled-search"
                            label="Search for a song"
                            type="search"
                            size="small"
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IoSearch
                                                size={20}
                                                color="#c5c5c5"
                                            />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            sx={{
                                borderRadius: "50%",

                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "100px",

                                    "& fieldset": {
                                        border: "none",
                                    },

                                    "&:hover fieldset": {
                                        border: "solid 1px",
                                        borderColor: "#c5c5c5",
                                    },

                                    "&.Mui-focused fieldset": {
                                        border: "solid 1px",
                                        borderColor: "#c5c5c5",
                                        borderWidth: "1px",
                                    },
                                },

                                "& .MuiInputLabel-root.Mui-focused": {
                                    color: "#c5c5c5",
                                },
                            }}
                        />
                    </Paper>

                </Box>

                {/* Profile & Actions */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: { xs: 0.5, sm: 1 },
                        flexShrink: 0,
                    }}
                >

                    {/* Profile */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
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

                    {/* Settings */}
                    <Avatar
                        sx={{
                            bgcolor: "#22242A",
                            cursor: "pointer",
                        }}
                    >
                        <CiSettings color="#fff" />
                    </Avatar>

                    {/* Favorite */}
                    <Avatar
                        sx={{
                            bgcolor: "#22242A",
                            cursor: "pointer",
                        }}
                    >
                        <MdOutlineFavoriteBorder color="#fff" />
                    </Avatar>

                </Box>

            </Box>
        </Box>
    );
}
