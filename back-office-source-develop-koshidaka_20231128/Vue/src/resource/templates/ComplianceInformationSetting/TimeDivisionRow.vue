<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/ComplianceInformationSetting/timeDivisionRow.css" />
<script type="text/javascript" src="@/resource/static/js/ComplianceInformationSetting/timeDivisionRow.js"/>
<template>
  <tr>
    <td rowspan="2" class="table-cell label1" v-show="displayDiv1">
      {{ div1Label }}
    </td>
    <td class="table-cell label2">
      {{ div2Label }}
    </td>
    <td class="table-cell text-left input" v-show="displayStartTime">
      <TimeTextInput
        ref="startTimeInput"
        v-model="dataModel.start"
        @timeChanged="(val) => reassignStartTime(val)"
      />
    </td>
    <td class="table-cell input" v-show="displayEndTime">
      <TimeTextInput
        ref="endTimeInput"
        v-model="dataModel.end"
        @timeChanged="(val) => reassignEndTime(val)"
      />
    </td>
  </tr>
</template>
<!-- KSD V001.000 AE -->
