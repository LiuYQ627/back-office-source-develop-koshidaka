<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/CommonDesign/utils.css"></style>
<style scoped src="@/resource/static/css/MasterCommon/masterDialog.css"></style>
<style scoped src="@/resource/static/css/ReceiptSetting/receiptHorizontalSettingDialog.css"></style>
<script type="text/javascript" src="@/resource/static/js/ReceiptSetting/ReceiptHorizontalSettingDialog.js"></script>

<template>
  <div>
    <v-dialog
      v-model="receiptInfoDisplayed"
      persistent
      width="700px">
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
          <label class="dialog-title">{{ $i18n.t("F322b3.S116") }}</label>
        </v-card-title>
        <div class="v-dialog-body-wrapper">
          <v-row
            no-gutters
            class="conditionRow w-100">
            <v-col
              cols="4"
              class="h-100">
              <label class="grayFrame d-flex justify-center align-center h-100 w-100">
                {{ $i18n.t('F322b3.S117') }}
              </label>
            </v-col>

            <v-col
              cols="8"
              class="h-100">
              <radio-button
                v-model="params.receiptOrientation"
                :labels="receiptOrientationLabels" />
            </v-col>
          </v-row>
        </div>
        <v-card-actions class="dialog-fotter">
          <v-spacer/>
          <v-btn
            class="button dialog-fotter-button-gray footerButtonStyle"
            @click="closeDialog()"
            tabindex="0">
            {{ $t("O00004.S003") }}
          </v-btn>
          <v-btn

            class="button dialog-fotter-button-orange footerButtonStyle"
            @click="onClickOk()"
            tabindex="0">
            {{ $t("O00004.S008") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <popup ref="pop" />
  </div>
</template>
<!-- KSD V001.000 AE -->
