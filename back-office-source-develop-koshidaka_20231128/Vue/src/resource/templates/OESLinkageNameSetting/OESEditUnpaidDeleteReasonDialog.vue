<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/MasterCommon/masterDialog.css" />
<style scoped src="@/resource/static/css/CommonDesign/utils.css" />
<style scoped src="@/resource/static/css/OESLinkageNameSetting/OESEditUnpaidDeleteReasonDialog.css"></style>
<script type="text/javascript" src="@/resource/static/js/OESLinkageNameSetting/OESEditUnpaidDeleteReasonDialog.js"></script>
<template>
  <div class="text-center baseFont">
    <v-dialog
      v-model="dialog"
      persistent>
      <v-card class="basesize">
        <v-card-title class="headline dialog-line-blue title-label">
          <div id="changeLabel">
            <label id="changeModelabel"><b>{{ $t("F322b7.S022") }}</b></label>
          </div>
          <p class="dialog-title">{{ $t("F322b7.S023") }}</p>
        </v-card-title>
        <div id="baseTable">
          <table class="unpaid-edit-dialog-table">
            <tr>
              <th>{{ $t("F322b7.S024") }}</th>
              <td>
                <input
                  type="text"
                  :id="'readOnlyText'"
                  v-model="classificationName"
                  :disabled=true
                  style="ime-mode:disabled;"
                  tabindex="-1">
              </td>
            </tr>
            <tr>
              <th>{{ $t("F322b7.S025") }}</th>
              <td>
                <input
                  type="text"
                  :id="'readOnlyText'"
                  v-model="itemName"
                  :disabled=true
                  style="ime-mode:disabled;"
                  tabindex="-1">
              </td>
            </tr>
            <tr>
              <th>{{ $t("F322b7.S026") }}</th>
              <td>
                <input
                  type="text"
                  class="editTextBox"
                  ref="displayName"
                  v-model="unpaidDeleteDisplay.displayName"
                  :placeholder="this.$i18n.t('F322b7.S029')"
                  maxlength="16"
                  tabindex="101"
                  @input="(e) => inputLimit(e, 16, unpaidDeleteDisplay, 'displayName')">
              </td>
            </tr>
            <tr>
              <th>{{ $t("F322b7.S027") }}</th>
              <td>
                <input
                  type="text"
                  class="editTextBox"
                  ref="printName"
                  v-model="unpaidDeleteDisplay.printName"
                  :placeholder="this.$i18n.t('F322b7.S029')"
                  maxlength="16"
                  tabindex="102"
                  @input="(e) => inputLimit(e, 16, unpaidDeleteDisplay, 'printName')">
              </td>
            </tr>
          </table>
        </div>
        <v-card-actions class="dialog-fotter">
          <v-spacer/>
          <v-btn
            class="button dialog-fotter-button-gray footerButtonStyle"
            @click="onClickReturn()"
            tabindex="103">
            {{ $t("O00004.S003") }}
          </v-btn>
          <v-btn
            class="button dialog-fotter-button-orange footerButtonStyle"
            @click="onClickSave()"
            tabindex="104">
            {{ $t("O00004.S008") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <popup ref="pop"/>
  </div>
</template>
<!-- KSD V001.000 AE -->
