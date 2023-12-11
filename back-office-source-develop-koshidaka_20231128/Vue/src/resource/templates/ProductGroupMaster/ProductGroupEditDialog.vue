<style src="./../../static/css/ProductGroupMaster/productGroupEditDialog.css"></style>
<script type="text/javascript" src="./../../static/js/ProductGroupMaster/productGroupEditDialog.js"></script>
<template>
<div class="text-center baseFont">
  <!-- マスタ新規・編集ダイアログ -->
  <v-dialog v-model="dialog" persistent>
    <v-card class="basesize">
      <v-card-title class="headline dialog-line-blue title-label">
        <div id="changeLabel">
          <label id="newModelabel" v-if="mode === 1"><b>{{ $t("F00204.S013") }}</b></label>
          <label id="changeModelabel" v-if="mode === 2"><b>{{ $t("F00204.S014") }}</b></label>
        </div>
        <font class="dialog-title">{{title}}</font>
      </v-card-title>
      <div id="baseTable" style="overflow-y:auto;" >
        <table id="productTable">
          <!-- コード -->
          <tr>
            <th>{{ $t("F00204.S015") }}</th>
            <td colspan="2">
              <input type="text" :id="'readOnlyText'" v-model="productData.productId" :disabled="true" style="ime-mode:disabled;" maxlength="6" tabindex="-1"/>
            </td>
          </tr>
          <!-- リンクコード -->
          <tr>
            <th>{{ $t("F00204.S016") }}</th>
            <td colspan="2">
              <!-- KSD V001.000 DS -->
              <!-- <div style="height: 100%;" :class="linkErrorMsg !== '' ? 'errorTextBox' : ''"> -->
              <!-- KSD V001.000 DE -->
              <!-- KSD V001.000 AS -->
              <div
                style="height: 100%;"
                :class="linkErrorMsg !== '' ? 'errorTextBox' : ''"
                class="d-flex">
                <!-- KSD V001.000 AE -->
                <input type="text" :class="linkErrorMsg !== '' ? '' : 'editTextBox'" class="textLinkCode" ref="linkText" v-model="productData.parentName" :disabled="true" />
                <div class="buttomLabel">
                  <v-btn tabindex="101" style="width: 28px; height: 40px;" @click="linkCodeSelect" :disabled="topLevel">
                    <span class="rightArrow" />
                  </v-btn>
                </div>
              </div>
            </td>
          </tr>
          <!-- リンクコード(エラーメッセージ) -->
          <tr v-if="this.linkErrorMsg !== ''" class="errorCell">
            <th />
            <td colspan="2">
              <div v-for="linkMsg in linkErrorMsg" :key="linkMsg">
                <label>{{ linkMsg }}</label>
              </div>
            </td>
          </tr>
          <!-- 漢字名称 -->
          <tr>
            <th>{{ $t("F00204.S017") }}</th>
            <td colspan="2">
              <input type="text" :class="this.nameErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'" class="textName" ref="nameText" v-model="productData.name" :placeholder="this.$i18n.t('F00204.S051')" maxlength="40" tabindex="102" :@input="inputLimit(productData.name,40)"/>
            </td>
          </tr>
          <!-- 漢字名称(エラーメッセージ) -->
          <tr v-if="this.nameErrorMsg !== ''" class="errorCell">
            <th />
            <td colspan="2">
              <div v-for="nameMsg in nameErrorMsg" :key="nameMsg">
                <label>{{ nameMsg }}</label>
              </div>
            </td>
          </tr>
          <!-- POS売上税区分 -->
          <tr v-if="sellClass === true">
            <th>{{ $t("F00204.S018") }}</th>
            <td>
              <select v-model="productData.taxType" class="SelectBox" ref="taxTypeText" tabindex="103" style="color:#000000">
                <option v-for="taxTypeItem in taxTypeList" :key="taxTypeItem.code" :value="taxTypeItem.code">{{ taxTypeItem.value }}</option>
              </select>
              <div class="pulldownArrow"></div>
            </td>
          </tr>
          <!-- 商品区分 -->
          <tr v-if="sellClass === true">
            <th>{{ $t("F00204.S019") }}</th>
            <td>
              <select v-model="productData.productType" class="SelectBox" ref="productTypeText" tabindex="104" style="color:#000000">
                <option v-for="productTypeItem in productTypeList" :key="productTypeItem.code" :value="productTypeItem.code">{{ productTypeItem.value }}</option>
              </select>
              <div class="pulldownArrow"></div>
            </td>
          </tr>
          <!-- 年齢確認商品 -->
          <tr v-if="sellClass === true">
            <th>{{ $t("F00204.S020") }}</th>
            <td>
              <select v-model="productData.ageCheckType" class="SelectBox" ref="ageCheckTypeText" tabindex="105" style="color:#000000">
                <option v-for="ageCheckTypeItem in ageCheckTypeList" :key="ageCheckTypeItem.code" :value="ageCheckTypeItem.code">{{ ageCheckTypeItem.value }}</option>
              </select>
              <div class="pulldownArrow"></div>
            </td>
          </tr>
          <!-- 値引区分 -->
          <tr v-if="sellClass === true">
            <th>{{ $t("F00204.S021") }}</th>
            <td>
              <select v-model="productData.pricedownType" class="SelectBox" ref="pricedownTypeText" tabindex="106" style="color:#000000">
                <option v-for="pricedownTypeItem in pricedownTypeList" :key="pricedownTypeItem.code" :value="pricedownTypeItem.code">{{ pricedownTypeItem.value }}</option>
              </select>
              <div class="pulldownArrow"></div>
            </td>
          </tr>
          <!-- 売変区分 -->
          <tr v-if="sellClass === true">
            <th>{{ $t("F00204.S022") }}</th>
            <td>
              <select v-model="productData.priceChangeType" class="SelectBox" ref="priceChangeTypeText" tabindex="107" style="color:#000000">
                <option v-for="priceChangeTypeItem in priceChangeTypeList" :key="priceChangeTypeItem.code" :value="priceChangeTypeItem.code">{{ priceChangeTypeItem.value }}</option>
              </select>
              <div class="pulldownArrow"></div>
            </td>
          </tr>
          <!-- 小計値引割引按分処理区分 -->
          <tr v-if="sellClass === true">
            <th>{{ $t("F00204.S023") }}</th>
            <td>
              <select v-model="productData.discountParType" class="SelectBox" ref="discountParTypeText" tabindex="108" style="color:#000000">
                <option v-for="discountParTypeItem in discountParTypeList" :key="discountParTypeItem.code" :value="discountParTypeItem.code">{{ discountParTypeItem.value }}</option>
              </select>
              <div class="pulldownArrow"></div>
            </td>
          </tr>
          <!-- 決済種別区分 ※編集不可 -->
          <tr v-if="sellClass === true">
            <th>{{ $t("F00204.S024") }}</th>
            <td>
              <select v-model="productData.paymentType" class="SelectBox disableInput" ref="paymentTypeText" tabindex="109" :disabled="true">
                <option v-for="paymentTypeItem in paymentTypeList" :key="paymentTypeItem" :value="paymentTypeItem">{{ paymentTypeItem }}</option>
              </select>
              <div class="pulldownArrow"></div>
            </td>
          </tr>
          <!-- 免税区分 -->
          <tr v-if="sellClass === true">
            <th>{{ $t("F00204.S025") }}</th>
            <td>
              <select v-model="productData.dutyFreeType" class="SelectBox" ref="dutyFreeTypeText" tabindex="110" style="color:#000000">
                <option v-for="dutyFreeTypeItem in dutyFreeTypeList" :key="dutyFreeTypeItem.code" :value="dutyFreeTypeItem.code">{{ dutyFreeTypeItem.value }}</option>
              </select>
              <div class="pulldownArrow"></div>
            </td>
          </tr>
          <!-- 販売停止区分 -->
          <tr v-if="sellClass === true">
            <th>{{ $t("F00204.S026") }}</th>
            <td>
              <select v-model="productData.sellStopType" class="SelectBox" ref="sellStopTypeText" tabindex="111" style="color:#000000">
                <option v-for="sellStopTypeItem in sellStopTypeList" :key="sellStopTypeItem.code" :value="sellStopTypeItem.code">{{ sellStopTypeItem.value }}</option>
              </select>
              <div class="pulldownArrow"></div>
            </td>
          </tr>

          <!-- 最終更新日時 -->
          <tr>
            <th>{{ $t("F00204.S027") }}</th>
            <td>
              <input type="text" id="lastUpdate" ref="lastUpdateText" v-model="productData.lastUpdate" :disabled="true" maxlength="23" tabindex="-1" class="editTextBox disableInput"/>
            </td>
          </tr>
        </table>
      </div>
      <v-card-actions class="dialog-fotter">
        <v-spacer></v-spacer>
        <div class="deleteButton">
          <v-btn class="button dialog-fotter-button-blue footerButtonStyle" @click="onClickDelete()" v-if="mode === 2" tabindex="112" :disabled="!$root.approvalFlg && !$root.deleteAuth">
            {{ $t("O00004.S024") }}
          </v-btn>
        </div>
        <v-btn class="button dialog-fotter-button-gray footerButtonStyle" @click="onClickReturn()" tabindex="113">
          {{ $t("O00004.S003") }}
        </v-btn>
        <v-btn class="button dialog-fotter-button-orange footerButtonStyle" @click="onClickSave()" :disabled="!$root.approvalFlg && !$root.registerAuth" tabindex="114">
          {{ $t("O00004.S008") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <popup ref="pop"/>
  <!-- リンクコード設定ダイアログ -->
  <product-group-keyword-items ref="productGroupKeywordItems" @clickSubmit="onSelectLinkCode" />
</div>
</template>
<style scoped>
.disableInput {
  ime-mode:disabled;
  color:#79797A;
  background-color:#e9e9e9;
  cursor:not-allowed;
}
</style>
