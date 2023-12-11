<!-- KSD V001.000 AS -->
<style src="@/resource/static/css/CommonDesign/utils.css" />
<style scoped src="@/resource/static/css/OptionMasterSetting/optionMasterSettingList.css" />
<script type="text/javascript" src="@/resource/static/js/OptionMasterSetting/optionMasterSettingList.js" />
<template>
  <!-- オプション一覧 -->
  <div :class="{'disabled': disabled}">
    <table class="option-master-setting-table">
      <thead>
        <!-- No -->
        <th>{{ $t('C00217.S004') }}</th>
        <!-- オプション名称 -->
        <th>{{ $t('C00217.S005') }}</th>
      </thead>
      <tbody>
        <tr v-for="(rowDataModel, index) in tableDataModel"
          :key="index"
          @click.exact="clickSelectedRow(rowDataModel, false)"
          @click.ctrl.exact="clickSelectedRow(rowDataModel, true)"
          @click.shift.exact="clickSelectedRowWithShift(rowDataModel, false)"
          @click.shift.ctrl="clickSelectedRowWithShift(rowDataModel, true)"
          :class="selectedDrinkCourseNo.indexOf(rowDataModel.drinkCourseNo) !== -1 ? 'selectedItem' : ''"
        >
          <!-- テーブルマスタに登録されたテーブルNo、テーブル名称を表示する -->
          <td>{{ rowDataModel.drinkCourseNo }}</td>
          <td>{{ (rowDataModel.option != null) ? rowDataModel.option.drinkCourseName : '' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<!-- KSD V001.000 AE -->
