<template>
  <div id="app">
    <div class="header">
      <DropDown @onSelected="langSelected"/>
    </div>
    <div class="content">
      <ListContainer 
        :language="selectedLang" 
        @translationSelected="selectTranslation" />
      <TranslateContainer 
        :curTranslation="selectedTranslation" 
        :language="selectedLang"/>
    </div>
  </div>
</template>

<script>
import DropDown from './components/DropDown'
import ListContainer from './components/ListContainer'
import TranslateContainer from './components/TranslateContainer'

export default {
  name: "app",
  components: {
    DropDown,
    ListContainer,
    TranslateContainer
  },
  data() {
    return {
      selectedLang: null,
      selectedTranslation: null
    }
  },
  methods: {
    langSelected (value) {
      this.selectedLang = value
    },
    selectTranslation (translation) {
      this.selectedTranslation = translation
    }
  }
};
</script>

<style>
#app div {
  /* border :1px solid grey; */
  padding: 5px;
  margin: 5px;
  flex: 1;
  display: flex;
}
/* #app div.content:first-child{
  flex: 0 0 200px;
} */
#app div .translate-container{
  display: flex;
  flex-direction: column
}

#app div.header{
  flex: 0 0 100px;
}

#app {
  height: 90vh;
  flex-direction: column;
  display: flex;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.list{
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
}
#app div.block{
  flex: none;
  display: block;
} 
</style>
