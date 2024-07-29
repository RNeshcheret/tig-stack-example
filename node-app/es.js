const { Client } = require("@elastic/elasticsearch");

const client = new Client({
  node: process.env.NODE_APP_ES,
  log: "trace",
});

const INDEX_NAME = "logs";

client
  .ping()
  .then(() => console.log("[ES] Connected!"))
  .catch("[ES] Error: ", console.error);

const init = async () => {
  const exists = await client.indices.exists({ index: INDEX_NAME });

  if (exists) return;

  await client.indices.create({
    index: INDEX_NAME,
  });

  await mockData();
};

const mockData = async () => {
  const mockDocs = Array.from({ length: 1000 }, (_, i) => ({
    index: { _index: INDEX_NAME },
    message: `test ${i}`,
  }));

  await client.bulk({
    body: mockDocs,
  });
};

const search = async (message) => {
  const result = await client.search({
    index: "logs",
    body: {
      query: {
        match: {
          message,
        },
      },
    },
  });
  return result;
};

module.exports = {
  init,
  search,
};
