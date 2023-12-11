<!--
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230403  bai.ry(Neusoft)    G001.00.0  issue課題#1607を対応します.
 * 20230404  bai.ry(Neusoft)    G002.00.0  issue課題#1601を対応します.
-->
<style src="@/resource/static/css/CommonDesign/utils.css" />
<style src="@/resource/static/css/PresetMaster/categoryEditDialog.css" />
<script type="text/javascript" src="@/resource/static/js/PresetMaster/categoryEditDialog.js" />

<template>
  <div style="position: relative;">
    <common-dialog
      v-model="displayed"
      title="カテゴリ設定"
      @clickBack="closeDialog"
      @clickOk="onClickOk"
    >
      <!-- G001.00.0 Add-Start -->
      <div class="categoryMode">
        <label
          class="categoryMode_new"
          v-if="categoryMode === 1"><b>{{ $t("F00003.S012") }}</b></label>
        <label
          class="categoryMode_edit"
          v-if="categoryMode === 2"><b>{{ $t("F00003.S013") }}</b></label>
      </div>
      <!-- G001.00.0 Add-End -->
      <!-- カテゴリ名称 -->
      <v-row
        no-gutters
        class="conditionRow w-100">
        <v-col
          cols="5"
          class="h-100 grayFrame d-flex justify-center align-center"
        >
          {{ "カテゴリ名称" }}
        </v-col>
        <v-col
          cols="7"
          class="h-100">
          <input
            type="text"
            :class="this.nameError !== null ? 'errorTextBox h-100 w-100  pl-2' :'h-100 w-100 whiteFrame pl-2'"
            v-model="category.categoryName"
            placeholder="半角8文字/全角8文字以内"
            ref="nameText"
            maxlength="8"
            @input="nameInput"
          >
        </v-col>
      </v-row>
      <!-- カテゴリ名称(エラーメッセージ) -->
      <v-row
        no-gutters
        class="conditionRow w-100"
        v-if="this.nameError !== null ">
        <v-col
          cols="5"
          class="h-100"/>
        <v-col
          cols="6"
          class="h-100 mr-1"
          style="color:#f00;text-align: left;">{{ nameError }}</v-col>
      </v-row>

      <!-- 表示区分 -->
      <v-row
        no-gutters
        class="conditionRow w-100 mt-1">
        <v-col
          cols="5"
          class="h-100 grayFrame d-flex justify-center align-center"
        >
          {{ "表示区分" }}
        </v-col>
        <v-col
          cols="7"
          class="h-100">
          <radio-button
            :labels="hiddenLabels"
            v-model="category.displayFlag" />
        </v-col>
      </v-row>
    </common-dialog>
    <popup ref="pop" />
  </div>
</template>
