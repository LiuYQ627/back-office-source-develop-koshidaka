<style src="./../../static/css/BarcodeSetting/barcodeFlagEditDialog.css"></style>
<script type="text/javascript" src="./../../static/js/BarcodeSetting/barcodeFlagEditDialog.js"></script>
<!--
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230116 duyouwei(Neusoft)  G001.00.0  issue課題#1248を対応します.
 -->
<template>
  <div class="text-center baseFont">
    <v-dialog
      :value="displayed"
      persistent>
      <v-card class="basesize">
        <!-- ヘッダー -->
        <v-card-title class="headline dialog-line-blue title-label">
          <div id="changeLabel">
            <!-- G001.00.0 Update-Start -->
            <!-- <label id="changeModelabel"
              ><b>{{ "編集" }}</b></label
            > -->
            <label
              id="newModelabel"
              v-if="mode === 1"><b>{{ $t("F00108.S013") }}</b></label>
            <label
              id="changeModelabel"
              v-if="mode === 2"><b>{{ $t("F00108.S014") }}</b></label>
              <!-- G001.00.0 Update -End -->
          </div>
          <!-- G001.00.0 Update-Start -->
          <!-- <font class="dialog-title">{{ "マスタ編集" }}</font> -->
          <font
            class="dialog-title"
            v-if="mode === 1">{{ "マスタ新規" }}</font>
          <font
            class="dialog-title"
            v-if="mode === 2">{{ "マスタ編集" }}</font>
            <!-- G001.00.0 Update -End -->
        </v-card-title>

        <!-- 設定項目 -->
        <div
          id="baseTable"
          style="overflow-y: auto">
          <table class="flagTable">
            <tr>
              <th>{{ "順番" }}</th>
              <td>
                <input
                  type="text"
                  id="readOnlyText"
                  v-model="flag.row[0]"
                  disabled
                  tabindex="-1"
                >
              </td>
            </tr>
            <tr>
              <th>{{ "定義No." }}</th>
              <td>
                <input
                  type="text"
                  class="editTextBox"
                  v-model="flag.row[1]"
                  maxlength=4
                  @input="numInputRegulation"
                >
              </td>
            </tr>
            <tr>
              <th>{{ "開始位置" }}</th>
              <td>
                <input
                  type="text"
                  class="editTextBox"
                  v-model="flag.row[2]"
                  maxlength=2
                  @input="numInputRegulation"
                >
              </td>
            </tr>
            <tr>
              <th>{{ "桁数" }}</th>
              <td>
                <input
                  type="text"
                  class="editTextBox"
                  v-model="flag.row[3]"
                  maxlength=2
                  @input="numInputRegulation"
                >
              </td>
            </tr>
            <tr>
              <th>{{ "範囲指定" }}</th>
              <td class="pulldownCellStyle">
                <select
                  class="pulldownStyle"
                  v-model="flag.row[4]"
                >
                  <option
                    v-for="(range, index) in config.BARCODE_FLAG_RANGE"
                    :key="index"
                    :value="range.key"
                  >
                    {{ range.value }}
                  </option>
                </select>
                <div class="pulldownArrow"/>
              </td>
            </tr>
            <tr>
              <th>{{ "範囲１" }}</th>
              <td>
                <input
                  type="text"
                  class="editTextBox"
                  v-model="flag.row[5]"
                  maxlength=19
                  @input="numInputRegulation"
                >
              </td>
            </tr>
            <tr>
              <th>{{ "範囲２" }}</th>
              <td>
                <input
                  type="text"
                  class="editTextBox"
                  v-model="flag.row[6]"
                  maxlength=19
                  @input="numInputRegulation"
                >
              </td>
            </tr>
            <tr>
              <th>{{ "対象処理タイプ" }}</th>
              <td class="pulldownCellStyle">
                <select
                  class="pulldownStyle"
                  v-model="flag.row[7]"
                >
                  <option
                    v-for="(process, index) in config.BARCODE_FLAG_PROCESS_TYPE"
                    :key="index"
                    :value="process.key"
                  >
                    {{ process.value }}
                  </option>
                </select>
                <div class="pulldownArrow"/>
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
            :disabled="!this.permissions.includes('CLOUDPOS_BARCODE_UPDATE')"
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
