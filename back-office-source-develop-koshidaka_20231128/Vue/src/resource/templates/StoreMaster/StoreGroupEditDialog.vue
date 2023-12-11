<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/MasterCommon/masterCommon.css"></style>
<style scoped src="@/resource/static/css/StoreMaster/storeGroupEditDialog.css"></style>
<script type="text/javascript" src="@/resource/static/js/StoreMaster/storeGroupEditDialog.js"></script>

<template>
  <v-container>
    <common-dialog
      v-model="showEditDialog"
      :title="isNewMaster ? $t('F32251.S011') : $t('F32251.S018')"
      @clickBack="handleBackBtn"
      @clickOk="handleSaveBtn(dataModel)"
      @clickDelete="handleDeleteBtn"
      @keydown.prevent="handleOkKeydown"
      :has-delete-button="!isNewMaster"
      :is-new-mode="isNewMaster"
      :ok-label="$t('O00004.S008')"
      :back-btn-label="$t('O00004.S003')"
      :delete-btn-label="$t('O00004.S024')"
      :new-mode-label="$t('F32251.S010')"
      :edit-mode-label="$t('F32251.S017')"
      has-mode-label>
      <table class="store-group-edit-table">
        <tbody>
          <!-- コード -->
          <tr>
            <th width="150px">{{ $t('F32251.S012') }}</th>
            <td class="store-group-edit-table-read-only">
              <text-input
                type="text"
                :value="dataModel.code"
                disabled
              />
            </td>
          </tr>
          <!-- 名称 -->
          <tr>
            <th width="150px">{{ $t('F32251.S013') }}</th>
            <td :class="errorText.length > 0 ? 'has-error' : ''">
              <text-input
                ref="groupName"
                type="text"
                id="group-name"
                v-model="dataModel.displayName.default"
                :placeholder="$t('F32251.S020')"
                @input="inputLimit(dataModel.displayName.default, 20)"
                :maxlength="20"
              />
            </td>
          </tr>
          <tr
            class="error-indicator"
            v-if="hasError('dataModel.displayName.default')">
            <td colspan="2">
              <error-message :error-model="errorText" />
            </td>
          </tr>
        </tbody>
      </table>
    </common-dialog>
    <popup ref="pop" />
  </v-container>
</template>
<!-- KSD V001.000 AE -->
