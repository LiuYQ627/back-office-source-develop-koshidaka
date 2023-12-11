// KSD V001.000 AS
const ButtonType = Object.freeze({
  LOGIN: 'login',
  ACTION: 'action',
  LINK: 'link',
  NONE: 'none'
})

const ButtonColor = Object.freeze({
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  DEFAULT: 'default'
})

export default {
  name: 'CommonButton',
  props: {
    type: {
      type: String,
      default: ButtonType.NONE,
      validator: (value) => Object.values(ButtonType).includes(value)
    },
    color: {
      type: String,
      default: ButtonColor.DEFAULT,
      validator: (value) => Object.values(ButtonColor).includes(value)
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  computed: {
    classes () {
      const classes = []
      classes.push(this.resolveButtonType())
      classes.push(this.resolveButtonColor())
      return classes
    }
  },
  methods: {
    resolveButtonType () {
      switch (this.type) {
        case ButtonType.LOGIN:
          return 'common-login-button'
        case ButtonType.ACTION:
          return 'common-action-button'
        case ButtonType.LINK:
          return 'common-link-button'
        case ButtonType.NONE:
        default:
          return null
      }
    },
    resolveButtonColor () {
      switch (this.color) {
        case ButtonColor.PRIMARY:
          return 'common-primary-button'
        case ButtonColor.SECONDARY:
          return 'common-secondary-button'
        case ButtonColor.DEFAULT:
        default:
          switch (this.type) {
            case ButtonType.LOGIN:
            case ButtonType.ACTION:
            case ButtonType.LINK:
              return 'common-primary-button'
            default:
              return null
          }
      }
    }
  }
}
// KSD V001.000 AE
