import { useState, useEffect } from "react";
import Image from "next/image";
import Head from "next/head";

import { createClient } from "@supabase/supabase-js";

import {
  Button,
  Divider,
  Container,
  Box,
  Heading,
  Text,
} from "@chakra-ui/react";
import axios from "axios";

interface Profile {
  userId: string;
  pictureUrl: string;
  displayName: string;
}
const Home = () => {
  const [token, setToken] = useState<any>();
  const [ARprofile, setARProfile] = useState<any>();

  useEffect(() => {
    const getToken = async () => {
      const token = await localStorage.getItem("_token");
      return token;
    };
    getToken().then((res) => {
      setToken(res);
    });
  }, []);

  const getARProfile = async () => {
    const profile = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/user/profile`,
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    return profile.data;
  };

  useEffect(() => {
    if (token !== undefined && token !== null) {
      getARProfile().then((res) => {
        setARProfile(res);
      });
    }
  }, [token]);

  const [profile, setProfile] = useState<Profile>({
    userId: "",
    pictureUrl: "",
    displayName: "",
  });

  const [hidden, setHidden] = useState<string>("none");
  const liffId: string = process.env.NEXT_PUBLIC_LIFF_ID
    ? process.env.NEXT_PUBLIC_LIFF_ID
    : "";

  const supabaseUrl: string = "https://kfhtybzqrokkipfudkbg.supabase.co";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY
    ? process.env.NEXT_PUBLIC_SUPABASE_KEY
    : "";
  const supabase = createClient(supabaseUrl, supabaseKey);

  const insertID = async (_id: string, name: string) => {
    const userData = await findID(_id);

    const row = userData?.length;

    if (row === 0) {
      const { data, error } = await supabase
        .from("users")
        .insert([{ id: _id, display_name: name }]);
    }

    alert("Done!");
  };

  const findID = async (_id: string) => {
    let { data: users, error } = await supabase
      .from("users")
      .select("id")
      .eq("id", _id);

    return users;
  };
  useEffect(() => {
    const getProfile = async () => {
      const liff = (await import("@line/liff")).default;
      try {
        await liff.init({ liffId });
      } catch (error) {
        console.error("liff init error", error.message);
      }
      if (liff.isLoggedIn()) {
        setHidden("block");
        await liff.ready;
        const pf = await liff.getProfile();
        setProfile({
          userId: pf.userId,
          pictureUrl: pf.pictureUrl ? pf.pictureUrl : "",
          displayName: pf.displayName,
        });
      }
    };

    getProfile();
  }, [profile.userId, liffId]);

  return (
    <>
      <Head>
        <title>Admission NextGen</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Container style={{ paddingTop: 20 }} maxW="container.xl">
        <Heading>My Profile</Heading>
        <Divider style={{ paddingTop: 20 }}></Divider>
        <Box style={{ display: hidden }}>
          {profile && (
            <div style={{ paddingLeft: 40, paddingRight: 40 }}>
              <br />
              {profile.pictureUrl && (
                <Image
                  src={profile.pictureUrl}
                  alt={profile.displayName}
                  width={200}
                  height={200}
                />
              )}

              <div>
                <br />
                {/* <b>UUID:</b> {profile.userId}<br/> */}
                <b>Display Name:</b> {profile.displayName}
                <br />
                {/* <p>
                <b>Subscribe your application now!</b>
              </p>
              <br />
              <Button
                colorScheme="blue"
                size="md"
                onClick={() => {
                  insertID(profile.userId, profile.displayName);
                }}
              >
                Subscribe!
              </Button> */}
              </div>
            </div>
          )}
          <Box style={{ padding: 40 }}>
            {ARprofile && (
              <>
                <Heading as="h4" size="md">
                  Active Recruitment Profile
                </Heading>
                <Text>
                  ชื่อ:
                  {ARprofile.prefix}
                  {ARprofile.firstname} {ARprofile.lastname}
                </Text>
                <Text>โรงเรียน: {ARprofile.school}</Text>
                <Text>สร้างบัญชีเมื่อ: {ARprofile.created_at}</Text>
              </>
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Home;
