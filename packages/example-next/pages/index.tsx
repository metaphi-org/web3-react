import CoinbaseWalletCard from '../components/connectorCards/CoinbaseWalletCard'
import GnosisSafeCard from '../components/connectorCards/GnosisSafeCard'
import MetaMaskCard from '../components/connectorCards/MetaMaskCard'
import MetaphiCard from '../components/connectorCards/MetaphiCard'
import NetworkCard from '../components/connectorCards/NetworkCard'
import WalletConnectCard from '../components/connectorCards/WalletConnectCard'
import ProviderExample from '../components/ProviderExample'

global.exports = {}

export default function Home() {
  return (
    <>
      <script>var exports = {};</script>
      <ProviderExample />
      <div style={{ display: 'flex', flexFlow: 'wrap', fontFamily: 'sans-serif' }}>
        <MetaphiCard />
        <MetaMaskCard />
        <WalletConnectCard />
        <CoinbaseWalletCard />
        <NetworkCard />
        <GnosisSafeCard />
      </div>
    </>
  )
}
