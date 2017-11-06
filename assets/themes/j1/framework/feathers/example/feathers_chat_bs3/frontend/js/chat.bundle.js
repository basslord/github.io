/*
 # -----------------------------------------------------------------------------
 #  J1: ~/assets/themes/j1/apps/feathers-chat/js/chat.js
 #  Provides the JavaScript core for the feathers chat frontend (client)
 #
 #  Product/Info:
 #  https://jekyll.one
 #  https://github.com/feathersjs/feathers
 #
 #  Copyright (C) 2017 Roger van Essen, Juergen Adams
 #  Copyright (c) 2017 Feathers contributers
 #
 #  J1 Template is licensed under the MIT License.
 #  For details, see https://jekyll.one
 #  Feathers is licensed under the MIT License.
 #  For details, see https://github.com/feathersjs/feathers/blob/master/LICENSE
 #
 # -----------------------------------------------------------------------------
 #  Author:         Roger van Essen, Juergen Adams
 #  Version:        0.1
 #  Created:        2017-06-08
 #  Last update:    2017-06-08
 # -----------------------------------------------------------------------------
*/
'use strict';

// -------------------------------------------------------------------------- //
// Ressources
// -------------------------------------------------------------------------- //

const $                   = require('jquery');
const tether              = require('tether');
const moment              = require('moment');
const resizerClient       = require('./iframeResizer.contentWindow.js');

const feathers            = require('feathers3-client');
const io                  = require('socket.io-client');

// -------------------------------------------------------------------------- //
// Default values
// -------------------------------------------------------------------------- //
let   serverUrl           = 'http://localhost:3030';
const defaultAvatar       = 'https://placeimg.com/60/60/people';
const defaultUser         = 'Anonymous';
const gravatarEnabled     = true;
const maxMessagesCurrent  = 5;

// -------------------------------------------------------------------------- //
// Views
// -------------------------------------------------------------------------- //
// Login view
const loginView = `
  <main class="login" id="login">
    <div class="row">
      <div class="col-md-5">

        <!-- SignUp section (Add user) -->
        <div id="sign-up" style="display: none;">
          <h3>Sign up</h3>
          <form>

            <div class="form-group">
              <label for="email-signup" class="bmd-label-floating">Email address</label>
              <input type="text" class="form-control" name="email" id="email-signup">
              <span class="bmd-help">Enter your email address as the user name for sign-up</span>
            </div>
            <div class="form-group">
              <label for="password-signup" class="bmd-label-floating">Password</label>
              <input type="text" class="form-control" name="password" id="password-signup">
              <span class="bmd-help">Enter a password for login</span>
            </div>
            <br />
            <input type="button" class="btn btn-raised btn-warning" id="signup-user" value="Add user" />
            <input type="button" class="btn btn-raised btn-primary" id="to-signin-user" value="Sign in" />

          </form>
        </div>

        <!-- SignIn section (Login user) -->
        <div id="sign-in" style="display: block;">
          <h3>Sign in</h3>
          <form>

            <div class="form-group">
              <label for="email-signin" class="bmd-label-floating">Email address</label>
              <input type="email" class="form-control" name="email" id="email-signin">
              <span class="bmd-help">Enter your email address for login</span>
            </div>
            <div class="form-group">
              <label for="password-signin" class="bmd-label-floating">Password</label>
              <input type="password" class="form-control" name="password" id="password-signin">
              <span class="bmd-help">Enter your password for login</span>
            </div>
            <br />
            <input type="button" class="btn btn-raised btn-info" id="signin-user" value="Sign in" />
            <input type="button" class="btn btn-raised btn-primary" id="to-signup-user" value="Sign up" />

          </form>
        </div>

      </div>

      <div class="col-md-6 col-md-offset-1">
        <h3 class="login-messages">Messages</h3>
        <div class="message-container"></div>
      </div>

    </div>
  </main>
`;

