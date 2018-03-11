/*
 * based upon https://developers.facebook.com/docs/messenger-platform/getting-started/quick-start/
 *
 */

///////////////          DEPENDENCIES           ///////////////////
'use strict';
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const API_URL_SERVER = process.env.API_URL_SERVER;
const QUICK_0_0 = process.env.QUICK_0_0;
const QUICK_0_1 = process.env.QUICK_0_1;

// Imports dependencies and set up http server
const 
  request = require('request'),
  express = require('express'),
  body_parser = require('body-parser'),
  app = express().use(body_parser.json()); // creates express http server
// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));
///////////////////////////////////////////////////////////////////

//////////////////          ROUTES           //////////////////////     TODO: add routes for data storage and data retrieving via webapp
// Accepts POST requests at /webhook endpoint
app.post('/webhook', (req, res) => {  

  // Parse the request body from the POST
  let body = req.body;

  // Check the webhook event is from a Page subscription
  if (body.object === 'page') {

    // Iterate over each entry - there may be multiple if batched
body.entry.forEach(function(entry) {

  // Gets the body of the webhook event
  let webhook_event = entry.messaging[0];
  console.log(webhook_event);


  // Get the sender PSID
  let sender_psid = webhook_event.sender.id;
  console.log('Sender PSID: ' + sender_psid);

  // Check if the event is a message or postback and
  // pass the event to the appropriate handler function
  if (webhook_event.message) {
    handleMessage(sender_psid, webhook_event.message);        
  } else if (webhook_event.postback) {
    handlePostback(sender_psid, webhook_event.postback);
  }
  
});

    // Return a '200 OK' response to all events
    res.status(200).send('EVENT_RECEIVED');

  } else {
    // Return a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }

});
// Accepts GET requests at the /webhook endpoint
app.get('/webhook', (req, res) => {
  
  /** UPDATE YOUR VERIFY TOKEN **/
  const VERIFY_TOKEN = "token123";
  
  // Parse params from the webhook verification request
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];
    
  // Check if a token and mode were sent
  if (mode && token) {
  
    // Check the mode and token sent are correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      
      // Respond with 200 OK and challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);  
    }
  }
});
///////////////////////////////////////////////////////////////////

///////////////          HANDLERS           ///////////////////////
// Handles postback events
function handlePostback(sender_psid, received_postback) {
  let response;
  
  // Get the payload for the postback
  let payload = received_postback.payload;

  // Set the response based on the postback payload
  if (payload === 'yes') {
    response = { "text": "Thanks!" }
  } else if (payload === 'no') {
    response = { "text": "Oops, try sending another image." }
  }
  // Send the message to acknowledge the postback
  callSendAPI(sender_psid, response);
}

// Send every message passed in argument
function sendMessages(sender_psid){
  var i;
  let response;
  for (i = 1; i < arguments.length; i++) {
    response = {
      "text": arguments[i]
    }
    callSendAPI(sender_psid, response);
  }
}

function insertInfoDB(state, sender_psid, text){
  // we send the data the the right endpoint according to state
  switch(state){
      case "1": callPutDB(sender_psid, text, "gender");
    break;
      case "2": callPutDB(sender_psid, text, "class");
    break;
      case "3": callPutDB(sender_psid, text, "firstName");
    break;
      case "4": callPutDB(sender_psid, text, "lastName");
    break;
      case "5":
      case "6":
      case "6bis": callPutDB(sender_psid, text, "handicap");
    break;
      case "7": 
      case "8": callPutDB(sender_psid, text, "equipment");
    break;
      case "9": 
      case "10": callPutDB(sender_psid, text, "utilitarian");
    break;
      case "11": callPutDB(sender_psid, text, "birthdate");
    break;
      case "12": callPutDB(sender_psid, text, "address");
    break;
      case "13": callPutDB(sender_psid, text, "telephone");
    break;
      case "14": callPutDB(sender_psid, text, "studentID");
    break;
      case "15": callPutDB(sender_psid, text, "cursus");
    break;
      case "16": callPutDB(sender_psid, text, "dreamJob");
    break;
      case "17": callPutDB(sender_psid, text, "location");
    break;
      case "18": callPutDB(sender_psid, text, "scholarship");
    break;
      case "19": callPutDB(sender_psid, text, "internship");
    break;
      case "20": callPutDB(sender_psid, text, "accompaniment");
    break;
      case "21": callPutDB(sender_psid, text, "info");
    break;
    default: console.log('We don\'t store the data at this state');
      break;
              }
  
}

