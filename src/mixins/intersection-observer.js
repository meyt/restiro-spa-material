export function findVisibleItemId (items) {
  const index = items.length % 2 === 0
    ? items.length / 2 + 1 // e.g: [11, 22, 33, 44] -> 33
    : Math.ceil(items.length / 2) // [11, 22, 33, 44, 55] -> 33
  return items[index - 1]
}

export function getViewportFocusItemId (items) {
  const sortedArray = [...items]
  sortedArray.sort((a, b) => a - b)
  return findVisibleItemId(sortedArray)
}

export default {
  props: {
    observableItemId: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      isInViewport: false,
      isInViewportSince: 0,
      firstObserved: false,
      isInViewportFocus: false
    }
  },
  mounted () {
    const options = {
      threshold: [0],
      rootMargin: '0px 0px',
      delay: 500
    }
    const observeHandler = (changes) => {
      for (const change of changes) {
        // ⚠️ Feature detection
        if (typeof change.isVisible === 'undefined') {
          // The browser doesn't support Intersection Observer v2,
          // falling back to v1 behavior.
          change.isVisible = true
        }
        // Edge 15 doesn't support isIntersecting, but we can infer it
        // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/12156111/
        // https://github.com/WICG/IntersectionObserver/issues/211
        const isIntersecting = (typeof change.isIntersecting === 'boolean')
          ? change.isIntersecting
          : change.intersectionRect.height > 0
        if (isIntersecting && change.isVisible) {
          this.isInViewportSince = change.time
          this.isInViewport = true
        } else {
          this.isInViewportSince = 0
          this.isInViewport = false
        }
      }
    }
    this._intersectionObserver = new window.IntersectionObserver(
      observeHandler,
      options
    )
    this._intersectionObserver.observe(this.$el)
  },
  beforeDestroy () {
    if (!this._intersectionObserver) return
    this._intersectionObserver.disconnect()
    this._intersectionObserver = null
  },
  watch: {
    isInViewport (newVal) {
      if (!this.observableItemId) return
      if (!this.firstObserved && newVal) this.firstObserved = true
      this.$store.commit(
        newVal
          ? 'APPEND_LAST_VISIBLE_ITEM_ID'
          : 'DELETE_FROM_LAST_VISIBLE_ITEM_ID',
        this.observableItemId
      )
    }
  }
}
