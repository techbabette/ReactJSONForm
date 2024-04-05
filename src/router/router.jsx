import { createBrowserRouter } from "react-router-dom";

import LayoutStandard from "../LayoutStandard";
import PageWelcome from "../PageWelcome";
import PageForm from "../PageForm";
import PageLogin from "../PageLogin";
import PageRegister from "../PageRegister";
import PageFormNew from "../PageFormNew";

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
            }
        ]
    },
    {
        path: "form/new",
        element: <PageFormNew/>
    },
    {
        path: "form/:id",
        element: <PageForm/>
    }
])

export default router;