function getSenderState(sender_psid){
  let body = callGetOneDB(sender_psid);
  if (body === undefined){
    return "O";
  } else {
    console.log(body);
    return "0";
  }
}

function moveUserState(state, sender_psid, text){
   // we move the the following state according to the answer
  switch(state){
    case "O": callPostDB(sender_psid);
              callPutDB(sender_psid, "0", "state");
      break;
    case "0": 
      if(text.localeCompare(QUICK_0_0) == 0){
        callPutDB(sender_psid, "1", "state");
      }
      // TODO construct infos part
      if(text.localeCompare(QUICK_0_1) == 0){
        callPutDB(sender_psid, "0", "state");
      } else{
        console.error('The answer didn\'t match a pattern');
      }
      break;
    case "1": callPutDB(sender_psid, "2", "state");  
      break;
    case "2":
      if(text.localeCompare(process.env.QUICK_2[0]) == 0){
        callPutDB(sender_psid, "3", "state");
      }
      // TODO construct volontary part
      if(text.localeCompare(process.env.QUICK_2[1]) == 0){
        callPutDB(sender_psid, "3bis", "state");
      } else{
        console.error('The answer didn\'t match a pattern');
      }
      break;
    case "3":
    case "3bis": callPutDB(sender_psid, "4", "state");
      break;
    case "4": callPutDB(sender_psid, "5", "state");
      break;
    case "5":
      if(text.localeCompare(process.env.QUICK_5[0]) == 0 || text.localeCompare(process.env.QUICK_5[1]) == 0 || text.localeCompare(process.env.QUICK_5[2]) == 0 || text.localeCompare(process.env.QUICK_5[3]) == 0){
      callPutDB(sender_psid, "7", "state");
      } 
      if(text.localeCompare(process.env.QUICK_5[4]) == 0){
      callPutDB(sender_psid, "6", "state");
      }
      if(text.localeCompare(process.env.QUICK_5[5]) == 0){
      callPutDB(sender_psid, "6bis", "state");
      }
      else{
        console.error('The answer didn\'t match a pattern');
      }
      break;
    case "6":
    case "6bis": callPutDB(sender_psid, "7", "state");
      break;
    case "7": 
      if(text.localeCompare(process.env.QUICK_7[0]) == 0 || text.localeCompare(process.env.QUICK_7[1]) == 0 || text.localeCompare(process.env.QUICK_7[2]) == 0){
        callPutDB(sender_psid, "9", "state");
      } 
      if(text.localeCompare(process.env.QUICK_7[3]) == 0){
        callPutDB(sender_psid, "8", "state");
      }
      if(text.localeCompare(process.env.QUICK_7[4]) == 0){
        callPutDB(sender_psid, "8", "state");
      }
      else{
        console.error('The answer didn\'t match a pattern');
      }
      break;
    case "8": callPutDB(sender_psid, "9", "state");
      break;
    case "9": 
      if(text.localeCompare(process.env.QUICK_9[0]) == 0){
        callPutDB(sender_psid, "10", "state");
      }
      if(text.localeCompare(process.env.QUICK_9[1]) == 0){
        callPutDB(sender_psid, "11", "state");
      }
      else{
        console.error('The answer didn\'t match a pattern');
      }
      break;
    case "10": callPutDB(sender_psid, "11", "state");
      break;
    case "11": callPutDB(sender_psid, "12", "state");
      break;
    case "12": callPutDB(sender_psid, "13", "state");
      break;
    case "13": callPutDB(sender_psid, "14", "state");
      break;
    case "14": callPutDB(sender_psid, "15", "state");
      break;
    case "15": callPutDB(sender_psid, "16", "state");
      break;
    case "16": callPutDB(sender_psid, "17", "state");
      break;
    case "17": callPutDB(sender_psid, "18", "state");
      break;
    case "18": callPutDB(sender_psid, "19", "state");
      break;
    case "19": callPutDB(sender_psid, "20", "state");
      break;
    case "20": callPutDB(sender_psid, "21", "state");
      break;
    case "21": callPutDB(sender_psid, "22", "state");
      break;
    default: console.log('We don\'t store the data at this state');
      break;
              }
}
// Handles messages events
function handleMessage(sender_psid, received_message) {
  let response;
  let state = getSenderState(sender_psid);
  
  // Checks if the message contains text
  if (received_message.text) {    
    // Create the payload for a basic text message, which
    // will be added to the body of our request to the Send API
    
    // TODO: test received_message.text before insering into db
    insertInfoDB(state, sender_psid, received_message.text);
    moveUserState(state, sender_psid, received_message.text);
                 
  } else if (received_message.attachments) {
    // Get the URL of the message attachment
    let attachment_url = received_message.attachments[0].payload.url;
    response = {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "generic",
          "elements": [{
            "title": "Is this the right picture?",
            "subtitle": "Tap a button to answer.",
            "image_url": attachment_url,
            "buttons": [
              {
                "type": "postback",
                "title": "Yes!",
                "payload": "yes",
              },
              {
                "type": "postback",
                "title": "No!",
                "payload": "no",
              }
            ],
          }]
        }
      }
    }
  } 
  
  response = {
    "text": 'State:' + state
  }
  callSendAPI(sender_psid, response);
}

