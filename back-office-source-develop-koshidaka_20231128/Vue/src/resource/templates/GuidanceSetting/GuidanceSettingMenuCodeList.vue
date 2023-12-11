<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/CommonDesign/utils.css" />
<style scoped src="@/resource/static/css/MasterCommon/masterCommon.css"></style>
<style scoped src='@/resource/static/css/GuidanceSetting/GuidanceSettingMenuCodeList.css'></style>
<script type="text/javascript" src="@/resource/static/js/GuidanceSetting/guidanceSettingMenuCodeList.js" />
<template>
  <div :class="{'disabled': disabled}">
    <table class="menu-code-list-table">
      <thead>
        <th>{{ $t('F32283.S018') }}</th>
        <th>{{ $t('F32283.S019') }}</th>
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
          :draggable="rowDataModel.menuCode.Code !== null"
          @dragstart="drag($event, index)"
          @drop="onDrop($event, index)"
          @dragover.prevent
          @dragenter.prevent
        >
          <!-- テーブルマスタに登録されたテーブルNo、テーブル名称を表示する -->
          <td>{{ rowDataModel.indexNo }}</td>
          <td>
            <div class="ellipsis">
              {{ rowDataModel && rowDataModel.menuCode && rowDataModel.menuCode.Code }}
            </div>
            <div class="ellipsis table-td-size">
              {{ rowDataModel && rowDataModel.menuCode && rowDataModel.menuCode.Name2 }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<!-- KSD V001.000 AE -->
