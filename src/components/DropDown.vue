<template>
  <div class="header">
    <select @change="select" v-model="selected">
      <option disabled selected value="">Please select a language</option>

      <option 
        v-for="lang in languages" 
        :key="lang.id" 
        :value="lang" >
        {{ lang.language }}
      </option>
    </select>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      languages: null,
      selected: ''
    }
  },
  async mounted() {
    try {
      const response = await axios.get('http://localhost:5000/api/codes');
      this.languages = response.data.filter(item => item.language !== null)
      this.$emit('onCallback', {
        'status': 'ok',
        'message': 'codes found'
      })
    } catch (error) {
      console.error(error);
      this.$emit('onCallback', {
        'status': 'error',
        'message': error.message
      })
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
