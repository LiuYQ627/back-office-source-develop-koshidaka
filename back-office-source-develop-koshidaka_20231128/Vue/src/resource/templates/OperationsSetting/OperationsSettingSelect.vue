<style src="@/resource/static/css/OperationsSetting/operationsSettingSelect.css" />
<style src="@/resource/static/css/CommonDesign/utils.css" />
<script type="text/javascript" src="@/resource/static/js/OperationsSetting/operationsSettingSelect.js" />

<template>
  <v-container class="mt-15">

    <template>
      <!-- 設定一覧 -->
      <v-row
        no-gutters
        class="mt-8 w-100 d-flex align-center justify-center">
        <v-col
          cols="4"
          class="h-100">
          <span class="w-100 h-100 grayFrame d-flex align-center justify-center">
            {{ "変更基準日" }}
          </span>
        </v-col>
      </v-row>

      <!-- 現在の設定 -->
      <v-row
        no-gutters
        class="rowHeight w-100 d-flex align-center justify-center">
        <v-col
          cols="4"
          class="w-100 h-100 whiteFrame d-flex align-center justify-between"
        >
          <span class="h-100 w-100 d-flex align-center justify-center">{{ "現在の設定" }}</span>
          <img
            src="@/assets/ico_edit@2x.png"
            class="scrollNone editIcon mx-2"
            tabindex="0"
            width="45px"
            height="45px"
            @click="openEdit(-1)"
            @keyup.enter="openEdit(-1)"
          >
        </v-col>
      </v-row>

      <!-- 過去、予約の設定 -->
      <v-row
        v-for="(settingItem, index) in settingItems"
        :key="settingItem.executionDate"
        no-gutters
        class="rowHeight w-100 d-flex align-center justify-center"
      >
        <v-col
          cols="4"
          class="w-100 h-100 whiteFrame d-flex align-center justify-between"
        >
          <span class="h-100 w-100 d-flex align-center justify-center">{{
            settingItem.executionDate
          }}</span>
          <img
            src="@/assets/ico_edit@2x.png"
            class="scrollNone editIcon mx-2"
            tabindex="0"
            width="45px"
            height="45px"
            @click="openEdit(index)"
            @keyup.enter="openEdit(index)"
          >
        </v-col>
      </v-row>
    </template>

    <!-- その他ダイアログ等 -->
    <v-row>
      <v-col>
        <maint-button
          @close="closeTab"
          @add="addPlan" />
      </v-col>
    </v-row>
    <popup ref="pop" />
  </v-container>
</template>
