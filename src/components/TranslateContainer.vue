<template>
  <div v-if="translation" class="translate-container">
    <span>EN</span> 
    <input 
      @blur="updateField('en', field1)" 
      type="text" 
      v-model="field1"  
      />
    <span>{{ getLanguage.toUpperCase() }}</span>
    <input 
      @blur="updateField(getLanguage, field2)" 
      type="text" 
      v-model="field2" />
    <br>
    <br>
    <br>
    EN
    <code>{{ translation.en }}</code>
    {{ this.language.language.toUpperCase() }}
    <code>{{ translation[this.language.language] || 'null'  }}</code>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: {
    translation: {
      type: Object
    },
    language: {
      type: Object
    }
  },
  data() {
    return {
     _field1: '',
     _field2: ''
    }
  },
  computed: {
    getLanguage() {
      return this.language.language
    },
    field1() {
      return this.getValue(this.translation, 'en')
      }, 
    field2() {
      return this.getValue(this.translation, this.getLanguage)
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
    async postUpdate (value, key, language) {
      const data = {
        key: key,
        value: value,
        filename: this.getFilename(this.translation, language),
        language: language
      }
      console.log(data)
      const response = await axios({
        method: 'post',
        url: 'http://localhost:5000/api/newTranslation',
        data: data
      });
      console.log(response)
    }
  }
}
</script>

<style>

</style>
