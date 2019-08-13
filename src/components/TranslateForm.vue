<template>
  <div class="form block">
    <b>{{ translation.language }}: </b>
    <textarea rows="5" cols="50" v-model="model"/>
    <button @click="updateValue">update</button>
  </div>
</template>
<script>
export default {
  name: 'TranslateForm',
  props: {
    translation: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      model: this.translation.value
    }
  },
  methods: {
    updateValue() {
      const newValue = {
        ...this.translation,
        value: this.model
      }
      this.$emit('onUpdate', newValue)
    }
  }
}
</script>