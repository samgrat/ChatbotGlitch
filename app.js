/*
 * based upon https://developers.facebook.com/docs/messenger-platform/getting-started/quick-start/
 *
 */

///////////////          DEPENDENCIES           ///////////////////
'use strict';
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const API_URL_SERVER = process.env.API_URL_SERVER;
const MESSAGE_ERROR = process.env.MESSAGE_ERROR;
const MESSAGE_DEV = process.env.MESSAGE_DEV;
const MESSAGE_0_0 = process.env.MESSAGE_0_0;
const MESSAGE_0_1 = process.env.MESSAGE_0_1;
const MESSAGE_0_2 = process.env.MESSAGE_0_2;
const QUICK_0_0 = process.env.QUICK_0_0;
const QUICK_0_1 = process.env.QUICK_0_1;
const MESSAGE_1_0 = process.env.MESSAGE_1_0;
const MESSAGE_1_1 = process.env.MESSAGE_1_1;
const QUICK_1_0 = process.env.QUICK_1_0;
const QUICK_1_1 = process.env.QUICK_1_1;
const MESSAGE_2_0 = process.env.MESSAGE_2_0;
const QUICK_2_0 = process.env.QUICK_2_0;
const QUICK_2_1 = process.env.QUICK_2_1;
const MESSAGE_3_0 = process.env.MESSAGE_3_0;
const MESSAGE_3bis_0 = process.env.MESSAGE_3bis_0;
const MESSAGE_3_1 = process.env.MESSAGE_3_1;
const MESSAGE_3_2 = process.env.MESSAGE_3_2;
const MESSAGE_3_3 = process.env.MESSAGE_3_3;
const MESSAGE_4_0 = process.env.MESSAGE_4_0;
let MESSAGE_5_0 = process.env.MESSAGE_5_0;
const MESSAGE_5_1 = process.env.MESSAGE_5_1;
const QUICK_5_0 = process.env.QUICK_5_0;
const QUICK_5_1 = process.env.QUICK_5_1;
const QUICK_5_2 = process.env.QUICK_5_2;
const QUICK_5_3 = process.env.QUICK_5_3;
const QUICK_5_4 = process.env.QUICK_5_4;
const QUICK_5_5 = process.env.QUICK_5_5;
const MESSAGE_6_0 = process.env.MESSAGE_6_0;
const MESSAGE_6bis_0 = process.env.MESSAGE_6bis_0;
const MESSAGE_7_0 = process.env.MESSAGE_7_0;
const QUICK_7_0 = process.env.QUICK_7_0;
const QUICK_7_1 = process.env.QUICK_7_1;
const QUICK_7_2 = process.env.QUICK_7_2;
const QUICK_7_3 = process.env.QUICK_7_3;
const QUICK_7_4 = process.env.QUICK_7_4;
const MESSAGE_8_0 = process.env.MESSAGE_8_0;
const MESSAGE_9_0 = process.env.MESSAGE_9_0;
const QUICK_9_0 = process.env.QUICK_9_0;
const QUICK_9_1 = process.env.QUICK_9_1;
const MESSAGE_10_0 = process.env.MESSAGE_10_0;
const MESSAGE_11_0 = process.env.MESSAGE_11_0;
const MESSAGE_11_1 = process.env.MESSAGE_11_1;
const MESSAGE_11_2 = process.env.MESSAGE_11_2;
const MESSAGE_13_0 = process.env.MESSAGE_13_0;
const MESSAGE_14_0 = process.env.MESSAGE_14_0;
const MESSAGE_14_1 = process.env.MESSAGE_14_1;
const MESSAGE_15_0 = process.env.MESSAGE_15_0;
const MESSAGE_16_0 = process.env.MESSAGE_16_0;
const MESSAGE_17_0 = process.env.MESSAGE_17_0;
const MESSAGE_17_1 = process.env.MESSAGE_17_1;
const QUICK_17_0 = process.env.QUICK_17_0;
const QUICK_17_1 = process.env.QUICK_17_1;
const QUICK_17_2 = process.env.QUICK_17_2;
const MESSAGE_18_0 = process.env.MESSAGE_18_0;
const MESSAGE_18_1 = process.env.MESSAGE_18_1;
const QUICK_18_0 = process.env.QUICK_18_0;
const QUICK_18_1 = process.env.QUICK_18_1;
const MESSAGE_19_0 = process.env.MESSAGE_19_0;
const MESSAGE_20_0 = process.env.MESSAGE_20_0;
const QUICK_20_0 = process.env.QUICK_20_0;
const QUICK_20_1 = process.env.QUICK_20_1;
const MESSAGE_21_0 = process.env.MESSAGE_21_0;
const MESSAGE_21_1 = process.env.MESSAGE_21_1;
const MESSAGE_22_0 = process.env.MESSAGE_22_0;
const MESSAGE_22_1 = process.env.MESSAGE_22_1;
let STATE = null;
let FIRSTNAME = "@prenom";
let ERROR_ANSWER = false;

