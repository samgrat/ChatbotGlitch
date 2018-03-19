import mongoose from 'mongoose';
import { ContactSchema } from './model';

const Contact = mongoose.model('Contact', ContactSchema);

// Add a new Contact function
export const addNewContact = (req, res) => {
    let newContact = new Contact(req.body);

    newContact.save((err, contact) => {
        if(err){
            res.send(err);
        }
        res.json(contact);
    });
};

// Function to get all contacts
export const getContacts = (req, res) => {
    Contact.find({}, (err, contact) => {
        if(err){
            res.send(err);
        }
        res.json(contact);
    });
};

// Get a contact by its object id
export const getContactByObjectID = (req, res) => {
    Contact.findById(req.params.contactId, (err,contact) => {
        if(err){
            res.send(err);
        }
        res.json(contact);
    });
};

// Get by messengerID
export const getContactByID = (req, res) => {
    Contact.findOne({_id: req.params.contactId}, (err,contact) => {
        if(err){
            res.send(err);
        }
        res.json(contact);
    });
};

// TODO
export const getFieldByID = (req,res) => {
    Contact.findOne({_id: req.params.contactId}, (err,contact) => {
        if(err){
            res.send(err);
        }
        res.json(contact);
    });
};


// Update a contact and returns new infos
export const updateContact = (req, res) => {
    Contact.findOneAndUpdate({_id: req.params.contactId}, req.body, { new: true}, (err,contact) => {
        if(err){
            res.send(err);
        }
        res.json(contact);
    });
};

export const deleteContact = (req, res) => {
    Contact.remove({_id: req.params.contactId }, (err, contact) => {
        if(err){
            res.send(err);
        }
        res.json({message: 'Contact Deleted'});
    });
};