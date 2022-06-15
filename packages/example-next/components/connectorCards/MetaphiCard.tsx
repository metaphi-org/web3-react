import { useState } from 'react'
import { hooks, metaphi } from '../../connectors/metaphiWallet'
import { Accounts } from '../Accounts'
import { Card } from '../Card'
import { ConnectWithSelect } from '../ConnectWithSelect'
import { Status } from '../Status'
// Metaphi components.
import { MetaphiModal } from '@metaphi/airwallet-ui'
import { ethers } from 'ethers'
import '@metaphi/airwallet-ui/dist/main.css'

const { useChainId, useAccounts, useError, useIsActivating, useIsActive, useProvider, useENSNames } = hooks


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

export default function MetaphiCard() {
  const [value, setValue] = useState(0)
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

  const handleSignMessage = async () => {
    const signer = provider.getSigner(accounts[0]);

    const message = `Hello, from Metaphi`;
    const value = await signer.signMessage(message);
    alert(value)
  }

  const handleSignTransaction = async () => {
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
      const tx = await helloWorldContract.set(1);
      console.log(tx);
    } catch (ex) {
      console.log(`Error signing: `, ex);
    }
  }

  return (
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
      <MetaphiModal />
      <div id="mWalletContainer"></div>
      <button onClick={handleSignMessage}>Sign Message</button>
      <button onClick={handleSignTransaction}>Sign Transaction</button>
    </Card>
  )
}
