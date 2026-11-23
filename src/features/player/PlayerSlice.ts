
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
type PlayerState = {
    currentTrackId: number | null;
    isPlaying: boolean;
};

const initialState: PlayerState = {
    currentTrackId: null,
    isPlaying: false,
};

const playerSlice = createSlice({
    name: "player",
    initialState,
    reducers: {
        setCurrentTrack: (state, action: PayloadAction<number>) => {
            state.currentTrackId = action.payload;
            state.isPlaying = true;
        },

        setIsPlaying: (state, action: PayloadAction<boolean>) => {
            state.isPlaying = action.payload;
        },

        clearCurrentTrack: (state) => {
            state.currentTrackId = null;
            state.isPlaying = false;
        },
    },
});

export const {
    setCurrentTrack,
    setIsPlaying,
    clearCurrentTrack,
} = playerSlice.actions;

export default playerSlice.reducer;
