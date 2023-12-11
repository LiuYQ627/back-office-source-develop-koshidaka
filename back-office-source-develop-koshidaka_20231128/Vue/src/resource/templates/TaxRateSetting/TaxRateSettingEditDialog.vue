<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/CommonDesign/utils.css" />
<style scoped src="@/resource/static/css/TaxRateSetting/taxRateSettingEditDialog.css" />
<script type="text/javascript" src="@/resource/static/js/TaxRateSetting/taxRateSettingEditDialog.js" />
<template>
  <v-container>
    <common-dialog
      v-model="showEditDialog"
      :title="isNewTaxMaster ? $t('F322b4.S011') : $t('F322b4.S013')"
      :ok-label="'保存'"
      @clickBack="handleBackBtn"
      @clickOk="handleSaveBtn"
      @clickDelete="handleDeleteBtn"
      @keydown.prevent="handleOkKeydown"
      :has-delete-button="!isNewTaxMaster"
      :disabled-okbutton="disabledSaveBtn"
      :is-new-mode="isNewTaxMaster"
      has-mode-label>
      <table class="tax-rate-setting-edit-table">
        <tbody>
          <!-- No -->
          <tr>
            <th width="150px">{{ $t('F322b4.S003') }}</th>
            <td class="tax-rate-setting-edit-table-read-only">
              <text-input
                type="text"
                :value="extractNumerics(dataModel.name)"
                disabled
              />
            </td>
          </tr>
          <!-- 表示名 -->
          <tr>
            <th width="150px">{{ $t('F322b4.S004') }}</th>
            <td :class="{'has-error' : hasError('displayName')}">
              <!-- CS KSD V001.000 #84581   -->
              <!-- <text-input
                type="text"
                id="tax-name"
                :placeholder="$t('F322b4.S020')"
                :maxlength="maxCharsName"
                v-model="dataModel.displayName"
              /> -->
              <!-- CS KSD V001.000 #84581   -->
              <!--<input
                type="text"
                id="tax-name"
                :class=" hasError('displayName') ? 'errorTextBox' : 'editTextBox'"
                class="textCorporateName"
                :placeholder="$t('F322b4.S020')"
                maxlength="12"
                v-model="dataModel.displayName"
                :@input="inputLimit(dataModel.displayName,12)"
              />-->
              <input
                type="text"
                id="tax-name"
                style="border: #9EA0AA solid 1px;"
                :class=" hasError('displayName') ? 'errorTextBox' : 'editTextBox'"
                class="textCorporateName"
                :placeholder="$t('F322b4.S020')"
                maxlength="12"
                v-model="dataModel.displayName"
                :@input="inputLimit(dataModel.displayName,12)"
              />
              <!-- CE KSD V001.000 #84581   -->
              <!-- CE KSD V001.000 #84581   -->
            </td>
          </tr>
          <tr v-if="hasError('displayName')">
            <td colspan="2">
              <error-message :error-model="$t('O00004.W014')" />
            </td>
          </tr>
          <!-- 税区分 -->
          <tr>
            <th width="150px">{{ $t('F322b4.S005') }}</th>
            <td :class="{'has-error' : hasError('taxType')}">
              <select-input
                v-model="dataModel.taxType"
                :empty-option="false"
                :options="rateTypeOptions"
                @input="(val) => handleSelectTaxType(val)"
              />
            </td>
          </tr>
          <!-- %レート -->
          <tr>
            <th width="150px">{{ $t('F322b4.S006') }}</th>
            <td :class="{'tax-rate-setting-edit-table-read-only': isTaxExempt, 'has-error' : hasError('rate')}">
              <numeric-input-single-digit
                ref="rateInput"
                v-model="dataModel.rate"
                :left-padding="50"
                :disabled="isTaxExempt"
                @blur="handleRateChange"
                :has-error="hasError('rate')"
              />
            </td>
          </tr>
          <tr v-if="hasError('rate')">
            <td colspan="2">
              <error-message :error-model="$t('O00004.W014')" />
            </td>
          </tr>
          <!-- マーク -->
          <tr>
            <th width="150px">{{ $t('F322b4.S007') }}</th>
            <td>
              <text-input
                type="text"
                class="form-control"
                :placeholder="$t('F322b4.S021')"
                :maxlength="maxCharsMark"
                v-model="dataModel.taxMark"
              />
            </td>
          </tr>
          <!-- 軽減税率対象 -->
          <tr>
            <th width="150px">{{ $t('F322b4.S008') }}</th>
            <td :class="{'tax-rate-setting-edit-table-read-only': isTaxExempt, 'has-error' : hasError('reducedTax')}">
              <select-input
                v-model="dataModel.reducedTax"
                :empty-option="false"
                :options="reducedTaxOptions"
                :disabled="isTaxExempt"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </common-dialog>
    <popup ref="pop" />
  </v-container>
</template>
<!-- KSD V001.000 AE -->
