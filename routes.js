import { 
    addNewContact, 
    getContacts, 
    getContactByID, 
    updateContact,
    deleteContact,
    getFieldByID,   
 } from "./controller";

// Our endpoints configuration

// routes function is used inside of index.js
const routes = (app) => {
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
}

// we export our function to be able to use it elsewhere
export default routes;