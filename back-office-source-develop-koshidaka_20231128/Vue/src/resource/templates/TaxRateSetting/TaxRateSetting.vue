<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/CommonDesign/utils.css" />
<style scoped src="@/resource/static/css/TaxRateSetting/taxRateSetting.css" />
<script type="text/javascript" src="@/resource/static/js/TaxRateSetting/taxRateSetting.js" />

<template>
  <v-container
    fluid
    class="tax-rate-setting-outer">
    <v-container class="tax-rate-setting-inner mt-15">
      <form-group-layout
        v-if="showDateSelector"
        :title="$t('F322b4.S002')"
        :header-cols="2"
        :body-cols="6"
        :has-error="hasError('executionDate')"
        :error-text="$t('F322b4.E012')">
        <date-input
          ref="startDate"
          v-model="dataModel.executionDate"
          :disabled-func="pastDateDisabled"
          format="Y-m-d"
          :styling="{
            border: 0,
            'margin-left': '0 !important',
            'padding-left': '5px'
          }"
          is-fixed-input-width
          :input-width="234"
        />
      </form-group-layout>
      <div class="tax-rate-setting-table">
        <table>
          <thead>
            <tr>
              <th width="5%">{{ $t('F322b4.S003') }}</th>
              <th width="15%">{{ $t('F322b4.S004') }}</th>
              <th width="10%">{{ $t('F322b4.S005') }}</th>
              <th width="13%">{{ $t('F322b4.S006') }}</th>
              <th width="10%">{{ $t('F322b4.S007') }}</th>
              <th width="15%">{{ $t('F322b4.S008') }}</th>
              <th width="5%">{{ $t('F322b4.S009') }}</th>
            </tr>
          </thead>
          <tbody
            v-for="taxRate in taxRatesList"
            :key="taxRate.value">
            <tr>
              <td>{{ extractNumerics(taxRate.name) }}</td>
              <td>{{ taxRate.displayName.default }}</td>
              <td>{{ formattedRateType(taxRate.taxType || taxRate.type) }}</td>
              <td>{{ formattedRate(taxRate.rate).length > 0 ? formattedRate(taxRate.rate) + $t('F322b4.S023') : '' }}</td>
              <td>{{ taxRate.taxMark }}</td>
              <td>{{ formattedReducedTax(taxRate.reducedTax) }}</td>
              <td>
                <img
                  v-if="allowEditBtn"
                  src="@/assets/ico_edit@2x.png"
                  tabindex="0"
                  @keyup.enter="handleEditBtn(taxRate)"
                  @keyup.space="handleEditBtn(taxRate)"
                  @click="handleEditBtn(taxRate)"
                >
                <img
                  v-else
                  src="@/assets/ico_edit_h@2x.png"
                  class="disabled-edit-icon"
                  tabindex="-1"
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </v-container>
    <tax-rate-setting-edit-dialog
      ref="taxRateSettingEditDialog"
      v-if="showEditDialog"
      v-model="selectedTaxItem"
      :show-edit-dialog.sync="showEditDialog"
      :is-new-tax-master="isNewTaxMaster"
      @update="handleUpdateTaxRow"
      @delete="handleDeleteTaxRow"
    />
    <maint-button
      @close="backToTop"
      @fixed="handleFixedBtn"
      @clone="handleCloneBtn"
      @stop="handleStopBtn"
      @del="handleDelBtn"
      :isfixed-btn="disabledFixedBtn"
      :is-clone-btn="disabledCloneBtn"
      :isdel-btn="disabledDelBtn"
    />
    <popup
      ref="pop"
      yscroll="hidden"
    />
  </v-container>
</template>
<!-- KSD V001.000 AE -->
