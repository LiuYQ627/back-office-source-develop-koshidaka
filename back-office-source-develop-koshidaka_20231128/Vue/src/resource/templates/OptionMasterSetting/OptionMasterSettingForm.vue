<!-- KSD V001.000 AS -->
<style src="@/resource/static/css/CommonDesign/utils.css" />
<style scoped src="@/resource/static/css/OptionMasterSetting/optionMasterSettingForm.css" />
<script type="text/javascript" src="@/resource/static/js/OptionMasterSetting/optionMasterSettingForm.js" />
<template>
  <div :class="{'disabled': disabled}">
    <!-- オプションNo -->
    <form-group-layout
      class="immutable"
      style="margin-bottom: 15px;"
      :headerCols="5"
      :bodyCols="5"
      :title="$t('C00217.S006')">
      <text-input
        type="number"
        class="form-control"
        v-model="dataModel.drinkCourseNo"
        disabled
      />
    </form-group-layout>
    <!-- オプション名称 -->
    <form-group-layout
      :style="{'margin-bottom':!hasError('option.drinkCourseName') ? '15px' : '0px'}"
      :headerCols="5"
      :bodyCols="7"
      :title="$t('C00217.S007')"
      :hasError="hasError('option.drinkCourseName')"
      :errorText="errorText('option.drinkCourseName')"
      leftSpacing="240px">
      <text-input
        type="text"
        class="form-control"
        maxlength="20"
        :maxByteLength=20
        :placeholder="$t('C00217.S027')"
        v-model="dataModel.option.drinkCourseName"
        @input="handleFormInput"
        :disabled="disabled"
      />
    </form-group-layout>
    <!-- drinkCourseListChargesName -->
    <form-group-layout
      :style="{'margin-bottom':!hasError('option.drinkCourseListChargesName') ? '15px' : '0px'}"
      :headerCols="5"
      :bodyCols="7"
      :title="$t('C00217.S008')"
      :hasError="hasError('option.drinkCourseListChargesName')"
      :errorText="errorText('option.drinkCourseListChargesName')"
      leftSpacing="240px">
      <text-input
        class="form-control"
        maxlength="20"
        :maxByteLength=20
        :placeholder="$t('C00217.S028')"
        v-model="dataModel.option.drinkCourseListChargesName"
        @input="handleFormInput"
        :disabled="disabled"
      />
    </form-group-layout>
    <!-- オプション体系 -->
    <form-group-layout
        :style="{'margin-bottom':!hasError('option.optionType') ? '15px' : '0px'}"
        :headerCols="5"
        :bodyCols="5"
        :title="this.$i18n.t('C00217.S009')"
        :hasError="hasError('option.optionType')"
        :errorText="errorText('option.optionType')"
        leftSpacing="190px">
        <select-input
          class="form-control"
          v-model="dataModel.option.optionType"
          @input="handleOptionSystemInput"
          :options="optionTypeOptions"
          :emptyOption="false"
          :disabled="disabled"
        />
      </form-group-layout>
    <!-- 課金方法 -->
    <div v-if="[1,2,3,4].includes(Number(dataModel.option.optionType))">
      <form-group-layout
        :style="{'margin-bottom':!hasError('option.priceOption') ? '15px' : '0px'}"
        :headerCols="5"
        :bodyCols="5"
        :title="$t('C00217.S010')"
        :hasError="hasError('option.priceOption')"
        :errorText="errorText('option.priceOption')"
        leftSpacing="240px">
        <select-input
          class="form-control"
          v-model="dataModel.option.priceOption"
          :options="priceOptionOptions"
          :emptyOption="false"
          :disabled="disabled || Number(dataModel.option.optionType) === 1"
        />
      </form-group-layout>
      <!-- メニューコード１ -->
      <form-group-layout
        :style="{'margin-bottom':!hasError('option.drinkCourseMenuCode1') && !hasError('drinkCourseMenuCode1DataModel.exists') ? '15px' : '0px'}"
        :headerCols="5"
        :bodyCols="5"
        :title="$t(dataModel.option.optionType == 1 ? 'C00217.S011': 'C00217.S021')"
        :hasError="hasError('option.drinkCourseMenuCode1') || hasError('drinkCourseMenuCode1DataModel.exists')"
        :errorText="errorText('option.drinkCourseMenuCode1') || errorText('drinkCourseMenuCode1DataModel.exists')"
        leftSpacing="240px">
        <text-input
          type="number"
          class="form-control"
          min="1"
          max="9999999999998"
          maxlength="14"
          :placeholder="$t('C00217.S029')"
          v-model="dataModel.option.drinkCourseMenuCode1"
          @input="handleMenuCodeInput('drinkCourseMenuCode1DataModel',$event)"
          @blur.native="handleBlurEvent('drinkCourseMenuCode1DataModel', 'drinkCourseMenuCode1',$event)"
          :disabled="disabled"
        />
      </form-group-layout>
      <!-- メニュー名称１ -->
      <form-group-layout
        class="immutable"
        style="margin-bottom: 15px"
        :headerCols="5"
        :bodyCols="7"
        :title="$t(dataModel.option.optionType == 1 ? 'C00217.S012': 'C00217.S022')"
        leftSpacing="240px">
        <text-input
          type="text"
          class="form-control"
          v-model="drinkCourseMenuCode1DataModel.name"
          disabled
        />
      </form-group-layout>
      <!-- 金額税抜（税込）１ -->
      <form-group-layout
        class="immutable"
        style="margin-bottom: 15px"
        :headerCols="5"
        :bodyCols="5"
        :title="$t(dataModel.option.optionType == 1 ? 'C00217.S013': 'C00217.S023')"
        leftSpacing="240px">
        <text-input
          type="number"
          class="form-control"
          v-model="drinkCourseMenuCode1DataModel.price"
          disabled
        />
      </form-group-layout>
      <div v-if="[2, 3, 4].includes(Number(dataModel.option.optionType))">
      <!-- メニューコード２ -->
      <form-group-layout
        :style="{'margin-bottom':!hasError('option.drinkCourseMenuCode2') && !hasError('drinkCourseMenuCode2DataModel.exists') ? '15px' : '0px'}"
        :headerCols="5"
        :bodyCols="5"
        :title="$t('C00217.S024')"
        :hasError="hasError('option.drinkCourseMenuCode2') || hasError('drinkCourseMenuCode2DataModel.exists')"
        :errorText="errorText('option.drinkCourseMenuCode2') || errorText('drinkCourseMenuCode2DataModel.exists')"
        leftSpacing="240px">
        <text-input
          type="number"
          class="form-control"
          min="1"
          max="9999999999998"
          maxlength="14"
          :placeholder="$t('C00217.S029')"
          v-model="dataModel.option.drinkCourseMenuCode2"
          @input="handleMenuCodeInput('drinkCourseMenuCode2DataModel', $event)"
          @blur.native="handleBlurEvent('drinkCourseMenuCode2DataModel', 'drinkCourseMenuCode2',$event)"
          :disabled="disabled"
        />
      </form-group-layout>
      <!-- メニュー名称２ -->
      <form-group-layout
        class="immutable"
        style="margin-bottom: 15px"
        :headerCols="5"
        :bodyCols="7"
        :title="$t('C00217.S025')"
        leftSpacing="240px">
        <text-input
          type="text"
          class="form-control"
          v-model="drinkCourseMenuCode2DataModel.name"
          disabled
        />
      </form-group-layout>
      <!-- 金額税抜（税込）２ -->
      <form-group-layout
        class="immutable"
        style="margin-bottom: 15px"
        :headerCols="5"
        :bodyCols="5"
        :title="$t('C00217.S026')"
        leftSpacing="240px">
        <text-input
          type="number"
          class="form-control"
          v-model="drinkCourseMenuCode2DataModel.price"
          disabled
        />
      </form-group-layout>
      </div>
    </div>
    <popup ref="pop" />
  </div>
</template>
<!-- KSD V001.000 AE -->
