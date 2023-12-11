<style src="@/resource/static/css/CommonDesign/utils.css" />
<script type="text/javascript" src="@/resource/static/js/CommonInput/TimeInput.js" />

<template>
  <div
    class="h-100 w-100 d-flex align-center"
    :class="disabled ? 'lightgrayFrame' : 'whiteFrame'"
  >
    <input
      class="h-100 w-100 mx-2"
      style="outline: none;"
      type="time"
      v-model="value" >
  </div>
</template>
