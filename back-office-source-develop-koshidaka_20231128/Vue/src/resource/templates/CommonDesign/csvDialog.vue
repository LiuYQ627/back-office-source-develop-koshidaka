<!-- KSD V001.000 AS -->
<style src="@/resource/static/css/CommonDesign/csvDialog.css"></style>
<script type="text/javascript" src="@/resource/static/js/CommonDesign/csvDialog.js"></script>
<template>
  <v-dialog
    width="560px"
    height="540px"
    v-model="dialog"
    persistent>
    <v-card class="product-group-master-csv-dialog">
      <v-card-title class="headline dialog-line-blue">
        <font class="dialog-title">{{ $t("F32242.S010") }}</font>
      </v-card-title>
      <v-card-text style="height: 354px; font-size: 20px; overflow-y:auto;">
        <v-row v-if="hasclassificationNumber"
          no-gutters
          class="mt-4">
          <v-col
            cols="4"
            class="d-flex justify-center csv-row-height csv-row-text">{{ $t("F00204.S084")}}</v-col>
          <v-col
            cols="8"
            style="border:1px solid lightgray;">
            <select v-model="productClassificationNumberModel" class="SelectBox select-box-csv" style="color:#000000" tabindex="2" >
              <option v-for="(divisionItem, index) in classificationNumberList" :key="`classificationNumberList` + index + 1" :value="index + 1">{{ index + 1 }}</option>
            </select>
            <div class="pulldownArrow"></div>
          </v-col>
        </v-row>
        <v-row
          no-gutters
          class="mt-1">
          <v-col
            cols="4"
            class="d-flex justify-center csv-row-height csv-row-text">{{ $t("F32242.S011") }}</v-col>
          <v-col
            cols="8"
            class="d-flex text-start align-center px-2"
            style="border:1px solid lightgray;">
            {{ dispFileName }}
            <input
              type="file"
              @change="loadCsvFile"
              ref="fileSelect"
              style="display:none;">
          </v-col>
        </v-row>
        <v-row
          no-gutters
          class="mt-1"
          @click="btnclick">
          <v-col
            cols="3"
            offset="9"
            style="text-align: right">
            <v-btn
              class="centerButtonDiv"
              tabindex="110">
              <span style="margin-right: 15px;">{{ $t("O00004.S023") }}</span>
              <span class="selectArrow" />
            </v-btn>
          </v-col>
        </v-row>
        <table id="deviceTable">
          <!-- エラーメッセージ -->
          <tr
            v-if="this.terminalTypeErrorMsg !== ''"
            class="errorCell">
            <td colspan="2">
              <div
                v-for="terminalTypeMsg in terminalTypeErrorMsg"
                :key="terminalTypeMsg">
                <label>{{ terminalTypeMsg }}</label>
              </div>
            </td>
          </tr>
          <tr
            v-for="(worker, index) in this.workers"
            :key="index"
            class="errorCell">
            <td
              colspan="2">
              <div
                style="width: 800; color: red; margin:left;text-align: left">
                {{ worker }}
              </div>
            </td>
          </tr>
        </table>
      </v-card-text>
      <v-card-actions class="dialog-fotter">
        <v-spacer/>
        <v-btn
          class="button dialog-fotter-button-gray footerButtonStyle"
          @click="onClickReturn()"
          tabindex="112">
          {{ $t("O00004.S003") }}
        </v-btn>
        <v-btn
          class="button dialog-fotter-button-orange footerButtonStyle"
          @click="onClickSave()"
          :disabled="registerAuth"
          tabindex="113">
          {{ $t("O00004.S008") }}
        </v-btn>
      </v-card-actions>
    </v-card>
    <popup ref="pop"/>
    <csv-error-dialog
      ref="csvErrorDialog"
    />
  </v-dialog>
</template>
<!-- KSD V001.000 AE  -->
