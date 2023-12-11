<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/CommonDesign/utils.css"></style>
<style scoped src="@/resource/static/css/MasterCommon/masterDialog.css"></style>
<style scoped src="@/resource/static/css/ReceiptSetting/receiptMerchantNameDialog.css"></style>
<script type="text/javascript" src="@/resource/static/js/ReceiptSetting/ReceiptMerchantNameDialog.js"></script>

<template>
  <div>
    <v-dialog
      v-model="merchantNameDisplayed"
      persistent
      width="800px">
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
          <label class="dialog-title">{{ $i18n.t("F322b3.S075") }}</label>
        </v-card-title>
        <div class="v-dialog-body-wrapper">
          <v-row
            no-gutters
            class="conditionRow w-100 d-flex align-center">
            <v-col
              cols="5"
              class="h-100">
              <label class="grayFrame h-100 w-100 d-flex justify-center align-center">
                {{ $i18n.t("F322b3.S079") }}
              </label>
            </v-col>

            <v-col
              cols="6"
              class="h-100">
              <input
                id="merchantName_1"
                class="whiteFrame h-100 w-100 pl-2"
                type="text"
                v-model="params.merchantName_1"
                :placeholder="$i18n.t('F322b3.S121')"
                @input="inputLimit(params.merchantName_1,24)"
                tabindex="106"
              >
            </v-col>
          </v-row>
          <v-row
            no-gutters
            class="conditionRow w-100 d-flex align-center mt-1">
            <v-col
              cols="5"
              class="h-100">
              <label class="grayFrame h-100 w-100 d-flex justify-center align-center">
                {{ $i18n.t("F322b3.S080") }}
              </label>
            </v-col>

            <v-col
              cols="6"
              class="h-100">
              <input
                id="merchantName_2"
                class="whiteFrame h-100 w-100 pl-2"
                type="text"
                v-model="params.merchantName_2"
                :placeholder="$i18n.t('F322b3.S121')"
                @input="inputLimit(params.merchantName_2,24)"
                tabindex="107"
              >
            </v-col>
          </v-row>          
        </div>
        <v-card-actions class="dialog-fotter">
          <v-spacer/>
          <v-btn
            class="button dialog-fotter-button-gray footerButtonStyle"
            @click="closeDialog()"
            tabindex="112">
            {{ $t("O00004.S003") }}
          </v-btn>
          <v-btn
            class="button dialog-fotter-button-orange footerButtonStyle"
            @click="onClickOk()"
            tabindex="113">
            {{ $t("O00004.S008") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <popup ref="pop" />
  </div>
</template>
<!-- KSD V001.000 AE -->
