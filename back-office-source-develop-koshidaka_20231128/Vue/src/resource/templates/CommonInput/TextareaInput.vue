<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/CommonInput/textareaInput.css" />
<script type="text/javascript" src="@/resource/static/js/CommonInput/textareaInput.js" />
<template>
  <textarea
    class="common-text-input"
    :value="dataModel"
    @input="handleInput"
    :disabled="disabled"
  />
</template>
<!-- KSD V001.000 AE -->
