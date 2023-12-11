<style src="@/resource/static/css/CommonDesign/utils.css"/>
<style src="@/resource/static/css/PresetMaster/presetMaster.css"/>
<!-- G002.00.0 Add-Start-->
<style src="@/resource/static/css/MasterCommon/masterDialog.css"/>
<style src="@/resource/static/css/ReceiptSetting/receiptSetting.css"/>
<!-- G002.00.0 Add-End-->
<script type="text/javascript" src="@/resource/static/js/ReceiptSetting/ReceiptSetting.js"/>

 <!--
 * ---------+---------------------+----------+--------------------------------
 *  DATE    |NAME(Inc)            |GUIDE     |GUIDANCE
 * ---------+---------------------+----------+--------------------------------
 * 20230103  litie(Neusoft)        G001.00.0  issue課題#1058を対応します.
 * 20230203  wangchunmei(Neusoft)  G002.00.0  issue課題#836を対応します.
 * 20230320  wangchunmei(Neusoft)  G003.00.0  issue課題#1572を対応します.
 * 20230322  wangchunmei(Neusoft)  G004.00.0  issue課題#1573を対応します.
 * 20230612  wangchunmei(Neusoft)  G005.00.0  issue課題#1585を対応します.
 * 20230829  qinshh(Neusoft)       G006.00.0  issue課題#1573を対応します.
-->

