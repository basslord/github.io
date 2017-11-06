// Securing the messages service
//
// Now we have to restrict our messages service to authenticated users.
// If we run feathers3 generate authentication before generating other
// services it will ask if the service should be restricted to authenticated
// users. Because we created the messages service first, however we
// have to update src/services/messages/messages.hooks.js manually
// to look like this. This will now only allow users with a valid JWT to
// access the service.

'use strict';

const { authenticate } = require('feathers3-authentication').hooks;
const { populate } = require('feathers3-hooks-common');
const processMessage = require('../../hooks/process-message');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [ processMessage() ],
    update: [ processMessage() ],
    patch:  [ processMessage() ],
    remove: []
  },

  after: {
    all: [
      populate({
        schema: {
          include: [{
            service: 'users',
            nameAs: 'user',
            parentField: 'userId',
            childField: '_id'
          }]
        }
      })
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};


// This will include the user property using the userId, retrieving it from
// the users service to all messages.
//
// NOTE: You can learn more about how the populate hook works by checking
// out he API docs for feathers3-hooks-common.
