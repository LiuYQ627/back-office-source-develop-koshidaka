<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/CommonInput/checkboxInput.css" />
<script type="text/javascript" src="@/resource/static/js/CommonInput/checkboxInput.js" />
<template>
  <div class="checkbox-input">
    <label :class="{ 'has-error': hasError }">
      <input
        type="checkbox"
        v-model="checked"
        :readonly="readonly"
        :disabled="disabled"
        @click="handleClick($event)"
        @focus="handleFocus($event)"
        @blur="handleBlur($event)"
        :tabindex="tabindex"
      >
      <span></span>
      <slot></slot>
    </label>
  </div>
</template>
<!-- KSD V001.000 AE -->
