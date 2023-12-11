<!-- KSD V001.000 AS -->
<style src="@/resource/static/css/CommonDesign/classificationNumberCsvDialog.css"></style>
<script type="text/javascript" src="@/resource/static/js/CommonDesign/classificationNumberCsvDialog.js"></script>
<template>
  <v-dialog
    width="560px"
    height="540px"
    v-model="dialog"
    persistent>
    <v-card class="classification-number-csv-dialog">
      <v-card-title class="headline dialog-line-blue">
        <font class="dialog-title">{{ $t("F00204.S083")}}</font>
      </v-card-title>
      <v-card-text style="height: 354px; font-size: 20px; overflow-y:auto;">
        <v-row
          no-gutters
          class="mt-4">
          <v-col
            cols="4"
            class="d-flex justify-center"
            style="border:1px solid gray; color: white; background-color:#9ea0aa;">{{ $t("F00204.S084")}}</v-col>
          <v-col
            cols="8"
            style="border:1px solid lightgray;">
            <select v-model="productClassificationNumberModel" class="SelectBox" style="color:#000000" tabindex="2" >
              <option v-for="(divisionItem, index) in classificationNumberList" :key="`classificationNumberList` + index + 1" :value="index + 1">{{ index + 1 }}</option>
            </select>
            <div class="pulldownArrow"></div>
          </v-col>
        </v-row>
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
          tabindex="113">
          {{ $t("O00004.S008") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<!-- KSD V001.000 AE  -->
