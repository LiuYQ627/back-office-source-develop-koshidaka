<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/CommonDesign/utils.css" />
<style scoped src="@/resource/static/css/CoursePriceSetting/coursePriceSetting.css" />
<script type="text/javascript" src="@/resource/static/js/CoursePriceSetting/coursePriceSettingRow.js" />
<template>
  <tbody>
    <tr>
      <th rowspan="3">{{ getLabel(0) }}</th>
      <th>{{ getLabel(1) }} </th>
      <td class="form-control">
        <numeric-time-input
          v-model="dataModel.priceApplyingTime.start"
          :disabled="disabled"
          :hasError="hasError('priceApplyingTime.start')"
        />
      </td>
      <th>{{ $t("C00211.S016") }}</th>
      <td class="form-control">
        <numeric-time-input
          v-model="dataModel.priceApplyingTime.end"
          :disabled="disabled"
          :hasError="hasError('priceApplyingTime.end')"
        />
      </td>
      <td class="inactive"></td>
      <th>{{ $t("C00211.S017") }}</th>
      <td class="inactive form-control">
        <price-input
          disabled
          v-model="basePriceTotal"
        />
      </td>
      <td class="form-control">
        <price-input
          v-model="dataModel.base.room"
          @input="getTotalBasePrice(dataModel.base)"
          :disabled="disabled"
          :hasError="hasError('base.room')"
        />
      </td>
      <td class="form-control">
        <price-input
          v-model="dataModel.base.drink"
          @input="getTotalBasePrice(dataModel.base)"
          :disabled="disabled"
          :hasError="hasError('base.drink')"
        />
      </td>
    </tr>
    <tr>
      <th>{{ getLabel(2) }} </th>
      <td class="form-control">
        <numeric-time-input
          v-model="dataModel.displayTime.start"
          :disabled="disabled"
          :hasError="hasError('displayTime.start')"
        />
      </td>
      <th>{{ $t("C00211.S016") }}</th>
      <td class="form-control">
        <numeric-time-input
          v-model="dataModel.displayTime.end"
          :disabled="disabled"
          :hasError="hasError('displayTime.end')"
        />
      </td>
      <td class="inactive"></td>
      <th>{{ $t("C00211.S019") }}</th>
      <td class="inactive form-control">
        <price-input
          disabled
          v-model="extendPriceTotal"
        />
      </td>
      <td class="form-control">
        <price-input
          v-model="dataModel.extend.room"
          @input="getTotalExtendPrice(dataModel.extend)"
          :disabled="disabled"
          :hasError="hasError('extend.room')"
        />
      </td>
      <td class="form-control">
        <price-input
          v-model="dataModel.extend.drink"
          @input="getTotalExtendPrice(dataModel.extend)"
          :disabled="disabled"
          :hasError="hasError('extend.drink')"
        />
      </td>
    </tr>
    <tr>
      <th>{{ getLabel(3) }} </th>
      <td class="inactive"></td>
      <td class="inactive"></td>
      <td class="form-control">
        <numeric-time-input
          v-model="dataModel.courseEndTime.end"
          :disabled="disabled || payType == 1"
          :hasError="hasError('courseEndTime.end')"
        />
      </td>
      <td :class="{
        'inactive': disabled || payType == 1,
        'has-error': hasError('nextDayFlag')
      }">
        <checkbox-input
          v-model="dataModel.nextDayFlag"
          :disabled="disabled || payType == 1"
          :hasError="hasError('nextDayFlag')"
          :tabindex="disabled || payType == 1 ? -1 : 0"
        />
      </td>
      <td class="inactive"></td>
      <td class="inactive"></td>
      <td class="inactive"></td>
      <td class="inactive"></td>
    </tr>
  </tbody>
</template>
<!-- KSD V001.000 AE -->
