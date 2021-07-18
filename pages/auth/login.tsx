import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import {
  Container,
  Heading,
  Button,
  Divider,
  Flex,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";

import axios from "axios";

const Home = () => {
  const formBackground = useColorModeValue("gray.100", "gray.700");
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [token, setToken] = useState<any>();
  const router = useRouter();

  useEffect(() => {
    const getToken = async () => {
      const token = await localStorage.getItem("_token");
      return token;
    };
    getToken().then((res) => {
      setToken(res);
    });
  }, []);

  const login = async () => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/login`, {
      username: username,
      password: password,
    });
    if (response.status === 200) {
      localStorage.setItem("_token", response.data);
      router.push("/profile");
    }
  };

  if (token == null) {
    return (
      <>
        <Head>
          <title>Admission NextGen | OAuth Sign-In</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
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
  } else {
    router.push("/profile");
    return null;
  }
};

export default Home;
