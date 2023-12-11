<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/CommonDesign/utils.css"></style>
<style
  scoped
  src="@/resource/static/css/TicketTypeMasterSetting/ticketTypeMasterSettingForm.css"
></style>
<script
  scoped
  type="text/javascript"
  src="@/resource/static/js/TicketTypeMasterSetting/ticketTypeMasterSettingForm.js"
></script>
<template>
  <div class="px-5 ticketTypeFormContainerStyling">
    <v-row no-gutters class="d-flex align-center">
      <div id="buttonRederer">
        <v-row
          class="inputRow"
          :class="{
            disabledFields: disabledFields,
            errorCell: errMessage.Code
          }"
        >
          <!-- 券種コード -->
          <v-col class="label">{{ this.$i18n.t("F322c1.S007") }}</v-col>
          <v-col class="inputSection" style="display:block;width:220px">
            <input
              type="number"
              :class="errMessage.Code ? 'errorTextBox' : 'editTextBox'"
              class="buttonElement"
              v-model="inputModel.Code"
              @input="e => inputNumberLimit(e, inputModel, 'Code', 3)"
              ref="useTicketCode"
              :placeholder="$t('F322c1.S031')"
              :disabled="disabledFields || isDisabledCode"
              maxlength="3"
              max="999"
              min="1"
            />
          </v-col>
        </v-row>
        <v-row>
          <commonErrorMessageHandler
            :errorModel="errMessage.Code"
            :leftSpacing="'220px'"
          />
        </v-row>
        <v-row
          class="inputRow"
          :class="{
            disabledFields: disabledFields,
            errorCell: errMessage.Name
          }"
        >
          <!-- 券名称 -->
          <v-col class="label" style="max-width:140px">
            {{ this.$i18n.t("F322c1.S004") }}
          </v-col>
          <v-col class="inputSection" style="display:block;max-width:300px">
            <input
              type="text"
              :class="errMessage.Name ? 'errorTextBox' : 'editTextBox'"
              v-model="inputModel.Name"
              class="buttonElement"
              ref="useTicketName"
              @input="e => inputLimit(e, 20, inputModel, 'Name')"
              :placeholder="$t('F322c1.S032')"
              :disabled="disabledFields"
            />
          </v-col>
        </v-row>
        <v-row>
          <commonErrorMessageHandler
            :errorModel="errMessage.Name"
            :leftSpacing="'140px'"
          />
        </v-row>
        <v-row class="inputRow" :class="{ disabledFields: disabledFields }">
          <!-- 売上集計リンクコード -->
          <v-col class="label">{{ this.$i18n.t("F322c1.S008") }}</v-col>
          <v-col
            class="inputSection ageClassPulldownCellStyle"
            style="display:block;width:220px"
          >
            <select
              class="ageClassPulldownStyle buttonElement"
              :class="errMessage.LinkTotalNo ? 'errorTextBox' : 'editTextBox'"
              v-model="inputModel.LinkTotalNo"
              ref="useSalesSummaryLinkCode"
              :disabled="disabledFields"
            >
              <option
                v-for="(row, index) in labelsSalesSummaryLinkCodeList"
                :key="index"
                :value="row.value"
              >
                {{ row.name }}
              </option>
            </select>
            <div v-if="!disabledFields" class="pulldownArrow"></div>
          </v-col>
        </v-row>
        <v-row>
          <commonErrorMessageHandler :errorModel="errMessage.LinkTotalNo" />
        </v-row>
        <v-row
          class="inputRow"
          :class="{
            disabledFields: disabledFields,
            errorCell: errMessage.UseSts
          }"
        >
          <!-- 使用フラグ -->
          <v-col class="label">{{ this.$i18n.t("F322c1.S009") }}</v-col>
          <v-col
            class="inputSection toggleInput"
            style="display:block;width:220px"
          >
            <radio-button
              :class="errMessage.UseSts ? 'errorOptionBox' : 'editTextBox'"
              v-model="inputModel.UseSts"
              :labels="labelsUseFlag"
              tabindex="-1"
              :disabled="disabledFields"
            />
          </v-col>
        </v-row>
        <v-row>
          <commonErrorMessageHandler :errorModel="errMessage.UseSts" />
        </v-row>
        <v-row
          class="inputRow"
          :class="{
            disabledFields: disabledFields,
            errorCell: errMessage.TermCheckSts
          }"
        >
          <!-- 有効期限チェック -->
          <v-col class="label">{{ this.$i18n.t("F322c1.S012") }}</v-col>
          <v-col
            class="inputSection toggleInput"
            style="display:block;width:220px"
          >
            <radio-button
              :class="
                errMessage.TermCheckSts ? 'errorOptionBox' : 'editTextBox'
              "
              v-model="inputModel.TermCheckSts"
              :labels="labelsExpirationCheck"
              tabindex="-1"
              :disabled="disabledFields"
            />
          </v-col>
        </v-row>
        <v-row>
          <commonErrorMessageHandler :errorModel="errMessage.TermCheckSts" />
        </v-row>
        <v-row class="inputRow" :class="{ disabledFields: disabledFields }">
          <!-- ドロワオープン -->
          <v-col class="label">{{ this.$i18n.t("F322c1.S015") }}</v-col>
          <v-col
            class="inputSection toggleInput"
            style="display:block;width:220px"
          >
            <radio-button
              :class="errMessage.DrwOpenSts ? 'errorOptionBox' : 'editTextBox'"
              v-model="inputModel.DrwOpenSts"
              :labels="labelsYesNoDrop"
              tabindex="-1"
              :disabled="disabledFields"
            />
          </v-col>
        </v-row>
        <v-row>
          <commonErrorMessageHandler :errorModel="errMessage.DrwOpenSts" />
        </v-row>
        <v-row
          class="inputRow"
          :class="{
            disabledFields: disabledFields,
            errorCell: errMessage.Disc_Type1
          }"
        >
          <!-- 値引／割引種別 -->
          <v-col class="label">{{ this.$i18n.t("F322c1.S020") }}</v-col>
          <v-col
            class="inputSection ageClassPulldownCellStyle"
            style="display:block;width:220px"
          >
            <select
              class="ageClassPulldownStyle buttonElement"
              :class="errMessage.Disc_Type1 ? 'errorTextBox' : 'editTextBox'"
              v-model="inputModel.Disc_Type1"
              ref="useSalesSummaryLinkCode"
              :disabled="disabledFields"
            >
              <option
                v-for="(row, index) in discountTypeList"
                :key="index"
                :value="row.value"
                :selected="row.value == inputModel.Disc_Type1"
              >
                {{ row.name }}
              </option>
            </select>
            <div v-if="!disabledFields" class="pulldownArrow"></div>
          </v-col>
        </v-row>
        <v-row>
          <commonErrorMessageHandler :errorModel="errMessage.Disc_Type1" />
        </v-row>
        <v-row
          class="inputRow"
          v-if="inputModel.Disc_Type1 != 7 && inputModel.Disc_Type1 != 8"
        ></v-row>
        <v-row
          class="inputRow"
          v-if="inputModel.Disc_Type1 == 7"
          :class="{
            disabledFields: disabledFields,
            errorCell: errMessage.DpCodeDesignation
          }"
        >
          <!-- ＤＰコード指定 -->
          <v-col class="label">
            {{ this.$i18n.t("F322c1.S021") }}
          </v-col>
          <v-col class="inputSection" style="display:block;width:220px">
            <div
              class="selectDPCodeStyle form-inline"
              :style="
                `${
                  this.errMessage.DpCodeDesignation !== ''
                    ? 'background-color: #fcd4d4 !important; outline: 1px solid red !important; outline-offset: -2px !important;'
                    : ''
                }`
              "
              style="width: 100%; margin-left: 0px; height: 50px;border: #9EA0AA solid 1px;"
            >
              <span
                class="border-thin storeSelectSpan SelectBox"
                style="width: 100%; margin-left: 0px; height: 50px; display: flex; align-items: center;"
              >
                <input
                  type="text"
                  class="dpCodeText"
                  style="width: 80%"
                  ref="dpCodeText"
                  :value="dpCodeText"
                  :disabled="true"
                />
                <div class="buttomLabel">
                  <v-btn
                    style="width: 28px; height: 40px;"
                    ref="dpCodeBtn"
                    @click="dialogSelect"
                  >
                    <span class="rightArrow2" />
                  </v-btn>
                </div>
              </span>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <commonErrorMessageHandler
            v-if="inputModel.Disc_Type1 == 7"
            :errorModel="errMessage.DpCodeDesignation"
            :leftSpacing="'220px'"
          />
        </v-row>
        <v-row class="inputRow" :class="{ disabledFields: disabledFields }">
          <!-- 値引／割引ステータス -->
          <v-col class="label">{{ this.$i18n.t("F322c1.S023") }}</v-col>
          <v-col
            class="inputSection toggleInput"
            style="display:block;width:220px"
            @click="switchTanka"
          >
            <radio-button
              :class="errMessage.Disc_Type2 ? 'errorOptionBox' : 'editTextBox'"
              @change="switchTanka"
              v-model="inputModel.Disc_Type2"
              :labels="labelsDiscountStatus"
              tabindex="-1"
              :disabled="disabledFields"
            />
          </v-col>
        </v-row>
        <v-row>
          <commonErrorMessageHandler :errorModel="errMessage.Disc_Type2" />
        </v-row>
        <v-row
          class="inputRow"
          v-if="inputModel.Disc_Type2 == 0"
          :class="{
            disabledFields: disabledFields,
            errorCell: errMessage.TankaPrice
          }"
        >
          <!-- プリセット単価 -->
          <v-col class="label">{{ this.$i18n.t("F322c1.S026") }}</v-col>
          <div style="width:110px;display: flex; align-items: center;">
            <div>
              <v-col class="inputSection">
                <input
                  type="number"
                  :class="
                    errMessage.TankaPrice ? 'errorTextBox' : 'editTextBox'
                  "
                  class="buttonElement"
                  v-model="inputModel.Tanka"
                  ref="usePresetUnitPrice"
                  max="999999"
                  oninput="this.value = this.value.replace(/\D/g)"
                  @input="e => inputNumberLimit(e, inputModel, 'Tanka', 6)"
                  :disabled="disabledFields"
                />
              </v-col>
            </div>
            <div style="margin-left:1px;width:10%">
              <label>{{ this.$i18n.t("F322c1.S027") }}</label>
            </div>
          </div>
        </v-row>
        <v-row
          class="inputRow"
          v-if="inputModel.Disc_Type2 == 1"
          :class="{
            disabledFields: disabledFields,
            errorCell: errMessage.TankaPercent
          }"
        >
          <!-- プリセット割引率 -->
          <v-col class="label">{{ this.$i18n.t("F322c1.S028") }}</v-col>
          <div style="width:80px;display: flex; align-items: center;">
            <div>
              <v-col class="inputSection">
                <input
                  type="number"
                  :class="
                    errMessage.TankaPercent ? 'errorTextBox' : 'editTextBox'
                  "
                  class="buttonElement"
                  v-model="inputModel.Tanka"
                  ref="usePresetDiscountRate"
                  max="100"
                  @input="e => inputNumberLimit(e, inputModel, 'Tanka', 3)"
                  oninput="this.value=this.value.replace(/\D/g)"
                  :disabled="disabledFields"
                />
              </v-col>
            </div>
            <div style="margin-left:1px;width:10%">
              <label>{{ this.$i18n.t("F322c1.S029") }}</label>
            </div>
          </div>
        </v-row>
        <v-row>
          <commonErrorMessageHandler
            v-if="inputModel.Disc_Type2 == 0"
            :errorModel="errMessage.TankaPrice"
            :leftSpacing="'220px'"
          />
          <commonErrorMessageHandler
            v-if="inputModel.Disc_Type2 == 1"
            :errorModel="errMessage.TankaPercent"
            :leftSpacing="'220px'"
          />
        </v-row>
      </div>
    </v-row>
    <common-select-dialog
      ref="commonSelectDialog"
      :tableHeaderTitle="this.$i18n.t('F322c1.S033')"
      :tableLeftUpperLabel="this.$i18n.t('F322c1.S034')"
      :tableLeftFirstTitle="this.$i18n.t('F322c1.S035')"
      :tableLeftSecondTitle="this.$i18n.t('F322c1.S036')"
      :tableRightUpperLabel="this.$i18n.t('F322c1.S037')"
      :tableRightFirstTitle="this.$i18n.t('F322c1.S035')"
      :tableRightSecondTitle="this.$i18n.t('F322c1.S036')"
      v-on:clickSubmit="DPSelectOk"
      :maxSelect="50"
      :forceDisableSelectAll="true"
      :firstColWidth="'160px'"
      :enableSortSelected="true"
      sortStyleRight="key"
    />
    <popup ref="pop" />
  </div>
</template>
<!-- KSD V001.000 AE -->
