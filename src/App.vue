<template>
  <div id="app">
    <DropDown 
      @onSelected="langSelected"
      @onCallback="displayMessage"/>
    <div class="content">
      <ListContainer 
        :language="selectedLang" 
        @translationSelected="selectTranslation"
        @onCallback="displayMessage" />
      <TranslateContainer 
        :curTranslation="selectedTranslation" 
        @onCallback="displayMessage"/>
    </div>
    <div v-if="callbackMessage" :class="`message ${callbackMessage.status}`">
      {{callbackMessage.message}}
    </div>
  </div>
</template>

<script>
import DropDown from './components/DropDown'
import ListContainer from './components/ListContainer'
import TranslateContainer from './components/TranslateContainer'
import { setTimeout } from 'timers';

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
      selectedTranslation: null,
      callbackMessage: ''
    }
  },
  methods: {
    langSelected (value) {
      this.selectedLang = value
    },
    selectTranslation (translation) {
      this.selectedTranslation = translation
    },
    // methods used for status messaging from components
    // couble be replace by a Vuex state for better maintenance with deep component tree
    displayMessage(msg) {
      this.callbackMessage = ''
      setTimeout(() => {
        this.callbackMessage = msg
      }, 500)
    }
  }
};
</script>

<style>
#app div {
  padding: 5px;
  margin: 5px;
  flex: 1;
  display: flex;
}
#app div .translate-container{
  display: flex;
  flex-direction: column
}

#app div.header{
  flex: 0 0 100px;
}

#app .border{
  border: 1px solid grey;
  padding: 20px;
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
#app ul{
  list-style-type: none;
  padding: initial;
}
#app .list{
  padding: 10px 0;
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
  cursor: pointer;
  flex: 0 0 30px;
  border-bottom: 1px solid lightgrey;
}
#app div.block{
  flex: none;
  display: block;
} 
#app div.message{
  padding: 20px;
  position: absolute;
  top:10px;
  right: 10px;
}
#app div.message.ok {
  background: rgb(211, 249, 211);
}
#app div.message.error {
  background: rgb(201, 164, 164);
}
#app div.form *{
  vertical-align: middle;
}
#app input[type="text"] {
  padding: 10px;
}

#app input[type='radio'], #app label{   
  line-height: 18px;
}
#app .filter-options{
  flex: 0;
}
</style>
