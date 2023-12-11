<style src="./../../static/css/DeviceSetting/deviceDialog.css"></style>
<script type="text/javascript" src="./../../static/js/DeviceSetting/deviceEditDialog.js"></script>

 <!--
 * ---------+---------------------+----------+--------------------------------
 *  DATE    |NAME(Inc)            |GUIDE     |GUIDANCE
 * ---------+---------------------+----------+--------------------------------
 * 20230714  shiyue(Neusoft)       G001.00.0  issue課題#1864を対応します.
-->

<template>
  <div class="text-center baseFont">
    <!-- マスタ新規・編集ダイアログ -->
    <v-dialog
      v-model="dialog"
      persistent>
      <v-card class="basesize">
        <v-card-title class="headline dialog-line-blue title-label">
          <div id="changeLabel">
            <label
              id="newModelabel"
              v-if="mode === 1"><b>{{ $t("F00013.S013") }}</b></label>
            <label
              id="changeModelabel"
              v-if="mode === 2"><b>{{ $t("F00013.S014") }}</b></label>
          </div>
          <font class="dialog-title">{{ title }}</font>
        </v-card-title>
        <div
          id="baseTable"
          style="overflow-y:auto;" >
          <table id="deviceTable">
            <!-- コード -->
            <tr>
              <th>{{ $t("F00013.S015") }}</th>
              <td colspan="2">
                <input
                  type="text"
                  :id="'readOnlyText'"
                  ref="clientIdText"
                  v-model="terminalData.clientId"
                  :disabled=true
                  style="ime-mode:disabled;"
                  maxlength="10"
                  tabindex="-1">
              </td>
            </tr>
            <!-- 名称 -->
            <tr>
              <th>{{ $t("F00013.S016") }}</th>
              <td colspan="2">
                <input
                  type="text"
                  :class="this.nameErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'"
                  class="textTerminalName"
                  ref="nameText"
                  v-model="terminalData.deviceName"
                  :placeholder="this.$i18n.t('F00013.S022')"
                  maxlength="20"
                  tabindex="101"
                  :@input="inputLimit(terminalData.deviceName,20)">
              </td>
            </tr>
            <!-- 名称(エラーメッセージ) -->
            <tr
              v-if="this.nameErrorMsg !== ''"
              class="errorCell">
              <th />
              <td colspan="2">
                <div
                  v-for="nameMsg in nameErrorMsg"
                  :key="nameMsg">
                  <label>{{ nameMsg }}</label>
                </div>
              </td>
            </tr>
            <!-- 端末種別 -->
            <tr>
              <th>{{ $t("F00013.S017") }}</th>
              <td>
                <!-- G001.00.0 Update-Start -->
                <!-- <select
                  v-model="terminalData.terminalType"
                  class="SelectBox textTerminalName"
                  ref="terminalTypeText"
                  tabindex="104">
                  <option
                    v-for="terminalTypeItem in terminalTypeList"
                    :key="terminalTypeItem.code"
                    :value="terminalTypeItem.code">{{ terminalTypeItem.name }}</option>
                </select> -->
                <select
                  v-model="terminalData.terminalType"
                  :class="this.terminalTypeErrorMsg !== '' ? 'errorSelectBox' : 'SelectBox'"
                  class="SelectBox textTerminalName"
                  ref="terminalTypeText"
                  tabindex="104">
                  <option
                    v-for="terminalTypeItem in terminalTypeList"
                    :key="terminalTypeItem.code"
                    :value="terminalTypeItem.code">{{ terminalTypeItem.name }}</option>
                </select>
                <!-- G001.00.0 Update-End -->
                <div class="pulldownArrow"/>
              </td>
            </tr>
            <!-- 端末種別(エラーメッセージ) -->
            <tr
              v-if="this.terminalTypeErrorMsg !== ''"
              class="errorCell">
              <th />
              <td colspan="2">
                <div
                  v-for="terminalTypeMsg in terminalTypeErrorMsg"
                  :key="terminalTypeMsg">
                  <label>{{ terminalTypeMsg }}</label>
                </div>
              </td>
            </tr>
          </table>
        </div>
        <v-card-actions class="dialog-fotter">
          <v-spacer/>
          <div class="deleteButton">
            <v-btn
              class="button dialog-fotter-button-blue footerButtonStyle"
              @click="onClickDelete()"
              v-if="mode === 2"
              tabindex="111"
              :disabled="(!$root.approvalFlg && !$root.deleteAuth) || !this.permissions.includes('CLOUDPOS_DEVICE_DELETE')">
              {{ $t("O00004.S024") }}
            </v-btn>
          </div>
          <v-btn
            class="button dialog-fotter-button-gray footerButtonStyle"
            @click="onClickReturn()"
            tabindex="112">
            {{ $t("O00004.S003") }}
          </v-btn>
          <v-btn
            class="button dialog-fotter-button-orange footerButtonStyle"
            @click="onClickSave()"
            :disabled="(!$root.approvalFlg && !$root.registerAuth) || !this.permissions.includes('CLOUDPOS_DEVICE_UPDATE')"
            tabindex="113">
            {{ $t("O00004.S008") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <popup ref="pop"/>
  </div>
</template>
