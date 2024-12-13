const fs = require("fs");

const PROGRESS_FILE = "progress.json";
const OUTPUT_FILE = "output.json";

const loadJson = (filePath) => {
  if (!fs.existsSync(filePath)) {
    console.error(`File "${filePath}" not found.`);
    return null;
  }
  return JSON.parse(fs.readFileSync(filePath));
};

const roundBalance = (balance) => {
  return parseFloat(balance.toFixed(8));
};

const compareHolders = (progressHolders, outputHolders) => {
  let identical = 0;
  let matchedHolders = 0;

  const progressKeys = Object.keys(progressHolders);
  const outputKeys = Object.keys(outputHolders);

  for (const address of progressKeys) {
    const progressBalance = roundBalance(progressHolders[address]);
    if (outputKeys.includes(address)) {
      const outputBalance = parseFloat(outputHolders[address]);
      if (progressBalance === outputBalance) {
        identical++;
      }
      matchedHolders++;
    }
  }

  const totalProgressHolders = progressKeys.length;
  const totalOutputHolders = outputKeys.length;
  const accuracy = ((matchedHolders / totalProgressHolders) * 100).toFixed(2);

  return {
    identical,
    matchedHolders,
    totalProgressHolders,
    totalOutputHolders,
    accuracy,
  };
};

const main = () => {
  const progressData = loadJson(PROGRESS_FILE);
  const outputData = loadJson(OUTPUT_FILE);

  if (!progressData || !outputData) return;

  const progressHolders = progressData.holders || {};
  const outputHolders = outputData.holders || {};

  const stats = compareHolders(progressHolders, outputHolders);

  console.log("Comparison Stats:");
  console.log(`Identical Holders: ${stats.identical}`);
  console.log(`Matched Holders: ${stats.matchedHolders}`);
  console.log(`Total Holders in Progress: ${stats.totalProgressHolders}`);
  console.log(`Total Holders in Output: ${stats.totalOutputHolders}`);
  console.log(`Accuracy: ${stats.accuracy}%`);
};

main();
