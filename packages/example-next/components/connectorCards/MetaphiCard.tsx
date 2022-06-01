import { useState } from 'react'
import { hooks, metaphi } from '../../connectors/metaphiWallet'
import { Accounts } from '../Accounts'
import { Card } from '../Card'
import { ConnectWithSelect } from '../ConnectWithSelect'
import { Status } from '../Status'
// Metaphi components.
import { MetaphiModal } from '@metaphi/airwallet-ui'
import '@metaphi/airwallet-ui/dist/main.css'

const { useChainId, useAccounts, useError, useIsActivating, useIsActive, useProvider, useENSNames } = hooks

export default function MetaphiCard() {
  const [value, setValue] = useState(0)
  const chainId = useChainId()
  const accounts = useAccounts()
  const error = useError()
  const isActivating = useIsActivating()

  const isActive = useIsActive()

  const provider = useProvider()
  const ENSNames = useENSNames(provider)
  console.log('Provider in Metaphi', provider)
  console.log('isActive: ', isActive)
  console.log('chainId: ', chainId)
  console.log('accounts: ', accounts)

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
      <button onClick={(e) => setValue(value+1)}>Click {value}</button>
    </Card>
  )
}
