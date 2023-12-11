// KSD V001.000 AS
import storeSelect from '@/resource/templates/CommonInput/StoreSelect'
import maintButton from '@/resource/templates/CommonDesign/MaintButton'
import FormGroupLayout from '@/resource/templates/CommonDesign/FormGroupLayout'

export default {
  name: 'masterSettingLayout',
  props: {
    changedStore: {
      type: Function,
      default: () => {}
    },
    targetStoreCodesData: {
      type: Array,
      default: []
    },
    toSave: {
      type: Function,
      default: () => {}
    },
    cancel: {
      type: Function,
      default: () => {}
    },
    del: {
      type: Function,
      default: () => {}
    },
    add: {
      type: Function,
      default: () => {}
    },
    disableAdd: {
      type: Boolean,
      default: true
    },
    disableCancel: {
      type: Boolean,
      default: true
    },
    disableDel: {
      type: Boolean,
      default: true
    },
    disableToSave: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: '対象店舗'
    }
  },
  components: {
    storeSelect,
    maintButton,
    FormGroupLayout
  },
  methods: {
    closeTab () {
      this.$router.push('/TopPage')
    }
  },
  computed: {
    targetStoreCodes: {
      get () {
        return this.targetStoreCodesData
      },
      set (value) {
        this.$emit('update:targetStoreCodesData', value)
      }
    },
    isEditMode: {
      get () {
        return !this.disableToSave || !this.disableCancel
      }
    }
  }
}
// KSD V001.000 AE
