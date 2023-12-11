<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/MasterCommon/masterDialog.css"></style>
<style scoped src="@/resource/static/css/CommonDesign/utils.css"></style>
<style scoped src="@/resource/static/css/DenominationSetting/denominationEditDialog.css"></style>
<script type="text/javascript" src="@/resource/static/js/DenominationSetting/denominationEditDialog.js"></script>
<template>
  <div class="text-center baseFont">
    <!-- 編集ダイアログ -->
    <v-dialog
      v-model="dialog"
      persistent
      @click:outside="checkClickOutside">
      <v-card class="basesize">
        <v-card-title class="headline dialog-line-blue title-label">
          <div id="changeLabel">
            <label id="changeModelabel"><b>{{ $t("F322b6.S013") }}</b></label>
          </div>
          <p class="dialog-title">{{ title }}</p>
        </v-card-title>
        <div id="baseTable">
          <table id="denomination-table">
            <!-- レジ番号 -->
            <tr>
              <th>{{ $t('F322b6.S014') }}</th>
              <td colspan="2">
                <input
                  type="text"
                  class="editTextBox"
                  ref="endpointIdText"
                  v-model="denominationData.endpointId"
                  :id="'readOnlyText'"
                  :disabled=true
                  tabindex="-1"
                >
              </td>
            </tr>
            <!-- 釣銭機残置回収方法 -->
            <tr>
              <th v-html="$t('F322b6.S015')" />
              <td colspan="2">
                <div
                  class="inline-radio"
                  id="denomination-collection-method-buttons">
                  <div>
                    <input
                      type="radio"
                      name="denominationCollectionMethodText"
                      ref="denominationCollectionMethod1"
                      id="denomination-collection-method-text"
                      tabindex="-1"
                      @change="onChangeDenominationCollectionMethod1()"
                      @focus="isHover">
                    <label
                      @keydown.enter="enterDenominationCollectionMethod1()"
                      @keydown.space="enterDenominationCollectionMethod1()"
                      ref="denominationCollectionMethod1Label"
                      tabindex="101"
                      class="scroll-none">{{ $t("F322b6.S016") }}</label>
                  </div>
                  <div class="label-width"/>
                  <div>
                    <input
                      type="radio"
                      name="denominationCollectionMethodText"
                      ref="denominationCollectionMethod2"
                      tabindex="-1"
                      @change="onChangeDenominationCollectionMethod2()">
                    <label
                      @keydown.enter="enterDenominationCollectionMethod2()"
                      @keydown.space="enterDenominationCollectionMethod2()"
                      tabindex="102"
                      class="scroll-none">{{ $t("F322b6.S017") }}</label>
                  </div>
                </div>
              </td>
            </tr>
            <!-- 釣銭機残置金額に棒金を含める -->
            <tr>
              <th>{{ $t('F322b6.S018') }}</th>
              <td colspan="2">
                <div
                  class="inline-radio"
                  id="roll-calculation-buttons">
                  <div>
                    <input
                      type="radio"
                      name="rollCalculationText"
                      ref="rollCalculation1"
                      tabindex="-1"
                      @change="onChangeRollCalculation1()"
                    >
                    <label
                      @keydown.enter="enterRollCalculation1()"
                      @keydown.space="enterRollCalculation1()"
                      tabindex="103"
                      class="scroll-none">{{ $t("F322b6.S019") }}</label>
                  </div>
                  <div class="label-width"/>
                  <div>
                    <input
                      type="radio"
                      name="rollCalculationText"
                      ref="rollCalculation2"
                      tabindex="-1"
                      @change="onChangeRollCalculation2()"
                    >
                    <label
                      @keydown.enter="enterRollCalculation2()"
                      @keydown.space="enterRollCalculation2()"
                      tabindex="104"
                      class="scroll-none">{{ $t("F322b6.S020") }}</label>
                  </div>
                </div>
              </td>
            </tr>
            <!-- 釣銭機残置回収5千円調整レベル -->
            <tr>
              <th v-html="$t('F322b6.S021')" />
              <td colspan="2">
                <input
                  type="number"
                  :class="this.adjustmentLevelErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'"
                  oninput="this.value = this.value.replace(/\D/g)"
                  @input="(e) => inputNumberLimit(e, denominationData.moneyTypeSettings, 'adjustmentLevel', 1)"
                  min="0"
                  max="9"
                  ref="adjustmentLevelText"
                  v-model="denominationData.moneyTypeSettings.adjustmentLevel"
                  :placeholder="$t('F322b6.S046')"
                  tabindex="105">
              </td>
            </tr>
            <!-- 釣銭機残置回収5千円調整レベル(エラーメッセージ) -->
            <tr
              v-if="adjustmentLevelErrorMsg !== ''"
              class="errorCell">
              <th />
              <td colspan="2">
                <label>{{ adjustmentLevelErrorMsg }}</label>
              </td>
            </tr>
            <!-- 残置金額 -->
            <tr>
              <th>{{ $t('F322b6.S022') }}</th>
              <td colspan="2">
                <input
                  type="text"
                  :class="this.remainingAmountErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'"
                  oninput="this.value = this.value.replace(/\D/g)"
                  @input="(e) => addZerosToRemainingAmount(e, denominationData.moneyTypeSettings, 'remainingAmount', 6)"
                  @keydown="keydownRemainingAmount($event)"
                  min="0"
                  max="999000"
                  ref="remainingAmountText"
                  v-model="denominationData.moneyTypeSettings.remainingAmount"
                  :placeholder="$t('F322b6.S047')"
                  tabindex="106">
              </td>
            </tr>
            <!-- 残置金額(エラーメッセージ) -->
            <tr
              v-if="remainingAmountErrorMsg !== ''"
              class="errorCell">
              <th />
              <td colspan="2">
                <label>{{ remainingAmountErrorMsg }}</label>
              </td>
            </tr>
            <!-- 金種 -->
            <tr>
              <th>{{ $t('F322b6.S023') }}</th>
              <td colspan="2">
                <select
                  v-model="selectedDenomination"
                  :class="this.denominationErrorMsg !== '' ? 'errorSelectBox' : 'SelectBox'"
                  ref="denominationText"
                  tabindex="107"
                  @change="getSelectedDenominationSetting">
                  <option
                    v-for="denominationItem in denominationList"
                    :key="denominationItem.code"
                    :value="denominationItem.code">
                    {{ denominationItem.name }}
                  </option>
                </select>
                <div class="pulldownArrow"/>
              </td>
            </tr>
            <!-- 金種(エラーメッセージ) -->
            <tr
              v-if="denominationErrorMsg !== ''"
              class="errorCell">
              <th />
              <td colspan="2">
                <label>{{ denominationErrorMsg }}</label>
              </td>
            </tr>
            <!-- 金種タイプ -->
            <tr v-if="selectedDenomination !== 0">
              <th>{{ $t('F322b6.S034') }}</th>
              <td colspan="2">
                <input
                  type="text"
                  class="editTextBox"
                  ref="denominationTypeText"
                  v-model="selectedDenominationSetting.denominationTypeName"
                  :placeholder="$t('F322b6.S035')"
                  :id="'readOnlyText'"
                  :disabled=true
                  tabindex="108" >
              </td>
            </tr>
            <!-- 棒金枚数 -->
            <tr v-if="selectedDenomination !== 0">
              <th>{{ $t('F322b6.S037') }}</th>
              <td colspan="2">
                <input
                  type="number"
                  :class="this.numberOfCoinsRollErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'"
                  oninput="this.value = this.value.replace(/\D/g)"
                  @input="(e) => inputNumberLimit(e, selectedDenominationSetting, 'numberOfCoinsRoll', 2)"
                  ref="numberOfCoinsRollText"
                  min="0"
                  max="50"
                  v-model="selectedDenominationSetting.numberOfCoinsRoll"
                  :placeholder="$t('F322b6.S048')"
                  :id="selectedDenomination===10000 || selectedDenomination===5000 || selectedDenomination===2000 || selectedDenomination===1000 ? 'readOnlyText': 'number-of-coins-roll-text'"
                  :disabled="selectedDenomination===10000 || selectedDenomination===5000 || selectedDenomination===2000 || selectedDenomination===1000 ? true : false"
                  tabindex="109" >
              </td>
            </tr>
            <!-- 棒金枚数(エラーメッセージ) -->
            <tr
              v-if="numberOfCoinsRollErrorMsg !== ''"
              class="errorCell">
              <th />
              <td colspan="2">
                <label>{{ numberOfCoinsRollErrorMsg }}</label>
              </td>
            </tr>
            <!-- 残置枚数 -->
            <tr v-if="selectedDenomination !== 0">
              <th>{{ $t('F322b6.S038') }}</th>
              <td colspan="2">
                <input
                  type="number"
                  :class="this.remainingNumberErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'"
                  oninput="this.value = this.value.replace(/\D/g)"
                  @input="(e) => inputNumberLimit(e, selectedDenominationSetting, 'remainingNumber', 4)"
                  ref="remainingNumberText"
                  min="0"
                  max="9999"
                  v-model="selectedDenominationSetting.remainingNumber"
                  :placeholder="$t('F322b6.S049')"
                  :id="selectedDenomination===2000 ? 'readOnlyText': 'remaining-number-text'"
                  :disabled="selectedDenomination===2000 ? true : false"
                  tabindex="110" >
              </td>
            </tr>
            <!-- 残置枚数(エラーメッセージ) -->
            <tr
              v-if="remainingNumberErrorMsg !== ''"
              class="errorCell">
              <th />
              <td colspan="2">
                <label>{{ remainingNumberErrorMsg }}</label>
              </td>
            </tr>
            <!-- ニアエンプティ閾値 -->
            <tr v-if="selectedDenomination !== 0">
              <th>{{ $t('F322b6.S039') }}</th>
              <td colspan="2">
                <input
                  type="number"
                  :class="this.nearEmptyErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'"
                  oninput="this.value = this.value.replace(/\D/g)"
                  @input="(e) => inputNumberLimit(e, selectedDenominationSetting, 'nearEmpty', 4)"
                  ref="nearEmptyText"
                  min="0"
                  max="9999"
                  v-model="selectedDenominationSetting.nearEmpty"
                  :placeholder="$t('F322b6.S049')"
                  :id="selectedDenomination===10000 || selectedDenomination===2000 ? 'readOnlyText': 'near-empty-text'"
                  :disabled="selectedDenomination===10000 || selectedDenomination===2000 ? true : false"
                  tabindex="111" >
              </td>
            </tr>
            <!-- ニアエンプティ閾値(エラーメッセージ) -->
            <tr
              v-if="nearEmptyErrorMsg !== ''"
              class="errorCell">
              <th />
              <td colspan="2">
                <label>{{ nearEmptyErrorMsg }}</label>
              </td>
            </tr>
            <!-- ニアフル閾値 -->
            <tr v-if="selectedDenomination !== 0">
              <th>{{ $t('F322b6.S040') }}</th>
              <td colspan="2">
                <input
                  type="number"
                  :class="this.nearFullErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'"
                  oninput="this.value = this.value.replace(/\D/g)"
                  @input="(e) => inputNumberLimit(e, selectedDenominationSetting, 'nearFull', 4)"
                  ref="nearFullText"
                  min="0"
                  max="9999"
                  v-model="selectedDenominationSetting.nearFull"
                  :placeholder="$t('F322b6.S049')"
                  tabindex="112" >
              </td>
            </tr>
            <!-- ニアエンプティ閾値(エラーメッセージ) -->
            <tr
              v-if="nearFullErrorMsg !== ''"
              class="errorCell">
              <th />
              <td colspan="2">
                <label>{{ nearFullErrorMsg }}</label>
              </td>
            </tr>
            <!-- 最大収納枚数 -->
            <tr v-if="selectedDenomination !== 0">
              <th>{{ $t('F322b6.S041') }}</th>
              <td colspan="2">
                <input
                  type="number"
                  :class="this.maxStorageErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'"
                  oninput="this.value = this.value.replace(/\D/g)"
                  @input="(e) => inputNumberLimit(e, selectedDenominationSetting, 'maxStorage', 4)"
                  ref="maxStorageText"
                  min="0"
                  max="9999"
                  v-model="selectedDenominationSetting.maxStorage"
                  :placeholder="$t('F322b6.S049')"
                  tabindex="113" >
              </td>
            </tr>
            <!-- 最大収納枚数(エラーメッセージ) -->
            <tr
              v-if="maxStorageErrorMsg !== ''"
              class="errorCell">
              <th />
              <td colspan="2">
                <label>{{ maxStorageErrorMsg }}</label>
              </td>
            </tr>
          </table>
        </div>
        <v-card-actions class="dialog-fotter">
          <v-spacer/>
          <v-btn
            class="button dialog-fotter-button-gray footerButtonStyle"
            @click="onClickReturn()"
            tabindex="114">
            {{ $t("O00004.S003") }}
          </v-btn>
          <v-btn
            class="button dialog-fotter-button-orange footerButtonStyle"
            @click="onClickSave()"
            :disabled="(!$root.approvalFlg && !$root.registerAuth)"
            tabindex="115">
            {{ $t("O00004.S008") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <popup ref="pop"/>
  </div>
</template>
<!-- KSD V001.000 AE -->
