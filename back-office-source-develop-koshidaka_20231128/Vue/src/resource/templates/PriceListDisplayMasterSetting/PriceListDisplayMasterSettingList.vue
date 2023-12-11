<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/CommonDesign/utils.css" />
<style scoped src="@/resource/static/css/PriceListDisplayMasterSetting/priceListDisplayMasterSettingList.css" />
<script type="text/javascript" src="@/resource/static/js/PriceListDisplayMasterSetting/priceListDisplayMasterSettingList.js" />
<template>
  <!-- 部屋一覧 -->
  <div :class="{'disabled': disabled}">
    <table class="price-list-display-master-setting-table">
      <thead>
        <th class="price-list-display-master-setting-table-no">{{ $t("C00224.S004") }}</th>
        <th>{{ $t("C00224.S005") }}</th>
        <th>{{ $t("C00224.S006") }}</th>
        <th>{{ $t("C00224.S007") }}</th>
      </thead>
      <tbody>
        <tr
          v-for="(rowDataModel, index) in priceListDisplayDataModel"
          :key="index"
          @click.exact="clickSelectedRow(rowDataModel, false)"
          @click.ctrl.exact="clickSelectedRow(rowDataModel, true)"
          @click.shift.exact="clickSelectedRowWithShift(rowDataModel, false)"
          @click.shift.ctrl="clickSelectedRowWithShift(rowDataModel, true)"
          :class="`${selectedIndexNo.indexOf(rowDataModel.indexNo) !== -1 ? 'selectedItem' : ''}`"
        >
          <td class="price-list-display-master-setting-table-no">{{ rowDataModel.indexNo }}</td>
          <td>{{ rowDataModel.priceList == null ? '' : `${rowDataModel.priceList.priceCourseName}` }}</td>
          <td>{{ rowDataModel.priceList == null ? '' : `${formatDateToRead(rowDataModel.priceList.startDate)}` }}</td>
          <td>{{ rowDataModel.priceList == null ? '' : `${formatDateToRead(rowDataModel.priceList.endDate)}` }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<!-- KSD V001.000 AE -->
