<style src="./../../static/css/OperationBtnSetting/subMediaSettingDialog.css"></style>
<script type="text/javascript" src="./../../static/js/OperationBtnSetting/subMediaSettingDialog.js"></script>

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
          <font class="dialog-title">{{ "会計画面表示" }}</font>
        </v-card-title>

        <!-- 設定項目 -->

        <div
          id="baseTable"
          style="overflow-y: auto">
          <table class="conversionTable">
            <tr>
              <th>{{ "名称" }}</th>
              <td>
                <input
                  type="text"
                  id="displayName"
                  v-model="itemDetail.displayName.default"
                >
              </td>
            </tr>
            <tr>
              <th>{{ "種別" }}</th>
              <td class="pulldownCellStyle">
                <select
                  class="pulldownStyle"
                  v-model="itemDetail.kind"
                  style="color:#000000"
                >
                  <option
                    v-for="(kind, index) in config.itemDetailsKind"
                    :key="index"
                    :value="kind.key"
                  >
                    {{ kind.label }}
                  </option>
                </select>
                <div class="pulldownArrow"/>
              </td>
            </tr>
            <tr>
              <th>{{ "プリセット値" }}</th>
              <td>
                <input
                  type="text"
                  class="editTextBox"
                  v-model="itemDetail.preset"
                >
              </td>
            </tr>
            <tr>
              <th>{{ "取引別No." }}</th>
              <td>
                <input
                  type="text"
                  class="editTextBox"
                  v-model="itemDetail.transactionNo"
                >
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
            :disabled="!this.permissions.includes('CLOUDPOS_OPERATION_BTN_UPDATE')"
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
