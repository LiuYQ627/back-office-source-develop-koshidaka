<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/SelfPOSMasterSetting/selfPOSMasterSettingCustomerOptionSetting.css"></style>
<script type="text/javascript" src="@/resource/static/js/SelfPOSMasterSetting/selfPOSMasterSettingCustomerOptionSetting.js"></script>
<template>
  <div class="self-POS-master-setting-container">
    <v-row no-gutters>
      <v-col>
        <v-row
          no-gutters
          class="setting-label">
          {{ $t('C00222.S110') }}
        </v-row>
        <v-row
          no-gutters
          class="margin-30">
          <v-col
            cols="12"
            class="pa-0">
            <form-group-layout
              class="form-control"
              :header-cols="5"
              :body-cols="7"
              :title="$t('C00222.S111')"
            >
              <radio-button
                class="radio-button"
                v-model="customerOptionSettingConfig.ksdtaikiseidougastart"
                :labels="customerDisplayOptions"
              />
            </form-group-layout>
          </v-col>
        </v-row>
        <v-row
          no-gutters
          class="margin-30">
          <v-col
            cols="6"
            class="pa-0">
            <form-group-layout
              :header-cols="10"
              :body-cols="2"
              :title="$t('C00222.S114')"
            >
              <input
                type="text"
                maxlength="2"
                ref="waitscreentransitionstillpainting"
                :class="this.waitscreentransitionstillpaintingErrorMsg !== null ? 'error-text-box' : 'edit-text-box'"
                v-model="customerOptionSettingConfig.waitscreentransitionstillpainting"
                @input="e => inputNumberLimit(e, customerOptionSettingConfig, 'waitscreentransitionstillpainting', 2)"
              >
            </form-group-layout>
          </v-col>
          <v-col
            cols="6"
            class="py-0 px-2 d-flex align-center">
            <span>{{ $t("C00222.S115") }}</span>
          </v-col>
        </v-row>
        <v-row
          no-gutters
          class="margin-30">
          <v-col
            cols="12"
            class="pa-0">
            <form-group-layout
              :header-cols="5"
              :body-cols="7"
              :title="$t('C00222.S116')"
            >
              <input
                type="text"
                maxlength="30"
                ref="waitscreentransition1"
                :placeholder="this.$i18n.t('C00222.S094')"
                :class="this.waitscreentransition1ErrorMsg !== null ? 'error-text-box' : 'edit-text-box'"
                v-model="customerOptionSettingConfig.waitscreentransition1"
                @input="(e) => inputLimit(e, 30, customerOptionSettingConfig, 'waitscreentransition1')"
              >
            </form-group-layout>
          </v-col>
        </v-row>
        <v-row
          no-gutters
          class="margin-30">
          <v-col
            cols="12"
            class="pa-0">
            <form-group-layout
              :header-cols="5"
              :body-cols="7"
              :title="$t('C00222.S117')"
            >
              <input
                type="text"
                maxlength="30"
                ref="waitscreentransition2"
                :placeholder="this.$i18n.t('C00222.S094')"
                :class="this.waitscreentransition2ErrorMsg !== null ? 'error-text-box' : 'edit-text-box'"
                v-model="customerOptionSettingConfig.waitscreentransition2"
                @input="(e) => inputLimit(e, 30, customerOptionSettingConfig, 'waitscreentransition2')"
              >
            </form-group-layout>
          </v-col>
        </v-row>
        <v-row
          no-gutters
          class="margin-30">
          <v-col
            cols="12"
            class="pa-0">
            <form-group-layout
              :header-cols="5"
              :body-cols="7"
              :title="$t('C00222.S118')"
            >
              <input
                type="text"
                maxlength="30"
                ref="waitscreentransition3"
                :placeholder="this.$i18n.t('C00222.S094')"
                :class="this.waitscreentransition3ErrorMsg !== null ? 'error-text-box' : 'edit-text-box'"
                v-model="customerOptionSettingConfig.waitscreentransition3"
                @input="(e) => inputLimit(e, 30, customerOptionSettingConfig, 'waitscreentransition3')"
              >
            </form-group-layout>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>
<!-- KSD V001.000 AE -->
