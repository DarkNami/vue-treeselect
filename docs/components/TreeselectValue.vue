<template>
  <pre class="result">{{ stringifiedValue }}</pre>
</template>

<script>
  export default {
    // eslint-disable-next-line vue/require-prop-types
    props: [ 'modelValue' ],

    computed: {
      stringifiedValue() {
        const rawValue = this.modelValue

        return rawValue === undefined
          ? 'undefined'
          : JSON.stringify(rawValue, null, 2)
      },
    },
  }
</script>
