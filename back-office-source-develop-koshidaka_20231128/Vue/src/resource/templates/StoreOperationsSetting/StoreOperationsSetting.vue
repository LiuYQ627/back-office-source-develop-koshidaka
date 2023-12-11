<style src="@/resource/static/css/CommonDesign/utils.css" />
<style src="@/resource/static/css/StoreOperationsSetting/storeOperationsSetting.css" />
<script type="text/javascript" src="@/resource/static/js/StoreOperationsSetting/storeOperationsSetting.js" />

<!--
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230117 duyouwei(Neusoft)  G001.00.0  issue課題#1263を対応します.
 * 20230130 bai.ry(Neusoft)  G002.00.0  issue課題#1377を対応します.
 * 20230316 xu.jh(Neusoft)  G003.00.0  issue課題#1444を対応します.
 -->
<template>
  <!-- KSD V001.000 DS -->
  <!-- <v-container class="mt-15"> -->
  <!-- KSD V001.000 DE -->
  <!-- KSD V001.000 AS -->
  <v-container class="container-body mt-15">
  <!-- KSD V001.000 AE -->
    <!-- KSD V001.000 AS -->
    <div
      v-show="screenStep == 1"
      data-step="1"
      class="screenHeader">
      <!-- KSD V001.000 AE -->
    <!-- 変更基準日、店舗名 -->
    <!-- KSD V001.000 DS -->
    <!-- <config-select-common-condition -->
      <!-- :target-store-codes="targetStoreCodes" -->
      <!-- :type-of-setting="typeOfSettingWithCloning" -->
      <!-- v-model="changeDateText" -->
    <!-- /> -->
    <!-- KSD V001.000 DE -->
      <!-- KSD V001.000 AS -->
      <config-select-common-condition
        :has-cloud-pos-admin-check="hasCloudPosAdminCheck"
        :is-cloudpos-admin="isCloudposAdmin"
        :target-store-codes="targetStoreCodes"
        :type-of-setting="typeOfSettingWithCloning"
        v-model="changeDateText"
      />
      <!-- KSD V001.000 AE -->

    <!-- 自動精算時刻 -->
    <v-row
      no-gutters
      class="conditionRow w-100 d-flex align-center mt-5">
      <v-col
        cols="2"
        class="h-100">
        <label
          class="grayFrame h-100 w-100 d-flex justify-center align-center"
          for="businessDayStartTime"
        >
          {{ "自動精算時刻" }}
        </label>
      </v-col>

      <v-col
        cols="1"
        class="h-100 mr-1">
        <!-- KSD V001.000 DS -->
        <!-- <input -->
          <!-- v-if="typeOfSetting != 'past' || isCloning" -->
          <!-- id="businessDayStartTime" -->
          <!-- :class="this.timeErrorMsg !== null ? 'errorTextBox' : 'editTextBox'" -->
          <!-- type="text" -->
          <!-- v-model="businessDayStartTime" -->
          <!-- @input="numInputTimeRegulation" -->
          <!-- ref="businessDayStartTimeText" -->
          <!-- :placeholder="this.$i18n.t('F00001.S082')" -->
        <!-- > -->
        <!-- KSD V001.000 DE -->
        <!-- KSD V001.000 AS -->
        <input
          v-if="(typeOfSetting != 'past' || isCloning) && isCloudposAdmin"
          id="businessDayStartTime"
          :class="this.timeErrorMsg !== null ? 'errorTextBox' : 'editTextBox'"
          type="text"
          v-model="businessDayStartTime"
          @input="numInputTimeRegulation"
          ref="businessDayStartTimeText"
          :placeholder="this.$i18n.t('F00001.S082')"
        >
        <!-- KSD V001.000 AE -->
        <input
          v-else
          id="businessDayStartTime"
          class="whiteFrame h-100 w-100 pl-2"
          type="text"
          v-model="businessDayStartTime"
          @input="numInputTimeRegulation"
          :disabled="true"
          :placeholder="this.$i18n.t('F00001.S082')">
      </v-col>
    </v-row>
    <!-- 自動精算時刻(エラーメッセージ) -->
    <!-- KSD V001.000 DS -->
    <!-- <v-row v-if="(typeOfSetting != 'past' || isCloning) && this.timeErrorMsg !== null "></v-row> -->
    <!-- KSD V001.000 DE -->
    <!-- KSD V001.000 AS -->
    <v-row v-if="((typeOfSetting != 'past' || isCloning) && isCloudposAdmin) && this.timeErrorMsg !== null ">
    <!-- KSD V001.000 AE -->
      <v-col
        cols="1"
        class="h-100"/>
      <v-col
        cols="4"
        class="h-100 mr-1"
        style="color:#f00;text-align: right;">{{ timeErrorMsg }}</v-col>
    </v-row>

    <!-- 値引端数処理 -->
    <v-row
      no-gutters
      class="conditionRow w-100 d-flex align-center mt-5">
      <v-col
        cols="2"
        class="h-100">
        <label class="grayFrame d-flex justify-center align-center h-100 w-100">
          {{ "値引端数処理" }}
        </label>
      </v-col>

      <v-col
        cols="6"
        class="h-100">
        <radio-button
          v-model="config.discountFraction"
          :labels="fractionLabels"
          :disabled="radioButtonDisabled"
        />
      </v-col>
    </v-row>

    <!-- 税端数処理 -->
    <v-row
      no-gutters
      class="conditionRow w-100 d-flex align-center mt-5">
      <v-col
        cols="2"
        class="h-100">
        <label class="grayFrame d-flex justify-center align-center h-100 w-100">
          {{ "税端数処理" }}
        </label>
      </v-col>

      <v-col
        cols="6"
        class="h-100">
        <radio-button
          v-model="config.taxFraction"
          :labels="fractionLabels"
          :disabled="radioButtonDisabled"/>
      </v-col>
    </v-row>

    <!-- 小計値引／割引 -->
    <v-row
      no-gutters
      class="conditionRow w-100 d-flex align-center mt-5">
      <v-col
        cols="2"
        class="h-100">
        <label class="grayFrame d-flex justify-center align-center h-100 w-100">
          {{ "小計値引／割引" }}
        </label>
      </v-col>

      <v-col
        cols="4"
        class="h-100">
        <radio-button
          v-model="config.totalPriceDiscount"
          :labels="allowanceLabels"
          :disabled="radioButtonDisabled"
        />
      </v-col>
    </v-row>

    <!-- サインオンパスワード入力 -->
    <v-row
      no-gutters
      class="conditionRow w-100 d-flex align-center mt-5">
      <v-col
        cols="4"
        class="h-100">
        <label class="grayFrame d-flex justify-center align-center h-100 w-100">
          {{ "サインオンパスワード入力" }}
        </label>
      </v-col>

      <v-col
        cols="4"
        class="h-100">
        <radio-button
          v-model="config.passwordInput"
          :labels="requirementLabels"
          :disabled="radioButtonDisabled"
        />
      </v-col>
    </v-row>

    <!-- パスワードルール -->
    <v-row
      no-gutters
      class="conditionRow w-100 d-flex align-center mt-5">
      <v-col
        cols="3"
        class="h-100">
        <label
          class="grayFrame h-100 w-100 d-flex justify-center align-center"
          for="passwordRule"
        >
          {{ "パスワードルール" }}
        </label>
      </v-col>

      <v-col
        cols="5"
        class="h-100">
        <!-- KSD V001.000 DS -->
        <!-- <select -->
          <!-- v-if="typeOfSetting != 'past' || isCloning" -->
          <!-- id="passwordRule" -->
          <!-- class="h-100 w-100 whiteFrame pl-2" -->
          <!-- v-model="config.passwordRule" -->
        <!-- > -->
        <!-- KSD V001.000 DE -->
        <!-- KSD V001.000 AS -->
        <select
          v-if="(typeOfSetting != 'past' || isCloning) && isCloudposAdmin"
          id="passwordRule"
          class="h-100 w-100 whiteFrame pl-2"
          v-model="config.passwordRule"
        >
        <!-- KSD V001.000 AE -->
          <option
            v-for="label in passwordRuleLabels"
            :key="label.value"
            :value="label.value"
          >
            {{ label.name }}
          </option>
        </select>
        <select
          v-else
          id="passwordRule"
          class="h-100 w-100 whiteFrame pl-2"
          v-model="config.passwordRule"
          :disabled="true"
        >
          <option
            v-for="label in passwordRuleLabels"
            :key="label.value"
            :value="label.value"
          >
            {{ label.name }}
          </option>
        </select>
        <div class="pulldownArrow" />
      </v-col>
    </v-row>

    <!-- 自動サインアウト時間 -->
    <v-row
      no-gutters
      class="conditionRow w-100 d-flex align-center mt-5">
      <v-col
        cols="3"
        class="h-100">
        <label
          class="grayFrame h-100 w-100 d-flex justify-center align-center"
          for="logoutTime"
        >
          {{ "自動サインアウト時間" }}
        </label>
      </v-col>

      <v-col
        cols="1"
        class="h-100 mr-1">
        <!-- KSD V001.000 DS -->
        <!-- <input -->
          <!-- v-if="typeOfSetting != 'past' || isCloning" -->
          <!-- id="logoutTime" -->
          <!-- :class="this.logoutTimeErrorMsg !== null ? 'errorTextBox' : 'editTextBox w-100'" -->
          <!-- type="text" -->
          <!-- v-model="config.logoutTime" -->
          <!-- @input="numInputRegulation" -->
          <!-- ref="logoutTimeText" -->
          <!-- maxlength="2" -->
        <!-- > -->
        <!-- KSD V001.000 DE -->
        <!-- KSD V001.000 AS -->
        <input
          v-if="(typeOfSetting != 'past' || isCloning) && isCloudposAdmin"
          id="logoutTime"
          :class="this.logoutTimeErrorMsg !== null ? 'errorTextBox' : 'editTextBox w-100'"
          type="text"
          v-model="config.logoutTime"
          @input="numInputRegulation"
          ref="logoutTimeText"
          maxlength="2"
        >
        <!-- KSD V001.000 AE -->
        <input
          v-else
          id="logoutTime"
          class="whiteFrame h-100 w-100 pl-2"
          type="text"
          v-model="config.logoutTime"
          @input="numInputRegulation"
          maxlength="2"
          :disabled="true">
      </v-col>
      {{ "分" }}
    </v-row>
    <!-- 自動サインアウト時間(エラーメッセージ) -->
    <!-- KSD V001.000 DS -->
    <!-- <v-row v-if="(typeOfSetting != 'past' || isCloning) && this.logoutTimeErrorMsg !== null "></v-row> -->
    <!-- KSD V001.000 DE -->
    <!-- KSD V001.000 AS -->
    <v-row v-if="((typeOfSetting != 'past' || isCloning) && isCloudposAdmin) && this.logoutTimeErrorMsg !== null ">
    <!-- KSD V001.000 AE -->
      <v-col
        cols="2"
        class="h-100"/>
      <v-col
        cols="4"
        class="h-100 mr-1"
        style="color:#f00;text-align: right;">{{ logoutTimeErrorMsg }}</v-col>
    </v-row>

      <!-- KSD V001.000 AS -->
      <!-- サインオン時カメラ画像の無操作時間 -->
      <v-row
        no-gutters
        class="conditionRow w-100 d-flex align-center mt-5">
        <v-col
          cols="5"
          class="h-100">
          <label
            class="grayFrame h-100 w-100 d-flex justify-center align-center"
            for="signOnCameraNoOperationTime"
          >
            {{ $t("F322a6.S050") }}
          </label>
        </v-col>

        <v-col
          cols="1"
          class="h-100 mr-3">
          <input
            v-if="(typeOfSetting != 'past' || isCloning) && isCloudposAdmin"
            id="signOnCameraNoOperationTime"
            :class="this.signOnCameraNoOperationTimeErrorMsg !== null ? 'errorTextBox' : 'editTextBox w-100'"
            type="text"
            v-model="config.signOnCameraNoOperationTime"
            @input="signOnCameraNoOperationTimeRegulation"
            ref="signOnCameraNoOperationTimeText"
            maxlength="2"
          >
          <input
            v-else
            id="signOnCameraNoOperationTime"
            class="whiteFrame h-100 w-100 pl-2"
            type="text"
            v-model="config.signOnCameraNoOperationTime"
            @input="signOnCameraNoOperationTimeRegulation"
            maxlength="2"
            :disabled="true">
        </v-col>
        {{ $t("F322a6.S010") }}
      </v-row>
      <!-- 自動サインアウト時間(エラーメッセージ) -->
      <v-row v-if="((typeOfSetting != 'past' || isCloning) && isCloudposAdmin) && this.signOnCameraNoOperationTimeErrorMsg !== null ">
        <v-col
          cols="5"
          class="h-100"/>
        <v-col
          class="h-100 mr-1"
          style="color:#f00;text-align: left;">
          {{ signOnCameraNoOperationTimeErrorMsg }}
        </v-col>
      </v-row>
      <!-- KSD V001.000 AE -->

    <!-- 人数入力 -->
    <v-row
      no-gutters
      class="conditionRow w-100 d-flex align-center mt-5">
      <v-col
        cols="3"
        class="h-100">
        <label class="grayFrame d-flex justify-center align-center h-100 w-100">
          {{ "人数入力" }}
        </label>
      </v-col>

      <v-col
        cols="4"
        class="h-100">
        <radio-button
          v-model="config.numberOfPeople"
          :labels="requirementLabels"
          :disabled="radioButtonDisabled"
        />
      </v-col>
    </v-row>

    <!-- マニュアル数量変更 -->
    <v-row
      no-gutters
      class="conditionRow w-100 d-flex align-center mt-5">
      <v-col
        cols="3"
        class="h-100">
        <label class="grayFrame d-flex justify-center align-center h-100 w-100">
          {{ "マニュアル数量変更" }}
        </label>
      </v-col>

      <v-col
        cols="4"
        class="h-100">
        <radio-button
          v-model="config.manualQuantity"
          :labels="allowanceLabels"
          :disabled="radioButtonDisabled"
        />
      </v-col>
    </v-row>

    <!-- 売変時の値引計上 -->
    <v-row
      no-gutters
      class="conditionRow w-100 d-flex align-center mt-5">
      <v-col
        cols="3"
        class="h-100">
        <label class="grayFrame d-flex justify-center align-center h-100 w-100">
          {{ "売変時の値引計上" }}
        </label>
      </v-col>

      <v-col
        cols="4"
        class="h-100">
        <radio-button
          v-model="config.salesChangeDiscount"
          :labels="doLabels"
          :disabled="radioButtonDisabled"/>
      </v-col>
    </v-row>

    <!-- 0円売価登録 -->
    <v-row
      no-gutters
      class="conditionRow w-100 d-flex align-center mt-5">
      <v-col
        cols="3"
        class="h-100">
        <label class="grayFrame d-flex justify-center align-center h-100 w-100">
          {{ "0円売価登録" }}
        </label>
      </v-col>

      <v-col
        cols="4"
        class="h-100">
        <!-- G001.00.0 Update-Start -->
        <!-- <radio-button
          v-model="config['0sellingPrice']"
          :labels="allowanceLabels"
          :disabled="radioButtonDisabled"
        /> -->
        <radio-button
          v-model="config.zeroPriceRegistration"
          :labels="allowanceLabels"
          :disabled="radioButtonDisabled"
        />
        <!-- G001.00.0 Update -End -->
      </v-col>
    </v-row>

    <!-- 500円玉棒金枚数 -->
    <v-row
      no-gutters
      class="conditionRow w-100 d-flex align-center mt-5">
      <v-col
        cols="3"
        class="h-100">
        <label class="grayFrame d-flex justify-center align-center h-100 w-100">
          {{ "500円玉棒金枚数" }}
        </label>
      </v-col>

      <v-col
        cols="4"
        class="h-100">
        <!--  G001.00.0 Update-Start -->
        <!-- <radio-button v-model="config.climbingGold" :labels="coinbarLabels" :disabled="radioButtonDisabled"/> -->
        <radio-button
          v-model="config.climbingGold"
          :labels="coinbarLabels"
          :disabled="radioButtonDisabled"/>
          <!-- G001.00.0 Update -End -->
      </v-col>
    </v-row>
    <!-- G002.00.0 Add-Start -->
    <!-- 商品リスト取得制限 -->
    <v-row
      no-gutters
      class="conditionRow w-100 d-flex align-center mt-5">
      <v-col
        cols="3"
        class="h-100">
        <label
          class="grayFrame h-100 w-100 d-flex justify-center align-center"
          for="logoutTime"
        >
          {{ "商品リスト取得制限" }}
        </label>
      </v-col>

      <v-col
        cols="1"
        class="h-100 mr-1">
        <!-- KSD V001.000 DS -->
        <!-- <input -->
          <!-- v-if="typeOfSetting != 'past' || isCloning" -->
          <!-- id="itemListLimit" -->
          <!-- :class="this.limitErrorMsg !== null ? 'errorTextBox' : 'editTextBox w-100'" -->
          <!-- type="text" -->
          <!-- v-model="config.itemListLimit" -->
          <!-- @input="limitInputRegulation" -->
          <!-- ref="limitInputRegulationText" -->
          <!-- maxlength="5" -->
        <!-- > -->
        <!-- KSD V001.000 DE -->
        <!-- KSD V001.000 AS -->
        <input
          v-if="(typeOfSetting != 'past' || isCloning) && isCloudposAdmin"
          id="itemListLimit"
          :class="this.limitErrorMsg !== null ? 'errorTextBox' : 'editTextBox w-100'"
          type="text"
          v-model="config.itemListLimit"
          @input="limitInputRegulation"
          ref="limitInputRegulationText"
          maxlength="5"
        >
        <!-- KSD V001.000 AE -->
        <input
          v-else
          id="itemListLimit"
          class="whiteFrame h-100 w-100 pl-2"
          type="text"
          v-model="config.itemListLimit"
          @input="limitInputRegulation"
          ref="limitInputRegulationText"
          maxlength="5"
          :disabled="true">
      </v-col>
      {{ "件" }}
    </v-row>
    <!-- 商品リスト取得制限(エラーメッセージ) -->
    <!-- KSD V001.000 DS -->
    <!-- <v-row v-if="(typeOfSetting != 'past' || isCloning) && this.limitErrorMsg !== null "></v-row> -->
    <!-- KSD V001.000 DE -->
    <!-- KSD V001.000 AS -->
    <v-row v-if="((typeOfSetting != 'past' || isCloning) && isCloudposAdmin) && this.limitErrorMsg !== null ">
    <!-- KSD V001.000 AE -->
      <v-col
        cols="2"
        class="h-100"/>
      <v-col
        cols="4"
        class="h-100 mr-1"
        style="color:#f00;text-align: right;">{{ limitErrorMsg }}</v-col>
    </v-row>
    <!-- G002.00.0 Add-End -->

      <!-- KSD V001.000 AS -->
      <!-- 外部通信用POS端末ID入力 -->
      <v-row
        no-gutters
        class="conditionRow w-100 d-flex align-center mt-5">
        <v-col
          cols="3"
          class="h-100">
          <label
            class="grayFrame h-100 w-100 d-flex justify-center align-center"
            for="communicationPosTerminalID"
          >
            {{ $t("F322a6.S051") }}
          </label>
        </v-col>

        <v-col
          cols="1"
          class="h-100 mr-1">
          <input
            v-if="(typeOfSetting != 'past' || isCloning) && isCloudposAdmin"
            id="communicationPosTerminalID"
            :class="this.communicationPosTerminalIDErrorMsg !== null ? 'errorTextBox' : 'editTextBox w-100'"
            type="text"
            v-model="config.communicationPosTerminalID"
            @input="communicationPosTerminalIDRegulation"
            ref="communicationPosTerminalIDText"
            maxlength="4"
          >
          <input
            v-else
            id="communicationPosTerminalID"
            class="whiteFrame h-100 w-100 pl-2"
            type="text"
            v-model="config.communicationPosTerminalID"
            @input="communicationPosTerminalIDRegulation"
            maxlength="4"
            :disabled="true">
        </v-col>
      </v-row>
      <!-- 自動サインアウト時間(エラーメッセージ) -->
      <v-row v-if="((typeOfSetting != 'past' || isCloning) && isCloudposAdmin) && this.communicationPosTerminalIDErrorMsg !== null ">
        <v-col
          cols="3"
          class="h-100"/>
        <v-col
          class="h-100 mr-1"
          style="color:#f00;text-align: left;">
          {{ communicationPosTerminalIDErrorMsg }}
        </v-col>
      </v-row>

      <!-- 画面更新時間 -->
      <v-row
        no-gutters
        class="conditionRow w-100 d-flex align-center mt-5">
        <v-col
          cols="3"
          class="h-100">
          <label
            class="grayFrame h-100 w-100 d-flex justify-center align-center"
            for="updateDisplayInterval"
          >
            {{ $t("F322a6.S003") }}
          </label>
        </v-col>

        <v-col
          cols="1"
          class="h-100 mr-3">
          <input
            v-if="(typeOfSetting != 'past' || isCloning) && isCloudposAdmin"
            id="updateDisplayInterval"
            :class="this.displayIntervalErrorMsg !== null ? 'errorTextBox' : 'editTextBox'"
            type="text"
            v-model="config.updateDisplayInterval"
            @input="updateDisplayIntervalRegulation"
            ref="updateDisplayIntervalText"
            maxlength="3"
          >
          <input
            v-else
            id="updateDisplayInterval"
            class="whiteFrame h-100 w-100 pl-2"
            type="text"
            v-model="config.updateDisplayInterval"
            @input="updateDisplayIntervalRegulation"
            ref="updateDisplayIntervalText"
            maxlength="3"
            :disabled="true">
        </v-col>
        {{ $t("F322a6.S006") }}
      </v-row>
      <!-- 画面更新時間(エラーメッセージ) -->
      <v-row v-if="((typeOfSetting != 'past' || isCloning) && isCloudposAdmin) && this.displayIntervalErrorMsg !== null">
        <v-col
          cols="3"
          class="h-100"/>
        <v-col
          cols="6"
          class="h-100 mr-1"
          style="color:#f00;text-align: left;">
          {{ displayIntervalErrorMsg }}
        </v-col>
      </v-row>

      <!-- モバイルアプリ決済処理状態の監視間隔 -->
      <v-row
        no-gutters
        class="conditionRow w-100 d-flex align-center mt-5">
        <v-col
          cols="7"
          class="h-100">
          <label
            class="grayFrame h-100 w-100 d-flex justify-center align-center"
            for="mobileAplPayPollingInterval"
          >
            {{ $t("F322a6.S052") }}
          </label>
        </v-col>

        <v-col
          cols="1"
          class="h-100 mr-3">
          <input
            v-if="(typeOfSetting != 'past' || isCloning) && isCloudposAdmin"
            id="mobileAplPayPollingInterval"
            :class="this.mobileAplPayPollingIntervalErrorMsg !== null ? 'errorTextBox' : 'editTextBox w-100'"
            type="text"
            v-model="config.mobileAplPayPollingInterval"
            @input="mobileAplPayPollingIntervalRegulation"
            ref="mobileAplPayPollingIntervalText"
            maxlength="2"
          >
          <input
            v-else
            id="mobileAplPayPollingInterval"
            class="whiteFrame h-100 w-100 pl-2"
            type="text"
            v-model="config.mobileAplPayPollingInterval"
            @input="mobileAplPayPollingIntervalRegulation"
            maxlength="2"
            :disabled="true">
        </v-col>
        {{ $t("F322a6.S006") }}
      </v-row>
      <!-- 自動サインアウト時間(エラーメッセージ) -->
      <v-row v-if="((typeOfSetting != 'past' || isCloning) && isCloudposAdmin) && this.mobileAplPayPollingIntervalErrorMsg !== null ">
        <v-col
          cols="7"
          class="h-100"/>
        <v-col
          class="h-100 mr-1"
          style="color:#f00;text-align: left;">
          {{ mobileAplPayPollingIntervalErrorMsg }}
        </v-col>
      </v-row>

      <!-- モバイルアプリ決済のオーダー停止自動解除時間 -->
      <v-row
        no-gutters
        class="conditionRow w-100 d-flex align-center mt-5">
        <v-col
          cols="7"
          class="h-100">
          <label
            class="grayFrame h-100 w-100 d-flex justify-center align-center"
            for="mobileAplPayAutoOrderRelTm"
          >
            {{ $t("F322a6.S053") }}
          </label>
        </v-col>

        <v-col
          cols="1"
          class="h-100 mr-3">
          <input
            v-if="(typeOfSetting != 'past' || isCloning) && isCloudposAdmin"
            id="mobileAplPayAutoOrderRelTm"
            :class="this.mobileAplPayAutoOrderRelTmErrorMsg !== null ? 'errorTextBox' : 'editTextBox w-100'"
            type="text"
            v-model="config.mobileAplPayAutoOrderRelTm"
            @input="mobileAplPayAutoOrderRelTmRegulation"
            ref="mobileAplPayAutoOrderRelTmText"
            maxlength="2"
          >
          <input
            v-else
            id="mobileAplPayAutoOrderRelTm"
            class="whiteFrame h-100 w-100 pl-2"
            type="text"
            v-model="config.mobileAplPayAutoOrderRelTm"
            @input="mobileAplPayAutoOrderRelTmRegulation"
            maxlength="2"
            :disabled="true">
        </v-col>
        {{ $t("F322a6.S010") }}
      </v-row>
      <!-- 自動サインアウト時間(エラーメッセージ) -->
      <v-row v-if="((typeOfSetting != 'past' || isCloning) && isCloudposAdmin) && this.mobileAplPayAutoOrderRelTmErrorMsg !== null ">
        <v-col
          cols="7"
          class="h-100"/>
        <v-col
          class="h-100 mr-1"
          style="color:#f00;text-align: left;">
          {{ mobileAplPayAutoOrderRelTmErrorMsg }}
        </v-col>
      </v-row>

      <!-- 予約通知時間エリア -->
      <v-row
        no-gutters
        class="conditionRow w-100 d-flex align-center mt-5">
        <v-col
          cols="3"
          class="h-100">
          <label
            class="grayFrame h-100 w-100 d-flex justify-center align-center"
            for="reservationNotifyTime"
          >
            {{ $t("F322a6.S004") }}
          </label>
        </v-col>

        <v-col
          cols="1"
          class="h-100 mr-3">
          <input
            v-if="(typeOfSetting != 'past' || isCloning) && isCloudposAdmin"
            id="reservationNotifyTime"
            :class="this.reservationNotifyErrorMsg !== null ? 'errorTextBox' : 'editTextBox'"
            type="text"
            v-model="config.reservationNotifyTime"
            @input="reservationNotifyTimeRegulation"
            ref="reservationNotifyTimeText"
            maxlength="3"
          >
          <input
            v-else
            id="reservationNotifyTime"
            class="whiteFrame h-100 w-100 pl-2"
            type="text"
            v-model="config.reservationNotifyTime"
            @input="reservationNotifyTimeRegulation"
            ref="reservationNotifyTimeText"
            maxlength="3"
            :disabled="true">
        </v-col>
        {{ $t("F322a6.S007") }}
      </v-row>
      <!-- 予約通知時間(エラーメッセージ) -->
      <v-row v-if="((typeOfSetting != 'past' || isCloning) && isCloudposAdmin) && this.reservationNotifyErrorMsg !== null">
        <v-col
          cols="3"
          class="h-100"/>
        <v-col
          cols="6"
          class="h-100 mr-1"
          style="color:#f00;text-align: left;">
          {{ reservationNotifyErrorMsg }}
        </v-col>
      </v-row>

      <!-- 店舗の稼働時間エリア -->
      <v-row
        no-gutters
        class="conditionRow w-100 d-flex align-center mt-5">
        <v-col
          cols="3"
          class="h-100">
          <label
            class="grayFrame h-100 w-100 d-flex justify-center align-center"
            for="operatingTime"
          >
            {{ $t("F322a6.S115") }}
          </label>
        </v-col>

        <v-col
          cols="1"
          class="h-100 mr-3">
          <input
            v-if="(typeOfSetting != 'past' || isCloning) && isCloudposAdmin"
            id="operatingTime"
            :class="this.operatingTimeErrorMsg !== null ? 'errorTextBox' : 'editTextBox'"
            type="text"
            v-model="config.operatingTime"
            @input="operatingTimeRegulation"
            ref="operatingTimeText"
            maxlength="4"
          >
          <input
            v-else
            id="operatingTime"
            class="whiteFrame h-100 w-100 pl-2"
            type="text"
            v-model="config.operatingTime"
            @input="operatingTimeRegulation"
            ref="operatingTimeText"
            maxlength="4"
            :disabled="true">
        </v-col>
        {{ $t("F322a6.S010") }}
      </v-row>
      <!-- 店舗の稼働時間(エラーメッセージ) -->
      <v-row v-if="((typeOfSetting != 'past' || isCloning) && isCloudposAdmin) && this.operatingTimeErrorMsg !== null">
        <v-col
          cols="3"
          class="h-100"/>
        <v-col
          cols="6"
          class="h-100 mr-1"
          style="color:#f00;text-align: left;">
          {{ operatingTimeErrorMsg }}
        </v-col>
      </v-row>

      <!-- リモートコンシェルジュ連携選択エリア -->
      <v-row
        no-gutters
        class="conditionRow w-100 d-flex align-center mt-5">
        <v-col
          cols="4"
          class="h-100">
          <label class="grayFrame d-flex justify-center align-center h-100 w-100">
            {{ $t("F322a6.S110") }}
          </label>
        </v-col>

        <v-col
          cols="4"
          class="h-100">
          <radio-button
            v-model="config.remoteConciergeSettings"
            :labels="onOffLabels"
            :disabled="radioButtonDisabled"/>
        </v-col>
      </v-row>
      <!-- リモートコンシェルジュURL入力エリア -->
      <v-row
        no-gutters
        class="conditionRow w-100 d-flex align-center mt-5">
        <v-col
          cols="4"
          class="h-100">
          <label
            class="grayFrame h-100 w-100 d-flex justify-center align-center"
            for="remoteConciergeUrl"
          >
            {{ $t("F322a6.S113") }}
          </label>
        </v-col>

        <v-col
          cols="4"
          class="h-100 mr-3">
          <input
            class="max-width w-100"
            v-if="(typeOfSetting != 'past' || isCloning) && isCloudposAdmin"
            id="remoteConciergeUrl"
            :class="this.remoteConciergeUrlErrorMsg !== null ? 'errorTextBox' : 'editTextBox'"
            type="text"
            v-model="config.remoteConciergeUrl"
            @input="remoteConciergeUrlRegulation"
            ref="remoteConciergeUrlText"
            maxlength="255"
            :placeholder="this.$i18n.t('F322a6.S114')"
          >
          <input
            v-else
            id="remoteConciergeUrl"
            class="whiteFrame h-100 w-100 pl-2 max-width"
            type="text"
            v-model="config.remoteConciergeUrl"
            @input="remoteConciergeUrlRegulation"
            ref="remoteConciergeUrlText"
            maxlength="255"
            :disabled="true"
            :placeholder="this.$i18n.t('F322a6.S114')">
        </v-col>
      </v-row>
      <!-- リモートコンシェルジュURL入力エリア(エラーメッセージ) -->
      <v-row v-if="((typeOfSetting != 'past' || isCloning) && isCloudposAdmin) && this.remoteConciergeUrlErrorMsg !== null">
        <v-col
          cols="4"
          class="h-100"/>
        <v-col
          cols="6"
          class="h-100 mr-1"
          style="color:#f00;text-align: left;">
          {{ remoteConciergeUrlErrorMsg }}
        </v-col>
      </v-row>
      <!-- KSD V001.000 AE -->

    <!-- パスワードルールの説明 -->
    <div
      class="mt-10 pa-2"
      style="background-color: white">
      <b>{{ "パスワードルールの説明" }}</b>
      <div
        class="whiteFrame"
        style="font-size: 18px">
        <v-row no-gutters>
          <v-col
            cols="4"
            class="d-flex justify-center align-center whiteFrame">
            0（英字+数字）
          </v-col>
          <v-col class="text-left whiteFrame px-4">
            英字 （ 大文字または小文字 ）、数字を含む
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col
            cols="4"
            class="d-flex justify-center align-center whiteFrame">1（英字大+英字小+数字（推奨））</v-col>
          <v-col class="text-left whiteFrame px-4">
            英大文字、英小文字、数字を含む
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col
            cols="4"
            class="d-flex justify-center align-center whiteFrame">2（英字、数字の組み合わせ自由）</v-col>
          <v-col class="text-left whiteFrame px-4">
            英大文字、英小文字、数字を1種以上含む
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col
            cols="4"
            class="d-flex justify-center align-center whiteFrame">3（英字大+英字小+数字+記号）</v-col>
          <v-col class="text-left whiteFrame px-4">
            英大文字、英小文字、数字、記号を含む
          </v-col>
        </v-row>
      </div>
    </div>
    <!-- KSD V001.000 AS -->
    </div>
    <!-- KSD V001.000 AE -->

    <!-- KSD V001.000 AS -->
    <div
      v-show="screenStep == 2"
      data-step="2"
      class="screenHeader">
      <!-- 年初日、月初日 -->
      <v-row
        no-gutters
        class="conditionRow w-100 d-flex align-center mt-5">
        <v-col
          cols="3"
          class="h-100">
          <label
            class="grayFrame h-100 w-100 d-flex justify-center align-center"
            for="firstDay"
          >
            {{ $t("F322a6.S011") }}
          </label>
        </v-col>

        <v-col
          cols="1"
          class="h-100 mr-1">
          <input
            v-if="(typeOfSetting != 'past' || isCloning) && isCloudposAdmin"
            id="firstDay"
            :class="this.firstDayErrorMsg !== null ? 'errorTextBox' : 'editTextBox'"
            type="text"
            v-model="config.firstDay"
            ref="firstDayText"
            :placeholder="this.$i18n.t('F322a6.S107')"
            maxlength="5"
          >
          <input
            v-else
            id="firstDay"
            class="whiteFrame h-100 w-100 pl-2"
            type="text"
            v-model="config.firstDay"
            :disabled="true"
            :placeholder="this.$i18n.t('F322a6.S107')"
            maxlength="5"
          >
        </v-col>
      </v-row>
      <!-- 年初日、月初日(エラーメッセージ) -->
      <v-row v-if="((typeOfSetting != 'past' || isCloning) && isCloudposAdmin) && this.firstDayErrorMsg !== null">
        <v-col
          cols="3"
          class="h-100"/>
        <v-col
          cols="6"
          class="h-100 mr-1"
          style="color:#f00;text-align: left;">
          {{ firstDayErrorMsg }}
        </v-col>
      </v-row>

      <!-- 月度前倒しフラグ -->
      <v-row
        no-gutters
        class="conditionRow w-100 d-flex align-center mt-5">
        <v-col
          cols="3"
          class="h-100">
          <label class="grayFrame d-flex justify-center align-center h-100 w-100">
            {{ $t("F322a6.S013") }}
          </label>
        </v-col>

        <v-col
          cols="4"
          class="h-100">
          <radio-button
            v-model="config.monthlyAdvanceFlag"
            :labels="doLabelsNew"
            :disabled="radioButtonDisabled"/>
        </v-col>
      </v-row>

      <!-- 税抜き／税込み設定 -->
      <v-row
        no-gutters
        class="conditionRow w-100 d-flex align-center mt-5">
        <v-col
          cols="3"
          class="h-100">
          <label class="grayFrame d-flex justify-center align-center h-100 w-100">
            {{ $t("F322a6.S014") }}
          </label>
        </v-col>

        <v-col
          cols="4"
          class="h-100">
          <radio-button
            v-model="config.includeTax"
            :labels="taxLabels"
            :disabled="radioButtonDisabled"/>
        </v-col>
      </v-row>

      <!-- 返品取引客数集計 -->
      <v-row
        no-gutters
        class="conditionRow w-100 d-flex align-center mt-5">
        <v-col
          cols="3"
          class="h-100">
          <label class="grayFrame d-flex justify-center align-center h-100 w-100">
            {{ $t("F322a6.S015") }}
          </label>
        </v-col>

        <v-col
          cols="6"
          class="h-100">
          <radio-button
            v-model="config.includeReturnCustomer"
            :labels="updateLabels"
            :disabled="radioButtonDisabled"
          />
        </v-col>
      </v-row>

      <!-- 取引別レポート0スキップ -->
      <v-row
        no-gutters
        class="conditionRow w-100 d-flex align-center mt-5">
        <v-col
          cols="5"
          class="h-100">
          <label class="grayFrame d-flex justify-center align-center h-100 w-100">
            {{ $t("F322a6.S016") }}
          </label>
        </v-col>

        <v-col
          cols="4"
          class="h-100">
          <radio-button
            v-model="config.includeZeroData"
            :labels="includeLabels"
            :disabled="radioButtonDisabled"/>
        </v-col>
      </v-row>
    </div>

    <div
      v-show="screenStep == 3"
      data-step="3"
      class="screenHeader">
      <!-- 交通系IC -->
      <v-row
        no-gutters
        class="conditionRow w-100 d-flex align-center mt-5">
        <v-col
          cols="3"
          class="h-100">
          <label class="grayFrame d-flex justify-center align-center h-100 w-100">
            {{ $t("F322a6.S041") }}
          </label>
        </v-col>

        <v-col
          cols="4"
          class="h-100">
          <radio-button
            v-model="config.transportation"
            :labels="haveLabels"
            :disabled="radioButtonDisabled"/>
        </v-col>
      </v-row>

      <!-- 楽天Edy -->
      <v-row
        no-gutters
        class="conditionRow w-100 d-flex align-center mt-5">
        <v-col
          cols="3"
          class="h-100">
          <label class="grayFrame d-flex justify-center align-center h-100 w-100">
            {{ $t("F322a6.S042") }}
          </label>
        </v-col>

        <v-col
          cols="4"
          class="h-100">
          <radio-button
            v-model="config.edy"
            :labels="haveLabels"
            :disabled="radioButtonDisabled"/>
        </v-col>
      </v-row>

      <!-- QUICPay -->
      <v-row
        no-gutters
        class="conditionRow w-100 d-flex align-center mt-5">
        <v-col
          cols="3"
          class="h-100">
          <label class="grayFrame d-flex justify-center align-center h-100 w-100">
            {{ $t("F322a6.S043") }}
          </label>
        </v-col>

        <v-col
          cols="4"
          class="h-100">
          <radio-button
            v-model="config.quicPay"
            :labels="haveLabels"
            :disabled="radioButtonDisabled"/>
        </v-col>
      </v-row>

      <!-- WAON -->
      <v-row
        no-gutters
        class="conditionRow w-100 d-flex align-center mt-5">
        <v-col
          cols="3"
          class="h-100">
          <label class="grayFrame d-flex justify-center align-center h-100 w-100">
            {{ $t("F322a6.S045") }}
          </label>
        </v-col>

        <v-col
          cols="4"
          class="h-100">
          <radio-button
            v-model="config.waon"
            :labels="haveLabels"
            :disabled="radioButtonDisabled"/>
        </v-col>
      </v-row>

      <!-- nanaco -->
      <v-row
        no-gutters
        class="conditionRow w-100 d-flex align-center mt-5">
        <v-col
          cols="3"
          class="h-100">
          <label class="grayFrame d-flex justify-center align-center h-100 w-100">
            {{ $t("F322a6.S046") }}
          </label>
        </v-col>

        <v-col
          cols="4"
          class="h-100">
          <radio-button
            v-model="config.nanaco"
            :labels="haveLabels"
            :disabled="radioButtonDisabled"/>
        </v-col>
      </v-row>
    </div>

    <div
      v-show="screenStep == 4"
      data-step="4"
      class="screenHeader">
      <!-- 入金確定モード 手入力 -->
      <v-row
        no-gutters
        class="conditionRow w-100 d-flex align-center mt-5">
        <v-col
          cols="4"
          class="h-100">
          <label class="grayFrame d-flex justify-center align-center h-100 w-100">
            {{ $t("F322a6.S061") }}
          </label>
        </v-col>

        <v-col
          cols="4"
          class="h-100">
          <radio-button
            v-model="config.depositManualInput"
            :labels="allowanceLabelsNew"
            :disabled="radioButtonDisabled"
          />
        </v-col>
      </v-row>

      <!-- 精算連動 -->
      <v-row
        no-gutters
        class="conditionRow w-100 d-flex align-center mt-5">
        <v-col
          cols="3"
          class="h-100">
          <label
            class="grayFrame h-100 w-100 d-flex justify-center align-center"
            for="settlementType"
          >
            {{ $t("F322a6.S062") }}
          </label>
        </v-col>

        <v-col
          cols="5"
          class="h-100">
          <select
            v-if="(typeOfSetting != 'past' || isCloning) && isCloudposAdmin"
            id="settlementType"
            class="h-100 w-100 whiteFrame pl-2"
            v-model="config.settlementType"
          >
            <option
              v-for="label in settlementLabels"
              :key="label.value"
              :value="label.value"
            >
              {{ label.name }}
            </option>
          </select>
          <select
            v-else
            id="settlementType"
            class="h-100 w-100 whiteFrame pl-2"
            v-model="config.settlementType"
            :disabled="true"
          >
            <option
              v-for="label in settlementLabels"
              :key="label.value"
              :value="label.value"
            >
              {{ label.name }}
            </option>
          </select>
          <div class="pulldownArrow" />
        </v-col>
      </v-row>

      <!-- 残置金額入力 -->
      <v-row
        no-gutters
        class="conditionRow w-100 d-flex align-center mt-5">
        <v-col
          cols="3"
          class="h-100">
          <label class="grayFrame d-flex justify-center align-center h-100 w-100">
            {{ $t("F322a6.S063") }}
          </label>
        </v-col>

        <v-col
          cols="4"
          class="h-100">
          <radio-button
            v-model="config.remainInputAmount"
            :labels="allowanceLabelsNew"
            :disabled="radioButtonDisabled"
          />
        </v-col>
      </v-row>

      <!-- 硬貨オーバーフロー分計数 -->
      <v-row
        no-gutters
        class="conditionRow w-100 d-flex align-center mt-5">
        <v-col
          cols="4"
          class="h-100">
          <label class="grayFrame d-flex justify-center align-center h-100 w-100">
            {{ $t("F322a6.S064") }}
          </label>
        </v-col>

        <v-col
          cols="4"
          class="h-100">
          <radio-button
            v-model="config.coinOverflowCounting"
            :labels="doLabelsNew"
            :disabled="radioButtonDisabled"/>
        </v-col>
      </v-row>

      <!-- オーバーフロー分を残置回収分対象 -->
      <v-row
        no-gutters
        class="conditionRow w-100 d-flex align-center mt-5">
        <v-col
          cols="5"
          class="h-100">
          <label class="grayFrame d-flex justify-center align-center h-100 w-100">
            {{ $t("F322a6.S065") }}
          </label>
        </v-col>

        <v-col
          cols="4"
          class="h-100">
          <radio-button
            v-model="config.overflowCollectionTarget"
            :labels="doLabelsNew"
            :disabled="radioButtonDisabled"/>
        </v-col>
      </v-row>

      <!-- 硬貨オーバーフロー分在高連動 -->
      <v-row
        no-gutters
        class="conditionRow w-100 d-flex align-center mt-5">
        <v-col
          cols="5"
          class="h-100">
          <label class="grayFrame d-flex justify-center align-center h-100 w-100">
            {{ $t("F322a6.S066") }}
          </label>
        </v-col>

        <v-col
          cols="4"
          class="h-100">
          <radio-button
            v-model="config.coinOverflowInterlocking"
            :labels="haveLabels"
            :disabled="radioButtonDisabled"/>
        </v-col>
      </v-row>

      <div v-if="config.copyReceipt != null && config.copyReceipt != undefined">
        <!-- 控えレシート自動発行枚数 -->
        <v-row
          no-gutters
          class="conditionRow w-100 d-flex align-center mt-5">
          <v-col
            cols="4"
            class="h-100">
            <label
              class="grayFrame h-100 w-100 d-flex justify-center align-center"
              for="numOfAutoIssue"
            >
              {{ $t("F322a6.S067") }}
            </label>
          </v-col>

          <v-col
            cols="1"
            class="h-100 mr-3">
            <input
              v-if="(typeOfSetting != 'past' || isCloning) && isCloudposAdmin"
              id="numOfAutoIssue"
              :class="this.numOfAutoIssueErrorMsg !== null ? 'errorTextBox' : 'editTextBox'"
              type="text"
              v-model="config.copyReceipt.numOfAutoIssue"
              @input="numOfAutoIssueRegulation"
              ref="numOfAutoIssueText"
              maxlength="1"
            >
            <input
              v-else
              id="numOfAutoIssue"
              class="whiteFrame h-100 w-100 pl-2"
              type="text"
              v-model="config.copyReceipt.numOfAutoIssue"
              @input="numOfAutoIssueRegulation"
              maxlength="1"
              :disabled="true">
          </v-col>
          {{ $t("F322a6.S072") }}
        </v-row>
        <!-- 控えレシート自動発行枚数(エラーメッセージ) -->
        <v-row v-if="((typeOfSetting != 'past' || isCloning) && isCloudposAdmin) && this.numOfAutoIssueErrorMsg !== null">
          <v-col
            cols="4"
            class="h-100"/>
          <v-col
            class="h-100 mr-1"
            style="color:#f00;text-align: left;">
            {{ numOfAutoIssueErrorMsg }}
          </v-col>
        </v-row>

        <!-- 控え番号入力 -->
        <v-row
          no-gutters
          class="conditionRow w-100 d-flex align-center mt-5">
          <v-col
            cols="3"
            class="h-100">
            <label class="grayFrame d-flex justify-center align-center h-100 w-100">
              {{ $t("F322a6.S068") }}
            </label>
          </v-col>

          <v-col
            cols="4"
            class="h-100">
            <radio-button
              v-model="config.copyReceipt.inputCopyNum"
              :labels="automateLabels"
              :disabled="radioButtonDisabled"/>
          </v-col>
        </v-row>
      </div>

      <!-- 未会計オーダー、保留警告 -->
      <v-row
        no-gutters
        class="conditionRow w-100 d-flex align-center mt-5">
        <v-col
          cols="4"
          class="h-100">
          <label class="grayFrame d-flex justify-center align-center h-100 w-100">
            {{ $t("F322a6.S069") }}
          </label>
        </v-col>

        <v-col
          cols="4"
          class="h-100">
          <radio-button
            v-model="config.unPaidOrderorSuspendWarn"
            :labels="haveLabels"
            :disabled="radioButtonDisabled"/>
        </v-col>
      </v-row>

      <!-- 未会計オーダー、保留取消 -->
      <v-row
        no-gutters
        class="conditionRow w-100 d-flex align-center mt-5">
        <v-col
          cols="4"
          class="h-100">
          <label class="grayFrame d-flex justify-center align-center h-100 w-100">
            {{ $t("F322a6.S070") }}
          </label>
        </v-col>

        <v-col
          cols="4"
          class="h-100">
          <radio-button
            v-model="config.unPaidOrderorSuspendCancel"
            :labels="haveLabels"
            :disabled="radioButtonDisabled"/>
        </v-col>
      </v-row>

      <!-- 納金額のメモリ処理 -->
      <v-row
        no-gutters
        class="conditionRow w-100 d-flex align-center mt-5">
        <v-col
          cols="3"
          class="h-100">
          <label class="grayFrame d-flex justify-center align-center h-100 w-100">
            {{ $t("F322a6.S071") }}
          </label>
        </v-col>

        <v-col
          cols="4"
          class="h-100">
          <radio-button
            v-model="config.paymentAmountMemoryProc"
            :labels="overwriteLabels"
            :disabled="radioButtonDisabled"/>
        </v-col>
      </v-row>

      <!-- 納金額のメモリ処理の説明 -->
      <div
        class="mt-10 pa-2"
        style="background-color: white">
        <b>{{ $t("F322a6.S101") }}</b>
        <div
          class="whiteFrame"
          style="font-size: 18px">
          <v-row no-gutters>
            <v-col
              cols="4"
              class="d-flex justify-center align-center whiteFrame">
              {{ $t("F322a6.S097") }}
            </v-col>
            <v-col class="text-left whiteFrame px-4">
              {{ $t("F322a6.S102") }}
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col
              cols="4"
              class="d-flex justify-center align-center whiteFrame">
              {{ $t("F322a6.S096") }}
            </v-col>
            <v-col class="text-left whiteFrame px-4">
              {{ $t("F322a6.S103") }}
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col
              cols="4"
              class="d-flex justify-center align-center whiteFrame"/>
            <v-col class="text-left whiteFrame px-4">
              {{ $t("F322a6.S104") }}
            </v-col>
          </v-row>
        </div>
      </div>
    </div>
    <!-- KSD V001.000 AE -->

    <!-- その他ダイアログ等 -->
    <v-row>
      <v-col>
        <!-- G003.00.0 Update start -->
        <!-- <maint-button
          @close="backToConfigSelect"
          @fixed="fixed"
          @clone="clone"
          @stop="stop"
          @del="del"
          :isfixedBtn="disabledFixedBtn"
          :isCloneBtn="disabledCloneBtn"
          :isdelBtn="disabledDeleteBtn"/> -->
        <!-- KSD V001.000 MS -->
        <!-- <maint-button
        @close="close"
        @fixed="fixed"
        @clone="clone"
        @stop="stop"
        @del="del"
        :isfixedBtn="disabledFixedBtn || !permissions.includes('CLOUDPOS_STORE_OPERATION_UPDATE')"
        :isCloneBtn="disabledCloneBtn"
        :isdelBtn="disabledDeleteBtn || !permissions.includes('CLOUDPOS_STORE_OPERATION_DELETE')"/> -->
        <maint-button
          @close="close"
          @fixed="fixed"
          @clone="clone"
          @stop="stop"
          @del="del"
          @prev="prev"
          @next="next"
          :isfixed-btn="disabledFixedBtn || !isCloudposAdmin || !permissions.includes('CLOUDPOS_STORE_OPERATION_UPDATE')"
          :is-clone-btn="disabledCloneBtn || !isCloudposAdmin"
          :is-stop-btn="!isCloudposAdmin"
          :isdel-btn="disabledDeleteBtn || !isCloudposAdmin || !permissions.includes('CLOUDPOS_STORE_OPERATION_DELETE')"
          :is-prev-btn="disabledPrevBtn"
          :is-next-btn="disabledNextBtn"/>
          <!-- KSD V001.000 ME -->
          <!-- G003.00.0 Update end -->
      </v-col>
    </v-row>
    <popup ref="pop" />
  </v-container>
</template>
