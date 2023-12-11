<!--
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230720  qinshh(Neusoft)   G001.00.0  issue課題#903を対応します.
-->
<style src="./../../static/css/ProductMaster/productEditDialog.css"></style>
<script type="text/javascript" src="./../../static/js/ProductMaster/productEditDialog.js"></script>
<template>
  <div class="text-center baseFont">
    <!-- マスタ新規・編集ダイアログ -->
    <v-dialog
      v-model="dialog"
      persistent>
      <v-card class="basesize">
        <v-card-title class="headline dialog-line-blue title-label">
          <div id="changeLabel">
            <label
              id="newModelabel"
              v-if="mode === 1"><b>{{ $t("F00108.S013") }}</b></label>
            <label
              id="changeModelabel"
              v-if="mode === 2"><b>{{ $t("F00108.S014") }}</b></label>
          </div>
          <font class="dialog-title">{{ title }}</font>
        </v-card-title>
        <!-- KSD V001.000 DS -->
        <!--<div -->
        <!-- id="baseTable" -->
        <!-- style="overflow-y:auto;" > -->
        <!-- KSD V001.000 DE -->
        <!-- KSD V001.000 AS -->
        <div
          id="baseTable"
          style="overflow:hidden;overflow-y:auto;" >
          <!-- KSD V001.000 AE -->
          <table id="productTable">
            <!-- バーコード -->
            <tr>
              <th>{{ $t("F00108.S015") }}</th>
              <td colspan="2">
                <input
                  type="text"
                  :id="'readOnlyText'"
                  ref="clientIdText"
                  v-model="productData.productId"
                  :disabled=true
                  style="ime-mode:disabled;"
                  maxlength="14"
                  tabindex="-1">
              </td>
            </tr>
            <!-- KSD V001.000 AS -->
            <!-- メニューコード -->
            <tr>
              <th>{{ $t("F00108.S072") }}</th>
              <td colspan="2">
                <input
                  type="text"
                  :id="'readOnlyText'"
                  ref="clientIdText"
                  :value="productData.productId.length === 14 ? productData.productId : ''"
                  :disabled=true
                  style="ime-mode:disabled;"
                  maxlength="14"
                  tabindex="-1">
              </td>
            </tr>
            <!-- 自社コード -->
            <tr>
              <th>{{ $t("F00108.S073") }}</th>
              <td colspan="2">
                <input
                  type="number"
                  :id="!isMenuCode ? 'readOnlyText' : ''"
                  class="editTextBox bg-disable"
                  :class="errorMsgMap.ownCompanyCode ? 'errorTextBox' : 'editTextBox'"
                  ref="ownCompanyCodeText"
                  v-model="productData.OwnCompanyCode"
                  :placeholder="this.$i18n.t('F00108.S074')"
                  maxlength="14"
                  @input="(e) => inputNumberLimit(e, productData, 'OwnCompanyCode', 14)"
                  :disabled="!isMenuCode"
                  tabindex="0">
              </td>
            </tr>
            <tr
              v-if="errorMsgMap.ownCompanyCode"
              class="errorCell">
              <th />
              <td colspan="2">
                <div>
                  <label>{{ errorMsgMap.ownCompanyCode }}</label>
                </div>
              </td>
            </tr>
            <!-- リンクコード -->
            <tr>
              <th>{{ $t("F00108.S075") }}</th>
              <td colspan="2">
                <div class="d-flex h-100 w-100 align-center link-code">
                  <input
                    type="text"
                    ref="linkCodeDialogText"
                    class="editTextBox"
                    :class="errorMsgMap.linkCode ? 'errorTextBox' : 'editTextBox'"
                    v-model="productData.linkCode"
                    :disabled="true">
                  <div class="buttomLabel link-code-arrow">
                    <v-btn
                      ref="linkCodeDialogTextButton"
                      class="rightArrowButton"
                      tabindex="0"
                      @click="openLinkCodeDialog"/>
                  </div>
                </div>
              </td>
            </tr>
            <tr
              v-if="errorMsgMap.linkCode"
              class="errorCell">
              <th />
              <td colspan="2">
                <div>
                  <label>{{ errorMsgMap.linkCode }}</label>
                </div>
              </td>
            </tr>
            <!-- KSD V001.000 AE -->
            <!-- 漢字名称 -->
            <tr>
              <th>{{ $t("F00108.S016") }}</th>
              <td colspan="2">
                <!-- KSD V001.000 DS -->
                <!-- <input -->
                  <!-- type="text" -->
                  <!-- :class="this.nameErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'" -->
                  <!-- class="textName" -->
                  <!-- ref="nameText" -->
                  <!-- v-model="productData.name" -->
                  <!-- :placeholder="this.$i18n.t('F00108.S036')" -->
                  <!-- maxlength="40" -->
                  <!-- tabindex="0" -->
                  <!-- :@input="inputLimit(productData.name,40)"> -->
                <!-- KSD V001.000 DE -->
                <!-- KSD V001.000 AS -->
                <input
                  type="text"
                  :class="this.nameErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'"
                  class="textName"
                  ref="nameText"
                  v-model="productData.name"
                  :placeholder="this.$i18n.t('F00108.S036')"
                  maxlength="40"
                  tabindex="0"
                  :@input="inputLimit(productData.name,40)">
                  <!-- KSD V001.000 AE -->
              </td>
            </tr>
            <!-- 漢字名称(エラーメッセージ) -->
            <tr
              v-if="this.nameErrorMsg !== ''"
              class="errorCell">
              <th />
              <td colspan="2"> 
                <!-- DS KSD V001.000 86855 -->
                <!-- <div
                  v-for="nameMsg in nameErrorMsg"
                  :key="nameMsg">
                  <label>{{ nameMsg }}</label>
                </div> -->
                <!-- DE KSD V001.000 86855 -->
                <!-- AS KSD V001.000 86855 -->
                <div>
                  <label>{{ this.nameErrorMsg }}</label>
                </div>
                <!-- AE KSD V001.000 86855 -->
              </td>
            </tr>
            <!-- カナ名称 -->
            <tr>
              <th>{{ $t("F00108.S017") }}</th>
              <td colspan="2">
                <!-- KSD V001.000 DS -->
                <!-- <input -->
                  <!-- type="text" -->
                  <!-- :class="this.kanaErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'" -->
                  <!-- class="textKana" -->
                  <!-- ref="kanaText" -->
                  <!-- v-model="productData.kana" -->
                  <!-- :placeholder="this.$i18n.t('F00108.S037')" -->
                  <!-- maxlength="40" -->
                  <!-- tabindex="102" -->
                  <!-- :@input="inputLimit(productData.kana,40)"> -->
                <!-- KSD V001.000 DE -->
                <!-- KSD V001.000 AS -->
                <input
                  type="text"
                  :class="this.kanaErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'"
                  class="textKana"
                  ref="kanaText"
                  v-model="productData.kana"
                  :placeholder="this.$i18n.t('F00108.S037')"
                  maxlength="40"
                  tabindex="0"
                  :@input="inputLimit(productData.kana,40)">
                  <!-- KSD V001.000 AE -->
              </td>
            </tr>
            <!-- カナ名称(エラーメッセージ) -->
            <tr
              v-if="this.kanaErrorMsg !== ''"
              class="errorCell">
              <th />
              <td colspan="2">
                <div
                  v-for="kanaMsg in kanaErrorMsg"
                  :key="kanaMsg">
                  <label>{{ kanaMsg }}</label>
                </div>
              </td>
            </tr>
            <!-- レシート印字名称 -->
            <tr>
              <th>{{ $t("F00108.S018") }}</th>
              <!-- KSD V001.000 DS -->
              <!-- <input -->
                <!-- type="text" -->
                <!-- :class="this.receiptErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'" -->
                <!-- class="textReceipt" -->
                <!-- ref="receiptText" -->
                <!-- v-model="productData.receipt" -->
                <!-- :placeholder="this.$i18n.t('F00108.S036')" -->
                <!-- tabindex="103" -->
                <!-- :@input="inputLimit(productData.receipt,40)" > -->
              <!-- KSD V001.000 DE -->
              <!-- KSD V001.000 AS -->
              <td colspan="2">
                <input
                  type="text"
                  :class="this.receiptErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'"
                  class="textReceipt"
                  ref="receiptText"
                  v-model="productData.receipt"
                  :placeholder="this.$i18n.t('F00108.S036')"
                  tabindex="0"
                  :@input="inputLimit(productData.receipt,40)" >
              <!-- KSD V001.000 AE -->
              </td>
            </tr>
            <!-- レシート印字名称(エラーメッセージ) -->
            <tr
              v-if="this.receiptErrorMsg !== ''"
              class="errorCell">
              <th />
              <td colspan="2">
                <div
                  v-for="receiptMsg in receiptErrorMsg"
                  :key="receiptMsg">
                  <label>{{ receiptMsg }}</label>
                </div>
              </td>
            </tr>
            <!-- KSD V001.000 AS -->
            <!-- 名称２（漢字１用）-->
            <tr>
              <th>{{ $t("F00108.S076") }}</th>
              <td colspan="2">
                <input
                  type="text"
                  :id="!isMenuCode ? 'readOnlyText' : ''"
                  :class="this.name2ErrorMsg !== '' ? 'errorTextBox' : 'editTextBox bg-disable'"
                  class="textName2"
                  ref="name2Text"
                  v-model="productData.Name2"
                  :placeholder="this.$i18n.t('F00108.S077')"
                  tabindex="0"
                  :disabled="!isMenuCode"
                  @input="inputLimit(productData.Name2, 24)" >
              </td>
            </tr>

            <!-- 名称３（漢字２用）-->
            <tr>
              <th>{{ $t("F00108.S078") }}</th>
              <td colspan="2">
                <input
                  type="text"
                  :id="!isMenuCode ? 'readOnlyText' : ''"
                  :class="this.name3ErrorMsg !== '' ? 'errorTextBox' : 'editTextBox bg-disable'"
                  class="textName3"
                  ref="name3Text"
                  v-model="productData.Name3"
                  :placeholder="this.$i18n.t('F00108.S077')"
                  tabindex="0"
                  :disabled="!isMenuCode"
                  @input="inputLimit(productData.Name3, 24)" >
              </td>
            </tr>
            <!-- KSD V001.000 AE -->
            <!-- レシート印字区分 -->
            <tr>
              <th>{{ $t("F00108.S066") }}</th>
              <td>
                <!-- KSD V001.000 DS -->
                <!-- <select -->
                <!-- v-model="productData.receiptPrintType" -->
                <!-- class="SelectBox" -->
                <!-- ref="receiptPrintTypeText" -->
                <!-- tabindex="104" -->
                <!-- style="color:#000000"> -->
                <!-- <option -->
                  <!-- v-for="receiptPrintTypeItem in receiptPrintTypeList" -->
                  <!-- :key="receiptPrintTypeItem.code" -->
                  <!-- :value="receiptPrintTypeItem.code">{{ receiptPrintTypeItem.value }}</option> -->
                <!-- </select> -->
                <!-- KSD V001.000 DE -->
                <!-- KSD V001.000 AS -->
                <select
                  v-model="productData.receiptPrintType"
                  class="SelectBox"
                  ref="receiptPrintTypeText"
                  tabindex="0"
                  style="color:#000000">
                  <option
                    v-for="receiptPrintTypeItem in receiptPrintTypeList"
                    :key="receiptPrintTypeItem.code"
                    :value="receiptPrintTypeItem.code">{{ receiptPrintTypeItem.value }}</option>
                </select>
                <!-- KSD V001.000 AE -->
                <div class="pulldownArrow"/>
              </td>
            </tr>

            <!-- POS売上税区分 -->
            <tr>
              <th>{{ $t("F00108.S019") }}</th>
              <td>
                <!-- KSD V001.000 DS -->
                <!-- <select -->
                <!-- v-model="productData.taxType" -->
                <!-- class="SelectBox" -->
                <!-- ref="taxTypeText" -->
                <!-- tabindex="105" -->
                <!-- style="color:#000000"> -->
                <!-- <option -->
                  <!-- v-for="taxTypeItem in taxTypeList" -->
                  <!-- :key="taxTypeItem.code" -->
                  <!-- :value="taxTypeItem.code">{{ taxTypeItem.value }}</option> -->
                <!-- </select> -->
                <!-- KSD V001.000 DE -->
                <!-- KSD V001.000 AS -->
                <select
                  v-model="productData.taxType"
                  class="SelectBox"
                  ref="taxTypeText"
                  tabindex="0"
                  style="color:#000000">
                  <option
                    v-for="taxTypeItem in taxTypeList"
                    :key="taxTypeItem.code"
                    :value="taxTypeItem.code">{{ taxTypeItem.value }}</option>
                </select>
                <!-- KSD V001.000 AE -->
                <div class="pulldownArrow"/>
              </td>
            </tr>
            <!-- KSD V001.000 DS -->
            <!-- 売単価 -->
            <!-- KSD V001.000 DE -->
            <!-- KSD V001.000 AS -->
            <!-- 原単価 -->
            <!-- KSD V001.000 AE -->
            <tr>
            <!-- KSD V001.000 DS -->
            <!-- <th>{{ $t("F00108.S021") }}</th> -->
            <!-- KSD V001.000 DE -->
            <!-- KSD V001.000 AS -->
              <th>{{ $t("F00108.S020") }}</th>
            <!-- KSD V001.000 AE -->
              <td colspan="2">
            <!-- KSD V001.000 DS -->
            <!-- <input -->
            <!--  type="text" -->
            <!--  :class="this.sellPriceErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'" -->
            <!--  class="textSellPrice underLine NumericStyle" -->
            <!--  ref="sellPriceText" -->
            <!--  v-model="productData.sellPrice" -->
            <!--  :placeholder="this.$i18n.t('F00108.S039')" -->
            <!--  maxlength="7" -->
            <!--  @input="numInputRegulation" -->
            <!--  tabindex="106"> -->
            <!-- KSD V001.000 DE -->
            <!-- KSD V001.000 AS -->
                <input
                  type="text"
                  :class="this.costErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'"
                  class="textCost underLine NumericStyle"
                  ref="costText"
                  v-model="productData.cost"
                  :placeholder="this.$i18n.t('F00108.S038')"
                  maxlength="7"
                  @input="numInputRegulation"
                  tabindex="0">
                <!-- KSD V001.000 AE -->
              </td>
            </tr>
            <!-- KSD V001.000 DS -->
            <!-- 売単価(エラーメッセージ) -->
            <!-- <tr -->
            <!--  v-if="this.sellPriceErrorMsg !== ''" -->
            <!--  class="errorCell"> -->
            <!--  <th /> -->
            <!--  <td colspan="2"> -->
            <!--   <div -->
            <!--    v-for="sellPriceMsg in sellPriceErrorMsg" -->
            <!--    :key="sellPriceMsg"> -->
            <!--     <label>{{ sellPriceMsg }}</label> -->
            <!--   </div> -->
            <!--  </td> -->
            <!-- </tr> -->
            <!-- KSD V001.000 DE -->
            <!-- KSD V001.000 AS -->
            <!-- 原単価(エラーメッセージ) -->
            <!-- KSD V001.000 AE -->
            <!-- KSD V001.000 AS -->
            <tr
              v-if="this.costErrorMsg !== ''"
              class="errorCell">
              <th />
              <td colspan="2">
                <div
                  v-for="costMsg in costErrorMsg"
                  :key="costMsg">
                  <label>{{ costMsg }}</label>
                </div>
              </td>
            </tr>
            <!-- KSD V001.000 AE -->
            <!-- KSD V001.000 DS -->
            <!-- 原単価 -->
            <!-- <tr> -->
            <!-- <th>{{ $t("F00108.S020") }}</th> -->
            <!--  <td colspan="2"> -->
            <!--  <input -->
            <!--   type="text" -->
            <!--   :class="this.costErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'" -->
            <!--   class="textCost underLine NumericStyle" -->
            <!--   ref="costText" -->
            <!--   v-model="productData.cost" -->
            <!--   :placeholder="this.$i18n.t('F00108.S038')" -->
            <!--   maxlength="7" -->
            <!--   @input="numInputRegulation" -->
            <!--   tabindex="107"> -->
            <!--  </td> -->
            <!-- </tr> -->
            <!-- 原単価(エラーメッセージ) -->
            <!-- <tr -->
            <!--  v-if="this.costErrorMsg !== ''" -->
            <!--   class="errorCell"> -->
            <!--   <th /> -->
            <!--    <td colspan="2"> -->
            <!--     <div -->
            <!--      v-for="costMsg in costErrorMsg" -->
            <!--      :key="costMsg"> -->
            <!--       <label>{{ costMsg }}</label> -->
            <!--     </div> -->
            <!--    </td> -->
            <!-- </tr> -->
            <!-- KSD V001.000 DE -->
            <!-- KSD V001.000 AS -->
            <!-- 売単価 -->
            <tr>
              <th>{{ $t("F00108.S021") }}</th>
              <td colspan="2">
                <input
                  type="text"
                  :class="this.sellPriceErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'"
                  class="textSellPrice underLine NumericStyle"
                  ref="sellPriceText"
                  v-model="productData.sellPrice"
                  :placeholder="this.$i18n.t('F00108.S039')"
                  maxlength="7"
                  @input="numInputRegulation"
                  tabindex="0">
              </td>
            </tr>
            <!-- 売単価(エラーメッセージ) -->
            <tr
              v-if="this.sellPriceErrorMsg !== ''"
              class="errorCell">
              <th />
              <td colspan="2">
                <div
                  v-for="sellPriceMsg in sellPriceErrorMsg"
                  :key="sellPriceMsg">
                  <label>{{ sellPriceMsg }}</label>
                </div>
              </td>
            </tr>
            <!-- KSD V001.000 AE -->
            <!-- 定価単価 -->
            <tr>
              <th>{{ $t("F00108.S070") }}</th>
              <td colspan="2">
                <!-- KSD V001.000 DS -->
                <!-- <input -->
                  <!-- type="text" -->
                  <!-- :class="this.manufacturerPriceErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'" -->
                  <!-- class="textManufacturerPrice underLine NumericStyle" -->
                  <!-- ref="manufacturerPriceText" -->
                  <!-- v-model="productData.manufacturerPrice" -->
                  <!-- :placeholder="this.$i18n.t('F00108.S039')" -->
                  <!-- maxlength="7" -->
                  <!-- @input="numInputRegulation" -->
                  <!-- tabindex="108"> -->
                <!-- KSD V001.000 DE -->
                <!-- KSD V001.000 AS -->
                <input
                  type="text"
                  :class="this.manufacturerPriceErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'"
                  class="textManufacturerPrice underLine NumericStyle"
                  ref="manufacturerPriceText"
                  v-model="productData.manufacturerPrice"
                  :placeholder="this.$i18n.t('F00108.S039')"
                  maxlength="7"
                  @input="numInputRegulation"
                  tabindex="0">
                  <!-- KSD V001.000 AE -->
              </td>
            </tr>
            <!-- 定価単価(エラーメッセージ) -->
            <tr
              v-if="this.manufacturerPriceErrorMsg !== ''"
              class="errorCell">
              <th />
              <td colspan="2">
                <div
                  v-for="manufacturerPriceMsg in manufacturerPriceeErrorMsg"
                  :key="manufacturerPriceMsg">
                  <label>{{ manufacturerPriceMsg }}</label>
                </div>
              </td>
            </tr>
            <!-- KSD V001.000 AS -->
            <!-- サブ単価（内税込み） -->
            <tr>
              <th>{{ $t("F00108.S179") }}</th>
              <td colspan="2">
                <input
                  type="number"
                  :id="!isMenuCode ? 'readOnlyText' : ''"
                  :class="this.manufacturerPriceErrorMsg !== '' ? 'errorTextBox' : 'editTextBox bg-disable'"
                  ref="SubTanka_TaxInText"
                  v-model="productData.SubTanka_TaxIn"
                  :placeholder="this.$i18n.t('F00108.S080')"
                  maxlength="8"
                  @input="(e) => inputNumberLimit(e, productData, 'SubTanka_TaxIn', 8)"
                  :disabled="!isMenuCode"
                  tabindex="0">
              </td>
            </tr>
            <!-- KSD V001.000 AE -->
            <!-- 商品区分 -->
            <tr>
              <th>{{ $t("F00108.S022") }}</th>
              <td>
                <!-- KSD V001.000 DS -->
                <!-- <select -->
                  <!-- v-model="productData.productType" -->
                  <!-- class="SelectBox" -->
                  <!-- ref="productTypeText" -->
                  <!-- tabindex="109" -->
                  <!-- style="color:#000000"> -->
                  <!-- <option -->
                    <!-- v-for="productTypeItem in productTypeList" -->
                    <!-- :key="productTypeItem.code" -->
                    <!-- :value="productTypeItem.code">{{ productTypeItem.value }}</option> -->
                <!-- </select> -->
                <!-- KSD V001.000 DE-->
                <!-- KSD V001.000 AS -->
                <select
                  v-model="productData.productType"
                  class="SelectBox"
                  ref="productTypeText"
                  tabindex="0"
                  style="color:#000000">
                  <option
                    v-for="productTypeItem in productTypeList"
                    :key="productTypeItem.code"
                    :value="productTypeItem.code">{{ productTypeItem.value }}</option>
                </select>
                <!-- KSD V001.000 AE -->
                <div class="pulldownArrow"/>
              </td>
            </tr>

            <!-- 年齢確認商品 -->
            <tr>
              <th>{{ $t("F00108.S023") }}</th>
              <td>
                <!-- KSD V001.000 DS -->
                <!-- <select -->
                  <!-- v-model="productData.ageCheckType" -->
                  <!-- class="SelectBox" -->
                  <!-- ref="ageCheckTypeText" -->
                  <!-- tabindex="110" -->
                  <!-- style="color:#000000"> -->
                  <!-- <option -->
                    <!-- v-for="ageCheckTypeItem in ageCheckTypeList" -->
                    <!-- :key="ageCheckTypeItem.code" -->
                    <!-- :value="ageCheckTypeItem.code">{{ ageCheckTypeItem.value }}</option> -->
                <!-- </select> -->
                <!-- KSD V001.000 DE -->
                <!-- KSD V001.000 AS -->
                <select
                  v-model="productData.ageCheckType"
                  class="SelectBox"
                  ref="ageCheckTypeText"
                  tabindex="0"
                  style="color:#000000">
                  <option
                    v-for="ageCheckTypeItem in ageCheckTypeList"
                    :key="ageCheckTypeItem.code"
                    :value="ageCheckTypeItem.code">{{ ageCheckTypeItem.value }}</option>
                </select>
                <!-- KSD V001.000 AE -->
                <div class="pulldownArrow"/>
              </td>
            </tr>

            <!-- 割引区分
          <tr>
            <th>{{ $t("F00108.S024") }}</th>
            <td>
              <select v-model="productData.discountType" class="SelectBox" ref="discountTypeText" tabindex="111" style="color:#000000">
                <option v-for="discountTypeItem in discountTypeList" :key="discountTypeItem.code" :value="discountTypeItem.code">{{ discountTypeItem.value }}</option>
              </select>
              <div class="pulldownArrow"></div>
            </td>
          </tr> -->

            <!-- 割増区分
          <tr>
            <th>{{ $t("F00108.S025") }}</th>
            <td>
              <select v-model="productData.premiunType" class="SelectBox" ref="premiunTypeText" tabindex="112" style="color:#000000">
                <option v-for="premiunTypeItem in premiunTypeList" :key="premiunTypeItem.code" :value="premiunTypeItem.code">{{ premiunTypeItem.value }}</option>
              </select>
              <div class="pulldownArrow"></div>
            </td>
          </tr> -->

            <!-- 値引区分 -->
            <tr>
              <th>{{ $t("F00108.S026") }}</th>
              <td>
                <!-- KSD V001.000 DS -->
                <!-- <select -->
                  <!-- v-model="productData.pricedownType" -->
                  <!-- class="SelectBox" -->
                  <!-- ref="pricedownTypeText" -->
                  <!-- tabindex="113" -->
                  <!-- style="color:#000000"> -->
                  <!-- <option -->
                    <!-- v-for="pricedownTypeItem in pricedownTypeList" -->
                    <!-- :key="pricedownTypeItem.code" -->
                    <!-- :value="pricedownTypeItem.code">{{ pricedownTypeItem.value }}</option> -->
                <!-- </select> -->
                <!-- KSD V001.000 DE -->
                <!-- KSD V001.000 AS -->
                <select
                  v-model="productData.pricedownType"
                  class="SelectBox"
                  ref="pricedownTypeText"
                  tabindex="0"
                  style="color:#000000">
                  <option
                    v-for="pricedownTypeItem in pricedownTypeList"
                    :key="pricedownTypeItem.code"
                    :value="pricedownTypeItem.code">{{ pricedownTypeItem.value }}</option>
                </select>
                <!-- KSD V001.000 AE -->
                <div class="pulldownArrow"/>
              </td>
            </tr>

            <!-- 売変区分 -->
            <tr>
              <th>{{ $t("F00108.S027") }}</th>
              <td>
                <!-- KSD V001.000 DS -->
                <!-- <select -->
                  <!-- v-model="productData.priceChangeType" -->
                  <!-- class="SelectBox" -->
                  <!-- ref="priceChangeTypeText" -->
                  <!-- tabindex="114" -->
                  <!-- style="color:#000000"> -->
                  <!-- <option -->
                    <!-- v-for="priceChangeTypeItem in priceChangeTypeList" -->
                    <!-- :key="priceChangeTypeItem.code" -->
                    <!-- :value="priceChangeTypeItem.code">{{ priceChangeTypeItem.value }}</option> -->
                <!-- </select> -->
                <!-- KSD V001.000 DE -->
                <!-- KSD V001.000 AS -->
                <select
                  v-model="productData.priceChangeType"
                  class="SelectBox"
                  ref="priceChangeTypeText"
                  tabindex="0"
                  style="color:#000000">
                  <option
                    v-for="priceChangeTypeItem in priceChangeTypeList"
                    :key="priceChangeTypeItem.code"
                    :value="priceChangeTypeItem.code">{{ priceChangeTypeItem.value }}</option>
                </select>
                <!-- KSD V001.000 AE -->
                <div class="pulldownArrow"/>
              </td>
            </tr>

            <!-- 小計値引割引按分処理区分 -->
            <tr>
              <th>{{ $t("F00108.S028") }}</th>
              <td>
                <!-- KSD V001.000 DS -->
                <!-- <select -->
                  <!-- v-model="productData.discountParType" -->
                  <!-- class="SelectBox" -->
                  <!-- ref="discountParTypeText" -->
                  <!-- tabindex="115" -->
                  <!-- style="color:#000000"> -->
                  <!-- <option -->
                    <!-- v-for="discountParTypeItem in discountParTypeList" -->
                    <!-- :key="discountParTypeItem.code" -->
                    <!-- :value="discountParTypeItem.code">{{ discountParTypeItem.value }}</option> -->
                <!-- </select> -->
                <!-- KSD V001.000 DE -->
                <!-- KSD V001.000 AS -->
                <select
                  v-model="productData.discountParType"
                  class="SelectBox"
                  ref="discountParTypeText"
                  tabindex="0"
                  style="color:#000000">
                  <option
                    v-for="discountParTypeItem in discountParTypeList"
                    :key="discountParTypeItem.code"
                    :value="discountParTypeItem.code">{{ discountParTypeItem.value }}</option>
                </select>
                <!-- KSD V001.000 AE -->
                <div class="pulldownArrow"/>
              </td>
            </tr>

            <!-- 金額強制入力 -->
            <tr>
              <th>{{ $t("F00108.S067") }}</th>
              <td>
                <!-- KSD V001.000 DS -->
                <!-- <select -->
                  <!-- v-model="productData.priceRequiredType" -->
                  <!-- class="SelectBox" -->
                  <!-- ref="priceRequiredText" -->
                  <!-- tabindex="116" -->
                  <!-- style="color:#000000"> -->
                  <!-- <option -->
                    <!-- v-for="priceRequiredTypeItem in priceRequiredTypeList" -->
                    <!-- :key="priceRequiredTypeItem.code" -->
                    <!-- :value="priceRequiredTypeItem.code">{{ priceRequiredTypeItem.value }}</option> -->
                <!-- </select> -->
                <!-- KSD V001.000 DE -->
                <!-- KSD V001.000 AS -->
                <select
                  v-model="productData.priceRequiredType"
                  class="SelectBox"
                  ref="priceRequiredText"
                  tabindex="0"
                  style="color:#000000">
                  <option
                    v-for="priceRequiredTypeItem in priceRequiredTypeList"
                    :key="priceRequiredTypeItem.code"
                    :value="priceRequiredTypeItem.code">{{ priceRequiredTypeItem.value }}</option>
                </select>
                <!-- KSD V001.000 AE -->
                <div class="pulldownArrow"/>
              </td>
            </tr>

            <!-- 0円単価区分
          <tr>
            <th>{{ $t("F00108.S029") }}</th>
            <td>
              <select v-model="productData.zeroPriceType" class="SelectBox" ref="zeroPriceTypeText" tabindex="117" style="color:#000000">
                <option v-for="zeroPriceTypeItem in zeroPriceTypeList" :key="zeroPriceTypeItem.code" :value="zeroPriceTypeItem.code">{{ zeroPriceTypeItem.value }}</option>
              </select>
              <div class="pulldownArrow"></div>
            </td>
          </tr>
          -->

            <!-- 決済種別区分 -->
            <tr>
              <th>{{ $t("F00108.S071") }}</th>
              <!-- G001.00.0 Update-Start -->
              <!-- <td>
                <select
                  v-model="productData.paymentType"
                  class="SelectBox disableInput"
                  ref="paymentTypeText"
                  tabindex="118"
                  :disabled="true">
                  <option
                    v-for="paymentTypeItem in paymentTypeList"
                    :key="paymentTypeItem"
                    :value="paymentTypeItem">{{ paymentTypeItem }}</option>
                </select>
                <div class="pulldownArrow"/>
              </td> -->
              <td
                class="pulldownCellStyle"
                style="height: 100%;">
                <div style="height: 49px; position: relative;">
                  <input
                    type="text"
                    v-model="targetExlusionsName"
                    class="editTextBox"
                    :disabled=true
                    style="position: absolute; width: calc(100% - 64px); height: 100%; top: 0; left: 0;" >
                  <div class="buttomLabel">
                <!-- KSD V001.000 DS -->
                <!--<v-btn -->
                <!--  @click="selectPaymentExlusions" -->
                <!--  :disabled="paymentTypeList.length == 0" -->
                <!--  style="width: 28px; height: 40px;"> -->
                <!--  <span class="rightArrow"/> -->
                <!-- </v-btn> -->
                <!-- KSD V001.000 DE -->
                <!-- KSD V001.000 AS -->
                    <v-btn
                      @click="selectPaymentExlusions"
                      :disabled="paymentTypeList.length == 0"
                      tabindex="0"
                      style="width: 28px; height: 40px;">
                      <span class="rightArrow"/>
                    </v-btn>
                <!-- KSD V001.000 AE -->
                  </div>
                </div>
              </td>
              <!-- G001.00.0 Update-End -->
            </tr>
            <!-- 免税区分 -->
            <tr>
              <th>{{ $t("F00108.S030") }}</th>
              <td>
                <!-- KSD V001.000 DS -->
                <!-- <select -->
                  <!-- v-model="productData.dutyFreeType" -->
                  <!-- class="SelectBox" -->
                  <!-- ref="dutyFreeTypeText" -->
                  <!-- tabindex="119" -->
                  <!-- style="color:#000000"> -->
                  <!-- <option -->
                    <!-- v-for="dutyFreeTypeItem in dutyFreeTypeList" -->
                    <!-- :key="dutyFreeTypeItem.code" -->
                    <!-- :value="dutyFreeTypeItem.code">{{ dutyFreeTypeItem.value }}</option> -->
                <!-- </select> -->
                <!-- KSD V001.000 DE -->
                <!-- KSD V001.000 AS -->
                <select
                  v-model="productData.dutyFreeType"
                  class="SelectBox"
                  ref="dutyFreeTypeText"
                  tabindex="0"
                  style="color:#000000">
                  <option
                    v-for="dutyFreeTypeItem in dutyFreeTypeList"
                    :key="dutyFreeTypeItem.code"
                    :value="dutyFreeTypeItem.code">{{ dutyFreeTypeItem.value }}</option>
                </select>
                <!-- KSD V001.000 AE -->
                <div class="pulldownArrow"/>
              </td>
            </tr>

            <!-- 販売開始日 -->
            <tr>
              <th>{{ $t("F00108.S031") }}</th>
              <td>
                <!-- KSD V001.000 DS -->
                  <!-- <input -->
                  <!-- type="text" -->
                  <!-- :class="this.sellStartDateErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'" -->
                  <!-- class="textSellStartDate" -->
                  <!-- ref="sellStartDateText" -->
                  <!-- v-model="productData.sellStartDate" -->
                  <!-- :placeholder="this.$i18n.t('F00108.S064')" -->
                  <!-- maxlength="10" -->
                  <!-- @input="dateInputRegulation" -->
                  <!-- :tabindex="120" > -->
                <!-- KSD V001.000 DE -->
                <!-- KSD V001.000 AS -->
                <input
                  type="text"
                  :class="this.sellStartDateErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'"
                  class="textSellStartDate"
                  ref="sellStartDateText"
                  v-model="productData.sellStartDate"
                  :placeholder="this.$i18n.t('F00108.S064')"
                  maxlength="10"
                  @input="dateInputRegulation"
                  :tabindex="0" >
                  <!-- KSD V001.000 AE -->
              </td>
            </tr>
            <!-- 販売開始日(エラーメッセージ) -->
            <tr
              v-if="this.sellStartDateErrorMsg !== ''"
              class="errorCell">
              <th />
              <td colspan="2">
                <!-- DS KSD V001.000 86855 -->
                <!-- <div
                  v-for="sellStartDateMsg in sellStartDateErrorMsg"
                  :key="sellStartDateMsg">
                  <label>{{ sellStartDateMsg }}</label>
                </div> -->
                <!-- DE KSD V001.000 86855 -->
                <!-- AS KSD V001.000 86855 -->
                <div>
                  <label>{{ this.sellStartDateErrorMsg }}</label>
                </div>
                <!-- AE KSD V001.000 86855 -->
              </td>
            </tr>

            <!-- 販売終了日 -->
            <tr>
              <th>{{ $t("F00108.S032") }}</th>
              <td>
                <!-- KSD V001.000 DS -->
                  <!-- <input -->
                  <!-- type="text" -->
                  <!-- :class="this.sellEndDateErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'" -->
                  <!-- class="textSellEndDate" -->
                  <!-- ref="sellEndDateText" -->
                  <!-- v-model="productData.sellEndDate" -->
                  <!-- :placeholder="this.$i18n.t('F00108.S065')" -->
                  <!-- maxlength="10" -->
                  <!-- @input="dateInputRegulation" -->
                  <!-- :tabindex="121" > -->
                <!-- KSD V001.000 DE -->
                <!-- KSD V001.000 AS -->
                <input
                  type="text"
                  :class="this.sellEndDateErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'"
                  class="textSellEndDate"
                  ref="sellEndDateText"
                  v-model="productData.sellEndDate"
                  :placeholder="this.$i18n.t('F00108.S065')"
                  maxlength="10"
                  @input="dateInputRegulation"
                  :tabindex="0" >
                  <!-- KSD V001.000 AE -->
              </td>
            </tr>
            <!-- 販売終了日(エラーメッセージ) -->
            <tr
              v-if="this.sellEndDateErrorMsg !== ''"
              class="errorCell">
              <th />
              <td colspan="2">
                <!-- DS KSD V001.000 86855 -->
                <!-- <div
                  v-for="sellEndDateMsg in sellEndDateErrorMsg"
                  :key="sellEndDateMsg">
                  <label>{{ sellEndDateMsg }}</label>
                </div> -->
                <!-- DE KSD V001.000 86855 -->
                <!-- AS KSD V001.000 86855 -->
                <div>
                  <label>{{ this.sellEndDateErrorMsg }}</label>
                </div>
                <!-- AE KSD V001.000 86855 -->
              </td>
            </tr>

            <!-- 販売停止区分 -->
            <tr>
              <th>{{ $t("F00108.S033") }}</th>
              <td>
                <!-- KSD V001.000 DS -->
                <!-- <select -->
                  <!-- v-model="productData.sellStopType" -->
                  <!-- class="SelectBox" -->
                  <!-- ref="sellStopTypeText" -->
                  <!-- tabindex="122" -->
                  <!-- style="color:#000000"> -->
                  <!-- <option -->
                    <!-- v-for="sellStopTypeItem in sellStopTypeList" -->
                    <!-- :key="sellStopTypeItem.code" -->
                    <!-- :value="sellStopTypeItem.code">{{ sellStopTypeItem.value }}</option> -->
                <!-- </select> -->
                <!-- KSD V001.000 DE -->
                <!-- KSD V001.000 AS -->
                <select
                  v-model="productData.sellStopType"
                  class="SelectBox"
                  ref="sellStopTypeText"
                  tabindex="0"
                  style="color:#000000">
                  <option
                    v-for="sellStopTypeItem in sellStopTypeList"
                    :key="sellStopTypeItem.code"
                    :value="sellStopTypeItem.code">{{ sellStopTypeItem.value }}</option>
                </select>
                <!-- KSD V001.000 AE -->
                <div class="pulldownArrow"/>
              </td>
            </tr>

            <!-- 最終更新日時 -->
            <tr>
              <th>{{ $t("F00108.S034") }}</th>
              <td>
                <input
                  type="text"
                  id="lastUpdate"
                  ref="lastUpdateText"
                  v-model="productData.lastUpdate"
                  :disabled=true
                  maxlength="23"
                  tabindex="-1"
                  class="editTextBox disableInput">
              </td>
            </tr>
            <!-- KSD V001.000 AS -->
            <!-- 単価ステータス -->
            <tr>
              <th>{{ $t("F00108.S081") }}</th>
              <td>
                <select
                  v-model="productData.TankaSts"
                  :id="!isMenuCode ? 'readOnlyText' : ''"
                  class="SelectBox bg-disable"
                  ref="unitPriceStatusText"
                  tabindex="0"
                  :disabled="!isMenuCode"
                  style="color:#000000">
                  <option
                    v-for="unitPriceStatus in unitPriceStatusList"
                    :key="unitPriceStatus.code"
                    :value="unitPriceStatus.code">{{ unitPriceStatus.value }}</option>
                </select>
                <div class="pulldownArrow"/>
              </td>
            </tr>

            <!-- チケット発行対象メニュー -->
            <tr>
              <th>{{ $t("F00108.S084") }}</th>
              <td>
                <select
                  v-model="productData.TicketSts"
                  :id="!isMenuCode ? 'readOnlyText' : ''"
                  class="SelectBox bg-disable"
                  ref="ticketIssueTargetMenuText"
                  tabindex="0"
                  :disabled="!isMenuCode"
                  style="color:#000000">
                  <option
                    v-for="ticketIssueTargetMenu in ticketIssueTargetMenuList"
                    :key="ticketIssueTargetMenu.code"
                    :value="ticketIssueTargetMenu.code">{{ ticketIssueTargetMenu.value }}</option>
                </select>
                <div class="pulldownArrow"/>
              </td>
            </tr>

            <!-- 数量加算 -->
            <tr>
              <th>{{ $t("F00108.S085") }}</th>
              <td>
                <select
                  v-model="productData.AddQtySts"
                  :id="!isMenuCode ? 'readOnlyText' : ''"
                  class="SelectBox bg-disable"
                  ref="quantityAddedText"
                  tabindex="0"
                  :disabled="!isMenuCode"
                  style="color:#000000">
                  <option
                    v-for="quantityAdded in quantityAddedList"
                    :key="quantityAdded.code"
                    :value="quantityAdded.code">{{ quantityAdded.value }}</option>
                </select>
                <div class="pulldownArrow"/>
              </td>
            </tr>

            <!-- 小計割引／割増 -->
            <tr>
              <th>{{ $t("F00108.S088") }}</th>
              <td>
                <select
                  v-model="productData.StlDiscSts"
                  :id="!isMenuCode ? 'readOnlyText' : ''"
                  class="SelectBox bg-disable"
                  ref="subTotalDiscountSurchargeText"
                  tabindex="0"
                  :disabled="!isMenuCode"
                  style="color:#000000">
                  <option
                    v-for="subTotalDiscountSurcharge in subTotalDiscountSurchargeList"
                    :key="subTotalDiscountSurcharge.code"
                    :value="subTotalDiscountSurcharge.code">{{ subTotalDiscountSurcharge.value }}</option>
                </select>
                <div class="pulldownArrow"/>
              </td>
            </tr>

            <!-- 持帰ステータス -->
            <tr>
              <th>{{ $t("F00108.S089") }}</th>
              <td>
                <select
                  v-model="productData.TOSts"
                  :id="!isMenuCode ? 'readOnlyText' : ''"
                  class="SelectBox bg-disable"
                  ref="takeHomeStatusText"
                  tabindex="0"
                  :disabled="!isMenuCode"
                  style="color:#000000">
                  <option
                    v-for="takeHomeStatus in takeHomeStatusList"
                    :key="takeHomeStatus.code"
                    :value="takeHomeStatus.code">{{ takeHomeStatus.value }}</option>
                </select>
                <div class="pulldownArrow"/>
              </td>
            </tr>

            <!-- 奉仕料ステータス -->
            <tr>
              <th>{{ $t("F00108.S093") }}</th>
              <td>
                <select
                  v-model="productData.HoSts"
                  :id="!isMenuCode ? 'readOnlyText' : ''"
                  class="SelectBox bg-disable"
                  ref="serviceFeeStatusText"
                  tabindex="0"
                  :disabled="!isMenuCode"
                  style="color:#000000">
                  <option
                    v-for="serviceFeeStatus in serviceFeeStatusList"
                    :key="serviceFeeStatus.code"
                    :value="serviceFeeStatus.code">{{ serviceFeeStatus.value }}</option>
                </select>
                <div class="pulldownArrow"/>
              </td>
            </tr>

            <!-- 自動トッピング -->
            <tr>
              <th>{{ $t("F00108.S097") }}</th>
              <td>
                <select
                  v-model="productData.AutoTP"
                  :id="!isMenuCode ? 'readOnlyText' : ''"
                  class="SelectBox bg-disable"
                  ref="autoToppingText"
                  tabindex="0"
                  :disabled="!isMenuCode"
                  style="color:#000000">
                  <option
                    v-for="autoTopping in autoToppingList"
                    :key="autoTopping.code"
                    :value="autoTopping.code">{{ autoTopping.value }}</option>
                </select>
                <div class="pulldownArrow"/>
              </td>
            </tr>

            <!-- 主メニュー(前払いセルフ) -->
            <tr>
              <th>{{ $t("F00108.S098") }}</th>
              <td>
                <select
                  v-model="productData.TankaFFU2_TaxOut"
                  :id="!isMenuCode ? 'readOnlyText' : ''"
                  class="SelectBox bg-disable"
                  ref="mainMenuAdvSelfPayText"
                  tabindex="0"
                  :disabled="!isMenuCode"
                  style="color:#000000">
                  <option
                    v-for="mainMenuAdvSelfPay in mainMenuAdvSelfPayList"
                    :key="mainMenuAdvSelfPay.code"
                    :value="mainMenuAdvSelfPay.code">{{ mainMenuAdvSelfPay.value }}</option>
                </select>
                <div class="pulldownArrow"/>
              </td>
            </tr>

            <!-- ワンオーダー対象メニュー -->
            <tr>
              <th>{{ $t("F00108.S101") }}</th>
              <td>
                <select
                  v-model="productData.TankaFFU10_TaxIn"
                  :id="!isMenuCode ? 'readOnlyText' : ''"
                  class="SelectBox bg-disable"
                  ref="oneOrderMenuText"
                  tabindex="0"
                  :disabled="!isMenuCode"
                  style="color:#000000">
                  <option
                    v-for="oneOrderMenu in oneOrderMenuList"
                    :key="oneOrderMenu.code"
                    :value="oneOrderMenu.code">{{ oneOrderMenu.value }}</option>
                </select>
                <div class="pulldownArrow"/>
              </td>
            </tr>

            <!-- アルコールステータス -->
            <tr>
              <th>{{ $t("F00108.S102") }}</th>
              <td>
                <select
                  v-model="productData.TankaFFU10_TaxOut"
                  :id="!isMenuCode ? 'readOnlyText' : ''"
                  class="SelectBox bg-disable"
                  ref="alcoholStatusText"
                  tabindex="0"
                  :disabled="!isMenuCode"
                  style="color:#000000">
                  <option
                    v-for="alcoholStatus in alcoholStatusList"
                    :key="alcoholStatus.code"
                    :value="alcoholStatus.code">{{ alcoholStatus.value }}</option>
                </select>
                <div class="pulldownArrow"/>
              </td>
            </tr>

            <!-- メニュー属性 -->
            <tr>
              <th>{{ $t("F00108.S103") }}</th>
              <td>
                <select
                  v-model="productData.MenuAttr"
                  @change="changeMenuAttribute"
                  :id="!isMenuCode ? 'readOnlyText' : ''"
                  class="SelectBox bg-disable"
                  ref="menuAttributesText"
                  tabindex="0"
                  :disabled="!isMenuCode"
                  style="color:#000000">
                  <option
                    v-for="menuAttributes in menuAttributesList"
                    :key="menuAttributes.code"
                    :value="menuAttributes.code">{{ menuAttributes.value }}</option>
                </select>
                <div class="pulldownArrow"/>
              </td>
            </tr>

            <!-- SCP指示○○指示ｽﾃｰﾀｽNo -->
            <tr style="margin: -1px 0;">
              <table
                style="width: 339%; margin-bottom: 1px; margin-left: -2px; "
                v-for="(item, index) in [...Array(12)]"
                :key="'SCP' + index">
                <tr style="posistion: fixed">
                  <th>{{ $t(`F00108.S${107+index}`) }}</th>
                  <td style="margin-top:2px">
                    <input
                      type="number"
                      class="SelectBox bg-disable"
                      :class="errorMsgMap.scpSts_No[index] ? 'errorTextBox' : 'editTextBox'"
                      :ref="`scpStsNoText${index}`"
                      v-model="productData.ScpSts_No[index]"
                      :placeholder="scpInstructionPlaceholder"
                      maxlength="2"
                      @input="(e) => inputNumberLimit(e, productData.ScpSts_No, `${index}`, 2)"
                      :disabled="!isMenuCode"
                      tabindex="0">
                  </td>
                </tr>
                <tr
                  v-if="errorMsgMap.scpSts_No[index]"
                  class="errorCell">
                  <th />
                  <td colspan="2">
                    <div>
                      <label>{{ errorMsgMap.scpSts_No[index] }}</label>
                    </div>
                  </td>
                </tr>
              </table>
            </tr>
            <!-- OESメニュー使用区分 -->
            <tr>
              <th>{{ $t("F00108.S120") }}</th>
              <td>
                <select
                  v-model="productData.OESMenuSts"
                  :id="!isMenuCode ? 'readOnlyText' : ''"
                  class="SelectBox bg-disable"
                  ref="OESMenuUseClassText"
                  tabindex="0"
                  :disabled="!isMenuCode"
                  style="color:#000000">
                  <option
                    v-for="OESMenuUseClass in OESMenuUseClassList"
                    :key="OESMenuUseClass.code"
                    :value="OESMenuUseClass.code">{{ OESMenuUseClass.value }}</option>
                </select>
                <div class="pulldownArrow"/>
              </td>
            </tr>

            <!-- 品切れ -->
            <tr>
              <th>{{ $t("F00108.S121") }}</th>
              <td>
                <select
                  v-model="productData.SoldOutSts"
                  :id="!isMenuCode ? 'readOnlyText' : ''"
                  class="SelectBox bg-disable"
                  ref="outOfStockText"
                  tabindex="0"
                  :disabled="!isMenuCode"
                  style="color:#000000">
                  <option
                    v-for="outOfStock in outOfStockList"
                    :key="outOfStock.code"
                    :value="outOfStock.code">{{ outOfStock.value }}</option>
                </select>
                <div class="pulldownArrow"/>
              </td>
            </tr>

            <!-- 注意記号対象(KD-100のみ) -->
            <tr>
              <th>{{ $t("F00108.S124") }}</th>
              <td>
                <select
                  v-model="productData.CautionMark"
                  :id="!isMenuCode ? 'readOnlyText' : ''"
                  class="SelectBox bg-disable"
                  ref="cautionSymbolTargetText"
                  tabindex="0"
                  :disabled="!isMenuCode"
                  style="color:#000000">
                  <option
                    v-for="cautionSymbolTarget in cautionSymbolTargetList"
                    :key="cautionSymbolTarget.code"
                    :value="cautionSymbolTarget.code">{{ cautionSymbolTarget.value }}</option>
                </select>
                <div class="pulldownArrow"/>
              </td>
            </tr>

            <!-- フリー宣言 -->
            <tr>
              <th>{{ $t("F00108.S125") }}</th>
              <td>
                <select
                  v-model="productData.FreeSts"
                  :id="!isMenuCode ? 'readOnlyText' : ''"
                  class="SelectBox bg-disable"
                  ref="freeDeclarationText"
                  tabindex="0"
                  :disabled="!isMenuCode"
                  style="color:#000000">
                  <option
                    v-for="freeDeclaration in freeDeclarationList"
                    :key="freeDeclaration.code"
                    :value="freeDeclaration.code">{{ freeDeclaration.value }}</option>
                </select>
                <div class="pulldownArrow"/>
              </td>
            </tr>

            <!-- フリー宣言メニュー印字 -->
            <tr>
              <th>{{ $t("F00108.S126") }}</th>
              <td>
                <select
                  v-model="productData.FreePrtSts"
                  :id="!isMenuCode ? 'readOnlyText' : ''"
                  class="SelectBox bg-disable"
                  ref="lastUpdateText"
                  tabindex="0"
                  :disabled="!isMenuCode"
                  style="color:#000000">
                  <option
                    v-for="row in defaultValues.freePrtStsList"
                    :key="row.code"
                    :value="row.code">{{ row.value }}</option>
                </select>
                <div class="pulldownArrow"/>
              </td>
            </tr>

            <!-- KP出力先ﾊﾟﾀｰﾝ変更区分 -->
            <tr>
              <th>{{ $t("F00108.S129") }}</th>
              <td>
                <select
                  v-model="productData.KcpPtnEdtFlg"
                  :id="!isMenuCode ? 'readOnlyText' : ''"
                  class="SelectBox bg-disable"
                  ref="lastUpdateText"
                  tabindex="0"
                  :disabled="!isMenuCode"
                  style="color:#000000">
                  <option
                    v-for="row in defaultValues.kcpPtnEdtFlgList"
                    :key="row.code"
                    :value="row.code">{{ row.value }}</option>
                </select>
                <div class="pulldownArrow"/>
              </td>
            </tr>

            <!-- KP○○ステータス -->
            <tr
              v-for="(item, index) in [...Array(32)]"
              :key="'KP' + index">
              <th>{{ $t(`F00108.S${index+132}`) }}</th>
              <td>
                <select
                  v-model="productData.KcpSts[index]"
                  :id="!isMenuCode ? 'readOnlyText' : ''"
                  class="SelectBox bg-disable"
                  ref="lastUpdateText"
                  :tabindex="0"
                  :disabled="!isMenuCode"
                  style="color:#000000">
                  <option
                    v-for="row in defaultValues.kcpStsList"
                    :key="row.code"
                    :value="row.code">{{ row.value }}</option>
                </select>
                <div class="pulldownArrow"/>
              </td>
            </tr>

            <!-- KP印字優先順位 -->
            <tr>
              <th>{{ $t("F00108.S166") }}</th>
              <td>
                <input
                  type="number"
                  :id="!isMenuCode ? 'readOnlyText' : ''"
                  class="SelectBox bg-disable"
                  :class="errorMsgMap.prtPriorityNo ? 'errorTextBox' : 'editTextBox'"
                  ref="prtPriorityNoText"
                  v-model="productData.PrtPriorityNo"
                  oninput="this.value = this.value.replace(/\D/g)"
                  @input="(e) => inputNumberLimit(e, productData, 'PrtPriorityNo', 2)"
                  min="0"
                  max="99"
                  :placeholder="this.$i18n.t('F00108.S167')"
                  maxlength="23"
                  :disabled="!isMenuCode"
                  tabindex="0">
              </td>
            </tr>
            <tr
              v-if="errorMsgMap.prtPriorityNo"
              class="errorCell">
              <th />
              <td colspan="2">
                <div>
                  <label>{{ errorMsgMap.prtPriorityNo }}</label>
                </div>
              </td>
            </tr>
            <!-- CCP印字位置 -->
            <tr>
              <th>{{ $t("F00108.S168") }}</th>
              <td>
                <input
                  type="number"
                  :id="!isMenuCode ? 'readOnlyText' : ''"
                  class="SelectBox bg-disable"
                  :class="errorMsgMap.ccpPrtPosi ? 'errorTextBox' : 'editTextBox'"
                  ref="ccpPrtPosiText"
                  v-model="productData.CcpPrtPosi"
                  oninput="this.value = this.value.replace(/\D/g)"
                  @input="(e) => inputNumberLimit(e, productData, 'CcpPrtPosi', 1)"
                  min="0"
                  max="99"
                  :placeholder="this.$i18n.t('F00108.S169')"
                  maxlength="23"
                  :disabled="!isMenuCode"
                  tabindex="0">
              </td>
            </tr>
            <tr
              v-if="errorMsgMap.ccpPrtPosi"
              class="errorCell">
              <th />
              <td colspan="2">
                <div>
                  <label>{{ errorMsgMap.ccpPrtPosi }}</label>
                </div>
              </td>
            </tr>
            <!-- CCP印字 -->
            <tr>
              <th>{{ $t("F00108.S170") }}</th>
              <td>
                <select
                  v-model="productData.CcpPrtSts"
                  :id="!isMenuCode ? 'readOnlyText' : ''"
                  class="SelectBox bg-disable"
                  ref="lastUpdateText"
                  tabindex="0"
                  :disabled="!isMenuCode"
                  style="color:#000000">
                  <option
                    v-for="row in defaultValues.ccpPrtStslist"
                    :key="row.code"
                    :value="row.code">{{ row.value }}</option>
                </select>
                <div class="pulldownArrow"/>
              </td>
            </tr>

            <!-- KD表示文字色(KD-90) KD場所記号(KD-100) -->
            <tr>
              <th style="font-size: small;">{{ $t("F00108.S173") }}</th>
              <td>
                <input
                  type="number"
                  :id="!isMenuCode ? 'readOnlyText' : ''"
                  class="SelectBox bg-disable"
                  :class="errorMsgMap.kdPosiMark ? 'errorTextBox' : 'editTextBox'"
                  ref="kdPosiMarkText"
                  v-model="productData.KdPosiMark"
                  oninput="this.value = this.value.replace(/\D/g)"
                  @input="(e) => inputNumberLimit(e, productData, 'KdPosiMark', 2)"
                  min="0"
                  max="99"
                  :placeholder="this.$i18n.t('F00108.S174')"
                  maxlength="23"
                  :disabled="!isMenuCode"
                  tabindex="0">
              </td>
            </tr>
            <tr
              v-if="errorMsgMap.kdPosiMark"
              class="errorCell">
              <th />
              <td colspan="2">
                <div>
                  <label>{{ errorMsgMap.kdPosiMark }}</label>
                </div>
              </td>
            </tr>
            <!-- KDオーダー経過時間１ -->
            <tr>
              <th>{{ $t("F00108.S175") }}</th>
              <td>
                <input
                  type="number"
                  :id="!isMenuCode ? 'readOnlyText' : ''"
                  class="SelectBox bg-disable"
                  :class="errorMsgMap.kdPassTime1 ? 'errorTextBox' : 'editTextBox'"
                  ref="kdPassTime1Text"
                  v-model="productData.KdPassTime1"
                  oninput="this.value = this.value.replace(/\D/g)"
                  @input="(e) => inputNumberLimit(e, productData, 'KdPassTime1', 2)"
                  min="0"
                  max="99"
                  :placeholder="this.$i18n.t('F00108.S177')"
                  maxlength="23"
                  :disabled="!isMenuCode"
                  tabindex="0">
              </td>
            </tr>
            <tr
              v-if="errorMsgMap.kdPassTime1"
              class="errorCell">
              <th />
              <td colspan="2">
                <div>
                  <label>{{ errorMsgMap.kdPassTime1 }}</label>
                </div>
              </td>
            </tr>
            <!-- KDオーダー経過時間２ -->
            <tr>
              <th>{{ $t("F00108.S176") }}</th>
              <td>
                <input
                  type="number"
                  :id="!isMenuCode ? 'readOnlyText' : ''"
                  class="SelectBox bg-disable"
                  :class="errorMsgMap.kdPassTime2 ? 'errorTextBox' : 'editTextBox'"
                  ref="kdPassTime2Text"
                  v-model="productData.KdPassTime2"
                  oninput="this.value = this.value.replace(/\D/g)"
                  @input="(e) => inputNumberLimit(e, productData, 'KdPassTime2', 2)"
                  min="0"
                  max="99"
                  :placeholder="this.$i18n.t('F00108.S177')"
                  maxlength="23"
                  :disabled="!isMenuCode"
                  tabindex="0">
              </td>
            </tr>
            <tr
              v-if="errorMsgMap.kdPassTime2"
              class="errorCell">
              <th />
              <td colspan="2">
                <div>
                  <label>{{ errorMsgMap.kdPassTime2 }}</label>
                </div>
              </td>
            </tr>
            <!-- KSD V001.000 AE -->
          </table>
        </div>
        <v-card-actions class="dialog-fotter">
          <v-spacer/>
          <div class="deleteButton">
            <!-- KSD V001.000 DS -->
            <!-- <v-btn -->
              <!-- class="button dialog-fotter-button-blue footerButtonStyle" -->
              <!-- @click="onClickDelete()" -->
              <!-- v-if="mode === 2" -->
              <!-- tabindex="201" -->
              <!-- :disabled="(!$root.approvalFlg && !$root.deleteAuth) || !this.permissions.includes('CLOUDPOS_ITEM_DELETE')"> -->
              <!-- {{ $t("O00004.S024") }} -->
            <!-- </v-btn> -->
            <!-- KSD V001.000 DE -->
            <!-- KSD V001.000 AS -->
            <v-btn
              class="button dialog-fotter-button-blue footerButtonStyle"
              @click="onClickDelete()"
              v-if="mode === 2"
              tabindex="0"
              :disabled="(!$root.approvalFlg && !$root.deleteAuth) || !this.permissions.includes('CLOUDPOS_ITEM_DELETE')">
              {{ $t("O00004.S024") }}
            </v-btn>
            <!-- KSD V001.000 AE -->
          </div>
          <!-- KSD V001.000 AS -->
          <!-- <v-btn -->
            <!-- class="button dialog-fotter-button-gray footerButtonStyle" -->
            <!-- @click="onClickReturn()" -->
            <!-- tabindex="202"> -->
            <!-- {{ $t("O00004.S003") }} -->
          <!-- </v-btn> -->
          <!-- KSD V001.000 AE -->
          <!-- KSD V001.000 DS -->
          <v-btn
            class="button dialog-fotter-button-gray footerButtonStyle"
            @click="onClickReturn()"
            tabindex="0">
            {{ $t("O00004.S003") }}
          </v-btn>
          <!-- KSD V001.000 DE -->
          <!-- KSD V001.000 DS -->
          <!-- <v-btn -->
            <!-- class="button dialog-fotter-button-orange footerButtonStyle" -->
            <!-- @click="onClickSave()" -->
            <!-- :disabled="(!$root.approvalFlg && !$root.registerAuth) || !this.permissions.includes('CLOUDPOS_ITEM_UPDATE')" -->
            <!-- tabindex="203"> -->
            <!-- {{ $t("O00004.S008") }} -->
          <!-- </v-btn> -->
          <!-- KSD V001.000 DE -->
          <!-- KSD V001.000 AS -->
          <v-btn
            class="button dialog-fotter-button-orange footerButtonStyle"
            @click="onClickSave()"
            :disabled="(!$root.approvalFlg && !$root.registerAuth) || !this.permissions.includes('CLOUDPOS_ITEM_UPDATE')"
            tabindex="0">
            {{ $t("O00004.S008") }}
          </v-btn>
          <!-- KSD V001.000 AE -->
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- G001.00.0 Add-Start -->
    <dialog-exlusion-select
      ref="dialogExlusionSelect"
      @clickSubmit="onExlusionSelected" />
    <!-- G001.00.0 Add-End -->
    <!-- KSD V001.000 AS -->
    <link-code-dialog
      ref="linkCodeDialogPopup"
      @clickSubmit="onSelectLinkCode"
    />
    <!-- KSD V001.000 AE -->
    <!-- KSD V001.000 DS -->
    <!-- <popup ref="pop"/> -->
    <!-- KSD V001.000 DE -->
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
