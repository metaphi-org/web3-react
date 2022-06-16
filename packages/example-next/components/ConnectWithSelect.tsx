/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-constant-condition */
import type { Web3ReactHooks } from '@web3-react/core'
import type { MetaphiConnector as Metaphi } from '@metaphi/airwallet-integrations'
import { useCallback, useState } from 'react'
import { CHAINS, getAddChainParameters, URLS } from '../chains'

export function ConnectWithSelect({
  connector,
  chainId,
  isActivating,
  error,
  isActive,
}: {
  connector: Metaphi,
  chainId: ReturnType<Web3ReactHooks['useChainId']>
  isActivating: ReturnType<Web3ReactHooks['useIsActivating']>
  error: ReturnType<Web3ReactHooks['useError']>
  isActive: ReturnType<Web3ReactHooks['useIsActive']>
}) {
  const isNetwork = false

  const [desiredChainId, setDesiredChainId] = useState<number>(isNetwork ? 1 : -1)

  if (error) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '1rem' }} />
        <button
          onClick={() =>
            false
              ? void connector.activate()
              : false
              ? void connector.activate(desiredChainId === -1 ? undefined : desiredChainId)
              : void connector.activate(desiredChainId === -1 ? undefined : getAddChainParameters(desiredChainId))
          }
        >
          Try Again?
        </button>
      </div>
    )
  } else if (isActive) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '1rem' }} />
        <button onClick={() => void connector.deactivate()}>Disconnect</button>
      </div>
    )
  } else {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '1rem' }} />
        <button
          onClick={
            isActivating
              ? undefined
              : () =>
                  false
                    ? void connector.activate()
                    : false
                    ? connector.activate(desiredChainId === -1 ? undefined : desiredChainId)
                    : connector.activate(desiredChainId === -1 ? undefined : getAddChainParameters(desiredChainId))
          }
        >
          Connect
        </button>
      </div>
    )
  }
}
