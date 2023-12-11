<style src="./../../static/css/StoreMaster/storeMaster.css"></style>
<script type="text/javascript" src="./../../static/js/StoreMaster/storeEditDialog.js"></script>
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
              v-if="mode === 1"><b>{{ $t("F00003.S012") }}</b></label>
            <label
              id="changeModelabel"
              v-if="mode === 2"><b>{{ $t("F00003.S013") }}</b></label>
          </div>
          <font class="dialog-title">{{ title }}</font>
        </v-card-title>
        <div id="baseTable">
          <table id="storeTable">
            <!-- コード -->
            <tr>
              <th>{{ $t("F00003.S014") }}</th>
              <td>
                <input
                  type="text"
                  :id="'readOnlyText'"
                  ref="storeCdText"
                  v-model="storeData.storeCd"
                  :disabled=true
                  style="ime-mode:disabled;font-family: 'Migu 1P';"
                  maxlength="6"
                  tabindex="-1">
              </td>
            </tr>
            <!-- 名称 -->
            <tr>
              <th>{{ $t("F00003.S015") }}</th>
              <td>
                <textarea
                  cols="20"
                  rows="2"
                  wrap="soft"
                  :class="this.nameErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'"
                  class="textStoreName"
                  ref="nameText"
                  v-model="storeData.name"
                  @keydown.enter.exact.prevent
                  @keydown.enter.shift.exact.prevent
                  @paste="pasteAddressText()"
                  :placeholder="this.$i18n.t('F00003.S027')"
                  @input="inputLimit(storeData.name,30)"
                  maxlength="30"
                  tabindex="101"/>
              </td>
            </tr>
            <!-- 名称(エラーメッセージ) -->
            <tr
              v-if="this.nameErrorMsg !== ''"
              class="errorCell">
              <th />
              <td>
                <div
                  v-for="nameMsg in nameErrorMsg"
                  :key="nameMsg">
                  <label>{{ nameMsg }}</label>
                </div>
              </td>
            </tr>
            <!-- 郵便番号 -->
            <tr>
              <th>{{ $t("F00003.S016") }}</th>
              <td>
                <input
                  type="text"
                  :class="this.postNoErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'"
                  class="textPostNo"
                  ref="postNoText"
                  v-model="storeData.postNo"
                  maxlength="8"
                  @input="postNoTextInput('postNo')"
                  tabindex="102">
              </td>
            </tr>
            <!-- 郵便番号(エラーメッセージ) -->
            <tr
              v-if="this.postNoErrorMsg !== ''"
              class="errorCell">
              <th />
              <td>
                <div
                  v-for="postNoMsg in postNoErrorMsg"
                  :key="postNoMsg">
                  <label>{{ postNoMsg }}</label>
                </div>
              </td>
            </tr>
            <!-- 住所 -->
            <tr>
              <th>{{ $t("F00003.S017") }}</th>
              <td>
                <textarea
                  cols="20"
                  rows="2"
                  wrap="soft"
                  :class="this.addressErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'"
                  class="textAddress"
                  ref="addressText"
                  v-model="storeData.address"
                  @keydown.enter.exact.prevent
                  @keydown.enter.shift.exact.prevent
                  @paste="pasteAddressText()"
                  @input="inputLimit(storeData.address,40)"
                  maxlength="40"
                  tabindex="103"/>
              </td>
            </tr>
            <!-- 住所(エラーメッセージ) -->
            <tr
              v-if="this.addressErrorMsg !== ''"
              class="errorCell">
              <th />
              <td>
                <div
                  v-for="addressMsg in addressErrorMsg"
                  :key="addressMsg">
                  <label>{{ addressMsg }}</label>
                </div>
              </td>
            </tr>
            <!-- 電話番号 -->
            <tr>
              <th>{{ $t("F00003.S018") }}</th>
              <td>
                <input
                  type="text"
                  :class="this.telNoErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'"
                  class="textTelNo"
                  ref="telNoText"
                  v-model="storeData.phone"
                  maxlength="16"
                  @input="postNoTextInput('telNo')"
                  tabindex="104">
              </td>
            </tr>
            <!-- 電話番号(エラーメッセージ) -->
            <tr
              v-if="this.telNoErrorMsg !== ''"
              class="errorCell">
              <th />
              <td>
                <div
                  v-for="telNoMsg in telNoErrorMsg"
                  :key="telNoMsg">
                  <label>{{ telNoMsg }}</label>
                </div>
              </td>
            </tr>
            <!-- FAX番号 -->
            <tr>
              <th>{{ $t("F00003.S019") }}</th>
              <td>
                <input
                  type="text"
                  :class="this.faxNoErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'"
                  class="textFaxNo"
                  ref="faxNoText"
                  v-model="storeData.fax"
                  maxlength="16"
                  @input="postNoTextInput('faxNo')"
                  tabindex="105">
              </td>
            </tr>
            <!-- FAX番号(エラーメッセージ) -->
            <tr
              v-if="this.faxNoErrorMsg !== ''"
              class="errorCell">
              <th />
              <td>
                <div
                  v-for="faxNoMsg in faxNoErrorMsg"
                  :key="faxNoMsg">
                  <label>{{ faxNoMsg }}</label>
                </div>
              </td>
            </tr>
            <!-- 運用形態  -->
            <tr>
              <th>{{ $t("F00003.S020") }}</th>
              <td>
                <select
                  v-model="storeData.operationForm"
                  class="SelectBox"
                  ref="operationalFormText"
                  tabindex="106">
                  <!-- <option v-for="oprItem in operationalDataList" :key="oprItem.storeOperationalFormCd" :value="oprItem.storeOperationalFormCd">{{ oprItem.storeOperationalFormName }}</option> -->
                  <option value="0" />
                  <option value="1" >店舗</option>
                  <option value="2" >倉庫</option>
                  <option value="3" >本部</option>
                </select>
                <div class="pulldownArrow"/>
              </td>
            </tr>
            <!-- イートイン
          <tr>
            <th>{{ $t("F00003.S021") }}</th>
            <td>
              <div class="inline-radio" style="background-color: transparent;">
                <div>
                  <input type="radio" name="eatIn" id="eatInValid" :checked="storeData.eatIn == 1" v-on:change="onRadioChange" tabindex="-1"><label @keydown.enter="enterValid" @keydown.space="enterValid" tabindex="107" class="scrollNone">{{ $t("F00003.S022") }}</label>
                </div>
                <div style="margin-left:10px">
                  <input type="radio" name="eatIn" id="eatInInvalid" :checked="storeData.eatIn != 1" v-on:change="onRadioChange" tabindex="-1"><label @keydown.enter="enterInvalid" @keydown.space="enterInvalid" tabindex="108" class="scrollNone">{{ $t("F00003.S023") }}</label>
                </div>
              </div>
            </td>
          </tr>-->
            <!-- 業態
          <tr>
            <th>{{ $t("F00003.S024") }}</th>
            <td>
              <select v-model="selectedGrp1" class="SelectBox" ref="storeGroup1Text" tabindex="109">
                <option v-for="groupItem in group1DataList.storeGroupInfos" :key="groupItem.storeGroupValue" :value="groupItem.storeGroupValue">{{ groupItem.storeGroupName }}</option>
              </select>
              <div class="pulldownArrow"></div>
            </td>
          </tr> -->
            <!-- 地区
          <tr>
            <th>{{ $t("F00003.S025") }}</th>
            <td>
              <select v-model="selectedGrp2" class="SelectBox" ref="storeGroup2Text" tabindex="110">
                <option v-for="groupItem in group2DataList.storeGroupInfos" :key="groupItem.storeGroupValue" :value="groupItem.storeGroupValue">{{ groupItem.storeGroupName }}</option>
              </select>
              <div class="pulldownArrow"></div>
            </td>
          </tr> -->
            <!-- 表示順 -->
            <tr>
              <th>{{ $t("F00003.S026") }}</th>
              <td>
                <!-- KSD V001.000 MS -->
                <!--
                <input
                  type="text"
                  :class="this.dspOrderErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'"
                  class="textDspOrder NumericStyle"
                  ref="dspOrderText"
                  v-model="displayOrder"
                  maxlength="3"
                  tabindex="111">
                -->
                <input
                  type="text"
                  :class="this.dspOrderErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'"
                  class="textDspOrder NumericStyle"
                  ref="dspOrderText"
                  v-model="displayOrder"
                  maxlength="3"
                  tabindex="107">
              <!-- KSD V001.000 ME -->
              </td>
            </tr>
            <!-- KSD V001.000 AS -->
            <tr>
              <th>{{ $t("F00003.S032") }}</th>
              <td>
                <input
                  type="time"
                  step="3600"
                  class='editTextBox'
                  v-model="startTime"
                  @input="timeInputRegulation"
                  ref="startTime"
                  tabindex="108">
              </td>
            </tr>
            <tr class ="text-wrap">
              <th >{{ $t("F00003.S035") }}</th>
              <td>
                <select
                  v-model="storeData.storeGroup1"
                  class="SelectBox"
                  ref="storeGroup1Text"
                  tabindex="111">
                  <!-- <option v-for="oprItem in operationalDataList" :key="oprItem.storeOperationalFormCd" :value="oprItem.storeOperationalFormCd">{{ oprItem.storeOperationalFormName }}</option> -->
                  <!-- <option value="0" ></option>
                <option value="1" >店舗</option>
                <option value="2" >倉庫</option>
                <option value="3" >本部</option> -->
                  <option value="0" >{{ $t("F00003.S031") }}</option>
                  <option
                    v-for="items in group1DataList.storeGroupInfos.value"
                    :key=" items.code + 'storeGroup1' "
                    :value="items.code"
                  >{{ `${items.displayName.default}` }}
                  </option>
                </select>
                <div class="pulldownArrow"/>
              </td>
            </tr>
            <tr>
              <th >{{ $t("F00003.S036") }}</th>
              <td>
                <select
                  v-model="storeData.storeGroup2"
                  class="SelectBox"
                  ref="storeGroup2Text"
                  tabindex="112">
                  <!-- <option v-for="oprItem in operationalDataList" :key="oprItem.storeOperationalFormCd" :value="oprItem.storeOperationalFormCd">{{ oprItem.storeOperationalFormName }}</option> -->
                  <!-- <option value="0" ></option>
                <option value="1" >店舗</option>
                <option value="2" >倉庫</option>
                <option value="3" >本部</option> -->
                  <option value="0" >{{ $t("F00003.S031") }}</option>
                  <option
                    v-for="items in group2DataList.storeGroupInfos.value"
                    :key= " items.code + 'storeGroup2' "
                    :value="items.code"
                  >{{ `${items.displayName.default}` }}
                  </option>

                </select>
                <div class="pulldownArrow"/>
              <!-- KSD V001.000 AE -->
              </td>
            </tr>
          <!-- 表示順(エラーメッセージ)
          <tr v-if="this.dspOrderErrorMsg !== ''" class="errorCell">
            <th />
            <td>
              <div v-for="dspOrderMsg in orderErrorMsg" :key="dspOrderMsg">
                <label>{{ dspOrderMsg }}</label>
              </div>
            </td>
          </tr>
          マスタ更新日時
          <tr>
            <th>{{ $t("F00003.S029") }}</th>
            <td>
              <input type="text" id="masterUpdate" ref="masterUpdateText" v-model="storeData.masterUpdate" :disabled=true style="ime-mode:disabled;font-family: 'Migu 1P';color: #79797A;background-color: #e9e9e9;cursor:not-allowed;" maxlength="23" tabindex="-1" class="readOnlyText"/>
            </td>
          </tr> -->
          </table>
        </div>
        <v-card-actions class="dialog-fotter">
          <v-spacer/>

          <div class="deleteButton">
            <!-- KSD V001.000 MS -->
            <!--
           <v-btn
              class="button dialog-fotter-button-blue footerButtonStyle"
              @click="onClickDelete()"
              v-if="mode === 2"
              tabindex="112"
              :disabled="(!$root.approvalFlg && !$root.deleteAuth) || !this.permissions.includes('CLOUDPOS_STORE_DELETE')">
               {{ $t("O00004.S024") }}
            </v-btn>
         -->
            <v-btn
              class="button dialog-fotter-button-blue footerButtonStyle"
              @click="onClickDelete()"
              v-if="mode === 2"
              tabindex="113"
              :disabled="(!$root.approvalFlg && !$root.deleteAuth) || !this.permissions.includes('CLOUDPOS_STORE_DELETE')">
              {{ $t("O00004.S024") }}
            </v-btn>
          <!-- KSD V001.000 ME -->
          </div>
          <!-- KSD V001.000 MS -->
          <!--
         <v-btn
            class="button dialog-fotter-button-gray footerButtonStyle"
            @click="onClickReturn()"
            tabindex="113">
            {{ $t("O00004.S003") }}
         -->
          <v-btn
            class="button dialog-fotter-button-gray footerButtonStyle"
            @click="onClickReturn()"
            tabindex="114">
            {{ $t("O00004.S003") }}
            <!-- KSD V001.000 ME -->
          </v-btn>
          <!-- KSD V001.000 MS -->
          <!--
           <v-btn
            class="button dialog-fotter-button-orange footerButtonStyle"
            @click="onClickSave()"
            tabindex="114"
            :disabled="(!$root.approvalFlg && !$root.registerAuth) || !this.permissions.includes('CLOUDPOS_STORE_UPDATE')">
            {{ $t("O00004.S008") }}
           -->
          <v-btn
            class="button dialog-fotter-button-orange footerButtonStyle"
            @click="onClickSave()"
            tabindex="115"
            :disabled="(!$root.approvalFlg && !$root.registerAuth) || !this.permissions.includes('CLOUDPOS_STORE_UPDATE')">
            {{ $t("O00004.S008") }}
          <!-- KSD V001.000 ME -->
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <popup ref="pop"/>
  </div>
</template>
