<style src="./../../static/css/CommonDesign/dialog.css"></style>
<script type="text/javascript" src="./../../static/js/CommonDesign/dialog.js"></script>
<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      max-width="800"
    >
      <v-card>
        <v-card-title class="headline dialog-line-blue">
          <font class="dialog-title">{{ title }}</font>
        </v-card-title>

        <v-card-text>
          <div class="dialog-content">
            <!--ここにコンテンツを入れる -->
            テキスト：<input
              type="text"
              v-model="inputData.text" >
          </div>
        </v-card-text>

        <v-card-actions class="dialog-fotter">
          <v-spacer/>
          <v-btn
            class="button"
            dark
            @click="dialog = false"
          >
            戻る
          </v-btn>
          <v-btn
            class="button dialog-fotter-button-blue"
            @click="onClickOk()"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
