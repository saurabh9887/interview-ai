import React from "react";
import { RouterProvider } from "react-router";
import { router } from "./app.routes";
import "./style.css";
import { AuthProvider } from "./features/auth/auth.context";
import { InterviewContextProvider } from "./features/interview/interview.context";
import { LoaderContextProvider } from "./components/LoaderContext";
import Loader from "./components/Loader";

const App = () => {
  return (
    <div>
      <LoaderContextProvider>
        <Loader />
        <AuthProvider>
          <InterviewContextProvider>
            <RouterProvider router={router} />
          </InterviewContextProvider>
        </AuthProvider>
      </LoaderContextProvider>
    </div>
  );
};

export default App;
