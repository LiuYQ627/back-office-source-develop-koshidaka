<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/CommonInput/selectInput.css" />
<script type="text/javascript" src="@/resource/static/js/CommonInput/selectInput.js" />
<template>
  <div class="common-select-input-container">
    <select
      class="common-select-input"
      v-model="dataModel"
      @input="handleInput"
      @mousedown="handleClick"
      :disabled="disabled"
    >
      <option v-if="emptyOption"/>
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="getOptionValue(option, index)"
      >
        {{ getOptionName(option, index) }}
      </option>
    </select>
    <div class="pulldownArrow"/>
  </div>
</template>
<!-- KSD V001.000 AE -->
