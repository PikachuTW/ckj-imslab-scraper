# CK JUDGE BONUS 爬蟲通知程式

## Description

這個程式會在每次啟動時抓三天內的通知，並且運行時每分鐘檢查一次有沒有新的通知

不過一旦出現過的通知，就會存在本地電腦中，不會再出現

## Installation

Following these steps to run the app:

1. Clone the respository(or just download it):

    ```sh
    git clone https://github.com/PikachuTW/ckj-imslab-scraper
    ```

2. Open the directory:

    ```sh
    cd ckj-imslab-scraper
    ```

3. Installed the packages：

    ```sh
    yarn install
    ```

    or install with npm/pnpm

    ```sh
    npm install
    ```

4. Setting your cookie in `.env` file：
    - Please google if you don't know how to copy it
    - The cookie should be like this

    ```env
    cookie="connect.sid=[something]"
    ```

## Usage

Use node.js (or bun) to run the program

```sh
node index.js
```
