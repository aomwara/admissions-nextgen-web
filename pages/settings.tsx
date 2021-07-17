import Head from "next/head";
import Link from "next/link";
import {
  Container,
  Heading,
  Button,
  Grid,
  Divider,
  Flex,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";

const Home = () => {
  const formBackground = useColorModeValue("gray.100", "gray.700");
  return (
    <>
      <Head>
        <title>Admission NextGen | Settings</title>
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
            {/* <Heading mb={6}>Sign-In</Heading> */}
            <Input
              mb={6}
              placeholder="เลขบัตรประชาชน"
              variant="flushed"
              type="text"
            />
            <Input
              mb={6}
              placeholder="รหัสผ่าน"
              variant="flushed"
              type="password"
            />
            <Button colorScheme="teal">Login</Button>
          </Flex>
        </Flex>
      </Container>
    </>
  );
};

export default Home;
