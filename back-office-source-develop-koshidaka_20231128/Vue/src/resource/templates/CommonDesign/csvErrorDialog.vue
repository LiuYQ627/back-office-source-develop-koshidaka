<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/CommonDesign/csvErrorDialog.css"></style>
<script type="text/javascript" src="@/resource/static/js/CommonDesign/csvErrorDialog.js"></script>
<template>
  <v-dialog width="560px" height="540px" v-model="dialog" persistent>
    <v-card class="product-group-master-csv-error-dialog">
      <v-card-title class="headline dialog-line-carissima">
        <font class="dialog-title">{{ this.$i18n.t('O00004.S053') }}</font>
      </v-card-title>
      <v-card-text class="product-group-master-csv-error-dialog-card-text">
        <div class="product-group-master-csv-error-dialog-card-text-top">
          <div class="d-flex product-group-master-csv-error-dialog-card-text-top-label">
            <p class="access-authority-registration-error-text" v-if="modalType === -2"
              v-html="this.$i18n.t('F32242.E025')" />
            <p class="access-authority-registration-error-text" v-if="modalType === -3"
              v-html="this.$i18n.t('F32242.E024')" />
          </div>
          <table class="device-error-table">
            <tr>
              <td class="first"><span class="column-one access-authority-registration-error-text">{{
                this.$i18n.t('F32242.S018') }}</span></td>
              <td class="second"><span class="access-authority-registration-error-text">{{ this.$i18n.t('F32242.S019')
              }}</span></td>
            </tr>
          </table>
        </div>
        <div class="product-group-master-csv-error-dialog-card-text-bottom">
          <table class="device-error-table">
            <tr v-for="(rowData, index) in errorList" :key="index">
              <td class="first">
                <span class="column-one access-authority-registration-error-text">{{ rowData.line }}</span>
              </td>
              <td class="second">
                <span class="access-authority-registration-error-text">{{ rowData.invalidData }}</span>
              </td>
            </tr>
          </table>
        </div>
      </v-card-text>
      <v-card-actions class="dialog-fotter">
        <v-spacer />
        <v-btn class="button dialog-footer-button-carissima footerButtonStyle" @click="onClickSave()" tabindex="0">
          {{ $t("O00004.S005") }}
        </v-btn>
      </v-card-actions>
    </v-card>
    <popup ref="pop" />
  </v-dialog>
</template>
<!-- KSD V001.000 AE -->
