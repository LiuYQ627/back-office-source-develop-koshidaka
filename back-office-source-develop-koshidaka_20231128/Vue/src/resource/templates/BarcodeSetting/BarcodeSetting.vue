<style src="@/resource/static/css/CommonDesign/utils.css" />
<style src="@/resource/static/css/BarcodeSetting/barcodeSetting.css" />
<script type="text/javascript" src="@/resource/static/js/BarcodeSetting/barcodeSetting.js" />

 <!--
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20221216  dingxin(Neusoft)  G001.00.0  issue課題#1212を対応します.
 * 20230316  xu.jh(Neusoft)  G002.00.0  issue課題#1444を対応します.
 * 20230608  wangchunmei(Neusoft)  G003.00.0  issue課題#1662を対応します.
 * 20230918  zyx(Neusoft)    G004.00.0  issue課題#1904を対応します.
 * 20231012  hql(Neusoft)    G005.00.0  issue課題#1226を対応します.
-->

<template>
  <v-container class="mt-15 barcode-setting">

    <div v-if="screenStep == 1">
      <!-- 変更基準日、店舗名 -->
      <config-select-common-condition
        :target-store-codes="targetStoreCodes"
        :type-of-setting="typeOfSettingWithCloning"
        v-model="changeDateText"
      />

      <!-- UPC 13桁変換有無 -->
      <v-row
        no-gutters
        class="conditionRow w-100 d-flex align-center mt-5">
        <v-col
          cols="3"
          class="h-100">
          <label class="grayFrame d-flex justify-center align-center h-100 w-100">
            {{ "ＵＰＣ１３桁変換有無" }}
          </label>
        </v-col>

        <v-col
          cols="4"
          class="h-100">
          <!-- G001.00.0 Update start -->
          <!-- <radio-button v-model="barcodeOption.upcConversion" :labels="doLabels" /> -->
          <radio-button
            v-model="barcodeOption.upcConversion"
            :labels="doLabels"
            :disabled="radioButtonDisabled"/>
            <!-- G001.00.0 Update end -->
        </v-col>
      </v-row>

      <!-- UPC C/D 有無 -->
      <v-row
        no-gutters
        class="conditionRow w-100 d-flex align-center mt-5">
        <v-col
          cols="3"
          class="h-100">
          <label class="grayFrame d-flex justify-center align-center h-100 w-100">
            {{ "ＵＰＣ Ｃ／Ｄ有無" }}
          </label>
        </v-col>

        <v-col
          cols="4"
          class="h-100">
          <!-- G001.00.0 Update start -->
          <!-- <radio-button v-model="barcodeOption.upcCD" :labels="doLabels" /> -->
          <radio-button
            v-model="barcodeOption.upcCD"
            :labels="doLabels"
            :disabled="radioButtonDisabled"/>
            <!-- G001.00.0 Update end -->
        </v-col>
      </v-row>

      <!-- 先頭ゼロ入力時扱い -->
      <v-row
        no-gutters
        class="conditionRow w-100 d-flex align-center mt-5">
        <v-col
          cols="3"
          class="h-100">
          <label class="grayFrame d-flex justify-center align-center h-100 w-100">
            {{ "先頭ゼロ入力時扱い" }}
          </label>
        </v-col>

        <v-col
          cols="4"
          class="h-100">
          <!-- G001.00.0 Update start -->
          <!-- <radio-button v-model="barcodeOption.leadingZero" :labels="leadingZeroLabels" /> -->
          <radio-button
            v-model="barcodeOption.leadingZero"
            :labels="leadingZeroLabels"
            :disabled="radioButtonDisabled"/>
            <!-- G001.00.0 Update end -->
        </v-col>
      </v-row>
    </div>

    <!-- バーコード定義設定 -->
    <div v-if="screenStep == 2">
      <!-- G005.00.0 Add-Start -->
      <div style="text-align: left; padding-left: 10px;"><b>バーコード定義設定</b></div>
      <!-- G005.00.0 Add-End -->
      <v-row
        no-gutters
        class="w-100 mt-5"
        style="height: 30px">
        <v-col
          class="grayFrame d-flex justify-center align-center h-100 w-100"
          cols="1"
        >
          {{ "No" }}
        </v-col>
        <v-col
          class="grayFrame d-flex justify-center align-center h-100 w-100"
          cols="2"
        >
          {{ "バーコードタイプ" }}
        </v-col>
        <v-col
          class="grayFrame d-flex justify-center align-center h-100 w-100"
          cols="1"
        >
          {{ "桁数" }}
        </v-col>
        <v-col
          class="grayFrame d-flex justify-center align-center h-100 w-100"
          cols="3"
        >
          {{ "入力桁フラグ" }}
        </v-col>
        <v-col
          class="grayFrame d-flex justify-center align-center h-100 w-100"
          cols="1"
        >
          {{ "入力桁1" }}
        </v-col>
        <v-col
          class="grayFrame d-flex justify-center align-center h-100 w-100"
          cols="1"
        >
          {{ "入力桁2" }}
        </v-col>
        <v-col
          class="grayFrame d-flex justify-center align-center h-100 w-100"
          cols="2"
        >
          {{ "フラグ定義番号" }}
        </v-col>
        <v-col
          class="grayFrame d-flex justify-center align-center h-100 w-100"
          cols="1"
        >
          <!-- 編集アイコン -->
        </v-col>
      </v-row>

      <v-row
        v-for="(key) in barcodeConversionKeys"
        :key="key"
        no-gutters
        style="height: 40px"
      >
        <v-col
          class="whiteFrame d-flex align-center justify-end pr-2"
          cols="1">
          {{ barcodeConversion[key].row[0] }}
        </v-col>
        <v-col
          class="whiteFrame d-flex align-center justify-start pl-2"
          cols="2">
          {{ barcodeConversion[key].row[1] }}: {{ barcodeConversion[key].row[1] | barcode_type }}
        </v-col>
        <v-col
          class="whiteFrame d-flex align-center justify-end pr-2"
          cols="1">
          {{ barcodeConversion[key].row[2] }}
        </v-col>
        <v-col
          class="whiteFrame d-flex align-center justify-start pl-2"
          cols="3">
          {{ barcodeConversion[key].row[3] }}: {{ barcodeConversion[key].row[3] | barcode_digit_flag }}
        </v-col>
        <v-col
          class="whiteFrame d-flex align-center justify-end pr-2"
          cols="1">
          {{ barcodeConversion[key].row[4] }}
        </v-col>
        <v-col
          class="whiteFrame d-flex align-center justify-end pr-2"
          cols="1">
          {{ barcodeConversion[key].row[5] }}
        </v-col>
        <v-col
          class="whiteFrame d-flex align-center justify-end pr-2"
          cols="2">
          {{ barcodeConversion[key].row[6] }}
        </v-col>
        <v-col
          class="whiteFrame d-flex align-center justify-center"
          cols="1">
          <img
            v-if="typeOfSetting != 'past' || isCloning"
            src="@/assets/ico_edit@2x.png"
            class="editIcon"
            tabindex="0"
            @keydown.enter="openConversionEditDialog(key)"
            @click="openConversionEditDialog(key)"
          >
          <img
            v-else
            src="@/assets/ico_edit_h@2x.png"
            class="editIcon"
            tabindex="0" >
        </v-col>
      </v-row>

      <v-card-actions class="">
        <!-- G003.00.0 Update-Start -->
        <!-- <v-btn
          class="button dialog-fotter-button-blue footerButtonStyle"
          @click="onNewConversion"
          style="color: white;"
          :disabled="radioButtonDisabled"
        > -->
        <v-btn
          class="button dialog-fotter-button-blue footerButtonStyle"
          @click="onNewConversion"
          style="color: white;"
          :disabled="radioButtonDisabled || !permissions.includes('CLOUDPOS_BARCODE_UPDATE')"
        >
          <!-- G003.00.0 Update-End -->
          追加
        </v-btn>

        <v-spacer/>
      </v-card-actions>
    </div>
    <!-- G004.00.0 Update start -->
    <!-- バーコードフラグ変換設定 -->
    <div v-if="screenStep == 3">
      <!-- G005.00.0 Add-Start -->
      <div style="text-align: left; padding-left: 10px;"><b>バーコード変換設定</b></div>
      <!-- G005.00.0 Add-End -->
      <v-row
        no-gutters
        class="w-100 mt-5"
        style="height: 30px">
        <v-col
          class="grayFrame d-flex justify-center align-center h-100 w-100"
          cols="1"
        >
          {{ "順番" }}
        </v-col>
        <v-col
          class="grayFrame d-flex justify-center align-center h-100 w-100"
          cols="1"
        >
          {{ "定義No." }}
        </v-col>
        <v-col
          class="grayFrame d-flex justify-center align-center h-100 w-100"
          cols="1"
        >
          {{ "開始位置" }}
        </v-col>
        <v-col
          class="grayFrame d-flex justify-center align-center h-100 w-100"
          cols="1"
        >
          {{ "桁数" }}
        </v-col>
        <v-col
          class="grayFrame d-flex justify-center align-center h-100 w-100"
          cols="1"
        >
          {{ "範囲指定" }}
        </v-col>
        <v-col
          class="grayFrame d-flex justify-center align-center h-100 w-100"
          cols="2"
        >
          {{ "範囲１" }}
        </v-col>
        <v-col
          class="grayFrame d-flex justify-center align-center h-100 w-100"
          cols="2"
        >
          {{ "範囲２" }}
        </v-col>
        <v-col
          class="grayFrame d-flex justify-center align-center h-100 w-100"
          cols="2"
        >
          {{ "対象処理タイプ" }}
        </v-col>
        <v-col
          class="grayFrame d-flex justify-center align-center h-100 w-100"
          cols="1"
        >
          <!-- 編集アイコン -->
        </v-col>
      </v-row>

      <v-row
        v-for="(key) in barcodeFlagKeys"
        :key="key"
        no-gutters
        style="height: 40px"
      >
        <v-col
          class="whiteFrame d-flex align-center justify-end pr-2"
          cols="1">
          {{ barcodeFlag[key].row[0] }}
        </v-col>
        <v-col
          class="whiteFrame d-flex align-center justify-end pr-2"
          cols="1">
          {{ barcodeFlag[key].row[1] }}
        </v-col>
        <v-col
          class="whiteFrame d-flex align-center justify-end pr-2"
          cols="1">
          {{ barcodeFlag[key].row[2] }}
        </v-col>
        <v-col
          class="whiteFrame d-flex align-center justify-end pr-2"
          cols="1">
          {{ barcodeFlag[key].row[3] }}
        </v-col>
        <v-col
          class="whiteFrame d-flex align-center justify-start pl-2"
          cols="1">
          {{ barcodeFlag[key].row[4] }}: {{ barcodeFlag[key].row[4] | barcode_flag_range }}
        </v-col>
        <v-col
          class="whiteFrame d-flex align-center justify-end pr-2"
          cols="2">
          {{ barcodeFlag[key].row[5] }}
        </v-col>
        <v-col
          class="whiteFrame d-flex align-center justify-end pr-2"
          cols="2">
          {{ barcodeFlag[key].row[6] }}
        </v-col>
        <v-col
          class="whiteFrame d-flex align-center justify-start pl-2"
          cols="2">
          {{ barcodeFlag[key].row[7] }}: {{ barcodeFlag[key].row[7] | barcode_flag_process_type }}
        </v-col>
        <v-col
          class="whiteFrame d-flex align-center justify-center"
          cols="1">
          <img
            v-if="typeOfSetting != 'past' || isCloning"
            src="@/assets/ico_edit@2x.png"
            class="editIcon"
            tabindex="0"
            @keydown.enter="openFlagEditDialog(key)"
            @click="openFlagEditDialog(key)"
          >
          <img
            v-else
            src="@/assets/ico_edit_h@2x.png"
            class="editIcon"
            tabindex="0" >
        </v-col>
      </v-row>
      <!-- G004.00.0 Update End -->
      <v-card-actions class="">
        <!-- G003.00.0 Update-Start -->
        <!-- <v-btn
          class="button dialog-fotter-button-blue footerButtonStyle"
          @click="onNewFlag"
          style="color: white;"
          :disabled="radioButtonDisabled"
        > -->
        <v-btn
          class="button dialog-fotter-button-blue footerButtonStyle"
          @click="onNewFlag"
          style="color: white;"
          :disabled="radioButtonDisabled || !permissions.includes('CLOUDPOS_BARCODE_UPDATE')"
        >
          <!-- G003.00.0 Update-End -->
          追加
        </v-btn>

        <v-spacer/>
      </v-card-actions>
    </div>

    <!-- その他ダイアログ等 -->
    <v-row>
      <v-col>
        <!-- G002.00.0 Update start -->
        <!-- <maint-button
          ref="maintButton"
          @close="backToConfigSelect"
          @fixed="fixed"
          @stop="stop"
          @clone="clone"
          @del="del"
          @prev="prev"
          @next="next"
          :isfixedBtn="disabledFixedBtn"
          :isCloneBtn="disabledCloneBtn"
          :isdelBtn="disabledDeleteBtn"
          :isPrevBtn="disabledPrevBtn"
          :isNextBtn="disabledNextBtn"
        /> -->
        <maint-button
          ref="maintButton"
          @close="close"
          @fixed="fixed"
          @stop="stop"
          @clone="clone"
          @del="del"
          @prev="prev"
          @next="next"
          :isfixed-btn="disabledFixedBtn || !permissions.includes('CLOUDPOS_BARCODE_UPDATE')"
          :is-clone-btn="disabledCloneBtn"
          :isdel-btn="disabledDeleteBtn || !permissions.includes('CLOUDPOS_BARCODE_DELETE')"
          :is-prev-btn="disabledPrevBtn"
          :is-next-btn="disabledNextBtn"
        />
        <!-- G002.00.0 Update end -->
      </v-col>
    </v-row>
    <conversion-edit-dialog
      ref="conversionEditDialog"
      @clickSave="conversionSaveCallback" />
    <flag-edit-dialog
      ref="flagEditDialog"
      @clickSave="flagSaveCallback" />

    <popup ref="pop" />

    <v-overlay :value="processing">
      <div class="text-center">
        <v-progress-circular
          indeterminate
          :size="70"
          :width="7"
          color="white"
        />
      </div>
    </v-overlay>

  </v-container>
</template>
