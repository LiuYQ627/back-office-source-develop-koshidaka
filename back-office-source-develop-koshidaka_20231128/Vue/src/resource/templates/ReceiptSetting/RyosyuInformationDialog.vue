 <!--
 * ---------+---------------------+----------+--------------------------------
 *  DATE    |NAME(Inc)            |GUIDE     |GUIDANCE
 * ---------+---------------------+----------+--------------------------------
 * 20230206  wangchunmei(Neusoft)  G001.00.0  issue課題#836を対応します.
 * 20230217  wangchunmei(Neusoft)  G002.00.0  issue課題#1567を対応します.
 * 20230221  Gotou(TEC)            G003.00.0  issue課題#1567を対応します.
-->
<style src="@/resource/static/css/CommonDesign/utils.css" />
<style src="./../../static/css/MasterCommon/masterDialog.css"></style>
<script type="text/javascript" src="@/resource/static/js/ReceiptSetting/RyosyuInformationDialog.js"/>

<template>
  <div>
    <v-dialog
      v-model="ryosyuInfoDisplayed"
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
          <!-- G002.00.0 Update-Start -->
          <!--<font class="dialog-title">{{ $i18n.t("F322b3.S014") }}</font>-->
          <!-- G003.00.0 Update-Start -->
          <!--<font class="dialog-title">{{ $i18n.t("F322b3.S011") }}</font>-->
          <font class="dialog-title">{{ $i18n.t("F322b3.S013") }}</font>
          <!-- G003.00.0 Update-End -->
          <!-- G002.00.0 Update-End -->
        </v-card-title>
        <div style="height: 354px;overflow-y: auto;margin: 20px 26px;">
          <!-- 領収証その他付加情報エリア -->
          <v-row
            no-gutters
            class="conditionRow w-100">
            <v-col
              cols="4"
              class="h-100">
              <label class="grayFrame d-flex justify-center align-center h-100 w-100">
                {{ $i18n.t('F322b3.S013') }}
              </label>
            </v-col>
            <v-col
              cols="8"
              class="h-100">
              <radio-button
                v-model="params.ryosyuInformation"
                :labels="ryosyuInformationLabels" />
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
