---
title: 利用Gulp 製作自己的履歷
date: "2018-11-04 13:33:11+00:00"
tags:
  - gulp
---

之前六角學院出了一堂課程：[使用 gulp 進行網頁前端自動化][1]，相當推薦!

說真的，在畢業前我就大概知道 gulp 的大名，自己的印象就是類似前端的工具......但始終沒有特別著墨這一塊，直到我最近關注六角學院出了這門課，恰巧手上又有一些閒錢，就發憤買了這門課，藉此做為好好學習 gulp 的機會和理由。

<!-- truncate -->

# Gulp 是甚麼?

Gulp 在我目前的使用與理解上就是一個**可以將前端工作流程(前端工程)給與"自動化"的一項工具**，藉由"gulpfile.js" 定義出各式各樣的"工作任務"，加上 gulp 的一些配合外掛與套件，可以進行壓縮 js 和 css 、scss 或搬移檔案的動作。詳情可以請問 wiki 大神[甚麼是 gulp][2]。

話不多說，先做一個簡單的範例吧，這是一個可以把 html copy 到指定地方的工作任務

> PS: 請先預備好工作環境，npm 還有 souce 資料夾，(當然你也可以定義您的資料夾名稱)等，如果可以，再多裝個 yarn (比 npm 還快的 npm，但不是 npm 請看[介紹][3]阿 npm 只是拿來安裝 yarn 的 XD ) 先 npm install 或者 yarn install   之後在資料夾裡新增一個新檔案:gulpfile.js

說明：

接下來**使用 gulp 後面接你所定義的 task name 即可執行**，如上範例 就是在 CMD Key "gulp copyHTML" ，就可以將 source 資料夾裡所有.html 檔名的檔案搬到 public 資料夾下(如果沒有 public 他會幫你建一個!! )。

如果你只想 key gulp 就可以執行也可，只要在 gulpfile.js 定義 gulp.task('default', [/_後面接 task 陣列_/]); 就可以，如上所示就是  gulp.task('default', ["copyHTML"]);

當然啦，gulp 如果只能拿來做搬檔案，其實用 Python 也可以阿! 幹嘛需要用 gulp?  gulp 真正的妙處是在可以利用各式各樣的外掛套件 多樣化並豐富前端工作，像是 gulp-sass 可以將 sass 的檔案轉成 css、用 gulp-concat 合併 css 和 js ,甚至也可以利用套件壓縮 css 和 js 的檔案大小、gulp-jade 更能將 jade 的檔案轉譯成.html，別在這裡問我 jade 是甚麼? jade 就是 html 前置的樣板語言，和 scss/sass 之於 css 有點像，不知道 jade 是甚麼[請由此進][4]。 對了 如果你直接在 google 搜尋打"jade" 會搜尋到"玉"，因為它改名為 "pug" 了阿 XDDDD

如果很認真沒錢的同學，歡迎去自行 google 搜尋 "gulp 教學"，和我一同進入 gulp 的世界，如果有點閒錢，還不用 1000 元，歡迎來六角學院和我一起當同學喔! 老師教得都很詳細、而且每個禮拜有問答會，可以把你碰到的問題提出來(不過或許是工程師性格使然，我都沒有問甚麼問題，自行 google 比較多......)

# 為甚麼用 Gulp 來做履歷?

