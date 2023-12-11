<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/SelfPOSMasterSetting/selfPOSMasterSettingPaymentSetting.css"></style>
<script type="text/javascript" src="@/resource/static/js/SelfPOSMasterSetting/selfPOSMasterSettingPaymentSetting.js"></script>
<template>
  <div class="self-POS-master-setting-container">
    <v-row no-gutters>
      <v-col>
        <v-row
          no-gutters
          class="setting-label">
          {{ $t('C00222.S040') }}
        </v-row>
        <v-row no-gutters>
          <v-col>
            <!-- TABLE -->
            <table class="self-POS-master-setting-table">
              <thead>
                <tr>
                  <th width="50%">{{ $t("C00222.S041") }}</th>
                  <th width="25%">{{ $t("C00222.S042") }}</th>
                  <th width="25%">{{ $t("C00222.S043") }}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ $t("C00222.S044") }}</td>
                  <td>
                    <select-input
                      class="select-control"
                      v-model="paymentSettingConfig.cashpayuse"
                      ref="cashpayuse"
                      :options="doOptions"
                      :empty-option="false"
                    />
                  </td>
                  <td class="input-container">
                    <input
                      type="text"
                      maxlength="2"
                      ref="cashpaytallnum"
                      :placeholder="this.$i18n.t('C00222.S092')"
                      :class="this.cashpaytallnumflag !== null ? 'error-text-box' : 'edit-text-box'"
                      v-model="paymentSettingConfig.cashpaytallnum"
                      @input="regulateNumericInput('cashpaytallnum')"
                    >
                  </td>
                </tr>
                <tr>
                  <td>{{ $t("C00222.S045") }}</td>
                  <td>
                    <select-input
                      class="select-control"
                      v-model="paymentSettingConfig.creditpayuse"
                      ref="creditpayuse"
                      :options="doOptions"
                      :empty-option="false"
                    />
                  </td>
                  <td class="input-container">
                    <input
                      type="text"
                      maxlength="2"
                      ref="creditpaytallnum"
                      :placeholder="this.$i18n.t('C00222.S092')"
                      :class="this.creditpaytallnumflag !== null ? 'error-text-box' : 'edit-text-box'"
                      v-model="paymentSettingConfig.creditpaytallnum"
                      @input="regulateNumericInput('creditpaytallnum')"
                    >
                  </td>
                </tr>
                <tr>
                  <td>{{ $t("C00222.S046") }}</td>
                  <td>
                    <select-input
                      class="select-control"
                      v-model="paymentSettingConfig.elemoneypayuse"
                      ref="elemoneypayuse"
                      :options="doOptions"
                      :empty-option="false"
                    />
                  </td>
                  <td class="input-container">
                    <input
                      type="text"
                      maxlength="2"
                      ref="elemoneypaytallnum"
                      :placeholder="this.$i18n.t('C00222.S092')"
                      :class="this.elemoneypaytallnumflag !== null ? 'error-text-box' : 'edit-text-box'"
                      v-model="paymentSettingConfig.elemoneypaytallnum"
                      @input="regulateNumericInput('elemoneypaytallnum')"
                    >
                  </td>
                </tr>
                <tr>
                  <td>{{ $t("C00222.S047") }}</td>
                  <td>
                    <select-input
                      class="select-control"
                      v-model="paymentSettingConfig.codepayuse"
                      ref="codepayuse"
                      :options="doOptions"
                      :empty-option="false"
                    />
                  </td>
                  <td class="input-container">
                    <input
                      type="text"
                      maxlength="2"
                      ref="codepaytallnum"
                      :placeholder="this.$i18n.t('C00222.S092')"
                      :class="this.codepaytallnumflag !== null ? 'error-text-box' : 'edit-text-box'"
                      v-model="paymentSettingConfig.codepaytallnum"
                      @input="regulateNumericInput('codepaytallnum')"
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<!-- KSD V001.000 AE -->
