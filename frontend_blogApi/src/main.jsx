/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/no-unescaped-entities */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, useParams } from "react-router-dom";
import Login from "./LogIn";
import Signup from "./SignUp";
import ViewAll from "./viewAll";
import CreateComment from "./addComment";

const ErrorPage = () => (
  <div>
    <h1>Oops!</h1>
    <p>The page you are looking for doesn't exist or an error occurred.</p>
    <a href="/">Go to Home</a>
  </div>
);

const CreateCommentWrapper = () => {
  const { postId } = useParams(); // Extract postId from the route parameters
  return <CreateComment postId={postId} />;
};

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
    path: "viewAll",
    element: <ViewAll />,
    errorElement: <ErrorPage />,
  },
  {
    path: ":postId/addComment",
    element: <CreateCommentWrapper />, // Use the wrapper to handle postId
    errorElement: <ErrorPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
