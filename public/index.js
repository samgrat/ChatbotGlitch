import Vue from 'vue';
import indexVue from './index.vue';

const 
  PASS_ADMIN = process.env.PAGE_ADMIN,
  mongoose = require('mongoose'),
  ContactSchema = require('./model').ContactSchema,
  Contact = mongoose.model('Contact', ContactSchema);

new Vue(indexVue).$mount('#app');

// let vm = new Vue({
//         el: '#app',
//         data: {
//           input: 'lol',
//           passAdmin: PASS_ADMIN,
//           results: []
//         },
//         methods: {
//         getContacts: function() {
//           Contact.find({}, (err, contact) => {
//             if(err){
//               this.results = err;
//             }
//             this.results = contact;
//             });
//           }
//         }
//       });
                                  