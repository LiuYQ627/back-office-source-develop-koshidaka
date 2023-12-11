<style src="./../../static/css/OperationBtnSetting/accountingSettingDialog.css"></style>
<script type="text/javascript" src="./../../static/js/OperationBtnSetting/accountingSettingDialog.js"></script>

<!--
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20221222 duyouwei(Neusoft)  G001.00.0  issue課題#1161,#1204を対応します.
 * 20230815 qinshh(Neusoft)    G002.00.0  issue課題#1587を対応します.
 * 20231018 hql(Neusoft)       G003.00.0  issue課題#1194を対応します.
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
          <font class="dialog-title">{{ "会計画面表示" }}</font>
        </v-card-title>

        <!-- 設定項目 -->

        <div
          id="baseTable"
          style="overflow-y: auto">
          <table class="conversionTable">
            <tr>
              <th>{{ "種別" }}</th>
              <td class="pulldownCellStyle">
                <!-- G001.00.0 Update-Start -->
                <!-- <select
                  class="pulldownStyle"
                  v-model="setting.kind"
                   style="color:#000000"
                > -->
                <select
                  v-model="setting.kind"
                  :class="this.kindErrorMsg !== '' ? 'errorSelectBox' : 'pulldownStyle'"
                  style="color:#000000"
                  @change="kindChange"
                >
                  <!-- G001.00.0 Update -End -->
                  <option
                    v-for="(kind, index) in config.accountingSettingKind"
                    :key="index"
                    :value="kind.key"
                  >
                    {{ kind.label }}
                  </option>
                </select>
                <div class="pulldownArrow"/>
              </td>
            </tr>
            <!-- G001.00.0 Add-Start -->
            <tr
              v-if="this.kindErrorMsg !== ''"
              class="errorCell">
              <th />
              <td>
                <label>{{ kindErrorMsg }}</label>
              </td>
            </tr>
            <!-- G001.00.0 Add-End -->
            <tr v-if="setting.kind == 1">
              <th>{{ "メディア" }}</th>
              <td class="pulldownCellStyle">
                <!-- G001.00.0 Update-Start -->
                <!-- <select
                  class="pulldownStyle"
                  v-model="setting.paymentType"
                   style="color:#000000"
                > -->
                <select
                  :class="this.paymentTypeErrorMsg !== '' ? 'errorSelectBox' : 'pulldownStyle'"
                  v-model="setting.paymentType"
                  style="color:#000000;text-overflow: ellipsis;padding-right:40px;"
                  :title="getNameFromSetting(setting.paymentType)"
                  @change="mediaChange"
                >
                  <!-- G001.00.0 Update -End -->
                  <option
                    v-for="(kind, index) in mediaList"
                    :key="index"
                    :value="kind.key"
                  >
                    <!-- G001.00.0 Update-Start -->
                    <!-- {{ kind.key }} -->
                    {{ kind.displayName.default }}
                    <!-- G001.00.0 Update -End -->
                  </option>
                </select>
                <div class="pulldownArrow"/>
              </td>
            </tr>
            <!-- G001.00.0 Add-Start -->
            <tr
              v-if="this.paymentTypeErrorMsg !== ''"
              class="errorCell">
              <th />
              <td>
                <label>{{ paymentTypeErrorMsg }}</label>
              </td>
            </tr>
            <!-- G001.00.0 Add-End -->
            <tr v-if="setting.kind != 1">
              <th>{{ "名称" }}</th>
              <td>
                <!-- G001.00.0 Update-Start -->
                <!-- <input
                  type="text"
                  class="editTextBox"
                  v-model="setting.displayName.default"
                /> -->
                <!-- G002.00.0 Update-Start -->
                <!-- <input
                  type="text"
                  :class="this.nameErrorMsg !== '' ? 'errorSelectBox' : 'editTextBox'"
                  v-model="setting.displayName.default"
                  @input="nameInput"
                > -->
                <!-- G003.00.0 Update-Start -->
                <!-- <input
                  type="text"
                  :class="this.nameErrorMsg !== '' ? 'errorSelectBox' : 'editTextBox'"
                  v-model="setting.displayName.default"
                  @input="nameInput"
                  :maxlength="24"
                  :placeholder="this.$i18n.t('O00004.S072')"
                > -->
                <input
                  type="text"
                  :class="this.nameErrorMsg !== '' ? 'errorSelectBox' : 'editTextBox'"
                  v-model="setting.displayName.default"
                  @input="nameInput(setting,24)"
                  :maxlength="24"
                  :placeholder="this.$i18n.t('O00004.S072')"
                >
                <!-- G003.00.0 Update-End -->
                <!-- G002.00.0 Update-End -->
                <!-- G001.00.0 Update-End -->
              </td>
            </tr>
            <!-- G001.00.0 Add-Start -->
            <tr
              v-if="this.nameErrorMsg !== ''"
              class="errorCell">
              <th />
              <td>
                <label>{{ nameErrorMsg }}</label>
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
