import {Alert, AsyncStorage} from 'react-native';
import feathers from '@feathersjs/feathers'
// import feathers from '@feathersjs/client';
import socketio from '@feathersjs/socketio-client'
import io from 'socket.io-client'
import auth from '@feathersjs/authentication-client'
const PLACEHOLDER = 'https://raw.githubusercontent.com/feathersjs/feathers-chat/master/public/placeholder.png';
const API_URL = 'http://10.0.2.2:3030';
const options = {transports: ['websocket'], pingTimeout: 10000, pingInterval: 50000};

const socket = io(API_URL, options);
const FeathersClient = feathers();

FeathersClient.configure(socketio(socket))
FeathersClient.configure(auth({
  storage: AsyncStorage // To store our accessToken
}));

// /**
//  * connect
//  */
// console.log("====FeathersClient is Connecting")
// FeathersClient.io.on('connect', () => {
//
//   this.authenticate().then(() => {
//     console.log('authenticated after reconnection');
//   }).catch(error => {
//     console.log('error authenticating after reconnection', error);
//   });
// });
//
// FeathersClient.io.on('disconnect', () => {
//   console.log('disconnected');
//   this.isConnecting = true;
// });

export default FeathersClient;
