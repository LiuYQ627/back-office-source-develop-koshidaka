// KSD V001.000 AS
import CommonSelectDialog from '@/resource/templates/CommonDesign/CommonSelectDialog'
import FormGroupLayout from '@/resource/templates/CommonDesign/FormGroupLayout'
import popup from '@/resource/templates/CommonDesign/Popup'
import errorMappingUtils from '@/resource/static/js/Common/errorMappingUtils'
import validationUtils from '@/resource/static/js/Common/validationUtils'

export default {
  name: 'PriceListDisplayMasterSettingDefaultDisplay',
  mixins: [validationUtils, errorMappingUtils],
  props: {
    value: {
      type: Object,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    masterList: {
      type: Array,
      default: []
    },
    nodeIds: {
      type: Array,
      default: []
    },
    priceListDisplayDefaultList: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      memberPriceList: [
        { code: 1, name: this.$i18n.t('C00224.S031') },
        { code: 2, name: this.$i18n.t('C00224.S032') }
      ],
      ageDivisionCodeList: [
        { code: 1, name: this.$i18n.t('C00224.S039') },
        { code: 2, name: this.$i18n.t('C00224.S040') },
        { code: 3, name: this.$i18n.t('C00224.S041') },
        { code: 4, name: this.$i18n.t('C00224.S042') },
        { code: 5, name: this.$i18n.t('C00224.S043') },
        { code: 6, name: this.$i18n.t('C00224.S044') }
      ],
      countSettingList: [
        { code: 1, name: this.$i18n.t('C00224.S033') },
        { code: 2, name: this.$i18n.t('C00224.S034') }
      ],
      courseNoList: [
        { code: 1, name: this.$i18n.t('C00224.S039') },
        { code: 2, name: this.$i18n.t('C00224.S040') },
        { code: 3, name: this.$i18n.t('C00224.S041') },
        { code: 4, name: this.$i18n.t('C00224.S042') },
        { code: 5, name: this.$i18n.t('C00224.S043') },
        { code: 6, name: this.$i18n.t('C00224.S044') },
        { code: 7, name: this.$i18n.t('C00224.S045') },
        { code: 8, name: this.$i18n.t('C00224.S046') },
        { code: 9, name: this.$i18n.t('C00224.S047') },
        { code: 10, name: this.$i18n.t('C00224.S048') },
        { code: 11, name: this.$i18n.t('C00224.S049') },
        { code: 12, name: this.$i18n.t('C00224.S050') },
        { code: 13, name: this.$i18n.t('C00224.S051') },
        { code: 14, name: this.$i18n.t('C00224.S052') },
        { code: 15, name: this.$i18n.t('C00224.S053') },
        { code: 16, name: this.$i18n.t('C00224.S054') },
        { code: 17, name: this.$i18n.t('C00224.S055') },
        { code: 18, name: this.$i18n.t('C00224.S056') },
        { code: 19, name: this.$i18n.t('C00224.S057') },
        { code: 20, name: this.$i18n.t('C00224.S058') }
      ],
      targetStoreText: ''
    }
  },
  components: {
    CommonSelectDialog,
    FormGroupLayout,
    popup
  },
  computed: {
    defaultListData () {
      return this.priceListDisplayDefaultList
    }
  },
  methods: {
    async setFocus () {
      await this.$nextTick(() => {
        const focusable = this.$el.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
        const target = [...focusable].find(x => !x.disabled)
        target.focus()
      })
    },
    handleFormInput (event) {
      this.$emit('input', this.defaultListData)
    }
  },
  watch: {
    disabled (value) {
      if (value === false) {
        this.setFocus()
      }
    }
  }
}
// KSD V001.000 AE
