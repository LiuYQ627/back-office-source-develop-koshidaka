<!-- KSD V001.000 AS -->
<style src="./../../static/css/ModelEquipmentMasterSetting/modelEquipmentMasterSettingEditDialog.css"></style>
<script type="text/javascript" src="./../../static/js/ModelEquipmentMasterSetting/modelEquipmentMasterSettingEditDialog.js"></script>
<template>
  <div class="text-center baseFont">
    <!-- マスタ新規・編集ダイアログ -->
    <v-dialog v-model="dialog" persistent>
      <v-card class="basesize">
        <v-card-title class="headline dialog-line-blue title-label">
          <div id="changeLabel">
            <label id="changeModelabel" v-if="title === this.$i18n.t('C00219.S012')"><b>{{ $t("C00219.S010") }}</b></label>
            <label id="newModelabel" v-if="title === this.$i18n.t('C00219.S013')"><b>{{ $t("C00219.S011") }}</b></label>
          </div>
          <font class="dialog-title">{{title}}</font>
        </v-card-title>
        <div id="editTable" :class="[hasError ? 'scroll' : 'scrollHidden']">
          <table id="modelSettingTable">
            <!-- 機種設備番号 -->
            <tr>
              <th>{{ $t("C00219.S004") }}</th>
              <td>
                <input type="text" :id="'readOnlyText'" ref="modelNoText" v-model="selectedSettingData.modelNo" :disabled=true style="ime-mode:disabled;" maxlength="2" :tabindex="-1" />
              </td>
            </tr>
            <!-- 機材名称 -->
            <tr>
              <th>{{ $t("C00219.S005") }}</th>
                <td>
                <select v-model="selectedSettingData.equipNo" :class="this.equipNoErrorMsg !== '' ? 'errorTextBox' : 'SelectBox'" class="SelectBox equipNoName" ref="equipNoText" id="equipNoName" tabindex="104" style="padding-left: 5px !important;">
                  <option v-for="allEquipListItem in allEquipList" :key="allEquipListItem.equipNo" :value="allEquipListItem.equipNo">{{ allEquipListItem.equipName }}</option>
                </select>
                <div class="pulldownArrow"></div>
              </td>
            </tr>
            <tr v-if="this.equipNoErrorMsg !== ''" class="errorCell">
              <th />
              <td colspan="2">
                <div>
                  <label>{{ equipNoErrorMsg }}</label>
                </div>
              </td>
            </tr>
             <!-- 機種設備名称 -->
             <tr>
              <th>{{ $t("C00219.S006") }}</th>
              <td>
                <textarea rows="2" class="modelName editTextBox" ref="modelNameText" :class="this.modelNameErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'" v-model="selectedSettingData.modelName" :placeholder="this.$i18n.t('C00219.S014')" maxlength="48" @input="(e) => inputLimit(e, 48, selectedSettingData, 'modelName')" tabindex="105" />
              </td>
            </tr>
            <tr v-if="this.modelNameErrorMsg !== ''" class="errorCell">
              <th />
              <td colspan="2">
                <div>
                  <label>{{ modelNameErrorMsg }}</label>
                </div>
              </td>
            </tr>
             <!-- 機種設備略称 -->
             <tr>
              <th>{{ $t("C00219.S007") }}</th>
              <td>
                <input type="text" class="modelShortName editTextBox" ref="modelShortNameText" :class="this.modelShortNameErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'" v-model="selectedSettingData.modelShortName" :placeholder="this.$i18n.t('C00219.S015')" maxlength="20" @input="(e) => inputLimit(e, 20, selectedSettingData, 'modelShortName')" tabindex="106" />
              </td>
            </tr>
            <tr v-if="this.modelShortNameErrorMsg !== ''" class="errorCell">
              <th />
              <td colspan="2">
                <div>
                  <label>{{ modelShortNameErrorMsg }}</label>
                </div>
              </td>
            </tr>
            <tr>
              <th>{{ $t("C00219.S016") }}</th>
              <td>
                <input type="number" min="1" title="" max="9999" class="dispSeq editTextBox" ref="dispSeqText" :class="this.dispSeqErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'" v-model="selectedSettingData.dispSeq" :placeholder="this.$i18n.t('C00219.S018')" maxlength="4" @input="(e) => inputNumberLimit(e, selectedSettingData, 'dispSeq', 4)" tabindex="107" />
              </td>
            </tr>
            <tr v-if="this.dispSeqErrorMsg !== ''" class="errorCell">
              <th />
              <td colspan="2">
                <div>
                  <label>{{ dispSeqErrorMsg }}</label>
                </div>
              </td>
            </tr>
          </table>
        </div>
        <v-card-actions class="dialog-fotter">
          <v-spacer></v-spacer>
          <div class="deleteButton">
            <v-btn class="button dialog-fotter-button-blue footerButtonStyle" @click="onClickDelete()" v-if="title !== this.$i18n.t('C00219.S013')" :disabled="title !== this.$i18n.t('C00219.S012')" :tabindex="200">
              {{ $t("O00004.S024") }}
            </v-btn>
          </div>
          <v-btn class="button dialog-fotter-button-gray footerButtonStyle" @click="onClickReturn()" :tabindex="201">
            {{ $t("O00004.S003") }}
          </v-btn>
          <v-btn class="button dialog-fotter-button-orange footerButtonStyle" @click="onClickSave()" :tabindex="202">
            {{ $t("O00004.S008") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <popup ref="pop"/>
  </div>
</template>
<!-- KSD V001.000 AE -->
