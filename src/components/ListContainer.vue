<template>
  <div class="list-container border" v-if="language" >
    <input type="text" v-model="search" placeholder="search by key..."/>
    <div 
      v-for="item in searchByKey" 
      :key="item.key" 
      @click="selectTranslation(item)" 
      :class="[item.missTranslation ? 'missing list' : 'list']">
      {{ item.key }}
      <br>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { formatObject } from './utils'
export default {
  props: {
    language: {
      type: Object
    }
  }, 
  data() {
    return {
      list: [],
      sliceStart: 0,
      sliceSize: 10,
      search: ''
    }
  },
  computed: { 
    translations() {
      return this.list.slice(this.sliceStart, this.sliceStart + this.sliceSize)
    },
    searchByKey() {
      return this.translations.filter(element => element.key.includes(this.search))
    }
  },
  watch: {
    language: {
      handler(val, oldVal) {
        this.fetchTranslation(val.language)
      }
    }
  },
  methods: {
    async fetchTranslation (val) {
      try{
        const response = await axios.get(`http://localhost:5000/api/${val}`);
        this.list = response.data.map(item => formatObject(item, val))
         this.$emit('onCallback', {
          'status': 'ok',
          'message': 'translations found'
        })
      } catch (error) {
        console.warn(error)
         this.$emit('onCallback', {
          'status': 'error',
          'message': error.message
        })
      }
    },
    selectTranslation (translation) {
      this.$emit('translationSelected', translation)
    }
  }
}
</script>

<style>
.list-container{
  flex-direction: column;
}
.list-container .missing{
  font-weight: 700;
}
</style>
