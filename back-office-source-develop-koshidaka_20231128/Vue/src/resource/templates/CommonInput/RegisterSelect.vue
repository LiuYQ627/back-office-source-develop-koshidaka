<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/CommonDesign/utils.css" />
<script type="text/javascript" src="@/resource/static/js/CommonInput/registerSelect.js" />

<template>
  <div
    class="h-100 w-100 d-flex align-center"
    :class="disabled ? 'lightgrayFrame' : 'whiteFrame'"
  >
    <input
      type="text"
      class="px-2 h-100 w-100 ellipsis"
      :value="valueText"
      disabled
    >
    <v-btn
      class="rightArrowButton mx-2"
      @click="openDialog"
      :disabled="disabled"
    />
    <dialog-register-select
      v-model="isShowDialog"
      :register-ids="masterData"
      :available-register-ids="masterData"
      :selected-register-ids="value"
      @clickOk="$emit('change', $event)"
    />
    <popup ref="pop"/>
  </div>
</template>
<!-- KSD V001.000 AE -->
