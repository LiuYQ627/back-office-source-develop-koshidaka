<style scoped src="./../../static/css/CommonDesign/commonDialog.css"></style>
<script type="text/javascript" src="./../../static/js/PresetMaster/commonDialog.js"></script>
<template>
  <v-dialog
    v-model="value"
    :width="width"
    persistent>
    <v-card>
      <v-card-title class="mx-5 borderBottomBlue">
        <font class="mx-auto font-weight-bold">{{ title }}</font>
      </v-card-title>

      <div class="dialogContent ma-5 pa-0 w-auto">
        <slot>
          <div
            v-for="i in 100"
            :key="i">Line {{ i }}<br ></div>
        </slot>
      </div>

      <v-card-actions class="pa-4 borderTopGray">
        <v-btn
          v-if="hasDeleteButton"
          class="fotterButton light-blue white--text"
        >削除</v-btn
        >
        <v-btn
          v-if="hasResetButton"
          class="fotterButton light-blue white--text"
          @click="onClickReset"
        >リセット</v-btn
        >
        <v-spacer/>
        <v-btn
          class="fotterButton grey darken-2 white--text"
          @click="onClickBack"
        >
          戻る
        </v-btn>
        <v-btn
          class="fotterButton orange white--text"
          @click="onClickOk()"
          :disabled="!hasYesButton">{{
            okLabel
          }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
