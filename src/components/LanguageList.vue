<template>
  <div class="form-group">
    <label class="form-label">Select Language</label>
    <select class="form-select" v-model="selected" @change="onLangSwitch">
      <option v-for="option in filteredOptions" v-bind:key="option.id">{{option.language}}</option>
    </select>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LanguageList",
  data() {
    return {
      options: [],
      selected: "en"
    };
  },
  methods: {
    onLangSwitch() {
      localStorage.setItem('langCode', this.selected);
      //TODO: Optimize the component to component communication for better performance
      this.$root.$emit("languageSwitch", this.selected);
    }
  },
  computed: {
    filteredOptions() {
      return this.options.filter(option => {
        return option.language;
      });
    }
  },
  mounted() {
    const savedLang = localStorage.getItem('langCode');
    if (!savedLang) {
      localStorage.setItem('langCode', 'en');
    }
    axios.get("http://localhost:5000/api/codes").then(response => {
      this.options = response.data;
    });
    this.selected = savedLang;
    this.onLangSwitch(this.selected);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
