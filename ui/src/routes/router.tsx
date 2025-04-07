import { Chat, Dashboard, LandingPage, NotFound, Search } from "src/pages";
import { Route, Routes } from "react-router-dom";

import RequiredLogin from "src/components/RequiredLogin";
import { UserProfile } from "src/pages/UserProfile";

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
  );
}
