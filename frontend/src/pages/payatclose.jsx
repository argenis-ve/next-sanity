import React, { useEffect } from "react";
import Head from "next/head";
import Navbar from "../../components/navbar";
import Hero from "../../components/hero";
import Footer from "../../components/footer";
import ThreeSection from "../../components/payatclose/threesection";
import { client, urlFor } from "../../client";
import { useRouter } from "next/router";

export default function Career({ data, footer }) {
  useEffect(() => {
    let test = data?.scriptform;
  }, [data]);

  // Get the current URL
  const router = useRouter();
  const currentURL = router.asPath;

  return (
    <div>
      <Head>
        <title>{data?.title || "Pay at Close | Freemodel"}</title>
        <meta name="description" content={footer?.description} />
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph meta tags for social media sharing */}
        <meta property="og:title" content="Freemodel" />
        <meta property="og:description" content={footer?.description} />
        {footer?.footerimage && (
          <meta property="og:image" content={urlFor(footer.footerimage).url()} />
        )}
        <meta
          property="og:url"
          content={`https://freemodel.com${currentURL}`}
        />
        <meta property="og:type" content="website" />
      </Head>

      <Navbar data={footer?.navbar} />

      <main>
        {data && (
          <Hero
            hero={{ title: data.title }}
            buttontext={data.titlebutton}
            image={data.mainImage ? urlFor(data.mainImage).url() : ""}
          />
        )}

        {data?.imageArray && <ThreeSection imageArray={data.imageArray} />}
      </main>

      <Footer data={footer} />
    </div>
  );
}

export const getStaticProps = async () => {
  // Apuntamos a "careers" que es donde Sanity guarda la información en la base de datos
  const mainquery = `*[_type == "careers"][0]{
    title,
    mainImage {
      crop,
      hotspot,
      asset-> {
        _id,
        url
      }
    },
    titlebutton,
    imageArray []{
      image {
        crop,
        hotspot,
        asset-> {
          _id,
          url
        }
      },
      title,
      text
    },
    scriptform
  }`;

  const footer = await client.fetch(`*[_type == "footersettings"][0]{
    footerimage {
      hotspot,
      crop,
      asset->{
        _id,
        url
      }
    },
    linkedin,
    instagram,
    facebook,
    pinterest,
    leftItems,
    description,
    rightItems,
    navbar
  }`);

  const data = await client.fetch(mainquery);

  return {
    props: {
      data: data || null,
      footer: footer || null,
    },

    revalidate: 10,
  };
};