import { createSelector, createSlice } from "@reduxjs/toolkit";
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

export const { setLinks, setJWT } = userSlice.actions;

export const getLinks = (state) => state.user.links

export const getUserGroup = (state) => state.user.JWT ? getJWTClaimsFromToken(state.user.JWT)["group"] : "Logged out"

export const getLinksForUser = createSelector(
    [getLinks, getUserGroup],
    (links, userGroup) => links.filter(link => link.groups.includes(userGroup))
)

export const getLinksForPosition = createSelector(
    [getLinksForUser, (state, position) => position], 
    (links, position) => links.filter(link => link.position === position).sort((a, b) => b.weight - a.weight)
)

export default userSlice.reducer;