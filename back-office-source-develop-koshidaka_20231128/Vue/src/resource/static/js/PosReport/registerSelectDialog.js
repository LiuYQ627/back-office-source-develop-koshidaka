import popup from '@/resource/templates/CommonDesign/Popup'
import commonDialog from '@/resource/templates/CommonDesign/CommonDialog'

/*
 * ---------+---------------------+----------+--------------------------------
 *  DATE    |NAME(Inc)            |GUIDE     |GUIDANCE
 * ---------+---------------------+----------+--------------------------------
 * 20221220  litie(Neusoft)        G001.00.0  issue課題#835を対応します.
 */

export default {
  props: {
    value: {
      type: Boolean,
      required: true
    },
    registerIds: {
      type: Array,
      required: true
    },
    availableRegisterIds: {
      type: Array,
      required: true
    },
    selectedRegisterIds: {
      type: Array,
      required: true
    },
    // G001.00.0 Update-Start
    multiple: {
      type: Boolean,
      default: true
    }
    // G001.00.0 Update-End
  },
  data () {
    return {
      isSelected: []
    }
  },
  components: {
    popup,
    commonDialog
  },
  methods: {
    clicked (event, index) {
      // G001.00.0 Update-Start
      if (!this.multiple) {
        if (!this.isSelected[index]) {
          this.isSelected.forEach((element, i) => {
            if (this.isSelected[i]) {
              this.$set(this.isSelected, i, !this.isSelected[i])
            }
          })
        }
      }
      // G001.00.0 Update-End
      this.$set(this.isSelected, index, !this.isSelected[index])
    },
    closeDialog () {
      // KSD V001.000 DS
      // this.$refs.pop.open(1, '', this.$i18n.t('O00004.W003'), '', true, () => { this.$emit('input', false) }, false, null)
      // KSD V001.000 DE
      // KSD V001.000 AS
      this.$emit('input', false)
      // KSD V001.000 AE
    },
    onClickOk () {
      // const selectedRegisterIds = this.isSelected
      this.$emit('clickOk', this.selected)
      this.$emit('input', false)
    }
  },
  computed: {
    selected: function () {
      return this.isSelected
        .map((selected, index) => selected ? this.availableRegisterIds[index] : undefined)
        .filter(id => id !== undefined)
      // this.$emit('clickOk', selectedRegisterIds)
      // this.$emit('input', false)
    }
  },
  watch: {
    value (newValue, oldValue) {
      if (newValue === true) {
        this.isSelected = this.availableRegisterIds.map(id => this.selectedRegisterIds.includes(id))
      }
    }
  }
}
