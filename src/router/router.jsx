import { createBrowserRouter } from "react-router-dom";

import LayoutStandard from "../LayoutStandard";
import PageWelcome from "../PageWelcome";
import PageForm from "../PageForm";

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
                element: <PageWelcome/>,
                path: "/login"
            },
            {
                element: <PageWelcome/>,
                path: "/register"
            }
        ]
    },
    {
        path: "form/new",
        element: <PageWelcome/>
    },
    {
        path: "form/:id",
        element: <PageForm/>
    }
])

export default router;