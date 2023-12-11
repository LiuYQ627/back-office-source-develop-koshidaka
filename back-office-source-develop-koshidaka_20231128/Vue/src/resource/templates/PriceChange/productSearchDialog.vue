<style src="./../../static/css/PriceChange/productSearchDialog.css"></style>
<script type="text/javascript" src="./../../static/js/PriceChange/productSearchDialog.js"></script>
<template>
  <div class="text-center baseFont">
    <!-- 商品検索ダイアログ -->
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
          <table id="deviceTable">
            <!-- JANコード -->
            <tr>
              <th>{{ $t("F00109.S012") }}</th>
              <td colspan="2">
                <input
                  type="text"
                  :class="this.janCodeErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'"
                  class="textJanCode"
                  ref="janCodeText"
                  v-model="janCode"
                  maxlength="14"
                  @input="numInputRegulation"
                  tabindex="101">
              </td>
            </tr>
            <!-- JANコード(エラーメッセージ) -->
            <tr
              v-if="this.janCodeErrorMsg !== ''"
              class="errorCell">
              <th />
              <td colspan="2">
                <div
                  v-for="janCodeMsg in janCodeErrorMsg"
                  :key="janCodeMsg">
                  <label>{{ janCodeMsg }}</label>
                </div>
              </td>
            </tr>
            <!-- 商品名 -->
            <tr>
              <th>{{ $t("F00109.S013") }}</th>
              <td colspan="2">
                <input
                  type="text"
                  :class="this.productNameErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'"
                  class="textProductName"
                  ref="productNameText"
                  v-model="productName"
                  :maxlength="maxLenProductName"
                  tabindex="102">
              </td>
            </tr>
            <!-- 商品名(エラーメッセージ) -->
            <tr
              v-if="this.productNameErrorMsg !== ''"
              class="errorCell">
              <th />
              <td colspan="2">
                <div
                  v-for="productNameMsg in productNameErrorMsg"
                  :key="productNameMsg">
                  <label>{{ productNameMsg }}</label>
                </div>
              </td>
            </tr>
          </table>
        </div>
        <v-card-actions class="dialog-fotter">
          <v-spacer/>
          <v-btn
            class="button dialog-fotter-button-gray footerButtonStyle"
            @click="onClickReturn()"
            tabindex="112">
            {{ $t("O00004.S003") }}
          </v-btn>
          <!-- <v-btn class="button dialog-fotter-button-orange footerButtonStyle" @click="onClickSave()"
          :disabled="this.janCode.length !== 14"
          tabindex="113">
          {{ $t("O00004.S004") }}
        </v-btn> -->
          <v-btn
            class="button dialog-fotter-button-orange footerButtonStyle"
            @click="onClickSave()"
            tabindex="113">
            {{ $t("O00004.S004") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <popup ref="pop"/>
  </div>
</template>
