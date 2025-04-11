import { Chat, Dashboard, LandingPage, NotFound, Search } from "src/pages";
import { Route, Routes } from "react-router-dom";

import { Loader } from "@mantine/core";
import React from "react";
import RequiredLogin from "src/components/RequiredLogin";

const UserProfile = React.lazy(() => import("src/pages/UserProfile"));

export default function Router() {
  return (
    <React.Suspense
      fallback={
        <div className="flex justify-center items-center h-screen w-full">
          <Loader color="blue" size="md" />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/dashboard"
          element={
            <RequiredLogin>
              <Dashboard />
            </RequiredLogin>
          }
        />
        <Route
          path="/chat"
          element={
            <RequiredLogin>
              <Chat />
            </RequiredLogin>
          }
        />
        <Route
          path="/search"
          element={
            <RequiredLogin>
              <Search />
            </RequiredLogin>
          }
        />
        <Route
          path="/@/:username"
          element={
            <RequiredLogin>
              <UserProfile />
            </RequiredLogin>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </React.Suspense>
  );
}
