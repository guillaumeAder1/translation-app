<template>
  <div>
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th>Name</th>
          <th>Value</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in fileredList" v-bind:key="item[langCode].id">
          <td class="text-ellipsis key-name" v-bind:title="item[langCode].name">{{item[langCode].name}}</td>
          <td><input type="text" v-model="item[langCode].value" /></td>
          <td><button class="btn" @click="update(item)">Update Translation</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TranslationDetails",
  data() {
    return {
      list: [],
      langCode: localStorage.getItem('langCode') ||'en'
    };
  },
  methods: {
    getTranslations(langCode) {
      axios.get(`http://localhost:5000/api/${langCode}`).then(response => {
        this.list = response.data;
      });
    },
    update(item) {
      console.log("translate called", item[this.langCode]);
      const payload = {
        property: item[this.langCode].name,
        filename: this.getFileName(this.langCode),
        language: this.langCode,
        textvalue: item[this.langCode].value
      };
      console.log(payload);
      axios
        .post("http://localhost:5000/api/newTranslation", payload)
        .then(response => {
          console.log("Translation successful");
        })
        .catch(e => {
          console.log("Error updating translation", e);
        });
    },
    getFileName(langCode) {
      return `messages_${langCode}.properties`;
    }
  },
  computed: {
    fileredList() {
      return this.list.filter(item => {
        return item[this.langCode];
      });
    }
  },
  mounted() {
    this.$root.$on("languageSwitch", langCode => {
      this.langCode = langCode;
      this.getTranslations(langCode);
    });
    this.getTranslations(this.langCode);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.table-container {
  height: 400px;
  overflow-y: auto;
}
.key-name {
  max-width: 300px;
}
</style>
