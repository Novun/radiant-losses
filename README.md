# radiant-losses<br/>
<br/>
How to run:<br/>
npm install<br/>
node <script_name><br/>
<br/>

index.js: Use this to fetch and process blockchain token transfer logs, maintaining a balance sheet for token holders. -> progress.json<br/>
cvstojson.js: Use this to convert a CSV file into a JSON structure, filtering only relevant data (non-zero balances). -> output.json<br/>
stats.js: Use this to validate and compare holder data across two different sources, providing accuracy metrics. -> console.log<br/>
<br/>
-------------------------------------------------<br/>
<br/>
These are the contracts on Arbitrum:<br/>
https://docs.radiant.capital/radiant/contracts-and-security/arbitrum-contracts<br/>
<br/>
Deposits:<br/>
rWBTC: 0x727354712BDFcd8596a3852Fd2065b3C34F4F770<br/>
rUSDT: 0xd69D402D1bDB9A2b8c3d88D98b9CEaf9e4Cd72d9<br/>
rUSDC.e: 0x48a29E756CC1C097388f3B2f3b570ED270423b3d<br/>
rDAI: 0x0D914606f3424804FA1BbBE56CCC3416733acEC6<br/>
rWETH: 0x0dF5dfd95966753f01cb80E76dc20EA958238C46<br/>
rwstETH: 0x42C248D137512907048021B30d9dA17f48B5b7B2<br/>
rARB: 0x2dADe5b7df9DA3a7e1c9748d169Cd6dFf77e3d01<br/>
rUSDC: 0x3a2d44e354f2d88EF6DA7A5A4646fd70182A7F55<br/>
rweETH: 0xb11A56DA177c5532D5E29cC8363d145bD0822c81<br/>
rgmBTC: 0x876f38f474e48a104c4af4f06ca488099c436c93<br/>
rgmETH: 0xd15a6568dc891fd04aa2f64af56c66c2bede59d6<br/>
<br/>
Loans:<br/>
vdWBTC: 0x3EEaFa33625DF20837eD0Cb83Ae4D1E34788b141<br/>
vdUSDT: 0x7C2E0F792ea5B4a4Dbd7fA7f949CF39A5c0ba185<br/>
vdUSDC.e: 0x107583ADAA37Dfd1CC0bf577183Bf91351d07413<br/>
vdDAI: 0x04A8fAEd05C97290Ab4d793A971AdEe97cD1cBbD<br/>
vdwETH: 0xab04c0841f39596C9F18A981a2BD32F63AB7a817<br/>
vdwstETH: 0x97B81aA985115953Ba31D59781e2D8159A50F488<br/>
vdARB: 0x295b97012945bD4a1A79ec7f679e16761a437e5C<br/>
vdUSDC: 0xD69b772bfFe78165c152Fd2e370b6CaE239E3BDb<br/>
vdweETH: 0x2D7d510Dc21F5384C9efd30811D0366F8b4269DF<br/>
<br/>
These are the contracts on BSC:<br/>
https://docs.radiant.capital/radiant/contracts-and-security/bnb-chain-contracts<br/>
<br/>
Deposits:<br/>
rBTCB: 0x34d4F4459c1b529BEbE1c426F1e584151BE2C1e5<br/>
rUSDT: 0x4Ff2DD7c6435789E0BB56B0553142Ad00878a004<br/>
rBUSD: 0x89d763e8532D256a3e3e60c1C218Ac71E71cF664<br/>
rUSDC: 0x3bDCEf9e656fD9D03eA98605946b4fbF362C342b<br/>
rBNB: 0x58b0BB56CFDfc5192989461dD43568bcfB2797Db<br/>
rETH: 0x455a281D508B4e34d55b31AC2e4579BD9b77cA8E<br/>
rwBETH: 0x6350e53461c7C95964D699cfa4e84cec993eebb1<br/>
<br/>
Loans:<br/>
vdBTCB: 0x3c84437794A5515150982A6F69DE5b3e017004a1<br/>
vdUSDT: 0x437F3dF56eCeE512E407b6eC368523C911D4A283<br/>
vdBUSD: 0x8D3308e14A48f0681CeA94D7C6995Ec73b3973f1<br/>
vdUSDC: 0x81FdA3BE7F3Ca6aCDAe20a8d2B4Ce54B78d70ED0<br/>
vdBNB: 0xCbB96324f77a66e276f80B843ECdB3fADC551bfF<br/>
vdETH: 0xDCB45a8aA72854e06C826B16Fd5038f33E2CB4b0<br/>
vdwBETH: 0xF9956D8dA92cFbC1C5B998afFc86ccE28D42DC61<br/>
