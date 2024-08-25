import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
    name : "user",
    initialState : {
        JWT : localStorage.getItem("JWT") ?? null,
        links : null
    },
    reducers : {
        setJWT: (state, action) => {
            let newJWT = action.payload;
            localStorage.setItem("JWT", newJWT);
            state.JWT = newJWT;
        },
        setLinks: (state, action) => {
            let newLinks = action.payload;
            state.links = newLinks;
        }
    }
});

export const { setLinks } = userSlice.actions;

export const getLinks = (state) => state.user.links;

export default userSlice.reducer;