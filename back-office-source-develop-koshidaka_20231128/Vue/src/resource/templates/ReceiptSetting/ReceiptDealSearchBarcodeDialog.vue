<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/CommonDesign/utils.css"></style>
<style scoped src="@/resource/static/css/MasterCommon/masterDialog.css"></style>
<style scoped src="@/resource/static/css/ReceiptSetting/receiptDealSearchBarcodeDialog.css"></style>
<script type="text/javascript" src="@/resource/static/js/ReceiptSetting/ReceiptDealSearchBarcodeDialog.js"></script>

<template>
  <div>
    <v-dialog
      v-model="receiptSearchBarcodePrintDisplayed"
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
          <label class="dialog-title">{{ $i18n.t("F322b3.S008") }}</label>
        </v-card-title>
        <div class="v-dialog-body-wrapper">
          <v-row
            no-gutters
            class="conditionRow w-100">
            <v-col
              cols="5"
              class="h-100">
              <label class="grayFrame d-flex justify-center align-center h-100 w-100">
                {{ $i18n.t('F322b3.S078') }}
              </label>
            </v-col>

            <v-col
              cols="7"
              class="h-100 receipt-search-barcode-print-content-style">
              <label>{{ $i18n.t('F322b3.S028') }}</label>
              <div
                tabindex="111"
                id="receipt-search-barcode-print-switch"
                class="receipt-search-barcode-print-switch"
                @keyup.space="onDealSearchBarcodeClick()"
              >
                <input
                  id="search-barcode-print"
                  class="toggleBtn toggleBtnRoundFlat"
                  type="checkbox"
                  :checked="params.searchBarcodePrint"
                  @click="onDealSearchBarcodeClick()"
                >
                <label
                  for="search-barcode-print"
                  class="search-barcode-print"
                  style="text-align: center"
                ><span/></label>
              </div>
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