// Get the contact with corresponding to sender's id
function callGetOneDB(sender_psid) {
   // Send the HTTP request to the Messenger Platform
  request({
    "url": API_URL_SERVER + "/contact/" + sender_psid,
    "method": "GET"
  }, (err, res, body) => {
    if (!err) {
      console.log(res)
      console.log(body)
      return body;
      
    } else {
      console.error("Unable to send message:" + err);
    }
  }); 
  
}

// Get all the contacts in the database
function callGetDB(sender_psid) {
   // Send the HTTP request to the Messenger Platform
  request({
    "url": API_URL_SERVER + "/contact/",
    "method": "GET"
  }, (err, res, body) => {
    if (!err) {
      let response = {
      "text": body
      }
      callSendAPI(sender_psid, response)
      console.log('message sent!')
    } else {
      console.error("Unable to send message:" + err);
    }
  }); 
  
}

// Create a new contact in the database
function callPostDB(sender_psid) {
    // Construct the message body
  let request_body = {
    "_id": sender_psid,
  }
   // Send the HTTP request to the Messenger Platform
  request({
    "url": API_URL_SERVER + "/contact/" + sender_psid,
    "method": "POST",
    "json" : request_body
  }, (err, res, body) => {
    if (!err) {
      console.log('New contact created')
    } else {
      console.error("Unable to add info:" + err);
    }
  }); 
  
}

// Modify contact in the database
function callPutDB(sender_psid, data, field) {
  
    // Construct the message body
  let request_body = {
    "_id": sender_psid,
    [field]: data,
    "firstName" : "test"
  }
   // Send the HTTP request to the Messenger Platform
  request({
    "url": API_URL_SERVER + "/contact/" + sender_psid,
    "method": "PUT",
    "json" : request_body
  }, (err, res, body) => {
    if (!err) {
      console.log('info added to DB')
    } else {
      console.error("Unable to add info:" + err);
    }
  }); 
  
}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
  // Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }
  
   // Send the HTTP request to the Messenger Platform
  request({
    "uri": "https://graph.facebook.com/v2.6/me/messages",
    "qs": { "access_token": PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    if (!err) {
      console.log('message sent!')
    } else {
      console.error("Unable to send message:" + err);
    }
  }); 
}
