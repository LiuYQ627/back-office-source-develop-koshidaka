<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/CommonInput/textInput.css" />
<script type="text/javascript" src="@/resource/static/js/CommonInput/textInput.js" />
<template>
  <input
    id="inputId"
    v-if="!multiline"
    class="common-text-input"
    :value="dataModel"
    @input="handleInput"
    @compositionstart="handleInput"
    @compositionend="handleInput"
    @focusout="handleFocusout"
    :disabled="disabled"
  >
  <textarea
    v-else
    class="common-text-input"
    :value="dataModel"
    @input="handleInput"
    @compositionstart="handleInput"
    @compositionend="handleInput"
    @focusout="handleFocusout"
    :disabled="disabled" />
</template>
<!-- KSD V001.000 AE -->
