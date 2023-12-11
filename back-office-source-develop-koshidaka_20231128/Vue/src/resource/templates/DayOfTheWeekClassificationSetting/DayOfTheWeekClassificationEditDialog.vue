<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/DayOfTheWeekClassificationSetting/dayOfTheWeekClassificationSetting.css"></style>
<script type="text/javascript" src="@/resource/static/js/DayOfTheWeekClassificationSetting/dayOfTheWeekClassificationEditDialog.js"></script>
<template>
  <div class="text-center baseFont">
    <v-dialog v-model="dialog" persistent>
      <v-card class="basesize">
        <v-card-title class="headline dialog-line-blue title-label">
        <div id="changeLabel">
          <label id="newModelabel" v-if="mode === 1"><b>{{ $t("C00214.S019") }}</b></label>
          <label id="changeModelabel" v-if="mode === 2"><b>{{ $t("C00214.S017") }}</b></label>
        </div>
        <font class="dialog-title">{{ title }}</font>
      </v-card-title>
      <div id="editTable" :class="[(errMessage.weekdayName !== '' && errMessage.weekdayShortName !== '') ? 'scroll' : 'scrollHidden']">
        <table id="colorTable">
          <!-- 曜日区分コード -->
          <tr>
            <th v-html="$t('C00214.S007')"></th>
            <td>
              <input type="text" :id="'readOnlyText'" ref="weekdayCodeText" v-model="settingData.weekdayCode" :disabled=true style="ime-mode:disabled;" maxlength="2" :tabindex="-1" />
            </td>
          </tr>
          <!-- 曜日区分名称 -->
          <tr>
            <th>{{ $t("C00214.S008") }}</th>
            <td>
              <form-group-layout
                fixed-header
                :header-width="0"
                :has-error="errMessage.weekdayName !== ''"
              >
                <text-input
                  class="textWeekdayName editTextBox"
                  ref="weekdayNameText"
                  v-model="settingData.weekdayName"
                  :placeholder="this.$i18n.t('C00214.S013')"
                  :max-byte-length="16"
                  tabindex="101"
                />
              </form-group-layout> 
            </td> 
          </tr>
          <tr v-if="errMessage.weekdayName" class="errorCell">
            <th />
            <td>
              <div>
                <label>{{ errMessage.weekdayName }}</label>
              </div>
            </td>
          </tr>
           <!-- 曜日区分略称 -->
           <tr>
            <th>{{ $t("C00214.S009") }}</th>
            <td>
              <form-group-layout
                fixed-header
                :header-width="0"
                :has-error="errMessage.weekdayShortName !== ''"
              >
                <text-input
                  type="text"
                  class="textWeekdayShortName editTextBox"
                  ref="weekdayShortNameText"
                  v-model="settingData.weekdayShortName"
                  :max-byte-length="8"
                  :placeholder="this.$i18n.t('C00214.S014')"
                  tabindex="102"
                />
              </form-group-layout> 
              </td>
          </tr>
          <tr v-if="errMessage.weekdayShortName" class="errorCell">
            <th />
            <td>
              <div>
                <label>{{ errMessage.weekdayShortName }}</label>
              </div>
            </td>
          </tr>
           <!-- 文字色 -->
           <tr>
            <th>{{ $t("C00214.S010") }}</th>
            <td class="editTextBox" ref="textColorCode" style="text-align: right;" :style="{ backgroundColor: settingData.textColorCode}">
              <img class="palletteIcon" @keydown.enter="colorSelectText(colorSetting)" @keydown.space="colorSelectText(colorSetting)" @click="colorSelectText(colorSetting)" style="float: right; align-items: center; width: 45px; height: 45px; margin: auto" tabindex="104" src="@/assets/ico_palette.png" alt="" />
            </td>
          </tr>
           <!-- 背景色 -->
           <tr>
            <th>{{ $t("C00214.S011") }}</th>
            <td class="editTextBox" ref="backColorCode" style="text-align: right" :style="{ backgroundColor: settingData.backColorCode}">
              <img class="palletteIcon" @keydown.enter="colorSelectBg(colorSetting)" @keydown.space="colorSelectBg(colorSetting)" @click="colorSelectBg(colorSetting)" style="float: right; align-items: center; width: 45px; height: 45px; margin: auto" tabindex="106" src="@/assets/ico_palette.png" alt=""/>
            </td>
          </tr>
        </table>
      </div>
      <v-card-actions class="dialog-fotter">
        <v-spacer></v-spacer>
        <div class="deleteButton">
          <v-btn class="button dialog-fotter-button-blue footerButtonStyle" tabindex="107" @click="onClickDelete()" v-if="mode === 2">
            {{ $t("O00004.S024") }}
          </v-btn>
        </div>
        <v-btn class="button dialog-fotter-button-gray footerButtonStyle" tabindex="108" @click="onClickReturn()" >
          {{ $t("O00004.S003") }}
        </v-btn>
        <v-btn class="button dialog-fotter-button-orange footerButtonStyle" tabindex="109" @click="onClickSave()" >
          {{ $t("O00004.S008") }}
        </v-btn>
      </v-card-actions>
      </v-card>
    </v-dialog>
    <edit-dialog ref="colorPickerDialog" v-on:clickSubmit="colorConfirm()"/>
    <popup ref="pop"/>
</div>
</template>
<!-- KSD V001.000 AE -->
