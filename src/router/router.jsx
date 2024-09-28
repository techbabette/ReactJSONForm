import { createBrowserRouter } from "react-router-dom";

import LayoutStandard from "../LayoutStandard";
import PageWelcome from "../PageWelcome";
import PageForm from "../PageForm";
import PageLogin from "../PageLogin";
import PageRegister from "../PageRegister";
import PageFormNew from "../PageFormNew";
import PageActivation from "../PageActivation";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LayoutStandard/>,
        children: [
            {
                element: <PageWelcome/>,
                index: true
            },
            {
                element: <PageLogin/>,
                path: "/login"
            },
            {
                element: <PageRegister/>,
                path: "/register"
            },
            {
                element: <PageActivation/>,
                path: "activate/:token"
            }
        ]
    },
    {
        element: <PageFormNew/>,
        path: "form/new"
    },
    {
        element: <PageForm/>,
        path: "form/:id"
    },
])

export default router;