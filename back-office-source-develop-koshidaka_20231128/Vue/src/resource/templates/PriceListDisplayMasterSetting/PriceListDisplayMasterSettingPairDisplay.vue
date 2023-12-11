<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/CommonDesign/utils.css" />
<style scoped src="@/resource/static/css/PriceListDisplayMasterSetting/priceListDisplayMasterSettingPairDisplay.css" />
<script type="text/javascript" src="@/resource/static/js/PriceListDisplayMasterSetting/priceListDisplayMasterSettingPairDisplay.js" />
<template>
  <!-- 部屋一覧 -->
  <div>
    <table class="price-list-display-master-setting-table">
      <thead>
        <th>{{ $t("C00224.S004") }}</th>
        <th>{{ $t("C00224.S005") }}</th>
        <th>{{ $t("C00224.S019") }}</th>
        <th>{{ $t("C00224.S020") }}</th>
        <th>{{ $t("C00224.S021") }}</th>
        <th>{{ $t("C00224.S022") }}</th>
        <th>{{ $t("C00224.S006") }}</th>
        <th>{{ $t("C00224.S007") }}</th>
      </thead>
      <tbody>
        <tr
          v-for="(rowDataModel, index) in priceListDisplayDataModel"
          :key="index"
          :id="rowDataModel.group">
          <td>
            {{ rowDataModel.hideDisplay ? '' : handleMissing(rowDataModel.priceList) || handleMissing(rowDataModel.priceList.priceDispNo) ? `${rowDataModel.indexNo}` : `${rowDataModel.priceList.priceDispNo}` }}
          </td>
          <td
            :rowspan="rowDataModel.rowspanCourseName"
            :class="rowDataModel.isCourseNameHidden ? 'no-display' : ''">
            {{ handleMissing(rowDataModel.priceList) || handleMissing(rowDataModel.priceList.priceCourseName) ? '' : `${rowDataModel.priceList.priceCourseName}` }}
          </td>
          <td
            :rowspan="rowDataModel.rowspanPrice"
            :class="rowDataModel.isPriceHidden ? 'no-display' : ''">
            {{ handleMissing(rowDataModel.priceList) || handleMissing(rowDataModel.priceList.courseDispPos) || rowDataModel.priceList.courseDispPos === 21 ? '' : `${rowDataModel.priceList.courseDispPos}` }}
          </td>
          <td>
            {{ rowDataModel.hideDisplay ? '' : handleMissing(rowDataModel.priceList) || handleMissing(rowDataModel.priceList.priceDispPos) ? '' : `${priceDispPosListVal(rowDataModel.priceList.priceDispPos)}` }}
          </td>
          <td>{{ rowDataModel.hideDisplay ? '' : handleMissing(rowDataModel.priceList) || handleMissing(rowDataModel.priceList.chargeCode) ? '' : `${rowDataModel.priceList.chargeCode}` }}</td>
          <!-- CS KSD V001.000 #83629 -->
          <!-- <td>{{ rowDataModel.hideDisplay ? '' : handleMissing(rowDataModel.priceList) || handleMissing(rowDataModel.priceList.priceCourseName) ? '' : `${rowDataModel.priceList.priceCourseName}` }}</td> -->
          <td>{{ rowDataModel.hideDisplay ? '' : handleMissing(rowDataModel.priceList) || handleMissing(rowDataModel.priceList.roomCourseName)  ? '' : `${rowDataModel.priceList.roomCourseName}` }}</td>
          <!-- CE KSD V001.000 #83629 -->
          <td class="price-list-display-master-setting-table-date">{{ rowDataModel.hideDisplay ? '' : handleMissing(rowDataModel.priceList) || handleMissing(rowDataModel.priceList.startDate) ? '' : `${formatDateToRead(rowDataModel.priceList.startDate)}` }}</td>
          <td class="price-list-display-master-setting-table-date">{{ rowDataModel.hideDisplay ? '' : handleMissing(rowDataModel.priceList) || handleMissing(rowDataModel.priceList.endDate) ? '' : `${formatDateToRead(rowDataModel.priceList.endDate)}` }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<!-- KSD V001.000 AE -->
