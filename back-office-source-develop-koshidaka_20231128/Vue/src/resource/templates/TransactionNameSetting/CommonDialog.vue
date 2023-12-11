<style scoped src="./../../static/css/TransactionNameSetting/commonDialog.css"></style>
<script type="text/javascript" src="./../../static/js/TransactionNameSetting/commonDialog.js"></script>
<template>
  <v-dialog
    v-model="value"
    :width="width"
    persistent>
    <v-card>
      <v-card-title class="headline dialog-line-blue title-label">
        <div id="changeLabel">
          <label
            id="newModelabel"
            v-if="mode === 1"><b>{{ $t("F00108.S013") }}</b></label>
          <label
            id="changeModelabel"
            v-if="mode === 2"><b>{{ $t("F00108.S014") }}</b></label>
        </div>
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
          :disabled="!hasYesButton"
          class="fotterButton orange white--text"
          @click="onClickOk()">{{
            okLabel
          }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
