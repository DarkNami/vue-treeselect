<script lang="jsx">
  import { watchSize, setupResizeAndScrollEventListeners, find } from '../utils'
  import Menu from './Menu'

  export default {
    name: 'vue-treeselect--portal-target',
    inject: [ 'instance' ],

    created() {
      this.controlResizeAndScrollEventListeners = null
      this.controlSizeWatcher = null
    },

    mounted() {
      const { instance } = this
      if (instance.menu.isOpen) this.setupHandlers()
      this.$watch('instance.menu.isOpen', (newValue) => {
        if (newValue) {
          this.setupHandlers()
        } else {
          this.removeHandlers()
        }
      })
      this.$watch('instance.menu.placement', () => {
        this.updateMenuContainerOffset()
      })
    },

    methods: {
      setupHandlers() {
        this.updateWidth()
        this.updateMenuContainerOffset()
        this.setupControlResizeAndScrollEventListeners()
        this.setupControlSizeWatcher()
      },

      removeHandlers() {
        this.removeControlResizeAndScrollEventListeners()
        this.removeControlSizeWatcher()
      },

      setupControlResizeAndScrollEventListeners() {
        const { instance } = this
        const $control = instance.getControl()

        // istanbul ignore next
        if (this.controlResizeAndScrollEventListeners) return

        this.controlResizeAndScrollEventListeners = {
          remove: setupResizeAndScrollEventListeners($control, this.updateMenuContainerOffset),
        }
      },

      setupControlSizeWatcher() {
        const { instance } = this
        const $control = instance.getControl()

        // istanbul ignore next
        if (this.controlSizeWatcher) return

        this.controlSizeWatcher = {
          remove: watchSize($control, () => {
            this.updateWidth()
            this.updateMenuContainerOffset()
          }),
        }
      },

      removeControlResizeAndScrollEventListeners() {
        if (!this.controlResizeAndScrollEventListeners) return

        this.controlResizeAndScrollEventListeners.remove()
        this.controlResizeAndScrollEventListeners = null
      },

      removeControlSizeWatcher() {
        if (!this.controlSizeWatcher) return

        this.controlSizeWatcher.remove()
        this.controlSizeWatcher = null
      },

      updateWidth() {
        const { instance } = this
        const $portalTarget = this.$el
        const $control = instance.getControl()
        const controlRect = $control.getBoundingClientRect()

        $portalTarget.style.width = controlRect.width + 'px'
      },

      updateMenuContainerOffset() {
        const { instance } = this
        const $control = instance.getControl()
        const $portalTarget = this.$el
        const controlRect = $control.getBoundingClientRect()
        const portalTargetRect = $portalTarget.getBoundingClientRect()
        const offsetY = instance.menu.placement === 'bottom' ? controlRect.height : 0
        const left = Math.round(controlRect.left - portalTargetRect.left) + 'px'
        const top = Math.round(controlRect.top - portalTargetRect.top + offsetY) + 'px'
        const menuContainerStyle = this.$refs.menu.$refs['menu-container'].style
        const transformVariations = [ 'transform', 'webkitTransform', 'MozTransform', 'msTransform' ]
        const transform = find(transformVariations, t => t in document.body.style)
        menuContainerStyle[transform] = `translate3d(${left}, ${top})`
      },
    },

    render() {
      const { instance } = this
      const portalTargetClass = [ 'vue-treeselect__portal-target', instance.wrapperClass ]
      const portalTargetStyle = { zIndex: instance.zIndex }

      return (
        <div class={portalTargetClass} style={portalTargetStyle} data-instance-id={instance.getInstanceId()}>
          <Menu ref="menu" />
        </div>
      )
    },

    unmounted() {
      this.removeHandlers()
    },
  }
</script>
