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

/*
// ## 伴侶的條件？
// 1. 與我同樣敬虔，對信仰認真、認同並且願意一同實踐我對於家庭的異象：「家即教會」「開放家庭」
// 2. 有共同興趣愛好能交流
// 3. 對我有喜歡的感覺
// 4. 能一起出門走走、看電影、一起看棒球比賽。

// ## 如何建立榮神益人的家庭？
// - 夫妻有共同目標與意象，親子關係也有目標。
// - 信仰傳承，家庭祭壇、家庭靈修
//   - 每個禮拜一次的家庭禱告會與小組：關心近況、彼此代禱
//   - 每個月一次全家出門接觸大自然
//   - 每個年至少共讀一本書
// - 從來不可以忘記另一半的心理狀態
//   - 每年定期安排另一半安息一個月，暫時讓她放下家庭與小孩


// ## 生命計畫主旨
// 0-20 探索與尋求
// 20-40 調整與衝刺
// 40-60 平穩與整理
// 60-70 傳承與安息
// 60 歲退休？-->
**/
