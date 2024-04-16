<template>
  <div>
    <treeselect
      :options="options"
      :modelValue="value"
      :searchable="false"
      @input="updateValue"
      />
    <treeselect-value :modelValue="value" />
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import { generateOptions } from './utils'

  export default {
    data: () => ({
      options: generateOptions(2),
    }),

    computed: {
      ...mapState(['value']),
    },

    methods: {
      ...mapMutations(['updateValue']),
    },
  }
</script>
