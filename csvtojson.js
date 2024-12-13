const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

// Input and output file paths
const inputFilePath = path.join(__dirname, "input.csv");
const outputFilePath = path.join(__dirname, "output.json");

// Create the JSON structure
const holders = {};

fs.createReadStream(inputFilePath)
  .pipe(csv())
  .on("data", (row) => {
    const holderAddress = row["address"];
    const wbtcRToken = parseFloat(row["WBTC rToken"]);

    // Only add to holders if the WBTC rToken value is greater than 0
    if (wbtcRToken > 0) {
      holders[holderAddress] = wbtcRToken;
    }
  })
  .on("end", () => {
    // Prepare the final JSON object
    const jsonOutput = { holders };

    // Write to output JSON file
    fs.writeFileSync(outputFilePath, JSON.stringify(jsonOutput, null, 2));
    console.log(`Converted CSV to JSON. Output written to ${outputFilePath}`);
  })
  .on("error", (error) => {
    console.error("Error reading the CSV file:", error);
  });
