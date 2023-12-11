<!-- KSD V001.000 AS -->
<style src="@/resource/static/css/CommonDesign/utils.css" />
<style scoped src="@/resource/static/css/RoomInfoMasterSetting/roomInfoMasterSetting.css" />
<script type="text/javascript" src="@/resource/static/js/RoomInfoMasterSetting/roomInfoMasterSetting.js" />
<template>
  <v-container fluid class="mt-10 room-info-master-setting-outer">
    <v-container class="mt-5 room-info-master-setting-inner">
      <!-- 対象店舗 -->
      <v-row>
        <v-col cols="6" class="py-0">
          <form-group-layout
            :title="$t('C00208.S001')"
            fixedHeader
            :headerWidth="146"
          >
            <!-- 対象店舗は「店舗コード:店舗名称」の形式で表示する -->
            <store-select
              hasCodeName
              v-model="targetStoreCodes"
              headquartersAuthorityCheckEnable
              ref="storeSelect"
              :disabled="!disableForm"
              />
          </form-group-layout>
        </v-col>
      </v-row>
      <!-- データ件数 -->
      <v-row>
        <v-col cols="6" class="py-0">
          <p class="ma-0 pa-0 text-left room-info-row-count">
            {{ $t("C00208.S020") }}{{ dataCount }}{{ $t("C00208.S002") }}
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="py-0">
          <!-- 部屋一覧 -->
          <room-info-master-setting-list
            v-model="selectedIndexNo"
            :disabled="disableList"
            :table-master-list="restaurantsTableMasterList"
            :room-master-list="rentalsRoomMasterList"
            @selectionChanged="handleListSelectionChanged"
          />
        </v-col>
        <v-col class="py-0">
          <!-- 部屋設定項目欄 -->
          <room-info-master-setting-form
            ref="roomInfoMasterSettingForm"
            v-model="selectedDataModel"
            :disabled="disableForm"
            :masterList="restaurantsTableMasterList"
          />
        </v-col>
      </v-row>
    </v-container>
    <!-- その他ダイアログ等 -->
    <v-row>
      <v-col>
        <maint-button
          @close="handleCloseMaintButton"
          @fixed="handleFixedMaintButton"
          @stop="handleStopMaintButton"
          @del="handleDelMaintButton"
          :isfixedBtn="disableFixedButton"
          :isStopBtn="disableStopButton"
          :isdelBtn="disableDelButton"
          :isCloseBtn="disableCloseButton"
        />
      </v-col>
    </v-row>
    <popup ref="pop" />
  </v-container>
</template>
<!-- KSD V001.000 AE -->
