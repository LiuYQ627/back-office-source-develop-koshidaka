<!-- KSD V001.000 AS -->
<style src="@/resource/static/css/CommonDesign/utils.css" />
<style scoped src="@/resource/static/css/RoomInfoMasterSetting/roomInfoMasterSettingList.css" />
<script type="text/javascript" src="@/resource/static/js/RoomInfoMasterSetting/roomInfoMasterSettingList.js" />
<template>
  <!-- 部屋一覧 -->
  <div :class="{'disabled': disabled}">
    <table class="room-info-master-setting-table">
      <thead>
        <!-- No -->
        <th>{{ $t("C00208.S003") }}</th>
        <!-- 部屋No -->
        <th>{{ $t("C00208.S004") }}</th>
        <!-- 部屋名称 -->
        <th>{{ $t("C00208.S005") }}</th>
      </thead>
      <tbody>
        <tr v-for="(rowDataModel, index) in tableDataModel"
          :key="index"
          @click.exact="clickSelectedRow(rowDataModel, false)"
          @click.ctrl.exact="clickSelectedRow(rowDataModel, true)"
          @click.shift.exact="clickSelectedRowWithShift(rowDataModel, false)"
          @click.shift.ctrl="clickSelectedRowWithShift(rowDataModel, true)"
          :class="selectedIndexNo.indexOf(rowDataModel.indexNo) !== -1 ? 'selectedItem' : ''"
        >
          <!-- テーブルマスタに登録されたテーブルNo、テーブル名称を表示する -->
          <td>{{ rowDataModel.indexNo }}</td>
          <td>{{ rowDataModel.table == null ? '' : `${rowDataModel.table.tblNo.split(" ").join("&nbsp;").trim()}` }}</td>
          <td>{{ rowDataModel.table == null ? '' : `${rowDataModel.table.tblName}` }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<!-- KSD V001.000 AE -->
