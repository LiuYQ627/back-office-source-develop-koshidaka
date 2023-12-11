<style src="@/resource/static/css/CommonDesign/utils.css" />
<style src="@/resource/static/css/PosReport/registerSelectDialog.css" />
<script type="text/javascript" src="@/resource/static/js/PosReport/registerSelectDialog.js" />

<template>
  <div>
    <common-dialog
      v-model="value"
      title="レジ番号選択"
      ok-label="保存"
      @clickBack="closeDialog"
      @clickOk="onClickOk"
      :disabled-o-k-button="!selected.length"
    >
      <v-row
        no-gutters
        class="w-100 d-flex align-center justify-center">
        <v-col
          cols="10"
          class="h-100">
          <label
            class="w-100 h-100 grayFrame d-flex align-center justify-center"
          >
            {{ "レジ番号" }}
          </label>
        </v-col>
      </v-row>

      <v-row
        v-for="(registerId, index) in registerIds"
        :key="registerId"
        no-gutters
        class="rowHeight w-100 d-flex align-center justify-center"
        :class="{ selected: isSelected[index] }"
      >
        <v-col
          cols="10"
          class="h-100">
          <label
            class="w-100 h-100 whiteFrame d-flex align-center justify-center"
            @click="clicked($event, index)"
          >
            {{ registerId }}
          </label>
        </v-col>
      </v-row>
    </common-dialog>
    <popup ref="pop" />
  </div>
</template>