a.工程師就應該要有不被 104 和其他找工作網站所限制履歷的權利阿(誤?!

b.工程師就應該要有自己的工程師履歷阿，像我很喜歡和崇拜的[Robby Leonardi 大神的履歷][5](大誤?!

好啦，因為六角學院的老師在課程上有介紹了 gulp-data 的套件，我個人相當喜歡，可以說是愛上這個東西，可以先將預先寫好的 json 檔串接，傳到前端的 jade 去渲染出 html 。 這真得是很酷! 另外，**近來在許多的研討會或課程中老師或講者很多都用所謂的 json 來顯示自己是誰，於是讓我就有這個用 gulp 來做履歷的 project 和 idea。**並且我有著後端工程師的一個基本素養，未來的作品和經歷是會越來越多的，如果使用寫死的"html"呈現自己的履歷實在是"太白癡"? 重複的 html code 太多，為何不用**jade 的 each 呢**?

# 做法與想法：

我是個很懶的後端工程師，所以我並沒有想要像 Robby 大神用畫圖阿、客製化強大的 css 和 js 去製作他的履歷(覺得他也很用心的花很多時間)，當然也是我目前還沒達成這樣的境界?!(希望未來可以達到 😎 ) ，所以我的頁面很簡單，就是一些自己寫的一些小 js 和 scss 檔(用 gulp 把 scss 轉為 css)， 然後用 gulp-concat 和 main-bower-files 這個可以將 bower 和 gulp 對接的工具將 bower 引入的"boostrap"、"jquery"、"animate.css"、"font-awesome"、"wow.js" 與我自己客製的包起來並壓縮。

最後，用 gulp-data 和 jade 語法相互配合把自己的履歷網頁刻出來，在這裡，我只想示範 gulp-data 的那段 code 而已

接下來，就是 jade 檔的事情了，想辦法將收到的 data 整理出來寫在網頁上， 如果要[看 code 請至此][6]

# 遇上 gulp-ghPages 的雷

在 gulp 的課程中，講師有講到 gulp-ghPages 這個外掛，這讓我的眼睛為之一亮，因為我只要用 gulp 就能簡單部屬我的履歷，就不用打一堆 git 指令之類 bla bla 的 讓開發與發布可以分得乾乾淨淨的，附帶一提，gh-page 就是 github 可以提供給"靜態網頁"的空間。 可以做為一個簡單的預覽。

然而，我卻遇上了"fatal: could not read Username for 'https://github.com': "  ，或許是因為我不止開發了這個 resume 的小專案，另外我還有開發了一些東西，我使用的是 vs code，在 git global 的設定上，好像我沒有設定 github 的設定，記得每一次我在 git-push 都會出現視窗問我 github 的帳號與密碼......。 呵呵 卡關了一陣子....最後 Goolge 到這個[解答][7] 。雖然不是 gulp-ghpage 的關係，但其實狀況有點像，大概都是 git 的設定上問題，看著他們的討論串，看到這一段

```markdown
The detail step:

1.  go to your local git project directory, open ".git/config" file and delete the "[remote "origin"]" section.
2.  go to git bash and input "git remote add origin https://{username}:{password}@github.com/{username}/project.git"
3.  input git push to check if it works.
```

意思是說，

首先第一步，將.git/config 檔案裡有關於  [remote "origin"] 的區塊砍掉(windows 用戶請將資料夾選項->顯示隱藏的資料夾、檔案和磁碟機，你就會看到.git 資料夾了 )

第二步 key 上 `git remote add origin https://{username}:{password}@github.com/{username}/project.git` (username 和 password 是你的 github 的 username 和 password 以及 project 是你目前所做的 project name )

當然啦，我也是可以去修改 git 的設定，只是小弟搜尋了很久都找不太到怎麼修改(有點忘了)，所以就換了這個奇怪解法。

# 心得與收穫

終於，歷經了快一個月(含學習時間)?! 將這個夢想中我想做的 side project "工程師履歷"做出來，之後除非是要新增甚麼區塊，總之我只要修改 我設計的 json 檔 and gulp 和 gulp deploy 就可以自動化我的履歷拉(尤其對於作品和經歷、專長等大大有幫助 )! 這大大方便以後的履歷更新。 如果各位有關於此類相關更好的建議或做法歡迎再下面與我討論 XD

> 小君曰：人生中能做出多少個 side project 呢?

[1]: http://www.hexschool.com/courses/
[2]: https://en.wikipedia.org/wiki/Gulp.js
[3]: https://yarnpkg.com/zh-Hans/
[4]: https://github.com/pugjs/pug
[5]: http://www.rleonardi.com/interactive-resume/
[6]: https://github.com/r567tw/resume
[7]: https://github.com/kemayo/sublime-text-git/issues/176
