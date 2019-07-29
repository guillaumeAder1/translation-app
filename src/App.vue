<template>
  <div id="app">
    <div class="columns">
      <div class="column">
        <div class="hero hero-sm bg-dark">
          <h1>Translate Helper</h1>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="columns">
        <div class="column col-3">
          <language-list></language-list>
        </div>
      </div>
      <div class="columns table-section">
        <div class="column col-10 p-centered">
          <translation-details></translation-details>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LanguageList from "./components/LanguageList";
import TranslationDetails from "./components/TranslationDetails";

export default {
  name: "app",
  components: {
    LanguageList,
    TranslationDetails
  }
};
</script>

<style>
@import url("https://unpkg.com/spectre.css/dist/spectre.min.css");
@import url("https://unpkg.com/spectre.css/dist/spectre-exp.min.css");
@import url("https://unpkg.com/spectre.css/dist/spectre-icons.min.css");

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.hero {
  text-align: center;
}

.container {
  margin-top: 32px;
}

.table-section {
  margin-top: 16px
}
</style>
