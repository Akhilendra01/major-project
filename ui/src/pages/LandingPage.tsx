import { Box, Button, Modal, Title } from "@mantine/core";
import { LoginForm, SignupForm } from "src/components/forms";
import { useContext, useState } from "react";

import { Auth } from "src/context";
import { useNavigate } from "react-router";

export default function LandingPage() {
  const navigate=useNavigate();
  const {isLoggedIn}=useContext(Auth);
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  if(isLoggedIn){
    navigate('/dashboard');
    return <></>
  }
  return (
    <>
      {/* <BackgroundImage
        src={Image}
        radius="sm"
        className="w-full h-full p-0 m-0"
      > */}
        <Box className="flex flex-col items-center py-40">
          <Title order={3} align="center" sx={{ color: "gray" }}>
            Login to continue to the portal
          </Title>
          <Box>
            <Button className="m-6" onClick={() => setLoginOpen(!loginOpen)}>
              Login
            </Button>
            <Button className="m-6" onClick={() => setSignupOpen(!signupOpen)}>
              Sign Up
            </Button>
          </Box>
        </Box>
      {/* </BackgroundImage> */}

      <Modal
        opened={loginOpen}
        onClose={() => setLoginOpen(!loginOpen)}
        fullScreen
      >
        <Box className="flex flex-col m-auto items-center justify-center py-20 w-3/4">
          <Title order={3} className="py-6">
            Login To Continue
          </Title>
          <LoginForm />
        </Box>
      </Modal>
      <Modal
        opened={signupOpen}
        onClose={() => setSignupOpen(!signupOpen)}
        fullScreen
      >
        <Box className="flex flex-col m-auto w-3/4 items-center justify-center">
          <Title order={3} className="py-6">
            Signup To Continue
          </Title>
          <SignupForm
            close={() => {
              setSignupOpen(false);
            }}
          />
        </Box>
      </Modal>
    </>
  );
}
