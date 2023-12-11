<style scoped src="@/resource/static/css/CommonDesign/utils.css" />
<style scoped src="@/resource/static/css/CommonInput/radioButton.css" />
<script type="text/javascript" src="@/resource/static/js/CommonInput/radioButton.js" />

<template>
  <!-- KSD V001.000 DS -->
  <!-- <v-row -->
  <!--   no-gutters -->
  <!--   class="whiteFrame h-100 w-100 d-flex align-center"> -->
  <!--   <v-col -->
  <!--     v-for="label in labels" -->
  <!--     :key="label.value" -->
  <!--     class="h-100 pa-1"> -->
  <!--     <button -->
  <!--       type="button" -->
  <!--       class="radioButton h-100 w-100 d-flex justify-center align-center" -->
  <!--       :class="{ checked: label.value === value }" -->
  <!--       @click="$emit('input', label.value)" -->
  <!--       > -->
  <!--       {{ label.name }} -->
  <!--     </button> -->
  <!--   </v-col> -->
  <!-- </v-row> -->
  <!-- KSD V001.000 DE -->
  <!-- KSD V001.000 AS -->
  <v-row
    no-gutters
    class="whiteFrame h-100 w-100 d-flex align-center"
    :style="{'justify-content': fitContentWidth ? `center !important` : undefined}">
    <v-col
      :cols="itemCols"
      v-for="label in labels"
      :key="label.value"
      class="h-100 pa-1"
      :class="{ 'width-fitcontent': fitContentWidth }">
      <button
        type="button"
        class="radioButton h-100 w-100 d-flex justify-center align-center"
        :class="{ checked: selectedItem.includes(label.value), 'width-fitcontent': fitContentWidth }"
        :disabled="disableButtons"
        @click="handleButtonClick($event, label.value)"
      >
        {{ label.name }}
      </button>
    </v-col>
  </v-row>
  <!-- KSD V001.000 AE -->
</template>
