// KSD V001.000 AS
import ConfigSelect from '@/resource/templates/ConfigSelect/ConfigSelect'

const USER_DATA_MODEL = {
  headquartersAuthority: null,
  businessUnitCd: null
}

export default {
  name: 'HourZoneSettingConfigSelect',
  components: {
    ConfigSelect
  },
  data () {
    return {
      userDataModel: JSON.parse(JSON.stringify(USER_DATA_MODEL))
    }
  },
  computed: {
    configType () {
      return 'HOUR_ZONE_SETTING'
    }
  },
  methods: {
    getSessionUserDataProperties () {
      this.$root.$once('getBusinessUnitCdStr', (businessUnitCd) => {
        this.userDataModel.businessUnitCd = [businessUnitCd]
      })
      this.$root.$once('getHeadquartersAuthority', (hqAuthority) => {
        this.userDataModel.headquartersAuthority = Boolean(hqAuthority)
      })
    }
  },
  async created () {
    this.getSessionUserDataProperties()
    document.title = this.$root.title = this.$route.meta.title
    this.$root.winId = 'F322b5'
    window.addEventListener('beforeunload', this.confirmUnload)
  },
  destroyed () {
    window.removeEventListener('beforeunload', this.confirmUnload)
  }
}
// KSD V001.000 AE
