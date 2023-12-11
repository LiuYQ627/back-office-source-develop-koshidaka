<style src="@/resource/static/css/CommonDesign/utils.css" />
<script type="text/javascript" src="@/resource/static/js/CommonInput/storeSelect.js" />

<!--
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230103  litie(Neusoft)    G001.00.0  issue課題#1058を対応します.
 * 20230522  qinshh(Neusoft)   G002.00.0  issue課題#1392を対応します.
-->

<template>
  <!-- KSD V001.000 US -->
  <!--
  <div
    class="h-100 w-100 d-flex align-center"
    :class="disabled ? 'lightgrayFrame' : 'whiteFrame'"
  >
  -->
  <div
    class="h-100 w-100 d-flex align-center"
    :class="{
      'lightgrayFrame': disabled,
      'whiteFrame': !disabled,
      'store-select-disabled': disabled
    }"
  >
  <!-- KSD V001.000 UE -->
    <input
      type="text"
      class="px-2 h-100 w-100 ellipsis"
      :value="storesText"
      disabled
    >
    <!-- G001.00.0 Update-Start -->
    <!-- <v-btn v-if="!disabled" class="rightArrowButton mx-2" @click="openDialog" /> -->
    <v-btn
      v-if="!disabled"
      class="rightArrowButton mx-2"
      @click="openDialog"
      :disabled="headquartersAuthority != 1" />
    <!-- G001.00.0 Update-End -->
    <!-- G002.00.0 Update-Start -->
    <!-- <dialog-store-select
      ref="dialogStoreSelect"
      @clickSubmit="$emit('change', $event)"
    /> -->
    <dialog-store-select
      ref="dialogStoreSelect"
      @clickSubmit="$emit('change', $event)"
      @back="$emit('change', $event, true)"
    />
    <!-- G002.00.0 Update-End -->
  </div>
</template>
