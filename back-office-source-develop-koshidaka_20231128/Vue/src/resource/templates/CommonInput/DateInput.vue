<style src="@/resource/static/css/CommonDesign/utils.css" />
<script type="text/javascript" src="@/resource/static/js/CommonInput/dateInput.js" />

<template>
  <!-- KSD V001.000 DS -->
  <!-- <div -->
  <!--   class="h-100 w-100 d-flex align-center" -->
  <!--   :class="disabled ? 'lightgrayFrame' : 'whiteFrame'" -->
  <!-- > -->
  <!-- <input -->
  <!--   class="h-100 w-100 mx-2" -->
  <!--   :style="getCustomStyling()" -->
  <!--   type="text" -->
  <!--   v-model="value" -->
  <!--   disabled > -->

  <!--   // タブインデックス設定 -->
  <!-- <img -->
  <!--   v-if="!disabled" -->
  <!--   class="mr-2" -->
  <!--   src="@/assets/ico_calendar_n.png" -->
  <!--   id="calendarImg" -->
  <!--   tabindex="0" -->
  <!--   height="25" -->
  <!--   width="30" -->
  <!--   @click="openDatePickr" -->
  <!--   /> -->

  <!-- <flat-pickr -->
  <!--   tabindex="-1" -->
  <!--   :config="calendarConfig" -->
  <!--   ref="flatPickr" -->
  <!--   :value="calendarDate" -->
  <!-- /> -->
  <!-- </div> -->
  <!-- KSD V001.000 DE -->
  <!-- KSD V001.000 AS -->
  <div
    class="h-100 w-100 d-flex align-center"
    :class="disabled ? 'lightgrayFrame' : 'whiteFrame'"
    :style="{
      width: isFixedInputWidth ? `${inputWidth}px !important` : undefined,
      'max-width': isFixedInputWidth ? `${inputWidth}px !important` : undefined
    }"
  >
    <!--    CS uenoyama 84243-->
    <!--    <input-->
    <!--      class="h-100 w-100 mx-2"-->
    <!--      :style="getCustomStyling()"-->
    <!--      type="text"-->
    <!--      v-model="value"-->
    <!--      disabled >-->
    <input
      class="h-100 w-100 ms-2"
      :style="getCustomStyling()"
      type="text"
      v-model="value"
      disabled >
    <!--    CS uenoyama 84243-->
    <img
      v-if="!disabled"
      class="mr-2"
      src="@/assets/ico_calendar_n.png"
      id="calendarImg"
      :tabindex="tabindex"
      height="25"
      width="30"
      @click="openDatePickr"
      @keypress.enter="openDatePickr"
    >
    <flat-pickr
      tabindex="-1"
      :config="calendarConfig"
      ref="flatPickr"
      :value="calendarDate"
    />
  </div>
  <!-- KSD V001.000 AE -->
</template>
