<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/CommonDesign/utils.css" />
<style scoped src="@/resource/static/css/MasterCommon/masterCommon.css"></style>
<style scoped src='@/resource/static/css/GuidanceSetting/GuidanceSettingGlobalMenuCodeList.css'></style>
<script type="text/javascript" src="@/resource/static/js/GuidanceSetting/guidanceSettingGlobalMenuCodeList.js" />
<template>
  <div :class="{'disabled': disabled}">
    <table class="global-menu-code-list-table">
      <thead>
        <th>{{ $t('F32283.S018') }}</th>
        <th>{{ $t('F32283.S020') }}</th>
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
          :draggable="!rowDataModel.selected && rowDataModel.globalMenuCode.Code !== null"
          @dragstart="drag($event, index)"
          @dragover.prevent
          @dragenter.prevent
        >
          <!-- テーブルマスタに登録されたテーブルNo、テーブル名称を表示する -->
          <td>{{ rowDataModel.indexNo }}</td>
          <td>
            <div>
              <div class="ellipsis">
                {{ rowDataModel.globalMenuCode.Code }}
                <span>
                  {{ rowDataModel.selected ? $t('F32283.S021') : '' }}
                </span>
              </div>
              <div class="ellipsis">
                {{ rowDataModel.globalMenuCode.Name2 }}
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<!-- KSD V001.000 AE -->
