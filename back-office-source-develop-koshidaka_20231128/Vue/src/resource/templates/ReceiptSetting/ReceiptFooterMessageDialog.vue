<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/CommonDesign/utils.css"></style>
<style scoped src="@/resource/static/css/MasterCommon/masterDialog.css"></style>
<style scoped src="@/resource/static/css/ReceiptSetting/receiptFooterMessageDialog.css"></style>
<script type="text/javascript" src="@/resource/static/js/ReceiptSetting/ReceiptFooterMessageDialog.js"></script>

<template>
  <div>
    <v-dialog
      v-model="footerCommercialMessageDisplayed"
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
          <label class="dialog-title">{{ $i18n.t("F322b3.S127") }}</label>
        </v-card-title>
        <div class="v-dialog-body-wrapper">
          <v-row
            no-gutters
            class="conditionRow w-100 d-flex align-center">
            <v-col
              cols="5"
              class="h-100">
              <label class="grayFrame h-100 w-100 d-flex justify-center align-center">
                {{ $t('F322b3.S086') }}
              </label>
            </v-col>
            <v-col
              cols="6"
              class="h-100">
              <input
                id="footerMessage_1"
                class="whiteFrame h-100 w-100 pl-2"
                type="text"
                v-model="params.footerMessage_1"
                :placeholder="$i18n.t('F322b3.S112')"
                @input="inputLimit(params.footerMessage_1,32)"
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
                {{ $t('F322b3.S087') }}
              </label>
            </v-col>
            <v-col
              cols="6"
              class="h-100">
              <input
                id="footerMessage_2"
                class="whiteFrame h-100 w-100 pl-2"
                type="text"
                v-model="params.footerMessage_2"
                :placeholder="$i18n.t('F322b3.S112')"
                @input="inputLimit(params.footerMessage_2,32)"
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
                {{ $t('F322b3.S088') }}
              </label>
            </v-col>
            <v-col
              cols="6"
              class="h-100">
              <input
                id="footerMessage_3"
                class="whiteFrame h-100 w-100 pl-2"
                type="text"
                v-model="params.footerMessage_3"
                :placeholder="$i18n.t('F322b3.S112')"
                @input="inputLimit(params.footerMessage_3,32)"
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
                {{ $t('F322b3.S089') }}
              </label>
            </v-col>
            <v-col
              cols="6"
              class="h-100">
              <input
                id="footerMessage_4"
                class="whiteFrame h-100 w-100 pl-2"
                type="text"
                v-model="params.footerMessage_4"
                :placeholder="$i18n.t('F322b3.S112')"
                @input="inputLimit(params.footerMessage_4,32)"
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
                {{ $t('F322b3.S090') }}
              </label>
            </v-col>
            <v-col
              cols="6"
              class="h-100">
              <input
                id="footerMessage_5"
                class="whiteFrame h-100 w-100 pl-2"
                type="text"
                v-model="params.footerMessage_5"
                :placeholder="$i18n.t('F322b3.S112')"
                @input="inputLimit(params.footerMessage_5,32)"
                tabindex="110"
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
                {{ $t('F322b3.S091') }}
              </label>
            </v-col>
            <v-col
              cols="6"
              class="h-100">
              <input
                id="footerMessage_6"
                class="whiteFrame h-100 w-100 pl-2"
                type="text"
                v-model="params.footerMessage_6"
                :placeholder="$i18n.t('F322b3.S112')"
                @input="inputLimit(params.footerMessage_6,32)"
                tabindex="110"
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
                {{ $t('F322b3.S092') }}
              </label>
            </v-col>
            <v-col
              cols="6"
              class="h-100">
              <input
                id="footerMessage_7"
                class="whiteFrame h-100 w-100 pl-2"
                type="text"
                v-model="params.footerMessage_7"
                :placeholder="$i18n.t('F322b3.S112')"
                @input="inputLimit(params.footerMessage_7,32)"
                tabindex="110"
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
                {{ $t('F322b3.S093') }}
              </label>
            </v-col>
            <v-col
              cols="6"
              class="h-100">
              <input
                id="footerMessage_8"
                class="whiteFrame h-100 w-100 pl-2"
                type="text"
                v-model="params.footerMessage_8"
                :placeholder="$i18n.t('F322b3.S112')"
                @input="inputLimit(params.footerMessage_8,32)"
                tabindex="110"
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
                {{ $t('F322b3.S094') }}
              </label>
            </v-col>
            <v-col
              cols="6"
              class="h-100">
              <input
                id="footerMessage_9"
                class="whiteFrame h-100 w-100 pl-2"
                type="text"
                v-model="params.footerMessage_9"
                :placeholder="$i18n.t('F322b3.S112')"
                @input="inputLimit(params.footerMessage_9,32)"
                tabindex="110"
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
                {{ $t('F322b3.S095') }}
              </label>
            </v-col>
            <v-col
              cols="6"
              class="h-100">
              <input
                id="footerMessage_10"
                class="whiteFrame h-100 w-100 pl-2"
                type="text"
                v-model="params.footerMessage_10"
                :placeholder="$i18n.t('F322b3.S112')"
                @input="inputLimit(params.footerMessage_10,32)"
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
