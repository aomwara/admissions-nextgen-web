import { useState, useEffect } from "react";
import Image from "next/image";
import Head from "next/head";

import { createClient } from "@supabase/supabase-js";

import { Button, Box, Heading } from "@chakra-ui/react";

interface Profile {
  userId: string;
  pictureUrl: string;
  displayName: string;
}
const Home = () => {
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
      console.log("ok");
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
      <Box style={{ display: hidden }}>
        {profile && (
          <div style={{ paddingLeft: 40, paddingRight: 40 }}>
            <Heading style={{ paddingTop: 30 }} as="h3">
              My Profile
            </Heading>
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
              <p>
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
              </Button>
            </div>
          </div>
        )}
      </Box>
    </>
  );
};

export default Home;
