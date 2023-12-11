<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/CommonDesign/utils.css" />
<style scoped src="@/resource/static/css/TaxRateSetting/taxRateSettingSelect.css" />
<script type="text/javascript" src="@/resource/static/js/TaxRateSetting/taxRateSettingSelect.js" />

<template>
  <v-container
    fluid
    class="tax-rate-setting-outer">
    <v-container class="tax-rate-setting-inner mt-12">
      <!-- 設定一覧 -->
      <v-row
        no-gutters
        class="tax-rate-setting-select-container">
        <v-col
          class="tax-rate-setting-select">
          <table>
            <thead>
              <tr>
                <th colspan="2">
                  {{ $t('F322b4.S001') }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="setting in reservationsList"
                :key="setting.id">
                <td>{{ setting.executionDate }}</td>
                <td width="15%">
                  <img
                    src="@/assets/ico_edit@2x.png"
                    tabindex="0"
                    @click="handleDateChange(setting)"
                    @keyup.enter="handleDateChange(setting)"
                    @keyup.space="handleDateChange(setting)"
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </v-col>
      </v-row>

    </v-container>
    <maint-button
      @close="backToTop"
      @add="handleAddButton"
      :isadd-btn="false"
    />
    <popup ref="pop" />
  </v-container>
</template>
<!-- KSD V001.000 AE -->
