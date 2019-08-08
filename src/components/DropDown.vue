<template>
  <select @change="select" v-model="selected">
    <option v-for="lang in languages" :key="lang.id" :value="lang" >{{ lang.language }}</option>
  </select>
</template>

<script>
// TODO , remove last element of reponse, emnpty value... not needed
import axios from 'axios'
export default {
  data () {
    return {
      languages: null,
      selected: {}
    }
  },
  async mounted() {
    try {
      const response = await axios.get('http://localhost:5000/api/codes');
      // improvment: could be good to select a default value
      this.languages = response.data
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    select() {
      console.log(this.selected)
      this.$emit('onSelected', this.selected)
    }
  }
}
</script>

<style>

</style>
