<style src="./../../static/css/OperationBtnSetting/itemDetailSettingDialog.css"></style>
<script type="text/javascript" src="./../../static/js/OperationBtnSetting/itemDetailSettingDialog.js"></script>
<!--
   * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230104 duyouwei(Neusoft)  G001.00.0  issue課題#1204を対応します.
 * 20230113 bai.ry(Neusoft)  G002.00.0  issue課題#1439を対応します.
 * 20230129 duyouwei(Neusoft)  G003.00.0  issue課題#1438を対応します.
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
            <label
              id="changeModelabel"
            ><b>{{ "編集" }}</b></label
            >
          </div>
          <!-- G001.00.0 Update-Start -->
          <!-- <font class="dialog-title">{{ "商品明細ポップアップ表示" }}</font> -->
          <font class="dialog-title">{{ title }}</font>
          <!-- G001.00.0 Update -End -->
        </v-card-title>

        <!-- 設定項目 -->

        <div
          id="baseTable"
          style="overflow-y: auto">
          <table class="conversionTable">
            <tr>
              <th>{{ "名称" }}</th>
              <td>
                <!-- G001.00.0 Update-Start -->
                <!-- <input
                  type="text"
                  id="displayName"
                  v-model="itemDetail.displayName.default"
                /> -->
                <input
                  type="text"
                  id="displayName"
                  v-model="itemDetail.displayName.default"
                  :placeholder="this.$i18n.t('O00004.S072')"
                  :class="this.nameErrorMsg !== '' ? 'errorTextBox' : 'textName'"
                  class="textName"
                  :@input="inputLimit(itemDetail.displayName.default,24, 'name')"
                >
                <!-- G001.00.0 Update -End -->
              </td>
            </tr>
            <!-- G001.00.0 Add-Start -->
            <!-- 名称(エラーメッセージ) -->
            <tr
              v-if="this.nameErrorMsg !== ''"
              class="errorCell">
              <th />
              <td>
                <label>{{ nameErrorMsg }}</label>
              </td>
            </tr>
            <!--  G001.00.0 Add-End -->
            <tr>
              <th>{{ "種別" }}</th>
              <td class="pulldownCellStyle">
                <!-- G001.00.0 Update-Start -->
                <!-- <select
                  class="pulldownStyle"
                  v-model="itemDetail.kind"
                  style="color:#000000"
                > -->
                <select
                  class="pulldownStyle"
                  v-model="itemDetail.kind"
                  style="color:#000000"
                  v-if="this.title === '商品明細ポップアップ表示'"
                >
                  <!-- G001.00.0 Update -End -->
                  <option
                    v-for="(kind, index) in config.itemDetailsKind"
                    :key="index"
                    :value="kind.key"
                  >
                    {{ kind.label }}
                  </option>
                </select>
                <!-- G003.00.0 Add-Start -->
                <select
                  class="pulldownStyle"
                  v-model="itemDetail.kind"
                  style="color:#000000"
                  v-if="this.title !== '商品明細ポップアップ表示'"
                >
                  <option
                    v-for="(kind, index) in config.itemDetailsKindKaike"
                    :key="index"
                    :value="kind.key"
                  >
                    {{ kind.label }}
                  </option>
                </select>
                <!-- G003.00.0 Add-End -->
                <div class="pulldownArrow"/>
              </td>
            </tr>
            <!-- KSD V001.000 AS -->
            <tr v-if="itemDetail.kind === 3 || itemDetail.kind === 4">
              <th>{{ "プリセット値" }}</th>
              <td class="pulldownCellStyle">
                <select
                  class="pulldownStyle"
                  v-model="itemDetail.taxCode"
                  style="color:#000000"
                >
                  <option
                    v-for="(taxRate, index) in taxRates"
                    :key="index"
                    :value="taxRate.name"
                  >
                    {{ taxRate.displayName.default }}
                  </option>
                </select>
                <div class="pulldownArrow"/>
              </td>
            </tr>
            <tr v-else>
              <!-- KSD V001.000 AE -->
              <th>{{ "プリセット値" }}</th>
              <td>
                <!-- G001.00.0,G002.00.0 Update-Start -->
                <!-- <input
                  type="text"
                  class="editTextBox"
                  v-model="itemDetail.preset"
                /> -->
                <input
                  type="text"
                  class="editTextBox editTextBoxNoArrow"
                  v-model="itemDetail.preset"
                  :class="this.presetErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'"
                  :placeholder="presetPlaceholder"
                >
                <!-- G001.00.0,G002.00.0 Update -End -->
              </td>
            </tr>
            <tr
              v-if="this.presetErrorMsg !== ''"
              class="errorCell">
              <th />
              <td>
                <label>{{ presetErrorMsg }}</label>
              </td>
            </tr>
            <tr>
              <th>{{ "取引別No." }}</th>
              <td :class="this.transactionNoErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'">
                <v-row dense>
                  <!-- KSD V001.000 DS -->
                  <!-- <v-col class="pl-4"><input -->
                  <!--  type="text" -->
                  <!--  class="text-center digit-one-letterr-gray" -->
                  <!--  :value="transactionNoBefore[0]" -->
                  <!--  maxlength="1" -->
                  <!--  tabindex="-1" -->
                  <!--  readonly></v-col> -->
                  <!-- KSD V001.000 DE -->
                  <!-- KSD V001.000 AS -->
                  <v-col class="pl-4"><input
                    type="text"
                    class="text-center digit-one-letterr-gray"
                    :value="transactionNoBefore[0]"
                    maxlength="1"
                    tabindex="-1"
                    disabled></v-col>
                  <!-- KSD V001.000 AE -->
                  <!-- KSD V001.000 DS -->
                  <!-- <v-col><input -->
                  <!--  type="text" -->
                  <!--  class="text-center digit-one-letterr-gray" -->
                  <!--  :value="transactionNoBefore[1]" -->
                  <!--  maxlength="1" -->
                  <!--  tabindex="-1" -->
                  <!--  readonly></v-col> -->
                  <!-- KSD V001.000 DE -->
                  <!-- KSD V001.000 AS -->
                  <v-col><input
                    type="text"
                    class="text-center digit-one-letterr-gray"
                    :value="transactionNoBefore[1]"
                    maxlength="1"
                    tabindex="-1"
                    disabled></v-col>
                  <!-- KSD V001.000 AE -->
                  <!-- KSD V001.000 DS -->
                  <!-- <v-col><input -->
                  <!--  type="text" -->
                  <!--  class="text-center digit-one-letterr-gray" -->
                  <!--  :value="transactionNoBefore[2]" -->
                  <!--  maxlength="1" -->
                  <!--  tabindex="-1" -->
                  <!--  readonly></v-col> -->
                  <!-- KSD V001.000 DE -->
                  <!-- KSD V001.000 AS -->
                  <v-col><input
                    type="text"
                    class="text-center digit-one-letterr-gray"
                    :value="transactionNoBefore[2]"
                    maxlength="1"
                    tabindex="-1"
                    disabled></v-col>
                  <!-- KSD V001.000 AE -->
                  <!-- KSD V001.000 DS -->
                  <!-- <v-col><input -->
                  <!--  type="text" -->
                  <!--  :class="this.transactionNoErrorMsg !== '' ? 'errorTextBox' : ''" -->
                  <!--  class="text-center rounded digit-one-letterr" -->
                  <!--  v-model="transactionNoUpper" -->
                  <!--  maxlength="1" ></v-col> -->
                  <!-- KSD V001.000 DE -->
                  <!-- KSD V001.000 AS -->
                  <v-col><input
                    type="text"
                    :class="this.transactionNoErrorMsg !== '' ? 'errorTextBox' : ''"
                    class="text-center rounded digit-one-letterr"
                    v-model="transactionNoUpper"
                    maxlength="1"
                    :disabled="disableTransNo()"></v-col>
                  <!-- KSD V001.000 AE -->
                  <!-- KSD V001.000 DS -->
                  <!-- <v-col><input -->
                  <!--  type="text" -->
                  <!--  :class="this.transactionNoErrorMsg !== '' ? 'errorTextBox' : ''" -->
                  <!--  class="text-center rounded digit-one-letterr" -->
                  <!--  v-model="transactionNoLower" -->
                  <!--  maxlength="1" ></v-col> -->
                  <!-- KSD V001.000 DE -->
                  <!-- KSD V001.000 AS -->
                  <v-col><input
                    type="text"
                    :class="this.transactionNoErrorMsg !== '' ? 'errorTextBox' : ''"
                    class="text-center rounded digit-one-letterr"
                    v-model="transactionNoLower"
                    maxlength="1"
                    :disabled="disableTransNo()"></v-col>
                  <!-- KSD V001.000 AE -->
                  <!-- KSD V001.000 DS -->
                  <!-- <v-col><input -->
                  <!--  type="text" -->
                  <!--  class="text-center digit-one-letterr-gray" -->
                  <!--  :value="transactionNoAfter[0]" -->
                  <!--  maxlength="1" -->
                  <!--  tabindex="-1" -->
                  <!--  readonly></v-col> -->
                  <!-- KSD V001.000 DE -->
                  <!-- KSD V001.000 AS -->
                  <v-col><input
                    type="text"
                    class="text-center digit-one-letterr-gray"
                    :value="transactionNoAfter[0]"
                    maxlength="1"
                    tabindex="-1"
                    disabled></v-col>
                  <v-col cols="2" />
                  <!-- KSD V001.000 AE -->
                </v-row>
              </td>
            </tr>
            <!-- G001.00.0 Add-Start -->
            <!-- 取引別No.(エラーメッセージ) -->
            <tr
              v-if="this.transactionNoErrorMsg !== ''"
              class="errorCell">
              <th />
              <td>
                <label>{{ transactionNoErrorMsg }}</label>
              </td>
            </tr>
            <!-- G001.00.0 Add-End -->
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
<style scoped>
.digit-one-letterr {
  border:1px solid black;
}
.digit-one-letterr-gray {
  border:1px solid whitesmoke;
}
</style>
