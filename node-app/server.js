const express = require("express");
const app = express();
const port = process.env.NODE_APP_PORT || 4000;
const { search, init } = require("./es");
const { getDbConnection } = require("./mongo");

function startServer() {
  init(); // init ES index

  app.get("/db", async (req, res) => {
    console.log("db");

    const db = await getDbConnection();

    const result = await db.collection("tasks").find({}).toArray();

    console.log(result);

    res.send("ok");
  });

  app.get("/search", async (req, res) => {
    console.log("search");

    const result = await search("test");

    res.send("ok");
  });

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

startServer();
