import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Heading from "@theme/Heading";
import styles from "./index.module.css";

export default function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className={clsx("hero__title", styles.animatedTitle)}>
          {siteConfig.title}
        </Heading>
        <p className={clsx("hero__subtitle", styles.animatedSubtitle)}>
          {siteConfig.tagline}
        </p>

        <div className={styles.tagRow}>
          <span
            className={styles.animatedTag}
            style={{ animationDelay: "0.3s" }}
          >
            #負責
          </span>
          <span
            className={styles.animatedTag}
            style={{ animationDelay: "0.7s" }}
          >
            #固執
          </span>
          <span
            className={styles.animatedTag}
            style={{ animationDelay: "1.1s" }}
          >
            #喜歡黑畫面
          </span>
        </div>
        <div
          className={clsx(styles.buttons, styles.animatedButtons)}
          style={{ animationDelay: "0.2s" }}
        >
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro"
          >
            <span role="img" aria-label="book" style={{ marginRight: 6 }}>
              🚀
            </span>
            Enter
          </Link>
        </div>
      </div>
    </header>
  );
}
