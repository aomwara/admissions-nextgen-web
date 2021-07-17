import Head from "next/head";
import Link from "next/link";
import { Container, Heading, Button, Grid } from "@chakra-ui/react";

const content = [
  {
    id: 1,
    title: "My Profile",
    to: "profile",
  },
  {
    id: 2,
    title: "My Application",
    to: "application",
  },
  {
    id: 3,
    title: "My Application",
    to: "application",
  },
  {
    id: 4,
    title: "My Application",
    to: "application",
  },
];

const Home = () => {
  return (
    <>
      <Head>
        <title>Admission NextGen</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Container style={{ paddingTop: 20 }} maxW="container.xl">
        <Heading>Home</Heading>
        <Grid
          templateColumns="repeat(2, 1fr)"
          style={{ paddingTop: 20 }}
          gap={4}
        >
          {content.map((c) => {
            return (
              <Link href={"/" + c.to} passHref key={c.id}>
                <Button style={{ height: 100 }}>{c.title}</Button>
              </Link>
            );
          })}
        </Grid>
      </Container>
    </>
  );
};

export default Home;
