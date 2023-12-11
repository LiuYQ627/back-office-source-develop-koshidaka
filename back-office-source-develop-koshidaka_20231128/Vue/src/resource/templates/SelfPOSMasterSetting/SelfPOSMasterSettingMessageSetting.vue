<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/CommonDesign/utils.css"></style>
<style scoped src="@/resource/static/css/SelfPOSMasterSetting/selfPOSMasterSettingMessageSetting.css"></style>
<script type="text/javascript" src="@/resource/static/js/SelfPOSMasterSetting/selfPOSMasterSettingMessageSetting.js"></script>
<template>
  <div class="self-POS-master-setting-container">
    <v-row no-gutters>
      <v-col>
        <v-row
          no-gutters
          class="setting-label">
          {{ $t('C00222.S050') }}
        </v-row>
        <v-row
          no-gutters
          class="message-body">
          <v-col>
            <v-row
              no-gutters
              class="message-header">
              {{ $t('C00222.S051') }}
            </v-row>
            <v-row no-gutters>
              <text-input
                class="form-control text-area-element"
                :placeholder="this.$i18n.t('C00222.S093')"
                v-model="messageSettingConfig.ondrinkorderguide"
                :max-byte-length="68"
                multiline
              />
            </v-row>
          </v-col>
        </v-row>
        <v-row
          no-gutters
          class="message-body">
          <v-col>
            <v-row
              no-gutters
              class="message-header">
              {{ $t('C00222.S052') }}
            </v-row>
            <v-row no-gutters>
              <text-input
                class="form-control text-area-element"
                :placeholder="this.$i18n.t('C00222.S093')"
                v-model="messageSettingConfig.conceptroomguid"
                :max-byte-length="68"
                multiline
              />
            </v-row>
          </v-col>
        </v-row>
        <v-row
          no-gutters
          class="message-body">
          <v-col>
            <v-row
              no-gutters
              class="message-header">
              {{ $t('C00222.S053') }}
            </v-row>
            <v-row no-gutters>
              <text-input
                class="form-control text-area-element"
                :placeholder="this.$i18n.t('C00222.S093')"
                v-model="messageSettingConfig.seeingoff"
                :max-byte-length="68"
                multiline
              />
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>
<!-- KSD V001.000 AE -->
