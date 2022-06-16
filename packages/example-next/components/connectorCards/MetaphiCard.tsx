/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useEffect, useState } from 'react'
import { Accounts } from '../Accounts'
import { Card } from '../Card'
import { ConnectWithSelect } from '../ConnectWithSelect'
import { Status } from '../Status'
// Metaphi components.
import { MetaphiModal } from '@metaphi/airwallet-ui'
import { ethers } from 'ethers'
import { initializeConnector } from '@web3-react/core'
import { MetaphiConnector } from '@metaphi/airwallet-integrations'
import '@metaphi/airwallet-ui/dist/main.css'

// Contact details.
const CONTRACT_ADDRESS = `0x3591183651728F8d7e6F1115d52c2200f56F4e4a`;

const abi = [
  {
    inputs: [
      {
        internalType: `uint256`,
        name: `x`,
        type: `uint256`,
      },
    ],
    name: `set`,
    outputs: [],
    stateMutability: `nonpayable`,
    type: `function`,
  },
  {
    inputs: [],
    name: `get`,
    outputs: [
      {
        internalType: `uint256`,
        name: ``,
        type: `uint256`,
      },
    ],
    stateMutability: `view`,
    type: `function`,
  },
];

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
      userInputMethod: undefined,
    },
}

// Connector. Move to different file.
const [metaphi, hooks] = initializeConnector<MetaphiConnector>((actions) => new MetaphiConnector(actions, false, config))
const { useChainId, useAccounts, useError, useIsActivating, useIsActive, useProvider, useENSNames } = hooks

// Component.
export default function MetaphiCard() {
  const [loaded, setLoaded] = useState(false)

  const chainId = useChainId()
  const accounts = useAccounts()
  const error = useError()
  const isActivating = useIsActivating()

  const isActive = useIsActive()

  const provider = useProvider()
  const ENSNames = useENSNames(provider)
  console.log('Signer', provider?.getSigner())
  console.log('isActive: ', isActive)
  console.log('chainId: ', chainId)
  console.log('accounts: ', accounts)

  useEffect(() => {
    console.log('Initializing plugin.')
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    async function loadPlugin() { await metaphi.addPlugin(); setLoaded(true) }
    void loadPlugin()
  }, [])

  const handleSignMessage = async (): Promise<void> => {
    console.log('Accounts: ', accounts[0])
    const signer = provider.getSigner(accounts[0]);

    const message = `Hello, from Metaphi`;
    try {
      const value = await signer.signMessage(message);
      console.log('Signed message: ', value)
      alert('Check console.')
    } catch (ex) {
      console.log(ex)
    }
    
  }

  const handleSignTransaction = async (): Promise<void> => {
    console.log("Signing transaction")
    // Signer
    const address = accounts[0];
    const signer = provider.getSigner(address);

    // Contract
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const helloWorldContract = new ethers.Contract(
      CONTRACT_ADDRESS,
      abi,
      signer,
    );

    try {
      console.log("Calling contract function ...")
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const tx = await helloWorldContract.set(1);
      console.log(tx);
      alert('Check console.')
    } catch (ex) {
      console.log(`Error signing: `, ex);
    }
  }

  const cardContent = (
    <Card>
      <div>
        <b>Metaphi</b>
        <Status isActivating={isActivating} error={error} isActive={isActive} />
        <div style={{ marginBottom: '1rem' }} />
        <Accounts accounts={accounts} provider={provider} ENSNames={ENSNames} />
      </div>
      <div style={{ marginBottom: '1rem' }} />
      <ConnectWithSelect
        connector={metaphi}
        chainId={chainId}
        isActivating={isActivating}
        error={error}
        isActive={isActive}
      />
      {
        isActive && <>
          <button onClick={handleSignMessage}>Sign Message</button>
          <button onClick={handleSignTransaction}>Sign Transaction</button>
        </>
      }
    </Card>
  )

  return (
    <>
      { loaded && cardContent }
      {/** Should always be rendered for Metaphi plugin to populate. */}
      <div id="mWalletContainer"></div>
      <MetaphiModal />
    </>
  )
}
