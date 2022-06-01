/**
 * @type {import('next').NextConfig}
 */
 const withTM = require("next-transpile-modules")(["@metaphi/airwallet-api", "@metaphi/airwallet-ui", "@metaphi/airwallet-integrations"]);
 
const nextConfig = {
  env: {
    infuraKey: process.env.INFURA_KEY,
    alchemyKey: process.env.ALCHEMY_KEY,
    magicKey: process.env.MAGIC_KEY,
  },
}

module.exports = withTM(nextConfig)
