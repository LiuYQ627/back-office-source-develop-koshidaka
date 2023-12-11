<!-- KSD V001.000 DS -->
<!-- <style src="@/resource/static/css/CommonDesign/utils.css" /> -->
<!-- KSD V001.000 DE -->
<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/CommonDesign/utils.css" />
<style scoped src="@/resource/static/css/MasterCommon/masterCommon.css" />
<!-- KSD V001.000 AE -->
<style scoped src="@/resource/static/css/PosReport/posReport.css" />
<script type="text/javascript" src="@/resource/static/js/PosReport/posReport.js" />

<!--
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230110  litie(Neusoft)    G001.00.0  issue課題#1058を対応します.
 * 20230608  qinshh(Neusoft)   G002.00.0  issue課題#1545を対応します.
 -->

<template>
  <!-- KSD V001.000 DS -->
  <!-- <v-container class="mt-10"> -->
  <!-- KSD V001.000 DE -->
  <!-- KSD V001.000 AS -->
  <v-container class="mt-15 pos-report-container">
    <!-- KSD V001.000 AE -->
    <!-- 対象レポート選択 -->
    <!-- KSD V001.000 DS -->
    <!-- <v-row -->
    <!--   no-gutters -->
    <!--   class="conditionRow w-100 d-flex align-center mt-5"> -->
    <!--   <v-col -->
    <!--     cols="2" -->
    <!--     class="h-100"> -->
    <!--     <label -->
    <!--       class="grayFrame h-100 w-100 d-flex justify-center align-center" -->
    <!--       for="targetReport" -->
    <!--     > -->
    <!--       {{ "対象レポート" }} -->
    <!--     </label> -->
    <!--   </v-col> -->
    <!--  -->
    <!--   <v-col -->
    <!--     cols="4" -->
    <!--     class="h-100"> -->
    <!--     <select -->
    <!--       id="targetReport" -->
    <!--       class="h-100 w-100 whiteFrame pl-2" -->
    <!--       v-model="targetReport" -->
    <!--       style="color:#000000" -->
    <!--     > -->
    <!--       <\\!-- 無選択 --\\> -->
    <!--       <option :value="-1" /> -->
    <!--       <option -->
    <!--         v-for="(label, index) in targetReportList" -->
    <!--         :key="label.name" -->
    <!--         :value="index" -->
    <!--       > -->
    <!--         {{ label.name }} -->
    <!--       </option> -->
    <!--     </select> -->
    <!--     <div class="pulldownArrow" /> -->
    <!--   </v-col> -->
    <!-- </v-row> -->
    <!-- KSD V001.000 DE -->
    <!-- KSD V001.000 AS -->
    <v-row class="mb-30">
      <v-col
        cols="9"
        class="pa-0">
        <form-group-layout
          :header-cols="3"
          :body-cols="5"
          :title="$t('F32231.S011')"
        >
          <select-input
            class="form-control"
            v-model="request.reportName"
            :options="reportTypeData"
            :empty-option="false"
            :get-option-value="(option, index) => option.reportName"
            :get-option-name="(option, index) => option.name"
            @input="handleReportChange()"
          />
        </form-group-layout>
      </v-col>
    </v-row>
    <!-- KSD V001.000 AE -->

    <!-- 検索条件 -->
    <!-- KSD V001.000 DS -->
    <!-- <v-row -->
    <!--   v-for="condition in targetReportConditions" -->
    <!--   :key="condition" -->
    <!--   no-gutters -->
    <!--   class="conditionRow w-100 d-flex align-center mt-5" -->
    <!-- > -->
    <!-- KSD V001.000 DE -->
    <!-- KSD V001.000 AS -->
    <v-row
      class="mb-30"
      v-for="condition in targetReportConditions"
      :key="condition"
    >
      <!-- KSD V001.000 AE -->
      <!-- 店舗 -->
      <template v-if="condition === 'store'">
        <!-- KSD V001.000 DS -->
        <!-- <v-col -->
        <!--   cols="2" -->
        <!--   class="h-100"> -->
        <!--   <label -->
        <!--     for="targetStores" -->
        <!--     class="grayFrame h-100 w-100 d-flex justify-center align-center" -->
        <!--   > -->
        <!--     {{ "店舗" }} -->
        <!--   </label> -->
        <!-- </v-col> -->
        <!-- <v-col -->
        <!--   cols="7" -->
        <!--   class="h-100 d-flex align-center"> -->
        <!--   <\\!-- G001.00.0 Update-Start --\\> -->
        <!--   <\\!-- <store-select multiple v-model="targetStoreCodes" /> --\\> -->
        <!--   <\\!-- <store-select multiple v-model="targetStoreCodes" headquartersAuthorityCheckEnable /> --\\> -->
        <!--   <store-select -->
        <!--     multiple -->
        <!--     v-model="targetStoreCodes" -->
        <!--     ref="storeSelectDlg" -->
        <!--     headquarters-authority-check-enable /> -->
        <!--     <\\!-- G001.00.0 Update-End --\\> -->
        <!-- </v-col> -->
        <!-- KSD V001.000 DE -->
        <!-- KSD V001.000 AS -->
        <v-col
          cols="9"
          class="pa-0">
          <form-group-layout
            :header-cols="3"
            :body-cols="9"
            :title="$t('F32231.S012')"
          >
            <store-select
              multiple
              v-model="request.storeName"
              headquarters-authority-check-enable
              @change="(i) => handleStoreChange(i)" />
          </form-group-layout>
        </v-col>
        <!-- KSD V001.000 AE -->
      </template>

      <!-- レジ番号 -->
      <template v-else-if="condition === 'register'">
        <!-- KSD V001.000 DS -->
        <!-- <v-col -->
        <!--   cols="2" -->
        <!--   class="h-100"> -->
        <!--   <label -->
        <!--     for="targetStores" -->
        <!--     class="grayFrame h-100 w-100 d-flex justify-center align-center" -->
        <!--   > -->
        <!--     {{ "レジ番号" }} -->
        <!--   </label> -->
        <!-- </v-col> -->
        <!-- <v-col -->
        <!--   cols="7" -->
        <!--   class="h-100 d-flex align-center whiteFrame"> -->
        <!--   <input -->
        <!--     type="text" -->
        <!--     id="targetStores" -->
        <!--     class="px-2 h-100 w-100 ellipsis" -->
        <!--     :value="selectedRegisterIdsText" -->
        <!--     disabled -->
        <!--   > -->
        <!--   <v-btn -->
        <!--     class="rightArrowButton mx-2" -->
        <!--     @click="onShowRegisterIdsDialog" -->
        <!--   /> -->
        <!-- </v-col> -->
        <!-- KSD V001.000 DE -->
        <!-- KSD V001.000 AS -->
        <v-col
          cols="9"
          class="pa-0">
          <form-group-layout
            :header-cols="3"
            :body-cols="9"
            :title="$t('F32231.S013')"
          >
            <register-select
              multiple
              :target-store-codes="request.storeName"
              :disabled="request.storeName.length !== 1"
              v-model="request.endpointId"
              :popup="$refs.pop" />
          </form-group-layout>
        </v-col>
        <!-- 店舗計出力 -->
        <v-col
          cols="3"
          class="py-0 d-flex align-center">
          <span class="me-2">{{ $t('F32231.S014') }}</span>
          <checkbox-input
            v-model="request.storeTotalize"
            :disabled="request.storeName.length !== 1" />
        </v-col>
        <!-- KSD V001.000 AE -->
      </template>

      <!-- KSD V001.000 AS -->
      <!-- 商品構成 -->
      <template v-else-if="condition === 'itemStructure'">
        <v-col
          cols="9"
          class="pa-0">
          <form-group-layout
            :header-cols="3"
            :body-cols="5"
            :title="$t('F32231.S016')"
          >
            <select-input
              class="form-control"
              ref="productGroup"
              v-model="request.classificationNo"
              :options="itemStructureOptions"
              :empty-option="false"
              :get-option-value="(option, index) => option.productClassificationNumber"
              :get-option-name="(option, index) => option.productName"
              @selectedStr="(option) => handleProductChange(option)"
            />
          </form-group-layout>
        </v-col>
      </template>

      <!-- PLUコード -->
      <template v-else-if="condition === 'pluCode'">
        <v-col
          cols="9"
          class="pa-0">
          <form-group-layout
            :header-cols="3"
            :body-cols="7"
            :title="$t('F32231.S015')"
          >
            <v-row
              no-gutters
              class="h-100">
              <v-col :class="{'pos-has-error': rangeErrors.pluFrom}">
                <text-input
                  class="h-100 w-60per input-right-align code-pay-input-element form-control"
                  ref="pluFrom"
                  type="text"
                  :placeholder="$t('F32231.S152')"
                  v-model="request.pluCode.from"
                  maxLength="13"
                  numeric
                />
              </v-col>
              <v-col
                cols="auto"
                class="h-100 d-flex align-center">
                <span class="mx-2">{{ $t('F32231.S151') }}</span>
              </v-col>
              <v-col :class="{'pos-has-error': rangeErrors.pluTo}">
                <text-input
                  class="h-100 w-60per input-right-align code-pay-input-element form-control"
                  ref="pluTo"
                  type="text"
                  :placeholder="$t('F32231.S153')"
                  v-model="request.pluCode.to"
                  maxLength="13"
                  numeric
                />
              </v-col>
            </v-row>
          </form-group-layout>
          <v-row
            v-if="errorMsg.plu !== ''"
            class="errorCell left-justify h-30 pl-223"
            no-gutters>
            <td>
              <label class="redText">{{ errorMsg.plu }}</label>
            </td>
          </v-row>
        </v-col>
      </template>

      <!-- 期間タイプ -->
      <template v-else-if="condition === 'durationType'">
        <v-col
          cols="9"
          class="pa-0">
          <form-group-layout
            :header-cols="3"
            :body-cols="8"
            :title="$t('F32231.S017')"
          >
            <radio-button
              v-model="request.duration.type"
              :labels="durationTypeOptions"
              @input="(e) => durationTypeChange(e)"
            />
          </form-group-layout>
        </v-col>
      </template>
      <!-- KSD V001.000 AE -->

      <!-- 期間 -->
      <template v-else-if="condition === 'duration'">
        <!-- KSD V001.000 DS -->
        <!-- <v-col -->
        <!--   cols="2" -->
        <!--   class="h-100"> -->
        <!--   <label -->
        <!--     for="durationFrom" -->
        <!--     class="grayFrame h-100 w-100 d-flex justify-center align-center" -->
        <!--   > -->
        <!--     {{ "期間" }} -->
        <!--   </label> -->
        <!-- </v-col> -->
        <!--  -->
        <!-- <v-col -->
        <!--   cols="2" -->
        <!--   class="h-100 d-flex align-center"> -->
        <!--   <date-input -->
        <!--     format="Y-m-d" -->
        <!--     v-model="durationFrom" -->
        <!--     :disabled-func="disabledDays" /> -->
        <!-- </v-col> -->
        <!--  -->
        <!-- <span class="mx-2">～</span> -->
        <!--  -->
        <!-- <v-col -->
        <!--   cols="2" -->
        <!--   class="h-100 d-flex align-center"> -->
        <!--   <date-input -->
        <!--     format="Y-m-d" -->
        <!--     v-model="durationTo" -->
        <!--     :disabled-func="disabledDays" /> -->
        <!-- </v-col> -->
        <!-- KSD V001.000 DE -->
        <!-- KSD V001.000 AS -->
        <v-col
          cols="9"
          class="pa-0">
          <form-group-layout
            :header-cols="3"
            :body-cols="6"
            :title="$t('F32231.S018')"
          >
            <v-row
              no-gutters
              class="h-100">
              <v-col :class="{'pos-has-error': rangeErrors.durationFrom}">
                <date-input
                  v-if="request.duration.type === 0"
                  ref="durationYMDFrom"
                  format="Y-m-d"
                  @input="(e) => dailyErrorCheck(e, 1)"
                  :min-date="'2000-01'"
                  v-model="request.duration.from"
                  :disabled-func="disabledDays" />
                <text-input
                  v-else-if="request.duration.type === 1"
                  ref="durationYMFrom"
                  class="month-year-input h-100 w-100"
                  :placeholder="$t('F32231.S176')"
                  v-model="request.duration.from"
                  maxLength="7"
                  @input="(e) => inputLimit(e, request, 'duration', 'from', 'yyyy-mm', 7)"
                  type="text" />
                <text-input
                  v-else-if="request.duration.type === 2"
                  ref="durationY"
                  class="month-year-input h-100 w-100"
                  :placeholder="$t('F32231.S177')"
                  v-model="request.duration.from"
                  maxLength="4"
                  type="text"
                  numeric />
              </v-col>
              <v-col
                cols="auto"
                v-if="(request.duration.type === 0) || (request.duration.type === 1)"
                class="h-100 d-flex align-center">
                <span class="mx-2">{{ $t('F32231.S181') }}</span>
              </v-col>
              <v-col :class="{'pos-has-error': rangeErrors.durationTo}">
                <date-input
                  v-if="request.duration.type === 0"
                  ref="durationYMDTo"
                  format="Y-m-d"
                  @input="(e) => dailyErrorCheck(e, 2)"
                  :min-date="'2000-01'"
                  v-model="request.duration.to"
                  :disabled-func="disabledDays" />
                <text-input
                  v-else-if="request.duration.type === 1"
                  ref="durationYMTo"
                  class="month-year-input h-100 w-100"
                  :placeholder="$t('F32231.S176')"
                  v-model="request.duration.to"
                  maxLength="7"
                  @input="(e) => inputLimit(e, request, 'duration', 'to', 'yyyy-mm', 7)"
                  type="text"/>
              </v-col>
            </v-row>
          </form-group-layout>
          <v-row
            v-if="errorMsg.duration !== ''"
            class="errorCell left-justify h-30 pl-223"
            no-gutters>
            <td>
              <label class="redText">{{ errorMsg.duration }}</label>
            </td>
          </v-row>
        </v-col>
        <!-- KSD V001.000 AE -->
      </template>

      <!-- KSD V001.000 AS -->
      <!-- 期間 -->
      <template v-else-if="condition === 'roomReportDuration'">
        <v-col
          cols="9"
          class="pa-0">
          <form-group-layout
            :header-cols="3"
            :body-cols="6"
            :title="$t('F32231.S018')"
            :has-error="errorMsg.roomReportDuration !== ''"
          >
            <v-row
              no-gutters
              class="h-100">
              <v-col>
                <date-input
                  ref="roomReportDurationYMDFrom"
                  format="Y-m-d"
                  :min-date="'2000-01'"
                  @input="(e) => dailyErrorCheck(e, 1)"
                  v-model="request.roomReportDuration.from"
                  :disabled-func="disabledDays" />
              </v-col>
              <v-col
                cols="auto"
                class="h-100 d-flex align-center">
                <span class="mx-2">{{ $t('F32231.S181') }}</span>
              </v-col>
              <v-col>
                <date-input
                  ref="roomReportDurationYMDTo"
                  format="Y-m-d"
                  :min-date="'2000-01'"
                  @input="(e) => dailyErrorCheck(e, 2)"
                  v-model="request.roomReportDuration.to"
                  :disabled-func="disabledDays" />
              </v-col>
            </v-row>
          </form-group-layout>
          <!-- CS KSD V001.000 #84261
          <v-row
            v-if="errorMsg.duration !== ''"
            class="errorCell left-justify h-30 pl-223"
            no-gutters>
            <td>
              <label class="redText">{{ errorMsg.roomReportDuration }}</label>
            </td>
          </v-row>
          -->
          <v-row
            v-if="errorMsg.roomReportDuration !== ''"
            class="errorCell left-justify h-30 pl-223"
            no-gutters>
            <td>
              <label class="redText">{{ errorMsg.roomReportDuration }}</label>
            </td>
          </v-row>
          <!-- CE KSD V001.000 #84261 -->
        </v-col>
      </template>
      <!-- KSD V001.000 AE -->

      <!-- KSD V001.000 DS -->
      <!-- PLU コード -->
      <!-- <template v-else-if="condition === 'plu'"> -->
      <!--   <v-col -->
      <!--     cols="2" -->
      <!--     class="h-100"> -->
      <!--     <label -->
      <!--       for="pluCode" -->
      <!--       class="grayFrame h-100 w-100 d-flex justify-center align-center" -->
      <!--     > -->
      <!--       {{ "PLU コード" }} -->
      <!--     </label> -->
      <!--   </v-col> -->
      <!--   <v-col -->
      <!--     cols="3" -->
      <!--     class="h-100"> -->
      <!--     <input -->
      <!--       type="text" -->
      <!--       id="pluCode" -->
      <!--       class="px-2 whiteFrame h-100 w-100" -->
      <!--       v-model="pluCode" -->
      <!--     > -->
      <!--   </v-col> -->
      <!-- </template> -->
      <!--  -->
      <!-- 責任者番号 -->
      <!-- <template v-else-if="condition === 'responsible'"> -->
      <!--   <v-col -->
      <!--     cols="2" -->
      <!--     class="h-100"> -->
      <!--     <label -->
      <!--       for="responsibleNo" -->
      <!--       class="grayFrame h-100 w-100 d-flex justify-center align-center" -->
      <!--     > -->
      <!--       {{ "責任者番号" }} -->
      <!--     </label> -->
      <!--   </v-col> -->
      <!--   <v-col -->
      <!--     cols="3" -->
      <!--     class="h-100"> -->
      <!--     <input -->
      <!--       type="text" -->
      <!--       id="responsibleNo" -->
      <!--       class="px-2 whiteFrame h-100 w-100" -->
      <!--       v-model="responsibleNo" -->
      <!--     > -->
      <!--   </v-col> -->
      <!-- </template> -->
      <!--  -->
      <!-- 客層コード -->
      <!-- <template v-else-if="condition === 'customers'"> -->
      <!--   <v-col -->
      <!--     cols="2" -->
      <!--     class="h-100"> -->
      <!--     <label -->
      <!--       for="customersCode" -->
      <!--       class="grayFrame h-100 w-100 d-flex justify-center align-center" -->
      <!--     > -->
      <!--       {{ "客層コード" }} -->
      <!--     </label> -->
      <!--   </v-col> -->
      <!--   <v-col -->
      <!--     cols="3" -->
      <!--     class="h-100"> -->
      <!--     <input -->
      <!--       type="text" -->
      <!--       id="customersCode" -->
      <!--       class="px-2 whiteFrame h-100 w-100" -->
      <!--       v-model="customersCode" -->
      <!--     > -->
      <!--   </v-col> -->
      <!-- </template> -->
      <!-- KSD V001.000 DE -->
      <!-- KSD V001.000 AS -->
      <!-- 日付 -->
      <template v-else-if="condition === 'date'">
        <v-col
          cols="9"
          class="pa-0">
          <form-group-layout
            :header-cols="3"
            :body-cols="3"
            :title="$t('F32231.S019')"
          >
            <date-input
              format="Y-m-d"
              v-model="request.singleDate"
              :min-date="'2000-01'"
              :disabled-func="disabledDays" />
          </form-group-layout>
        </v-col>
      </template>

      <!-- 時間帯 -->
      <template v-else-if="condition === 'groupHourZone'">
        <v-col
          cols="9"
          class="pa-0">
          <form-group-layout
            :header-cols="3"
            :body-cols="6"
            :title="$t('F32231.S020')"
          >
            <v-row
              no-gutters
              class="h-100">
              <v-col>
                <select-input
                  class="form-control"
                  :empty-option="false"
                  :options="hourZoneOptions"
                  format="Y-m-d"
                  :placeholder="$t('F32231.S176')"
                  :disabled="request.detailOutput===1"
                  @input="checkDisableGroupHourZone"
                  v-model="request.groupHourZoneDuration.from" />
              </v-col>
              <v-col
                cols="auto"
                class="h-100 d-flex align-center">
                <span class="mx-2">{{ $t('F32231.S201') }}</span>
              </v-col>
              <v-col>
                <select-input
                  class="form-control"
                  :empty-option="false"
                  :options="hourZoneOptions"
                  format="Y-m-d"
                  :placeholder="$t('F32231.S177')"
                  :disabled="request.detailOutput===1"
                  @input="checkDisableGroupHourZone"
                  v-model="request.groupHourZoneDuration.to" />
              </v-col>
            </v-row>
          </form-group-layout>
        </v-col>
      </template>

      <!-- 時間帯 -->
      <template v-else-if="condition === 'hourZone'">
        <v-col
          cols="9"
          class="pa-0">
          <form-group-layout
            :header-cols="3"
            :body-cols="6"
            :title="$t('F32231.S020')"
          >
            <v-row
              no-gutters
              class="h-100">
              <v-col>
                <select-input
                  class="form-control"
                  :empty-option="false"
                  :options="hourZoneOptions"
                  format="Y-m-d"
                  :placeholder="$t('F32231.S176')"
                  @input="checkDisableHourZone"
                  v-model="request.hourZoneDuration.from" />
              </v-col>
              <v-col
                cols="auto"
                class="h-100 d-flex align-center">
                <span class="mx-2">{{ $t('F32231.S201') }}</span>
              </v-col>
              <v-col>
                <select-input
                  class="form-control"
                  :empty-option="false"
                  :options="hourZoneOptions"
                  format="Y-m-d"
                  :placeholder="$t('F32231.S177')"
                  @input="checkDisableHourZone"
                  v-model="request.hourZoneDuration.to" />
              </v-col>
            </v-row>
          </form-group-layout>
        </v-col>
      </template>

      <!-- 明細出力 -->
      <template v-else-if="condition === 'detailedOutput'">
        <v-col
          cols="9"
          class="pa-0">
          <form-group-layout
            :header-cols="3"
            :body-cols="8"
            :title="$t('F32231.S021')"
          >
            <radio-button
              v-model="request.detailOutput"
              :labels="detailedOutputOptions"
              @input="(e) => detailedOutputChange(e)"
            />
          </form-group-layout>
        </v-col>
      </template>

      <!-- 時間明細 -->
      <template v-else-if="condition === 'timeDetail'">
        <v-col
          cols="9"
          class="pa-0 mw-52per">
          <form-group-layout
            fixed-header
            :header-width="181"
            :title="$t('F32231.S022')"
          >
            <radio-button
              v-model="request.timeDetail"
              :labels="timeDetailOptions"
            />
          </form-group-layout>
        </v-col>
      </template>

      <!-- 売上 -->
      <template v-else-if="condition === 'sales'">
        <v-col
          class="pa-0 mw-94per">
          <form-group-layout
            fixed-header
            :header-width="181"
            :title="$t('F32231.S023')"
          >
            <radio-button
              v-model="request.sale"
              :labels="saleOptions"
            />
          </form-group-layout>
        </v-col>
      </template>

      <!-- 集計時間 -->
      <template v-else-if="condition === 'aggregationTime'">
        <v-col
          cols="9"
          class="pa-0">
          <form-group-layout
            :header-cols="3"
            :body-cols="6"
            :title="$t('F32231.S024')"
          >
            <radio-button
              v-model="request.aggregateTime"
              :labels="aggregateTimeOptions"
            />
          </form-group-layout>
        </v-col>
      </template>

      <!-- 券種コード -->
      <template v-else-if="condition === 'ticketCode'">
        <v-col
          cols="9"
          class="pa-0">
          <form-group-layout
            :header-cols="3"
            :body-cols="6"
            :title="$t('F32231.S025')"
          >
            <v-row
              no-gutters
              class="h-100">
              <v-col :class="{'pos-has-error': rangeErrors.codeDurationFrom}">
                <text-input
                  class="h-100 w-60per input-right-align code-pay-input-element form-control"
                  ref="codeDurationFrom"
                  type="text"
                  maxLength="3"
                  :placeholder="$t('F32231.S252')"
                  v-model="request.codeDuration.from"
                  numeric
                />
              </v-col>
              <v-col
                cols="auto"
                class="h-100 d-flex align-center">
                <span class="mx-2">{{ $t('F32231.S251') }}</span>
              </v-col>
              <v-col :class="{'pos-has-error': rangeErrors.codeDurationTo}">
                <text-input
                  class="h-100 w-60per input-right-align code-pay-input-element form-control"
                  ref="codeDurationTo"
                  type="text"
                  maxLength="3"
                  :placeholder="$t('F32231.S253')"
                  v-model="request.codeDuration.to"
                  numeric
                />
              </v-col>
            </v-row>
          </form-group-layout>
          <v-row
            v-if="errorMsg.codeDuration !== ''"
            class="errorCell left-justify h-30 pl-223"
            no-gutters>
            <td>
              <label class="redText">{{ errorMsg.codeDuration }}</label>
            </td>
          </v-row>
        </v-col>
      </template>

      <!-- 部屋No -->
      <template v-else-if="condition === 'roomNo'">
        <v-col
          cols="9"
          class="pa-0">
          <form-group-layout
            :header-cols="3"
            :body-cols="9"
            :title="$t('F32231.S026')"
          >
            <room-select
              v-model="request.roomNo"
              :room-data-list="masterRooms"
              :disabled="request.storeName.length !== 1"
              is-disabled-empty
              :room-codes="request.roomNo"
              is-room-no
              :store-codes="request.storeName"
              multiple
              @globalError="(response) => globalErrorMapping(response)"
              @catchError="roomNoCatchError()"
              ref="roomSelectDialog"
            />
          </form-group-layout>
        </v-col>
      </template>
      <!-- KSD V001.000 AE -->
    </v-row>

    <!-- その他ダイアログ等 -->
    <v-row>
      <v-col>
        <!-- KSD V001.000 DS -->
        <!-- !-- G002.00.0 Update-Add -- -->
        <!-- !-- <maint-button -->
        <!--   @close="backToMenu" -->
        <!--   @output="goToOutput" -->
        <!--   :isoutput-btn="targetReport === -1 || !permissions.includes('CLOUDPOS_REPORT_OTHER_1')" -->
        <!-- /> -- -->
        <!-- <maint-button -->
        <!--   @close="backToMenu" -->
        <!--   @output="goToOutput" -->
        <!--   :isoutput-btn="targetReport === -1 || !permissions.includes('CLOUDPOS_REPORT_OTHER_1') || durationFrom == '' || durationTo == ''" -->
        <!-- /> -->
        <!-- !-- G002.00.0 Update-End -- -->
        <!-- KSD V001.000 DE -->
        <maint-button
          @close="backToMenu"
          @output="goToOutput"
          :isoutput-btn="request.reportName === null || request.reportName === '' || !permissions.includes('CLOUDPOS_REPORT_OTHER_1') || ((request.reportName === 'GROUP') && !request.classificationNo) || ((targetReportConditions.includes('hourZone') && hourZoneDisableBtn) || (targetReportConditions.includes('groupHourZone')) && groupHourZoneDisableBtn) || (targetReportConditions.includes('itemStructure') && productDisableBtn)"
        />
      </v-col>
    </v-row>
    <popup ref="pop"/>
    <dialog-store-select ref="dialogStoreSelect" />
    <!-- KSD V001.000 DS -->
    <!-- <popup ref="pop" /> -->
    <!-- <dialog-register-select -->
    <!--   title="レジ番号選択" -->
    <!--   v-model="registerSelectDisplayed" -->
    <!--   :register-ids="availableRegisterIds" -->
    <!--   :available-register-ids="availableRegisterIds" -->
    <!--   :selected-register-ids="selectedRegisterIds" -->
    <!--   @clickOk="selectedRegisterIds = $event" -->
    <!-- /> -->
    <!--  -->
    <!-- <dialog-store-select ref="dialogStoreSelect" /> -->
    <!-- KSD V001.000 DE -->
  </v-container>
</template>