// Imports dependencies and set up http server
const 
  request = require('request'),
  express = require('express'),
  mongodb = require('mongodb'),
  mongoose = require ('mongoose'),
  body_parser = require('body-parser'),
  routes = require('./routes'),
  controller = require("./controller"),
  addNewContact = controller.addNewContact,
  getContacts = controller.getContacts, 
  getContactByID = controller.getContactByID, 
  updateContact = controller.updateContact,
  deleteContact = controller.deleteContact,
  getFieldByID = controller.getFieldByID,
  XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest,
  app = express(); // creates express http server
///////////////////////////////////////////////////////////////////
/////////////////          DATABASE           /////////////////////    

// Standard URI format: mongodb://[dbuser:dbpassword@]host:port/dbname, details set in .env
var uri = 'mongodb://'+process.env.USER+':'+process.env.PASS+'@cluster0-shard-00-00-se2vl.mongodb.net:27017,cluster0-shard-00-01-se2vl.mongodb.net:27017,cluster0-shard-00-02-se2vl.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect(uri);

// bodyparser setup
app.use(body_parser.urlencoded({ extended : true }));
app.use(body_parser.json());

// TODO to fix for a cleaner code
//routes.routes(app);

// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));

///////////////////////////////////////////////////////////////////

//////////////////          ROUTES           //////////////////////     TODO: add routes for data storage and data retrieving via webapp

// CONTACT route block
    app.route('/contact')
    // GET
    .get((req, res, next) => {
        // middleware
        console.log(`Request from: ${req.originalUrl}`)
        console.log(`Request type: ${req.method}`)
        // once we have done that
        next();
    }, getContacts); // semi-colon of end of block CONTACT/
    
    // CONTACT/:messengerId block
    app.route('/contact/:contactId')
    // GET
    .get(getContactByID)
    // POST
    .post(addNewContact)
    // PUT
    .put(updateContact)
    // DELETE
    .delete(deleteContact); // semi-colon of end of block CONTACT/:contactId

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

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function writeTextFile(text){
var fs = require('fs');
fs.writeFile(".data/state.txt", text, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 
}
function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                console.log("State in file :" + allText);
            }
        }
    }
    rawFile.send(null);
}

// TODO FIX MESSAGE ORDER
// Send every message passed in argument
function sendMessages(promise, sender_psid){
  var i;
  let response = {};
  
    for (i = 2; i < arguments.length; i++) {
    response = {
      "text": arguments[i],
    }
    console.log(response);
    /*
    console.log(promise);
    if(promise){
    promise.then(
      function() {
      promise = callSendAPI(sender_psid, response);}
    ).catch(
      // Promesse rejetée
      function() { 
        console.error("promesse rompue");
      });
    } else {
      promise = callSendAPI(sender_psid, response);}
    */
    promise = callSendAPI(sender_psid, response);
  }
  return promise;
}

// Send all the quick answer options passed in argument
function sendQuicks(promise, sender_psid){
  var i;
  let response = {};
  response.text = arguments[2];
  response.quick_replies = [];
  
  let quick = {};
  for (i = 3; i < arguments.length; i++) {
    quick = {
      "content_type":"text",
      "title": arguments[i],
      "payload": arguments[i]
    };
    response.quick_replies.push(quick);
  }
  
  console.log(response);
  
  // we check for the promise
  if(promise){
    promise.then(function(){promise = callSendAPI(sender_psid, response);}).catch(
      // Promesse rejetée
      function() { 
        console.error("promesse rompue");
      });
    } else {promise = callSendAPI(sender_psid, response);}
  return promise;
}

