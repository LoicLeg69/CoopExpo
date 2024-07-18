import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Home from "./pages/Home";
import CreateUser from "./pages/CreateUser";
import Projects from "./pages/ProjectsPage";
import CreateProject from "./pages/CreateProject";

const router = createBrowserRouter([
  {
    element: <App />,
    id: "app",
    children: [
 {
    path: "/",
    id: "homePage",
    element: <Home />,
  },
  {
    path: "/createUser",
    id: "createUser",
    element: <CreateUser />,
  },
  {
    path: "/projects",
    id: "projects",
    element: <Projects />,
  },
  {
    path: "/createProject",
    id: "createProject",
    element: <CreateProject />,
  },
],
},
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
