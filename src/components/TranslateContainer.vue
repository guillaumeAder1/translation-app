<template>
  <div v-if="curTranslation" class="translate-container">
    {{curTranslation.key}}
    <template>
      <TranslateForm
        v-for="(data, index) in curTranslation.translations" 
        :key="data.key + index"  
        :translation="data" 
        @onUpdate="postUpdate"/>
      <br>
      <code 
        v-for="(data, index) in curTranslation.translations" 
        :key="data.key +  index + 'code'">
        {{data}}
      </code>
      <br/>
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
    }
  },
  methods: {
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
