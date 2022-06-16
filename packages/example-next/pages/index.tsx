import MetaphiCard from '../components/connectorCards/MetaphiCard'

global.exports = {}

export default function Home() {
  return (
    <>
      {/* <ProviderExample /> */}
      <div style={{ display: 'flex', flexFlow: 'wrap', fontFamily: 'sans-serif' }}>
        <MetaphiCard /> 
      </div>
    </>
  )
}
