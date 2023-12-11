 <!--
 * ---------+---------------------+----------+--------------------------------
 *  DATE    |NAME(Inc)            |GUIDE     |GUIDANCE
 * ---------+---------------------+----------+--------------------------------
 * 20230207  wangchunmei(Neusoft)  G001.00.0  issue課題#836を対応します.
-->
<style src="@/resource/static/css/CommonDesign/utils.css" />
<style src="./../../static/css/MasterCommon/masterDialog.css"></style>
<style src="@/resource/static/css/ReceiptSetting/receiptProductDialog.css" />
<script type="text/javascript" src="@/resource/static/js/ReceiptSetting/ReceiptProductDialog.js"/>

<template>
  <div>
    <v-dialog
      v-model="receiptProductDisplayed"
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
          <font class="dialog-title">{{ $i18n.t("F322b3.S007") }}</font>
        </v-card-title>
        <div style="height: 354px;overflow-y: auto;margin: 20px 26px;">
          <!-- PLUコード印字区分 -->
          <v-row
            no-gutters
            class="conditionRow w-100">
            <v-col
              cols="5"
              class="h-100">
              <label class="grayFrame d-flex justify-center align-center h-100 w-100">
                {{ $i18n.t('F322b3.S027') }}
              </label>
            </v-col>

            <v-col
              cols="7"
              class="h-100 receiptProductContentStyle">
              <label>{{ $i18n.t('F322b3.S028') }}</label>
              <div
                tabindex="0"
                class="receiptProductSwitch"
                @keyup.space="onItemDetailsClick()"
              >
                <input
                  id="itemDetails"
                  class="toggleBtn toggleBtnRoundFlat"
                  type="checkbox"
                  :checked="params.itemDetails"
                  @click="onItemDetailsClick()"
                >
                <label
                  for="itemDetails"
                  style="text-align: center"
                ><span/></label>
              </div>
            </v-col>
          </v-row>
          <!-- 売変マーク設定 -->
          <v-row
            no-gutters
            class="conditionRow w-100 d-flex align-center mt-1">
            <v-col
              cols="5"
              class="h-100">
              <label class="grayFrame h-100 w-100 d-flex justify-center align-center">
                {{ $i18n.t('F322b3.S030') }}
              </label>
            </v-col>

            <v-col
              cols="7"
              class="h-100">
              <input
                id="sellingPriceChangeMark"
                class="whiteFrame h-100 w-100 pl-2"
                type="text"
                v-model="params.sellingPriceChangeMark"
                :placeholder="this.$i18n.t('F322b3.S031')"
                @input="numInputAlphaRegulation"
                maxlength="1"
              >
            </v-col>
          </v-row>
          <!-- 税区分毎計算印字区分 -->
          <v-row
            no-gutters
            class="conditionRow w-100 mt-1">
            <v-col
              cols="5"
              class="h-100">
              <label class="grayFrame d-flex justify-center align-center h-100 w-100">
                {{ $i18n.t('F322b3.S029') }}
              </label>
            </v-col>

            <v-col
              cols="7"
              class="h-100 receiptProductContentStyle">
              <label>{{ $i18n.t('F322b3.S028') }}</label>
              <div
                tabindex="0"
                class="receiptProductSwitch"
                @keyup.space="onTaxClassificationClick()"
              >
                <input
                  id="taxClassification"
                  class="toggleBtn toggleBtnRoundFlat"
                  type="checkbox"
                  :checked="params.taxClassification"
                  @click="onTaxClassificationClick()"
                >
                <label
                  for="taxClassification"
                  style="text-align: center">
                  <span/>
                </label>
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
            :disabled="!this.permissions.includes('CLOUDPOS_RECEIPT_UPDATE')"
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
