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
        rpcUrl: "https://matic-mumbai.chainstacklabs.com"
    },
    custom: {
    }
}

// TODO: 
// const allowedChainIds = [];

export const [metaphi, hooks] = initializeConnector<MetaphiConnector>((actions) => new MetaphiConnector(actions, false, config))
