<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/CommonDesign/utils.css"></style>
<style scoped src="@/resource/static/css/MasterCommon/masterDialog.css"></style>
<style scoped src="@/resource/static/css/ReceiptSetting/receiptHorizontalPrintMessageDialog.css"></style>
<script type="text/javascript" src="@/resource/static/js/ReceiptSetting/ReceiptHorizontalPrintMessageDialog.js"></script>

<template>
  <div>
    <v-dialog
      v-model="ryosyuMessageDisplayed"
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
          <label class="dialog-title">{{ $i18n.t("F322b3.S118") }}</label>
        </v-card-title>
        <div class="v-dialog-body-wrapper">
          <v-row
            no-gutters
            class="conditionRow w-100 d-flex align-center">
            <v-col
              cols="5"
              class="h-100">
              <label class="grayFrame h-100 w-100 d-flex justify-center align-center">
                {{ $i18n.t("F322b3.S015") }}
              </label>
            </v-col>

            <v-col
              cols="6"
              class="h-100">
              <input
                id="ryosyu-message-1"
                class="whiteFrame h-100 w-100 pl-2"
                type="text"
                v-model="params.ryosyuMessage_1"
                :placeholder="$i18n.t('F322b3.S096')"
                @input="inputLimit(params.ryosyuMessage_1,64)"
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
                {{ $i18n.t("F322b3.S016") }}
              </label>
            </v-col>

            <v-col
              cols="6"
              class="h-100">
              <input
                id="ryosyuMessage_2"
                class="whiteFrame h-100 w-100 pl-2"
                type="text"
                v-model="params.ryosyuMessage_2"
                :placeholder="$i18n.t('F322b3.S096')"
                @input="inputLimit(params.ryosyuMessage_2,64)"
                tabindex="107"
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
                {{ $i18n.t("F322b3.S017") }}
              </label>
            </v-col>

            <v-col
              cols="6"
              class="h-100">
              <input
                id="ryosyuMessage_3"
                class="whiteFrame h-100 w-100 pl-2"
                type="text"
                v-model="params.ryosyuMessage_3"
                :placeholder="$i18n.t('F322b3.S096')"
                @input="inputLimit(params.ryosyuMessage_3,64)"
                tabindex="108"
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
                {{ $i18n.t("F322b3.S018") }}
              </label>
            </v-col>

            <v-col
              cols="6"
              class="h-100">
              <input
                id="ryosyuMessage_4"
                class="whiteFrame h-100 w-100 pl-2"
                type="text"
                v-model="params.ryosyuMessage_4"
                :placeholder="$i18n.t('F322b3.S096')"
                @input="inputLimit(params.ryosyuMessage_4,64)"
                tabindex="109"
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
                {{ $i18n.t("F322b3.S019") }}
              </label>
            </v-col>

            <v-col
              cols="6"
              class="h-100">
              <input
                id="ryosyuMessage_5"
                class="whiteFrame h-100 w-100 pl-2"
                type="text"
                v-model="params.ryosyuMessage_5"
                :placeholder="$i18n.t('F322b3.S096')"
                @input="inputLimit(params.ryosyuMessage_5,64)"
                tabindex="110"
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
