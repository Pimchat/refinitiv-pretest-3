const axios = require("axios");
const cheerio = require("cheerio");

async function getFund() {
  try {
    const siteUrl = "https://codequiz.azurewebsites.net/";

    const { data } = await axios({
      method: "GET",
      url: siteUrl,
      headers: { Cookie: "hasCookie=true" },
    });

    const $ = cheerio.load(data);
    const search = process.argv[2];

    for (let i = 2; i <= 5; i++) {
      let inputSelector = `body > table > tbody > tr:nth-child(${i}) > td:nth-child(1)`;
      let outputSelector = `body > table > tbody > tr:nth-child(${i}) > td:nth-child(2)`;
      let input = $(inputSelector).text();
      let output = $(outputSelector).text();

      if (search == input.trim()) {
        console.log(output);
        break;
      }
    }
  } catch (err) {
    console.log(err);
  }
}

getFund();
