const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = phase => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        MONGODB_USERNAME: 'ryaniguchi1',
        MONGODB_PASSWORD: '9NbuZtBHawCqsGeM',
        MONGODB_CLUSTERNAME: 'cluster0',
        MONGODB_DATABASE: 'blog-dev',
      },
    };
  }

  return {
    poweredByHeader: false,
    env: {
      MONGODB_USERNAME: 'ryaniguchi1',
      MONGODB_PASSWORD: '9NbuZtBHawCqsGeM',
      MONGODB_CLUSTERNAME: 'cluster0',
      MONGODB_DATABASE: 'blog',
    },
  };
};
