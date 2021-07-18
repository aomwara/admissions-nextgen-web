import Head from "next/head";
import Link from "next/link";
import { Container, Divider, Heading, Button, Grid } from "@chakra-ui/react";
import useAppSelector from "../hooks/useAppSelector";

const content = [
  {
    id: 1,
    title: "NextGen Profile",
    to: "profile",
  },
  {
    id: 2,
    title: "ใบสมัครของฉัน",
    to: "application",
  },
  {
    id: 3,
    title: "My Application",
    to: "application",
  },
];

const Home = () => {
  const { token, isLogin } = useAppSelector((state: any) => state.auth);
  console.log("Redux Token => ", token);
  console.log(isLogin ? "you're login" : "no login");

  return (
    <>
      <Head>
        <title>Admission NextGen</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Container style={{ paddingTop: 20 }} maxW="container.xl">
        <Heading>Home</Heading>
        <Divider style={{ paddingTop: 20 }}></Divider>
        <Grid
          templateColumns="repeat(2, 1fr)"
          style={{ paddingTop: 20 }}
          gap={4}
        >
          {/* {content.map((c) => {
            return (
              <Link href={"/" + c.to} passHref key={c.id}>
                <Button style={{ height: 120 }}>{c.title}</Button>
              </Link>
            );
          })} */}
          <Link href="/profile" passHref>
            <Button style={{ height: 120 }}>
              My NextGen
              <br />
              Profile
            </Button>
          </Link>
          <Link href="/auth/login" passHref>
            <Button style={{ height: 120 }}>
              Notification
              <br />
              Settings
            </Button>
          </Link>
        </Grid>
      </Container>
    </>
  );
};

export default Home;
