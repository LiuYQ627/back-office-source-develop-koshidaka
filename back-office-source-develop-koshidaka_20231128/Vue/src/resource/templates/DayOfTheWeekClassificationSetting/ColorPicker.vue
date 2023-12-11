<!-- KSD V001.000 AS -->
<style src="./../../static/css/DayOfTheWeekClassificationSetting/dayOfTheWeekClassificationSetting.css"></style>
<script type="text/javascript" src="./../../static/js/DayOfTheWeekClassificationSetting/colorPicker.js"></script>
<template>
  <div class="text-center baseFont">
    <v-dialog v-model="dialog" persistent style="">
      <v-card class="basesize">
        <v-card-title class="headline dialog-line-blue title-label">
          <div id="changeLabel">
            <label id="newModelabel"></label>
            <label id="changeModelabel" style="color: #ffffff !important; background-color: #ffffff !important"></label>
          </div>
          <font class="dialog-title">{{ $t("C00214.S012") }}</font>
        </v-card-title>
        <div id="divColorTable">
        <table id="colorTable">
          <tr v-for="(item, index) in colorSet" :key="index">
            <td colspan="2"
              v-for="(colorItem, colorIdx) in item"
              :key="colorIdx" :style="{ backgroundColor: colorItem}"
              class="colorBox"
              :class="{
                'selectedColorLight': colorItemCheck(colorItem, index, colorIdx) && getBrightness(hexToRGB(colorItem)),
                'selectedColorDark': colorItemCheck(colorItem, index, colorIdx) && !getBrightness(hexToRGB(colorItem)),
                'unselectedColor': !colorItemCheck(colorItem, index, colorIdx)
              }"
              style="cursor: pointer;"
              @click="getColor($event, colorItem)"
              @keydown.enter="getColor($event, colorItem)"
              @keydown.space="getColor($event, colorItem)"
              :tabIndex="2 + `${index}${colorIdx}`"
            >
              <span class="selectedCheckMark">
                <svg
                  id="btn_check_h"
                  width="25.709999"
                  height="18.322937"
                  viewBox="0 0 25.709999 18.322937"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:svg="http://www.w3.org/2000/svg">
                  <defs
                    id="defs70" />
                  <path
                    id="パス_521"
                    data-name="パス 521"
                    d="M 1.5,8.729 10.256,16.823 24.21,1.5"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="3"
                    style="stroke-opacity:1" />
                </svg>
              </span>
            </td>
          </tr>
        </table>
      </div>
        <v-card-actions class="dialog-fotter">
        <v-spacer></v-spacer>
        <v-btn class="button dialog-fotter-button-gray footerButtonStyle" tabindex="250" @click="onClickReturn()" >
          {{ $t("O00004.S003") }}
        </v-btn>
        <v-btn class="button dialog-fotter-button-orange footerButtonStyle" tabindex="251" @click="onClickSave()" :disabled="this.colorSet.length <= 0" >
          {{ $t("C00214.S021") }}
        </v-btn>
      </v-card-actions>
      </v-card>
    </v-dialog>
    <popup ref="pop"/>
  </div>
</template>
<!-- KSD V001.000 AE -->
