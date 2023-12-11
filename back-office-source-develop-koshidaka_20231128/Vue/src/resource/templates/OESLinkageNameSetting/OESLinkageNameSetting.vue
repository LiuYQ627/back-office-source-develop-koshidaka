<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/CommonDesign/utils.css"></style>
<style scoped src="@/resource/static/css/OESLinkageNameSetting/OESLinkageNameSetting.css"></style>
<script type="text/javascript" src="@/resource/static/js/OESLinkageNameSetting/OESLinkageNameSetting.js"></script>
<template>
  <v-container class="container">
    <!-- 店舗選択エリア -->
    <form-group-layout
      fixed-header
      :header-width="146"
      :title="$t('F322b7.S001')"
      class="store-container mb-30"
    >
      <!-- 対象店舗は「店舗コード:店舗名称」の形式で表示する -->
      <store-select
        v-model="targetStoreCodes"
        :confirm-proceed="isEdited"
        headquarters-authority-check-enable
        ref="storeSelect"
        @change="handleStoreSelectChange"
        @click="storeClicked"
      />
    </form-group-layout>
    <div>
      <v-row>
        <v-col class="pt-0">
          <!-- タイトル設定エリア -->
          <table class="OES-linkage-name-setting-table">
            <thead>
              <tr>
                <th width="20%">{{ $t("F322b7.S002") }}</th>
                <th width="20%">{{ $t("F322b7.S004") }}</th>
                <th width="25%">{{ $t("F322b7.S008") }}</th>
                <th width="25%">{{ $t("F322b7.S009") }}</th>
                <th width="10%">{{ $t("F322b7.S010") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  class="border-left"
                  rowspan="4">
                  {{ $t("F322b7.S003") }}
                </td>
              </tr>
              <tr>
                <td>{{ $t("F322b7.S005") }}</td>
                <td>{{ nameDisplayConfig.rows.tblNo.row[0].displayName.default }}</td>
                <td>{{ nameDisplayConfig.rows.tblNo.row[0].printName.default }}</td>
                <td class="right-align">
                  <img
                    src="@/assets/ico_edit@2x.png"
                    class="scroll-none edit-button"
                    tabindex="0"
                    @click="editNameDisplaySetting(nameDisplayConfig.rows.tblNo.row[0], 1)"
                    @keydown.enter="editNameDisplaySetting(nameDisplayConfig.rows.tblNo.row[0], 1)"
                    @keydown.space="editNameDisplaySetting(nameDisplayConfig.rows.tblNo.row[0], 1)"
                  >
                </td>
              </tr>
              <tr>
                <td>{{ $t("F322b7.S006") }}</td>
                <td>{{ nameDisplayConfig.rows.slipNo.row[0].displayName.default }}</td>
                <td>{{ nameDisplayConfig.rows.slipNo.row[0].printName.default }}</td>
                <td class="right-align">
                  <img
                    src="@/assets/ico_edit@2x.png"
                    class="scroll-none edit-button"
                    tabindex="0"
                    @click="editNameDisplaySetting(nameDisplayConfig.rows.slipNo.row[0], 2)"
                    @keydown.enter="editNameDisplaySetting(nameDisplayConfig.rows.slipNo.row[0], 2)"
                    @keydown.space="editNameDisplaySetting(nameDisplayConfig.rows.slipNo.row[0], 2)"
                  >
                </td>
              </tr>
              <tr>
                <td>{{ $t("F322b7.S007") }}</td>
                <td>{{ nameDisplayConfig.rows.nkTblNo.row[0].displayName.default }}</td>
                <td>{{ nameDisplayConfig.rows.nkTblNo.row[0].printName.default }}</td>
                <td class="right-align">
                  <img
                    src="@/assets/ico_edit@2x.png"
                    class="scroll-none edit-button"
                    tabindex="0"
                    @click="editNameDisplaySetting(nameDisplayConfig.rows.nkTblNo.row[0], 3)"
                    @keydown.enter="editNameDisplaySetting(nameDisplayConfig.rows.nkTblNo.row[0], 3)"
                    @keydown.space="editNameDisplaySetting(nameDisplayConfig.rows.nkTblNo.row[0], 3)"
                  >
                </td>
              </tr>
            </tbody>
          </table>
          <!-- 取消理由設定エリア -->
          <table class="OES-linkage-name-setting-table">
            <thead>
              <tr>
                <th width="20%">{{ $t("F322b7.S011") }}</th>
                <th width="20%">{{ $t("F322b7.S013") }}</th>
                <th width="25%">{{ $t("F322b7.S019") }}</th>
                <th width="25%">{{ $t("F322b7.S020") }}</th>
                <th width="10%">{{ $t("F322b7.S021") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  class="border-left"
                  rowspan="6">
                  {{ $t("F322b7.S012") }}
                </td>
              </tr>
              <tr>
                <td>{{ $t("F322b7.S014") }}</td>
                <td>{{ unpaidDeleteReasonCodeConfig.rows.code1.row[0].displayName.default }}</td>
                <td>{{ unpaidDeleteReasonCodeConfig.rows.code1.row[0].printName.default }}</td>
                <td class="right-align">
                  <img
                    src="@/assets/ico_edit@2x.png"
                    class="scroll-none edit-button"
                    tabindex="0"
                    @click="editUnpaidDeleteReasonSetting(unpaidDeleteReasonCodeConfig.rows.code1.row[0], 1)"
                    @keydown.enter="editUnpaidDeleteReasonSetting(unpaidDeleteReasonCodeConfig.rows.code1.row[0], 1)"
                    @keydown.space="editUnpaidDeleteReasonSetting(unpaidDeleteReasonCodeConfig.rows.code1.row[0], 1)"
                  >
                </td>
              </tr>
              <tr>
                <td>{{ $t("F322b7.S015") }}</td>
                <td>{{ unpaidDeleteReasonCodeConfig.rows.code2.row[0].displayName.default }}</td>
                <td>{{ unpaidDeleteReasonCodeConfig.rows.code2.row[0].printName.default }}</td>
                <td class="right-align">
                  <img
                    src="@/assets/ico_edit@2x.png"
                    class="scroll-none edit-button"
                    tabindex="0"
                    @click="editUnpaidDeleteReasonSetting(unpaidDeleteReasonCodeConfig.rows.code2.row[0], 2)"
                    @keydown.enter="editUnpaidDeleteReasonSetting(unpaidDeleteReasonCodeConfig.rows.code2.row[0], 2)"
                    @keydown.space="editUnpaidDeleteReasonSetting(unpaidDeleteReasonCodeConfig.rows.code2.row[0], 2)"
                  >
                </td>
              </tr>
              <tr>
                <td>{{ $t("F322b7.S016") }}</td>
                <td>{{ unpaidDeleteReasonCodeConfig.rows.code3.row[0].displayName.default }}</td>
                <td>{{ unpaidDeleteReasonCodeConfig.rows.code3.row[0].printName.default }}</td>
                <td class="right-align">
                  <img
                    src="@/assets/ico_edit@2x.png"
                    class="scroll-none edit-button"
                    tabindex="0"
                    @click="editUnpaidDeleteReasonSetting(unpaidDeleteReasonCodeConfig.rows.code3.row[0], 3)"
                    @keydown.enter="editUnpaidDeleteReasonSetting(unpaidDeleteReasonCodeConfig.rows.code3.row[0], 3)"
                    @keydown.space="editUnpaidDeleteReasonSetting(unpaidDeleteReasonCodeConfig.rows.code3.row[0], 3)"
                  >
                </td>
              </tr>
              <tr>
                <td>{{ $t("F322b7.S017") }}</td>
                <td>{{ unpaidDeleteReasonCodeConfig.rows.code4.row[0].displayName.default }}</td>
                <td>{{ unpaidDeleteReasonCodeConfig.rows.code4.row[0].printName.default }}</td>
                <td class="right-align">
                  <img
                    src="@/assets/ico_edit@2x.png"
                    class="scroll-none edit-button"
                    tabindex="0"
                    @click="editUnpaidDeleteReasonSetting(unpaidDeleteReasonCodeConfig.rows.code4.row[0], 4)"
                    @keydown.enter="editUnpaidDeleteReasonSetting(unpaidDeleteReasonCodeConfig.rows.code4.row[0], 4)"
                    @keydown.space="editUnpaidDeleteReasonSetting(unpaidDeleteReasonCodeConfig.rows.code4.row[0], 4)"
                  >
                </td>
              </tr>
              <tr>
                <td>{{ $t("F322b7.S018") }}</td>
                <td>{{ unpaidDeleteReasonCodeConfig.rows.code5.row[0].displayName.default }}</td>
                <td>{{ unpaidDeleteReasonCodeConfig.rows.code5.row[0].printName.default }}</td>
                <td class="right-align">
                  <img
                    src="@/assets/ico_edit@2x.png"
                    class="scroll-none edit-button"
                    tabindex="0"
                    @click="editUnpaidDeleteReasonSetting(unpaidDeleteReasonCodeConfig.rows.code5.row[0], 5)"
                    @keydown.enter="editUnpaidDeleteReasonSetting(unpaidDeleteReasonCodeConfig.rows.code5.row[0], 5)"
                    @keydown.space="editUnpaidDeleteReasonSetting(unpaidDeleteReasonCodeConfig.rows.code5.row[0], 5)"
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </v-col>
      </v-row>
    </div>
    <v-row>
      <v-col>
        <maint-button
          @close="handleMaintButtonClose"
          @fixed="handleMaintButtonFixed"
          @stop="handleStopMaintButton"
          :isfixed-btn="disabledFixedBtn"
          :is-stop-btn="disableStopButton"
        />
      </v-col>
    </v-row>
    <edit-name-display-dialog
      ref="editNameDisplayDialog"
      @clickSave="nameDisplayCallback"/>
    <edit-unpaid-delete-reason-dialog
      ref="editUnpaidDeleteReasonDialog"
      @clickSave="unpaidDeleteReasonSaveCallback"/>
    <popup ref="pop"/>
  </v-container>
</template>
<!-- KSD V001.000 AE -->
