<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/OperationBtnSetting/couponUseSettingDialog.css"></style>
<script type="text/javascript" src="@/resource/static/js/OperationBtnSetting/couponUseSettingDialog.js"></script>

<template>
  <div class="text-center baseFont">
    <v-dialog
      :value="displayed"
      persistent>
      <v-card class="basesize">
        <!-- ヘッダー -->
        <v-card-title class="dialog-line-blue justify-center">
          <span class="dialog-title justify-center">{{ title }}</span>
        </v-card-title>

        <!-- 設定項目 -->

        <div
          id="baseTable"
          style="overflow: unset">
          <table class="fixed-header">
            <thead>
              <tr>
                <th
                  style="width: 52px"
                  class="title-cell-style-10 borderCellStyle3"/>
                <th
                  style="width: 120px"
                  class="title-cell-style-10 borderCellStyle3">{{ $t("F322b1.S055") }}</th>
                <th
                  style="width: 120px"
                  class="title-cell-style-10 borderCellStyle3">{{ $t("F322b1.S056") }}</th>
                <th
                  style="width: 260px"
                  class="title-cell-style-10 borderCellStyle3">{{ $t("F322b1.S057") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(row, index) in resTickets"
                :key="index"
                no-gutters
                :class="{ 'selected-item': isSelectedCoupon(row), 'activate-scroll': tableScrollBar }"
                @click="clicked(index, row)">
                <td
                  class="w-50 text-center"
                  v-if="showDoneOnTable(row.Code)">済</td>
                <td
                  style="width: 50px;"
                  v-else/>
                <td class="w-120 text-center">{{ codeToString(row.Code) }}</td>
                <td class="w-120 text-center">{{ row.Disc_Type2 === 0 ? '値引' : '割引' }}</td>
                <td :class="tableScrollBar ? 'w-240-left' : 'w-260-left'">{{ row.Name }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <v-card-actions class="dialog-fotter">
          <v-spacer/>
          <v-btn
            class="button dialog-fotter-button-gray footerButtonStyle"
            @click="onClickReturn()"
          >
            {{ $t("O00004.S003") }}
          </v-btn>
          <v-btn
            :disabled="!this.permissions.includes('CLOUDPOS_OPERATION_BTN_UPDATE') || resTicketsLen === 0"
            class="button dialog-fotter-button-orange footerButtonStyle"
            @click="onClickSave()"
          >
            {{ $t("O00004.S008") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <popup ref="pop" />
  </div>
</template>
<!-- KSD V001.000 AE -->
