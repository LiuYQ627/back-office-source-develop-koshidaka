<!-- KSD V001.000 AS -->
<style src="@/resource/static/css/CommonDesign/utils.css" />
<style scoped src="@/resource/static/css/OptionMasterSetting/optionMasterSetting.css" />
<script type="text/javascript" src="@/resource/static/js/OptionMasterSetting/optionMasterSetting.js" />
<template>
  <v-container fluid class="mt-10 option-master-setting-outer">
    <v-container class="mt-5 option-master-setting-inner">
      <!-- 対象店舗 -->
      <v-row>
        <v-col cols="6" class="py-0" :class="{disabled:disableCloseButton}">
          <form-group-layout
            :title="$t('C00217.S001')"
            fixedHeader
            :headerWidth="146"
          >
            <!-- 対象店舗は「店舗コード:店舗名称」の形式で表示する -->
            <store-select
              hasCodeName
              v-model="targetStoreCodes"
              headquartersAuthorityCheckEnable
              ref="storeSelect"
              :disabled="disableCloseButton"
              />
          </form-group-layout>
        </v-col>
      </v-row>
      <!-- データ件数 -->
      <v-row>
        <v-col cols="6" class="py-0">
          <p class="ma-0 pa-0 text-left option-row-count">
            {{ $t("C00217.S002") }}{{ dataCount }}{{ $t("C00217.S003") }}
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6" class="py-0">
          <!-- 部屋一覧 -->
          <option-master-setting-list
            v-model="selectedDrinkCourseNo"
            :disabled="disableList"
            :option-master-list="rentalsOptionMasterList"
            @selectionChanged="handleListSelectionChanged"
          />
        </v-col>
        <v-col class="py-0">
          <!-- 部屋設定項目欄 -->
          <option-master-setting-form
            ref="optionMasterSettingForm"
            v-model="selectedDataModel"
            :disabled="disableForm"
            :targetStoreCodes="targetStoreCodes"
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
