<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/RoomInfoSubSetting/timeDivisionRow.css" />
<script type="text/javascript" src="@/resource/static/js/RoomInfoSubSetting/timeDivisionRow.js"/>

<template>
  <tr>
    <td class="table-cell label">
      {{ divLabel }}
    </td>
    <td class="table-cell label">
      {{ $t('C00221.S012') }}
    </td>
    <td class="table-cell text-left input">
      <TimeTextInput
        ref="startTimeInput"
        v-model="dataModel.applyingTime.start"
        :disabled="disabled"
        @timeChanged="(val) => reassignStartTime(val)"
      />
    </td>
    <td class="table-cell label">
      {{ $t('C00221.S013') }}
    </td>
    <td class="table-cell input">
      <TimeTextInput
        ref="endTimeInput"
        v-model="dataModel.applyingTime.end"
        :disabled="disabled"
        @timeChanged="(val) => reassignEndTime(val)"
      />
    </td>
    <td class="table-cell input" >
      <input type="text"
        ref="minCount"
        v-model="dataModel.minCount"
        class="h-100 w-100 pl-3 editTextBox mr-2"
        :class="{ 'errorTextBox': invalidNum, 'errorTextBox': noValueOnSave, 'readOnlyText' : disabled }"
        maxlength="3"
        tabindex="0"
        :disabled="disabled"
      />
    </td>
  </tr>
</template>
<!-- KSD V001.000 AE -->
