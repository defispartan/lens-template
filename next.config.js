/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gw.ipfs-lens.dev',
        pathname: '/ipfs/**',
      },
      {
        protocol: 'https',
        hostname: 'polygonscan.com',
        pathname: '/token/images/**',
      },
      {
        protocol: 'https',
        hostname: 'assets.coingecko.com',
        pathname: '/coins/images/**',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/trustwallet/assets/master/blockchains/**',
      },
      {
        protocol: 'https',
        hostname: 's2.coinmarketcap.com',
        pathname: '/static/img/coins/**',
      }
    ],
  },
}

module.exports = nextConfig 