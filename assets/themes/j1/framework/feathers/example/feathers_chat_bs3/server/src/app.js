//const serverUrl = 'http://localhost:4040';

const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');

// jadams, require frameguard for helmet
const frameguard  = require('frameguard');

const bodyParser = require('body-parser');

const feathers = require('feathers3');
const configuration = require('feathers3-configuration');
const hooks = require('feathers3-hooks');
const rest = require('feathers3-rest');
const socketio = require('feathers3-socketio');

const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');

const authentication = require('./authentication');

const app = feathers();

// Load app configuration
app.configure(configuration(path.join(__dirname, '..')));
// Enable CORS, security, compression, favicon and body parsing
app.use(cors());
app.use(helmet());

// jadams: (Dis)Allow iFrames from (specified) host)
// See: https://github.com/helmetjs/frameguard

//app.use(frameguard());  // defaults to allow iframes from sameorigin

app.use(frameguard({
  action: 'allow-from',
  domain: 'http://localhost'
}));

app.use(compress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/', feathers.static(app.get('public')));

// Set up Plugins and providers
app.configure(hooks());
//app.configure(rest(serverUrl));
//app.configure(socketio(serverUrl));
app.configure(rest());
app.configure(socketio());

app.configure(authentication);

// Set up our services (see `services/index.js`)
app.configure(services);
// Configure middleware (see `middleware/index.js`) - always has to be last
app.configure(middleware);
app.hooks(appHooks);

module.exports = app;
