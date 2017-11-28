const fetch = require("isomorphic-fetch");

module.exports = picks => {
  const isProduction = process.env.NODE_ENV === "production";
  const server = isProduction
    ? "https://frozen-retreat-57000.herokuapp.com"
    : "http://localhost:3000";

  const url = `${server}/api/userMonth`;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("token", process.env.AI_PLAYER_TOKEN);

  const newRequest = {
    method: "POST",
    mode: "cors",
    cache: "default",
    headers: headers,
    body: JSON.stringify(picks)
  };

  return fetch(url, newRequest);
};
