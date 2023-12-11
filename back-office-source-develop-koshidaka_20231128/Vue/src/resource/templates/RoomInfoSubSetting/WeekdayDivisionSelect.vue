<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/CommonDesign/utils.css" />
<script type="text/javascript" src="@/resource/static/js/RoomInfoSubSetting/weekdayDivisionSelect.js"/>

<template>
  <div class="h-100 w-100 d-flex align-center">
    <select
      class="h-100 w-100 pl-2"
      v-model="weekdayDivision"
      @change="$emit('change', weekdayDivision)"
      :disabled="disabled"
      :class="disabled ? 'lightgrayFrame' : 'whiteFrame'"
    >
      <option
        ref="weekdayDivisions"
        v-for="item in weekdayDivisionList"
        :key="item.weekdayCode"
        :value="item.weekdayCode"
      >
        {{ item.weekdayName }}
      </option>
      <div class="pulldownArrow"/>
    </select>
  </div>
</template>
<!-- KSD V001.000 AE -->
