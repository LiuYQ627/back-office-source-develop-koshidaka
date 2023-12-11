<style scoped src="./../../static/css/CommonDesign/commonDialog.css"></style>
<script type="text/javascript" src="./../../static/js/CommonDesign/commonDialog.js"></script>
 <!--
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20221220  litie(Neusoft)    G001.00.0  issue課題#937を対応します.
 * 20230131  litie(Neusoft)    G002.00.0  issue課題#835を対応します.
-->
<template>
  <v-dialog
    v-model="value"
    :width="width"
    persistent>
    <v-card>
      <v-card-title class="mx-5 borderBottomBlue">
        <!-- KSD V001.000 AS -->
        <div
          v-if="hasModeLabel"
          class="copy-dialog-mode-label">
          <label :class="isNewMode ? 'copy-dialog-mode-label-new' : 'copy-dialog-mode-label-edit'">
            <b>{{ isNewMode
              ? newModeLabel.length === 0 ? $t('F322b5.S009') : newModeLabel
              : editModeLabel.length === 0 ? $t('F322b5.S011') : editModeLabel
            }}</b>
          </label>
        </div>
        <!-- KSD V001.000 AE -->
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
        <!-- KSD V001.000 DS -->
        <!-- <v-btn -->
        <!--   v-if="hasDeleteButton" -->
        <!--   class="fotterButton light-blue white--text" -->
        <!--   >削除</v-btn -->
        <!-- > -->
        <!-- KSD V001.000 DE -->
        <!-- KSD V001.000 AS -->
        <v-btn
          v-if="hasDeleteButton"
          class="fotterButton light-blue white--text"
          @click="onClickDelete"
        >
          {{ deleteBtnLabel.length === 0 ? $t('F322b5.S016') : deleteBtnLabel }}
        </v-btn>
        <!-- KSD V001.000 AE -->
        <!-- G001.00.0 Update-Start -->
        <v-btn
          v-if="hasResetButton"
          class="fotterButton light-blue white--text"
          @click="onClickReset"
        >リセット</v-btn
        >
        <!-- G001.00.0 Update-End -->
        <v-spacer/>
        <v-btn
          class="fotterButton grey darken-2 white--text"
          @click="onClickBack">
          <!-- KSD V001.000 DS -->
          <!-- 戻る -->
          <!-- KSD V001.000 DE -->
          <!-- KSD V001.000 AS -->
          {{ backBtnLabel.length === 0 ? $t('F322b5.S014') : backBtnLabel }}
          <!-- KSD V001.000 AS -->
        </v-btn>
        <!-- KSD V001.000 DS -->
        <!-- G002.00.0 Update-Start -->
        <!-- <v-btn v-if="hasOKButton" class="fotterButton orange white--text" @click="onClickOk()">{{
          okLabel
        }}</v-btn> -->
        <!-- <v-btn -->
        <!--   :disabled="!hasOKButton || disabledOKButton" -->
        <!--   class="fotterButton orange white--text" -->
        <!--   @click="onClickOk()"> -->
        <!--   {{ okLabel }} -->
        <!-- </v-btn> -->
        <!-- G002.00.0 Update-End -->
        <!-- KSD V001.000 DE -->
        <!-- KSD V001.000 AS -->
        <!-- DS KSD V001.000 83800 -->
        <!-- <v-btn
          :disabled="!hasOKButton || disabledOKButton"
          class="fotterButton orange white--text"
          @click="onClickOk()"
          @keydown.tab="handleTabKey">
          {{ okLabel }}
        </v-btn> -->
        <!-- DE KSD V001.000 83800 -->
        <!-- AS KSD V001.000 83800 -->
        <v-btn
          v-if="hasDisplayButton"
          :disabled="!hasOKButton || disabledOKButton"
          class="fotterButton orange white--text"
          @click="onClickOk()"
          @keydown.tab="handleTabKey">
          {{ okLabel }}
        </v-btn>
        <!-- AE KSD V001.000 83800 -->
        <!-- KSD V001.000 AE -->
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
