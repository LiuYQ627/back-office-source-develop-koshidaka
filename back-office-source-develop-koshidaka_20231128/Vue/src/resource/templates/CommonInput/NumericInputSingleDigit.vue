<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/CommonDesign/utils.css" />
<style scoped src="@/resource/static/css/CommonInput/numericInputSingleDigit.css" />
<script type="text/javascript" src="@/resource/static/js/CommonInput/numericInputSingleDigit.js" />

<template>
  <v-row
    no-gutters
    class="numeric-input-single-digit"
    :style="{'padding-left': `${leftPadding}px`}">
    <v-col class="numeric-input-single-digit-box">
      <input
        type="number"
        :min="0"
        :max="9"
        :disabled="disabled"
        tabindex="0"
        v-model="digits.tens"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      >
    </v-col>
    <v-col class="numeric-input-single-digit-box">
      <input
        type="number"
        :min="0"
        :max="9"
        :disabled="disabled"
        tabindex="0"
        v-model="digits.ones"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      >
    </v-col>
    <label class="numeric-input-single-digit-box-label">
      {{ $t('F322b4.S022') }}
    </label>
    <v-col class="numeric-input-single-digit-box">
      <input
        type="number"
        :min="0"
        :max="9"
        :disabled="disabled"
        tabindex="0"
        v-model="digits.tenths"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      >
    </v-col>
    <v-col class="numeric-input-single-digit-box">
      <input
        type="number"
        :min="0"
        :max="9"
        :disabled="disabled"
        tabindex="0"
        v-model="digits.hundredths"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      >
    </v-col>
    <label class="numeric-input-single-digit-box-label">
      {{ $t('F322b4.S023') }}
    </label>
  </v-row>
</template>
<!-- KSD V001.000 AE -->
