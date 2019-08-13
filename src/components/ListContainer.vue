<template>
  <div class="list-container" v-if="language" >
      <div 
        v-for="item in translations" 
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
      sliceSize: 10
    }
  },
  computed: { 
    translations() {
      return this.list.slice(this.sliceStart, this.sliceStart + this.sliceSize)
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
      } catch (err) {
        console.warn(err)
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
