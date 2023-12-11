/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230811  zyx(Neusoft)     G001.00.0  issue課題#1171を対応します.
 */
<style src="./../../static/css/AccessAuthorityRegistration/accessAuthorityRegistrationDialog.css"></style>
<script type="text/javascript" src="./../../static/js/AccessAuthorityRegistration/accessAuthorityRegistrationCsvDialog.js"></script>
<template>
  <!-- マスタ新規・編集ダイアログ -->
  <v-dialog
    width="560px"
    height="540px"
    v-model="dialog"
    persistent>
    <v-card class="AccessAuthorityRegistrationCsvDialog">
      <v-card-title class="headline dialog-line-blue">
        <font class="dialog-title">CSVインポート</font>
      </v-card-title>
      <v-card-text style="height: 354px; font-size: 20px; overflow-y:auto;">
        <v-row
          no-gutters
          class="mt-4">
          <v-col
            cols="4"
            class="py-2"
            style="border:1px solid gray; color: white; background-color:#9ea0aa;">ファイル選択</v-col>
          <v-col
            cols="8"
            class="py-2 px-2 text-start"
            style="border:1px solid lightgray;">
            {{ dispFileName }}
            <input
              type="file"
              @change="loadCsvFile"
              ref="fileSelect"
              style="display:none;">
          </v-col>
        </v-row>
        <v-row
          no-gutters
          class="mt-1"
          @click="btnclick">
          <v-col
            cols="3"
            offset="9"
            style="text-align: right">
            <v-btn
              class="centerButtonDiv"
              tabindex="110">
              <span style="margin-right: 15px;">{{ $t("O00004.S023") }}</span>
              <span class="selectArrow" />
            </v-btn>
          </v-col>
        </v-row>
        <table id="deviceTable">
          <!-- エラーメッセージ -->
          <tr
            v-if="this.terminalTypeErrorMsg !== ''"
            class="errorCell">
            <td colspan="2">
              <div
                v-for="terminalTypeMsg in terminalTypeErrorMsg"
                :key="terminalTypeMsg">
                <label>{{ terminalTypeMsg }}</label>
              </div>
            </td>
          </tr>
          <tr
            v-for="(worker, index) in this.workers"
            :key="index"
            class="errorCell">
            <td
              colspan="2">
              <div
                style="width: 800px; color: red; margin:left;text-align: left">
                {{ worker }}
              </div>
            </td>
          </tr>
        </table>
      </v-card-text>
      <v-card-actions class="dialog-fotter">
        <v-spacer/>
        <v-btn
          class="button dialog-fotter-button-gray footerButtonStyle"
          @click="onClickReturn()"
          tabindex="112">
          {{ $t("O00004.S003") }}
        </v-btn>
        <v-btn
          class="button dialog-fotter-button-orange footerButtonStyle"
          @click="onClickSave()"
          :disabled="registerAuth"
          tabindex="113">
          {{ $t("O00004.S008") }}
        </v-btn>
      </v-card-actions>
    </v-card>
    <popup ref="pop"/>
    <!-- KSD V001.000 AS -->
    <csv-error-dialog
      ref="csvErrorDialog"
    />
    <!-- KSD V001.000 AE -->
  </v-dialog>
</template>
