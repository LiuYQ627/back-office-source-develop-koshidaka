<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/MasterCommon/masterCommon.css"></style>
<style scoped src="@/resource/static/css/HourZoneSetting/hourZoneSettingConfigSelect.css"></style>
<script type="text/javascript" src="@/resource/static/js/HourZoneSetting/hourZoneSettingConfigSelect.js"></script>

<template>
  <v-container class="hour-zone-setting-config-select-outer">
    <v-container class="hour-zone-setting-config-select-inner">
      <config-select
        v-model="configType"
        :user-data-model="userDataModel"
        :store-select-label="$t('F322b5.S001')"
        :configs-table-title="$t('F322b5.S002')"
      />
    </v-container>
  </v-container>
</template>
<!-- KSD V001.000 AE -->
