const 
  mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// this is the schema of our contact infos
const ContactSchema = new Schema({
    _id: {
        type : String,
        required : "Error cannot access data without messengerID"
    },    
    
    state: {
        type: String,
    },
    
    firstName: {
        type: String
    },

    lastName: {
        type: String
    },

    gender: {
        type: String
    },

    class: {
        type: String
    },

    birthdate: {
        type: String
    },
  
    birthplace: {
        type: String
    },
  
    address: {
        type: String
    },

    telephone: {
        type: String
    },

    email: {
        type: String
    },

    studentID: {
        type: String
    },

    cursus: {
        type: String
    },

    dreamJob: {
        type: String
    },

    location: {
        type: String
    },

    scholarship: {
        type: String
    },

    internship: {
        type: String
    },

    accompaniment: {
        type: String
    },

    handicap: {
        type: String
    },

    equipment: {
        type: String
    },

    utilitarian: {
        type: String
    },
    
    nationality: {
      type: String
    },
  
    availability: {
      type: String
    },
  
    spelling: {
      type: String
    },
  
    info: {
        type: String
    },
  
    formation: {
        type: String
    },
  
    languages: {
        type: String
    },
    
    // ADMIN RESTRICTED FIELDS //

    etablissement: {
        type: String
    },

    level: {
        type: String
    },

    filed: {
        type: Boolean
    },

    department: {
        type: String
    },

    procedure: {
        type: String
    },

    accompanied: {
        type: String
    },

    // ///// ///////// ///// //

    created_date: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Contact', ContactSchema);
