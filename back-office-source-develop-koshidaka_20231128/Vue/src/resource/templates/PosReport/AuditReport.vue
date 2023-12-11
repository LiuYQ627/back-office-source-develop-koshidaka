<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/CommonDesign/utils.css" />
<style scoped src="@/resource/static/css/PosReport/auditReport.css" />
<script type="text/javascript" src="@/resource/static/js/PosReport/auditReport.js" />

<template>
  <v-container class="mt-10 audit-report-container">
    <v-row
      no-gutters
      class="condition-row w-100 d-flex align-center mt-10 custom-row-spacing">
      <v-col
        cols="2"
        class="h-100">
        <label
          for="targetStores"
          class="grayFrame h-100 w-100 d-flex justify-center align-center">
          {{ $t("F32232.S011") }}
        </label>
      </v-col>
      <v-col
        cols="7"
        class="h-100 d-flex align-center">
        <store-select
          multiple
          v-model="request.storeName"
          ref="storeSelectDlg"
          headquarters-authority-check-enable
          @change="getAuditConfig"
        />
      </v-col>
    </v-row>
    <v-row
      no-gutters
      class="condition-row w-100 d-flex align-center mt-5 custom-row-spacing">
      <v-col
        cols="2"
        class="h-100">
        <label
          for="targetStores"
          class="grayFrame h-100 w-100 d-flex justify-center align-center">
          {{ $t("F32232.S012") }}
        </label>
      </v-col>
      <v-col
        cols="7"
        class="h-100 d-flex align-center whiteFrame">
        <input
          type="text"
          id="targetStores"
          class="px-2 h-100 w-100 ellipsis"
          :value="selectedRegisterIdsText"
          disabled
        >
        <v-btn
          class="rightArrowButton mx-2"
          :disabled="request.storeName.length >= 2 || request.storeName.length === 0"
          @click="onShowRegisterIdsDialog" />
      </v-col>
    </v-row>
    <v-row
      no-gutters
      class="condition-row w-100 d-flex align-center mt-5 custom-row-spacing">
      <v-col
        cols="2"
        class="h-100">
        <label
          for="durationFrom"
          class="grayFrame h-100 w-100 d-flex justify-center align-center">
          {{ $t("F32232.S013") }}
        </label>
      </v-col>
      <v-col
        cols="2"
        class="h-100 d-flex align-center">
        <date-input
          format="Y-m-d"
          @input="(e) => dailyErrorCheck(e, 1)"
          ref="durationYMDFrom"
          :min-date="'2000-01'"
          v-model="durationFrom"
          :disabled-func="disabledDays" />
      </v-col>
      <span class="mx-2"> {{ $t("F32232.S131") }}</span>
      <v-col
        cols="2"
        class="h-100 d-flex align-center">
        <date-input
          format="Y-m-d"
          ref="durationYMDTo"
          :min-date="'2000-01'"
          @input="(e) => dailyErrorCheck(e, 2)"
          v-model="durationTo"
          :disabled-func="disabledDays" />
      </v-col>
    </v-row>
    <v-row
      no-gutters
      class="condition-row w-100 d-flex align-center mt-5">
      <v-col
        cols="9"
        class="pa-0 ">
        <form-group-layout
          :header-cols="3"
          :body-cols="9"
          :title="$t('F32232.S014')"
          class="custom-form-group">
          <v-row
            no-gutters>
            <v-col>
              <radio-button
                class="pa-1 "
                v-model="request.duration.type"
                :labels="[defaultOption[0]]"
                item-cols="4" />
            </v-col>
          </v-row>
          <v-row
            v-if=" isValidResponse() === true"
            no-gutters>
            <v-col>
              <radio-button
                class="pa-1 "
                v-model="request.duration.type"
                multiple
                item-cols="4"
                :labels="durationTypeOptions.slice(0, 3)"
              />
            </v-col>
          </v-row>
          <v-row
            v-if=" isValid2Response() === true"
            no-gutters>
            <v-col>
              <radio-button
                class="pa-1 "
                v-model="request.duration.type"
                multiple
                item-cols="4"
                :labels="durationTypeOptions.slice(3)"
              />
            </v-col>
          </v-row>
        </form-group-layout>
      </v-col>
    </v-row>
    <v-row
      no-gutters
      class="condition-row w-100 d-flex align-center mt-5"/>
    <v-row>
      <v-col>
        <maint-button
          @close="backToMenu"
          @output="goToOutput"
          :isoutput-btn="!permissions.includes('CLOUDPOS_REPORT_OTHER_1') || request.duration.type.length === 0"
        />
      </v-col>
    </v-row>
    <popup ref="pop" />
    <dialog-register-select
      :title="$t('F32232.S012')"
      v-model="registerSelectDisplayed"
      :register-ids="availableRegisterIds"
      :available-register-ids="availableRegisterIds"
      :selected-register-ids="selectedRegisterIds"
      @clickOk="selectedRegisterIds = $event"
    />

    <dialog-store-select ref="dialogStoreSelect" />
  </v-container>
</template>
<!-- KSD V001.000 AE -->
