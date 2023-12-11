<!--
 * ---------+---------------------+----------+--------------------------------
 *  DATE    |NAME(Inc)            |GUIDE     |GUIDANCE
 * ---------+---------------------+----------+--------------------------------
 * 20230603  wupsh(Neusoft)        G001.00.0  Eslintを対応します.
-->
<style src="./../../static/css/CorporateMaster/corporateDialog.css"></style>
<script type="text/javascript" src="./../../static/js/CorporateMaster/corporateEditDialog.js"></script>
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
              v-if="mode === 1"><b>{{ $t("F00004.S010") }}</b></label>
            <label
              id="changeModelabel"
              v-if="mode === 2"><b>{{ $t("F00004.S012") }}</b></label>
          </div>
          <font class="dialog-title">{{ title }}</font>
        </v-card-title>
        <div id="baseTable">
          <table id="corporateTable">
            <!-- コード -->
            <tr>
              <th>{{ $t("F00004.S014") }}</th>
              <td>
                <input
                  type="text"
                  :id="'readOnlyText'"
                  ref="businessUnitCdText"
                  v-model="corporateData.businessUnitCd"
                  :disabled=true
                  style="ime-mode:disabled;font-family: 'Migu 1P';"
                  maxlength="6"
                  :tabindex="-1" >
              </td>
            </tr>
            <!-- 企業名称 -->
            <tr>
              <th>{{ $t("F00004.S015") }}</th>
              <td>
                <input
                  type="text"
                  :class="this.nameErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'"
                  class="textCorporateName"
                  ref="nameText"
                  v-model="corporateData.name"
                  :placeholder="this.$i18n.t('F00004.S030')"
                  maxlength="30"
                  :tabindex="101"
                  :@input="inputLimit(corporateData.name,30)">
              </td>
            </tr>
            <!-- 企業名称(エラーメッセージ) -->
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
            <!-- 郵便番号 -->
            <tr>
              <th>{{ $t("F00004.S016") }}</th>
              <td>
                <input
                  type="text"
                  :class="this.postNoErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'"
                  class="textPostNo"
                  ref="postNoText"
                  v-model="corporateData.postNo"
                  maxlength="8"
                  @input="postNoTextInput('postNo')"
                  :tabindex="102" >
              </td>
            </tr>
            <!-- 郵便番号(エラーメッセージ) -->
            <tr
              v-if="this.postNoErrorMsg !== ''"
              class="errorCell">
              <th />
              <td colspan="2">
                <div
                  v-for="postNoMsg in postNoErrorMsg"
                  :key="postNoMsg">
                  <label>{{ postNoMsg }}</label>
                </div>
              </td>
            </tr>
            <!-- 住所 -->
            <tr>
              <th>{{ $t("F00004.S017") }}</th>
              <td>
                <textarea
                  cols="20"
                  rows="2"
                  wrap="soft"
                  :class="this.addressErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'"
                  class="textAddress"
                  ref="addressText"
                  v-model="corporateData.address"
                  @keydown.enter.exact.prevent
                  @keydown.enter.shift.exact.prevent
                  @paste="pasteAddressText()"
                  @input="inputLimit(corporateData.address,40)"
                  maxlength="40"
                  :tabindex="103" />
              </td>
            </tr>
            <!-- 住所(エラーメッセージ) -->
            <tr
              v-if="this.addressErrorMsg !== ''"
              class="errorCell">
              <th />
              <td colspan="2">
                <div
                  v-for="addressMsg in addressErrorMsg"
                  :key="addressMsg">
                  <label>{{ addressMsg }}</label>
                </div>
              </td>
            </tr>
            <!-- 電話番号 -->
            <tr>
              <th>{{ $t("F00004.S018") }}</th>
              <td>
                <input
                  type="text"
                  :class="this.telNoErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'"
                  class="textTelNo"
                  ref="telNoText"
                  v-model="corporateData.telNo"
                  maxlength="16"
                  @input="postNoTextInput('telNo')"
                  :tabindex="104" >
              </td>
            </tr>
            <!-- 電話番号(エラーメッセージ) -->
            <tr
              v-if="this.telNoErrorMsg !== ''"
              class="errorCell">
              <th />
              <td colspan="2">
                <div
                  v-for="telNoMsg in telNoErrorMsg"
                  :key="telNoMsg">
                  <label>{{ telNoMsg }}</label>
                </div>
              </td>
            </tr>
            <!-- FAX番号 -->
            <tr>
              <th>{{ $t("F00004.S019") }}</th>
              <td>
                <input
                  type="text"
                  :class="this.faxNoErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'"
                  class="textFaxNo"
                  ref="faxNoText"
                  v-model="corporateData.faxNo"
                  maxlength="16"
                  @input="postNoTextInput('faxNo')"
                  :tabindex="105" >
              </td>
            </tr>
            <!-- FAX番号(エラーメッセージ) -->
            <tr
              v-if="this.faxNoErrorMsg !== ''"
              class="errorCell">
              <th />
              <td colspan="2">
                <div
                  v-for="faxNoMsg in faxNoErrorMsg"
                  :key="faxNoMsg">
                  <label>{{ faxNoMsg }}</label>
                </div>
              </td>
            </tr>
            <!-- 契約代表者名
          <tr>
            <th>{{ $t("F00004.S020") }}</th>
            <td>
              <input type="text" :class="this.contractRepresentativeNameErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'" class="textContractRepresentativeName" ref="contractRepresentativeNameText" v-model="corporateData.contractRepresentativeName" :tabindex="106" />
            </td>
          </tr> -->
            <!-- 契約代表者名(エラーメッセージ)
          <tr v-if="this.contractRepresentativeNameErrorMsg !== ''" class="errorCell">
            <th />
            <td colspan="2">
              <div v-for="contractRepresentativeNameMsg in contractRepresentativeNameErrorMsg" :key="contractRepresentativeNameMsg">
                <label>{{ contractRepresentativeNameMsg }}</label>
              </div>
            </td>
          </tr>-->
            <!-- 契約サービス
          <tr>
            <th>{{ $t("F00004.S021") }}</th>
            <div style="margin: -2px" v-for="(contractServicesItem,index) in contractServices" :key="contractServicesItem.key">
              <td>
                <label :tabindex="serviceDisable ? '' : 106 + (index * 2) + 1" style="width:50px; margin-left: 10px;" id="checkLabel" :class="'checkLabel'+index" @keydown.space="onCheckKey(index)" class="scrollNone" >
                  <input :id="'check'+index" type="checkbox" v-model="contractServicesItem.checked" :disabled="mode===1 || parentDataList.contractServiceParents.length===0">
                  <span class="corporateCheckbox" v-bind:class="mode === 1 ? 'disabled' : ''"/>
                </label>
                <label>{{contractServicesItem.contractServiceParentCd}}{{ $t("F00004.S022") }}{{contractServicesItem.contractServiceParentName}}</label>
                <hr>
                <div style="height: 40pt;" :class="contractServicesErrorMsg[index] !== '' ? 'errorTextBox' : ''">
                  <input type="text" :class="contractServicesErrorMsg[index] !== '' ? '' : 'editTextBox'" class="textContractServices" ref="contractServicesText" v-model="contractServicesItem.storeNum" :disabled=true :title="contractServicesItem.storeName" />
                  <div class="buttomLabel">
                    <v-btn :tabindex="106 + (index * 2) + 2" style="width: 28px; height: 40px;" @click="storeSelect(index)" :disabled="mode===1 || parentDataList.contractServiceParents.length===0">
                      <span class="rightArrow" />
                    </v-btn>
                  </div>
                </div>
                契約サービス(エラーメッセージ)
                <div v-if="contractServicesErrorMsg[index] !== ''">
                <hr>
                  <div v-for="childCdMsg in contractServicesErrorMsg[index]" :key="childCdMsg">
                    <label style="color: #f00;">{{ childCdMsg }}</label>
                  </div>
                </div>
              </td>
            </div>
          </tr>-->
            <!-- 請求日付
          <tr>
            <th>{{ $t("F00004.S025") }}</th>
            <td>
              <input type="text" :class="this.billingDateErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'" class="textBillingDate NumericStyle" ref="billingDateText" v-model="corporateData.billingDate" maxlength="2" @input="numInputRegulation" :tabindex="107 + contractServices.length * 2 + 1" />
            </td>
          </tr>-->
            <!-- 請求日付(エラーメッセージ)
          <tr v-if="this.billingDateErrorMsg !== ''" class="errorCell">
            <th />
            <td colspan="2">
              <div v-for="billingDateMsg in billingDateErrorMsg" :key="billingDateMsg">
                <label>{{ billingDateMsg }}</label>
              </div>
            </td>
          </tr>-->
            <!-- 請求確定時刻
          <tr>
            <th>{{ $t("F00004.S026") }}</th>
            <td>
              <input type="text" :class="this.billingTimeErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'" class="textBillingTime NumericStyle" ref="billingTimeText" v-model="corporateData.billingTime" maxlength="4" @input="numInputRegulation" :tabindex="108 + contractServices.length * 2 + 2" />
            </td>
          </tr>-->
            <!-- 請求確定時刻(エラーメッセージ)
          <tr v-if="this.billingTimeErrorMsg !== ''" class="errorCell">
            <th />
            <td colspan="2">
              <div v-for="billingTimeMsg in billingTimeErrorMsg" :key="billingTimeMsg">
                <label>{{ billingTimeMsg }}</label>
              </div>
            </td>
          </tr>-->
            <!-- スマートレシート連携企業コード -->
            <tr>
              <th>{{ $t("F00004.S033") }}</th>
              <td>
                <input
                  type="text"
                  :class="this.smartReceiptCodeErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'"
                  class="textSmartReceiptCode"
                  ref="smartReceiptCodeText"
                  v-model="corporateData.smartReceiptCode"
                  maxlength="10"
                  @input="numInputRegulation"
                  :tabindex="109" >
              </td>
            </tr>
            <!-- スマートレシート連携企業コード(エラーメッセージ) -->
            <tr
              v-if="this.smartReceiptCodeErrorMsg !== ''"
              class="errorCell">
              <th />
              <td colspan="2">
                <div
                  v-for="smartReceiptCodeMsg in smartReceiptCodeErrorMsg"
                  :key="smartReceiptCodeMsg">
                  <label>{{ smartReceiptCodeMsg }}</label>
                </div>
              </td>
            </tr>
            <!-- インボイス発行事業者 -->
            <tr>
              <th>{{ $t("F00004.S034") }}</th>
              <td>
                <input
                  type="text"
                  :class="this.invoiceIssueNameErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'"
                  class="textInvoiceIssueName"
                  ref="invoiceIssueNameText"
                  v-model="corporateData.invoiceIssueName"
                  maxlength="30"
                  :tabindex="110"
                  @input="inputLimit(corporateData.invoiceIssueName,30)">
              </td>
            </tr>
            <!-- インボイス発行事業者(エラーメッセージ) -->
            <tr
              v-if="this.invoiceIssueNameErrorMsg !== ''"
              class="errorCell">
              <th />
              <td colspan="2">
                <div
                  v-for="invoiceIssueNameMsg in invoiceIssueNameErrorMsg"
                  :key="invoiceIssueNameMsg">
                  <label>{{ invoiceIssueNameMsg }}</label>
                </div>
              </td>
            </tr>
            <!-- 登録事業者番号 -->
            <tr>
              <th>{{ $t("F00004.S035") }}</th>
              <td>
                <!-- G001.00.0 Update-Start -->
                <!-- <input
                  type="text"
                  :class="this.registerBusinessCodeErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'"
                  class="textRegisterBusinessCodeName"
                  ref="registerBusinessCodeText"
                  v-model="corporateData.registerBusinessCode"
                  maxlength="14"
                  :tabindex="111"
                  @input=""> -->
                <input
                  type="text"
                  :class="this.registerBusinessCodeErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'"
                  class="textRegisterBusinessCodeName"
                  ref="registerBusinessCodeText"
                  v-model="corporateData.registerBusinessCode"
                  maxlength="14"
                  :tabindex="111"
                >
                <!-- G001.00.0 Update-Start -->
              </td>
            </tr>
            <!-- 登録事業者番号(エラーメッセージ) -->
            <tr
              v-if="this.registerBusinessCodeErrorMsg !== ''"
              class="errorCell">
              <th />
              <td colspan="2">
                <div
                  v-for="registerBusinessCodeMsg in registerBusinessCodeErrorMsg"
                  :key="registerBusinessCodeMsg">
                  <label>{{ registerBusinessCodeMsg }}</label>
                </div>
              </td>
            </tr>
            <!-- KSD V001.000 AS -->
            <!-- 営業日の開始時刻 -->
            <tr>
              <th>{{ $t("F00004.S037") }}</th>
              <td>
                <input
                  type="time"
                  step="3600"
                  class='editTextBox'
                  ref="businessDayStartTimeText"
                  v-model="corporateData.configurations.BUSINESS_DAY_START_TIME.value"
                  @input="timeInputRegulation"
                  :tabindex="112"
                >
              </td>
            </tr>
            <!-- KSD V001.000 AE -->
            <!-- 利用開始月 -->
            <tr>
              <th>{{ $t("F00004.S027") }}</th>
              <td>
                <input
                  type="text"
                  :class="this.useStartMonthErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'"
                  class="textUseStartMonth NumericStyle"
                  ref="useStartMonthText"
                  v-model="corporateData.useStartMonth"
                  maxlength="6"
                  @input="numInputRegulation"
                  :tabindex="112 + contractServices.length * 2 + 3" >
              </td>
            </tr>
            <!-- 利用開始月(エラーメッセージ) -->
            <tr
              v-if="this.useStartMonthErrorMsg !== ''"
              class="errorCell">
              <th />
              <td colspan="2">
                <div
                  v-for="useStartMonthMsg in useStartMonthErrorMsg"
                  :key="useStartMonthMsg">
                  <label>{{ useStartMonthMsg }}</label>
                </div>
              </td>
            </tr>
            <!-- 利用終了月-->
            <tr>
              <th>{{ $t("F00004.S028") }}</th>
              <td>
                <input
                  type="text"
                  :class="this.useEndMonthErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'"
                  class="textUseEndMonth NumericStyle"
                  ref="useEndMonthText"
                  v-model="corporateData.useEndMonth"
                  maxlength="6"
                  @input="numInputRegulation"
                  :tabindex="113 + contractServices.length * 2 + 4" >
              </td>
            </tr>
            <!-- 利用終了月(エラーメッセージ)-->
            <tr
              v-if="this.useEndMonthErrorMsg !== ''"
              class="errorCell">
              <th />
              <td colspan="2">
                <div
                  v-for="useEndMonthMsg in useEndMonthErrorMsg"
                  :key="useEndMonthMsg">
                  <label>{{ useEndMonthMsg }}</label>
                </div>
              </td>
            </tr>
          </table>
        </div>
        <v-card-actions class="dialog-fotter">
          <v-spacer/>
          <div class="deleteButton">
            <v-btn
              class="button dialog-fotter-button-blue footerButtonStyle"
              @click="onClickDelete()"
              v-if="mode === 2"
              :disabled="(!$root.approvalFlg && !$root.deleteAuth) || sessionBusinessUnitCd === corporateData.businessUnitCd"
              :tabindex="114 + contractServices.length * 2 + 5">
              {{ $t("O00004.S024") }}
            </v-btn>
          </div>
          <v-btn
            class="button dialog-fotter-button-gray footerButtonStyle"
            @click="onClickReturn()"
            :tabindex="115 + contractServices.length * 2 + 6">
            {{ $t("O00004.S003") }}
          </v-btn>
          <v-btn
            class="button dialog-fotter-button-orange footerButtonStyle"
            @click="onClickSave()"
            :disabled="operationLock || (!$root.approvalFlg && !$root.registerAuth)"
            :tabindex="116 + contractServices.length * 2 + 7">
            {{ $t("O00004.S008") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <popup ref="pop"/>
    <dialog-store-select
      ref="dialogStoreSelect"
      @clickSubmit="storeSelectOk" />
  </div>
</template>
