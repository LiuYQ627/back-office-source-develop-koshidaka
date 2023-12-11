<style src="./../../static/css/PriceChange/productSearchDialog.css"></style>
<script type="text/javascript" src="./../../static/js/PriceChange/priceChangeSelectDialog.js"></script>
<template>
  <div class="text-center baseFont">
    <!-- 売価変更No選択ダイアログ -->
    <v-dialog
      v-model="dialog"
      persistent>
      <v-card class="basesize">
        <!-- <v-card-title class="headline dialog-line-blue title-label"> -->
        <v-card-title class="headline dialog-line-blue">
          <font class="dialog-title">{{ title }}</font>
        </v-card-title>
        <div
          id="baseTable"
          style="overflow-y:auto;" >
          <!-- KSD V001.000 DS -->
          <!-- <div class="storeTableStyle"> -->
          <!-- KSD V001.000 DE -->
          <!-- KSD V001.000 AS -->
          <div class="storeTableStyle store-table-style-price">
          <!-- KSD V001.000 AS -->
            <table>
              <thead>
                <tr>
                  <th
                    class="titleCellStyle borderCellStyle"
                    style="border-right: 1px solid #fff;width:30% !important">{{ $t("F00109.S023") }}</th>
                  <th class="titleCellStyle borderCellStyle">{{ $t("F00109.S024") }}</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(priceChange, index) in priceChangeData"
                  :key="index"
                  @click.exact="clickCandidateRow(priceChange.name, false)"
                  :class="tempCadidatePriceChange.indexOf(priceChange.name) !== -1 ? 'selectedItem' : ''">
                  <td
                    class="NumericStyle"
                    :style="getPriceChangeData().length > 6 ? 'width:52%' : 'width:50%'">{{ priceChange.name.slice(-10) }}</td>
                  <td :class='{"scrollChild":getPriceChangeData().length > 6}'>{{ priceChange.displayName }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <v-card-actions class="dialog-fotter">
          <v-spacer/>
          <v-btn
            class="button dialog-fotter-button-gray footerButtonStyle"
            @click="onClickReturn()"
            tabindex="112">
            {{ $t("F00109.S025") }}
          </v-btn>
          <v-btn
            class="button dialog-fotter-button-orange footerButtonStyle"
            @click="onClickSave()"
            :disabled="getSelectPriceChangeData().length === 0"
            tabindex="113">
            {{ $t("F00109.S026") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <popup ref="pop"/>
  </div>
</template>
