 <!--
 * ---------+---------------------+----------+--------------------------------
 *  DATE    |NAME(Inc)            |GUIDE     |GUIDANCE
 * ---------+---------------------+----------+--------------------------------
 * 20230207  wangchunmei(Neusoft)  G001.00.0  issue課題#836を対応します.
 * 20230217  wangchunmei(Neusoft)  G002.00.0  issue課題#1567を対応します.
-->
<style src="@/resource/static/css/CommonDesign/utils.css" />
<style src="./../../static/css/MasterCommon/masterDialog.css"></style>
<style src="./../../static/css/ReceiptSetting/receiptHeaderLogoDialog.css" />
<script type="text/javascript" src="@/resource/static/js/ReceiptSetting/ReceiptHeaderLogoDialog.js"/>

<template>
  <div>
    <v-dialog
      v-model="receiptHeaderLogoDisplayed"
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
          <!-- G002.00.0 Update-Start -->
          <!--<font class="dialog-title">{{ $i18n.t("F322b3.S033") }}</font>-->
          <font class="dialog-title">{{ $i18n.t("F322b3.S005") }}</font>
          <!-- G002.00.0 Update-End -->
        </v-card-title>
        <div style="height: 354px;overflow-y: auto;margin: 20px 26px;">
          <!-- ファイル -->
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
                id="headerLogoFileName"
                class="whiteFrame h-100 w-100 pl-2"
                type="text"
                v-model="params.headerLogoFileName"
                disabled
              >
            </v-col>
          </v-row>
          <v-row
            no-gutters
            class="w-100 d-flex align-center mt-1"
            style="justify-content: right;">
            <v-btn
              class="searchButtonStyle"
              @click="onClickImageSelected()"
              tabindex="0"
              id="imageSelectedBtn">
              {{ $t("F322b3.S034") }}
            </v-btn>
          </v-row>
          <img
            :src="params.headerLogoBase64EncodedString"
            class="imageBorderCellStyle" >
          <input
            id="headerLogoFileSelect"
            style="display: none"
            ref="headerLogoFileSelect"
            type="file"
            @change="selectedFile">
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
