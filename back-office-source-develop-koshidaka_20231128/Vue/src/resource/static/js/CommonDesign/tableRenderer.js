// KSD V001.000 AS
export default {
  name: 'TableRenderer',
  props: {
    dataTable: {
      type: Array,
      require: true,
      default: []
    },
    tableProperties: {
      type: Object,
      require: true,
      default: []
    },
    dataRender: {
      type: Array,
      require: true,
      default: []
    },
    disableTable: {
      type: Boolean,
      default: false
    },
    isClickableRow: {
      type: Boolean,
      default: false
    },
    hasScroll: {
      type: Boolean,
      default: false
    },
    hasEdit: {
      type: Boolean,
      default: false
    },
    isEditWithBorder: {
      type: Boolean,
      default: false
    },
    hasCount: {
      type: Boolean,
      default: false
    },
    selectedData: {
      type: Function,
    },
    editTabIndexStartingPoint: {
      type: Number,
      default: 0
    },
    listHeaderExpand: {
      type: Boolean,
      default: false
    },
    fitToContainer: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      renderCount: 10,
      selectedIndex: null,
      clientHeight: 0,
      tableProps: [],
      isMounted: false
    }
  },
  components: {},
  methods: {
    initialize () { },
    valueRenderer (row) {
      if (this.hasEdit) {
        row['editFn'] = 'editFn'
      }
      return this.dataRender.map(res => row[res] ? row[res] : '')
    },
    selectData (rowData, index, type, e) {
      e.stopPropagation()
      const data = { ...rowData }
      if (type === 'row') {
        if (this.disableTable || !this.isClickableRow) return
        this.selectedIndex = index
      }
      if (type === 'type') {
        if (this.disableTable) return
      }
      delete data.editFn
      this.$emit('selectedData', { data, index })
    },
    confirmUnload () { },
    unSelect () {
      this.selectedIndex = null
    },
    checkHasEdit (header) {
      return this.hasEdit ? header : header.filter(res => res['staticLabel'] !== 'edit')
    },
    gitHeight () {
      let sum = 0
      sum = (50 * this.dataTable.length)
      sum += !this.hasCount ? 30 : 38
      return sum
    }
  },
  created () { },
  destroyed () {
  },
  mounted () {
    this.isMounted = true;
  },
  watch: {},
  computed: {
    clientDivHeight () {
      if (!this.isMounted) return;
      this.clientHeight
      return this.dataTable ? this.$refs.tableRendereMainContainerRef.clientHeight : 0
    }
  }
}
// KSD V001.000 AE
