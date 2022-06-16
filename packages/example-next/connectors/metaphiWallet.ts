import { initializeConnector } from '@web3-react/core'
import { MetaphiConnector } from '@metaphi/airwallet-integrations'

const config = {
    accountConfig: {
        clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
        apiKey: process.env.NEXT_PUBLIC_API_KEY,
        domain: process.env.NEXT_PUBLIC_DOMAIN,
        dApp: process.env.NEXT_PUBLIC_DAPP,
    },
    networkConfig: {
      rpcUrl: `https://rpc-mumbai.maticvigil.com/v1/228086989d463ee6d4d29dde983a0db83b65ef24`,
      name: `Mumbai Testnet`,
      chainId: 80001,
    },
    custom: {
    },
}

export const [metaphi, hooks] = initializeConnector<MetaphiConnector>((actions) => new MetaphiConnector(actions, false, config))
