<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/CoursePriceSetting/coursePriceSettingCopyDialog.css"></style>
<script type="text/javascript" src="@/resource/static/js/CoursePriceSetting/coursePriceSettingCopyDialog.js"></script>
<template>
  <v-dialog
    class="course-price-setting-copy-dialog"
    v-model="dialog"
    width="1400px !important"
    persistent>
    <v-card class="course-price-setting-copy-dialog-card">
      <v-card-title class="headline dialog-line-blue">
        <span class="course-price-setting-copy-dialog-title popup-title">
          {{ $t(`C00211.S038`) }}
        </span>
      </v-card-title>
      <v-card-text class="contentStyle">
        <div class="course-price-setting-copy-dialog-grid">
          <table-select-input
            class="course-price-setting-copy-dialog-table"
            :title="$t(`C00211.S002`)"
            :emptyOption="false"
            :options="weekdayCodeOptions"
            v-model="dataModel.weekdayCode"
            multiple
          />
          <table-select-input
            class="course-price-setting-copy-dialog-table"
            :title="$t(`C00211.S003`)"
            :emptyOption="false"
            :options="chargeCodeOptions"
            v-model="dataModel.chargeCode"
            multiple
          />
          <table-select-input
            class="course-price-setting-copy-dialog-table"
            :title="$t(`C00211.S004`)"
            :emptyOption="false"
            :options="memberPriceOptions"
            v-model="dataModel.memberPrice"
            multiple
          />
          <table-select-input
            class="course-price-setting-copy-dialog-table"
            :title="$t(`C00211.S005`)"
            :emptyOption="false"
            :options="ageDivisionCodeOptions"
            v-model="dataModel.ageDivisionCode"
            multiple
          />
          <table-select-input
            class="course-price-setting-copy-dialog-table"
            :title="$t(`C00211.S006`)"
            :emptyOption="false"
            :options="countSettingOptions"
            v-model="dataModel.countSetting"
            multiple
          />
        </div>
      </v-card-text>
      <v-card-actions class="popup-fotter">
        <v-spacer></v-spacer>
        <v-btn class="button dialog-fotter-button-gray footerButtonStyle"
          @click="handleCancelButtonClick">
          {{ $t("O00004.S003") }}
        </v-btn>
        <v-btn class="button dialog-fotter-button-orange footerButtonStyle"
          @click="handleOkButtonClick"
          :disabled="okButtonDisabled">
          {{ $t("O00004.S029") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<!-- KSD V001.000 AE -->
