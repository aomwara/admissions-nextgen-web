import { useEffect, useState } from "react";

import useAppSelector from "../../hooks/useAppSelector";
import useAppDispatch from "../../hooks/useAppDispatch";

import { Credential } from "../../interfaces/Credential";
import { Login } from "../../slices/auth";

import Head from "next/head";
import {
  Container,
  Heading,
  Button,
  Divider,
  Flex,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";

const Signin = () => {
  const formBackground = useColorModeValue("gray.100", "gray.700");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useAppDispatch();
  const { token, loading, hasError } = useAppSelector((state) => state.auth);

  const login = () => {
    const credential: Credential = {
      username: username,
      password: password,
    };
    dispatch(Login(credential));
  };

  useEffect(() => {
    console.log(loading);
    console.log(token);
  }, [loading, token]);

  return (
    <>
      <Head>
        <title>Admission NextGen | OAuth Sign-In</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Container style={{ paddingTop: 20 }} maxW="container.xl">
        <Heading>Sign-in </Heading> OAuth / Active Recruitment Account
        <Divider style={{ paddingTop: 20 }}></Divider>
        <Flex
          style={{ paddingTop: 30 }}
          alignItems="center"
          justifyContent="center"
        >
          <Flex
            direction="column"
            background={formBackground}
            p={12}
            rounded={6}
          >
            <Input
              mb={6}
              placeholder="เลขบัตรประชาชน"
              variant="flushed"
              type="text"
              autoFocus={true}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <Input
              mb={6}
              placeholder="รหัสผ่าน"
              variant="flushed"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Button onClick={login} colorScheme="teal">
              Login
            </Button>
          </Flex>
        </Flex>
      </Container>
    </>
  );
};

export default Signin;
