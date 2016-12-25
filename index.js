var admin = require("firebase-admin");
var firebase = admin.initializeApp({
    credential: admin.credential.cert('./auth-38cb7-firebase-adminsdk-lleeq-5595c63206.json'),
    databaseURL: 'https://auth-38cb7.firebaseio.com/'
})

// DEPRECATED
//  var firebase = require('firebase').initializeApp({
//     serviceAccount:'./auth-38cb7-firebase-adminsdk-lleeq-5595c63206.json',   
//     databaseURL: 'https://auth-38cb7.firebaseio.com/'
// });

var message = { text: 'hey guy', timestamp: new Date().toString()};
var ref = firebase.database().ref().child('node-client');
var logsRef = ref.child('logs');
var messagesRef = ref.child('messages');
var messageRef = messagesRef.push(message);

var payload = {
    'logKey': messageRef.key,
    'some/other/path': 'hey guy again'
}

ref.update(payload);

logsRef.child(messageRef.key).set(message);

logsRef.orderByKey().limitToLast(1).on('child_added', (snap)=>{
    console.log('--child_added--:', snap.val());
})

logsRef.on('child_removed', (snap)=> console.log('--child_removed--:', snap.val()));
ref.child('logs').on('child_changed', (snap)=> console.log('--child_changed--:', snap.val()));
ref.child('logs').on('value', (snap)=> console.log('--value--:', snap.val()));