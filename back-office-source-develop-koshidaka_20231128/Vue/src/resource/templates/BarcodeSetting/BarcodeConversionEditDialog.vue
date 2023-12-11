<style src="./../../static/css/BarcodeSetting/barcodeConversionEditDialog.css"></style>
<script type="text/javascript" src="./../../static/js/BarcodeSetting/barcodeConversionEditDialog.js"></script>
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
          <table class="conversionTable">
            <tr>
              <th>{{ "No" }}</th>
              <td>
                <input
                  type="text"
                  id="readOnlyText"
                  v-model="conversion.row[0]"
                  disabled
                  tabindex="-1"
                >
              </td>
            </tr>
            <tr>
              <th>{{ "バーコードタイプ" }}</th>
              <td class="pulldownCellStyle">
                <select
                  class="pulldownStyle"
                  v-model="conversion.row[1]"
                >
                  <option
                    v-for="(type, index) in config.BARCODE_TYPE"
                    :key="index"
                    :value="index"
                  >
                    {{ type }}
                  </option>
                </select>
                <div class="pulldownArrow"/>
              </td>
            </tr>
            <tr>
              <th>{{ "桁数" }}</th>
              <td>
                <input
                  type="text"
                  class="editTextBox"
                  v-model="conversion.row[2]"
                  maxlength=2
                  @input="numInputRegulation"
                >
              </td>
            </tr>
            <tr>
              <th>{{ "入力桁フラグ" }}</th>
              <td class="pulldownCellStyle">
                <select
                  class="pulldownStyle"
                  v-model="conversion.row[3]"
                >
                  <option
                    v-for="(item, index) in config.BARCODE_DIGIT_FLAG"
                    :key="index"
                    :value="index"
                  >
                    {{ item }}
                  </option>
                </select>
                <div class="pulldownArrow"/>
              </td>
            </tr>
            <tr>
              <th>{{ "入力桁1" }}</th>
              <td>
                <input
                  type="text"
                  class="editTextBox"
                  v-model="conversion.row[4]"
                  maxlength=2
                  @input="numInputRegulation"
                >
              </td>
            </tr>
            <tr>
              <th>{{ "入力桁2" }}</th>
              <td>
                <input
                  type="text"
                  class="editTextBox"
                  v-model="conversion.row[5]"
                  maxlength=2
                  @input="numInputRegulation"
                >
              </td>
            </tr>
            <tr>
              <th>{{ "フラグ定義番号" }}</th>
              <td>
                <input
                  type="text"
                  class="editTextBox"
                  v-model="conversion.row[6]"
                  maxlength=4
                  @input="numInputRegulation"
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
