<style src="@/resource/static/css/CommonDesign/utils.css" />
<style src="@/resource/static/css/PresetMaster/categoryEditDialog.css" />
<script type="text/javascript" src="@/resource/static/js/PresetMaster/itemEditDialog.js" />
<!--
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230823  zyx(Neusoft)     G001.00.0  issue課題#1603を対応します.
 * 20231010  zyx(Neusoft)     G002.00.0  issue課題#1603を対応します.
 -->

<template>
  <div>
    <common-dialog
      v-model="displayed"
      title="商品設定"
      @clickBack="closeDialog"
      @clickOk="onClickOk"
      :disabled-o-k-button="items.skuId ==='' "
    >
      <!-- G001.00.0 Add-Start -->
      <div class="categoryMode">
        <label
          class="categoryMode_new"
          v-if="itemMode === 1"><b>{{ $t("F00003.S012") }}</b></label>
        <label
          class="categoryMode_edit"
          v-if="itemMode === 2"><b>{{ $t("F00003.S013") }}</b></label>
      </div>
      <!-- G001.00.0 Add-End -->
      <!-- JAN コード -->
      <v-row
        no-gutters
        class="conditionRow w-100">
        <v-col
          cols="5"
          class="h-100 grayFrame d-flex justify-center align-center"
        >
          {{ "JAN コード" }}
        </v-col>
        <v-col
          cols="7"
          class="h-100">
          <input
            type="text"
            :class="this.barCodeErrorMsg !== null ? 'errorTextBox whiteFramePreset h-100 w-100 pl-2' : 'h-100 w-100 whiteFrame pl-2'"
            placeholder="数値+【Enter】"
            v-model="items.barCode"
            oninput="value=value.replace(/[^\d]/g,'');if(value.length>14)value=value.slice(0,14)"
            @keyup.enter="onBarcodeAnalysis"
            ref="barCodeInput"
          >
        </v-col>
      </v-row>

      <!-- KSD V001.000 AS issue #1373 対応 -->
      <!-- JAN コード(エラーメッセージ) -->
      <v-row
          no-gutters
          class="conditionRow w-100"
          v-if="this.barCodeErrorMsg !== null">
        <v-col
          cols="5"
          class="h-100"/>
        <v-col
          cols="6"
          class="h-100 mr-1"
          style="color:#f00;text-align: left;">{{ barCodeErrorMsg }}</v-col>
      </v-row>
      <!-- KSD V001.000 AE issue #1373 対応 -->

      <v-row class="w-100 my-5">
        <!-- G002.00.0 Update-Start -->
        <v-spacer/>
        <v-btn
          class="searchButtonStyle"
          color="#1ea7cb"
          @click="onKeywordSearch"
          style="float: right;"
          tabindex="202"
          :disabled="false">
          <font>{{ $t('商品検索') }} 〉</font>
        </v-btn>
      </v-row>
      <!-- G002.00.0 Update-End -->
      <!-- 商品名 -->
      <v-row
        no-gutters
        class="conditionRow w-100 mt-1">
        <v-col
          cols="5"
          class="h-100 grayFrame d-flex justify-center align-center"
        >
          {{ "商品名" }}
        </v-col>
        <v-col
          cols="7"
          class="h-100">
          <input
            type="text"
            :class="this.itemNameErrorMsg !== null ? 'errorTextBox whiteFramePreset h-100 w-100 pl-2' : 'h-100 w-100 whiteFrame pl-2'"
            @input="inputLimit(items.itemName,64)"
            placeholder="必須"
            v-model="items.itemName"
            ref="itemNameInput"
          >
        </v-col>
      </v-row>

      <!-- KSD V001.000 AS issue #1373 対応 -->
      <!-- 商品名(エラーメッセージ) -->
      <v-row
          no-gutters
          class="conditionRow w-100"
          v-if="this.itemNameErrorMsg !== null">
        <v-col
          cols="5"
          class="h-100"/>
        <v-col
          cols="6"
          class="h-100 mr-1"
          style="color:#f00;text-align: left;">{{ itemNameErrorMsg }}</v-col>
      </v-row>
      <!-- KSD V001.000 AE issue #1373 対応 -->
      
      <!-- 画像ファイル -->
      <v-row
        no-gutters
        class="conditionRow w-100 mt-1">
        <v-col
          cols="5"
          class="h-100 grayFrame d-flex justify-center align-center"
        >
          {{ "画像ファイル" }}
        </v-col>
        <v-col
          cols="7"
          class="h-100">
          <input
            type="text"
            class="h-100 w-100 whiteFrame pl-2"
            v-model="items.fileName"
            disabled
          >
        </v-col>
      </v-row>
      <v-row class="w-100 my-4">
        <v-col cols="4">
          <img
            v-if="items.presignedUrl!=='' && items.presignedUrl!==undefined"
            :src="items.presignedUrl"
            style="filter: drop-shadow(2px 3px 3px rgba(0,0,0,0.2));width: 130px;height: 130px;margin-top: -20px;">
        </v-col>
        <v-spacer/>
        <div class="mx-4" />
        <!-- G001.00.0 Updata-Start -->
        <!-- G002.00.0 Update-Start -->
        <tr>
          <td colspan="2">
            <v-btn
              class="searchButtonStyle"
              color="#1ea7cb"
              @click="onImageSearch"
              style="float: right;"
              tabindex="202"
              :disabled="false">
              <font>{{ $t('画像検索') }} 〉</font>
            </v-btn>
          </td>
        </tr>
      </v-row>
    </common-dialog>
    <!-- G002.00.0 Update-End -->
    <!-- キーワードアイテム一覧 -->
    <preset-keyword-items
      ref="presetKeywordItemsDialog"
      @clickSubmit="onSelectProduct" />

    <!-- image 一覧 -->
    <dialog-preset-image-search
      ref="imageDialog"
      @clickImageSubmit="onSelectImage"/>
    <popup ref="pop" />
  </div>
</template>
<!-- G001.00.0 Add-Start -->
<style scoped>
.searchButtonStyle {
  width: 140px;
  height: 40px !important;
  font-size: 20px;
  font-weight: normal;
}
.searchButtonStyle font {
  color: #ffffff;
  font-size: 20px;
  font-weight: normal;
}
</style>
<!-- G001.00.0 Add-End -->
