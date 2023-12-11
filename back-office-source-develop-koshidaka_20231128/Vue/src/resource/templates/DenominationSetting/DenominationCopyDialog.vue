<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/MasterCommon/masterDialog.css" />
<style scoped src="@/resource/static/css/CommonDesign/utils.css" />
<style scoped src="@/resource/static/css/DenominationSetting/denominationCopyDialog.css"></style>
<script type="text/javascript" src="@/resource/static/js/DenominationSetting/denominationCopyDialog.js"></script>
<template>
  <div class="text-center baseFont">
    <!-- 編集ダイアログ -->
    <v-dialog
      v-model="dialog"
      persistent>
      <v-card class="basesize">
        <v-card-title class="headline dialog-line-blue title-label">
          <div id="changeLabel">
            <label id="changeModelabel"/>
          </div>
          <p class="dialog-title">{{ $t("F322b6.S042") }}</p>
        </v-card-title>
        <div
          id="baseTable"
          class="base-table-overflow">
          <table id="denomination-table-copy">
            <!-- コピー元レジ番号 -->
            <tr>
              <th>{{ $t('F322b6.S043') }}</th>
              <td colspan="2">
                <select
                  v-model="terminalItemFrom"
                  :class="this.fromErrorMsg !== '' ? 'errorSelectBox' : 'SelectBox'"
                  ref="terminalItemFromText"
                  tabindex="101">
                  <option
                    v-for="terminalItem in terminalList"
                    :key="terminalItem.code"
                    :value="terminalItem.code">{{ terminalItem.code }}</option>
                </select>
                <div class="pulldownArrow"/>
              </td>
            </tr>
            <!-- コピー元レジ番号(エラーメッセージ) -->
            <tr
              v-if="this.fromErrorMsg !== ''"
              class="errorCell">
              <th />
              <td colspan="2">
                <div>
                  <label>{{ fromErrorMsg }}</label>
                </div>
              </td>
            </tr>
            <!-- コピー先レジ番号 -->
            <tr>
              <th>{{ $t('F322b6.S044') }}</th>
              <td colspan="2">
                <select
                  v-model="terminalItemTo"
                  :class="this.toErrorMsg !== '' ? 'errorSelectBox' : 'SelectBox'"
                  ref="terminalItemToText"
                  tabindex="102">
                  <option
                    v-for="terminalItem in terminalList"
                    :key="terminalItem.code"
                    :value="terminalItem.code">{{ terminalItem.code }}</option>
                </select>
                <div class="pulldownArrow"/>
              </td>
            </tr>
            <!-- コピー先レジ番号(エラーメッセージ) -->
            <tr
              v-if="toErrorMsg !== ''"
              class="errorCell">
              <th />
              <td colspan="2">
                <div>
                  <label>{{ toErrorMsg }}</label>
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
            class="button dialog-fotter-button-orange footerButtonStyle"
            @click="onClickSave()"
            :disabled="(!$root.approvalFlg && !$root.registerAuth)"
            tabindex="113">
            {{ $t("O00004.S008") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <popup ref="pop"/>
  </div>
</template>
<!-- KSD V001.000 AE -->
