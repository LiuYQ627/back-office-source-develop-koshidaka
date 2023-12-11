<style scoped src="@/resource/static/css/CommonDesign/utils.css" />
<style scoped src="@/resource/static/css/CommonInput/radioButton.css" />
<script type="text/javascript" src="@/resource/static/js/BarcodeSetting/radioButton.js" />

<!--
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20221213  zhaomingyue(Neusoft) G001.00.0  issue課題#1198,#1199を対応します.
-->

<template>
  <v-row
    no-gutters
    class="whiteFrame h-100 w-100 d-flex align-center">
    <v-col
      v-for="label in labels"
      :key="label.value"
      class="h-100 pa-1">
      <button
        type="button"
        class="radioButton h-100 w-100 d-flex justify-center align-center"
        :class="{ checked: label.value === value }"
        @click="$emit('input', label.value)"
        :disabled="disabled"
      >
        {{ label.name }}
      </button>
    </v-col>
  </v-row>
</template>
