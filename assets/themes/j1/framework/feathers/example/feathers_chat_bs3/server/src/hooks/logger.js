// A hook that logs service method before, after and error
const winston = require('winston');

// jadams create 2 transports (console|file) for the logger
var logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({'timestamp':true}),
      new (winston.transports.File)({ filename: 'chat_server.log' })
    ]
});

module.exports = function () {
  return function (hook) {
    let message = `${hook.type}: ${hook.path} - Method: ${hook.method}`;

    if (hook.type === 'error') {
      message += `: ${hook.error.message}`;
    }

    logger.info(message);
    logger.debug('hook.data', hook.data);
    logger.debug('hook.params', hook.params);

    if (hook.result) {
      logger.debug('hook.result', hook.result);
    }

    if (hook.error) {
      logger.error(hook.error);
    }
  };
};
