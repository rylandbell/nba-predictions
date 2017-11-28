const fs = require("fs");
const { promisify } = require("util");
const parse = promisify(require("csv-parse"));
const moment = require("moment");
const fetch = require("isomorphic-fetch");

const readFile = promisify(fs.readFile);

const getPicks = require("./getPicks");
const submitPicks = require("./submitPicks");

const colNames = require("./constants").colNames;
const targetUrl = require("./constants").url;

const [execPath, filePath, targetDate, forceRun] = process.argv;

// Only run script on the 28th of a month, or if an extra parameter has been passed from the command line.
const currentDayOfMonth = moment().format("D");
if (!forceRun && currentDayOfMonth !== "28") {
  console.log("Not adding AI Picks today.");
  process.exit();
}

// Get game probability data from 538, convert it to an optimized array of predictions,
// then submit it as a userMonth
async function main() {
  try {
    // Use locally stored sample data (for development only)
    // const csvData = await readFile(`${__dirname}/sample_data.csv`, "utf8");

    //Get up-to-date data from FiveThirtyEight:
    const rawResponse = await fetch(targetUrl);
    const csvData = await rawResponse.text();

    const parsedData = await parse(csvData, { columns: colNames });
    const picks = getPicks(parsedData);

    const submitResponse = await submitPicks(picks);
    const readableResponse = await submitResponse.json();

    console.log("Picks successfully submitted:\n", readableResponse);
  } catch (err) {
    console.log("caught an error: ", err);
  }
}

main();
