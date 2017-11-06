// Sanitizing new message
//
// When creating a new message, we automatically want to sanitize HTML input,
// add the user that sent it and include the date the message has been created
// before saving it in the database. This is where hooks come into play, in our
// case specifically a before hook. To create a new hook we can run:
//
//   feathers generate hook
//
// The hook we want to create will be called process-message. Since we want to
// pre-process our data, the next prompt asking for what kind of hook, we will
// choose before from the list.
//
// Next we will see a list of all our services we can add this hook to. For this
// hook we will only choose the messages service (navigate to the entry with the
// arrow keys and select it with the space key).
//
// A hook can run before any number of service methods, for this one we will
// only select "create".
//
// Now it is time to add some code. Update src/hooks/process-message.js to look
// like this:

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function() {
  return function(hook) {
    // The authenticated user
    const user = hook.params.user;
    // The actual message text
    const text = hook.data.text
    // Messages can't be longer than 400 characters
      .substring(0, 400)
      // Do some basic HTML escaping
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

    // Override the original data
    hook.data = {
      text,
      // Set the user id
      userId: user._id,
      // Add the current time via `getTime`
      createdAt: new Date().getTime()
    };

    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    return Promise.resolve(hook);
  };
};


// This will do several things:

// 1. Truncate the messages text property to 400 characters and do some basic HTML escaping.
//
// 2. Update the data submitted to the database to contain
//   - the new truncated and sanitized text
//   - the currently authenticated user (so we always know who sent it)
//   - the current (creation) date
//
// 3. Return a Promise that resolves with the hook object (this is what any hook should return)
