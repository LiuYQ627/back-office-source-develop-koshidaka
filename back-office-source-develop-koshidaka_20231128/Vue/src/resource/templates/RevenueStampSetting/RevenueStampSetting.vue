<style src="@/resource/static/css/CommonDesign/utils.css" />
<style src="@/resource/static/css/RevenueStampSetting/revenueStampSetting.css" />
<script type="text/javascript" src="@/resource/static/js/RevenueStampSetting/revenueStampSetting.js" />
<!--
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230316  xu.jh(Neusoft)  G001.00.0  issue課題#1444を対応します.
 -->
<template>
  <v-container class="mt-15">
    <!-- 変更基準日、店舗名 -->
    <config-select-common-condition
      :target-store-codes="targetStoreCodes"
      :type-of-setting="typeOfSettingWithCloning"
      v-model="changeDateText"
    />

    <!-- 印紙税導入区分 -->
    <v-row
      no-gutters
      class="conditionRow w-100 mt-5">
      <v-col
        cols="2"
        class="h-100">
        <label class="grayFrame d-flex justify-center align-center h-100 w-100">
          {{ "印紙税導入区分" }}
        </label>
      </v-col>

      <v-col
        cols="5"
        class="h-100">
        <radio-button
          v-model="config.stampTaxIntroductionClass"
          :labels="stampTaxIntroductionClassLabels"
          :disabled="radioButtonDisabled"
        />
      </v-col>
    </v-row>

    <!-- 印紙税表 -->
    <v-row
      no-gutters
      class="w-100 mt-5">
      <v-col cols="6">
        <v-row
          no-gutters
          style="height: 30px">
          <v-col
            class="grayFrame d-flex justify-center align-center h-100 w-100"
            cols="2"
          >
            {{ "No." }}
          </v-col>
          <v-col
            class="grayFrame d-flex justify-center align-center h-100 w-100"
            cols="5"
          >
            {{ "印紙税判定金額" }}
          </v-col>
          <v-col
            class="grayFrame d-flex justify-center align-center h-100 w-100"
            cols="4"
          >
            {{ "印紙税額" }}
          </v-col>
          <v-col
            class="grayFrame d-flex justify-center align-center h-100 w-100"
            cols="1"
          >
            <!-- 編集アイコン -->
          </v-col>
        </v-row>

        <v-row
          v-for="(stampDuty, index) in config.stampDuty"
          :key="stampDuty.order"
          no-gutters
          style="height: 40px"
        >
          <v-col
            class="whiteFrame d-flex align-center justify-center"
            cols="2">
            {{ stampDuty.order + 1 }}
          </v-col>
          <v-col
            class="whiteFrame d-flex align-center justify-end pr-2"
            cols="5"
          >
            {{ stampDuty.row[0] }}
          </v-col>
          <v-col
            class="whiteFrame d-flex align-center justify-end pr-2"
            cols="4"
          >
            {{ stampDuty.row[1] }}
          </v-col>
          <v-col
            class="whiteFrame d-flex align-center justify-center"
            cols="1">
            <img
              v-if="typeOfSetting != 'past' || isCloning"
              src="@/assets/ico_edit@2x.png"
              class="editIcon"
              tabindex="0"
              @keydown.enter="openEditDialog(index)"
              @click="openEditDialog(index)"
            >
            <img
              v-else
              src="@/assets/ico_edit_h@2x.png"
              class="editIcon"
              tabindex="0" >
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- 印紙税判定 -->
    <v-row
      no-gutters
      class="conditionRow w-100 mt-5">
      <v-col
        cols="3"
        class="h-100">
        <label class="grayFrame d-flex justify-center align-center h-100 w-100">
          {{ "印紙税判定" }}
        </label>
      </v-col>

      <v-col
        cols="5"
        class="h-100">
        <radio-button
          v-model="config.stampTaxDetermination"
          :labels="taxLabels"
          :disabled="radioButtonDisabled"/>
      </v-col>
    </v-row>

    <!-- メディア税額印字区分 -->
    <v-row
      no-gutters
      class="conditionRow w-100 mt-5">
      <v-col
        cols="3"
        class="h-100">
        <label class="grayFrame d-flex justify-center align-center h-100 w-100">
          {{ "メディア税額印字区分" }}
        </label>
      </v-col>

      <v-col
        cols="5"
        class="h-100">
        <radio-button
          v-model="config.mediaTaxAmount"
          :labels="doLabels"
          :disabled="radioButtonDisabled"/>
      </v-col>
    </v-row>

    <!-- 税額印字文言設定 -->
    <v-row
      no-gutters
      class="conditionRow w-100 mt-5">
      <v-col
        cols="3"
        class="h-100">
        <label
          class="grayFrame d-flex justify-center align-center h-100 w-100"
          for="taxPrintWording"
        >
          {{ "税額印字文言設定" }}
        </label>
      </v-col>

      <v-col
        cols="5"
        class="h-100">
        <input
          v-if="typeOfSetting != 'past' || isCloning"
          id="taxPrintWording"
          class="whiteFrame h-100 w-100 pl-2"
          type="text"
          v-model="config.taxPrintWording"
          :placeholder="this.$i18n.t('F00001.S085')"
          @input="inputLimit(config.taxPrintWording,10)"
        >
        <input
          v-else
          id="taxPrintWording"
          class="whiteFrame h-100 w-100 pl-2"
          type="text"
          v-model="config.taxPrintWording"
          :disabled="true">
      </v-col>
    </v-row>

    <!-- 入金印紙対象区分 -->
    <v-row
      no-gutters
      class="conditionRow w-100 mt-5">
      <v-col
        cols="3"
        class="h-100">
        <label class="grayFrame d-flex justify-center align-center h-100 w-100">
          {{ "入金印紙対象区分" }}
        </label>
      </v-col>

      <v-col
        cols="5"
        class="h-100">
        <radio-button
          v-model="config.depositStampTargetCategory"
          :labels="doLabels"
          :disabled="radioButtonDisabled"/>
      </v-col>
    </v-row>

    <!-- 税務署名 -->
    <v-row
      no-gutters
      class="conditionRow w-100 mt-5">
      <v-col
        cols="2"
        class="h-100">
        <label
          class="grayFrame d-flex justify-center align-center h-100 w-100"
          for="taxSignature"
        >
          {{ "税務署名" }}
        </label>
      </v-col>

      <v-col
        cols="5"
        class="h-100">
        <input
          v-if="typeOfSetting != 'past' || isCloning"
          id="taxSignature"
          class="whiteFrame h-100 w-100 pl-2"
          type="text"
          v-model="config.taxSignature"
          :placeholder="this.$i18n.t('F00001.S085')"
          @input="inputLimit(config.taxSignature,10)"
        >
        <input
          v-else
          id="taxSignature"
          class="whiteFrame h-100 w-100 pl-2"
          type="text"
          v-model="config.taxSignature"
          :disabled="true">
      </v-col>
    </v-row>

    <!-- スマートレシート時のレシート出力 -->
    <v-row
      no-gutters
      class="conditionRow w-100 mt-5">
      <v-col
        cols="5"
        class="h-100">
        <label class="grayFrame d-flex justify-center align-center h-100 w-100">
          {{ "スマートレシート時のレシート出力" }}
        </label>
      </v-col>

      <v-col
        cols="5"
        class="h-100">
        <radio-button
          v-model="config.printReceiptWhenSmartReceipt"
          :labels="doLabels" />
      </v-col>
    </v-row>

    <!-- レシート再発行時の印紙メモリカウント -->
    <v-row
      no-gutters
      class="conditionRow w-100 mt-5">
      <v-col
        cols="5"
        class="h-100">
        <label class="grayFrame d-flex justify-center align-center h-100 w-100">
          {{ "レシート再発行時の印紙メモリカウント" }}
        </label>
      </v-col>

      <v-col
        cols="5"
        class="h-100">
        <radio-button
          v-model="config.stampMemoryCountsForReceiptReissue"
          :labels="doLabels" />
      </v-col>
    </v-row>

    <!-- その他ダイアログ等 -->
    <v-row>
      <v-col>
        <!-- G001.00.0 Update start -->
        <!-- <maint-button
          @close="backToConfigSelect"
          @fixed="fixed"
          @clone="clone"
          @stop="stop"
          @del="del"
          :isfixedBtn="disabledFixedBtn"
          :isCloneBtn="disabledCloneBtn"
          :isdelBtn="disabledDeleteBtn"/> -->
        <maint-button
          @close="close"
          @fixed="fixed"
          @clone="clone"
          @stop="stop"
          @del="del"
          :isfixed-btn="disabledFixedBtn || !permissions.includes('CLOUDPOS_REVENUE_STAMP_UPDATE')"
          :is-clone-btn="disabledCloneBtn"
          :isdel-btn="disabledDeleteBtn || !permissions.includes('CLOUDPOS_REVENUE_STAMP_DELETE')" />
          <!-- G001.00.0 Update end -->
      </v-col>
    </v-row>
    <edit-dialog
      ref="editDialog"
      @clickSave="saveCallback" />
    <popup ref="pop" />
  </v-container>
</template>
