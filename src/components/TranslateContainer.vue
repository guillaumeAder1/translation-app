<template>
  <div v-if="curTranslation" class="translate-container">
    <template>
      <TranslateForm
        v-for="(data, index) in curTranslation.translations" 
        :key="data.key + index"  
        :translation="data" 
        @onUpdate="postUpdate"/>
    </template>
  </div>
</template>

<script>
import axios from 'axios'
import TranslateForm from './TranslateForm'
export default {
  components: {
    TranslateForm
  },
  props: {
    curTranslation: {
      type: Object
    },
    language: {
      type: Object
    }
  },
  computed: {
    getLanguage() {
      return this.language.language
    }
  },
  methods: {
    getValue(translation, lang) {
      if (!translation) return ''
      if (lang in translation) {
        return translation[lang].value
      }
      return ''
    },
    updateField (type, value) {
      console.log(type, value)
      this.postUpdate(value, this.getkey(this.translation))
    },
    getKey(data) {
      console.log(Object.keys(data).map(element => element.key)[0])
    },
    getFilename(data, lang) {
      return Object.keys(data).map(element => element.file)[0].replace(/(_en.|_no.|_ga.)/, `_${lang}.`)
    },
    hasChanged (newValue) {
      console.log(newValue)
    },
    async postUpdate (translation) {
      try {
        const response = await axios({
          method: 'post',
          url: 'http://localhost:5000/api/newTranslation',
          data: translation
        });
        console.log(response)
      } catch (error) {
        console.warn(error)
      }
    }
  }
}
</script>

<style>

</style>
