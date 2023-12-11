<style src="@/resource/static/css/CommonDesign/utils.css" />
<style src="@/resource/static/css/OperationsSetting/operationsSetting.css" />
<script type="text/javascript" src="@/resource/static/js/OperationsSetting/operationsSetting.js" />
<!--
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230209 xu.jh(Neusoft)  G001.00.0  issue課題#1484を対応します.
 * 20230316 xu.jh(Neusoft)  G002.00.0  issue課題#1444を対応します.
 -->
<template>
  <v-container class="mt-15">

    <!-- 変更基準日 -->
    <config-common-condition
      :type-of-setting="typeOfSettingWithCloning"
      v-model="changeDateText"
    />

    <!-- KSD V001.000 DS -->
    <!-- 自動ログアウト時間 -->
    <!-- <v-row -->
    <!--  no-gutters -->
    <!--  class="conditionRow w-100 d-flex align-center mt-5"> -->
    <!--  <v-col -->
    <!--    cols="3" -->
    <!--    class="h-100"> -->
    <!--    <label -->
    <!--      class="grayFrame h-100 w-100 d-flex justify-center align-center" -->
    <!--      for="logoutTime"> -->
    <!--      {{ "自動ログアウト時間" }} -->
    <!--    </label> -->
    <!--  </v-col> -->

    <!--  <v-col -->
    <!--    cols="1" -->
    <!--    class="h-100 mr-1"> -->
    <!--    <input -->
    <!--      v-if="typeOfSetting != 'past' || isCloning" -->
    <!--      id="logoutTime" -->
    <!--      :class="this.timeErrorMsg !== null ? 'errorTextBox' : 'editTextBox'" -->
    <!--      v-model="config.logoutTime" -->
    <!--      type="text" -->
    <!--      @input="numInputRegulation" -->
    <!--      ref="logoutTimeText" -->
    <!--      maxlength="2" > -->
    <!--    <input -->
    <!--      v-else -->
    <!--      id="logoutTime" -->
    <!--      class="whiteFrame h-100 w-100 pl-2" -->
    <!--      v-model="config.logoutTime" -->
    <!--      type="text" -->
    <!--      @input="numInputRegulation" -->
    <!--      ref="logoutTimeText" -->
    <!--      maxlength="2" -->
    <!--      :disabled="true" > -->
    <!--    </v-col> -->
    <!--    {{ "分" }} -->
    <!-- </v-row> -->
    <!-- G001.00.0 Add-Start -->
    <!-- 自動ログアウト時間(エラーメッセージ) -->
    <!-- <v-row v-if="(typeOfSetting != 'past' || isCloning) && this.timeErrorMsg !== null "> -->
    <!--  <v-col -->
    <!--    cols="2" -->
    <!--    class="h-100"/> -->
    <!--  <v-col -->
    <!--    cols="4" -->
    <!--    class="h-100 mr-1" -->
    <!--    style="color:#f00;text-align: right;">{{ timeErrorMsg }}</v-col> -->
    <!-- </v-row> -->
    <!-- KSD V001.000 DE -->
    <!-- G001.00.0 Add-End -->
    <!-- パスワード桁数 -->
    <v-row
      no-gutters
      class="conditionRow w-100 d-flex align-center mt-5">
      <v-col
        cols="3"
        class="h-100">
        <label
          class="grayFrame h-100 w-100 d-flex justify-center align-center"
          for="logoutTime">
          {{ "パスワード桁数" }}
        </label>
      </v-col>

      <v-col
        cols="1"
        class="h-100 mr-1">
        <input
          v-if="typeOfSetting != 'past' || isCloning"
          id="passwordMin"
          :class="this.passwordErrorMsgMin !== null ? 'errorTextBox' : 'editTextBox'"
          type="text"
          v-model="config.passwordMin"
          @blur="numInputPassRegulation"
          ref="passwordMinText"
          maxlength="2" >
        <input
          v-else
          id="passwordMin"
          class="whiteFrame h-100 w-100 pl-2"
          type="text"
          v-model="config.passwordMin"
          @blur="numInputPassRegulation"
          ref="passwordMinText"
          maxlength="2"
          :disabled="true" >
      </v-col>
      {{ "～" }}

      <v-col
        cols="1"
        class="h-100 mr-1">
        <input
          v-if="typeOfSetting != 'past' || isCloning"
          id="passwordMax"
          :class="this.passwordErrorMsgMax !== null || this.compareHighErrorMsg !== null ? 'errorTextBox' : 'editTextBox'"
          type="text"
          v-model="config.passwordMax"
          @blur="numInputPassRegulation"
          ref="passwordMaxText"
          maxlength="2" >
        <input
          v-else
          id="passwordMax"
          class="whiteFrame h-100 w-100 pl-2"
          type="text"
          v-model="config.passwordMax"
          @blur="numInputPassRegulation"
          ref="passwordMaxText"
          maxlength="2"
          :disabled="true" >
      </v-col>
      {{ "桁" }}
    </v-row>
    <!-- G001.00.0 Add-Start -->
    <!-- パスワード桁数(エラーメッセージ) -->
    <v-row v-if="(typeOfSetting != 'past' || isCloning) && this.passwordErrorMsgMin !== null ">
      <v-col
        cols="2"
        class="h-100"/>
      <v-col
        cols="4"
        class="h-100 mr-1"
        style="color:#f00;text-align: right;">{{ passwordErrorMsgMin }}</v-col>
    </v-row>
    <v-row v-if="(typeOfSetting != 'past' || isCloning) && this.passwordErrorMsgMin === null && this.passwordErrorMsgMax !== null">
      <v-col
        cols="2"
        class="h-100"/>
      <v-col
        cols="4"
        class="h-100 mr-1"
        style="color:#f00;text-align: right;">{{ passwordErrorMsgMax }}</v-col>
    </v-row>
    <v-row v-if="(typeOfSetting != 'past' || isCloning) && this.compareHighErrorMsg !== null">
      <v-col
        cols="3"
        class="h-100"/>
      <v-col
        cols="6"
        class="h-100 mr-1"
        style="color:#f00;text-align: left;">{{ compareHighErrorMsg }}</v-col>
    </v-row>
    <!-- G001.00.0 Add-End -->
    <!-- パスワードルール -->
    <v-row
      no-gutters
      class="conditionRow w-100 d-flex align-center mt-5">
      <v-col
        cols="3"
        class="h-100">
        <label
          class="grayFrame h-100 w-100 d-flex justify-center align-center"
          for="passwordRule">
          {{ "パスワードルール" }}
        </label>
      </v-col>

      <v-col
        cols="5"
        class="h-100">
        <select
          v-if="typeOfSetting != 'past' || isCloning"
          id="passwordRule"
          class="h-100 w-100 whiteFrame pl-2"
          v-model="config.passwordRule">
          <option
            v-for="label in passwordRuleLabels"
            :key="label.value"
            :value="label.value">
            {{ label.name }}
          </option>
        </select>
        <select
          v-else
          id="passwordRule"
          class="h-100 w-100 whiteFrame pl-2"
          v-model="config.passwordRule"
          :disabled="true">
          <option
            v-for="label in passwordRuleLabels"
            :key="label.value"
            :value="label.value">
            {{ label.name }}
          </option>
        </select>
        <div class="pulldownArrow" />
      </v-col>
    </v-row>
    <!-- KSD V001.000 AS  -->
    <v-row
      no-gutters
      class="conditionRow w-100 d-flex align-center mt-5">
      <v-col
        cols="6"
        class="h-100">
        <label
          class="grayFrame h-100 w-100 d-flex justify-center align-center"
          for="earlyLeavingTime">
          {{ $t("F322a5.S010") }}
        </label>
      </v-col>

      <v-col
        cols="1"
        class="h-100 mr-1">
        <input
          v-if="typeOfSetting != 'past' || isCloning"
          id="earlyLeavingTime"
          :class="this.earlyLeavingTimeErrorMsg !== null ? 'errorTextBox' : 'editTextBox'"
          v-model="config.earlyLeavingTime"
          type="text"
          @input="numInputRegulation"
          ref="earlyLeavingTimeText"
          maxlength="2" >
        <input
          v-else
          id="earlyLeavingTime"
          class="whiteFrame h-100 w-100 pl-2"
          v-model="config.earlyLeavingTime"
          type="text"
          @input="numInputRegulation"
          ref="earlyLeavingTimeText"
          maxlength="2"
          :disabled="true" >
      </v-col>
      {{ $t("F322a5.S021") }}
    </v-row>
    <v-row v-if="(typeOfSetting != 'past' || isCloning) && this.earlyLeavingTimeErrorMsg !== null ">
      <v-col
        cols="6"
        class="h-100"/>
      <v-col
        cols="4"
        class="h-100 mr-1"
        style="color:#f00;text-align: left;">{{ earlyLeavingTimeErrorMsg }}</v-col>
    </v-row>
    <v-row
      no-gutters
      class="conditionRow w-100 d-flex align-center mt-5">
      <v-col
        cols="3"
        class="h-100">
        <label
          class="grayFrame h-100 w-100 d-flex justify-center align-center"
          for="leaveGraceTime">
          {{ $t("F322a5.S011") }}
        </label>
      </v-col>

      <v-col
        cols="1"
        class="h-100 mr-1">
        <input
          v-if="typeOfSetting != 'past' || isCloning"
          id="leaveGraceTime"
          :class="this.leaveGraceTimeErrorMsg !== null ? 'errorTextBox' : 'editTextBox'"
          v-model="config.leaveGraceTime"
          type="text"
          @input="numInputRegulation"
          ref="leaveGraceTimeText"
          maxlength="2" >
        <input
          v-else
          id="logoutTime"
          class="whiteFrame h-100 w-100 pl-2"
          v-model="config.leaveGraceTime"
          type="text"
          @input="numInputRegulation"
          ref="leaveGraceTimeText"
          maxlength="2"
          :disabled="true" >
      </v-col>
      {{ $t("F322a5.S021") }}
    </v-row>
    <v-row v-if="(typeOfSetting != 'past' || isCloning) && this.leaveGraceTimeErrorMsg !== null ">
      <v-col
        cols="3"
        class="h-100"/>
      <v-col
        cols="4"
        class="h-100 mr-1"
        style="color:#f00;text-align: left;">{{ leaveGraceTimeErrorMsg }}</v-col>
    </v-row>
    <v-row
      no-gutters
      class="conditionRow w-100 d-flex align-center mt-5">
      <v-col
        cols="3"
        class="h-100">
        <label
          class="grayFrame h-100 w-100 d-flex justify-center align-center"
          for="timePayingUnit">
          {{ $t("F322a5.S012") }}
        </label>
      </v-col>

      <v-col
        cols="1"
        class="h-100 mr-1">
        <input
          v-if="typeOfSetting != 'past' || isCloning"
          id="timePayingUnit"
          :class="this.timePayingUnitErrorMsg !== null ? 'errorTextBox' : 'editTextBox'"
          v-model="config.timePayingUnit"
          type="text"
          @input="numInputRegulation"
          ref="timePayingUnitText"
          maxlength="2" >
        <input
          v-else
          id="timePayingUnit"
          class="whiteFrame h-100 w-100 pl-2"
          v-model="config.timePayingUnit"
          type="text"
          @input="numInputRegulation"
          ref="timePayingUnitText"
          maxlength="2"
          :disabled="true" >
      </v-col>
      {{ $t("F322a5.S021") }}
    </v-row>
    <v-row v-if="(typeOfSetting != 'past' || isCloning) && this.timePayingUnitErrorMsg !== null ">
      <v-col
        cols="3"
        class="h-100"/>
      <v-col
        cols="4"
        class="h-100 mr-1"
        style="color:#f00;text-align: left;">{{ timePayingUnitErrorMsg }}</v-col>
    </v-row>
    <v-row
      no-gutters
      class="conditionRow w-100 d-flex align-center mt-5">
      <v-col
        cols="3"
        class="h-100">
        <label
          class="grayFrame h-100 w-100 d-flex justify-center align-center"
          for="predictedCleaningTime">
          {{ $t("F322a5.S013") }}
        </label>
      </v-col>

      <v-col
        cols="1"
        class="h-100 mr-1">
        <input
          v-if="typeOfSetting != 'past' || isCloning"
          id="predictedCleaningTime"
          :class="this.predictedCleaningTimeErrorMsg !== null ? 'errorTextBox' : 'editTextBox'"
          v-model="config.predictedCleaningTime"
          type="text"
          @input="numInputRegulation"
          ref="predictedCleaningTimeText"
          maxlength="2" >
        <input
          v-else
          id="predictedCleaningTime"
          class="whiteFrame h-100 w-100 pl-2"
          v-model="config.predictedCleaningTime"
          type="text"
          @input="numInputRegulation"
          ref="predictedCleaningTimeText"
          maxlength="2"
          :disabled="true" >
      </v-col>
      {{ $t("F322a5.S021") }}
    </v-row>
    <v-row v-if="(typeOfSetting != 'past' || isCloning) && this.predictedCleaningTimeErrorMsg !== null ">
      <v-col
        cols="3"
        class="h-100"/>
      <v-col
        cols="4"
        class="h-100 mr-1"
        style="color:#f00;text-align: left;">{{ predictedCleaningTimeErrorMsg }}</v-col>
    </v-row>
    <v-row
      no-gutters
      class="conditionRow w-100 d-flex align-center mt-5">
      <v-col
        cols="3"
        class="h-100">
        <label
          class="grayFrame h-100 w-100 d-flex justify-center align-center"
          for="courseTaxRate">
          {{ $t("F322a5.S014") }}
        </label>
      </v-col>

      <v-col
        cols="3"
        class="h-100">
        <select
          v-if="typeOfSetting != 'past' || isCloning"
          id="courseTaxRate"
          class="h-100 w-100 whiteFrame pl-2"
          v-model="config.courseTaxRate">
          <option
            v-for="label in taxStorage"
            :key="label"
            :value="label">
            {{ label }}
          </option>
        </select>
        <select
          v-else
          id="courseTaxRate"
          class="h-100 w-100 whiteFrame pl-2"
          v-model="config.courseTaxRate"
          :disabled="true">
          <option
            v-for="label in taxStorage"
            :key="label"
            :value="label">
            {{ label }}
          </option>
        </select>
        <div class="pulldownArrow" />
      </v-col>
    </v-row>
    <v-row
      no-gutters
      class="conditionRow w-100 d-flex align-center mt-5">
      <v-col
        cols="6"
        class="h-100">
        <label
          class="grayFrame h-100 w-100 d-flex justify-center align-center"
          for="selfCheckInExtensionTimeForReservation">
          {{ $t("F322a5.S015") }}
        </label>
      </v-col>

      <v-col
        cols="1"
        class="h-100 mr-1">
        <input
          v-if="typeOfSetting != 'past' || isCloning"
          id="selfCheckInExtensionTimeForReservation"
          :class="this.selfCheckInExtensionTimeForReservationErrorMsg !== null ? 'errorTextBox' : 'editTextBox'"
          v-model="config.selfCheckInExtensionTimeForReservation"
          type="text"
          @input="numInputRegulation"
          ref="selfCheckInExtensionTimeForReservationText"
          maxlength="2" >
        <input
          v-else
          id="selfCheckInExtensionTimeForReservation"
          class="whiteFrame h-100 w-100 pl-2"
          v-model="config.selfCheckInExtensionTimeForReservation"
          type="text"
          @input="numInputRegulation"
          ref="selfCheckInExtensionTimeForReservationText"
          maxlength="2"
          :disabled="true" >
      </v-col>
      {{ $t("F322a5.S021") }}
    </v-row>
    <v-row v-if="(typeOfSetting != 'past' || isCloning) && this.selfCheckInExtensionTimeForReservationErrorMsg !== null ">
      <v-col
        cols="6"
        class="h-100"/>
      <v-col
        cols="4"
        class="h-100 mr-1"
        style="color:#f00;text-align: left;">{{ selfCheckInExtensionTimeForReservationErrorMsg }}</v-col>
    </v-row>
    <v-row
      no-gutters
      class="conditionRow w-100 d-flex align-center mt-5">
      <v-col
        cols="3"
        class="h-100">
        <label
          class="grayFrame h-100 w-100 d-flex justify-center align-center"
          for="autoCancelReservationTime">
          {{ $t("F322a5.S016") }}
        </label>
      </v-col>

      <v-col
        cols="1"
        class="h-100 mr-1">
        <input
          v-if="typeOfSetting != 'past' || isCloning"
          id="autoCancelReservationTime"
          :class="this.autoCancelReservationTimeErrorMsg !== null ? 'errorTextBox' : 'editTextBox'"
          v-model="config.autoCancelReservationTime"
          type="text"
          @input="numInputRegulation"
          ref="autoCancelReservationTimeText"
          maxlength="2" >
        <input
          v-else
          id="autoCancelReservationTime"
          class="whiteFrame h-100 w-100 pl-2"
          v-model="config.autoCancelReservationTime"
          type="text"
          @input="numInputRegulation"
          ref="autoCancelReservationTimeText"
          maxlength="2"
          :disabled="true" >
      </v-col>
      {{ $t("F322a5.S021") }}
    </v-row>
    <v-row v-if="(typeOfSetting != 'past' || isCloning) && this.autoCancelReservationTimeErrorMsg !== null ">
      <v-col
        cols="3"
        class="h-100"/>
      <v-col
        cols="4"
        class="h-100 mr-1"
        style="color:#f00;text-align: left;">{{ autoCancelReservationTimeErrorMsg }}</v-col>
    </v-row>
    <v-row
      no-gutters
      class="conditionRow w-100 d-flex align-center mt-5">
      <v-col
        cols="4"
        class="h-100">
        <label
          class="grayFrame h-100 w-100 d-flex justify-center align-center"
          for="roomStatusThresholdTime1">
          {{ $t("F322a5.S017") }}
        </label>
      </v-col>

      <v-col
        cols="1"
        class="h-100 mr-1">
        <input
          v-if="typeOfSetting != 'past' || isCloning"
          id="roomStatusThresholdTime1"
          :class="this.roomStatusThresholdTime1ErrorMsg !== null ? 'errorTextBox' : 'editTextBox'"
          v-model="config.roomStatusThresholdTime1"
          type="text"
          @input="numInputRegulation"
          ref="roomStatusThresholdTime1Text"
          maxlength="3" >
        <input
          v-else
          id="roomStatusThresholdTime1"
          class="whiteFrame h-100 w-100 pl-2"
          v-model="config.roomStatusThresholdTime1"
          type="text"
          @input="numInputRegulation"
          ref="roomStatusThresholdTime1Text"
          maxlength="3"
          :disabled="true" >
      </v-col>
      {{ $t("F322a5.S021") }}
    </v-row>
    <v-row v-if="(typeOfSetting != 'past' || isCloning) && this.roomStatusThresholdTime1ErrorMsg !== null ">
      <v-col
        cols="4"
        class="h-100"/>
      <v-col
        cols="4"
        class="h-100 mr-1"
        style="color:#f00;text-align: left;">{{ roomStatusThresholdTime1ErrorMsg }}</v-col>
    </v-row>
    <v-row
      no-gutters
      class="conditionRow w-100 d-flex align-center mt-5">
      <v-col
        cols="4"
        class="h-100">
        <label
          class="grayFrame h-100 w-100 d-flex justify-center align-center"
          for="roomStatusThresholdTime2">
          {{ $t("F322a5.S018") }}
        </label>
      </v-col>

      <v-col
        cols="1"
        class="h-100 mr-1">
        <input
          v-if="typeOfSetting != 'past' || isCloning"
          id="roomStatusThresholdTime2Min"
          :class="this.roomStatusThresholdTime2ErrorMsgMin !== null ? 'errorTextBox' : 'editTextBox'"
          type="text"
          @input="numInputRegulation"
          v-model="dataModel.roomStatusThresholdTime2.value1"
          ref="roomStatusThresholdTime2MinText"
          maxlength="3" >
        <input
          v-else
          id="roomStatusThresholdTime2Min"
          class="whiteFrame h-100 w-100 pl-2"
          type="text"
          @input="numInputRegulation"
          v-model="dataModel.roomStatusThresholdTime2.value1"
          ref="roomStatusThresholdTime2MinText"
          maxlength="3"
          :disabled="true" >
      </v-col>
      {{ "～" }}

      <v-col
        cols="1"
        class="h-100 mr-1">
        <input
          v-if="typeOfSetting != 'past' || isCloning"
          id="roomStatusThresholdTime2Max"
          :class="this.roomStatusThresholdTime2ErrorMsgMax !== null || this.compareHighErrorMsg !== null ? 'errorTextBox' : 'editTextBox'"
          type="text"
          @input="numInputRegulation"
          v-model="dataModel.roomStatusThresholdTime2.value2"
          ref="roomStatusThresholdTime2MaxText"
          maxlength="3" >
        <input
          v-else
          id="roomStatusThresholdTime2Max"
          class="whiteFrame h-100 w-100 pl-2"
          type="text"
          @input="numInputRegulation"
          v-model="dataModel.roomStatusThresholdTime2.value2"
          ref="roomStatusThresholdTime2MaxText"
          maxlength="3"
          :disabled="true" >
      </v-col>
      {{ $t("F322a5.S021") }}
    </v-row>
    <v-row v-if="(typeOfSetting != 'past' || isCloning) && this.roomStatusThresholdTime2ErrorMsgMin !== null">
      <v-col
        cols="4"
        class="h-100"/>
      <v-col
        cols="5"
        class="h-100 mr-1"
        style="color:#f00;text-align: left;">{{ roomStatusThresholdTime2ErrorMsgMin }}</v-col>
    </v-row>
    <v-row v-if="(typeOfSetting != 'past' || isCloning) && this.roomStatusThresholdTime2ErrorMsg !== null">
      <v-col
        cols="5"
        class="h-100"/>
      <v-col
        cols="4"
        class="h-100 mr-1"
        style="color:#f00;text-align: left;">{{ roomStatusThresholdTime2ErrorMsg }}</v-col>
    </v-row>
    <v-row
      no-gutters
      class="conditionRow w-100 d-flex align-center mt-5">
      <v-col
        cols="4"
        class="h-100">
        <label
          class="grayFrame h-100 w-100 d-flex justify-center align-center"
          for="roomStatusThresholdTime3">
          {{ $t("F322a5.S019") }}
        </label>
      </v-col>

      <v-col
        cols="1"
        class="h-100 mr-1">
        <input
          v-if="typeOfSetting != 'past' || isCloning"
          id="roomStatusThresholdTime3Min"
          :class="this.roomStatusThresholdTime3ErrorMsgMin !== null ? 'errorTextBox' : 'editTextBox'"
          type="text"
          @input="numInputRegulation"
          v-model="dataModel.roomStatusThresholdTime3.value1"
          ref="roomStatusThresholdTime3MinText"
          maxlength="3" >
        <input
          v-else
          id="roomStatusThresholdTime3Min"
          class="whiteFrame h-100 w-100 pl-2"
          type="text"
          @input="numInputRegulation"
          v-model="dataModel.roomStatusThresholdTime3.value1"
          ref="roomStatusThresholdTime3MinText"
          maxlength="3"
          :disabled="true" >
      </v-col>
      {{ "～" }}

      <v-col
        cols="1"
        class="h-100 mr-1">
        <input
          v-if="typeOfSetting != 'past' || isCloning"
          id="roomStatusThresholdTime3Max"
          :class="this.roomStatusThresholdTime3ErrorMsgMax !== null || this.compareHighErrorMsg !== null ? 'errorTextBox' : 'editTextBox'"
          type="text"
          @input="numInputRegulation"
          v-model="dataModel.roomStatusThresholdTime3.value2"
          ref="roomStatusThresholdTime3MaxText"
          maxlength="3" >
        <input
          v-else
          id="roomStatusThresholdTime3Max"
          class="whiteFrame h-100 w-100 pl-2"
          type="text"
          @input="numInputRegulation"
          v-model="dataModel.roomStatusThresholdTime3.value2"
          ref="roomStatusThresholdTime3MaxText"
          maxlength="3"
          :disabled="true" >
      </v-col>
      {{ $t("F322a5.S021") }}
    </v-row>
    <v-row v-if="(typeOfSetting != 'past' || isCloning) && this.roomStatusThresholdTime3ErrorMsgMin !== null">
      <v-col
        cols="4"
        class="h-100"/>
      <v-col
        cols="5"
        class="h-100 mr-1"
        style="color:#f00;text-align: left;">{{ roomStatusThresholdTime3ErrorMsgMin }}</v-col>
    </v-row>
    <v-row v-if="(typeOfSetting != 'past' || isCloning) && this.roomStatusThresholdTime3ErrorMsg !== null">
      <v-col
        cols="5"
        class="h-100"/>
      <v-col
        cols="4"
        class="h-100 mr-1"
        style="color:#f00;text-align: left;">{{ roomStatusThresholdTime3ErrorMsg }}</v-col>
    </v-row>
    <v-row
      no-gutters
      class="conditionRow w-100 d-flex align-center mt-5">
      <v-col
        cols="4"
        class="h-100">
        <label
          class="grayFrame h-100 w-100 d-flex justify-center align-center"
          for="roomStatusThresholdTime4">
          {{ $t("F322a5.S020") }}
        </label>
      </v-col>

      <v-col
        cols="1"
        class="h-100 mr-1">
        <input
          v-if="typeOfSetting != 'past' || isCloning"
          id="roomStatusThresholdTime4"
          :class="this.roomStatusThresholdTime4ErrorMsg !== null ? 'errorTextBox' : 'editTextBox'"
          v-model="config.roomStatusThresholdTime4"
          type="text"
          @input="numInputRegulation"
          ref="roomStatusThresholdTime4Text"
          maxlength="3" >
        <input
          v-else
          id="roomStatusThresholdTime4"
          class="whiteFrame h-100 w-100 pl-2"
          v-model="config.roomStatusThresholdTime4"
          type="text"
          @input="numInputRegulation"
          ref="roomStatusThresholdTime4Text"
          maxlength="3"
          :disabled="true" >
      </v-col>
      {{ $t("F322a5.S021") }}
    </v-row>
    <v-row v-if="(typeOfSetting != 'past' || isCloning) && this.roomStatusThresholdTime4ErrorMsg !== null ">
      <v-col
        cols="4"
        class="h-100"/>
      <v-col
        cols="4"
        class="h-100 mr-1"
        style="color:#f00;text-align: left;">{{ roomStatusThresholdTime4ErrorMsg }}</v-col>
    </v-row>
    <!-- KSD V001.000 AE  -->

    <!-- 20221128 MOD S TEC.Gotou #1234 -->
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
            class="d-flex justify-center align-center whiteFrame">
            1（英字大+英字小+数字（推奨））
          </v-col>
          <v-col class="text-left whiteFrame px-4">
            英大文字、英小文字、数字を含む
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col
            cols="4"
            class="d-flex justify-center align-center whiteFrame">
            2（英字、数字の組み合わせ自由）
          </v-col>
          <v-col class="text-left whiteFrame px-4">
            英大文字、英小文字、数字を1種以上含む
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col
            cols="4"
            class="d-flex justify-center align-center whiteFrame">
            3（英字大+英字小+数字+記号）
          </v-col>
          <v-col class="text-left whiteFrame px-4">
            英大文字、英小文字、数字、記号を含む
          </v-col>
        </v-row>
      </div>
    </div>
    <!-- 20221128 MOD E TEC.Gotou #1234 -->

    <!-- その他ダイアログ等 -->
    <v-row>
      <v-col>
        <!-- G002.00.0 Update start -->
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
          :isfixed-btn="disabledFixedBtn || !permissions.includes('CLOUDPOS_OPERATION_UPDATE')"
          :is-clone-btn="disabledCloneBtn"
          :isdel-btn="disabledDeleteBtn || !permissions.includes('CLOUDPOS_OPERATION_DELETE')"/>
          <!-- G002.00.0 Update end -->
      </v-col>
    </v-row>
    <popup ref="pop" />
  </v-container>
</template>
