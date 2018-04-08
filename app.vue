<template>
    <div>
        <h1>{{title}}</h1>
            <input v-model="text1"
                  type="text"
                  placeholder="Mot de passe">
        <button @click="getData">
        Load
        </button>
            <h3 v-if="text1 === pass">
        Voici les données de la base:
      </h3>
        <h3 v-else>
          Accès refusé, veuillez entrer un mot de passe valide.
        </h3>
  <table style="width:100%;border:1px solid black">
      <tr v-if="text1 === pass" style="border: 1px solid black">
        <th v-if="text1 === pass" v-for="item in display" style="border: 1px solid black">
          {{ item }}
        </th>
      </tr>
      <tr v-if="text1 === pass" v-for="object in dataset" style="border: 1px solid black">
        <th v-if="text1 === pass" v-for="info in object" style="border: 1px solid black">
          {{ info }}
        </th>
      </tr>
  </table>

</div>
</template>

<script>
const PASS_ADMIN = process.env.PASS_ADMIN;  
export default {
    data: function () {
        let raw = {
            title: 'Connexion administrateur BD Chatbot:',
            display: ["", "ID", "", "Etat", "Sexe", "Questionnaire", "Prénom", "Nom", "Handicap", "Equipement", "Materiel adapté", "Date de naissance", "Adresse", "Téléphone", "Numéro étudiant", "Diplômes", "Métier souhaité", "Localisation", "Boursier", "Stage à effectuer", "Accompagnement souhaité", "Informations suplémentaires"],
            dataset: [],
            loaded: false,
            text1 : '',
            pass : PASS_ADMIN
        };
        return raw;
    },
  
    methods: {
      getData: function(){

        if(!this.loaded){
          for (var key in this) {
            if(typeof this[key] !== 'undefined' && this[key] !== null){
               this.dataset.push(this[key]._doc);
            }
          }
          this.loaded = true;
        }
      }
    }
}
</script>
