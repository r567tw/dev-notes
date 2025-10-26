import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

import Heading from "@theme/Heading";
import styles from "./index.module.css";

import HomepageHeader from "./HomepageHeader";
import HomepageBody from "./HomepageBody";

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={`${siteConfig.title}`} description="">
      <HomepageHeader />
      <HomepageBody />
    </Layout>
  );
}
