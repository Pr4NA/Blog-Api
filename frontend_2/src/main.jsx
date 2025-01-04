/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/no-unescaped-entities */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./LogIn" ;
import Signup from "./SignUp";
import YourPosts from "./yourPosts";
import CreatePost from "./addPost" ;

const ErrorPage = () => (
  <div>
    <h1>Oops!</h1>
    <p>The page you are looking for doesn't exist or an error occurred.</p>
    <a href="/">Go to Home</a>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "signup",
    element: <Signup />,
    errorElement: <ErrorPage />,
  },
  {
    path: "viewYours",
    element: <YourPosts />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/addPost",
    element: <CreatePost />,
    errorElement: <ErrorPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
