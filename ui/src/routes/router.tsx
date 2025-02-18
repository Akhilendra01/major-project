import {
  Chat,
  Dashboard,
  LandingPage,
  NotFound,
  Search,
  UserProfile,
} from "src/pages";
import { Route, Routes } from "react-router-dom";

import RequiredLogin from "src/components/RequiredLogin";

export default function Router() {
  return (
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
      <Route path="/@/:username" element={<UserProfile />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
