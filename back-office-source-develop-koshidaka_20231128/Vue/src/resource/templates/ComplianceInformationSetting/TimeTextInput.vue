<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/ComplianceInformationSetting/timeTextInput.css" />
<script type="text/javascript" src="@/resource/static/js/ComplianceInformationSetting/timeTextInput.js"/>
<template>
  <input type="text"
    ref="timeTextInput"
    v-model="time"
    class="h-100 w-100 text-center editTextBox"
    :class="{ 'errorTextBox': invalidTime }"
    :maxlength="maxInput"
    tabindex="0"
    @blur="handleBlur"
    @focus="handleFocus"
  />
</template>
<!-- KSD V001.000 AE -->
