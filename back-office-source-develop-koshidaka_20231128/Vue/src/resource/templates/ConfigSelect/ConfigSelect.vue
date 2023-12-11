<!-- KSD V001.000 DS -->
<!-- <style src="@/resource/static/css/ConfigSelect/configSelect.css" /> -->
<!-- <style src="@/resource/static/css/CommonDesign/utils.css" /> -->
<!-- KSD V001.000 DE -->
<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/ConfigSelect/configSelect.css" />
<style scoped src="@/resource/static/css/CommonDesign/utils.css" />
<!-- KSD V001.000 AE -->
<script type="text/javascript" src="@/resource/static/js/ConfigSelect/configSelect.js" />

<template>
  <!-- KSD V001.000 DS -->
  <!-- <v-container class="mt-15"> -->
  <!--   店舗選択エリア -->
  <!--   <v-row -->
  <!--     no-gutters -->
  <!--     class="rowHeight w-100 d-flex justify-center align-center" -->
  <!--   > -->
  <!--     <v-col -->
  <!--       cols="2" -->
  <!--       class="h-100"> -->
  <!--       <label -->
  <!--         for="targetStores" -->
  <!--         class="grayFrame h-100 w-100 d-flex justify-center align-center" -->
  <!--       > -->
  <!--         {{ "店舗" }} -->
  <!--       </label> -->
  <!--     </v-col> -->
  <!--     <v-col -->
  <!--       cols="6" -->
  <!--       class="h-100 d-flex align-center"> -->
  <!--       <store-select v-model="targetStoreCodes" /> -->
  <!--     </v-col> -->
  <!--     </v-row> -->

  <!--     設定一覧 -->
  <!--     <v-row -->
  <!--       no-gutters -->
  <!--       class="mt-8 w-100 d-flex align-center justify-center"> -->
  <!--       <v-col -->
  <!--         cols="4" -->
  <!--         class="h-100"> -->
  <!--         <span class="w-100 h-100 grayFrame d-flex align-center justify-center"> -->
  <!--          {{ "変更基準日" }} -->
  <!--         </span> -->
  <!--       </v-col> -->
  <!--     </v-row> -->

  <!--     過去、予約の設定 -->
  <!--     <v-row -->
  <!--       v-for="(settingItem, index) in settingItems" -->
  <!--       :key="settingItem.date" -->
  <!--       no-gutters -->
  <!--       class="rowHeight w-100 d-flex align-center justify-center" -->
  <!--     > -->
  <!--       <v-col -->
  <!--         cols="4" -->
  <!--         class="w-100 h-100 whiteFrame d-flex align-center justify-between" -->
  <!--       > -->
  <!--       <span class="h-100 w-100 d-flex align-center justify-center">{{ -->
  <!--         settingItem.date -->
  <!--       }}</span> -->
  <!--       <img -->
  <!--         src="@/assets/ico_edit@2x.png" -->
  <!--         class="scrollNone editIcon mx-2" -->
  <!--         tabindex="0" -->
  <!--         width="45px" -->
  <!--         height="45px" -->
  <!--         @click="openEdit(index)" -->
  <!--         @keyup.enter="openEdit(index)" -->
  <!--         > -->
  <!--       </v-col> -->
  <!--     </v-row> -->

  <!--     その他ダイアログ等 -->
  <!--     <v-row> -->
  <!--       <v-col> -->
  <!--       <maint-button -->
  <!--         @close="closeTab" -->
  <!--         @add="addPlan" /> -->
  <!--       </v-col> -->
  <!--     </v-row> -->
  <!--     <popup ref="pop" /> -->
  <!-- </v-container> -->
  <!-- KSD V001.000 DE -->
  <!-- KSD V001.000 AS -->
  <div>
    <!-- 店舗選択エリア -->
    <form-group-layout
      :title="storeSelectLabel ? storeSelectLabel : $t('F00004.S023')"
      fixed-header
      :header-width="140">
      <store-select
        headquarters-authority-check-enable
        ref="storeSelect"
        v-model="targetStoreCodes"
        :disabled="!sessionUserData.headquartersAuthority"
      />
    </form-group-layout>
    <!-- 設定一覧 -->
    <v-row
      no-gutters
      class="config-select-table-container">
      <v-col
        v-if="showConfigsTable"
        class="config-select-table">
        <table>
          <thead>
            <tr>
              <th colspan="2">
                {{ configsTableTitle ? configsTableTitle : $t('F322b5.S002') }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(settingItem, index) in settingItems"
              :key="settingItem.executionDate">
              <td>{{ settingItem.executionDate }}</td>
              <td width="15%">
                <img
                  src="@/assets/ico_edit@2x.png"
                  tabindex="0"
                  @click="openEdit(index)"
                  @keyup.enter="openEdit(index)"
                  @keyup.space="openEdit(index)"
                >
              </td>
            </tr>
          </tbody>
        </table>
      </v-col>
    </v-row>
    <!-- その他ダイアログ等 -->
    <maint-button
      @close="closeTab"
      @add="addPlan"
      :isadd-btn="disableAddButton"/>
    <popup ref="pop" />
  </div>
  <!-- KSD V001.000 AE -->
</template>
