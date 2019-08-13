<template>
  <div class="block">
    <b>{{ translation.language }}: </b>
    <input type="text" v-model="model"/>
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