function insertInfoDB(state, sender_psid, text, payload){
  callGetOneDB(sender_psid);
  //getState(sender_psid);
  let promise;
  // we send the data the the right endpoint according to state
  switch(STATE){
    case null:
    case "O": 
      promise = sendMessages(promise, sender_psid, MESSAGE_0_0 + "\n" + MESSAGE_0_1);
      //sleep(2000);
      promise = sendQuicks(promise, sender_psid, MESSAGE_0_2, QUICK_0_0, QUICK_0_1);
      console.log("FROM : "+ STATE);
      STATE = "A";
      console.log("STATE : "+ STATE);
      writeTextFile("A");
      callPutDB(sender_psid,"A","state");
    break;
      case "A":
      if(payload.localeCompare(QUICK_0_0) == 0){
        console.log("FROM : "+ STATE);
        STATE = "1";
        console.log("STATE : "+ STATE);
        writeTextFile("1");
        callPutDB(sender_psid, "1", "state");
        promise = sendMessages(promise, sender_psid, MESSAGE_1_0);
        promise = sendQuicks(promise, sender_psid, MESSAGE_1_1, QUICK_1_0, QUICK_1_1);
      } else if (payload.localeCompare(QUICK_0_1) == 0){
        // TODO construct infos part
        console.log("FROM : "+ STATE);
        STATE = "A";
        console.log("STATE : "+ STATE);
        writeTextFile("A");
        callPutDB(sender_psid,"A","state");
        promise = sendMessages(promise, sender_psid, MESSAGE_DEV);
        promise = sendMessages(promise, sender_psid, MESSAGE_0_0 + "\n" + MESSAGE_0_1);
        promise = sendQuicks(promise, sender_psid, MESSAGE_0_2, QUICK_0_0, QUICK_0_1);  
      
      } else{
        console.log("FROM : "+ STATE);
        STATE = "A";        
        console.log("STATE : "+ STATE);
        writeTextFile("A");
        callPutDB(sender_psid,"A","state");
        console.error('The answer didn\'t match a pattern');
        promise = sendMessages(promise, sender_psid, MESSAGE_ERROR);
        promise = sendMessages(promise, sender_psid, MESSAGE_0_0 + "\n" + MESSAGE_0_1);
        promise = sendQuicks(promise, sender_psid, MESSAGE_0_2, QUICK_0_0, QUICK_0_1);
        
      }
    break;
      case "1": 
      if(payload.localeCompare(QUICK_1_0) == 0 || payload.localeCompare(QUICK_1_1) == 0){
        console.log("FROM : "+ STATE);
        STATE = "2";
        console.log("STATE : "+ STATE);
        writeTextFile("2");
        callPutDB(sender_psid, "2", "state");
        callPutDB(sender_psid, payload, "gender");
        promise = sendQuicks(promise, sender_psid, MESSAGE_2_0, QUICK_2_0, QUICK_2_1);
      } else{
        console.log("FROM : "+ STATE);
        STATE = "1";
        console.log("STATE : "+ STATE);
        writeTextFile("1");
        callPutDB(sender_psid,"1","state");
        console.error('The answer didn\'t match a pattern');
        promise = sendMessages(promise, sender_psid, MESSAGE_ERROR);
        promise = sendMessages(promise, sender_psid, MESSAGE_1_0);
        promise = sendQuicks(promise, sender_psid, MESSAGE_1_1, QUICK_1_0, QUICK_1_1);
      }
    break;
      case "2": 

      if(payload.localeCompare(QUICK_2_0) == 0){
        console.log("FROM : "+ STATE);
        STATE = "3";
        console.log("STATE : "+ STATE);
        callPutDB(sender_psid, "3", "state");
        callPutDB(sender_psid, payload, "class");
        promise = sendMessages(promise, sender_psid, MESSAGE_3_0 + "\n" + MESSAGE_3_1);
        promise = sendMessages(promise, sender_psid, MESSAGE_3_2 + "\n" + MESSAGE_3_3);
      }
      else if(payload.localeCompare(QUICK_2_1) == 0){
        console.log("FROM : "+ STATE);
        console.log("STATE : "+ STATE);
        STATE = "3";
        callPutDB(sender_psid, "3", "state");
        callPutDB(sender_psid, payload, "class");
        promise = sendMessages(promise, sender_psid, MESSAGE_3bis_0 + "\n" + MESSAGE_3_1);
        promise = sendMessages(promise, sender_psid, MESSAGE_3_2 + "\n" + MESSAGE_3_3);
      } else{
        console.log("FROM : "+ STATE);
        STATE = "2";
        console.log("STATE : "+ STATE);
        callPutDB(sender_psid, "2", "state");
        console.error('The answer didn\'t match a pattern');
        promise = sendMessages(promise, sender_psid, MESSAGE_ERROR);
        promise = sendQuicks(promise, sender_psid, MESSAGE_2_0, QUICK_2_0, QUICK_2_1);
        ERROR_ANSWER = true;
      }
    break;
      case "3": 
      console.log("FROM : "+ STATE);
      STATE = "4";
      console.log("STATE : "+ STATE);
      callPutDB(sender_psid, "4", "state");
      callPutDB(sender_psid, text, "firstName");
      getFirstName(sender_psid);
      promise = sendMessages(promise, sender_psid, MESSAGE_4_0);
    break;
      case "4": 
      console.log("FROM : "+ STATE);
      STATE = "4";
      console.log("STATE : "+ STATE);
      callPutDB(sender_psid, "4", "state");
      callPutDB(sender_psid, text, "lastName");
      getFirstName(sender_psid);
      console.log("FirstName: " + FIRSTNAME);
      let MESSAGE_NAMED = MESSAGE_5_0.replace("@prenom", FIRSTNAME);
      promise = sendMessages(promise, sender_psid, MESSAGE_NAMED);
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
    default: 
      console.log('We don\'t store the data at this state');
      //findState(sender_psid);
      //insertInfoDB(state, sender_psid, text, payload);
    }

}

