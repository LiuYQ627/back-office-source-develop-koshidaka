<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/CommonDesign/utils.css" />
<style scoped src="@/resource/static/css/MasterCommon/masterCommon.css"></style>
<style scoped src='@/resource/static/css/GuidanceSetting/GuidanceSettingList.css'></style>
<script type="text/javascript" src="@/resource/static/js/GuidanceSetting/guidanceSettingList.js" />
<template>
  <div :class="{'disabled': disabled}">
    <table class="guidance-setting-list-table">
      <thead>
        <!-- No -->
        <th>{{ $t("F32283.S010") }}</th>
        <!-- 名称 -->
        <th>{{ $t("F32283.S011") }}</th>
      </thead>
      <tbody>
        <tr
          v-for="(rowDataModel, index) in tableDataModel"
          :key="index"
          @click.exact="clickSelectedRow(rowDataModel, false)"
          @click.ctrl.exact="clickSelectedRow(rowDataModel, true)"
          @click.shift.exact="clickSelectedRowWithShift(rowDataModel, false)"
          @click.shift.ctrl="clickSelectedRowWithShift(rowDataModel, true)"
          :class="selectedIndexNo.indexOf(rowDataModel.indexNo) !== -1 ? 'selectedItem' : ''"
        >
          <!-- テーブルマスタに登録されたテーブルNo、テーブル名称を表示する -->
          <td>{{ rowDataModel.indexNo }}</td>
          <td>{{ (rowDataModel.guidanceSetting != null) ? rowDataModel.guidanceSetting.GidName : '' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<!-- KSD V001.000 AE -->
