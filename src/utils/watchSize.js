import watchSizeParent from 'watch-size'

export function watchSize($el, listener) {
  // watch-size will call the listener on initialization.
  // Disable this behavior with a lock to achieve a clearer code logic.
  let locked = true
  const wrappedListener = (...args) => locked || listener(...args)
  const removeSizeWatcher = watchSizeParent($el, wrappedListener)
  locked = false // unlock after initialization
  return removeSizeWatcher
}
