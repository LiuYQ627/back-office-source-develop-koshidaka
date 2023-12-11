<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/CommonDesign/utils.css"></style>
<style scoped src="@/resource/static/css/MasterCommon/masterDialog.css"></style>
<style scoped src="@/resource/static/css/ReceiptSetting/receiptTaxOfficePrintingImageDialog.css"></style>
<script type="text/javascript" src="@/resource/static/js/ReceiptSetting/ReceiptTaxOfficePrintingImageDialog.js"></script>

<template>
  <div>
    <v-dialog
      v-model="receiptrevenueStampLogoDisplayed"
      persistent>
      <v-card class="basesize">
        <v-card-title class="headline dialog-line-blue title-label">
          <div id="changeLabel">
            <label
              id="newModelabel"
              v-if="!params.id"><b>{{ $i18n.t("F322b3.S035") }}</b></label>
            <label
              id="changeModelabel"
              v-if="params.id"><b>{{ $i18n.t("F322b3.S036") }}</b></label>
          </div>
          <label class="dialog-title">{{ $i18n.t("F322b3.S128") }}</label>
        </v-card-title>
        <div class="v-dialog-body-wrapper">
          <v-row
            no-gutters
            class="conditionRow w-100 d-flex align-center">
            <v-col
              cols="4"
              class="h-100">
              <label class="grayFrame h-100 w-100 d-flex justify-center align-center">
                {{ $i18n.t('F322b3.S032') }}
              </label>
            </v-col>

            <v-col
              cols="8"
              class="h-100">
              <input
                id="revenue-stamp-logo-filename"
                class="whiteFrame h-100 w-100 pl-2"
                type="text"
                v-model="params.revenueStampLogoFileName"
                disabled
              >
            </v-col>
          </v-row>
          <v-row
            no-gutters
            class="w-100 d-flex align-center mt-1 justify-end">
            <v-btn
              class="search-button-style"
              @click="onClickImageSelected()"
              tabindex="111"
              id="imageSelectedBtn">
              {{ $t("F322b3.S034") }}
            </v-btn>
          </v-row>
          <img
            :src="params.revenueStampLogoBase64EncodedString"
            class="imageBorderCellStyle" >
          <input
            class="d-none"
            id="revenue-stamp-logo-file-select"
            ref="revenueStampLogoFileSelect"
            type="file"
            @change="selectedFile">
        </div>
        <v-card-actions class="dialog-fotter">
          <v-spacer />
          <div class="deleteButton">
            <v-btn
              :disabled="disableCancelBtn"
              class="button dialog-fotter-button-blue footerButtonStyle"
              @click="clearImage()"
              tabindex="112">
              {{ $t("F322b3.S136") }}
            </v-btn>
          </div>
          <v-btn
            class="button dialog-fotter-button-gray footerButtonStyle"
            @click="closeDialog()"
            tabindex="113">
            {{ $t("O00004.S003") }}
          </v-btn>
          <v-btn
            class="button dialog-fotter-button-orange footerButtonStyle"
            @click="onClickOk()"
            tabindex="114">
            {{ $t("O00004.S008") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <popup ref="pop" />
  </div>
</template>
<!-- KSD V001.000 AE -->
