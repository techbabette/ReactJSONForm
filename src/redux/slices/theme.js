import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
    name : "theme",
    initialState : {
        mode : localStorage.getItem("mode") ?? "dark"
    },
    reducers : {
        switchMode: (state) => {
            if(state.mode === "dark"){
                state.mode = "light";
                localStorage.setItem("mode", "light");
                return;
            }

            localStorage.setItem("mode", "dark");
            state.mode = "dark";
        }
    }
});

export const { switchMode } = themeSlice.actions;

export const getMode = (state) => state.theme.mode;

export const getTheme = (state) => state.theme.mode === "light" ? "light" : "night";

export default themeSlice.reducer;