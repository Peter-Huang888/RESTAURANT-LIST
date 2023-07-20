## 我的美食餐廳
一個使用 Node.js + Express 打造的餐廳網站，記錄我收藏的美食餐廳，使用者可以輸入關鍵字查詢我的口袋名單，並且點擊查看詳細的餐廳資訊

## Screen Photos - 傳案畫面
![image](https://github.com/Peter-Huang888/RESTAURANT-LIST/blob/main/public/img/homePage.jpg)
![image](https://github.com/Peter-Huang888/RESTAURANT-LIST/blob/main/public/img/restaurantInfo.jpg)

## Features - 產品功能
1. 使用者可以註冊帳號，註冊的資料包括：名字、email、密碼、確認密碼。
   - 其中 email 與密碼是必填欄位，但名字不是
   - 使用者已經註冊過、沒填寫必填欄位、或是密碼輸入錯誤，就註冊失敗，並回應給使用者錯誤訊息
2. 使用者也可以透過 Facebook Login 直接登入
   - Facebook Login Callback URL 需為 "http://localhost:3000/auth/facebook/callback"
3. 使用者的密碼要使用 bcrypt 來處理

4. 使用者必須登入才能使用餐廳清單，
   - 如果沒登入，會被導向登入頁面
   - 登入後，使用者可以建立並管理專屬他的一個餐廳清單
   - 使用者登出、註冊失敗、或登入失敗時，使用者都會在畫面上看到正確而清楚的系統訊息
5. 使用者可以新增一家餐廳
6. 使用者可以瀏覽一家餐廳的詳細資訊
7. 使用者可以瀏覽全部所有餐廳
8. 使用者可以修改一家餐廳的資訊
9. 使用者可以刪除一家餐廳
10. 使用者可以利用類別、餐廳中英文名稱，搜尋符合關鍵字的餐廳
11. 使用者可以利用類別、餐廳名稱、評分，排列餐廳順序

## Environment Setup -環境建置
1. 請先確認有安裝 node.js 與 npm
2. 將專案 clone 到本地
3. 在本地開啟之後，透過終端機進入資料夾，輸入：

   ```bash
   npm install
   ```

4. 安裝完畢後，繼續輸入：

   ```bash
   npm run start
   ```

5. 若看見此行訊息則代表順利運行，打開瀏覽器進入到以下網址

   ```bash
   Welcome to my restaurant website: http://localhost:3000
   ```

6. 若欲暫停使用

   ```bash
   ctrl + c
   ```

現在，你可開啟任一瀏覽器瀏覽器輸入 [http://localhost:3000](http://localhost:3000) 開始建立自己的美食清單網站囉！

- PS.如果需要載入種子資料可以在終端機輸入
   ```bash
   npm run seed
   ```

## Built With- 使用工具
- [Visual Studio Code](https://visualstudio.microsoft.com/zh-hant/) - 開發環境
- [Express](https://www.npmjs.com/package/express) - 應用程式架構
- [Express-Handlebars](https://www.npmjs.com/package/express-handlebars) - 模板引擎
- [body-parser](https://www.npmjs.com/package/body-parser)
- MongoDB
- [mongoose](https://www.npmjs.com/package/mongoose)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [express-session](https://www.npmjs.com/package/express-session)
- [passport](https://www.npmjs.com/package/passport)
- [passport-local](https://www.npmjs.com/package/passport-local)
- [passport-facebook](https://www.npmjs.com/package/passport-facebook)
- [connect-flash](https://www.npmjs.com/package/connect-flash)
- Bootstrap 5.2.1
- Font-awesome 5.8.1
## Contributor - 專案開發人員

[Peter-Huang888](https://github.com/Peter-Huang888)