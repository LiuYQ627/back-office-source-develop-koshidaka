<style src="./../../static/css/RevenueStampSetting/revenueStampEditDialog.css"></style>
<script type="text/javascript" src="./../../static/js/RevenueStampSetting/revenueStampEditDialog.js"></script>

<template>
  <div class="text-center baseFont">
    <v-dialog
      :value="displayed"
      persistent>
      <v-card class="basesize">
        <!-- ヘッダー -->
        <v-card-title class="headline dialog-line-blue title-label">
          <div id="changeLabel">
            <label
              id="changeModelabel"
            ><b>{{ "編集" }}</b></label
            >
          </div>
          <font class="dialog-title">{{ "マスタ編集" }}</font>
        </v-card-title>

        <!-- 設定項目 -->
        <div
          id="baseTable"
          style="overflow-y: auto">
          <table class="settingTable">
            <tr>
              <th>{{ "No." }}</th>
              <td>
                <input
                  type="text"
                  id="readOnlyText"
                  v-model="stampDuty.order"
                  disabled
                  tabindex="-1"
                >
              </td>
            </tr>
            <tr>
              <th>{{ "印紙税判定金額" }}</th>
              <td>
                <input
                  type="text"
                  :class="this.judgeErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'"
                  v-model="stampDuty.stampDutyJudgement"
                  @input="numInputRegulation"
                  maxlength="8"
                >
              </td>
            </tr>
            <tr
              v-if="this.judgeErrorMsg !== ''"
              class="errorCell">
              <th />
              <td>
                <label>{{ judgeErrorMsg }}</label>
              </td>
            </tr>
            <tr>
              <th>{{ "印紙税額" }}</th>
              <td>
                <input
                  type="text"
                  :class="this.amountErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'"
                  v-model="stampDuty.stampDutyAmount"
                  @input="numInputRegulation"
                  maxlength="7"
                >
              </td>
            </tr>
            <tr
              v-if="this.amountErrorMsg !== ''"
              class="errorCell">
              <th />
              <td>
                <label>{{ amountErrorMsg }}</label>
              </td>
            </tr>
          </table>
        </div>

        <!-- フッター -->
        <v-card-actions class="dialog-fotter">
          <v-spacer/>
          <v-btn
            class="button dialog-fotter-button-gray footerButtonStyle"
            @click="onClickReturn()"
          >
            {{ $t("O00004.S003") }}
          </v-btn>
          <v-btn
            :disabled="!this.permissions.includes('CLOUDPOS_REVENUE_STAMP_UPDATE')"
            class="button dialog-fotter-button-orange footerButtonStyle"
            @click="onClickSave()"
          >
            {{ $t("O00004.S008") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <popup ref="pop" />
  </div>
</template>
