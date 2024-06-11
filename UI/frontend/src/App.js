import './App.css';
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5/react'
//import {ConnectButton} from './web3button'
import ConnectButton from './web3button'
import Components from './getBalance';
import ChartComponent from './areaChart'
import ErrorBoundary from './ErrorBoundary'
import ChartA from './chart';
import ProgressiveChart from './progressiveChart';
import ApexChart from './apex';
import CoinMarketCapData from './CoinMarketCapData';

// 1. Get projectId
const projectId = 'f9c560cd03c686fea5c90144d5fc93b9'

// 2. Set chains
const mainnet = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://cloudflare-eth.com'
}

// 3. Create a metadata object
const metadata = {
  name: 'Test Website',
  description: 'Test for web3 ',
  url: 'localhost://3000', // origin must match your domain & subdomain
  icons: ['https://avatars.mywebsite.com/']
}

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  rpcUrl: '...', // used for the Coinbase SDK
  defaultChainId: 1, // used for the Coinbase SDK
})

// 5. Create a Web3Modal instance
createWeb3Modal({
  ethersConfig,
  chains: [mainnet],
  projectId,
  enableAnalytics: true // Optional - defaults to your Cloud configuration
})

export default function App() {
  return (
    <div>
    <h1> Web 3 Modal Test</h1>
    <p>
      lorem ipsum doler amin
    </p>

    
   
      

   

       {/* <ConnectButton />

       <h1>my blance is {<Components />}</h1>

       <w3m-connect-button>Connect</w3m-connect-button>
       {/* <w3m-account-button>Account</w3m-account-button> 
       <w3m-network-button>Choose Network</w3m-network-button> */}


       
       {/* <ChartA /> */}

<CoinMarketCapData />

 <ErrorBoundary>

<h1>My Chart App</h1>
<ChartComponent />

<ProgressiveChart />

</ErrorBoundary> 
{/* 
<ApexChart /> */}

 

    </div>
  );
}


