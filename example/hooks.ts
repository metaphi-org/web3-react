import { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'

import { injected } from './connectors'

export function useEagerConnect() {
  const { activate, active } = useWeb3React()

  const [tried, setTried] = useState(false)

  useEffect(() => {
    const { ethereum } = window as any
    if (ethereum) {
      ethereum
        .send('eth_accounts')
        .then(({ result: accounts }: any) => {
          if (accounts.length > 0) {
            activate(injected, undefined, true).catch(() => {
              setTried(true)
            })
          } else {
            setTried(true)
          }
        })
        .catch(() => {
          setTried(true)
        })
    }
  }, []) // intentionally only running on mount (make sure it's only mounted once :))

  // if we are trying to connect, wait until it's worked to flip the flag
  useEffect(() => {
    if (active) {
      setTried(true)
    }
  }, [active])

  return tried
}

export function useInactiveListener(suppress: boolean = false) {
  const { active, error, activate } = useWeb3React()

  useEffect(() => {
    const { ethereum } = window as any
    if (ethereum && !active && !error && !suppress) {
      const handleConnect = () => {
        console.log('connect')
      }
      const handleNetworkChanged = (networkId: string) => {
        console.log('networkChanged', networkId)
        activate(injected)
      }
      const handleChainChanged = (_chainId: string) => {
        console.log('chainChanged', _chainId)
      }
      const handleAccountsChanged = (accounts: string[]) => {
        console.log('accountsChanged', accounts)
        if (accounts.length > 0) {
          activate(injected)
        }
      }
      const handleClose = () => {
        console.log('close')
      }

      ethereum.on('connect', handleConnect)
      ethereum.on('networkChanged', handleNetworkChanged)
      ethereum.on('chainChanged', handleChainChanged)
      ethereum.on('accountsChanged', handleAccountsChanged)
      ethereum.on('close', handleClose)

      return () => {
        ethereum.removeListener('connect', handleConnect)
        ethereum.removeListener('networkChanged', handleNetworkChanged)
        ethereum.removeListener('chainChanged', handleChainChanged)
        ethereum.removeListener('accountsChanged', handleAccountsChanged)
        ethereum.removeListener('close', handleClose)
      }
    }

    return () => {}
  }, [active, error, suppress, activate])
}
