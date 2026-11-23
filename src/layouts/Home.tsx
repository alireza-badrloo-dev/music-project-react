


import { Box, Grid } from "@mui/material";


import { Drawer } from "../components/drawer/Drawer";
import { PlayBar } from "../components/playBar/PlayBar";
import { Header } from "../components/header/Header";

import { Outlet } from "react-router-dom";



export function Home() {
    

    return (
        <Grid
            container
            spacing={2}
            sx={{
                height: "100vh",
                overflow: "hidden",
            }}
        >
            {/* Drawer */}
            <Grid
                size={2}
                sx={{
                    display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' },
                    height: "100vh",
                    minHeight: 0,
                    overflow: "hidden",
                    
                    

                    boxSizing: "border-box",
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        height: "100%",
                        overflowY: "auto",
                        overflowX: "hidden",
                        
                        boxSizing: "border-box",
                    }}
                >
                    <Drawer />
                </Box>
            </Grid>


            <Grid
                size={{ xs: 12, lg: 10 }}
                sx={{
                    height: "100%",
                    minHeight: 0,
                    display: "flex",
                    flexDirection: "column",

                    pt: 1,
                    pb: 2,

                }}
            >
                <Box
                    sx={{
                        flex: 1,
                        minHeight: 0,
                        overflowY: "auto",
                        overflowX: "hidden",
                        pb: "60px",
                        boxSizing: "border-box",
                        px: { xs: 2, lg: 0 },
                        pr: { lg: 2 }
                    }}
                >
                    <Header />
                    <Outlet />
                </Box>
            </Grid>

            <PlayBar />
        </Grid>
    );
}
