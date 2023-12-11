<!-- KSD V001.000 AS -->
<style src="@/resource/static/css/CommonDesign/utils.css" />
<style scoped src="@/resource/static/css/CourseMasterSetting/courseMasterSettingList.css" />
<script type="text/javascript" src="@/resource/static/js/CourseMasterSetting/courseMasterSettingList.js" />
<template>
  <!-- 部屋一覧 -->
  <div :class="{'disabled': disabled}">
    <table class="course-master-setting-table">
      <thead>
        <th>{{ $t("C00215.S004") }}</th>
        <th>{{ $t("C00215.S005") }}</th>
        <th>{{ $t("C00215.S006") }}</th>
        <th>{{ $t("C00215.S007") }}</th>
      </thead>
      <tbody>
        <tr v-for="(rowDataModel, index) in courseDataModel"
          :key="index"
          @click.exact="clickSelectedRow(rowDataModel, false)"
          @click.ctrl.exact="clickSelectedRow(rowDataModel, true)"
          @click.shift.exact="clickSelectedRowWithShift(rowDataModel, false)"
          @click.shift.ctrl="clickSelectedRowWithShift(rowDataModel, true)"
          :class="`${selectedIndexNo.indexOf(rowDataModel.indexNo) !== -1 ? 'selectedItem' : ''} ${rowDataModel.course !== null && !dateInRange(rowDataModel.course.startDate, rowDataModel.course.endDate) ? 'dateInRange' : ''}`"
        >
          <!-- テーブルマスタに登録されたテーブルNo、テーブル名称を表示する -->
          <td>{{ rowDataModel.indexNo }}</td>
          <td>{{ rowDataModel.course == null ? '' : `${rowDataModel.course.roomCourseName}` }}</td>
          <td>{{ rowDataModel.course == null ? '' : `${formatDateToRead(rowDataModel.course.startDate)}` }}</td>
          <td>{{ rowDataModel.course == null ? '' : `${formatDateToRead(rowDataModel.course.endDate)}` }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<!-- KSD V001.000 AE -->