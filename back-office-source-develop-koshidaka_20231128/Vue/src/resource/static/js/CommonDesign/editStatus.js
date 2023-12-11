export default {
  props: [
    'editStatusMode', 'editStatusStyle'
  ],
  methods: {
    /**
     * 編集モード
     */
    editingMode () {
      return ['newMode', 'editingMode']
    }
  }
}
