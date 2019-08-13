<template>
  <div class="list-container" v-if="language" >
    <div>Selected Language: {{ language.language }}</div>
      <div 
        v-for="item in translations" 
        :key="item.key" 
        @click="selectTranslation(item)" 
        :class="[item.translationMissing ? ' missing list' : 'list']">
        {{ item.key }}
        <br>
        translation is missing: {{ item.missTranslation }}
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
        // .map(item=> {
        //   return {
        //     ...item,
        //     title: item[Object.keys(item)[0]].key,
        //     fileName: item[Object.keys(item)[0]].file,
        //     translationMissing: this.isMissing(item)
        //   } /// find missing is wrong
        // })
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
    /**
     * define if translation is missing:
     *  - check only one key, e.g. { en: {...} } // 'no' do not exist
     *  - check if one of the en.value field is '' empyt string
     * @return false or the { missing translation }
     */
    isMissing (item) {
      const missingKey = Object.keys(item).length !== 2 
      const valueIsEmpty = Object.keys(item).filter(element => item[element].value === "").length
      const missing = !!missingKey || !!valueIsEmpty
      return missing
    },
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
</style>
