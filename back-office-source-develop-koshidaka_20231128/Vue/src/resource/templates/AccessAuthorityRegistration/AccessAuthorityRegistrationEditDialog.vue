<style src="./../../static/css/AccessAuthorityRegistration/accessAuthorityRegistrationDialog.css"></style>
<script type="text/javascript" src="./../../static/js/AccessAuthorityRegistration/accessAuthorityRegistrationEditDialog.js"></script>
<template>
  <div class="text-center baseFont">
    <!-- マスタ新規・編集ダイアログ -->
    <v-dialog
      v-model="dialog"
      persistent>
      <v-card class="basesize">
        <v-card-title
          class="headline dialog-line-blue title-label"
          style="padding-right: 0px;">
          <div id="changeLabel">
            <label id="changeModelabel"><b>{{ $t("F00108.S014") }}</b></label>
          </div>
          <font class="dialog-title">権限名称編集</font>
        </v-card-title>
        <div
          id="baseTable"
          style="overflow-y:auto;" >
          <table id="deviceTable">
            <!-- 名称 -->
            <tr>
              <th>編集権限</th>
              <td colspan="2">
                <input
                  type="text"
                  :id="'readOnlyText'"
                  ref="userIdText"
                  v-model="authorityOldName"
                  :disabled=true
                  style="ime-mode:disabled;"
                  maxlength="20"
                  tabindex="-1">
              </td>
            </tr>
            <!-- 権限名称(エラーメッセージ) -->
            <tr
              v-if="this.nameErrorMsg !== ''"
              class="errorCell">
              <th />
              <td colspan="2">
                <div>
                  <label>{{ nameErrorMsg }}</label>
                </div>
              </td>
            </tr>
            <tr>
              <th>名称</th>
              <td colspan="2">
                <input
                  type="text"
                  :class="this.nameErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'"
                  class="textName"
                  ref="nameText"
                  v-model="authorityName"
                  :placeholder="this.$i18n.t('F00001.S033')"
                  maxlength="20"
                  @input="inputLimit(authorityName,20)"
                  tabindex="101">
              </td>
            </tr>
            <!-- 権限名称(エラーメッセージ) -->
            <tr
              v-if="this.nameErrorMsg !== ''"
              class="errorCell">
              <th />
              <td colspan="2">
                <div>
                  <label>{{ nameErrorMsg }}</label>
                </div>
              </td>
            </tr>
          </table>

        </div>
        <v-card-actions class="dialog-fotter">
          <v-spacer/>
          <v-btn
            class="button dialog-fotter-button-gray footerButtonStyle"
            @click="onClickReturn()"
            tabindex="112">
            {{ $t("O00004.S003") }}
          </v-btn>
          <v-btn
            :disabled="!this.permissions.includes('CLOUDPOS_ACCESS_UPDATE')"
            class="button dialog-fotter-button-orange footerButtonStyle"
            @click="onClickSave()"
            tabindex="113">
            {{ $t("O00004.S008") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <popup ref="pop"/>
  </div>
</template>
