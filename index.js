const fs = require("fs");
const axios = require("axios");

const { ethers } = require("ethers");

// ABI for the event
const abi = [
  "event Transfer(address indexed from, address indexed to, uint256 value)",
];

const ALCHEMY_API_KEY = "#";
const CONTRACT_ADDRESS = "0x727354712BDFcd8596a3852Fd2065b3C34F4F770";
const DECIMALS = 8;
const PROGRESS_FILE = "progress.json";

let holders = {};
let progress = {
  fromBlock: 0,
  totalLogs: 0, // New property to track total logs
};

const loadProgress = () => {
  if (fs.existsSync(PROGRESS_FILE)) {
    const data = JSON.parse(fs.readFileSync(PROGRESS_FILE));
    progress = data.progress || progress;
    holders = data.holders || holders;
  }
};

const saveProgress = () => {
  fs.writeFileSync(
    PROGRESS_FILE,
    JSON.stringify({ progress, holders }, null, 2)
  );
};

const fetchLogs = async (fromBlock, toBlock) => {
  const url = `https://arb-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;
  const data = {
    jsonrpc: "2.0",
    method: "eth_getLogs",
    params: [
      {
        fromBlock: `0x${fromBlock.toString(16)}`,
        toBlock: `0x${toBlock.toString(16)}`,
        address: CONTRACT_ADDRESS,
        topics: [
          "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
        ], // Transfer event
      },
    ],
    id: 1,
  };

  const response = await axios.post(url, data);
  return response.data.result;
};

const processLogs = (logs) => {
  // Update the total log counter
  progress.totalLogs += logs.length;

  for (const log of logs) {
    const from = `0x${log.topics[1].slice(26)}`.toLowerCase();
    const to = `0x${log.topics[2].slice(26)}`.toLowerCase();

    const encoded_log = {
      data: log.data,
      topics: log.topics,
    };

    const iface = new ethers.Interface(abi);
    const decoded = iface.parseLog(encoded_log);
    const decoded_value = decoded.args.value;

    const value = parseFloat(ethers.formatUnits(decoded_value, DECIMALS));

    if (from !== "0x0000000000000000000000000000000000000000") {
      holders[from] = (holders[from] || 0) - value;
      if (holders[from] <= 0) delete holders[from];
    }

    if (to !== "0x0000000000000000000000000000000000000000") {
      holders[to] = (holders[to] || 0) + value;
    }
  }
};

const main = async () => {
  loadProgress();

  let latestBlock = parseInt(
    (
      await axios.post(
        `https://arb-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
        {
          jsonrpc: "2.0",
          method: "eth_blockNumber",
          params: [],
          id: 1,
        }
      )
    ).data.result,
    16
  );

  let fromBlock = progress.fromBlock;
  const step = 100000; // Number of blocks per fetch

  while (fromBlock <= latestBlock) {
    const toBlock = Math.min(fromBlock + step, latestBlock);
    console.log(`Fetching logs from ${fromBlock} to ${toBlock}`);

    try {
      const logs = await fetchLogs(fromBlock, toBlock);
      processLogs(logs);

      console.log(`Logs found in this batch: ${logs.length}`);
      console.log(`Total logs processed so far: ${progress.totalLogs}`);

      // Update latest block dynamically to ensure it fetches until the latest block
      latestBlock = parseInt(
        (
          await axios.post(
            `https://arb-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
            {
              jsonrpc: "2.0",
              method: "eth_blockNumber",
              params: [],
              id: 1,
            }
          )
        ).data.result,
        16
      );

      fromBlock = toBlock + 1;
      progress.fromBlock = fromBlock;
      saveProgress();
    } catch (error) {
      console.error(`Error fetching or processing logs: ${error.message}`);
      console.log("Retrying...");
    }
  }

  console.log("Final holders:", holders);
  console.log(`Total logs processed: ${progress.totalLogs}`);
  saveProgress();
};

main().catch(console.error);
