<style src="@/resource/static/css/StoreOperationsSetting/StoreOperationsSettingSelect.css" />
<style src="@/resource/static/css/CommonDesign/utils.css" />
<script type="text/javascript" src="@/resource/static/js/StoreOperationsSetting/StoreOperationsSettingSelect.js" />

 <!--
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230103  litie(Neusoft)    G001.00.0  issue課題#1058を対応します.
-->

<template>
  <!-- KSD V001.000 DS -->
  <!-- <v-container class="mt-15"> -->
  <!-- KSD V001.000 DE -->
  <!-- KSD V001.000 AS -->
  <v-container class="content-body mt-15">
  <!-- KSD V001.000 AE -->
    <!-- 店舗選択エリア -->
    <v-row
      no-gutters
      class="rowHeight w-100 d-flex justify-center align-center"
    >
      <v-col
        cols="2"
        class="h-100">
        <label
          for="targetStores"
          class="grayFrame h-100 w-100 d-flex justify-center align-center"
        >
          {{ "店舗" }}
        </label>
      </v-col>
      <v-col
        cols="6"
        class="h-100 d-flex align-center">
        <!-- G001.00.0 Update-Start -->
        <!-- <store-select v-model="targetStoreCodes" @change="changedStore" /> -->
        <store-select
          v-model="targetStoreCodes"
          @change="changedStore"
          headquarters-authority-check-enable />
          <!-- G001.00.0 Update-End -->
      </v-col>
    </v-row>

    <template v-if="targetStoreCodes.length > 0">
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
        <!-- KSD V001.000 MS -->
        <!-- <maint-button
          @close="closeTab"
          @add="addPlan" /> -->
        <maint-button
          @close="closeTab"
          @add="addPlan"
          :isadd-btn="!isCloudposAdmin"/>
          <!-- KSD V001.000 ME -->
      </v-col>
    </v-row>
    <popup ref="pop" />
  </v-container>
</template>
