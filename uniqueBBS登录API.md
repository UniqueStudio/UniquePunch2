# UniqueBBS 登录 API

## 使用账号（昵称）密码登录

-   约定：每个人的昵称是唯一的，不会重复
-   约定：假设 unique BBS 服务器所在的网页 外部访问地址是https://api.bbs.hzytql.top/，需要按照情况替换
-   请求方式：POST，请求地址：https://api.bbs.hzytql.top/user/login/pwd
-   请求头
    > Content-Type:application/x-www-form-urlencoded
-   Body 参数
    > nickname
    > pwd

> nickname 是昵称（用户名）
> pwd 是 MD5 在前端加密后 的字符串（避免明文传递密码）

-   返回结果示例
    -   错误
    ```JSON
    {
      "code": -1,
      "msg": "密码错误！"
    }
    ```
    -   成功
    ```JSON
      {
      "code": 1,
      "msg": {
          "uid": "cjr7mipuu007w0833f2jbr2mj",
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJjanI3bWlwdXUwMDd3MDgzM2YyamJyMm1qIiwiaXNBZG1pbiI6dHJ1ZSwidXNlcm5hbWUiOiLmnajlrZDotooiLCJpYXQiOjE1NDg5Mzk4MjcsImV4cCI6MTU0OTAyNjIyN30.rGlR0iADByyTz6ZJWRDM7l2Sp76bKSvSeT1_HYPMBOc",
          "isAdmin": false,
          "avatar": "https://p.qpic.cn/wwhead/duc2TvpEgSTPk74IwG7Bs95s34PVsmgbG36Ol5EBfgvh4dDWNeKfRLW8tWnSiaUVbkpsLB2oJe9U/0",
          "username": "杨子越",
          "userid":"YangZiYue"
          }
      }
    ```
-   返回结果解读

    -   code
        code 是 number 型，只有 code === 1，为登录成功，code === -1 为登录失败
    -   msg
        -   当登录失败时候，msg 是一个 string，为失败的错误原因
        -   当登录成功的时候，msg 是一个 object，里面报文如上图所示
            -   其中，token 为返回的 token，可以用此 token，作为 header 中的 Authorization ， 获取其他的用户信息（如宿舍号，等等）
            -   isAdmin，是否是管理员
            -   userid，是企业微信的 userid（唯一）
