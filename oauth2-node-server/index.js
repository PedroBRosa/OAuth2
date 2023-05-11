const express = require("express");
const axios = require("axios");
var cors = require("cors");
const CLIENT_ID = "83888219a68dd693de99";
const CLIENT_SECRET = "c1ab2d9a00360064c5c2f5272c7940b00923775b";
const GITHUB_URL = "https://github.com/login/oauth/access_token";
const app = express();


app.use(cors({ credentials: true, origin: true }));

app.get("/oauth/redirect", (req, res) => {
  axios({
    method: "POST",
    url: `${GITHUB_URL}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${req.query.code}`,
    headers: {
      Accept: "application/json",
    },
  }).then((response) => {
    res.redirect(
      `http://localhost:3000?access_token=${response.data.access_token}`
    );
  });
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
