<!-- KSD V001.000 AS -->
<style src="./../../static/css/FloorMasterSetting/floorMasterDialog.css"></style>
<script type="text/javascript" src="./../../static/js/FloorMasterSetting/floorMasterEditDialog.js"></script>
<template>
<div class="text-center baseFont">
  <!-- マスタ新規・編集ダイアログ -->
  <v-dialog v-model="dialog" persistent>
    <v-card class="basesize">
      <v-card-title class="headline dialog-line-blue title-label">
        <div id="changeLabel">
          <label id="changeModelabel" v-if="mode === 2"><b>{{ $t("F322b9.S022") }}</b></label>
        </div>
        <font class="dialog-title">{{title}}</font>
      </v-card-title>
      <div id="baseTable">
        <table id="floorTable">
          <!-- No -->
          <tr>
            <th>{{ $t("F322b9.S020") }}</th>
            <td>
              <input type="number" ref="indexNoText" v-model="floorData.indexNo" style="ime-mode:disabled;" maxlength="2" :disabled=true :id="'readOnlyText'" :tabindex="-1" disabled />
            </td>
          </tr>
          <!-- フロアNo. -->
          <tr>
            <th>{{ $t("F322b9.S009") }}</th>
            <td>
              <input type="number" class="floorNoInput" oninput="this.value = this.value.replace(/\D/g)"
                @input="(e) => inputNumberLimit(e, floorData, 'floorNo', 2)" min="1" max="99" title=""
                ref="floorNoText" :class="this.floorNoErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'" v-model="floorData.floorNo" :tabindex="-1" />
            </td>
          </tr>
          <!-- フロアNo.(エラーメッセージ) -->
          <tr v-if="this.floorNoErrorMsg !== ''" class="errorCell">
            <th />
            <td colspan="2">
              <div>
                <label>{{ floorNoErrorMsg }}</label>
              </div>
            </td>
          </tr>
          <!-- フロア名称 -->
          <tr>
            <th>{{ $t("F322b9.S010") }}</th>
            <td>
              <input type="text" class="editTextBox" ref="floorNameText" v-model="floorData.floorName" :placeholder="this.$i18n.t('F322b9.S016')" maxlength="20" :tabindex="101" @input="(e) => inputLimit(e, 20, floorData, 'floorName')"/>
            </td>
          </tr>
          <!-- フロア名称(短縮名称) -->
          <tr>
            <th>{{ $t("F322b9.S011") }}</th>
            <td>
              <input type="text" class="editTextBox" ref="floorNameShortText" v-model="floorData.floorNameShort" :placeholder="this.$i18n.t('F322b9.S017')" maxlength="8" @input="(e) => inputLimit(e, 8, floorData, 'floorNameShort')" :tabindex="102" />
            </td>
          </tr>
          <!-- ＣＣＰ出力先 -->
          <tr>
            <th>{{ $t("F322b9.S012") }}</th>
            <td>
              <input type="number" :class="this.ccpNoErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'" oninput="this.value = this.value.replace(/\D/g)"
                @input="(e) => inputNumberLimit(e, floorData, 'ccpNo', 2)" ref="ccpNoText" v-model="floorData.ccpNo" maxlength="2" min="1" max="32" title="" :tabindex="104" />
            </td>
          </tr>
          <!-- ＣＣＰ出力先(エラーメッセージ) -->
          <tr v-if="this.ccpNoErrorMsg !== ''" class="errorCell">
            <th />
            <td colspan="2">
              <div>
                <label>{{ ccpNoErrorMsg }}</label>
              </div>
            </td>
          </tr>
          <!-- エラー出力先 -->
          <tr>
            <th>{{ $t("F322b9.S013") }}</th>
            <td>
              <input type="number" :class="this.errKcpNoErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'" oninput="this.value = this.value.replace(/\D/g)"
                @input="(e) => inputNumberLimit(e, floorData, 'errKcpNo', 2)" ref="errKcpNoText" v-model="floorData.errKcpNo" maxlength="2" min="1" max="32" title="" :tabindex="105" />
            </td>
          </tr>
          <!-- エラー出力先(エラーメッセージ) -->
          <tr v-if="this.errKcpNoErrorMsg !== ''" class="errorCell">
            <th />
            <td colspan="2">
              <div>
                <label>{{ errKcpNoErrorMsg }}</label>
              </div>
            </td>
          </tr>
        </table>
        <table>
          <div style="justify-content: left; display: flex; margin: 6px 0px 2px 0px;">
            <label>{{ $t("F322b9.S014") }}</label>
          </div>
          <tr>
            <td style="height: 100%; width: 100%;">
              <div class="inline-radio-grid" style="display: grid; grid-template-columns: auto auto auto auto auto auto auto auto; row-gap: 5px; column-gap: 5px; height: 100%;">
                <div v-for="(item, index) in kpStsList" :key="index" v-if="index+1 <= kcpCnt" :tabindex="105 + index + 1" class="drinkCourseBtn">
                  <input type="radio" :checked="item === 1" @click="selectSTS(index, $t('F322b9.S023'))"><label class="scrollNone">{{  $t('F322b9.S023')}}{{ `${index+1}` }}</label>
                </div>
                <div v-for="(item, index) in kpStsList" :key="index" v-if="index+1 > kcpCnt" class="drinkCourseBtn">
                  <input type="radio" disabled><label class="scrollNone">{{  $t('F322b9.S023') }}{{ `${index+1}` }}</label>
                </div>
              </div>
            </td>
          </tr>
        </table>
        <table>
          <div style="justify-content: left; display: flex; margin: 6px 0px 2px 0px;">
            <label>{{ $t("F322b9.S015") }}</label>
          </div>
          <tr>
            <td style="height: 100%; width: 100%;">
              <div class="inline-radio-grid" style="display: grid; grid-template-columns: auto auto auto auto auto auto auto auto; row-gap: 5px; column-gap: 5px; height: 100%;">
                <div v-for="(item, index) in dishupStsList" :key="index" v-if="index+1 <= kcpCnt" :tabindex="105 + kcpCnt + index + 1" class="drinkCourseBtn">
                  <input type="radio" :checked="item === 1" @click="selectSTS(index, 'D')"><label class="scrollNone">{{  $t('F322b9.S023') }}{{ `${index+1}` }}</label>
                </div>
                <div v-for="(item, index) in dishupStsList" :key="index" v-if="index+1 > kcpCnt" class="drinkCourseBtn">
                  <input type="radio" disabled><label class="scrollNone">{{  $t('F322b9.S023') }}{{ `${index+1}` }}</label>
                </div>
              </div>
            </td>
          </tr>
        </table>
      </div>
      <v-card-actions class="dialog-fotter">
        <v-spacer></v-spacer>
        <div class="deleteButton">
          <v-btn class="button dialog-fotter-button-blue footerButtonStyle" :style="{'visibility': hasDelete ? 'visible' : 'hidden'}" @click="onClickDelete()" v-if="mode === 2" :disabled="(!$root.approvalFlg && !$root.deleteAuth)" :tabindex="200">
            {{ $t("O00004.S024") }}
          </v-btn>
        </div>
        <v-btn class="button dialog-fotter-button-gray footerButtonStyle" @click="onClickReturn()" :tabindex="201">
          {{ $t("O00004.S003") }}
        </v-btn>
        <v-btn class="button dialog-fotter-button-orange footerButtonStyle" @click="onClickSave()" :disabled="operationLock || (!$root.approvalFlg && !$root.registerAuth)" :tabindex="202">
          {{ $t("O00004.S008") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <popup ref="pop"/>
</div>
</template>
<!-- KSD V001.000 AE -->
