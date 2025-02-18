import "./App.css";
import Appshell from "./components/appshell/Appshell";
import Router from "./routes/router";
import AuthProvider from "./context/auth";
import StateProvider from "./context/state";
import ThemeProvider from "./providers/ThemeProvider";
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <StateProvider>
          <Appshell>
            <Router />
          </Appshell>
        </StateProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