// Chat view
const chatView = `
  <header class="title-bar">
    <div class="title-wrapper">
      <img class="logo" src="http://feathersjs.com/img/feathers-logo-wide.png"
        alt="Feathers Logo">
      <span class="title">Chat</span>
    </div>
  </header>

  <div class="row">

    <div class="col-md-4">
      <div class="card card-blog">
        <header>
          <h4 class="comment-heading m-t-3 m-b-3 m-l-3 notoc">
            <span class="online-count">0</span> User|s
          </h4>
        </header>
        <aside class="sidebar">
          <ul class="list-unstyled" id="user-list"></ul>
        </aside>
        <div class="comment-footer">
          <button class="btn btn-raised btn-primary m-t-3 m-b-3 m-l-3" id="signout-user" type="button">Sign out</button>
        </div>
      </div>
    </div>

    <div class="col-md-8">
      <div class="card card-blog">
        <header>
          <h4 class="comment-heading m-t-3 m-b-3 m-l-3 notoc">Latest messages</h4>
        </header>

        <!-- chat message container -->
        <div class="chat"></div>

        <div class="comment-footer">
            <form class="form-horizontal m-l-3 m-r-3" id="send-message" role="form">
             <div class="form-group" id="message-form">
               <label for="message-text" class="bmd-label-floating">Your Message</label>
               <textarea class="form-control" rows="3" id="message-text" name="text"></textarea>
               <span class="bmd-help">Enter your message (up to 140 characters)</span>
             </div>
             <button class="btn btn-raised btn-primary m-t-3" type="submit">Submit message</button>
            </form>
        </div>

      </div>
    </div>

  </div>
`;

// -------------------------------------------------------------------------- //
// Helper routines (Sign in, Sign Up)
// -------------------------------------------------------------------------- //
function mountSignUp() {
  $('#email-signup').val('');
  $('#password-signup').val('');
  $('#sign-in').css('display', 'none' );
  $('#sign-up').css('display', 'block' );
  //$('#sign-up').bootstrapMaterialDesign();
}

function mountSignIn() {
  $('#email-signin').val('');
  $('#password-signin').val('');
  $('#sign-up').css('display', 'none' );
  $('#sign-in').css('display', 'block' );
}

// -------------------------------------------------------------------------- //
// Create and initialize the model. Setup feathers3 client
// through socket.io with hooks and authentication
// -------------------------------------------------------------------------- //
const socket        = io(serverUrl);
const model         = feathers();

model.configure(feathers.socketio(socket));
model.configure(feathers.hooks());

// Get the login token, store to localStorage
model.configure(feathers.authentication({
  storage: window.localStorage
}));

// -------------------------------------------------------------------------- //
// Controller to manage frontend routines
// -------------------------------------------------------------------------- //
const chatController = {
  // ------------------------------------------------------------------------ //
  // Add a new user to the list
  // ------------------------------------------------------------------------ //
  addUser(user) {
    // Add the user to the list
    $('#user-list').append(
      `<li>
        <a class="block relative" href="javascript:void(0)">
          <img src="${user.avatar}" alt="" class="avatar">
          <span class="absolute username">${user.email}</span>
        </a>
      </li>`
    );
    // Update the number of users
    $('.online-count').html($('#user-list li').length);
  },
  // ------------------------------------------------------------------------ //
  // Render new messages, detect the user that belongs to
  // ------------------------------------------------------------------------ //
  addMessage(message) {
    // Find the user belonging to this message.
    // Use the anonymous user if not found
    const anonymousUser = {
      avatar: defaultAvatar,
      email:  defaultUser
    };
    const sender = message.user || anonymousUser;
    // Get the (chat) message element to append messages to
    const chat   = $('.chat');

    chat.append(
      `<div class="comment">
        <div class="pull-left">
          <div class="avatar">
            <img class="comment-object" src="${sender.avatar}" alt="${sender.email}">
          </div>
        </div>
        <div class="comment-body">
          <h4 class="comment-heading notoc">${sender.email} <small>· ${moment(message.createdAt).format('MMM Do, hh:mm:ss')}</small></h4>
          <h6 class="text-muted notoc"></h6>
          <p>${message.text}</p>
        </div> <!-- end comment-body -->
      </div> <!-- end comment --> `
    );

    // BMD4, workaround. Remove class "is-filled" from "form-group"
    $('#message-form').removeClass("is-filled");

    // Scrollling disabled
    //let toTop = chat[0].scrollHeight - chat[0].clientHeight;
    //chat.scrollTop(toTop);
  },
  // ------------------------------------------------------------------------ //
  // Login, either using email|password or the token (from localStorage)
  // ------------------------------------------------------------------------ //
  login(credentials) {
    const payload = credentials ?
      Object.assign({ strategy: 'local' }, credentials) : {};

    return model.authenticate(payload)
      .then(chatController.showChat)
      .catch(chatController.showLogin);
  },

  // ------------------------------------------------------------------------ //
  // Show the login page (Sign in)
  // ------------------------------------------------------------------------ //
  showLogin(error = {}) {
    if($('.login').length) {
      let now = moment();
      if ( error.message === 'Error') {
        error.message = 'invalid username or password';
      }
      let message = `<p>[${now.format('YYYY-MM-DD hh:mm:ss')}] SignIn failed: ${error.message}</p>`;
      $( "div.message-container" ).html(message);
      //logger.warn(message);
    } else {
      $('#app').html(loginView);
      // Re-initialize BMD for dynamically loaded (login) form
      //$('#login').bootstrapMaterialDesign();
    }
  },
  // ------------------------------------------------------------------------ //
  // Show the chat page
  // ------------------------------------------------------------------------ //
  showChat() {
    // Load chatView and re-initialize BMD for dynamically HTML
    $('#app').html(chatView); //.bootstrapMaterialDesign();


    // Find the latest 5 messages. They are returned by the newest first.
    // For the message history, reverse the order before adding them
    model.service('messages')
      .find({
        query: {
          $sort: { createdAt: -1 },
          $limit: maxMessagesCurrent -1,
      }})
      .then(page => {
        page.data.reverse().forEach(chatController.addMessage);
      });

    // Find all users
    model.service('users')
      .find()
      .then(page => {
        const users = page.data;

        // Add users found to the list
        users.forEach(chatController.addUser.bind(chatController));
      });
  },
  // ------------------------------------------------------------------------ //
  // Retrieve email/password from signin|signup page
  // ------------------------------------------------------------------------ //
  getCredentials(type) {
    const user = type == 'signin' ?
      {
        email: $('#email-signin').val(),
        password: $('#password-signin').val()
      }
      :
      {
        email: $('#email-signup').val(),
        password: $('#password-signup').val()
      };
    return user;
  }
};

