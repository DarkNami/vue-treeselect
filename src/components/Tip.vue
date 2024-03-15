<script lang="jsx">
  export default {
    name: 'vue-treeselect--tip',

    props: {
      type: {
        type: String,
        required: true,
      },
      icon: {
        type: String,
        required: true,
      },
    },

    render(props, context) {
      const { children } = context

      return (
        <div class={`vue-treeselect__tip vue-treeselect__${props.type}-tip`}>
          <div class="vue-treeselect__icon-container">
            <span class={`vue-treeselect__icon-${props.icon}`} />
          </div>
          <span class={`vue-treeselect__tip-text vue-treeselect__${props.type}-tip-text`}>
            {children}
          </span>
        </div>
      )
    },
  }
</script>
