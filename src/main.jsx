import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import Signup from "./components/Signup/Signup.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>This is the error element</div>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/signin",
        element: <Signup />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
