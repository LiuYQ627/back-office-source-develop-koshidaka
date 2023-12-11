// KSD V001.000 AS
export default {
  props: {
    inputLabel: {
      type: String,
      required: true,
      default: ''
    },
    value: {
      type: String | Object | Array,
      required: true,
      default: ''
    },
    atEnter: {
      type: Function,
      required: true,
      default: () => {}
    },
    atInput: {
      type: Function,
      required: false,
      default: () => {}
    },
    inputLabelCols: {
      type: Number,
      required: false,
      default: 2
    },
    inputStyle: {
      type: String | Object | Array,
      required: false,
      default: 'ime-mode:disabled'
    },
    placeholder: {
      type: String,
      required: true,
      default: ''
    },
    maxlength: {
      type: Number,
      required: true,
      default: 1
    },
    disabled: {
      type: Boolean,
      required: true,
      default: ''
    },
    tabindex: {
      type: Number,
      required: true,
      default: 1
    }
  },
  model: {},
  data () {
    return {
    }
  },
  computed: {
    inputVal: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    },
  },
  components: {},
  methods: {},
  async created () {},
  async mounted () {

  }
}
// KSD V001.000 AE