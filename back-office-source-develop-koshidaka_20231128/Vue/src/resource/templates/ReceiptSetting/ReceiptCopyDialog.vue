<style src="@/resource/static/css/CommonDesign/utils.css" />
<script type="text/javascript" src="@/resource/static/js/ReceiptSetting/receiptCopyDialog.js" />
<!--
 * ---------+---------------------+----------+--------------------------------
 *  DATE    |NAME(Inc)            |GUIDE     |GUIDANCE
 * ---------+---------------------+----------+--------------------------------
 * 20230209  wangchunmei(Neusoft)  G001.00.0  issue課題#836を対応します.
 * 20230217  wangchunmei(Neusoft)  G002.00.0  issue課題#1567を対応します.
 * 20230321  wangchunmei(Neusoft)  G003.00.0  issue課題#1580を対応します.
-->
<template>
  <div>
    <!-- G002.00.0 Update-Start -->
    <!--<common-dialog
      v-model="displayed"
      title="レシートコピー"
      @clickBack="closeDialog"
      @clickOk="onClickOk"
    >-->
    <!-- G003.00.0 Update-Start -->
    <!--<common-dialog
      v-model="displayed"
      :title="$i18n.t('O00004.S039')"
      @clickBack="closeDialog"
      @clickOk="onClickOk"
    >-->
    <common-dialog
      v-model="displayed"
      :title="$i18n.t('O00004.S039')"
      @clickBack="closeDialog"
      @clickOk="onClickOk"
      :disabled-o-k-button="disabledOKButton"
    >
      <!-- G003.00.0 Update-End -->
      <!-- G002.00.0 Update-End -->
      <!-- G001.00.0 Delete-Start -->
      <!-- 企画コード -->
      <!--<v-row no-gutters class="conditionRow w-100 d-flex align-center mt-5">
        <v-col cols="4" class="h-100">
          <label
            class="grayFrame h-100 w-100 d-flex justify-center align-center"
            for="planningCode"
          >
            {{ "企画コード" }}
          </label>
        </v-col>

        <v-col cols="7" class="h-100">
          <input
            id="planningCode"
            class="whiteFrame h-100 w-100 pl-2"
            type="text"
            v-model="planningCode"
            @input="numInputRegulation"
            maxlength = "2"
          />
        </v-col>
      </v-row>-->
      <!-- G001.00.0 Delete-End -->
      <!-- G001.00.0 Add-Start -->
      <!-- コピー先企画コード -->
      <v-row
        no-gutters
        class="conditionRow w-100 d-flex align-center mt-5">
        <v-col
          cols="5"
          class="h-100">
          <label
            class="grayFrame h-100 w-100 d-flex justify-center align-center"
            for="fromPlanningCode"
          >
            {{ $i18n.t('F322b3.S037') }}
          </label>
        </v-col>

        <v-col
          cols="6"
          class="h-100">
          <select
            tabindex="0"
            class="h-100 w-100 whiteFrame pl-2"
            v-model="fromPlanningCode"
            style="color:#000000"
          >
            <option
              v-for="item in this.items"
              :key="item.planningCode"
              :value="item.planningCode"
            >
              {{ item.planningCode }}
            </option>
          </select>
          <div class="pulldownArrow"/>
        </v-col>
      </v-row>

      <!-- コピー先企画コード -->
      <v-row
        no-gutters
        class="conditionRow w-100 d-flex align-center mt-5">
        <v-col
          cols="5"
          class="h-100">
          <label
            class="grayFrame h-100 w-100 d-flex justify-center align-center"
            for="toPlanningCode"
          >
            {{ $i18n.t('F322b3.S038') }}
          </label>
        </v-col>

        <v-col
          cols="6"
          class="h-100">
          <select
            tabindex="0"
            class="h-100 w-100 whiteFrame pl-2"
            v-model="toPlanningCode"
            style="color:#000000"
          >
            <option
              v-for="planningCode in this.planningCodeLabels"
              :key="planningCode.value"
              :value="planningCode.value"
            >
              {{ planningCode.name }}
            </option>
          </select>
          <div class="pulldownArrow"/>
        </v-col>
      </v-row>
      <!-- G001.00.0 Add-End -->
    </common-dialog>
    <popup ref="pop" />
  </div>
</template>
