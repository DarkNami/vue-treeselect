<script lang="jsx">
  import { createApp } from 'vue'
  import PortalTarget from './PortalTarget'

  let placeholder

  export default {
    name: 'vue-treeselect--menu-portal',
    inject: [ 'instance' ],

    created() {
      this.portalEl = null
      this.portalTarget = null
    },

    mounted() {
      this.portalEl = document.createElement('div')
      document.body.appendChild(this.portalEl)
      const app = createApp(PortalTarget)
      app.provide('instance', this.instance)
      app.mount(this.portalEl)
      this.portalTarget = app
    },

    unmounted() {
      this.portalTarget.unmount()
      document.body.removeChild(this.portalEl)
      this.portalTarget = null
    },

    render() {
      if (!placeholder) placeholder = (
        <div class="vue-treeselect__menu-placeholder" />
      )

      return placeholder
    },
  }
</script>
