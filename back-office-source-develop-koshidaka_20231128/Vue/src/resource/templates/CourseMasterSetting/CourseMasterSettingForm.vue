<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/CommonDesign/utils.css" />
<style scoped src="@/resource/static/css/CourseMasterSetting/courseMasterSettingForm.css" />
<script type="text/javascript" src="@/resource/static/js/CourseMasterSetting/courseMasterSettingForm.js" />
<template>
  <div :class="{'disabled': disabled}">
    <!-- 料金コード -->
    <form-group-layout
      class="immutable mb-15"
      :headerCols="5"
      :bodyCols="5"
      :title="this.$i18n.t('C00215.S008')"
      :hasError="hasError('indexNo')"
      :errorText="errorText('indexNo')">
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
    <!-- コース名称 -->
    <form-group-layout
      style="padding-right: 0px"
      :class="{
        'mb-15': !hasError('course.roomCourseName'),
        'mb-0': hasError('course.roomCourseName')
      }"
      :headerCols="5"
      :bodyCols="5"
      :title="this.$i18n.t('C00215.S009')"
      :hasError="hasError('course.roomCourseName')"
      :errorText="errorText('course.roomCourseName')"
      :errorPadding="'padding: 5px 90px 15px 0;'"
      leftSpacing='238px'>
      <text-input
        type="text"
        class="form-control"
        :placeholder="this.$i18n.t('C00215.S040')"
        v-model="dataModel.course.roomCourseName"
        maxlength="16"
        :maxByteLength="16"
        @input="handleFormInput"
        :disabled="disabled"
        :tabindex="!disabled ? 0 : -1"
      />
    </form-group-layout>
    <!-- コース略称 -->
    <form-group-layout
      :class="{
          'mb-15': !hasError('course.roomCourseShortName'),
          'mb-0': hasError('course.roomCourseShortName')
      }"
      :headerCols="5"
      :bodyCols="5"
      :title="this.$i18n.t('C00215.S010')"
      :hasError="hasError('course.roomCourseShortName')"
      :errorText="errorText('course.roomCourseShortName')"
      :errorPadding="'padding: 5px 90px 15px 0;'"
      leftSpacing='238px'>
      <text-input
        type="text"
        class="form-control"
        :placeholder="this.$i18n.t('C00215.S041')"
        maxlength="8"
        :maxByteLength="8"
        v-model="dataModel.course.roomCourseShortName"
        @input="handleFormInput"
        :disabled="disabled"
        :tabindex="!disabled ? 0 : -1"
      />
    </form-group-layout>
    <!-- 課金体系 -->
    <form-group-layout
      :class="{
          'mb-15': !hasError('course.payType'),
          'mb-0': hasError('course.payType')
      }"
      :headerCols="5"
      :bodyCols="5"
      :title="this.$i18n.t('C00215.S011')"
      :hasError="hasError('course.payType')"
      :errorText="errorText('course.payType')"
      :errorPadding="'padding: 5px 90px 15px 0;'"
      leftSpacing='238px'>
      <select class="border-thin h-100 w-100 SelectBox" :class="!disabled ? 'whiteFrame' : 'lightgrayFrame'"
      v-model="dataModel.course.payType" :tabindex="!disabled ? 0 : -1" style="padding: 0px 2px 0px 5px !important;">
        <option v-for="pay in payTypeList"
        :key="pay.code" :value="pay.code"
        > {{ pay.name }}
        </option>
      </select>
      <div :class="!disabled ? 'pulldownArrow' : ''" />
    </form-group-layout>
    <!-- 最低利用人数 -->
    <form-group-layout
      :class="{
          'mb-15': !hasError('course.minUserCount'),
          'mb-0': hasError('course.minUserCount')
      }"
      :headerCols="5"
      :bodyCols="4"
      :title="this.$i18n.t('C00215.S012')"
      :hasError="hasError('course.minUserCount')"
      :errorText="errorText('course.minUserCount')"
      :errorPadding="'padding: 5px 90px 15px 0;'"
      leftSpacing='238px'>
      <text-input
        type="number"
        class="form-control"
        min="1"
        max="99"
        maxlength="2"
        :placeholder="this.$i18n.t('C00215.S042')"
        v-model="dataModel.course.minUserCount"
        @input="handleFormInput"
        :disabled="disabled"
        :tabindex="!disabled ? 0 : -1"
      />
    </form-group-layout>
    <!-- 最大利用時間 -->
    <form-group-layout
      :class="{
          'mb-15': !hasError('course.maxUseTime'),
          'mb-0': hasError('course.maxUseTime')
      }"
      :headerCols="5"
      :bodyCols="5"
      :title="this.$i18n.t('C00215.S013')"
      :hasError="hasError('course.maxUseTime') || !payTypeMaxUseTimeOK"
      :errorText="errorText('course.maxUseTime')"
      leftSpacing='238px'>
      <select class="border-thin h-100 w-100 SelectBox" :class="!disabled ? 'whiteFrame' : 'lightgrayFrame'"
      v-model="dataModel.course.maxUseTime" :tabindex=" !disabled ? 0 : -1" style="padding: 0px 2px 0px 5px !important;"
      >
        <option v-for="maxTime in maxUseTimeList"
        :key="maxTime.code" :value="maxTime.code"
        > {{ maxTime.name }}
        </option>
      </select>
      <div :class="!disabled ? 'pulldownArrow' : ''" />
    </form-group-layout>
    <!-- 会員フラグ -->
    <form-group-layout
      :class="{
          'mb-15': !hasError('course.memberFlag'),
          'mb-0': hasError('course.memberFlag')
      }"
      :headerCols="5"
      :bodyCols="5"
      :title="this.$i18n.t('C00215.S014')"
      :hasError="hasError('course.memberFlag')"
      :errorText="errorText('course.memberFlag')"
      leftSpacing='238px'>
      <select class="border-thin h-100 w-100 SelectBox" :class="!disabled ? 'whiteFrame' : 'lightgrayFrame'"
      v-model="dataModel.course.memberFlag" :tabindex=" !disabled ? 0 : -1" style="padding: 0px 2px 0px 5px !important;"
      >
        <option v-for="member in memberFlagList"
        :key="member.code" :value="member.code"
        > {{ member.name }}
        </option>
      </select>
      <div :class="!disabled ? 'pulldownArrow' : ''" />
    </form-group-layout>
    <!-- セルフ表示オプション -->
    <form-group-layout
      :class="{
          'mb-15': !hasError('course.dispDrinkCourseNo'),
          'mb-0': hasError('course.dispDrinkCourseNo')
      }"
      :headerCols="5"
      :bodyCols="5"
      :title="this.$i18n.t('C00215.S015')"
      :hasError="hasError('course.dispDrinkCourseNo')"
      :errorText="errorText('course.dispDrinkCourseNo')"
      leftSpacing='238px'>
      <div class="selectStoreContentStyle form-inline" style="width: 100%; margin-left: 0px; height: 50px;">
        <span class="border-thin storeSelectSpan SelectBox" :class="!disabled ? 'whiteFrame' : 'lightgrayFrame'" style="width: 100%; margin-left: 0px; height: 50px;
        display: flex; align-items: center;">
          <input type="text" class="pa-0 text-wrap storeNameText" style="width: 80%;" ref="targetStoreText" v-model="targetStoreText" :disabled="true"/>
          <div :class="!disabled ? 'buttomLabel' : ''">
            <v-btn :tabindex=" !disabled ? 0 : -1" :class="disabled ? 'transparent' : ''" style="width: 28px; height: 40px;" id="storeSelectBtn" @click="dialogSelect">
              <span :class="!disabled ? 'rightArrow2' : ''"/>
            </v-btn>
          </div>
        </span>
      </div>
    </form-group-layout>
    <!-- 適用開始日 -->
    <form-group-layout
      :class="{
          'mb-15': !hasError('course.startDate'),
          'mb-0': hasError('course.startDate')
      }"
      :headerCols="5"
      :bodyCols="5"
      :title="this.$i18n.t('C00215.S016')"
      :hasError="hasError('course.startDate')"
      :errorText="errorText('course.startDate')"
      leftSpacing='238px'>
      <date-input
        class="form-control"
        @input="handleFormInput"
        v-model="dataModel.course.startDate"
        :disabled="disabled"
        :tabindex="!disabled ? 0 : -1"
      />
    </form-group-layout>
    <!-- 適用終了日 -->
    <form-group-layout
      :class="{
          'mb-15': !hasError('course.endDate'),
          'mb-0': hasError('course.endDate')
      }"
      :headerCols="5"
      :bodyCols="5"
      :title="this.$i18n.t('C00215.S017')"
      :hasError="hasError('course.endDate') || !endDateOK"
      :errorText="errorText('course.endDate')"
      :errorPadding="'padding: 5px 90px 15px 0;'"
      leftSpacing='238px'>
      <date-input
        class="form-control"
        @input="handleFormInput"
        :disabled="disabled"
        v-model="dataModel.course.endDate"
        :tabindex="!disabled ? 0 : -1"
      />
    </form-group-layout>
    <!-- コースボタン表示位置 -->
    <form-group-layout
      :class="{
          'mb-15': !hasError('course.selfDispPosition'),
          'mb-0': hasError('course.selfDispPosition')
      }"
      :headerCols="5"
      :bodyCols="4"
      :title="this.$i18n.t('C00215.S018')"
      :hasError="hasError('course.selfDispPosition')"
      :errorText="errorText('course.selfDispPosition')"
      :errorPadding="'padding: 5px 90px 15px 0;'"
      leftSpacing='238px'>
      <text-input
        type="number"
        class="form-control"
        min="1"
        max="999"
        maxlength="3"
        :placeholder="this.$i18n.t('C00215.S043')"
        v-model="dataModel.course.selfDispPosition"
        @input="handleFormInput"
        :disabled="disabled"
        :tabindex=" !disabled ? 0 : -1"
      />
    </form-group-layout>
    <!-- コース説明設定 -->
    <form-group-layout
      :headerCols="5"
      :bodyCols="3"
      :title="this.$i18n.t('C00215.S019')"
      leftSpacing='238px'>
      <div :class="!disabled ? 'whiteFrame' : 'lightgrayFrame'">
        <v-btn :class="disabled ? 'transparentBtn noChild' : 'btnBlue'" class="button footerButtonStyle" @click="dialogImageUpload" :tabindex="!disabled ? 0 : -1">
            {{ $t('C00215.S045') }}
        </v-btn>
      </div>
    </form-group-layout>
  <common-select-dialog ref="commonSelectDialog" :tableLeftUpperLabel="this.$i18n.t('C00215.S053')" :tableRightUpperLabel="this.$i18n.t('C00215.S054')"
  :tableHeaderTitle="this.$i18n.t('C00215.S052')" :tableLeftFirstTitle="this.$i18n.t('C00215.S050')" :tableLeftSecondTitle="this.$i18n.t('C00215.S051')"
  :tableRightFirstTitle="this.$i18n.t('C00215.S050')" :tableRightSecondTitle="this.$i18n.t('C00215.S051')"
  v-on:clickSubmit="storeSelectOk"/>
  <dialog-image-upload ref="dialogImageUpload" :tableHeaderTitle="this.$i18n.t('C00215.S019')" @dataImage="imageUploadOk"
  :nodeIds="nodeIds"/>
  <popup ref="pop" />
  </div>
</template>
<!-- KSD V001.000 AE -->
