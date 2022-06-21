// const HDWalletProvider = require('@truffle/hdwallet-provider');
// const Web3 = require('web3');

// const { abi, evm } = require('./compile');

// provider = new HDWalletProvider(
//   'auto cloth north arrest find cupboard exact hammer struggle iron nurse pulse',
//   'https://rinkeby.infura.io/v3/46ec9fdd83c144189e63d56676e2fa85'
// );
import HDWalletProvider from '@truffle/hdwallet-provider';
import Web3 from 'web3';
import { abi, evm } from './compile.js';
import dotenv from "dotenv";
dotenv.config();

const RINKEBY_API_KEY = process.env.RINKEBY_API_KEY;
const INFURA_API_URL = process.env.INFURA_API_URL;
console.log("RINKEBY_API_KEY: "+RINKEBY_API_KEY);
console.log("INFURA_API_URL: "+INFURA_API_URL);
// const provider = new HDWalletProvider(
//   `${RINKEBY_API_KEY}`,
//   // remember to change this to your own phrase!
//   `https://rinkeby.infura.io/v3/${INFURA_API_URL}`
//   // remember to change this to your own endpoint!
// );
const provider = new HDWalletProvider({
  mnemonic: {
    // Gives access to public-private key pairs.
    phrase:RINKEBY_API_KEY,
  },
  // URL to what network we want to connect to (link from infura.io).
  providerOrUrl:
  `https://rinkeby.infura.io/v3/${INFURA_API_URL}`,
});

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(abi))
    .deploy({ data: evm })
    .send({ gas: '3000000', from: accounts[0] });

  console.log(abi);
  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};
deploy();
