import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import lazyLoad from "./lazyLoad";
import Layout from "@/components/Layout";

const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const Todos = lazy(() => import("@/pages/Todos"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />,
      },
      {
        path: "home",
        element: lazyLoad(Home),
      },
      {
        path: "about",
        element: lazyLoad(About),
      },
    ],
  },
  {
    path: "todos",
    element: lazyLoad(Todos),
  },
];

const BrowserRouter = createBrowserRouter(routes, {
  basename: import.meta.env.VITE_BASE_URL,
});

export default BrowserRouter;