// -------------------------------------------------------------------------- //
// Event handlers (model)
// -------------------------------------------------------------------------- //

// Add new message, get created in real-time
model.service('messages').on('created', chatController.addMessage);

// Add new users, get created in real-time
model.service('users').on('created', chatController.addUser);

// -------------------------------------------------------------------------- //
// Event handlers (view)
// -------------------------------------------------------------------------- //
$(document)
  // SignUp user
  .on('click', '#signup-user', ev => {
    ev.preventDefault();

    let message;
    let now = moment();
    const user = chatController.getCredentials('signup');

    if(user.email && user.password) {
      model.service('users').create(user)
        .then( () => {
          () => chatController.login(user);
          message = 'SignUp successfully for user: ' + user.email;
          //logger.info(message);
        })
        .catch( (error) => {
          if ( error.message === 'Error') {
            error.message = 'invalid username or password';
          }
          message = 'SignUp failed: ' + error.message;
          //logger.warn(message);
        });
    } else {
      message = `<p>[${now.format('YYYY-MM-DD hh:mm:ss')}] SignUp failed: invalid credentials</p>`;
      $( "div.message-container" ).html(message);
      //logger.warn("SignUp failed: invalid credentials");
    }
  })
  // Switch to SignUp user
  .on('click', '#to-signup-user', ev => {
    ev.preventDefault();
    mountSignUp();
  })
  // SignIn user
  .on('click', '#signin-user', ev => {
    ev.preventDefault();
    const user = chatController.getCredentials('signin');

    chatController.login(user);
  })
  // Switch to SignIn user
  .on('click', '#to-signin-user', ev => {
    ev.preventDefault();
    mountSignIn();
  })
  // SignOut user
  .on('click', '#signout-user', ev => {
    model.logout().then( () => {
      $('#app').html(loginView);
      // Re-initialize BMD for dynamically loaded form
      //$('#login').bootstrapMaterialDesign();
    })
  })
  // Send the message
  .on('submit', '#send-message', ev => {
    ev.preventDefault();

    const input = $('[name="text"]');

    if (input.val()) {
      // Create new message and then clear the input field
      model.service('messages').create({
        text: input.val()
      }).then( () => input.val(''));
    } else {
      //logger.info("Empty message detected. Not send.");
    }
  });

// -------------------------------------------------------------------------- //
// Main
// -------------------------------------------------------------------------- //
chatController.login();
