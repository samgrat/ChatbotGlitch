// //////// NOT IN USE FOR NOW ////////

// const  
//   controller = require("./controller"),
//   addNewContact = controller.addNewContact,
//   getContacts = controller.getContacts, 
//   getContactByID = controller.getContactByID, 
//   updateContact = controller.updateContact,
//   deleteContact = controller.deleteContact,
//   getFieldByID = controller.getFieldByID;

// // Our endpoints configuration

// // routes function is used inside of index.js
// module.exports.routes = function (app) {
  
//     // CONTACT route block
//     app.route('/contact')
//     // GET
//     .get((req, res, next) => {
//         // middleware
//         console.log(`Request from: ${req.originalUrl}`)
//         console.log(`Request type: ${req.method}`)
//         // once we have done that
//         next();
//     }, getContacts); // semi-colon of end of block CONTACT/
    
//     // CONTACT/:messengerId block
//     app.route('/contact/:contactId')
//     // GET
//     .get(getContactByID)
//     // POST
//     .post(addNewContact)
//     // PUT
//     .put(updateContact)
//     // DELETE
//     .delete(deleteContact); // semi-colon of end of block CONTACT/:contactId
// }

