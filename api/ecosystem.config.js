module.exports = {
  apps: [
    {
      name: 'api-dev',
      script: 'index.js',
  
      // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
      watch: true,
      ignore_watch: [
        'uploads',
      ],
      env: {
        NODE_ENV: 'development',
      },
      time: true,
    },
    {
      name: 'api-prod',
      script: 'index.js',
      instances: 2,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
      },
      time: true,
    },
  ],
};
  