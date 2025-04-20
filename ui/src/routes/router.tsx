import { Chat, Dashboard } from "src/pages";
import { Route, Routes } from "react-router-dom";

import Loader from "src/components/Loader";
import React from "react";
import RequiredLogin from "src/components/RequiredLogin";

const UserProfile = React.lazy(() => import("src/pages/UserProfile"));
const LandingPage = React.lazy(() => import("src/pages/LandingPage"));
const Search = React.lazy(() => import("src/pages/Search"));
const NotFound = React.lazy(() => import("src/pages/NotFound"));
const AdminAction = React.lazy(() => import("src/pages/AdminAction"));
const Feed = React.lazy(() => import("src/pages/Feed"));
const ResumeAnalyser = React.lazy(() => import("src/pages/ResumeAnalyser"));

export default function Router() {
  return (
    <React.Suspense fallback={<Loader />}>
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
        <Route
          path="/admin-actions"
          element={
            <RequiredLogin>
              <AdminAction />
            </RequiredLogin>
          }
        />
        <Route
          path="/feed"
          element={
            <RequiredLogin>
              <Feed />
            </RequiredLogin>
          }
        />
        <Route
          path="/analyse-resume"
          element={
            <RequiredLogin>
              <ResumeAnalyser />
            </RequiredLogin>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </React.Suspense>
  );
}
