import React from "react";
import styles from "./index.module.css";

export default function HomepageBody() {
  return (
    <main className={styles.homeBody}>
      <div className={styles.aboutAnimate}>
        <span>Hi, 我是 r567tw，一名喜歡分享的台東囝仔！</span>
      </div>
      {/* 這裡可以放原本的 about 內容或其他自我介紹 */}
      <div className={styles.aboutContent}>
        <img
          src="/images/about.webp"
          alt="about"
          style={{ maxWidth: 320, borderRadius: 12 }}
        />
        <div>
          <p>
            一名台東囝仔、軟體工程師，曾當過短暫的 Python 和 Golang
            工程師，更擔任 PHP 工程師多年。
            <br />
            樂意分享有任何關於台東旅遊、軟體工程、人生總總的問題。
          </p>
          <ul>
            <li>興趣：閱讀、騎腳踏車 / 旅行、看棒球</li>
            <li>人生願景：務實的工程師、好父親＆好丈夫（目前根本沒對象 😂）</li>
          </ul>
          {/* Threads 帳號資訊 */}
          <div style={{ marginTop: "12px", textAlign: "left" }}>
            <div style={{ marginBottom: "4px" }}></div>
            <div
              style={{
                color: "#222",
                fontWeight: 600,
                fontSize: "1.08rem",
                textDecoration: "none",
              }}
            >
              <span role="img" aria-label="resume" style={{ marginRight: 6 }}>
                📄
              </span>
              如果有興趣了解更多我的經歷，歡迎參考我的
              <a href="https://r567tw.github.io/resume"> Resume</a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
