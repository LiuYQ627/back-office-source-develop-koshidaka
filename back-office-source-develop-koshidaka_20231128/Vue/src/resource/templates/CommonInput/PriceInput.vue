<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/CommonInput/priceInput.css" />
<script type="text/javascript" src="@/resource/static/js/CommonInput/priceInput.js" />
<template>
  <div class="price-input">
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
      :minlength="minInputDigits"
      :maxlength="maxInputDigits" >
  </div>
</template>
<!-- KSD V001.000 AE -->
