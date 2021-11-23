module.exports = {
  apps: [
    {
      name: `nft-gateway-${process.env.NODE_ENV}`,
      script: './dist/server.js',
    },
  ],
  deploy: {
    testnet: {
      user: 'root',
      host: '207.246.88.9',
      ref: 'origin/master',
      repo: 'git@github.com-nft-gateway:neoncat-io/nft-gateway.git',
      path: '/root/nft-gateway-testnet',
      env: {
        TZ: 'UTC',
        PORT: '6969',
        NODE_ENV: 'testnet'
      },
      'pre-deploy-local': '',
      'post-deploy':
        'yarn install && yarn tsc && pm2 startOrGracefulReload ecosystem.config.js --env testnet',
      'pre-setup': '',
    }
  }
};
