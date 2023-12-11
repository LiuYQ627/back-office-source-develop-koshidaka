<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/CommonDesign/utils.css" />
<style scoped src="@/resource/static/css/PriceListDisplayMasterSetting/priceListDisplayMasterSettingDefaultDisplay.css" />
<script type="text/javascript" src="@/resource/static/js/PriceListDisplayMasterSetting/priceListDisplayMasterSettingDefaultDisplay.js" />
<template>
  <div :class="{'disabled': disabled}">
    <form-group-layout
      class="mb-15"
      :header-cols="2"
      :body-cols="3"
      :title="this.$i18n.t('C00224.S024')"
      left-spacing='238px'>
      <select
        class="border-thin h-100 w-100 SelectBox"
        :class="!disabled ? 'whiteFrame' : 'light-gray-frame'"
        v-model="defaultListData.memberPrice"
        :tabindex="!disabled ? 0 : -1"
        style="padding: 0px 2px 0px 5px !important;">
        <option
          v-for="memberPrice in memberPriceList"
          :key="memberPrice.code"
          :value="memberPrice.code"
        > {{ memberPrice.name }}
        </option>
      </select>
      <div :class="!disabled ? 'pulldownArrow' : ''" />
    </form-group-layout>

    <form-group-layout
      class="mb-15"
      :header-cols="2"
      :body-cols="3"
      :title="this.$i18n.t('C00224.S025')"
      left-spacing='238px'>
      <select
        class="border-thin h-100 w-100 SelectBox"
        :class="!disabled ? 'whiteFrame' : 'light-gray-frame'"
        v-model="defaultListData.ageDivisionCode"
        :tabindex="!disabled ? 0 : -1"
        style="padding: 0px 2px 0px 5px !important;">
        <option
          v-for="ageDivisionCode in ageDivisionCodeList"
          :key="ageDivisionCode.code"
          :value="ageDivisionCode.code"
        > {{ ageDivisionCode.name }}
        </option>
      </select>
      <div :class="!disabled ? 'pulldownArrow' : ''" />
    </form-group-layout>

    <form-group-layout
      class="mb-15"
      :header-cols="2"
      :body-cols="3"
      :title="this.$i18n.t('C00224.S026')"
      left-spacing='238px'>
      <select
        class="border-thin h-100 w-100 SelectBox"
        :class="!disabled ? 'whiteFrame' : 'light-gray-frame'"
        v-model="defaultListData.countSetting"
        :tabindex="!disabled ? 0 : -1"
        style="padding: 0px 2px 0px 5px !important;">
        <option
          v-for="countSetting in countSettingList"
          :key="countSetting.code"
          :value="countSetting.code"
        > {{ countSetting.name }}
        </option>
      </select>
      <div :class="!disabled ? 'pulldownArrow' : ''" />
    </form-group-layout>

    <form-group-layout
      class="mb-15"
      :header-cols="2"
      :body-cols="3"
      :title="this.$i18n.t('C00224.S027')"
      left-spacing='238px'>
      <select
        class="border-thin h-100 w-100 SelectBox"
        :class="!disabled ? 'whiteFrame' : 'light-gray-frame'"
        v-model="defaultListData.courseNo"
        :tabindex="!disabled ? 0 : -1"
        style="padding: 0px 2px 0px 5px !important;">
        <option
          v-for="courseNo in courseNoList"
          :key="courseNo.code"
          :value="courseNo.code"
        > {{ courseNo.name }}
        </option>
      </select>
      <div :class="!disabled ? 'pulldownArrow' : ''" />
    </form-group-layout>

    <popup ref="pop" />
  </div>
</template>
<!-- KSD V001.000 AE -->
