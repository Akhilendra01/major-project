import { AnimatePresence, motion } from "framer-motion";
import { LoginForm, SignupForm } from "src/components/forms";
import { useContext, useState } from "react";

import { Auth } from "src/context";
import { useNavigate } from "react-router";

export default function LandingPage() {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(Auth);
  const [showForm, setShowForm] = useState<"login" | "signup" | null>(null);

  if (isLoggedIn) {
    navigate("/dashboard");
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
      <motion.div
        className="max-w-xl text-center"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-4xl sm:text-5xl font-bold mb-6">
          Welcome to Campus Portal
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-10">
          Connect, share, and prepare for your future — all in one place.
        </p>
        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={() => setShowForm("login")}
            className={`${
              showForm === "login" ? "bg-blue-700" : "bg-blue-600"
            } hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full transition`}
          >
            Login
          </button>
          <button
            onClick={() => setShowForm("signup")}
            className={`${
              showForm === "signup" ? "bg-blue-100" : "bg-white"
            } border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold px-6 py-3 rounded-full transition`}
          >
            Sign Up
          </button>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {showForm && (
          <motion.div
            key={showForm}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="w-full max-w-md bg-white shadow-xl rounded-xl p-6"
          >
            {showForm === "login" && (
              <>
                <h2 className="text-2xl font-semibold text-center mb-6">
                  Login to Continue
                </h2>
                <LoginForm />
              </>
            )}
            {showForm === "signup" && (
              <>
                <h2 className="text-2xl font-semibold text-center mb-6">
                  Sign Up to Join
                </h2>
                <SignupForm close={() => setShowForm(null)} />
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
