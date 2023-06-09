import { useState } from "react";
import Head from "next/head";
import { Public_Sans } from "next/font/google";
import { Form, Description } from "@/components";
import { Typography } from "@mui/joy";

import styles from "@/styles/Home.module.css";

const inter = Public_Sans({ subsets: ["latin"] });

export default function Home() {
  const [description, setDescription] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  return (
    <>
      <Head>
        <title>Previously On</title>
        <meta
          name="description"
          content="Get caught up on your favorite book"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <Typography level="h1">Previously On</Typography>
        <div className={styles.container}>
          <Form
            setDescription={setDescription}
            setIsSubmitted={setIsSubmitted}
          />
          <Description description={description} isSubmitted={isSubmitted} />
        </div>
      </main>
    </>
  );
}