function moveUserState(state, sender_psid, text){
  let s = callGetOneDB(sender_psid)
   // we move the the following state according to the answer
  switch(s){
    case "O": callPostDB(sender_psid);
      break;
    case "A":
      if(text.localeCompare(QUICK_0_0) == 0){
        callPutDB(sender_psid, "1", "state");
      }
      // TODO construct infos part
      if(text.localeCompare(QUICK_0_1) == 0){
        callPutDB(sender_psid, "A", "state");
      } else{
        callPutDB(sender_psid, "A", "state");
        console.error('The answer didn\'t match a pattern');
      }
      break;
    case "1": callPutDB(sender_psid, "2", "state");  
      break;
    /*
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
      */
    default: console.log('We don\'t store the data at this state');
      break;
              }
}
// Handles messages events
function handleMessage(sender_psid, received_message) {
  let response;
  let state;
  let payload;
  
  // Checks if the message contains text
  if (received_message.text) {  
  console.log(received_message);
  //callPostDB(sender_psid);
  
  
    // Create the payload for a basic text message, which
    // will be added to the body of our request to the Send API
    
    // TODO: test received_message.text before insering into db
    if(received_message.quick_reply){
      payload = received_message.quick_reply.payload;
    }else{
      payload = received_message.text;}
    
    insertInfoDB(state, sender_psid, received_message.text, payload);
    //callGetOneDB(sender_psid);
    //moveUserState(state, sender_psid, received_message.text);
                 
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
}

function findState(sender_psid){
  
  request({
    "url": API_URL_SERVER + "/contact/" + sender_psid,
    "method": "GET"
  }, (err, res, body) => {
    if (!err) {
      
      let bodystr = eval("(function(){return " + body + ";})()");
      
      console.log("body : " + bodystr);
      if(bodystr === null){
        console.log("Can't access DB");
      } else {
        if(bodystr.state === null){
          STATE = "A";
          } else {
            if(bodystr.gender === null){
              STATE = "1";
            } else {
              if(bodystr.class === null){
                STATE = "2";
            } else { STATE = "3";}
            }
          }
      }
      
    } else {
      console.error("Unable to retreive state" + err);
    }
  });

  
}

function getFirstName(sender_psid){
  
  request({
    "url": API_URL_SERVER + "/contact/" + sender_psid,
    "method": "GET"
  }, (err, res, body) => {
    if (!err) {
      
      let bodystr = eval("(function(){return " + body + ";})()");
      
      console.log("body : " + bodystr);
      if(bodystr === null){
        console.log("Can't access DB");
      } else {
        if(bodystr.firstName === null){
          FIRSTNAME = "";
        }
          else {FIRSTNAME = bodystr.firstName;}
            }
               
      
    } else {
      console.error("Unable to retreive name" + err);
    }
  });

  
}

// Get the contact with corresponding to sender's id
function callGetOneDB(sender_psid) {
  
  //readTextFile(".data/state.txt");
  
  request({
    "url": API_URL_SERVER + "/contact/" + sender_psid,
    "method": "GET"
  }, (err, res, body) => {
    if (!err) {
      console.log("bodyjson : " + body);
      
      let bodystr = eval("(function(){return " + body + ";})()");
      
      console.log("body : " + bodystr);
      if(bodystr === null){
        STATE = "A";
        console.log("State : 0");
        callPostDB(sender_psid);
      } else {
        console.log("State : "+ bodystr.state);
        STATE = bodystr.state;
      }
      
    } else {
      console.error("Unable to send message:" + err);
    }
  });

  
}

function getState(sender_psid){
  let req = {
    "params" : {
     "contactId": sender_psid
    }
  }
  let res;
    
  getContactByID(req, res);
  console.log(res);
  if(typeof res != 'undefined'){
    let bodystr = eval("(function(){return " + res + ";})()");
    STATE = bodystr.state;
  } else{
    STATE = "A";        
    console.log("State : 0");
    //callPostDB(sender_psid);
  }
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
    "_id": sender_psid
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
  }
   // Send the HTTP request to the Messenger Platform
  request({
    "url": API_URL_SERVER + "/contact/" + sender_psid,
    "method": "PUT",
    "json" : request_body
  }, (err, res, body) => {
    if (!err) {
      console.log('info added to DB : '+ field + " " + data);
    } else {
      console.error("Unable to add info:" + err);
    }
  }); 
  
}

// TODO pending messages queue
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
  return new Promise((resolve, reject) => { 
    request({
    "uri": "https://graph.facebook.com/v2.6/me/messages",
    "qs": { "access_token": PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    if (!err) {
      console.log('message sent!')
      return resolve(response);
    } else {
      console.error("Unable to send message:" + err);
    }
  });
  });
}
