<style src="./../../static/css/MasterCommon/masterDialog.css"></style>
<script type="text/javascript" src="./../../static/js/UserMaster/UserEditDialog.js"></script>

<!--
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230113  litie(Neusoft)    G001.00.0  issue課題#1058を対応します.
 * 20230201  litie(Neusoft)    G002.00.0  issue課題#1232を対応します.
 * 20230208  xu.jh(Neusoft)    G003.00.0  issue課題#1488を対応します.
 * 20230331  bai.ry(Neusoft)   G004.00.0  issue課題#1012を対応します.
 * 20230420  wangchunmei(Neusoft)   G005.00.0  issue課題#1490を対応します.
 * 20230506  wangchunmei(Neusoft)   G005.00.1  issue課題#1490を対応します.
 * 20230609  wangchunmei(Neusoft)   G006.00.0  issue課題#1672を対応します.
 * 20230724  qurn(Neusoft)   G007.00.0  issue課題#993を対応します.
-->

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
              v-if="mode === 1"><b>{{ $t("F00001.S013") }}</b></label>
            <label
              id="changeModelabel"
              v-if="mode === 2"><b>{{ $t("F00001.S014") }}</b></label>
          </div>
          <font class="dialog-title">{{ title }}</font>
        </v-card-title>
        <div id="baseTable">
          <table id="userMasterTable">
            <!-- コード -->
            <tr>
              <th>{{ $t("F00001.S015") }}</th>
              <td colspan="2">
                <input
                  type="text"
                  :id="'readOnlyText'"
                  ref="userIdText"
                  v-model="userData.displayCode"
                  :disabled=true
                  style="ime-mode:disabled;"
                  maxlength="10"
                  tabindex="-1">
              </td>
            </tr>
            <!-- 名称 -->
            <tr>
              <th>{{ $t("F00001.S016") }}</th>
              <td colspan="2">
                <input
                  type="text"
                  :class="this.nameErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'"
                  class="textUserName"
                  ref="nameText"
                  v-model="userData.firstName"
                  :placeholder="this.$i18n.t('F00001.S033')"
                  maxlength="20"
                  tabindex="101"
                  :@input="inputLimit(userData.firstName,20)">
              </td>
            </tr>
            <!-- 名称(エラーメッセージ) -->
            <tr
              v-if="this.nameErrorMsg !== ''"
              class="errorCell">
              <th />
              <td colspan="2">
                <div
                  v-for="nameMsg in nameErrorMsg"
                  :key="nameMsg">
                  <label>{{ nameMsg }}</label>
                </div>
              </td>
            </tr>
            <!-- パスワード -->
            <tr>
              <th>{{ $t("F00001.S017") }}</th>
              <td>
                <!-- DS KSD V001.000 83439 -->
                <!-- <input
                  :type="passwordVisible ? 'tel' : 'password'"
                  :id="passReadFlag ? 'readPassword' : passwordErrorMsg !== '' ? 'errorPassword' : 'inputPassword'"
                  class="inputPassword"
                  ref="passwordText"
                  v-model="userData.password"
                  :placeholder="mode === 1?this.$i18n.t('F00001.S030'):passReadFlag ? '**************' : this.$i18n.t('F00001.S030')"
                  :disabled="passReadFlag"
                  :style="mode === 1 ? 'ime-mode:disabled;border: none; width: 335px' : 'ime-mode:disabled;border: none;'"
                  autocomplete="new-password"
                  maxlength='15'
                  tabindex="102" > -->
                <!-- DE KSD V001.000 83439 -->
                <!-- AS KSD V001.000 83439 -->
                <!-- DS KSD V001.000 83439 -->
                <!-- <input
                  :type="!passwordVisible ? 'text' : 'password'"
                  :id="passReadFlag ? 'readPassword' : passwordErrorMsg !== '' ? 'errorPassword' : 'inputPassword'"
                  class="inputPassword"
                  ref="passwordText"
                  v-model="userData.password"
                  :placeholder="mode === 1?this.$i18n.t('F00001.S030'):passReadFlag ? '**************' : this.$i18n.t('F00001.S030')"
                  :disabled="passReadFlag"
                  :style="mode === 1 ? 'ime-mode:disabled;border: none; width: 335px' : 'ime-mode:disabled;border: none;'"
                  autocomplete="new-password"
                  maxlength='15'
                  tabindex="102" > -->
                <!-- DE KSD V001.000 83439 -->
                <!-- AS KSD V001.000 83439 -->
                <input
                  :type="passwordVisible ? 'text' : 'password'"
                  :id="passReadFlag ? 'readPassword' : passwordErrorMsg !== '' ? 'errorPassword' : 'inputPassword'"
                  class="inputPassword"
                  ref="passwordText"
                  v-model="userData.password"
                  :placeholder="mode === 1?this.$i18n.t('F00001.S030'):passReadFlag ? '**************' : this.$i18n.t('F00001.S030')"
                  :disabled="passReadFlag"
                  :style="mode === 1 ? 'ime-mode:disabled;border: none; width: 335px' : 'ime-mode:disabled;border: none;'"
                  autocomplete="new-password"
                  maxlength='15'
                  tabindex="102" >
                <!-- AE KSD V001.000 83439 -->
                <!-- AE KSD V001.000 83439 -->
                <!-- G007.00.0 Update-Srart -->
                <!-- <a
                  href="#"
                  @click="ChangePassword()"
                  @keyup.space="ChangePassword()"
                  :tabindex="103"
                  class="field-icon scrollNone">
                  <span
                    toggle="password-field"
                    id="icon"
                    :class="passwordVisible ? 'mdi mdi-eye-off toggle-password' : 'mdi mdi-eye toggle-password'"/>
                </a> -->
                <a
                  href="#"
                  @click="ChangePassword()"
                  @keyup.space="ChangePassword()"
                  :tabindex="103"
                  class="field-icon scrollNone">
                  <span
                    toggle="password-field"
                    id="icon"
                    :class="passwordVisible ? 'mdi mdi-eye-off toggle-password' : 'mdi mdi-eye toggle-password'"/>
                </a>
                <!-- G007.00.0 Update-End-->
              </td>
              <td
                style="border: none; padding: 0 5px;"
                v-if="mode === 2">
                <v-spacer/>
                <div
                  class="buttomLabel"
                  @click="passwordUpdate" >
                  <v-btn
                    color="#1ea7cb"
                    style="width: 100px;height: 40px; box-shadow: none;"
                    tabindex="104">
                    <font
                      color ="white"
                      style="font-size:20px;">{{ $t("F00001.S018") }}</font>
                  </v-btn>
                </div>
              </td>
            </tr>
            <!-- パスワード(エラーメッセージ) -->
            <tr
              v-if="this.passwordErrorMsg !== ''"
              class="errorCell">
              <th />
              <td colspan="2">
                <div
                  v-for="passMsg in passwordErrorMsg"
                  :key="passMsg">
                  <label>{{ passMsg }}</label>
                </div>
              </td>
            </tr>
            <!-- パスワード有効期限 -->
            <tr>
              <th><label v-html="$t('F00001.S002')"/></th>
              <td colspan="2">
                <label style="padding-left:10px; ">{{ $t("F00001.S031") }}</label>
                <!-- G001.00.0 Update-Start -->
                <!-- <input type="text" :class="this.expiryErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'" class="inputExpiry underLine NumericStyle" ref="expiryText" v-model="userData.passwordExpirationDate" maxlength="2" tabindex="105" /> -->
                <!-- <input type="number" :class="this.expiryErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'" class="inputExpiry underLine NumericStyle" maxlength="2" ref="expiryText" v-model="userData.passwordExpirationDate" oninput="this.value=this.value.replace(/\D/g)" tabindex="105" /> -->
                <input
                  type="number"
                  :class="this.expiryErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'"
                  class="inputExpiry underLine NumericStyle"
                  maxlength="2"
                  ref="expiryText"
                  v-model="userData.passwordExpirationDate"
                  oninput="this.value=this.value.replace(/\D/g)>99?99:this.value.replace(/\D/g)"
                  tabindex="105" >
                <!-- G001.00.0 Update-End -->
                <label>{{ $t("F00001.S032") }}</label>
              </td>
            </tr>
            <!-- パスワード有効期限(エラーメッセージ) -->
            <tr
              v-if="this.expiryErrorMsg !== ''"
              class="errorCell">
              <th />
              <td colspan="2">
                <div
                  v-for="expiryMsg in expiryErrorMsg"
                  :key="expiryMsg">
                  <label>{{ expiryMsg }}</label>
                </div>
              </td>
            </tr>
            <!-- アクセス権限 -->
            <tr>
              <th>{{ $t("F00001.S019") }}</th>
              <td colspan="2">
                <select
                  v-model="userData.accessAuthority"
                  :class="roleCdErrorMsg !== '' ? 'errorSelectBox' : 'SelectBox'"
                  :disabled="mode === 0"
                  ref="roleText"
                  tabindex="106"
                  style="color:#000000">
                  <option/>
                  <option
                    v-for="roleItem in userAccessModelList"
                    :key="roleItem.displayName"
                    :value="roleItem.accessAuthority">{{ roleItem.displayName }}</option>
                </select>
                <div class="pulldownArrow"/>
              </td>
            </tr>
            <!-- アクセス権限(エラーメッセージ) -->
            <tr
              v-if="this.roleCdErrorMsg !== ''"
              class="errorCell">
              <th />
              <td colspan="2">
                <div
                  v-for="roleCdMsg in roleCdErrorMsg"
                  :key="roleCdMsg">
                  <label>{{ roleCdMsg }}</label>
                </div>
              </td>
            </tr>
            <!-- 本部権限 -->
            <tr>
              <th>{{ $t("F00001.S021") }}</th>
              <td colspan="2">
                <div
                  class="inline-radio"
                  style="background-color: transparent;">
                  <div>
                    <!-- G001.00.0 G004.00.0 Update-Start -->
                    <!-- <input type="radio" name="authority" id="authValid" :checked="userData.headquartersPermission == 1" v-on:change="onRadioChange" tabindex="-1"> -->
                    <input
                      type="radio"
                      name="authority"
                      id="authValid"
                      :checked="userData.headquartersPermission == 1"
                      @change="onAuthRadioChange"
                      tabindex="-1"
                      :disabled="optUserHeadquartersAuthority != 1" >
                    <!-- G001.00.0 G004.00.0 Update-End -->
                    <!-- KSD V001.000 DS -->
                    <!-- <label -->
                    <!--   @keydown.enter="enterValid" -->
                    <!--   @keydown.space="enterValid" -->
                    <!--   tabindex="108" -->
                    <!--   class="scrollNone">{{ $t("F00001.S022") }}</label> -->
                    <!-- KSD V001.000 DE -->
                    <!-- KSD V001.000 AS -->
                    <label
                      @keydown.enter="enterValid"
                      @keydown.space="enterValid"
                      tabindex="107"
                      class="scrollNone">
                      {{ $t("F00001.S022") }}
                    </label>
                    <!-- KSD V001.000 AE -->
                  </div>
                  <div style="margin-left:10px">
                    <!-- G001.00.0 G004.00.0 Update-Start -->
                    <!-- <input type="radio" name="authority" id="authInvalid" :checked="userData.headquartersPermission != 1" v-on:change="onRadioChange" tabindex="-1"> -->
                    <input
                      type="radio"
                      name="authority"
                      id="authInvalid"
                      :checked="userData.headquartersPermission != 1"
                      @change="onAuthRadioChange"
                      tabindex="-1"
                      :disabled="optUserHeadquartersAuthority != 1" >
                    <!-- G001.00.0 G004.00.0 Update-End -->
                    <!-- KSD V001.000 DS -->
                    <!-- <label -->
                    <!--   @keydown.enter="enterInvalid" -->
                    <!--   @keydown.space="enterInvalid" -->
                    <!--   tabindex="109" -->
                    <!--   class="scrollNone">{{ $t("F00001.S023") }}</label> -->
                    <!-- KSD V001.000 DE -->
                    <!-- KSD V001.000 AS -->
                    <label
                      @keydown.enter="enterInvalid"
                      @keydown.space="enterInvalid"
                      tabindex="108"
                      class="scrollNone">
                      {{ $t("F00001.S023") }}
                    </label>
                    <!-- KSD V001.000 AE -->
                  </div>
                </div>
              </td>
            </tr>
            <!-- 所属店舗 -->
            <tr v-if="userData.headquartersPermission == 0">
              <th>{{ $t("F00001.S020") }}</th>
              <td colspan="2">
                <div
                  style="height: 100%;"
                  :class="belongErrorMsg !== '' ? 'errorTextBox' : ''">
                  <input
                    type="text"
                    :class="belongErrorMsg !== '' ? '' : 'editTextBox'"
                    class="textBelongStore"
                    :id="belongText"
                    ref="belongText"
                    :disabled=true >
                  <div
                    class="buttomLabel">
                    <!-- G001.00.0 Update-Start -->
                    <!-- <v-btn tabindex="107" style="width: 28px; height: 40px;"> -->
                    <!-- KSD V001.000 DS -->
                    <!-- <v-btn -->
                    <!--   @click="belongSelect" -->
                    <!--   tabindex="107" -->
                    <!--   style="width: 28px; height: 40px;" -->
                    <!--   :disabled="optUserHeadquartersAuthority != 1" > -->
                    <!--   G001.00.0 Update-End -->
                    <!--   <span class="rightArrow" /> -->
                    <!-- </v-btn> -->
                    <!-- KSD V001.000 DE -->
                    <!-- KSD V001.000 AS -->
                    <v-btn
                      @click="belongSelect"
                      tabindex="109"
                      style="width: 28px; height: 40px;"
                      :disabled="optUserHeadquartersAuthority != 1" >
                      <span class="rightArrow" />
                    </v-btn>
                    <!-- KSD V001.000 AE -->
                  </div>
                </div>
              </td>
            </tr>
            <!-- 担当店舗 -->
            <tr v-if="userData.headquartersPermission == 1">
              <th>{{ $t("F00001.S024") }}</th>
              <td colspan="2">
                <div
                  style="height: 100%;"
                  :class="chargeErrorMsg !== '' ? 'errorTextBox' : ''">
                  <input
                    type="text"
                    :class="chargeErrorMsg !== '' ? '' : 'editTextBox'"
                    class="textChargeStore"
                    :id="chargeText"
                    ref="chargeText"
                    :disabled=true >
                  <div
                    class="buttomLabel">
                    <!-- G001.00.0 Update-Start -->
                    <!-- <v-btn tabindex="110" style="width: 28px; height: 40px;"> -->
                    <v-btn
                      @click="chargeSelect"
                      tabindex="110"
                      style="width: 28px; height: 40px;"
                      :disabled="optUserHeadquartersAuthority != 1" >
                      <!-- G001.00.0 Update-End -->
                      <span class="rightArrow" />
                    </v-btn>
                  </div>
                </div>
              </td>
            </tr>
            <!-- 所属店舗(エラーメッセージ) -->
            <tr
              v-if="this.belongErrorMsg !== ''"
              class="errorCell">
              <th />
              <td colspan="2">
                <div
                  v-for="belongMsg in belongErrorMsg"
                  :key="belongMsg">
                  <label>{{ belongMsg }}</label>
                </div>
              </td>
            </tr>
            <!-- 担当店舗(エラーメッセージ) -->
            <tr
              v-if="userData.headquartersPermission == 1 && this.chargeErrorMsg !== ''"
              class="errorCell">
              <th />
              <td colspan="2">
                <div
                  v-for="chargeMsg in chargeErrorMsg"
                  :key="chargeMsg">
                  <label>{{ chargeMsg }}</label>
                </div>
              </td>
            </tr>
            <!-- G005.00.1 Add-Start -->
            <!-- KSD V001.000 DS -->
            <!-- <template v-if="userData.belongStoreCd && userData.headquartersPermission == 0"> -->
            <!-- KSD V001.000 DE -->
            <!-- KSD V001.000 AS -->
            <template v-if="userData.belongStoreCd || (userData.chargeStoreCds.length > 0)">
            <!-- KSD V001.000 AE -->
              <!-- G005.00.1 Add-End -->
              <!-- 責任者No -->
              <!-- KSD V001.000 DS -->
              <!-- <tr v-if="userData.headquartersPermission == 0"> -->
              <!-- KSD V001.000 DE -->
              <!-- KSD V001.000 AS -->
              <tr>
              <!-- KSD V001.000 AE -->
                <th>{{ $t("F00001.S057") }}</th>
                <td colspan="2">
                  <input
                    type="text"
                    :class="this.posUserNameErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'"
                    class="textUserName1"
                    ref="posUserNameText"
                    v-model="userData.posUserName"
                    maxlength="8"
                    tabindex="111"
                    @input="numInputRegulation"
                    :placeholder="this.$i18n.t('F00001.S078')" >
                </td>
              </tr>
              <!-- 責任者No(エラーメッセージ) -->
              <tr
                v-if="this.posUserNameErrorMsg !== ''"
                class="errorCell">
                <th />
                <td colspan="2">
                  <div
                    v-for="posUserNameMsg in posUserNameErrorMsg"
                    :key="posUserNameMsg"
                    ref="posUserNameErrorMsg">
                    <label>{{ posUserNameMsg }}</label>
                  </div>
                </td>
              </tr>
              <!-- POS印字名称 -->
              <!-- KSD V001.000 DS -->
              <!-- <tr v-if="userData.headquartersPermission == 0"> -->
              <!-- KSD V001.000 DE -->
              <!-- KSD V001.000 AS -->
              <tr>
              <!-- KSD V001.000 AE -->  
                <th>{{ $t("F00001.S058") }}</th>
                <td colspan="2">
                  <input
                    type="text"
                    :class="this.posPrintingNameErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'"
                    class="textPosPrintingName"
                    ref="posPrintingNameText"
                    v-model="userData.posPrintingName"
                    tabindex="112"
                    :@input="inputLimit(userData.posPrintingName,8)"
                    :placeholder="this.$i18n.t('F00001.S079')" >
                </td>
              </tr>
              <!-- POS印字名称(エラーメッセージ) -->
              <tr
                v-if="this.posPrintingNameErrorMsg !== ''"
                class="errorCell">
                <th />
                <td colspan="2">
                  <!-- G005.00.0 Update-Start -->
                  <!-- <div v-for="nameMsg in posPrintingNameErrorMsg" :key="posPrintingNameMsg"> -->
                  <div
                    v-for="posPrintingNameMsg in posPrintingNameErrorMsg"
                    :key="posPrintingNameMsg">
                    <!-- G005.00.0 Update-End -->
                    <label>{{ posPrintingNameMsg }}</label>
                  </div>
                </td>
              </tr>
              <!-- POSパスワード -->
              <!-- G006.00.0 Delete-Start -->
              <!-- <tr v-if="userData.headquartersPermission == 0">
                <th>{{ $t("F00001.S059") }}</th>
                <td colspan="2">
                  <input
                    type="text"
                    :class="this.posPasswordErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'"
                    class="textPosPasswordErrorMsg"
                    ref="posPasswordText"
                    v-model="userData.posPassword"
                    maxlength="15"
                    tabindex="113" >
                </td>
              </tr> -->
              <!-- G006.00.0 Delete-End -->
              <!-- G006.00.0 Add-Start -->
              <!-- KSD V001.000 DS -->
              <!-- <tr v-if="userData.headquartersPermission == 0"> -->
              <!-- KSD V001.000 DE -->
              <!-- KSD V001.000 AS -->
              <tr>
              <!-- KSD V001.000 AE -->
                <th>{{ $t("F00001.S059") }}</th>
                <td>
                  <!-- DS KSD V001.000 83439 -->
                  <!-- <input
                    :type="posPasswordVisible ? 'tel' : 'password'"
                    :id="posPassReadFlag ? 'readPosPassword' : posPasswordErrorMsg !== '' ? 'errorPosPassword' : 'inputPosPassword'"
                    class="inputPassword"
                    ref="posPasswordText"
                    v-model="userData.posPassword"
                    :placeholder="mode === 1?this.$i18n.t('F00001.S030'):posPassReadFlag ? '**************' : this.$i18n.t('F00001.S030')"
                    :disabled="posPassReadFlag"
                    :style="mode === 1 ? 'ime-mode:disabled;border: none; width: 335px' : 'ime-mode:disabled;border: none;'"
                    autocomplete="new-password"
                    maxlength='15'
                    tabindex="113" > -->
                  <!-- DE KSD V001.000 83439 -->
                  <!-- AS KSD V001.000 83439 -->
                  <!-- DS KSD V001.000 83439 -->
                  <!-- <input
                    :type="!posPasswordVisible ? 'text' : 'password'"
                    :id="posPassReadFlag ? 'readPosPassword' : posPasswordErrorMsg !== '' ? 'errorPosPassword' : 'inputPosPassword'"
                    class="inputPassword"
                    ref="posPasswordText"
                    v-model="userData.posPassword"
                    :placeholder="mode === 1?this.$i18n.t('F00001.S030'):posPassReadFlag ? '**************' : this.$i18n.t('F00001.S030')"
                    :disabled="posPassReadFlag"
                    :style="mode === 1 ? 'ime-mode:disabled;border: none; width: 335px' : 'ime-mode:disabled;border: none;'"
                    autocomplete="new-password"
                    maxlength='15'
                    tabindex="113" > -->
                  <!-- DE KSD V001.000 83439 -->
                  <!-- AS KSD V001.000 83439 -->
                  <input
                    :type="posPasswordVisible ? 'text' : 'password'"
                    :id="posPassReadFlag ? 'readPosPassword' : posPasswordErrorMsg !== '' ? 'errorPosPassword' : 'inputPosPassword'"
                    class="inputPassword"
                    ref="posPasswordText"
                    v-model="userData.posPassword"
                    :placeholder="mode === 1?this.$i18n.t('F00001.S030'):posPassReadFlag ? '**************' : this.$i18n.t('F00001.S030')"
                    :disabled="posPassReadFlag"
                    :style="mode === 1 ? 'ime-mode:disabled;border: none; width: 335px' : 'ime-mode:disabled;border: none;'"
                    autocomplete="new-password"
                    maxlength='15'
                    tabindex="113" >
                  <!-- AE KSD V001.000 83439 -->
                  <!-- AE KSD V001.000 83439 -->
                  <!-- G007.00.0 Update-Srart -->
                  <!-- <a
                    href="#"
                    @click="ChangePosPassword()"
                    @keyup.space="ChangePosPassword()"
                    :tabindex="103"
                    class="field-icon scrollNone">
                    <span
                      toggle="password-field"
                      id="icon"
                      :class="passwordVisible ? 'mdi mdi-eye-off toggle-password' : 'mdi mdi-eye toggle-password'"/>
                  </a> -->
                  <!-- KSD V001.000 DS -->
                  <!-- <a -->
                  <!--   href="#" -->
                  <!--   @click="ChangePosPassword()" -->
                  <!--   @keyup.space="ChangePosPassword()" -->
                  <!--   :tabindex="103" -->
                  <!--   class="field-icon scrollNone"> -->
                  <!--   <span -->
                  <!--     toggle="password-field" -->
                  <!--     id="icon" -->
                  <!--     :class="posPasswordVisible ? 'mdi mdi-eye-off toggle-password' : 'mdi mdi-eye toggle-password'"/> -->
                  <!-- </a> -->
                  <!-- KSD V001.000 DE -->
                  <!-- G007.00.0 Update-End passwordVisibleFlg-->
                  <!-- KSD V001.000 AS -->
                  <a
                    href="#"
                    @click="ChangePosPassword()"
                    @keyup.space="ChangePosPassword()"
                    :tabindex="113"
                    class="field-icon scrollNone">
                    <span
                      toggle="password-field"
                      id="icon"
                      :class="posPasswordVisible ? 'mdi mdi-eye-off toggle-password' : 'mdi mdi-eye toggle-password'"/>
                  </a>
                  <!-- KSD V001.000 AE -->
                </td>
                <td
                  style="border: none; padding: 0 5px;"
                  v-if="mode === 2">
                  <v-spacer/>
                  <div
                    class="buttomLabel"
                    @click="posPasswordUpdate" >
                    <v-btn
                      color="#1ea7cb"
                      style="width: 100px;height: 40px; box-shadow: none;"
                      tabindex="113">
                      <font
                        color ="white"
                        style="font-size:20px;">{{ $t("F00001.S018") }}</font>
                    </v-btn>
                  </div>
                </td>
              </tr>
              <!-- G006.00.0 Add-End -->
              <!-- POSパスワード(エラーメッセージ) -->
              <tr
                v-if="this.posPasswordErrorMsg !== ''"
                class="errorCell">
                <th />
                <td colspan="2">
                  <div
                    v-for="posPasswordMsg in posPasswordErrorMsg"
                    :key="posPasswordMsg">
                    <label>{{ posPasswordMsg }}</label>
                  </div>
                </td>
              </tr>
              <!-- 値引 -->
              <!-- KSD V001.000 DS -->
              <!-- <tr v-if="userData.headquartersPermission == 0"> -->
              <!-- KSD V001.000 DE -->
              <!-- KSD V001.000 AS -->
              <tr>
              <!-- KSD V001.000 AE -->
                <th>{{ $t("F00001.S061") }}</th>
                <td colspan="2">
                  <div
                    class="inline-radio"
                    style="background-color: transparent;">
                    <div>
                      <input
                        type="radio"
                        name="amountOff"
                        id="amountOffValid"
                        :checked="userData.posOperationPermission.amountOff == 1"
                        @change="onRadioChange"
                        tabindex="-1">
                      <label
                        @keydown.enter="enterValid"
                        @keydown.space="enterValid"
                        tabindex="114"
                        class="scrollNone">{{ $t("F00001.S071") }}</label>
                    </div>
                    <div style="margin-left:10px">
                      <input
                        type="radio"
                        name="amountOff"
                        id="amountOffInvalid"
                        :checked="userData.posOperationPermission.amountOff != 1"
                        @change="onRadioChange"
                        tabindex="-1">
                      <label
                        @keydown.enter="enterInvalid"
                        @keydown.space="enterInvalid"
                        tabindex="115"
                        class="scrollNone">{{ $t("F00001.S072") }}</label>
                    </div>
                  </div>
                </td>
              </tr>
              <!-- 割引 -->
              <!-- KSD V001.000 DS -->
              <!-- <tr v-if="userData.headquartersPermission == 0"> -->
              <!-- KSD V001.000 DE -->
              <!-- KSD V001.000 AS -->
              <tr>
              <!-- KSD V001.000 AE -->
                <th>{{ $t("F00001.S062") }}</th>
                <td colspan="2">
                  <div
                    class="inline-radio"
                    style="background-color: transparent;">
                    <div>
                      <input
                        type="radio"
                        name="percentOff"
                        id="percentOffValid"
                        :checked="userData.posOperationPermission.percentOff == 1"
                        @change="onRadioChange"
                        tabindex="-1">
                      <label
                        tabindex="116"
                        class="scrollNone">{{ $t("F00001.S071") }}</label>
                    </div>
                    <div style="margin-left:10px">
                      <input
                        type="radio"
                        name="percentOff"
                        id="percentOffInvalid"
                        :checked="userData.posOperationPermission.percentOff != 1"
                        @change="onRadioChange"
                        tabindex="-1">
                      <label
                        tabindex="117"
                        class="scrollNone">{{ $t("F00001.S072") }}</label>
                    </div>
                  </div>
                </td>
              </tr>
              <!-- 売変 -->
              <!-- KSD V001.000 DS -->
              <!-- <tr v-if="userData.headquartersPermission == 0"> -->
              <!-- KSD V001.000 DE -->
              <!-- KSD V001.000 AS -->
              <tr>
              <!-- KSD V001.000 AE -->
                <th>{{ $t("F00001.S068") }}</th>
                <td colspan="2">
                  <div
                    class="inline-radio"
                    style="background-color: transparent;">
                    <div>
                      <input
                        type="radio"
                        name="salesChange"
                        id="salesChangeValid"
                        :checked="userData.posOperationPermission.salesChange == 1"
                        @change="onRadioChange"
                        tabindex="-1">
                      <label
                        tabindex="118"
                        class="scrollNone">{{ $t("F00001.S071") }}</label>
                    </div>
                    <div style="margin-left:10px">
                      <input
                        type="radio"
                        name="salesChange"
                        id="salesChangeInvalid"
                        :checked="userData.posOperationPermission.salesChange != 1"
                        @change="onRadioChange"
                        tabindex="-1">
                      <label
                        tabindex="119"
                        class="scrollNone">{{ $t("F00001.S072") }}</label>
                    </div>
                  </div>
                </td>
              </tr>
              <!-- 取引中止 -->
              <!-- KSD V001.000 DS -->
              <!-- <tr v-if="userData.headquartersPermission == 0"> -->
              <!-- KSD V001.000 DE -->
              <!-- KSD V001.000 AS -->
              <tr>
              <!-- KSD V001.000 AE -->
                <!-- G003.00.0 Update-Start -->
                <!-- <th>{{ $t("F00001.S069") }}</th> -->
                <th>{{ $t("F00001.S086") }}</th>
                <!-- G003.00.0 Update-End -->
                <td colspan="2">
                  <div
                    class="inline-radio"
                    style="background-color: transparent;">
                    <div>
                      <input
                        type="radio"
                        name="cancellation"
                        id="cancellationValid"
                        :checked="userData.posOperationPermission.cancellation == 1"
                        @change="onRadioChange"
                        tabindex="-1">
                      <label
                        tabindex="120"
                        class="scrollNone">{{ $t("F00001.S071") }}</label>
                    </div>
                    <div style="margin-left:10px">
                      <input
                        type="radio"
                        name="cancellation"
                        id="cancellationInvalid"
                        :checked="userData.posOperationPermission.cancellation != 1"
                        @change="onRadioChange"
                        tabindex="-1">
                      <label
                        tabindex="121"
                        class="scrollNone">{{ $t("F00001.S072") }}</label>
                    </div>
                  </div>
                </td>
              </tr>
              <!-- 入金 -->
              <!-- KSD V001.000 DS -->
              <!-- <tr v-if="userData.headquartersPermission == 0"> -->
              <!-- KSD V001.000 DE -->
              <!-- KSD V001.000 AS -->
              <tr>
              <!-- KSD V001.000 AE -->
                <th>{{ $t("F00001.S065") }}</th>
                <td colspan="2">
                  <div
                    class="inline-radio"
                    style="background-color: transparent;">
                    <div>
                      <input
                        type="radio"
                        name="deposit"
                        id="depositValid"
                        :checked="userData.posOperationPermission.deposit == 1"
                        @change="onRadioChange"
                        tabindex="-1">
                      <label
                        tabindex="122"
                        class="scrollNone">{{ $t("F00001.S071") }}</label>
                    </div>
                    <div style="margin-left:10px">
                      <input
                        type="radio"
                        name="deposit"
                        id="depositInvalid"
                        :checked="userData.posOperationPermission.deposit != 1"
                        @change="onRadioChange"
                        tabindex="-1">
                      <label
                        tabindex="123"
                        class="scrollNone">{{ $t("F00001.S072") }}</label>
                    </div>
                  </div>
                </td>
              </tr>
              <!-- 出金 -->
              <!-- KSD V001.000 DS -->
              <!-- <tr v-if="userData.headquartersPermission == 0"> -->
              <!-- KSD V001.000 DE -->
              <!-- KSD V001.000 AS -->
              <tr>
              <!-- KSD V001.000 AE -->
                <th>{{ $t("F00001.S066") }}</th>
                <td colspan="2">
                  <div
                    class="inline-radio"
                    style="background-color: transparent;">
                    <div>
                      <input
                        type="radio"
                        name="withdrawal"
                        id="withdrawalValid"
                        :checked="userData.posOperationPermission.withdrawal == 1"
                        @change="onRadioChange"
                        tabindex="-1">
                      <label
                        tabindex="124"
                        class="scrollNone">{{ $t("F00001.S071") }}</label>
                    </div>
                    <div style="margin-left:10px">
                      <input
                        type="radio"
                        name="withdrawal"
                        id="withdrawalInvalid"
                        :checked="userData.posOperationPermission.withdrawal != 1"
                        @change="onRadioChange"
                        tabindex="-1">
                      <label
                        tabindex="125"
                        class="scrollNone">{{ $t("F00001.S072") }}</label>
                    </div>
                  </div>
                </td>
              </tr>
              <!-- 釣銭準備金入力 -->
              <!-- KSD V001.000 DS -->
              <!-- <tr v-if="userData.headquartersPermission == 0"> -->
              <!-- KSD V001.000 DE -->
              <!-- KSD V001.000 AS -->
              <tr>
              <!-- KSD V001.000 AE -->
                <th>{{ $t("F00001.S073") }}</th>
                <td colspan="2">
                  <div
                    class="inline-radio"
                    style="background-color: transparent;">
                    <div>
                      <input
                        type="radio"
                        name="changeReserve"
                        id="changeReserveValid"
                        :checked="userData.posOperationPermission.changeReserve == 1"
                        @change="onRadioChange"
                        tabindex="-1">
                      <label
                        tabindex="126"
                        class="scrollNone">{{ $t("F00001.S071") }}</label>
                    </div>
                    <div style="margin-left:10px">
                      <input
                        type="radio"
                        name="changeReserve"
                        id="changeReserveInvalid"
                        :checked="userData.posOperationPermission.changeReserve != 1"
                        @change="onRadioChange"
                        tabindex="-1">
                      <label
                        tabindex="127"
                        class="scrollNone">{{ $t("F00001.S072") }}</label>
                    </div>
                  </div>
                </td>
              </tr>
              <!-- KSD V001.000 AS -->
               <!-- 釣銭機在高点検 -->
              <tr>
                <th>{{ $t("F00001.S090") }}</th>
                <td colspan="2">
                  <div class="inline-radio" style="background-color: transparent;">
                    <div>
                      <input
                        type="radio"
                        name="changeMachineInventoryCheck"
                        id="changeMachineInventoryCheckValid"
                        :checked="userData.posOperationPermission.changeMachineInventoryCheck == 1"
                        @change="onRadioChange"
                        tabindex="-1">
                      <label
                        tabindex="128"
                        class="scrollNone">{{ $t("F00001.S071") }}</label>
                    </div>
                    <div style="margin-left:10px">
                      <input
                        type="radio"
                        name="changeMachineInventoryCheck"
                        id="changeMachineInventoryCheckInvalid"
                        :checked="userData.posOperationPermission.changeMachineInventoryCheck != 1"
                        @change="onRadioChange"
                        tabindex="-1">
                      <label
                        tabindex="129"
                        class="scrollNone">{{ $t("F00001.S072") }}</label>
                    </div>
                  </div>
                </td>
              </tr>
               <!-- 入金機回収 -->
              <tr>
                <th>{{ $t("F00001.S087") }}</th>
                <td colspan="2">
                  <div class="inline-radio" style="background-color: transparent;">
                    <div>
                      <input
                        type="radio"
                        name="changeMachineRemaining"
                        id="changeMachineRemainingValid"
                        :checked="userData.posOperationPermission.changeMachineRemaining == 1"
                        @change="onRadioChange"
                        tabindex="-1">
                      <label
                        tabindex="130"
                        class="scrollNone">{{ $t("F00001.S071") }}</label>
                    </div>
                    <div style="margin-left:10px">
                      <input
                        type="radio"
                        name="changeMachineRemaining"
                        id="changeMachineRemainingInvalid"
                        :checked="userData.posOperationPermission.changeMachineRemaining != 1"
                        @change="onRadioChange"
                        tabindex="-1">
                      <label
                        tabindex="131"
                        class="scrollNone">{{ $t("F00001.S072") }}
                      </label>
                    </div>
                  </div>
                </td>
              </tr>
               <!-- 釣銭機接続／切離 -->
              <tr>
                <th>{{ $t("F00001.S088") }}</th>
                <td colspan="2">
                  <div class="inline-radio" style="background-color: transparent;">
                    <div>
                      <input
                        type="radio"
                        name="changeMachineConnectDisconnect"
                        id="changeMachineConnectDisconnectValid"
                        :checked="userData.posOperationPermission.changeMachineConnectDisconnect == 1"
                        @change="onRadioChange"
                        tabindex="-1">
                      <label
                        tabindex="132"
                        class="scrollNone">{{ $t("F00001.S071") }}</label>
                    </div>
                    <div style="margin-left:10px">
                      <input
                        type="radio"
                        name="changeMachineConnectDisconnect"
                        id="changeMachineConnectDisconnectInvalid"
                        :checked="userData.posOperationPermission.changeMachineConnectDisconnect != 1"
                        @change="onRadioChange"
                        tabindex="-1">
                      <label
                        tabindex="133"
                        class="scrollNone">{{ $t("F00001.S072") }}</label>
                    </div>
                  </div>
                </td>
              </tr>
              <!-- KSD V001.000 AE -->
              <!-- レポート -->
              <!-- KSD V001.000 DS -->
              <!-- <tr v-if="userData.headquartersPermission == 0"> -->
              <!-- KSD V001.000 DE -->
              <!-- KSD V001.000 AS -->
              <tr>
              <!-- KSD V001.000 AE -->
                <th>{{ $t("F00001.S074") }}</th>
                <td colspan="2">
                  <div
                    class="inline-radio"
                    style="background-color: transparent;">
                    <div>
                      <input
                        type="radio"
                        name="report"
                        id="reportValid"
                        :checked="userData.posOperationPermission.report == 1"
                        @change="onRadioChange"
                        tabindex="-1">
                      <!-- KSD V001.000 MS -->
                      <!-- <label
                             tabindex="128"
                             class="scrollNone">{{ $t("F00001.S071") }}</label> -->
                      <label
                        tabindex="134"
                        class="scrollNone">{{ $t("F00001.S071") }}</label>
                      <!-- KSD V001.000 ME -->
                    </div>
                    <div style="margin-left:10px">
                      <input
                        type="radio"
                        name="report"
                        id="reportInvalid"
                        :checked="userData.posOperationPermission.report != 1"
                        @change="onRadioChange"
                        tabindex="-1">
                      <!-- KSD V001.000 MS -->
                      <!-- <label
                             tabindex="129"
                             class="scrollNone">{{ $t("F00001.S072") }}</label> -->
                      <label
                        tabindex="135"
                        class="scrollNone">{{ $t("F00001.S072") }}</label>
                      <!-- KSD V001.000 ME -->
                    </div>
                  </div>
                </td>
              </tr>
              <!-- 取引検索 -->
              <!-- KSD V001.000 DS -->
              <!-- <tr v-if="userData.headquartersPermission == 0"> -->
              <!-- KSD V001.000 DE -->
              <!-- KSD V001.000 AS -->
              <tr>
              <!-- KSD V001.000 AE -->
                <th>{{ $t("F00001.S075") }}</th>
                <td colspan="2">
                  <div
                    class="inline-radio"
                    style="background-color: transparent;">
                    <div>
                      <input
                        type="radio"
                        name="transactionSearch"
                        id="transactionSearchValid"
                        :checked="userData.posOperationPermission.transactionSearch == 1"
                        @change="onRadioChange"
                        tabindex="-1">
                      <!-- KSD V001.000 MS -->
                      <!-- <label
                             tabindex="130"
                             class="scrollNone">{{ $t("F00001.S071") }}</label> -->
                      <label
                        tabindex="136"
                        class="scrollNone">{{ $t("F00001.S071") }}</label>
                      <!-- KSD V001.000 ME -->
                    </div>
                    <div style="margin-left:10px">
                      <input
                        type="radio"
                        name="transactionSearch"
                        id="transactionSearchInvalid"
                        :checked="userData.posOperationPermission.transactionSearch != 1"
                        @change="onRadioChange"
                        tabindex="-1">
                      <!-- KSD V001.000 MS -->
                      <!-- <label
                             tabindex="131"
                             class="scrollNone">{{ $t("F00001.S072") }}</label> -->
                      <label
                        tabindex="137"
                        class="scrollNone">{{ $t("F00001.S072") }}</label>
                      <!-- KSD V001.000 ME -->
                    </div>
                  </div>
                </td>
              </tr>
              <!-- レジマイナス -->
              <!-- KSD V001.000 DS -->
              <!-- <tr v-if="userData.headquartersPermission == 0"> -->
              <!-- KSD V001.000 DE -->
              <!-- KSD V001.000 AS -->
              <tr>
              <!-- KSD V001.000 AE -->
                <th>{{ $t("F00001.S070") }}</th>
                <td colspan="2">
                  <div
                    class="inline-radio"
                    style="background-color: transparent;">
                    <div>
                      <input
                        type="radio"
                        name="registerMinus"
                        id="registerMinusValid"
                        :checked="userData.posOperationPermission.registerMinus == 1"
                        @change="onRadioChange"
                        tabindex="-1">
                      <!-- KSD V001.000 MS -->
                      <!-- <label
                             tabindex="132"
                             class="scrollNone">{{ $t("F00001.S071") }}</label> -->
                      <label
                        tabindex="138"
                        class="scrollNone">{{ $t("F00001.S071") }}</label>
                      <!-- KSD V001.000 ME -->
                    </div>
                    <div style="margin-left:10px">
                      <input
                        type="radio"
                        name="registerMinus"
                        id="registerMinusInvalid"
                        :checked="userData.posOperationPermission.registerMinus != 1"
                        @change="onRadioChange"
                        tabindex="-1">
                      <!-- KSD V001.000 MS -->
                      <!-- <label
                             tabindex="133"
                             class="scrollNone">{{ $t("F00001.S072") }}</label> -->
                      <label
                        tabindex="139"
                        class="scrollNone">{{ $t("F00001.S072") }}</label>
                      <!-- KSD V001.000 ME -->
                    </div>
                  </div>
                </td>
              </tr>
              <!-- 返品 -->
              <!-- KSD V001.000 DS -->
              <!-- <tr v-if="userData.headquartersPermission == 0"> -->
              <!-- KSD V001.000 DE -->
              <!-- KSD V001.000 AS -->
              <tr>
              <!-- KSD V001.000 AE -->
                <th>{{ $t("F00001.S067") }}</th>
                <td colspan="2">
                  <div
                    class="inline-radio"
                    style="background-color: transparent;">
                    <div>
                      <input
                        type="radio"
                        name="return"
                        id="returnValue"
                        :checked="userData.posOperationPermission.returnValue == 1"
                        @change="onRadioChange"
                        tabindex="-1">
                      <!-- KSD V001.000 MS -->
                      <!-- <label
                             tabindex="134"
                             class="scrollNone">{{ $t("F00001.S071") }}</label> -->
                      <label
                        tabindex="140"
                        class="scrollNone">{{ $t("F00001.S071") }}</label>
                      <!-- KSD V001.000 ME -->
                    </div>
                    <div style="margin-left:10px">
                      <input
                        type="radio"
                        name="return"
                        id="returnValue"
                        :checked="userData.posOperationPermission.returnValue != 1"
                        @change="onRadioChange"
                        tabindex="-1">
                      <!-- KSD V001.000 MS -->
                      <!-- <label
                             tabindex="135"
                             class="scrollNone">{{ $t("F00001.S072") }}</label> -->
                      <label
                        tabindex="141"
                        class="scrollNone">{{ $t("F00001.S072") }}</label>
                      <!-- KSD V001.000 ME -->
                    </div>
                  </div>
                </td>
              </tr>
              <!-- 監査 -->
              <!-- KSD V001.000 DS -->
              <!-- <tr v-if="userData.headquartersPermission == 0"> -->
              <!-- KSD V001.000 DE -->
              <!-- KSD V001.000 AS -->
              <tr>
              <!-- KSD V001.000 AE -->
                <th>{{ $t("F00001.S076") }}</th>
                <td colspan="2">
                  <div
                    class="inline-radio"
                    style="background-color: transparent;">
                    <div>
                      <input
                        type="radio"
                        name="audit"
                        id="auditValid"
                        :checked="userData.posOperationPermission.audit == 1"
                        @change="onRadioChange"
                        tabindex="-1">
                      <!-- KSD V001.000 MS -->
                      <!-- <label
                             tabindex="136"
                             class="scrollNone">{{ $t("F00001.S071") }}</label> -->
                      <label
                        tabindex="142"
                        class="scrollNone">{{ $t("F00001.S071") }}</label>
                      <!-- KSD V001.000 ME -->
                    </div>
                    <div style="margin-left:10px">
                      <input
                        type="radio"
                        name="audit"
                        id="auditInvalid"
                        :checked="userData.posOperationPermission.audit != 1"
                        @change="onRadioChange"
                        tabindex="-1">
                      <!-- KSD V001.000 MS -->
                      <!-- <label
                             tabindex="137"
                             class="scrollNone">{{ $t("F00001.S072") }}</label> -->
                      <label
                        tabindex="143"
                        class="scrollNone">{{ $t("F00001.S072") }}</label>
                      <!-- KSD V001.000 ME -->
                    </div>
                  </div>
                </td>
              </tr>
              <!-- 清算 -->
              <!-- KSD V001.000 DS -->
              <!-- <tr v-if="userData.headquartersPermission == 0"> -->
              <!-- KSD V001.000 DE -->
              <!-- KSD V001.000 AS -->
              <tr>
              <!-- KSD V001.000 AE -->
                <th>{{ $t("F00001.S077") }}</th>
                <td colspan="2">
                  <div
                    class="inline-radio"
                    style="background-color: transparent;">
                    <div>
                      <input
                        type="radio"
                        name="calculate"
                        id="calculateValid"
                        :checked="userData.posOperationPermission.calculate == 1"
                        @change="onRadioChange"
                        tabindex="-1">
                      <!-- KSD V001.000 MS -->
                      <!-- <label
                             tabindex="138"
                             class="scrollNone">{{ $t("F00001.S071") }}</label> -->
                      <label
                        tabindex="144"
                        class="scrollNone">{{ $t("F00001.S071") }}</label>
                      <!-- KSD V001.000 ME -->
                    </div>
                    <div style="margin-left:10px">
                      <input
                        type="radio"
                        name="calculate"
                        id="calculateInvalid"
                        :checked="userData.posOperationPermission.calculate != 1"
                        @change="onRadioChange"
                        tabindex="-1">
                      <!-- KSD V001.000 MS -->
                      <!-- <label
                             tabindex="139"
                             class="scrollNone">{{ $t("F00001.S072") }}</label> -->
                      <label
                        tabindex="145"
                        class="scrollNone">{{ $t("F00001.S072") }}</label>
                      <!-- KSD V001.000 ME -->
                    </div>
                  </div>
                </td>
              </tr>
              <!-- KSD V001.000 AS -->
              <!-- 両替 -->
              <tr>
                <th>{{ $t("F00001.S089") }}</th>
                <td colspan="2">
                  <div class="inline-radio" style="background-color: transparent;">
                    <div>
                      <input
                        type="radio"
                        name="exchange"
                        id="exchangeValid"
                        :checked="userData.posOperationPermission.exchange == 1"
                        @change="onRadioChange"
                        tabindex="-1">
                      <label
                        tabindex="146"
                        class="scrollNone">{{ $t("F00001.S071") }}</label>
                    </div>
                    <div style="margin-left:10px">
                      <input
                        type="radio"
                        name="exchange"
                        id="exchangeInvalid"
                        :checked="userData.posOperationPermission.exchange != 1"
                        @change="onRadioChange"
                        tabindex="-1">
                      <label
                        tabindex="147"
                        class="scrollNone">{{ $t("F00001.S072") }}</label>
                    </div>
                  </div>
                </td>
              </tr>
              <!-- 手持在高入力 -->
              <tr>
                <th>{{ $t("F00001.S091") }}</th>
                <td colspan="2">
                  <div class="inline-radio" style="background-color: transparent;">
                    <div>
                      <input
                        type="radio"
                        name="amountInput"
                        id="amountInputValid"
                        :checked="userData.posOperationPermission.amountInput == 1"
                        @change="onRadioChange"
                        tabindex="-1">
                      <label
                        tabindex="148"
                        class="scrollNone">{{ $t("F00001.S071") }}</label>
                    </div>
                    <div style="margin-left:10px">
                      <input
                        type="radio"
                        name="amountInput"
                        id="amountInputInvalid"
                        :checked="userData.posOperationPermission.amountInput != 1"
                        @change="onRadioChange"
                        tabindex="-1">
                      <label
                        tabindex="149"
                        class="scrollNone">{{ $t("F00001.S072") }}</label>
                    </div>
                  </div>
                </td>
              </tr>
              <!-- OESプログラム送信 -->
              <tr>
                <th>{{ $t("F00001.S092") }}</th>
                <td colspan="2">
                  <div class="inline-radio" style="background-color: transparent;">
                    <div>
                      <input
                        type="radio"
                        name="oesProg"
                        id="oesProgValid"
                        :checked="userData.posOperationPermission.oesProg == 1"
                        @change="onRadioChange"
                        tabindex="-1">
                      <label
                        tabindex="150"
                        class="scrollNone">{{ $t("F00001.S071") }}</label>
                    </div>
                    <div style="margin-left:10px">
                      <input
                        type="radio"
                        name="oesProg"
                        id="oesProgInvalid"
                        :checked="userData.posOperationPermission.oesProg != 1"
                        @change="onRadioChange"
                        tabindex="-1">
                      <label
                        tabindex="151"
                        class="scrollNone">{{ $t("F00001.S072") }}</label>
                    </div>
                  </div>
                </td>
              </tr>
              <!-- OES設定送信 -->
              <tr>
                <th>{{ $t("F00001.S093") }}</th>
                <td colspan="2">
                  <div class="inline-radio" style="background-color: transparent;">
                    <div>
                      <input
                        type="radio"
                        name="oesSet"
                        id="oesSetValid"
                        :checked="userData.posOperationPermission.oesSet == 1"
                        @change="onRadioChange"
                        tabindex="-1">
                      <label
                        tabindex="152"
                        class="scrollNone">{{ $t("F00001.S071") }}</label>
                    </div>
                    <div style="margin-left:10px">
                      <input
                        type="radio"
                        name="oesSet"
                        id="oesSetInvalid"
                        :checked="userData.posOperationPermission.oesSet != 1"
                        @change="onRadioChange"
                        tabindex="-1">
                      <label
                        tabindex="153"
                        class="scrollNone">{{ $t("F00001.S072") }}</label>
                    </div>
                  </div>
                </td>
              </tr>
              <!-- 一部訂正 -->
              <tr>
                <th>{{ $t("F00001.S094") }}</th>
                <td colspan="2">
                  <div class="inline-radio" style="background-color: transparent;">
                    <div>
                      <input
                        type="radio"
                        name="partCorrcet"
                        id="partCorrcetValid"
                        :checked="userData.posOperationPermission.partCorrcet == 1"
                        @change="onRadioChange"
                        tabindex="-1">
                      <label
                        tabindex="154"
                        class="scrollNone">{{ $t("F00001.S071") }}</label>
                    </div>
                    <div style="margin-left:10px">
                      <input
                        type="radio"
                        name="partCorrcet"
                        id="partCorrcetInvalid"
                        :checked="userData.posOperationPermission.partCorrcet != 1"
                        @change="onRadioChange"
                        tabindex="-1">
                      <label
                        tabindex="155"
                        class="scrollNone">{{ $t("F00001.S072") }}</label>
                    </div>
                  </div>
                </td>
              </tr>
              <!-- 締め訂正 -->
              <tr>
                <th>{{ $t("F00001.S095") }}</th>
                <td colspan="2">
                  <div class="inline-radio" style="background-color: transparent;">
                    <div>
                      <input
                        type="radio"
                        name="tendCorrcet"
                        id="tendCorrcetValid"
                        :checked="userData.posOperationPermission.tendCorrcet == 1"
                        @change="onRadioChange"
                        tabindex="-1">
                      <label
                        tabindex="156"
                        class="scrollNone">{{ $t("F00001.S071") }}</label>
                    </div>
                    <div style="margin-left:10px">
                      <input
                        type="radio"
                        name="tendCorrcet"
                        id="tendCorrcetInvalid"
                        :checked="userData.posOperationPermission.tendCorrcet != 1"
                        @change="onRadioChange"
                        tabindex="-1">
                      <label
                        tabindex="157"
                        class="scrollNone">{{ $t("F00001.S072") }}</label>
                    </div>
                  </div>
                </td>
              </tr>
              <!-- 未会計オーダー取消 -->
              <tr>
                <th>{{ $t("F00001.S096") }}</th>
                <td colspan="2">
                  <div class="inline-radio" style="background-color: transparent;">
                    <div>
                      <input
                        type="radio"
                        name="unpaidDelete"
                        id="unpaidDeleteValid"
                        :checked="userData.posOperationPermission.unpaidDelete == 1"
                        @change="onRadioChange"
                        tabindex="-1">
                      <label
                        tabindex="158"
                        class="scrollNone">{{ $t("F00001.S071") }}</label>
                    </div>
                    <div style="margin-left:10px">
                      <input
                        type="radio"
                        name="unpaidDelete"
                        id="unpaidDeleteInvalid"
                        :checked="userData.posOperationPermission.unpaidDelete != 1"
                        @change="onRadioChange"
                        tabindex="-1">
                      <label
                        tabindex="159"
                        class="scrollNone">{{ $t("F00001.S072") }}</label>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th>{{ $t("F00001.S097") }}</th>
                <td colspan="2">
                  <div class="inline-radio" style="background-color: transparent;">
                    <div>
                      <input
                        type="radio"
                        name="oesTime"
                        id="oesTimeValid"
                        :checked="userData.posOperationPermission.oesTime == 1"
                        @change="onRadioChange"
                        tabindex="-1">
                      <label
                        tabindex="160"
                        class="scrollNone">{{ $t("F00001.S071") }}</label>
                    </div>
                    <div style="margin-left:10px">
                      <input
                        type="radio"
                        name="oesTime"
                        id="oesTimeInvalid"
                        :checked="userData.posOperationPermission.oesTime != 1"
                        @change="onRadioChange"
                        tabindex="-1">
                      <label
                        tabindex="161"
                        class="scrollNone">{{ $t("F00001.S072") }}</label>
                    </div>
                  </div>
                </td>
              </tr>
              <!-- KSD V001.000 AE -->
              <!-- G005.00.1 Add-Start -->
            </template>
            <!-- G005.00.1 Add-End -->
          </table>
        </div>
        <v-card-actions class="dialog-fotter">
          <v-spacer/>
          <div class="deleteButton">
            <!-- KSD V001.000 DS -->
            <!-- <v-btn -->
            <!--   class="button dialog-fotter-button-blue footerButtonStyle" -->
            <!--   @click="onClickDelete()" -->
            <!--   v-if="mode === 2" -->
            <!--   tabindex="111" -->
            <!--   :disabled="(!$root.approvalFlg && !$root.deleteAuth) || !this.permissions.includes('CLOUDPOS_USER_DELETE')"> -->
            <!--   {{ $t("O00004.S024") }} -->
            <!-- </v-btn> -->
            <!-- KSD V001.000 DE -->
            <!-- KSD V001.000 AS -->
            <v-btn
              class="button dialog-fotter-button-blue footerButtonStyle"
              @click="onClickDelete()"
              v-if="mode === 2"
              tabindex="162"
              :disabled="(!$root.approvalFlg && !$root.deleteAuth) || !this.permissions.includes('CLOUDPOS_USER_DELETE')">
              {{ $t("O00004.S024") }}
            </v-btn>
            <!-- KSD V001.000 AE -->
          </div>
          <!-- KSD V001.000 DS -->
          <!-- <v-btn -->
          <!--   class="button dialog-fotter-button-gray footerButtonStyle" -->
          <!--   @click="onClickReturn()" -->
          <!--   tabindex="112"> -->
          <!--   {{ $t("O00004.S003") }} -->
          <!-- </v-btn> -->
          <!-- <v-btn -->
          <!--   class="button dialog-fotter-button-orange footerButtonStyle" -->
          <!--   @click="onClickSave()" -->
          <!--   :disabled="(operationLock || (!$root.approvalFlg && !$root.registerAuth)) || !this.permissions.includes('CLOUDPOS_USER_UPDATE')" -->
          <!--   tabindex="113"> -->
          <!--   {{ $t("O00004.S008") }} -->
          <!-- </v-btn> -->
          <!-- KSD V001.000 DE -->
          <!-- KSD V001.000 AS -->
          <v-btn
            class="button dialog-fotter-button-gray footerButtonStyle"
            @click="onClickReturn()"
            tabindex="163">
            {{ $t("O00004.S003") }}
          </v-btn>
          <v-btn
            class="button dialog-fotter-button-orange footerButtonStyle"
            @click="onClickSave()"
            :disabled="(operationLock || (!$root.approvalFlg && !$root.registerAuth)) || !this.permissions.includes('CLOUDPOS_USER_UPDATE')"
            tabindex="164">
            {{ $t("O00004.S008") }}
          </v-btn>
          <!-- KSD V001.000 AE -->
        </v-card-actions>
      </v-card>
    </v-dialog>
    <popup ref="pop"/>
    <dialog-store-select
      ref="dialogStoreSelect"
      @clickSubmit="storeSelectOk"/>
  </div>
</template>
<!-- G006.00.0 Add-Start -->
<style scoped>
#readPosPassword{
  background: #fff;
  background-color: #e9e9e9;
  box-sizing: border-box;
  display: block;
  outline: 0;
  cursor:not-allowed;
  padding-right: 30px !important;
}

#inputPosPassword{
  background: #fff;
  background-color: #fff;
  box-sizing: border-box;
  display: block;
  outline: 0;
  font-family: inherit;
  padding-right: 30px !important;
}

#inputPosPassword:focus {
  height: 100%;
  outline:solid 2px #ff9508;
  outline-offset: -2px;
}

#errorPosPassword{
  background: #fff;
  border:1px solid #f39e9e;
  color: #000;
  background-color: #fcd4d4;
  height: 100%;
  box-sizing: border-box;
  display: block;
  width: 70%;
  border-width: 1px;
  border-style: solid;
  padding-left: 10px;
  padding-right: 30px;
  outline: 0;
  font-family: inherit;
}

#errorPosPassword:focus {
  border: 2px solid #E93232;
  outline:solid 2px #FCD4D4;
  outline-offset: -2px;
}
</style>
<!-- G006.00.0 Add-End -->