<template>
  <!-- G002.00.0 Update-Start -->
  <!-- <v-container class="mt-15"> -->
  <v-container
    class="mt-15"
    style="min-width: 870px;max-width: 870px;">
    <!-- G002.00.0 Update-End -->
    <!-- G002.00.0 Add-Start -->
    <!-- G006.00.0 Delete-Start -->
    <!-- 企画コード -->
    <!-- <v-row
      no-gutters
      class="conditionRow w-100 d-flex align-center mt-5">
      <v-col
        cols="2"
        class="h-100">
        <label
          class="grayFrame h-100 w-100 d-flex justify-center align-center"
          for="planningCode"
        >
          {{ "企画コード" }}
        </label>
      </v-col>

      <v-col
        cols="9"
        class="h-100">
        <input
          id="planningCode"
          :class="this.planningCodeErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'"
          class="whiteFrame h-100 w-100 pl-2"
          ref="planningCodeText"
          type="text"
          v-model="planningCode"
          @change="onChangePlanCode"
          @input="numInputRegulation"
          maxlength="2"
        >
    </v-col></v-row> -->
    <!-- 企画コード(エラーメッセージ) -->
    <!-- <tr
      v-if="this.planningCodeErrorMsg !== ''"
      class="errorCell">
      <th />
      <td>
        <div
          v-for="planningCodeMsg in planningCodeErrorMsg"
          :key="planningCodeMsg">
          <label>{{ planningCodeMsg }}</label>
        </div>
      </td>
    </tr> -->
    <!-- G006.00.0 Delete-End -->
    <!-- G002.00.0 Add-End -->
    <!-- G002.00.0 Delete-Start -->
    <!-- 対象店舗 -->
    <!--<v-row no-gutters class="conditionRow w-100 d-flex align-center mt-5">
      <v-col cols="2" class="h-100">
        <label
          for="targetStore"
          class="grayFrame h-100 w-100 d-flex justify-center align-center"
        >
          {{ "対象店舗" }}
        </label>
      </v-col>
      <v-col cols="6" class="h-100 d-flex align-center">-->
    <!-- G001.00.0 Update-Start -->
    <!-- <store-select v-model="targetStoreCodes" /> -->
    <!--<store-select v-model="targetStoreCodes" headquartersAuthorityCheckEnable />-->
    <!-- G001.00.0 Update-End -->
    <!--</v-col>
    </v-row>-->
    <!-- G002.00.0 Delete-End -->
    <!-- G002.00.0 Add-Start -->
    <!-- 対象店舗 -->
    <!-- G004.00.0 Update-Start -->
    <!--<v-row no-gutters class="conditionRow w-100 d-flex align-center mt-5" v-if="headquartersAuthority === 1 && planningCode && !planningCodeErrorMsg">-->
    <!-- G006.00.0 Update-Start -->
    <!-- <v-row
      no-gutters
      class="conditionRow w-100 d-flex align-center mt-5"
      v-if="headquartersAuthority === 1 && showFlag"> -->
    <v-row
      no-gutters
      class="conditionRow w-100 d-flex align-center mt-5"
      v-if="headquartersAuthority === 1">
      <!-- G006.00.0 Update-End -->
      <!-- G004.00.0 Update-End -->
      <v-col
        cols="2"
        class="h-100">
        <label
          for="targetStore"
          class="grayFrame h-100 w-100 d-flex justify-center align-center"
        >
        <!-- KSD V001.000 DS -->
        <!-- {{ "店舗" }} -->
        <!-- KSD V001.000 DE -->
        <!-- KSD V001.000 AS -->
          {{ $i18n.t('F322b3.S071') }}
        <!-- KSD V001.000 AE -->
        </label>
      </v-col>
      <v-col
        cols="9"
        class="h-100 d-flex align-center">
        <store-select
          v-model="targetStoreCodes"
          @change="changedStore"
          headquarters-authority-check-enable />
      </v-col>
    </v-row>
    <!-- G004.00.0 Update-Start -->
    <!--<v-row no-gutters class="conditionRow w-100 d-flex align-center mt-5" v-if="headquartersAuthority === 0" :style="{'display' : planningCode && !planningCodeErrorMsg ? 'block' : 'none !important'}">-->
    <v-row
      no-gutters
      class="conditionRow w-100 d-flex align-center mt-5"
      v-if="headquartersAuthority === 0"
      :style="{'display' : showFlag ? 'block' : 'none !important'}">
      <!-- G004.00.0 Update-End -->
      <v-col
        cols="2"
        class="h-100">
        <label
          for="targetStore"
          class="grayFrame h-100 w-100 d-flex justify-center align-center"
        >
          {{ "店舗" }}
        </label>
      </v-col>
      <v-col
        cols="9"
        class="h-100 d-flex align-center">
        <store-select
          v-model="targetStoreCodes"
          @change="changedStore"
          headquarters-authority-check-enable />
      </v-col>
    </v-row>
    <!-- G004.00.0 Add-Start -->
    <v-row
      v-if="targetStoreCodes!=''"
      no-gutters
      class="conditionRow w-100 d-flex align-center mt-5">
      <v-col
        cols="2"
        class="h-100">
        <label
          class="grayFrame h-100 w-100 d-flex justify-center align-center"
          for="planningCode"
        >
          {{ "企画コード" }}
        </label>
      </v-col>
      <v-col
        cols="9"
        class="h-100">
        <input
          id="planningCode"
          :class="this.planningCodeErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'"
          class="whiteFrame h-100 w-100 pl-2"
          ref="planningCodeText"
          type="text"
          @change="onChangePlanCode"
          v-model="planningCode"
          @input="numInputRegulation"
          maxlength="2"
        >
      </v-col>
    </v-row>
    <!-- G004.00.0 Add-End -->
    <!-- 企画コード(エラーメッセージ) -->
    <tr
      v-if="this.planningCodeErrorMsg !== ''"
      class="errorCell">
      <th />
      <td>
        <div
          v-for="planningCodeMsg in planningCodeErrorMsg"
          :key="planningCodeMsg">
          <label>{{ planningCodeMsg }}</label>
        </div>
      </td>
    </tr>
    <!-- G002.00.0 Add-End -->
    <!-- G002.00.0 Delete-Start -->
    <!-- 企画コード -->
    <!--<v-row no-gutters class="conditionRow w-100 d-flex align-center mt-5" v-if="targetStoreCodes.length > 0">
      <v-col cols="2" class="h-100">
        <label
          class="grayFrame h-100 w-100 d-flex justify-center align-center"
          for="planningCode"
        >
          {{ "企画コード" }}
        </label>
      </v-col>

      <v-col cols="6" class="h-100">
        <input
          id="planningCode"
          class="whiteFrame h-100 w-100 pl-2"
          type="text"
          v-model="planningCode"
          @change="onChangePlanCode"
          @input="numInputRegulation"
          maxlength="2"
        />
      </v-col>
    </v-row>-->
    <!-- G002.00.0 Delete-End -->
    <!-- G004.00.0 Update-Start -->
    <!--<template v-if="setting && planningCode && !planningCodeErrorMsg">-->
    <template v-if="setting && showFlag">
      <!-- G004.00.0 Update-End -->
      <!-- 期間 -->
      <v-row
        no-gutters
        class="conditionRow w-100 d-flex align-center mt-5">
        <v-col
          cols="2"
          class="h-100">
          <label class="grayFrame h-100 w-100 d-flex justify-center align-center">
            {{ "期間" }}
          </label>
        </v-col>
        <!-- G002.00.0 Update-Start -->
        <!--<v-col cols="2" class="h-100 d-flex align-center">-->
        <v-col
          cols="3"
          class="h-100 d-flex align-center">
          <!-- G002.00.0 Update-End -->
          <date-input
            v-model="dateFrom"
            :disabled-func="disabledFunc"/>
        </v-col>
        <v-col
          cols="1"
          class="h-100 d-flex align-center whiteFrame">
          <!-- KSD V001.000 DS -->
          <!-- <input -->
          <!--  type="text" -->
          <!--  class="px-2 h-100 w-100" -->
          <!--  v-model="timeFrom" > -->
          <!-- KSD V001.000 DE -->
          <!-- KSD V001.000 AS -->
          <input
            :placeholder="$t('F322b3.S120')"
            type="text"
            class="px-2 h-100 w-100"
            v-model="timeFrom" >
            <!-- KSD V001.000 AE -->
        </v-col>
        <!-- G002.00.0 Delete-Start -->
        <!--<span class="mx-2">～</span>-->
        <!-- G002.00.0 Delete-End -->
        <!-- G002.00.0 Add-Start -->
        <v-col
          cols="1"
          class="h-100">
          <label class="h-100 w-100 d-flex justify-center align-center">
            ～
          </label>
        </v-col>
        <!-- G002.00.0 Add-End -->
        <!-- G002.00.0 Update-Start -->
        <!--<v-col cols="2" class="h-100 d-flex align-center">-->
        <v-col
          cols="3"
          class="h-100 d-flex align-center">
          <!-- G002.00.0 Update-End -->
          <date-input
            v-model="dateTo"
            :disabled-func="disabledFunc"/>
        </v-col>
        <v-col
          cols="1"
          class="h-100 d-flex align-center whiteFrame">
          <!-- KSD V001.000 DS -->
          <!-- <input -->
          <!--  type="text" -->
          <!--  class="px-2 h-100 w-100" -->
          <!--  v-model="timeTo" > -->
          <!-- KSD V001.000 DE -->
          <!-- KSD V001.000 AS -->
          <input
            :placeholder="$t('F322b3.S120')"
            type="text"
            class="px-2 h-100 w-100"
            v-model="timeTo" >
            <!-- KSD V001.000 AE -->
        </v-col>
      </v-row>

      <!-- 曜日 -->
      <v-row
        no-gutters
        class="weekRow w-100 d-flex align-center mt-1">
        <v-col
          cols="2"
          class="h-100">
          <label class="grayFrame h-100 w-100 d-flex justify-center align-center">
            {{ "曜日" }}
          </label>
        </v-col>
        <!-- G002.00.0 Update-Start -->
        <!--<v-col cols="8" class="h-100 whiteFrame d-flex align-center">-->
        <v-col
          cols="9"
          class="h-100 whiteFrame d-flex align-center">
          <!-- G002.00.0 Update-End -->
          <!-- 日～土 -->
          <div
            v-for="(label, index) in weekLabels"
            :key="label"
            class="h-100 weekCell d-flex flex-column align-center justify-center"
          >
            <v-btn
              class="checkBox"
              :checked="weekSelected[index]"
              @click="toggleWeek(index)"
            />
            <span>{{ label }}</span>
          </div>
          <!-- 全選択 -->
          <div
            class="h-100 weekCell d-flex flex-column align-center justify-center"
          >
            <v-btn
              class="checkBox"
              :checked="allWeekSelected"
              @click="toggleAllWeek"
            />
            <span>{{ "全選択" }}</span>
          </div>
          <!-- G002.00.0 Add-Start -->
          <div
            class="h-100 weekCell d-flex flex-column align-center justify-center"
          />
          <!-- G002.00.0 Add-End -->
        </v-col>
      </v-row>
      <!-- G002.00.0 Add-Start -->
      <!-- 選択 -->
      <v-row
        no-gutters
        class="conditionRow w-100 d-flex align-center mt-5">
        <v-col
          cols="2"
          class="h-100">
          <label
            class="grayFrame h-100 w-100 d-flex justify-center align-center"
            for="planningCode"
          >
            {{ $i18n.t('F322b3.S001') }}
          </label>
        </v-col>

        <v-col
          cols="9"
          class="h-100">
          <!-- G003.00.0 Delete-Start -->
          <!--<select
            tabindex="0"
            class="h-100 w-100 whiteFrame pl-2"
            v-model="receiptType"
            style="color:#000000"
          >
            <option
              v-for="receiptType in this.receiptTypeLabels"
              :key="receiptType.value"
              :value="receiptType.value"
            >-->
          <!-- G003.00.0 Delete-End -->
          <!-- G003.00.0 Add-Start -->
          <select
            tabindex="0"
            class="h-100 w-100 whiteFrame pl-2"
            v-model="receiptType"
            :style="receiptType === '' ? 'color:#9ea0aa':'color:#000000'"
          >
            <option
              value=""
              disabled
              selected
              style='display:none;'>選択してください</option>
            <option
              v-for="receiptType in this.receiptTypeLabels"
              :key="receiptType.value"
              :value="receiptType.value"
              style="color:#000000"
            >
              <!-- G003.00.0 Add-End -->
              {{ receiptType.name }}
            </option>
          </select>
          <div class="pulldownArrow"/>
        </v-col>
      </v-row>
      <!-- G003.00.0 Update-Start -->
      <!--<v-row no-gutters class="w-100 d-flex align-center" style="height:1041px;">-->
      <!-- KSD V001.000 DS -->
      <!-- <v-row -->
      <!--   no-gutters-->
      <!--   class="w-100 d-flex align-center" -->
      <!--   style="height:1041px;"-->
      <!--   v-if="receiptType === 0 || receiptType === 1">-->
      <!-- KSD V001.000 DE -->
      <!-- KSD V001.000 AS -->
      <v-row
        no-gutters
        class="w-100 d-flex"
        v-if="receiptType === 1 && setting.receiptOrientation === 'horizontal'">
        <div
          class="h-100 d-flex receipt-setting-horizontal-wrapper">
          <v-col
            cols="8"
            class="receipt-setting-horizontal-wrapper-display-left pr-0">
            <div class="ryosyuFixedTextv1 d-flex justify-end receipt-setting-horizontal-text-right-to-100">{{ $i18n.t('F322b3.S131') }}</div>
            <div class="ryosyuFixedTextv1 d-flex justify-end mr-13">{{ $i18n.t('F322b3.S132') }}</div>
            <!-- KSD V001.000 DS -->
            <!--<v-divider class="ryosyuDivider" /> -->
            <!-- KSD V001.000 DE -->
            <!-- KSD V001.000 AS -->
            <v-divider class="ryosyu-divider-top" />
            <!-- KSD V001.000 AE -->
            <div class="ryosyuFixedTextv2 d-flex justify-end">{{ $i18n.t('F322b3.S133') }}</div>
            <!-- KSD V001.000 DS -->
            <!--<v-divider class="ryosyuDivider" /> -->
            <!-- KSD V001.000 DE -->
            <!-- KSD V001.000 AS -->
            <v-divider class="ryosyu-divider-bottom" />
            <!-- KSD V001.000 AE -->
            <div class="ryosyuFixedText3v2  w-100 d-flex">{{ $i18n.t('F322b3.S043') }} {{ $i18n.t('F322b3.S042') }}</div>
            <div
              class="h-100 d-flex flex-column align-start ml-2">
              <pre class="ryosyuMessage">{{ setting.ryosyuMessage_1 || " " }}</pre>
              <pre class="ryosyuMessage">{{ setting.ryosyuMessage_2 || " " }}</pre>
              <pre class="ryosyuMessage">{{ setting.ryosyuMessage_3 || " " }}</pre>
              <pre class="ryosyuMessage">{{ setting.ryosyuMessage_4 || " " }}</pre>
              <pre class="ryosyuMessage">{{ setting.ryosyuMessage_5 || " " }}</pre>
            </div>
          </v-col>
          <v-col
            cols="4"
            class="receipt-setting-horizontal-wrapper-display-right">
            <div
              class="ryosyuFixedTextDate d-flex">{{ $i18n.t('F322b3.S134') }}</div>
            <div class="upload-img-tax-wrapper">
              <img
                :src='setting.revenueStampLogoBase64EncodedString'
                v-if="setting.revenueStampLogoBase64EncodedString"
                class="upload-header-img-tax">
            </div>
            <div
              class="ryosyuFixedTextDate d-flex ml-3"
              v-if="setting.ryosyuInformation">{{ $i18n.t('F322b3.S135') }}</div>
          </v-col>
        </div>
        <v-col
          cols="2">
          <div
            class="editImg h-100 d-flex align-center receipt-setting-horizontal-wrapper-display-edit">
            <img
              src="@/assets/ico_edit.png"
              class="receiptEditIcon"
              tabindex="0"
              @click="editReceiptHorizontalSetting">
          </div>
        </v-col>
      </v-row>
      <!-- KSD V001.000 DS -->
      <!-- <v-row no-gutters class="w-100 d-flex align-center" -->
      <!--  :style="[ -->
      <!--    receiptType === 0 && { height: '1652px' }, -->
      <!--    receiptType === 1 && setting.receiptOrientation === 'horizontal' && { height: '466px' }, -->
      <!--    receiptType === 1 && setting.receiptOrientation !== 'horizontal' && { height: '1130px' }, -->
      <!--    receiptType === 2 && { height: '1400px' } -->
      <!--  ]" -->
      <!--  v-if="receiptType === 0 || receiptType === 1 || receiptType === 2"> -->
      <!-- KSD V001.000 DE -->
      <!-- KSD V001.000 AE -->
      <v-row no-gutters class="w-100 d-flex align-center"
        :style="[
          receiptType === 0 && { height: '100%', position: 'relative' },
          receiptType === 1 && setting.receiptOrientation === 'horizontal' && { height: '429px', position: 'relative' },
          receiptType === 1 && setting.receiptOrientation !== 'horizontal' && { height: '1060px', position: 'relative' },
          receiptType === 2 && { height: '1400px', position: 'relative' }
        ]"
        v-if="receiptType === 0 || receiptType === 1 || receiptType === 2">
        <!-- G003.00.0 Update-End -->
        <v-col
          cols="2"
          class="h-100 editLabelCol">
          <label
            class="grayFrame h-100 w-100 d-flex justify-center align-center"
            for="planningCode"
          >
            {{ $i18n.t('F322b3.S004') }}
          </label>
        </v-col>
        <!-- 領収証 -->
        <v-col
          cols="9"
          class="h-100 editCol"
          v-if="receiptType === 1">
          <!-- KSD V001.000 DS -->
          <!--<v-row -->
          <!--  no-gutters -->
          <!--  class="w-100 d-flex align-center" -->
          <!--  style="height:41%"> -->
          <!-- KSD V001.000 DE -->
          <!-- KSD V001.000 AS -->
          <v-row
            no-gutters
            class="w-100 d-flex align-center receipt-receipt-angle-flag-warpper"
            v-if="setting.receiptOrientation !== 'horizontal'"
            style="height:41%">
            <!-- KSD V001.000 AE -->
            <!-- KSD V001.000 DS -->
            <!-- <div-->
            <!--  class="h-100 receipt1AttrRow grayFrame ryosyuTitleWidth"/> -->
            <!-- KSD V001.000 DE -->
            <!-- KSD V001.000 AS -->
            <div
              class="h-100 receipt1AttrRow receiptTitleWidth">
            <!-- KSD V001.000 AE -->
              <label
                class="grayFrame h-100 w-100 d-flex justify-center align-center"
                for="planningCode"
              >
                <!-- G002.00.0 Update-Start -->
                {{ $i18n.t('F322b3.S076') }}
                <!-- G002.00.0 Update-End -->
              </label>
            </div>
            <!-- KSD V001.000 DS -->
            <!-- <div -->
            <!--   class="h-100 receiptContentWidth"> -->
            <!-- KSD V001.000 DE -->
            <!-- KSD V001.000 AS -->
            <div
              class="h-100 receiptContentWidth">
            <!-- KSD V001.000 AE -->
              <v-row
                no-gutters
                class="w-100 d-flex align-center"
                style="height:4%"/>
              <v-row
                no-gutters
                class="w-100 d-flex align-center"
                style="height:96%">
                <v-col
                  class="h-100 contentCol"
                  cols="10">
                  <div class="h-100 receiptContentDivCenter receiptContentOuterFirstDiv">
                    <!-- KSD V001.000 DS -->
                    <!--<img -->
                    <!--  :src='picUrl' -->
                    <!--  class="uploadImg"> -->
                    <!-- KSD V001.000 DE -->
                    <!-- KSD V001.000 AS -->
                    <img
                      :src='picUrl'
                      class="upload-img-header"
                    >
                    <!-- KSD V001.000 AE -->
                    <div class="ryosyuFixedTextDate">{{ $i18n.t('F322b3.S039') }}</div>
                    <div class="ryosyuFixedText1">{{ $i18n.t('F322b3.S040') }}</div>
                    <div class="ryosyuFixedText2">{{ $i18n.t('F322b3.S041') }}</div>
                    <v-divider class="ryosyuDivider" />
                    <div class="ryosyuFixedText2">{{ $i18n.t('F322b3.S044') }}</div>
                    <v-divider class="ryosyuDivider" />
                    <div class="ryosyuFixedText3">{{ $i18n.t('F322b3.S042') }}</div>
                    <div class="ryosyuFixedText3">{{ $i18n.t('F322b3.S043') }}</div>
                  </div>
                </v-col>
                <!-- KSD V001.000 DS -->
                <!-- <v-col cols="2" /> -->
                <!-- KSD V001.000 DE -->
                <!-- KSD V001.000 AS -->
                <v-col
                  cols="2"
                  class="editImg">
                  <img
                    src="@/assets/ico_edit.png"
                    class="receiptEditIcon"
                    tabindex="0"
                    @click="editReceiptHorizontalSetting"
                  >
                </v-col>
                <!--KSD V001.000 AE-->
              </v-row>
            </div>
          </v-row>
          <!-- KSD V001.000 AE -->

          <!--KSD V001.000 DS-->
          <!--<v-row -->
          <!--  no-gutters-->
          <!--  class="w-100 d-flex align-center" -->
          <!--  style="height:38%"> -->
          <!--  <div-->
          <!--    class="h-100 receipt1AttrRow ryosyuTitleWidth">-->
          <!--    <label-->
          <!--      class="grayFrame h-100 w-100 d-flex justify-center align-center"-->
          <!--      for="planningCode" -->
          <!--      > -->
          <!--        G002.00.0 Update-Start-->
          <!--        {{ $i18n.t('F322b3.S010') }}-->
          <!--        {{ $i18n.t('F322b3.S012') }}-->
          <!--        G002.00.0 Update-End-->
          <!--    </label>-->
          <!--  </div>-->
          <!--  <div-->
          <!--    class="h-100 receiptContentWidth">-->
          <!--  <v-row -->
          <!--    no-gutters-->
          <!--    class="w-100 h-100 d-flex align-center">-->
          <!--    <v-col-->
          <!--      class="h-100 contentCol"-->
          <!--      cols="10">-->
          <!--        <div class="h-100 w-100 d-flex receiptContentDivCenter receiptContentOuterDiv">-->
          <!--          <div class="ryosyuContentInnerDiv">-->
          <!--            <pre class="ryosyuMessage">{{ setting.ryosyuMessage_1 || " " }}</pre>-->
          <!--            <pre class="ryosyuMessage">{{ setting.ryosyuMessage_2 || " " }}</pre>-->
          <!--            <pre class="ryosyuMessage">{{ setting.ryosyuMessage_3 || " " }}</pre>-->
          <!--            <pre class="ryosyuMessage">{{ setting.ryosyuMessage_4 || " " }}</pre>-->
          <!--            <pre class="ryosyuMessage">{{ setting.ryosyuMessage_5 || " " }}</pre>-->
          <!--            <pre class="ryosyuMessage">{{ setting.ryosyuMessage_6 || " " }}</pre>-->
          <!--            <pre class="ryosyuMessage">{{ setting.ryosyuMessage_7 || " " }}</pre>-->
          <!--            <pre class="ryosyuMessage">{{ setting.ryosyuMessage_8 || " " }}</pre>-->
          <!--            <pre class="ryosyuMessage">{{ setting.ryosyuMessage_9 || " " }}</pre>-->
          <!--            <pre class="ryosyuMessage">{{ setting.ryosyuMessage_10 || " " }}</pre>-->
          <!--            <pre class="ryosyuMessage">{{ setting.ryosyuMessage_11 || " " }}</pre>-->
          <!--            <pre class="ryosyuMessage">{{ setting.ryosyuMessage_12 || " " }}</pre>-->
          <!--KSD V001.000 DE-->
          <!--KSD V001.000 AS-->
          <v-row
            no-gutters
            class="w-100 d-flex align-center"
            :style="[setting.receiptOrientation !== 'horizontal' && { height: '350px' }, setting.receiptOrientation === 'horizontal' && { height: '150px' }]"
          >
            <div class="h-100 receipt1AttrRow receiptTitleWidth">
              <label class="grayFrame h-100 w-100 d-flex justify-center align-center" for="planningCode">
                {{ $i18n.t('F322b3.S012') }}
              </label>
            </div>
            <div class="h-100 receiptContentWidth">
              <v-row no-gutters class="w-100 h-100 d-flex align-center">
                <v-col class="h-100 contentCol" cols="10">
                  <div class="h-100 w-100 d-flex receiptContentDivCenter receiptContentOuterDiv">
                    <div class="ryosyuContentInnerDiv" v-if="setting.receiptOrientation === 'horizontal'">
                      <pre class="ryosyuMessage">{{ setting.ryosyuMessage_1 || " " }}</pre>
                      <pre class="ryosyuMessage">{{ setting.ryosyuMessage_2 || " " }}</pre>
                      <pre class="ryosyuMessage">{{ setting.ryosyuMessage_3 || " " }}</pre>
                      <pre class="ryosyuMessage">{{ setting.ryosyuMessage_4 || " " }}</pre>
                      <pre class="ryosyuMessage">{{ setting.ryosyuMessage_5 || " " }}</pre>
                    </div>
                    <div class="receiptContentInnerDiv" v-if="setting.receiptOrientation !== 'horizontal'">
                      <pre class="receiptFixedText0">{{ setting.ryosyuMessage_1 || " " }}</pre>
                      <pre class="receiptFixedText0">{{ setting.ryosyuMessage_2 || " " }}</pre>
                      <pre class="receiptFixedText0">{{ setting.ryosyuMessage_3 || " " }}</pre>
                      <pre class="receiptFixedText0">{{ setting.ryosyuMessage_4 || " " }}</pre>
                      <pre class="receiptFixedText0">{{ setting.ryosyuMessage_5 || " " }}</pre>
                      <pre class="receiptFixedText0">{{ setting.ryosyuMessage_6 || " " }}</pre>
                      <pre class="receiptFixedText0">{{ setting.ryosyuMessage_7 || " " }}</pre>
                      <pre class="receiptFixedText0">{{ setting.ryosyuMessage_8 || " " }}</pre>
                      <pre class="receiptFixedText0">{{ setting.ryosyuMessage_9 || " " }}</pre>
                      <pre class="receiptFixedText0">{{ setting.ryosyuMessage_10 || " " }}</pre>
                      <pre class="receiptFixedText0">{{ setting.ryosyuMessage_11 || " " }}</pre>
                      <pre class="receiptFixedText0">{{ setting.ryosyuMessage_12 || " " }}</pre>
          <!-- KSD V001.000 AE -->
                    </div>
                  </div>
                </v-col>
                <v-col
                  cols="2"
                  class="editImg">
                  <!--KSD V001.000 DS-->
                  <!-- <img -->
                  <!--   src="@/assets/ico_edit.png" -->
                  <!--   class="receiptEditIcon" -->
                  <!--   tabindex="0" -->
                  <!--   @click="editRyosyuMessage" -->
                  <!-- > -->
                  <!-- KSD V001.000 DE -->
                  <!-- KSD V001.000 AS -->
                  <img
                    src="@/assets/ico_edit.png"
                    class="receiptEditIcon"
                    tabindex="0"
                    @click="setting.receiptOrientation !== 'horizontal' ? editRyosyuMessage() : editReceiptHorizontalPrintMessageDialog()"
                  >
                  <!-- KSD V001.000 AE -->
                </v-col>
              </v-row>
            </div>
          </v-row>
          <!-- KSD V001.000 DS -->
          <!-- <v-row -->
          <!--   no-gutters -->
          <!--   class="w-100 d-flex align-center" -->
          <!--   style="height:11%"> -->
          <!--   <div -->
          <!--     class="h-100 grayFrame receipt1AttrRow ryosyuTitleWidth"/> -->
          <!--   <div -->
          <!--     class="h-100 receiptContentWidth"> -->
          <!--     <v-row -->
          <!--       no-gutters -->
          <!--       class="w-100 h-100 d-flex align-center"> -->
          <!--       <v-col -->
          <!--         class="h-100 contentCol" -->
          <!--         cols="10"> -->
          <!--         <div class="h-100 receiptContentOuterDiv"> -->
          <!--         <div class="ryosyuFixedText4">{{ $i18n.t('F322b3.S045') }}</div> -->
          <!--         <div class="ryosyuFixedText5"> -->
          <!--           <div>{{ $i18n.t('F322b3.S046') }}</div> -->
          <!--           <div>{{ $i18n.t('F322b3.S047') }}</div> -->
          <!--         </div>-->
          <!--         <div class="ryosyuFixedText6"> -->
          <!--           <div>{{ $i18n.t('F322b3.S048') }}</div> -->
          <!--           <div>{{ $i18n.t('F322b3.S047') }}</div> -->
          <!-- KSD V001.000 DE -->
          <!-- KSD V001.000 AS -->
          <v-row
            no-gutters
            class="w-100 d-flex align-center receipt-height-02">
            <div
              class="h-100 grayFrame receipt1AttrRow receiptTitleWidth">
              <label class="grayFrame h-100 w-100 d-flex justify-center align-center" for="planningCode">
                {{ $i18n.t('F322b3.S077') }}
              </label>
            </div>
            <div class="h-100 receiptContentWidth">
              <v-row no-gutters class="w-100 h-100 d-flex align-center">
                <v-col class="h-100 contentCol" cols="10">
                  <div class="h-100 d-flex receiptContentDivCenter receiptContentOuterDiv">
                    <div class="receiptImgInnerDiv">
                      <img :src='setting.revenueStampLogoBase64EncodedString' v-if="setting.revenueStampLogoBase64EncodedString"
                        class="upload-img-tax">
          <!-- KSD V001.000 AE -->
                    </div>
                  </div>
                </v-col>
                <!--KSD V001.000 DS-->
                <!--<v-col cols="2"/>-->
                <!--KSD V001.000 DE-->
                <!--KSD V001.000 AS-->
                <v-col
                  cols="2"
                  class="editImg">
                  <img
                    src="@/assets/ico_edit.png"
                    class="receiptEditIcon"
                    tabindex="0"
                    @click="editReceiptTaxOfficePrintingImageDialog"
                  >
                </v-col>
                <!--KSD V001.000 AE-->
              </v-row>
            </div>
          </v-row>
          <!-- KSD V001.000 DS-->
          <!-- <v-row -->
          <!--   no-gutters-->
          <!--   class="w-100 d-flex align-center"-->
          <!--   style="height:10%">-->
          <!--   <div-->
          <!--     cols="2"-->
          <!--     class="h-100 receipt1AttrRow ryosyuTitleWidth">-->
          <!--     <label -->
          <!--      class="grayFrame h-100 w-100 d-flex justify-center align-center" -->
          <!--       for="planningCode" -->
          <!--     > -->
          <!--          G002.00.0 Update-Start -->
          <!--          {{ $i18n.t('F322b3.S005') }} -->
          <!--          {{ $i18n.t('F322b3.S013') }} -->
          <!--          G002.00.0 Update-End -->
          <!--     </label>-->
          <!--   </div> -->
          <!--   <div -->
          <!--     class="h-100 receiptContentWidth"> -->
          <!--   <v-row -->
          <!--     no-gutters -->
          <!--     class="w-100 d-flex align-center" -->
          <!--     style="height: 75%"> -->
          <!--     <v-col -->
          <!--       class="h-100 contentCol" -->
          <!--       cols="10"> -->
          <!--       <div-->
          <!--         class="h-100 d-flex receiptContentOuterLastDiv" -->
          <!--         style="justify-content: center;"> -->
          <!--         <div -->
          <!--           class="ryosyuContentInnerDiv" -->
          <!--           style="height:65%">{{ ryosyuInformationLabels[setting.ryosyuInformation] }}</div> -->
          <!-- KSD V001.000 DE -->
          <!-- KSD V001.000 AS -->
          <v-row
            no-gutters
            class="w-100 d-flex align-center"
            :style="[setting.receiptOrientation !== 'horizontal' ? { height: '100px' } : { height: '24%' }]">
            <div
              cols="2"
              class="h-100 receipt1AttrRow receiptTitleWidth">
              <label
                class="grayFrame h-100 w-100 d-flex justify-center align-center"
                for="planningCode"
              >
                {{ $i18n.t('F322b3.S011') }}
              </label>
            </div>
            <div
              class="h-100 receiptContentWidth">
              <v-row
                no-gutters
                class="w-100 d-flex align-center receipt-height-04">
                <v-col
                  class="h-100 contentCol"
                  cols="10">
                  <div
                    class="h-100 d-flex receiptContentOuterLastDiv justify-center pt-1">
                    <div
                      class="ryosyuContentInnerDiv receipt-height-05">{{
ryosyuInformationLabels[setting.ryosyuInformation] }}</div>
          <!--KSD V001.000 AE-->
                  </div>
                </v-col>
                <v-col
                  cols="2"
                  class="editImg">
                  <img
                    src="@/assets/ico_edit.png"
                    class="receiptEditIcon"
                    tabindex="0"
                    @click="editRyosyuInformation"
                  >
                </v-col>
              </v-row>
            </div>
          </v-row>
        </v-col>
        <!-- レシート -->
        <!-- KSD V001.000 DS -->
        <!-- <v-col -->
        <!--   cols="9"-->
        <!--   class="h-100 editCol"-->
        <!--   v-if="receiptType === 0">-->
        <!--   <v-row-->
        <!--     no-gutters-->
        <!--     class="w-100 d-flex align-center receiptLogoRow">-->
        <!--     <div  -->
        <!--      class="h-100 receipt1AttrRow ryosyuTitleWidth"> -->
        <!--      <label -->
        <!--        class="grayFrame h-100 w-100 d-flex justify-center align-center"-->
        <!--        for="planningCode" -->
        <!--      > -->
        <!--        {{ $i18n.t('F322b3.S005') }}-->
        <!--      </label>-->
        <!--    </div>-->
        <!--    <div -->
        <!--     class="h-100 receiptContentWidth">-->
        <!--KSD V001.000 DE-->
        <!--KSD V001.000 AS-->
        <v-col
          cols="9"
          class="h-100 editCol"
          v-if="receiptType === 0">
          <v-row
            no-gutters
            class="w-100 d-flex align-center receiptLogoRow">
            <div class="h-100 receipt1AttrRow receiptTitleWidth">
              <label
                class="grayFrame h-100 w-100 d-flex justify-center align-center"
                for="planningCode"
              >
                {{ $i18n.t('F322b3.S005') }}
              </label>
            </div>
            <div class="h-100 receiptContentWidth">
        <!--KSD V001.000 AE-->
              <v-row
                no-gutters
                class="w-100 d-flex align-center"
                style="height:9%"/>
              <v-row
                no-gutters
                class="w-100 d-flex align-center receiptHeaderRow">
                <v-col
                  class="h-100 contentCol"
                  cols="10">
                  <div class="h-100 d-flex receiptContentDivCenter receiptContentOuterFirstDiv">
                    <div class="receiptImgInnerDiv">
                      <!--KSD V001.000 DS-->
                      <!-- <img -->
                      <!--   :src='setting.headerLogoBase64EncodedString' -->
                      <!--   v-if="setting.headerLogoBase64EncodedString" -->
                      <!--   class="uploadImg"> -->
                      <!--KSD V001.000 DE-->
                      <!-- KSD V001.000 AS -->
                      <img
                        :src='setting.headerLogoBase64EncodedString'
                        v-if="setting.headerLogoBase64EncodedString"
                        class="upload-img-header"
                      >
                      <!-- KSD V001.000 AE -->
                    </div>
                  </div>
                </v-col>
                <v-col
                  cols="2"
                  class="editImg">
                  <img
                    src="@/assets/ico_edit.png"
                    class="receiptEditIcon"
                    tabindex="0"
                    @click="editReceiptHeaderLogo"
                  >
                </v-col>
              </v-row>
            </div>
          </v-row>
          <!--KSD V001.000 DS-->
          <!--<v-row-->
          <!--  no-gutters-->
          <!--  class="w-100 d-flex align-center receiptContentRow">-->
          <!--  <div-->
          <!--    class="h-100 receipt1AttrRow ryosyuTitleWidth">-->
          <!--    <label-->
          <!--      class="grayFrame h-100 w-100 d-flex justify-center align-center"-->
          <!--      for="planningCode" -->
          <!--    > -->
          <!--      {{ $i18n.t('F322b3.S006') }}-->
          <!--    </label>-->
          <!--  </div>-->
          <!--  <div-->
          <!--    class="h-100 receiptContentWidth">-->
          <!--    <v-row-->
          <!--      no-gutters-->
          <!--      class="w-100 h-100 d-flex align-center">-->
          <!--    <v-col-->
          <!--    class="h-100 contentCol"-->
          <!--    cols="10">-->
          <!--    <div class="h-100 d-flex receiptContentDivCenter receiptContentOuterDiv">-->
          <!--      <div class="receiptContentInnerDiv"/>-->
          <!--    </div>-->
          <!--    </v-col>-->
          <!--  <v-col-->
          <!--    cols="2"-->
          <!--    class="editImg">-->
          <!--      <img -->
          <!--        src="@/assets/ico_edit_h.png" -->
          <!--        class="receiptEditIcon" -->
          <!--        tabindex="0" -->
          <!--      > -->
          <!--KSD V001.000 DE-->
          <!--KSD V001.000 AS-->
          <v-row
            no-gutters
            class="w-100 d-flex align-center receiptContentRow"
            style="height:180px">
            <div
              class="h-100 receipt1AttrRow receiptTitleWidth"
            >
              <label
                class="grayFrame h-100 w-100 d-flex justify-center align-center"
                for="planningCode"
              >
                {{ $i18n.t('F322b3.S006') }}
              </label>
            </div>
            <div
              class="h-100 receiptContentWidth">
              <v-row
                no-gutters
                class="w-100 h-100 d-flex align-center">
                <v-col
                  class="h-100 contentCol"
                  cols="10">
                  <div class="h-100 d-flex receiptContentDivCenter receiptContentOuterDiv">
                    <div class="receiptContentInnerDiv">
                      <pre class="receiptFixedText0">{{ setting.commercialMessage_1 || " " }}</pre>
                      <pre class="receiptFixedText0">{{ setting.commercialMessage_2 || " " }}</pre>
                      <pre class="receiptFixedText0">{{ setting.commercialMessage_3 || " " }}</pre>
                      <pre class="receiptFixedText0">{{ setting.commercialMessage_4 || " " }}</pre>
                      <pre class="receiptFixedText0">{{ setting.commercialMessage_5 || " " }}</pre>
                    </div>
                  </div>
                </v-col>
                <v-col
                  cols="2"
                  class="editImg">
                  <img
                    src="@/assets/ico_edit.png"
                    class="receiptEditIcon"
                    tabindex="0"
                    @click="editReceiptCommercialMessage"
                  >
          <!--KSD V001.000 AE-->
                </v-col>
              </v-row>
            </div>
          </v-row>
          <!--KSD V001.000 DS-->
          <!--<v-row-->
          <!--  no-gutters-->
          <!--  class="w-100 d-flex align-center receiptProductRow">-->
          <!--    <div-->
          <!--      class="h-100 receipt1AttrRow ryosyuTitleWidth">-->
          <!--      <label-->
          <!--        class="grayFrame h-100 w-100 d-flex justify-center align-center"-->
          <!--        for="planningCode"-->
          <!--      >-->
          <!--        {{ $i18n.t('F322b3.S007') }}-->
          <!--      </label>-->
          <!--    </div>-->
          <!--    <div -->
          <!--     class="h-100 receiptContentWidth">-->
          <!--KSD V001.000 DE-->
          <!--KSD V001.000 AS-->
          <v-row
            no-gutters
            class="w-100 d-flex align-center receiptProductRow"
            style="height:416px">
            <div
              class="h-100 receipt1AttrRow receiptTitleWidth">
              <label
                class="grayFrame h-100 w-100 d-flex justify-center align-center"
                for="planningCode"
              >
                {{ $i18n.t('F322b3.S007') }}
              </label>
            </div>
            <div
              class="h-100 receiptContentWidth">
          <!-- KSD V001.000 AE -->
              <v-row
                no-gutters
                class="w-100 h-100 d-flex align-center">
                <v-col
                  class="h-100 contentCol"
                  cols="10">
                  <div class="h-100 d-flex receiptContentDivCenter receiptContentOuterDiv">
                    <div class="receiptContentInnerDiv">
                      <!-- G005.00.0 Delete-Start -->
                      <!-- <div class="receiptFixedText1">{{ $i18n.t('F322b3.S046') }}</div>
                      <div class="receiptFixedText">
                        <div class="receiptFixedText2">{{ $i18n.t('F322b3.S049') }}</div>
                        <div>{{ $i18n.t('F322b3.S047') }}</div>
                      </div>
                      <div class="receiptFixedText">
                        <pre>{{ $i18n.t('F322b3.S050') }}</pre>
                        <div>{{ $i18n.t('F322b3.S047') }}</div>
                      </div>
                      <div class="receiptFixedText">
                        <div class="receiptFixedText3">{{ $i18n.t('F322b3.S051') }}</div>
                        <div>{{ $i18n.t('F322b3.S047') }}</div>
                      </div>
                      <div class="receiptFixedText">
                        <div>{{ $i18n.t('F322b3.S048') }}</div>
                        <div>{{ $i18n.t('F322b3.S047') }}</div>
                      </div> -->
                      <!-- G005.00.0 Delete-End -->
                      <!-- G005.00.0 Add-Start -->
                      <div
                        class="receiptFixedText4"
                        v-if="setting.itemDetails">{{ $i18n.t('F322b3.S054') }}</div>
                      <div class="receiptFixedText1">{{ $i18n.t('F322b3.S046') }}</div>
                      <div class="receiptFixedText">
                        <div class="receiptFixedText2">{{ $i18n.t('F322b3.S057') }}</div>
                        <div>{{ $i18n.t('F322b3.S047') }}</div>
                      </div>
                      <div
                        class="receiptFixedText4"
                        v-if="setting.itemDetails">{{ $i18n.t('F322b3.S055') }}</div>
                      <div class="receiptFixedText1">{{ $i18n.t('F322b3.S058') }}</div>
                      <div class="receiptFixedText">
                        <div class="receiptFixedText2">{{ $i18n.t('F322b3.S059') }}</div>
                        <div>{{ $i18n.t('F322b3.S064') }}</div>
                      </div>
                      <div
                        class="receiptFixedText4"
                        v-if="setting.itemDetails">{{ $i18n.t('F322b3.S056') }}</div>
                      <div class="receiptFixedText1">{{ $i18n.t('F322b3.S060') }}</div>
                      <div class="receiptFixedText">
                        <div class="receiptFixedText2">{{ $i18n.t('F322b3.S049') }}</div>
                        <div>{{ setting.sellingPriceChangeMark + $i18n.t('F322b3.S069') }}</div>
                      </div>
                      <div class="receiptFixedText">
                        <pre>{{ $i18n.t('F322b3.S050') }}</pre>
                        <div>{{ $i18n.t('F322b3.S065') }}</div>
                      </div>
                      <div
                        class="receiptFixedText"
                        v-if="setting.taxClassification">
                        <div class="receiptFixedText3">{{ $i18n.t('F322b3.S061') }}</div>
                        <div>{{ $i18n.t('F322b3.S047') }}</div>
                      </div>
                      <div
                        class="receiptFixedText"
                        v-if="setting.taxClassification">
                        <div class="receiptFixedText5">{{ $i18n.t('F322b3.S062') }}</div>
                        <div>{{ $i18n.t('F322b3.S066') }}</div>
                      </div>
                      <div
                        class="receiptFixedText"
                        v-if="setting.taxClassification">
                        <div class="receiptFixedText3">{{ $i18n.t('F322b3.S051') }}</div>
                        <div>{{ $i18n.t('F322b3.S067') }}</div>
                      </div>
                      <div
                        class="receiptFixedText"
                        v-if="setting.taxClassification">
                        <div class="receiptFixedText3">{{ $i18n.t('F322b3.S063') }}</div>
                        <div>{{ $i18n.t('F322b3.S064') }}</div>
                      </div>
                      <div class="receiptFixedText">
                        <div>{{ $i18n.t('F322b3.S048') }}</div>
                        <div>{{ $i18n.t('F322b3.S068') }}</div>
                      </div>
                      <!-- G005.00.0 Add-End -->
                    </div>
                  </div>
                </v-col>
                <v-col
                  cols="2"
                  class="editImg">
                  <img
                    src="@/assets/ico_edit.png"
                    class="receiptEditIcon"
                    tabindex="0"
                    @click="editReceiptProduct"
                  >
                </v-col>
              </v-row>
            </div>
          </v-row>
          <!-- KSD V001.000 DS -->
          <!-- <v-row-->
          <!--   no-gutters-->
          <!--   class="w-100 d-flex align-center receiptContentRow">-->
          <!--     <div -->
          <!--       class="h-100 receipt1AttrRow ryosyuTitleWidth">-->
          <!--         <label-->
          <!--           class="grayFrame h-100 w-100 d-flex justify-center align-center"-->
          <!--           for="planningCode" -->
          <!--         > -->
          <!--           {{ $i18n.t('F322b3.S008') }}-->
          <!--         </label>-->
          <!--     </div>-->
          <!--     <div-->
          <!--       class="h-100 receiptContentWidth">-->
          <!--       <v-row-->
          <!--         no-gutters-->
          <!--         class="w-100 h-100 d-flex align-center">-->
          <!--         <v-col-->
          <!--           class="h-100 contentCol"-->
          <!--           cols="10">-->
          <!--             <div class="h-100 d-flex receiptContentDivCenter receiptContentOuterDiv">-->
          <!--             <div class="receiptContentInnerDiv"/>-->
          <!--             </div>-->
          <!--         </v-col>-->
          <!--         <v-col-->
          <!--           cols="2"-->
          <!--           class="editImg">-->
          <!--             <img -->
          <!--               src="@/assets/ico_edit_h.png"-->
          <!--               class="receiptEditIcon"-->
          <!--               tabindex="0"-->
          <!--             > -->
          <!-- KSD V001.000 DE -->
          <!-- KSD V001.000 AS -->
          <v-row
            no-gutters
            class="w-100 d-flex align-center receiptContentRow receiptBarcodeRow">
            <div
              class="h-100 receipt1AttrRow receiptTitleWidth d-flex justify-center align-center"
              style="border-bottom: 1px solid #d9dadd; min-height: 125px;">
              <label
                class="grayFrame h-100 w-100 d-flex justify-center align-center"
                for="planningCode"
              >
                {{ $i18n.t('F322b3.S008') }}
              </label>
            </div>
            <div
              class="h-100 receiptContentWidth">
              <v-row
                no-gutters
                class="w-100 h-100 d-flex align-center">
                <v-col
                  class="h-100 contentCol"
                  cols="10">
                  <div class="h-100 d-flex receiptContentDivCenter receiptContentOuterDiv">
                    <div class="receiptContentInnerDiv">
                      <div class="d-flex justify-center" style="flex-direction: column;align-items: center;" v-if="setting.searchBarcodePrint">
                        <img src="@/assets/image/barcode.png" class="uploadImg" />
                        <div>03282301000032</div>
                      </div>
                    </div>
                  </div>
                </v-col>
                <v-col
                  cols="2"
                  class="editImg d-flex align-center">
                  <img
                    src="@/assets/ico_edit.png"
                    class="receiptEditIcon"
                    tabindex="0"
                    @click="editReceiptDealSearchBarcode"
                  >
          <!-- KSD V001.000 AE -->
                </v-col>
              </v-row>
            </div>
          </v-row>
          <!-- KSD V001.000 DS -->
          <!--  <v-row-->
          <!--    no-gutters-->
          <!--    class="w-100 d-flex align-center receiptContentRow">-->
          <!--    <div-->
          <!--      class="h-100 receipt1AttrRow ryosyuTitleWidth">-->
          <!--      <label-->
          <!--        class="grayFrame h-100 w-100 d-flex justify-center align-center"-->
          <!--        for="planningCode"-->
          <!--      >-->
          <!--          {{ $i18n.t('F322b3.S009') }}-->
          <!--      </label>-->
          <!--    </div>-->
          <!--    <div-->
          <!--      class="h-100 receiptContentWidth">-->
          <!--      <v-row-->
          <!--        no-gutters-->
          <!--        class="w-100 h-100 d-flex align-center">-->
          <!--        <v-col-->
          <!--        class="h-100 contentCol"-->
          <!--        cols="10">-->
          <!--          <div class="h-100 d-flex receiptContentDivCenter receiptContentOuterDiv">-->
          <!--            <div class="receiptContentInnerDiv"/>-->
          <!--          </div>-->
          <!--        </v-col>-->
          <!--        <v-col-->
          <!--          cols="2"-->
          <!--          class="editImg">-->
          <!--            <img -->
          <!--              src="@/assets/ico_edit_h.png" -->
          <!--              class="receiptEditIcon" -->
          <!--              tabindex="0"-->
          <!--            > -->
          <!-- KSD V001.000 DE -->
          <!-- KSD V001.000 AS -->
          <v-row
            no-gutters
            class="w-100 d-flex align-center receiptFooterLogoRow">
            <div
              class="h-100 receipt1AttrRow receiptTitleWidth">
              <label
                class="grayFrame h-100 w-100 d-flex justify-center align-center"
                for="planningCode"
              >
                {{ $i18n.t('F322b3.S009') }}
              </label>
            </div>
            <div
              class="h-100 receiptContentWidth">
              <v-row
                no-gutters
                class="w-100 h-100 d-flex align-center">
                <v-col
                  class="h-100 contentCol"
                  cols="10">
                  <div class="h-100 d-flex receiptContentDivCenter receiptContentOuterDiv">
                    <div class="receiptImgInnerDiv my-2">
                      <img :src='setting.footerLogoBase64EncodedString' v-if="setting.footerLogoBase64EncodedString"
                        class="upload-img-footer">
                    </div>
                  </div>
                </v-col>
                <v-col
                  cols="2"
                  class="editImg">
                  <img
                    src="@/assets/ico_edit.png"
                    class="receiptEditIcon"
                    tabindex="0"
                    @click="editReceiptFooterLogo"
                  >
          <!-- KSD V001.000 AE -->
                </v-col>
              </v-row>
            </div>
          </v-row>
          <!-- KSD V001.000 DS -->
          <!--<v-row -->
          <!--  no-gutters -->
          <!--  class="w-100 d-flex align-center receiptContentRow"> -->
          <!--    <div -->
          <!--      class="h-100 receipt1AttrRow ryosyuTitleWidth"> -->
          <!--      <label -->
          <!--        class="grayFrame h-100 w-100 d-flex justify-center align-center" -->
          <!--        for="planningCode" -->
          <!--      > -->
          <!--        {{ $i18n.t('F322b3.S010') }} -->
          <!--      </label> -->
          <!--    </div> -->
          <!--    <div -->
          <!--      class="h-100 receiptContentWidth"> -->
          <!--      <v-row -->
          <!--        no-gutters -->
          <!--        class="w-100 h-100 d-flex align-center"> -->
          <!--        <v-col -->
          <!--          class="h-100 contentCol" -->
          <!--          cols="10"> -->
          <!--          <div class="h-100 d-flex receiptContentDivCenter receiptContentOuterDiv"> -->
          <!--          <div class="receiptContentInnerDiv"/>-->
          <!-- KSD V001.000 DE -->
          <!-- KSD V001.000 AS -->
          <v-row
            no-gutters
            class="w-100 d-flex align-center receiptContentRow"
            style="height:300px">
            <div
              class="h-100 receipt1AttrRow receiptTitleWidth">
              <label
                class="grayFrame h-100 w-100 d-flex justify-center align-center"
                for="planningCode"
              >
                {{ $i18n.t('F322b3.S010') }}
              </label>
            </div>
            <div class="h-100 receiptContentWidth">
              <v-row
                no-gutters
                class="w-100 h-100 d-flex align-center">
                <v-col
                  class="h-100 contentCol"
                  cols="10">
                  <div class="h-100 d-flex receiptContentDivCenter receiptContentOuterDiv">
                    <div class="receiptContentInnerDiv">
                      <pre class="receiptFixedText0">{{ setting.footerMessage_1 || " " }}</pre>
                      <pre class="receiptFixedText0">{{ setting.footerMessage_2 || " " }}</pre>
                      <pre class="receiptFixedText0">{{ setting.footerMessage_3 || " " }}</pre>
                      <pre class="receiptFixedText0">{{ setting.footerMessage_4 || " " }}</pre>
                      <pre class="receiptFixedText0">{{ setting.footerMessage_5 || " " }}</pre>
                      <pre class="receiptFixedText0">{{ setting.footerMessage_6 || " " }}</pre>
                      <pre class="receiptFixedText0">{{ setting.footerMessage_7 || " " }}</pre>
                      <pre class="receiptFixedText0">{{ setting.footerMessage_8 || " " }}</pre>
                      <pre class="receiptFixedText0">{{ setting.footerMessage_9 || " " }}</pre>
                      <pre class="receiptFixedText0">{{ setting.footerMessage_10 || " " }}</pre>
                    </div>
                  </div>
                </v-col>
                <v-col cols="2" class="editImg">
                  <img src="@/assets/ico_edit.png" class="receiptEditIcon" tabindex="0"
                    @click="editReceiptFooterMessage">
                </v-col>
              </v-row>
            </div>
          </v-row>
          <v-row no-gutters class="w-100 d-flex align-center receiptContentRow" style="height:83px">
            <div class="h-100 receipt1AttrRow receiptTitleWidth">
              <label class="grayFrame h-100 w-100 d-flex justify-center align-center" for="planningCode">
                {{ $i18n.t('F322b3.S075') }}
              </label>
            </div>
            <div class="h-100 receiptContentWidth">
              <v-row no-gutters class="w-100 h-100 d-flex align-center">
                <v-col class="h-100 contentCol" cols="10">
                  <!-- KSD V001.000 DS -->
                  <!-- <div class="h-100 d-flex receiptContentDivCenter receiptContentOuterDiv"> -->
                  <!-- KSD V001.000 DE -->
                  <!-- KSD V001.000 AS -->
                  <div class="h-100 d-flex receiptContentDivCenter receiptContentOuterDiv py-1">
                    <div class="receiptContentInnerDiv">
                      <pre class="receiptFixedText0">{{ setting.merchantName_1 || " " }}</pre>
                      <pre class="receiptFixedText0">{{ setting.merchantName_2 || " " }}</pre>
                    </div>
                    <!-- KSD V001.000 AE -->
                  </div>
                </v-col>
                <v-col
                  cols="2"
                  class="editImg">
                  <!-- KSD V001.000 DS -->
                  <!-- <img -->
                  <!--   src="@/assets/ico_edit_h.png" -->
                  <!--   class="receiptEditIcon" -->
                  <!--   tabindex="0" -->
                  <!-- > -->
                  <!-- KSD V001.000 DE -->
                  <!-- KSD V001.000 AS -->
                  <img
                    src="@/assets/ico_edit.png"
                    class="receiptEditIcon"
                    tabindex="0"
                    @click="editReceiptMerchant"
                  >
                  <!-- KSD V001.000 AE -->
                </v-col>
              </v-row>
            </div>
          </v-row>
          <!-- KSD V001.000 AE -->
          <!-- KSD V001.000 DS -->
          <!--<v-row-->
          <!--  no-gutters-->
          <!--  class="w-100 d-flex align-center receiptContentRow">-->
          <!--    <div-->
          <!--      class="h-100 receipt1AttrRow ryosyuTitleWidth">-->
          <!--      <label-->
          <!--        class="grayFrame h-100 w-100 d-flex justify-center align-center"-->
          <!--        for="planningCode" -->
          <!--      > -->
          <!--          G002.00.0 Update-Start-->
          <!--        {{ $i18n.t('F322b3.S005') }}-->
          <!--        {{ $i18n.t('F322b3.S013') }}-->
          <!--          G002.00.0 Update-End-->
          <!--      </label>-->
          <!--    </div>-->
          <!--    <div -->
          <!--     class="h-100 receiptContentWidth">-->
          <!--     <v-row-->
          <!--       no-gutters-->
          <!--       class="w-100 d-flex align-center"-->
          <!--       style="height:70%">-->
          <!--       <v-col-->
          <!--         class="h-100 contentCol"-->
          <!--         cols="10">-->
          <!--         <div-->
          <!--           class="h-100 d-flex receiptContentOuterLastDiv"-->
          <!--           style="justify-content: center;">-->
          <!--           <div -->
          <!--             class="receiptContentInnerDiv"  -->
          <!--             style="height:70%">{{ receiptInformationLabels[setting.receiptInformation] }}</div>  -->
          <!--KSD V001.000 DE-->
          <!--KSD V001.000 AS-->
          <v-row
            no-gutters
            class="w-100 d-flex align-center receiptContentRow"
            style="height:100px">
            <div
              class="h-100 receipt1AttrRow receiptTitleWidth">
              <label
                class="grayFrame h-100 w-100 d-flex justify-center align-center"
                for="planningCode"
              >
                {{ $i18n.t('F322b3.S011') }}
              </label>
            </div>
            <div
              class="h-100 receiptContentWidth">
              <v-row
                no-gutters
                class="w-100 d-flex align-center receipt-height-04">
                <v-col
                  class="h-100 contentCol"
                  cols="10">
                  <div
                    class="h-100 d-flex receiptContentOuterLastDiv pt-1"
                    style="justify-content: center;">
                    <div
                      class="receiptContentInnerDiv"
                      style="height:70%">{{receiptInformationLabels[setting.receiptInformation] }}</div>
          <!--KSD V001.000 AE-->
                  </div>
                </v-col>
                <v-col
                  cols="2"
                  class="editImg">
                  <img
                    src="@/assets/ico_edit.png"
                    class="receiptEditIcon"
                    tabindex="0"
                    @click="editReceiptInformation"
                  >
                </v-col>
              </v-row>
            </div>
          </v-row>
        </v-col>
        <!--KSD V001.000 AS-->
        <v-col cols="9" class="h-100 editCol" v-if="receiptType === 2">
          <v-row no-gutters class="w-100 d-flex align-center" style="height:417px">
            <div class="h-100 receipt1AttrRow receiptTitleWidth">
              <label class="grayFrame h-100 w-100 d-flex justify-center align-center" for="planningCode" />
            </div>
            <div class="h-100 receiptContentWidth">
              <v-row no-gutters class="w-100 h-100 d-flex align-center">
                <v-col class="h-100 contentCol" cols="10">
                  <div class="h-100 w-100 d-flex receiptContentDivCenter receiptContentOuterFirstDiv mt-5">
                    <div class="h-100 d-flex">
                      <div>
                        <img :src='picStatementOfAccount' class="uploadImg" />
                        <div class="ryosyuFixedTextDate mt-1">{{ $i18n.t('F322b3.S039') }}</div>
                        <div class="ryosyuFixedTextv1 mt-5">{{ $i18n.t('F322b3.S098') }}</div>
                        <v-row no-gutters>
                          <v-col cols="6">
                            <div class="ryosyuFixedText5 ml-2">{{ $i18n.t('F322b3.S101') }}</div>
                            <div class="ryosyuFixedText5 ml-2">{{ $i18n.t('F322b3.S102') }}</div>
                            <div class="ryosyuFixedText5 ml-2">{{ $i18n.t('F322b3.S103') }}</div>
                            <div class="ryosyuFixedText5 ml-2">{{ $i18n.t('F322b3.S104') }}</div>
                            <div class="ryosyuFixedText5 ml-2">{{ $i18n.t('F322b3.S105') }}</div>
                          </v-col>
                          <v-col cols="6">
                            <div class="ryosyuFixedText5 mt-6 ml-6">{{ $i18n.t('F322b3.S119') }}</div>
                            <div class="ryosyuFixedText5 ml-6">{{ $i18n.t('F322b3.S120') }}</div>
                            <div class="ryosyuFixedText5 ml-6">{{ $i18n.t('F322b3.S120') }}</div>
                            <div class="ryosyuFixedText5 ml-6">{{ $i18n.t('F322b3.S122') }}</div>
                          </v-col>
                        </v-row>
                      </div>
                    </div>
                  </div>
                </v-col>
                <v-col cols="2" class="editImg" />
              </v-row>
            </div>
          </v-row>
          <v-row no-gutters class="w-100 d-flex align-center receiptContentRow" style="height:200px">
            <div class="h-100 receipt1AttrRow receiptTitleWidth">
              <label class="grayFrame h-100 w-100 d-flex justify-center align-center" for="planningCode">
                {{ $i18n.t('F322b3.S099') }}
              </label>
            </div>
            <div class="h-100 receiptContentWidth">
              <v-row no-gutters class="w-100 h-100 d-flex align-center">
                <v-col class="h-100 contentCol" cols="10">
                  <div class="h-100 d-flex receiptContentDivCenter receiptContentOuterDiv">
                    <div class="receiptContentInnerDiv">
                      <pre class="receiptFixedText0" v-for="(row, index) in setting.optionalComment" :key="index">{{ row || ' ' }}</pre>
                    </div>
                  </div>
                </v-col>
                <v-col cols="2" class="editImg">
                  <img src="@/assets/ico_edit.png" class="receiptEditIcon" tabindex="0"
                    @click="editEntranceSlipOptionalCommentDialog">
                </v-col>
              </v-row>
            </div>
          </v-row>
          <v-row no-gutters class="w-100 d-flex align-center receiptProductRow" style="height: 784px;">
            <div class="h-100 receipt1AttrRow receiptTitleWidth">
              <label class="grayFrame h-100 w-100 d-flex justify-center align-center" for="planningCode">
                {{ $i18n.t('F322b3.S100') }}
              </label>
            </div>
            <div class="h-100 receiptContentWidth">
              <v-row no-gutters class="w-100 d-flex align-center" style="height: 98%">
                <v-col class="h-100 contentCol" cols="10">
                  <div class="h-100 d-flex receiptContentDivCenter receiptContentOuterLastDiv">
                    <div class="receiptContentInnerDiv">
                      <div class="receiptFixedText0 word-break">{{ setting.enterRoomQrCodeUrl }}</div>
                    </div>
                  </div>
                </v-col>
                <v-col cols="2" class="editImg">
                  <img src="@/assets/ico_edit.png" class="receiptEditIcon" tabindex="0" @click="editEntranceSlipAdmissionTicketQrcodeDialog">
                </v-col>
              </v-row>
            </div>
          </v-row>
        </v-col>
        <!--KSD V001.000 AE-->
      </v-row>
      <!-- G002.00.0 Add-End -->
      <!-- G002.00.0 Delete-Start -->
      <!-- ヘッダーロゴのファイル -->
      <!--<v-row no-gutters class="w-100 d-flex align-center mt-5">
        <v-col cols="3" class="h-100">
          <label class="grayFrame d-flex justify-center align-center h-100 w-100">
            {{ "ヘッダーロゴのファイル" }}
          </label>
        </v-col>

        <v-col cols="6" class="h-100 whiteFrame d-flex align-center">
          <v-btn
            color="#1ea7cb"
            class="ml-2"
            style="height: 36px;"
            tabindex="7"
            @click="$refs.headerLogoFile.click()"
          >
            <font color ="white" size= "4px" style="font-weight:bold;">{{ "ファイル選択" }}</font>
          </v-btn><v-spacer></v-spacer>
          <span>{{ headerLogoFileName }}</span>
        </v-col>
      </v-row>
      <input
        id="headerLogoFile"
        style="display: none;"
        ref="headerLogoFile"
        type="file"
        accept="image/*"
        @change="onSelectHeaderLogoFile"
      />-->

      <!-- 商品明細 -->
      <!-- <v-row no-gutters class="conditionRow w-100 d-flex align-center mt-5">
        <v-col cols="3" class="h-100">
          <label class="grayFrame d-flex justify-center align-center h-100 w-100">
            {{ "商品明細" }}
          </label>
        </v-col>

        <v-col cols="6" class="h-100">
          <radio-button v-model="setting.itemDetails" :labels="itemDetailLabels" />
        </v-col>
      </v-row> -->

      <!-- 税区分 -->
      <!--<v-row no-gutters class="conditionRow w-100 d-flex align-center mt-5">
        <v-col cols="4" class="h-100">
          <label class="grayFrame d-flex justify-center align-center h-100 w-100">
            {{ "税区分" }}
          </label>
        </v-col>

        <v-col cols="5" class="h-100">
          <radio-button v-model="setting.taxClassification" :labels="taxClassificationLabels" />
        </v-col>
      </v-row> -->

      <!-- 売変マーク設定 -->
      <!--<v-row no-gutters class="conditionRow w-100 d-flex align-center mt-5">
        <v-col cols="4" class="h-100">
          <label class="grayFrame h-100 w-100 d-flex justify-center align-center">
            {{ "売変マーク設定" }}
          </label>
        </v-col>

        <v-col cols="5" class="h-100">
          <input
            id="sellingPriceChangeMark"
            class="whiteFrame h-100 w-100 pl-2"
            type="text"
            v-model="setting.sellingPriceChangeMark"
            maxlength="1"
            :placeholder="this.$i18n.t('F00001.S083')"
            @input="numInputAlphaRegulation"
          />
        </v-col>
      </v-row>-->

      <!-- その他付加情報エリア -->
      <!--<v-row no-gutters class="conditionRow w-100 d-flex align-center mt-5">
        <v-col cols="4" class="h-100">
          <label class="grayFrame d-flex justify-center align-center h-100 w-100">
            {{ "その他付加情報エリア" }}
          </label>
        </v-col>

        <v-col cols="5" class="h-100">
          <radio-button v-model="setting.receiptInformation" :labels="receiptInformationLabels" />
        </v-col>
      </v-row>-->

      <!-- 領収証その他付加情報エリア -->
      <!--<v-row no-gutters class="conditionRow w-100 d-flex align-center mt-5">
        <v-col cols="4" class="h-100">
          <label class="grayFrame d-flex justify-center align-center h-100 w-100">
            {{ "領収証その他付加情報エリア" }}
          </label>
        </v-col>

        <v-col cols="5" class="h-100">
          <radio-button v-model="setting.ryosyuInformation" :labels="ryosyuInformationLabels" />
        </v-col>
      </v-row>-->

      <!-- 領収証メッセージ（1行目） -->
      <!--<v-row no-gutters class="conditionRow w-100 d-flex align-center mt-5">
        <v-col cols="4" class="h-100">
          <label class="grayFrame h-100 w-100 d-flex justify-center align-center">
            {{ "領収証メッセージ（1行目）" }}
          </label>
        </v-col>

        <v-col cols="5" class="h-100">
          <input
            id="ryosyuMessage_1"
            class="whiteFrame h-100 w-100 pl-2"
            type="text"
            v-model="setting.ryosyuMessage_1"
            :placeholder="this.$i18n.t('F00001.S084')"
            @input="inputLimit(setting.ryosyuMessage_1,30)"
          />
        </v-col>
      </v-row>-->

      <!-- 領収証メッセージ（2行目） -->
      <!--<v-row no-gutters class="conditionRow w-100 d-flex align-center mt-5">
        <v-col cols="4" class="h-100">
          <label class="grayFrame h-100 w-100 d-flex justify-center align-center">
            {{ "領収証メッセージ（2行目）" }}
          </label>
        </v-col>

        <v-col cols="5" class="h-100">
          <input
            id="ryosyuMessage_2"
            class="whiteFrame h-100 w-100 pl-2"
            type="text"
            v-model="setting.ryosyuMessage_2"
            :placeholder="this.$i18n.t('F00001.S084')"
            @input="inputLimit(setting.ryosyuMessage_2,30)"
          />
        </v-col>
      </v-row>-->

      <!-- 領収証メッセージ（3行目） -->
      <!--<v-row no-gutters class="conditionRow w-100 d-flex align-center mt-5">
        <v-col cols="4" class="h-100">
          <label class="grayFrame h-100 w-100 d-flex justify-center align-center">
            {{ "領収証メッセージ（3行目）" }}
          </label>
        </v-col>

        <v-col cols="5" class="h-100">
          <input
            id="ryosyuMessage_3"
            class="whiteFrame h-100 w-100 pl-2"
            type="text"
            v-model="setting.ryosyuMessage_3"
            :placeholder="this.$i18n.t('F00001.S084')"
            @input="inputLimit(setting.ryosyuMessage_3,30)"
          />
        </v-col>
      </v-row>-->

      <!-- 領収証メッセージ（4行目） -->
      <!--<v-row no-gutters class="conditionRow w-100 d-flex align-center mt-5">
        <v-col cols="4" class="h-100">
          <label class="grayFrame h-100 w-100 d-flex justify-center align-center">
            {{ "領収証メッセージ（4行目）" }}
          </label>
        </v-col>

        <v-col cols="5" class="h-100">
          <input
            id="ryosyuMessage_4"
            class="whiteFrame h-100 w-100 pl-2"
            type="text"
            v-model="setting.ryosyuMessage_4"
            :placeholder="this.$i18n.t('F00001.S084')"
            @input="inputLimit(setting.ryosyuMessage_4,30)"
          />
        </v-col>
      </v-row>-->

      <!-- 領収証メッセージ（5行目） -->
      <!--<v-row no-gutters class="conditionRow w-100 d-flex align-center mt-5">
        <v-col cols="4" class="h-100">
          <label class="grayFrame h-100 w-100 d-flex justify-center align-center">
            {{ "領収証メッセージ（5行目）" }}
          </label>
        </v-col>

        <v-col cols="5" class="h-100">
          <input
            id="ryosyuMessage_5"
            class="whiteFrame h-100 w-100 pl-2"
            type="text"
            v-model="setting.ryosyuMessage_5"
            :placeholder="this.$i18n.t('F00001.S084')"
            @input="inputLimit(setting.ryosyuMessage_5,30)"
          />
        </v-col>
      </v-row>-->

      <!-- 領収証メッセージ（6行目） -->
      <!--<v-row no-gutters class="conditionRow w-100 d-flex align-center mt-5">
        <v-col cols="4" class="h-100">
          <label class="grayFrame h-100 w-100 d-flex justify-center align-center">
            {{ "領収証メッセージ（6行目）" }}
          </label>
        </v-col>

        <v-col cols="5" class="h-100">
          <input
            id="ryosyuMessage_6"
            class="whiteFrame h-100 w-100 pl-2"
            type="text"
            v-model="setting.ryosyuMessage_6"
            :placeholder="this.$i18n.t('F00001.S084')"
            @input="inputLimit(setting.ryosyuMessage_6,30)"
          />
        </v-col>
      </v-row>-->

      <!-- 領収証メッセージ（7行目） -->
      <!--<v-row no-gutters class="conditionRow w-100 d-flex align-center mt-5">
        <v-col cols="4" class="h-100">
          <label class="grayFrame h-100 w-100 d-flex justify-center align-center">
            {{ "領収証メッセージ（7行目）" }}
          </label>
        </v-col>

        <v-col cols="5" class="h-100">
          <input
            id="ryosyuMessage_7"
            class="whiteFrame h-100 w-100 pl-2"
            type="text"
            v-model="setting.ryosyuMessage_7"
            :placeholder="this.$i18n.t('F00001.S084')"
            @input="inputLimit(setting.ryosyuMessage_7,30)"
          />
        </v-col>
      </v-row>-->

      <!-- 領収証メッセージ（8行目） -->
      <!--<v-row no-gutters class="conditionRow w-100 d-flex align-center mt-5">
        <v-col cols="4" class="h-100">
          <label class="grayFrame h-100 w-100 d-flex justify-center align-center">
            {{ "領収証メッセージ（8行目）" }}
          </label>
        </v-col>

        <v-col cols="5" class="h-100">
          <input
            id="ryosyuMessage_8"
            class="whiteFrame h-100 w-100 pl-2"
            type="text"
            v-model="setting.ryosyuMessage_8"
            :placeholder="this.$i18n.t('F00001.S084')"
            @input="inputLimit(setting.ryosyuMessage_8,30)"
          />
        </v-col>
      </v-row>-->

      <!-- 領収証メッセージ（9行目） -->
      <!--<v-row no-gutters class="conditionRow w-100 d-flex align-center mt-5">
        <v-col cols="4" class="h-100">
          <label class="grayFrame h-100 w-100 d-flex justify-center align-center">
            {{ "領収証メッセージ（9行目）" }}
          </label>
        </v-col>

        <v-col cols="5" class="h-100">
          <input
            id="ryosyuMessage_9"
            class="whiteFrame h-100 w-100 pl-2"
            type="text"
            v-model="setting.ryosyuMessage_9"
            :placeholder="this.$i18n.t('F00001.S084')"
            @input="inputLimit(setting.ryosyuMessage_9,30)"
          />
        </v-col>
      </v-row>-->

      <!-- 領収証メッセージ（10行目） -->
      <!--<v-row no-gutters class="conditionRow w-100 d-flex align-center mt-5">
        <v-col cols="4" class="h-100">
          <label class="grayFrame h-100 w-100 d-flex justify-center align-center">
            {{ "領収証メッセージ（10行目）" }}
          </label>
        </v-col>

        <v-col cols="5" class="h-100">
          <input
            id="ryosyuMessage_10"
            class="whiteFrame h-100 w-100 pl-2"
            type="text"
            v-model="setting.ryosyuMessage_10"
            :placeholder="this.$i18n.t('F00001.S084')"
            @input="inputLimit(setting.ryosyuMessage_10,30)"
          />
        </v-col>
      </v-row>-->

      <!-- 領収証メッセージ（11行目） -->
      <!--<v-row no-gutters class="conditionRow w-100 d-flex align-center mt-5">
        <v-col cols="4" class="h-100">
          <label class="grayFrame h-100 w-100 d-flex justify-center align-center">
            {{ "領収証メッセージ（11行目）" }}
          </label>
        </v-col>

        <v-col cols="5" class="h-100">
          <input
            id="ryosyuMessage_11"
            class="whiteFrame h-100 w-100 pl-2"
            type="text"
            v-model="setting.ryosyuMessage_11"
            :placeholder="this.$i18n.t('F00001.S084')"
            @input="inputLimit(setting.ryosyuMessage_11,30)"
          />
        </v-col>
      </v-row>-->

      <!-- 領収証メッセージ（12行目） -->
      <!--<v-row no-gutters class="conditionRow w-100 d-flex align-center mt-5">
        <v-col cols="4" class="h-100">
          <label class="grayFrame h-100 w-100 d-flex justify-center align-center">
            {{ "領収証メッセージ（12行目）" }}
          </label>
        </v-col>

        <v-col cols="5" class="h-100">
          <input
            id="ryosyuMessage_12"
            class="whiteFrame h-100 w-100 pl-2"
            type="text"
            v-model="setting.ryosyuMessage_12"
            :placeholder="this.$i18n.t('F00001.S084')"
            @input="inputLimit(setting.ryosyuMessage_12,30)"
          />
        </v-col>
      </v-row>-->
    </template>
    <!-- G002.00.0 Delete-End -->

    <!-- 企画確認ダイアログ -->
    <receipt-list-dialog
      ref="receiptListDialog"
      @clickLink="onClickPlanLink"
    />

    <!-- コピーダイアログ -->
    <receipt-copy-dialog
      ref="receiptCopyDialog"
      @clickOk="copyPlan" />

    <!-- G002.00.0 Add-Start -->
    <!-- 領収証メッセージ -->
    <ryosyu-message-dialog
      ref="ryosyuMessageDialog"
      @clickOk="onEditDialogClickOk" />
    <!-- 領収証その他付加情報エリア -->
    <ryosyu-information-dialog
      ref="ryosyuInformationDialog"
      @clickOk="onEditDialogClickOk" />
    <!-- その他付加情報エリア -->
    <receipt-information-dialog
      ref="receiptInformationDialog"
      @clickOk="onEditDialogClickOk" />
    <!-- 商品明細 -->
    <receipt-product-dialog
      ref="receiptProductDialog"
      @clickOk="onEditDialogClickOk" />
    <!-- ヘッダーロゴ -->
    <receipt-header-logo-dialog
      ref="receiptHeaderLogoDialog"
      @clickOk="onImgDialogClickOk" />
    <!-- G002.00.0 Add-End -->
    <!--KSD V001.000 AS-->
    <receipt-commercial-message-dialog
      ref="receiptCommercialMessageDialog"
      @clickOk="onEditDialogClickOk" />
    <receipt-footer-message-dialog
      ref="receiptFooterMessageDialog"
      @clickOk="onEditDialogClickOk" />
    <receipt-deal-search-barcode-dialog
      ref="receiptDealSearchBarcodeDialog"
      @clickOk="onEditDialogClickOk" />
    <receipt-footer-logo-dialog
      ref="receiptFooterLogoDialog"
      @clickOk="onEditDialogClickOk" />
    <receipt-merchant-name-dialog
      ref="receiptMerchantNameDialog"
      @clickOk="onEditDialogClickOk" />
    <receipt-horizontal-setting-dialog
      ref="receiptHorizontalSettingDialog"
      @clickOk="onEditDialogClickOk" />
    <receipt-tax-office-printing-image-dialog
      ref="receiptTaxOfficePrintingImageDialog"
      @clickOk="onEditDialogClickOk" />
    <receipt-horizontal-print-message-dialog
      ref="receiptHorizontalPrintMessageDialog"
      @clickOk="onEditDialogClickOk" />
    <entrance-slip-optional-comment-dialog
      ref="entranceSlipOptionalCommentDialog"
      @clickOk="onEditDialogClickOk" />
    <entrance-slip-admission-ticket-qrcode-dialog
      ref="entranceSlipAdmissionTicketQrcodeDialog"
      @clickOk="onEditDialogClickOk" />
    <!-- KSD V001.000 AE -->
    <!-- その他ダイアログ等 -->
    <v-row>
      <v-col>
        <!-- G002.00.0 Update-Start -->
        <!--<maint-button
          @close="backToTop"
          @fixed="onReceiptUpdate"
          @planCheck="onReceiptConfirm"
          @planCopy="onReceiptCopy"
          :isplanCopyBtn="disabledPlanCopyBtn"
        />-->
        <maint-button
          @close="backToTop"
          @fixed="onReceiptUpdate"
          @clear="onReceiptClear"
          @del="onReceiptDestroy"
          @planCheck="onReceiptConfirm"
          @planCopy="onReceiptCopy"
          :isfixed-btn="disabledPlanClearBtn || !permissions.includes('CLOUDPOS_RECEIPT_UPDATE')"
          :isclear-btn="disabledPlanClearBtn"
          :isdel-btn="disabledPlanDelBtn || !permissions.includes('CLOUDPOS_RECEIPT_DELETE')"
          :isplan-copy-btn="disabledPlanCopyBtn || !permissions.includes('CLOUDPOS_RECEIPT_OTHER_1')"
          :isplan-check-btn="disabledPlanCheckBtn || !permissions.includes('CLOUDPOS_RECEIPT_OTHER_2')"
        />
        <!-- G002.00.0 Update-End -->
      </v-col>
    </v-row>
    <popup ref="pop" />

    <v-overlay :value="isProcessing">
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
