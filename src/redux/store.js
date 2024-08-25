import {configureStore} from "@reduxjs/toolkit"
import theme from "./slices/theme";
import user from "./slices/user"
export default configureStore({
    reducer : {theme, user}
});