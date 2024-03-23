import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
    name : "theme",
    initialState : {
        mode : "dark"
    },
    reducers : {
        switchMode: (state) => {
            if(state.mode === "dark"){
                state.mode = "light";
                return;
            }

            state.mode = "dark";
        }
    }
});

export const { switchMode } = themeSlice.actions;

export const getMode = (state) => state.theme.mode;

export const getTheme = (state) => state.theme.mode === "light" ? "light" : "night";

export default themeSlice.reducer;