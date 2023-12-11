<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/RoomInfoSubSetting/timeTextInput.css" />
<script type="text/javascript" src="@/resource/static/js/RoomInfoSubSetting/timeTextInput.js"/>

<template>
  <input type="text"
    ref="timeTextInput"
    v-model="time"
    class="h-100 w-100 text-center editTextBox"
    :class="{ 'errorTextBox': invalidTime, 'readOnlyText' : disabled }"
    :maxlength="maxInput"
    tabindex="0"
    @blur="handleBlur"
    @focus="handleFocus"
    :disabled="disabled"
  />
</template>
<!-- KSD V001.000 AE -->
