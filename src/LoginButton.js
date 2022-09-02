import React from "react";

// useAuth0 for `functional` components
import { useAuth0 } from "@auth0/auth0-react";



// add bootstrap button
import Button from 'react-bootstrap/Button';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <Button onClick={() => loginWithRedirect()}>Log In</Button>;
};

export default LoginButton;
