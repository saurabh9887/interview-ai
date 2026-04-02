import React from "react";
import { RouterProvider } from "react-router";
import { router } from "./app.routes";
import "./style.css";
import { AuthProvider } from "./features/auth/auth.context";
import { InterviewContextProvider } from "./features/interview/interview.context";

const App = () => {
  return (
    <div>
      <AuthProvider>
        <InterviewContextProvider>
          <RouterProvider router={router} />
        </InterviewContextProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
