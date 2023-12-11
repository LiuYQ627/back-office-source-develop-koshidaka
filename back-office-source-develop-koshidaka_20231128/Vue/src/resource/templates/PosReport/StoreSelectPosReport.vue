<style src="@/resource/static/css/CommonDesign/utils.css" />
<script type="text/javascript" src="@/resource/static/js/PosReport/storeSelectposReport.js" />

<template>
  <div
    class="h-100 w-100 d-flex align-center"
    :class="disabled ? 'lightgrayFrame' : 'whiteFrame'"
  >
    <input
      type="text"
      class="px-2 h-100 w-100 ellipsis"
      :value="storesText"
      disabled
    >
    <!-- <v-btn v-if="!disabled" class="rightArrowButton mx-2" @click="openDialog" /> -->
    <v-btn
      v-if="!disabled"
      class="rightArrowButton mx-2"
      @click="openDialog"
      :disabled="headquartersAuthority != 1" />
    <!-- <dialog-store-select
      ref="dialogStoreSelect"
      @clickSubmit="$emit('change', $event)"
    /> -->
    <dialog-store-select
      ref="dialogStoreSelect"
      @clickSubmit="$emit('change', $event)"
      @back="$emit('change', $event, true)"
    />
  </div>
</template>
