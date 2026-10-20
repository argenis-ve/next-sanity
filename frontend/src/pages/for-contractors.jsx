import React from "react";
import Head from "next/head";
import Navbar from "../../components/navbar";
import Hero from "../../components/hero";
import Bluebar from "../../components/bluebar";
import Threesegment from "../../components/threesegment";
import Quoteslider from "../../components/quoteslider";
import Footer from "../../components/footer";
import { client, urlFor } from "../../client";
import Paragraph from "../../components/paragraph";
import Sixgrid from "../../components/index/sixgrid";
import ThreeSegment from "../../components/threesegment";
import { useRouter } from "next/router";
import TwoByTwo from "../../components/index/twobytwo";

// Helper universal y a prueba de fallos para urlFor
const safeUrlFor = (source) => {
  if (!source || (!source.asset && !source._ref)) {
    return "https://freemodel.com/SEODefaultLogo.png";
  }
  try {
    return urlFor(source).url() || "https://freemodel.com/SEODefaultLogo.png";
  } catch (e) {
    return "https://freemodel.com/SEODefaultLogo.png";
  }
};

export default function ForContractors({ data, footer }) {
  const router = useRouter();
  const currentURL = router.asPath;

  // 1. Imágenes seguras para Hero y SEO
  const heroImageUrl = safeUrlFor(data?.mainImage);
  const seoImageUrl = safeUrlFor(data?.seoImage);

  // 2. Mapeo seguro para el arreglo de TwoByTwo / sec2imageArray
  const safeItems = Array.isArray(data?.sec2imageArray)
    ? data.sec2imageArray.map((item) => {
        if (!item) return { url: "https://freemodel.com/SEODefaultLogo.png" };
        // Si el ítem es directamente una imagen o contiene una propiedad de imagen
        return item.asset || item._ref
          ? { ...item, url: safeUrlFor(item) }
          : item;
      })
    : [];

  // 3. Testimonios seguros
  const safeTestimonials = Array.isArray(data?.testimonials)
    ? data.testimonials.map((t) => ({
        ...t,
        testimonialimage: t?.testimonialimage?.asset ? t.testimonialimage : null,
      }))
    : [];

  return (
    <div>
      <Head>
        <title>{`For Contractors | Freemodel`}</title>
        <meta name="description" content={footer?.description || ""} />
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph meta tags */}
        <meta property="og:title" content={data?.seoTitle || ""} />
        <meta property="og:description" content={data?.seoDescription || ""} />
        <meta property="og:image" content={seoImageUrl} />
        <meta
          property="og:url"
          content={`https://freemodel.com${currentURL}`}
        />
        <meta property="og:type" content="website" />
      </Head>

      <Navbar data={footer?.navbar} />

      <main>
        <Hero
          hero={{ title: data?.title }}
          buttontext={data?.titlebutton}
          image={heroImageUrl}
        />
        <Bluebar body={data?.bluebar} />

        <Paragraph text={data?.body} />

        <Bluebar body={data?.bluebar2} />

        <TwoByTwo title={data?.sec2title} items={safeItems} />

        <ThreeSegment
          title={data?.testimonialstitle}
          testimonials={safeTestimonials}
        />

        <h1 className="text-4xl text-center font-bold my-20">
          {data?.sec3title}
        </h1>

        <div className="flex items-center justify-center overflow-auto">
          <div
            className="pb-10 overflow-auto"
            dangerouslySetInnerHTML={{
              __html: data?.sec3html || "",
            }}
          />
        </div>

        <h1 className="text-4xl text-center max-w-4xl mx-auto font-bold my-20">
          {data?.sec4title}
        </h1>
        <div className="flex-auto max-w-3xl justify-center items-center mx-auto px-5">
          <div
            className="pb-10 overflow-auto"
            dangerouslySetInnerHTML={{
              __html: data?.sec4html || "",
            }}
          />
        </div>
      </main>
      <Footer data={footer} />
    </div>
  );
}

export const getStaticProps = async () => {
  const mainquery = `*[_type == "forcontractors"][0]{
    title,
    mainImage,
    titlebutton,
    bluebar,
    body,
    bluebar2,
    sec2title,
    sec2imageArray,
    testimonialstitle,
    testimonials[]->{
      _id,
      testimonialperson,
      testimonialquote,
      testimonialimage,
      testimonialposition,
      brokerage,
    },
    sec3title,
    sec3html,
    sec4title,
    sec4html,
    //----SEO
    seoTitle,
    seoDescription,
    seoImage,
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
      data: data || {},
      footer: footer || {},
    },

    revalidate: 10,
  };
};
