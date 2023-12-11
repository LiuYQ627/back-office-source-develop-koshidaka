<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/CommonDesign/utils.css" />
<style scoped src="@/resource/static/css/PriceListDisplayMasterSetting/priceListDisplayMasterSettingForm.css" />
<script type="text/javascript" src="@/resource/static/js/PriceListDisplayMasterSetting/priceListDisplayMasterSettingForm.js" />
<template>
  <div :class="{'disabled': disabled}">
    <!-- 料金表表示No -->
    <form-group-layout
      class="immutable mb-15"
      :header-cols="4"
      :body-cols="6"
      :title="this.$i18n.t('C00224.S008')"
      :has-error="hasError('indexNo')"
      :error-text="errorText('indexNo')">
      <text-input
        type="number"
        class="form-control"
        min="0"
        max="300"
        maxlength="3"
        v-model="dataModel.indexNo"
        @input="handleFormInput"
        disabled
      />
    </form-group-layout>
    <!-- 料金表コース名称 -->
    <form-group-layout
      style="padding-right: 0px"
      :class="{
        'mb-15': !hasError('priceList.priceCourseName'),
        'mb-0': hasError('priceList.priceCourseName')
      }"
      :header-cols="4"
      :body-cols="6"
      :title="this.$i18n.t('C00224.S005')"
      :has-error="hasError('priceList.priceCourseName')"
      :error-text="errorText('priceList.priceCourseName')"
      :error-padding="'padding: 5px 90px 15px 0;'"
      left-spacing='194px'>
      <text-input
        type="text"
        class="form-control"
        :placeholder="this.$i18n.t('C00224.S036')"
        v-model="dataModel.priceList.priceCourseName"
        maxlength="16"
        :max-byte-length="16"
        @input="handleFormInput"
        :disabled="disabled"
        :tabindex="!disabled ? 0 : -1"
      />
    </form-group-layout>
    <!-- コース選択 -->
    <form-group-layout
      :class="{
        'mb-15': !hasError('priceList.payType'),
        'mb-0': hasError('priceList.payType')
      }"
      :header-cols="4"
      :body-cols="6"
      :title="this.$i18n.t('C00224.S009')"
      :has-error="hasError('priceList.chargeCode')"
      :error-text="errorText('priceList.chargeCode')"
      :error-padding="'padding: 5px 90px 15px 0;'"
      left-spacing='194px'>
      <select
        class="border-thin h-100 w-100 SelectBox"
        :class="!disabled ? 'whiteFrame' : 'light-gray-frame'"
        v-model="dataModel.priceList.chargeCode"
        :tabindex="!disabled ? 0 : -1"
        style="padding: 0px 2px 0px 5px !important;">
        <option
          v-for="cc in chargeCodeList"
          :key="cc.chargeCode"
          :value="cc.chargeCode"
        > {{ cc.chargeCode }}{{ $t("C00224.S038") }}{{ cc.roomCourseName }}
        </option>
      </select>
      <div :class="!disabled ? 'pulldownArrow' : ''" />
    </form-group-layout>
    <!-- コース表示位置 -->
    <form-group-layout
      :class="{
        'mb-15': !hasError('priceList.courseDispPos'),
        'mb-0': hasError('priceList.courseDispPos')
      }"
      :header-cols="4"
      :body-cols="5"
      :title="this.$i18n.t('C00224.S010')"
      :has-error="hasError('priceList.courseDispPos') || !courseDispPosOK"
      :error-text="courseDispPosErrorMsg ? courseDispPosErrorMsg : errorText('priceList.courseDispPos')"
      :error-padding="'padding: 5px 90px 15px 0;'"
      left-spacing='194px'>
      <text-input
        type="number"
        class="form-control"
        min="1"
        max="20"
        maxlength="2"
        :placeholder="this.$i18n.t('C00224.S037')"
        v-model="dataModel.priceList.courseDispPos"
        @input="handleFormInput"
        :disabled="disabled"
        :tabindex="!disabled ? 0 : -1"
      />
    </form-group-layout>
    <!-- 料金表示位置 -->
    <form-group-layout
      :class="{
        'mb-15': !hasError('priceList.priceDispPos'),
        'mb-0': hasError('priceList.priceDispPos')
      }"
      :header-cols="4"
      :body-cols="6"
      :title="this.$i18n.t('C00224.S011')"
      :has-error="hasError('priceList.priceDispPos') || !priceDispPosSettingOK || !priceDispPosNoSettingOK"
      :error-text="priceDispPosErrorMsg !== '' ? priceDispPosErrorMsg : errorText('priceList.priceDispPos')"
      :error-padding="'padding: 5px 90px 15px 0;'"
      left-spacing='194px'>
      <select
        class="border-thin h-100 w-100 SelectBox"
        :class="!disabled ? 'whiteFrame' : 'light-gray-frame'"
        v-model="dataModel.priceList.priceDispPos"
        :tabindex=" !disabled ? 0 : -1"
        style="padding: 0px 2px 0px 5px !important;"
      >
        <option
          v-for="priceDispPos in priceDispPosList"
          :key="priceDispPos.code"
          :value="priceDispPos.code"
        > {{ priceDispPos.name }}
        </option>
      </select>
      <div :class="!disabled ? 'pulldownArrow' : ''" />
    </form-group-layout>
    <!-- 表示開始日 -->
    <form-group-layout
      :class="{
        'mb-15': !hasError('priceList.startDate'),
        'mb-0': hasError('priceList.startDate')
      }"
      :header-cols="4"
      :body-cols="6"
      :title="this.$i18n.t('C00224.S006')"
      :has-error="hasError('priceList.startDate')"
      :error-text="errorText('priceList.startDate')"
      left-spacing='194px'>
      <date-input
        class="form-control"
        @input="handleFormInput"
        v-model="dataModel.priceList.startDate"
        :disabled="disabled"
        :tabindex="!disabled ? 0 : -1"
      />
    </form-group-layout>
    <!-- 表示終了日 -->
    <form-group-layout
      :class="{
        'mb-15': !hasError('priceList.endDate'),
        'mb-0': hasError('priceList.endDate')
      }"
      :header-cols="4"
      :body-cols="6"
      :title="this.$i18n.t('C00224.S007')"
      :has-error="hasError('priceList.endDate') || !endDateOK"
      :error-text="endDateErrorMsg ? endDateErrorMsg : errorText('priceList.endDate')"
      :error-padding="'padding: 5px 90px 15px 0;'"
      left-spacing='194px'>
      <date-input
        class="form-control"
        @input="handleFormInput"
        :disabled="disabled"
        v-model="dataModel.priceList.endDate"
        :tabindex="!disabled ? 0 : -1"
      />
    </form-group-layout>

    <popup ref="pop" />
  </div>
</template>
<!-- KSD V001.000 AE -->
