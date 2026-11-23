
import {
 
    Box,
    InputAdornment,
    Paper,
    TextField,

} from "@mui/material";




import { IoSearch } from "react-icons/io5";

import MobileDrawer from "../drawer/MobileDrawer";
import { Profile } from "../../features/Profile/profile";




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
                            width: { xs: "100%", sm: "100%", lg: "40%" },
                            maxWidth: { xs: "100%", lg: "400px" },
                            borderRadius: "100px",
                            flex: { xs: 1, lg: "initial" },
                        }}
                    >
                        <TextField
                            fullWidth
                            id="filled-search"
                            label="Search..."
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
                     <Profile />
                    </Box>

                  

                </Box>

            </Box>
        </Box>
    );
}
