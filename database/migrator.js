// eslint-disable-next-line node/no-unpublished-require
require('ts-node/register');

require('./umzug').migrator.runAsCLI();
