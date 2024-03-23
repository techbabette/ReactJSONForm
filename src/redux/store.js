import {configureStore} from "@reduxjs/toolkit"
import theme from "./slices/theme";

export default configureStore({
    reducer : {theme}
});