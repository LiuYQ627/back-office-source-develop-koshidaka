<style src="./../../static/css/OperationBtnSetting/subMediaBtnSettingDialog.css"></style>
<script type="text/javascript" src="./../../static/js/OperationBtnSetting/subMediaBtnSettingDialog.js"></script>
<!--
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230109 bai.ry(Neusoft)  G001.00.0  issue課題#1204を対応します.
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
            <label id="changeModelabel"><b>{{ "編集" }}</b></label>
          </div>
          <font class="dialog-title">{{ "会計画面表示" }}</font>
        </v-card-title>

        <!-- 設定項目 -->

        <div
          id="baseTable"
          style="overflow-y: auto">
          <table class="conversionTable">
            <tr>
              <th>{{ "サブメディア" }}</th>
              <td class="pulldownCellStyle">
                <select
                  :class="this.subTypeErrorMsg !== '' ? 'errorSelectBox' : 'pulldownStyle'"
                  v-model="itemDetail.subType"
                  style="color:#000000;text-overflow: ellipsis;padding-right:40px;"
                  :title="getNameFromSetting(itemDetail.subType)"
                  @change="mediaSelected"
                >
                  <option
                    v-for="(media, index) in subMediaList"
                    :key="index"
                    :value="media.name"
                  >
                    {{ media.displayName.default }}
                  </option>
                </select>
                <div class="pulldownArrow"/>
              </td>
            </tr>
            <!-- G001.00.0 Add-Start -->
            <tr
              v-if="this.subTypeErrorMsg !== ''"
              class="errorCell">
              <th />
              <td>
                <label>{{ subTypeErrorMsg }}</label>
              </td>
            </tr>
          </table>
        </div>
        <!-- フッター -->
        <v-card-actions class="dialog-fotter">
          <v-spacer/>
          <v-btn
            class="button dialog-fotter-button-gray footerButtonStyle"
            @click="onClickReturn()">
            {{ $t("O00004.S003") }}
          </v-btn>
          <v-btn
            :disabled="!this.permissions.includes('CLOUDPOS_OPERATION_BTN_UPDATE')"
            class="button dialog-fotter-button-orange footerButtonStyle"
            @click="onClickSave()">
            {{ $t("O00004.S008") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <popup ref="pop" />
  </div>
</template>
