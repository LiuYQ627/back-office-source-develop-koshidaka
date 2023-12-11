<style src="./../../static/css/AgeClassificationMaster/ageClassificationMasterEditDialog.css"></style>
<script type="text/javascript" src="./../../static/js/AgeClassificationMaster/ageClassificationMasterEditDialog.js"></script>
<template>
<div class="text-center baseFont ageClassificationEditPage">
  <v-dialog v-model="dialog" persistent>
    <v-card class="basesize">
      <v-card-title class="headline dialog-line-blue title-label">
        <div id="changeLabel">
          <label id="newModelabel" v-if="mode === 1"><b>{{ $t("C00216.S009") }}</b></label>
          <label id="changeModelabel" v-if="mode === 2"><b>{{ $t("C00216.S008") }}</b></label>
        </div>
        <font class="dialog-title">{{title}}</font>
      </v-card-title>
      <div id="baseTable" :class="[hasError ? 'scroll' : 'scrollHidden']">
        <table id="ageClassTable">
          <!-- 年齢区分コード -->
          <tr>
            <th v-html="$t('C00216.S001')" />
            <td>
              <input type="text" 
                :id="'readOnlyText'"
                v-model="ageDivisionData.ageDivisionCode" 
                :disabled=true 
                style="ime-mode:disabled;" 
                maxlength="6"
                ref="useAgeDivisionCode"
                :tabindex="101" 
              />
            </td>
          </tr>
          <!-- 年齢区分名称 -->
          <tr>
            <th>{{ $t('C00216.S003') }}</th>
            <td>
              <input type="text"
                :class="errMessage.ageDivisionName ? 'errorTextBox' : 'editTextBox'"
                class="ageDivisionName"
                v-model="ageDivisionData.ageDivisionName" 
                ref="useAgeDivisionName"
                :tabindex="102"
                @input="(e) => inputLimit(
                  e, 
                  16,
                  ageDivisionData,
                  'ageDivisionName'
                )"
                :placeholder="$t('C00216.S014')"
              />
            </td>
          </tr>
          <tr v-if="errMessage.ageDivisionName" class="errorCell">
            <th />
            <td>
              <div>
                <label>{{ errMessage.ageDivisionName }}</label>
              </div>
            </td>
          </tr>
          <!-- 開始年齢 -->
          <tr>
            <th>{{ $t('C00216.S004') }}</th>
            <td>
              <input type="number" 
                :class="errMessage.startAge ? 'errorTextBox' : 'editTextBox'"
                v-model="ageDivisionData.startAge" 
                ref="useStartAge"
                :tabindex="103"
                max="999"
                :placeholder="$t('C00216.S018')"
                oninput="this.value = this.value.replace(/\D/g)"
                @input="(e) => inputNumberLimit(e, ageDivisionData, 'startAge', 3)"
              />
            </td>
          </tr>
          <tr v-if="errMessage.startAge" class="errorCell">
            <th />
            <td>
              <div>
                <label>{{ errMessage.startAge }}</label>
              </div>
            </td>
          </tr>
          <!-- 終了年齢 -->
          <tr>
            <th>{{ $t('C00216.S005') }}</th>
            <td>
              <input type="number" 
                :class="errMessage.endAge ? 'errorTextBox' : 'editTextBox'"
                v-model="ageDivisionData.endAge" 
                ref="useEndAge"
                :tabindex="104"
                max="999"
                :placeholder="$t('C00216.S018')"
                oninput="this.value = this.value.replace(/\D/g)"
                @input="(e) => inputNumberLimit(e, ageDivisionData, 'endAge', 3)"
              />
            </td>
          </tr>
          <tr v-if="errMessage.endAge" class="errorCell">
            <th />
            <td>
              <div>
                <label>{{ errMessage.endAge }}</label>
              </div>
            </td>
          </tr>
          <!-- ワンオーダー対象 -->
          <tr>
            <th v-html="$t('C00216.S017')" />
            <td class="ageClassPulldownCellStyle">
              <select
                class="ageClassPulldownStyle"
                :class="errMessage.oneOrder ? 'errorTextBox' : 'editTextBox'"
                v-model="ageDivisionData.oneOrder"
                ref="useOneOrder"
                :tabindex="105"
              >
                <option
                  v-for="(row, index) in oneOrderList"
                  :key="index"
                  :value="row.value"
                >
                  {{ row.label }}
                </option>
              </select>
              <div class="pulldownArrow"></div>
            </td>
          </tr>
          <tr v-if="errMessage.oneOrder" class="errorCell">
            <th />
            <td>
              <div>
                <label>{{ errMessage.oneOrder }}</label>
              </div>
            </td>
          </tr>
        </table>
      </div>
      <v-card-actions class="dialog-fotter">
        <v-spacer></v-spacer>
        <div class="deleteButton">
          <v-btn class="button dialog-fotter-button-blue footerButtonStyle" 
            @click="onClickDelete()" 
            v-if="mode === 2" 
              :disabled="(!$root.approvalFlg && !$root.deleteAuth) || sessionBusinessUnitCd === ageDivisionData.businessUnitCd" 
              :tabindex="106">
            {{ $t("O00004.S024") }}
          </v-btn>
        </div>
        <v-btn class="button dialog-fotter-button-gray footerButtonStyle" 
          @click="onClickReturn()" 
          :tabindex="107">
          {{ $t("O00004.S003") }}
        </v-btn>
        <v-btn class="button dialog-fotter-button-orange footerButtonStyle" 
          @click="onClickSave()" 
          :disabled="operationLock || (!$root.approvalFlg && !$root.registerAuth)" 
          :tabindex="108">
          {{ $t("O00004.S008") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <popup ref="pop"/>
</div>
</template>
