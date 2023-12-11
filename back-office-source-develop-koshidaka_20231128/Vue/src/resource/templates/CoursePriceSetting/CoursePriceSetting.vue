<!-- KSD V001.000 AS -->
<style src="@/resource/static/css/CommonDesign/utils.css" />
<style scoped src="@/resource/static/css/CoursePriceSetting/coursePriceSetting.css" />
<script type="text/javascript" src="@/resource/static/js/CoursePriceSetting/coursePriceSetting.js" />
<template>
  <v-container fluid class="course-price-setting-outer">
    <v-container class="course-price-setting-inner">
      <v-row no-gutters class="w-100 d-flex">
        <!-- 対象店舗 -->
        <v-row no-gutters class="w-100 d-flex align-center" style="height: 50px;">
          <v-col :cols="7" class="h-100">
            <form-group-layout
              :title="$t('C00211.S001')"
              fixedHeader
              :headerWidth="146"
            >
              <store-select
                class="course-price-setting-store-select"
                v-model="targetStoreCodes"
                headquartersAuthorityCheckEnable
                :disabled="isTimeSettingFormEnabled"
                hasCodeName
                ref="storeSelect"
              />
            </form-group-layout>
          </v-col>
        </v-row>
      </v-row>
      <v-row
        no-gutters
        class="w-100 d-flex mt-30"
        v-if="showParameterSelectPanel"
      >
        <v-col class="w-100">
          <div class="d-flex w-100">
            <div class="flex-grow-1">
              <v-row class="w-100 d-flex align-center">
                <!-- 曜日区分 -->
                <v-col class="h-100 py-0">
                  <form-group-layout
                    :title="$t(`C00211.S002`)"
                    isVertical
                  >
                    <select-input
                      :emptyOption="false"
                      :options="weekdayDivisionOptions"
                      v-model.number="parameterDataModel.weekdayCode"
                      :disabled="!isParameterSelectEnabled"
                    />
                  </form-group-layout>
                </v-col>
                <!-- コース -->
                <v-col class="h-100 py-0">
                  <form-group-layout
                    :title="$t(`C00211.S003`)"
                    isVertical
                  >
                    <select-input
                      :emptyOption="false"
                      :options="roomCourseOptions"
                      v-model.number="parameterDataModel.chargeCode"
                      :disabled="!isParameterSelectEnabled"
                    />
                  </form-group-layout>
                </v-col>
                <!-- 会員価格 -->
                <v-col class="h-100 py-0">
                  <form-group-layout
                    :title="$t(`C00211.S004`)"
                    isVertical
                  >
                    <select-input
                      :emptyOption="false"
                      :options="memberPriceOptions"
                      v-model.number="parameterDataModel.memberPrice"
                      :disabled="!isParameterSelectEnabled"
                    />
                  </form-group-layout>
                </v-col>
                <!-- 年齢区分 -->
                <v-col class="h-100 py-0">
                  <form-group-layout
                    :title="$t(`C00211.S005`)"
                    isVertical
                  >
                    <select-input
                      :emptyOption="false"
                      :options="ageDivisionOptions"
                      v-model.number="parameterDataModel.ageDivisionCode"
                      :disabled="!isParameterSelectEnabled"
                    />
                  </form-group-layout>
                </v-col>
                <!-- 人数設定 -->
                <v-col class="h-100 py-0">
                  <form-group-layout
                    :title="$t(`C00211.S006`)"
                    isVertical
                  >
                    <select-input
                      :emptyOption="false"
                      :options="countSettingOptions"
                      v-model.number="parameterDataModel.countSetting"
                      :disabled="!isParameterSelectEnabled"
                    />
                  </form-group-layout>
                </v-col>
              </v-row>
            </div>
            <div class="d-flex align-end flex-grow-0 flex-shrink-1 mt-30">
              <v-btn
                large
                class="orange-button"
                style="min-width: 130px; max-width: 130px; width: 130px; height: 40px;"
                :disabled="!isParameterSelectEnabled || (isParameterSelectEnabled && !isEditButtonEnabled)"
                @click="handleEditButtonClick($event)"
              >
                <font color="white" style="font-weight: normal; font-size: 22px;">
                  {{ $t("C00211.S033") }}
                </font>
              </v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row
        no-gutters
        class="w-100 d-flex align-center mt-30"
        v-if="showTimeSettingPanel"
      >
        <v-col>
          <table class="course-price-setting-table">
            <!-- ヘッダー部 -->
            <thead>
              <th width="28%" colspan="2">{{ $t("C00211.S007") }}</th>
              <th width="8%">{{ $t("C00211.S008") }}</th>
              <th width="2%"></th>
              <th width="8%">{{ $t("C00211.S009") }}</th>
              <th width="5%">{{ $t("C00211.S010") }}</th>
              <th width="5%"></th>
              <th width="16%">{{ $t("C00211.S011") }}</th>
              <th width="14%">{{ $t("C00211.S012") }}</th>
              <th width="14%">{{ $t("C00211.S013") }}</th>
            </thead>
            <!-- 時間区分① -->
            <course-price-setting-row
              ref="timeDivision1Row"
              v-model="dataModel.timeDivision1"
              :indexNo="1"
              :pay-type="payType"
              :disabled="!isTimeSettingFormEnabled"
            />
            <!-- 時間区分② -->
            <course-price-setting-row
              ref="timeDivision2Row"
              v-model="dataModel.timeDivision2"
              :indexNo="2"
              :pay-type="payType"
              :disabled="!isTimeSettingFormEnabled"
            />
            <!-- 時間区分③ -->
            <course-price-setting-row
              ref="timeDivision3Row"
              v-model="dataModel.timeDivision3"
              :indexNo="3"
              :pay-type="payType"
              :disabled="!isTimeSettingFormEnabled"
            />
            <!-- 時間区分④ -->
            <course-price-setting-row
              ref="timeDivision4Row"
              v-model="dataModel.timeDivision4"
              :indexNo="4"
              :pay-type="payType"
              :disabled="!isTimeSettingFormEnabled"
            />
          </table>
        </v-col>
      </v-row>
    </v-container>
    <!-- その他ダイアログ等 -->
    <v-row>
      <v-col>
        <maint-button
          @close="handleCloseMaintButton"
          @fixed="handleFixedMaintButton"
          @stop="handleStopMaintButton"
          @copy="handleCopyMaintButton"
          :isCloseBtn="disableCloseButton"
          :isfixedBtn="disableFixedButton"
          :isStopBtn="disableStopButton"
          :isCopyBtn="disableCopyButton" />
      </v-col>
    </v-row>
    <course-price-setting-copy-dialog
      ref="coursePriceSettingCopyDialog"
      :selectedParameterDataModel="parameterDataModel"
      :weekdayCodeOptions="weekdayDivisionOptions"
      :chargeCodeOptions="roomCourseOptionsCopy"
      :memberPriceOptions="memberPriceOptions"
      :ageDivisionCodeOptions="ageDivisionOptions"
      :countSettingOptions="countSettingOptions"
      @confirm="handleCoursePriceSettingCopyDialogConfirm"
    />
    <popup ref="pop" />
  </v-container>
</template>
