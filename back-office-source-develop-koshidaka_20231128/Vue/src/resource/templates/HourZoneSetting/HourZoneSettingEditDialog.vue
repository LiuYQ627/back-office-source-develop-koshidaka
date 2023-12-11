<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/MasterCommon/masterCommon.css"></style>
<style scoped src="@/resource/static/css/HourZoneSetting/hourZoneSettingEditDialog.css"></style>
<script type="text/javascript" src="@/resource/static/js/HourZoneSetting/hourZoneSettingEditDialog.js"></script>

<template>
  <v-container>
    <common-dialog
      v-model="showEditDialog"
      :title="isNewMaster ? $t('F322b5.S010') : $t('F322b5.S012')"
      @clickBack="handleBackBtn"
      @clickOk="handleSaveBtn"
      @clickDelete="handleDeleteBtn"
      @keydown="handleOkKeydown"
      :has-delete-button="!isNewMaster"
      :is-new-mode="isNewMaster"
      :ok-label="$t('F322b5.S015')"
      :back-btn-label="$t('F322b5.S014')"
      :delete-btn-label="$t('F322b5.S016')"
      :new-mode-label="$t('F322b5.S009')"
      :edit-mode-label="$t('F322b5.S011')"
      has-mode-label>
      <table class="tax-rate-setting-edit-table">
        <tbody>
          <!-- 時間帯番号 -->
          <tr>
            <th width="150px">{{ $t('F322b5.S003') }}</th>
            <td class="tax-rate-setting-edit-table-read-only">
              <text-input
                type="text"
                :value="displayOrder"
                disabled
              />
            </td>
          </tr>
          <!-- 開始時刻 -->
          <tr>
            <th width="150px">{{ $t('F322b5.S004') }}</th>
            <td class="tax-rate-setting-edit-table-read-only">
              <text-input
                type="text"
                :value="formattedTime(dataModel.startTime)"
                disabled
              />
            </td>
          </tr>
          <!-- 終了時刻 -->
          <tr>
            <th width="150px">{{ $t('F322b5.S005') }}</th>
            <td :class="{'has-error': hasError('dataModel.hourZone')}">
              <input
                id="hour-zone"
                type="time"
                :min="formattedTime(dataModel.startTime)"
                v-model="unZonedTime.hourZone"
                tabindex="0">
            </td>
          </tr>
          <tr
            class="error-indicator"
            v-if="hasError('dataModel.hourZone')">
            <td colspan="2">
              <error-message :error-model="errorText" />
            </td>
          </tr>
          <!-- 表示区分 -->
          <tr>
            <th width="150px">{{ $t('F322b5.S006') }}</th>
            <td>
              <select-input
                v-model="dataModel.printFlag"
                :empty-option="false"
                :options="printFlags"
                @input="(val) => handlePrintFlagChange(val)"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div class="hour-zone-setting-input-guide">
        <div v-html="$t('F322b5.S013')" />
      </div>
    </common-dialog>
    <popup ref="pop" />
  </v-container>
</template>
<!-- KSD V001.000 AE -->
