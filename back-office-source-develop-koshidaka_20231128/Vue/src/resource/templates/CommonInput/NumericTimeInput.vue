<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/CommonInput/numericTimeInput.css" />
<script type="text/javascript" src="@/resource/static/js/CommonInput/numericTimeInput.js" />
<template>
  <div class="numeric-time-input">
    <input
      type="text"
      :class="{
        'has-error': hasError
      }"
      :value="displayValue"
      :disabled="disabled"
      :readonly="readonly"
      @focus="handleFocus($event)"
      @blur="handleBlur($event)"
      @input="handleInput($event)"
      minlength="0"
      maxlength="4"
    />
  </div>
</template>
<!-- KSD V001.000 AE -->
