<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/SelfPOSMasterSetting/selfPOSMasterSettingTimeSetting.css"></style>
<script type="text/javascript" src="@/resource/static/js/SelfPOSMasterSetting/selfPOSMasterSettingTimeSetting.js"></script>
<template>
  <div class="self-POS-master-setting-container">
    <v-row no-gutters>
      <v-col>
        <v-row
          no-gutters
          class="setting-label">
          {{ $t('C00222.S030') }}
        </v-row>
        <v-row no-gutters>
          <v-col>
            <!-- TABLE -->
            <table class="self-POS-master-setting-table">
              <thead>
                <tr>
                  <th width="75%">{{ $t("C00222.S031") }}</th>
                  <th width="25%">{{ $t("C00222.S032") }}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ $t("C00222.S033") }}</td>
                  <td class="input-container">
                    <input
                      type="text"
                      maxlength="5"
                      ref="nooperationtime"
                      :placeholder="this.$i18n.t('C00222.S091')"
                      :class="this.nooperationtimeflag !== null ? 'error-text-box' : 'edit-text-box'"
                      v-model="timeSettingConfig.nooperationtime"
                      @input="regulateNumericInput('nooperationtime')"
                    >
                  </td>
                </tr>
                <tr>
                  <td>{{ $t("C00222.S034") }}</td>
                  <td class="input-container">
                    <input
                      type="text"
                      maxlength="5"
                      ref="waitscreentransition"
                      :placeholder="this.$i18n.t('C00222.S091')"
                      :class="this.waitscreentransitionflag !== null ? 'error-text-box' : 'edit-text-box'"
                      v-model="timeSettingConfig.waitscreentransition"
                      @input="regulateNumericInput('waitscreentransition')"
                    >
                  </td>
                </tr>
                <tr>
                  <td>{{ $t("C00222.S035") }}</td>
                  <td class="input-container">
                    <input
                      type="text"
                      maxlength="5"
                      ref="topscreentransition"
                      :placeholder="this.$i18n.t('C00222.S091')"
                      :class="this.topscreentransitionflag !== null ? 'error-text-box' : 'edit-text-box'"
                      v-model="timeSettingConfig.topscreentransition"
                      @input="regulateNumericInput('topscreentransition')"
                    >
                  </td>
                </tr>
                <tr>
                  <td>{{ $t("C00222.S036") }}</td>
                  <td class="input-container">
                    <input
                      type="text"
                      maxlength="5"
                      ref="transittoomiokuri"
                      :placeholder="this.$i18n.t('C00222.S091')"
                      :class="this.transittoomiokuriflag !== null ? 'error-text-box' : 'edit-text-box'"
                      v-model="timeSettingConfig.transittoomiokuri"
                      @input="regulateNumericInput('transittoomiokuri')"
                    >
                  </td>
                </tr>
                <tr>
                  <td>{{ $t("C00222.S037") }}</td>
                  <td class="input-container">
                    <input
                      type="text"
                      maxlength="5"
                      ref="stillimageplaytime"
                      :placeholder="this.$i18n.t('C00222.S091')"
                      :class="this.stillimageplaytimeflag !== null ? 'error-text-box' : 'edit-text-box'"
                      v-model="timeSettingConfig.stillimageplaytime"
                      @input="regulateNumericInput('stillimageplaytime')"
                    >
                  </td>
                </tr>
                <tr>
                  <td>{{ $t("C00222.S038") }}</td>
                  <td class="input-container">
                    <input
                      type="text"
                      maxlength="3"
                      ref="movieplaynum"
                      :placeholder="this.$i18n.t('C00222.S090')"
                      :class="this.movieplaynumflag !== null ? 'error-text-box' : 'edit-text-box'"
                      v-model="timeSettingConfig.movieplaynum"
                      @input="regulateNumericInput('movieplaynum')"
                    >
                  </td>
                </tr>
              </tbody>
              <tr>
                <td/>
                <td class="text-right"><small>{{ $t("C00222.S039") }}</small></td>
              </tr>
            </table>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>
<!-- KSD V001.000 AE -->
