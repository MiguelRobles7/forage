export function createModalController() {
  return {
    data() {
      return {
        isVisible: false
      }
    },
    methods: {
      closeModal() {
        this.isVisible = false
        this.$emit('close')
      },
      toggleModal() {
        this.isVisible = !this.isVisible
      }
    }
  }
}
