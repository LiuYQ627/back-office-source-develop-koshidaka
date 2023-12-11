<!-- KSD V001.000 AS -->
<style src="@/resource/static/css/CommonDesign/utils.css" />
<style scoped src="@/resource/static/css/CourseMasterSetting/courseMasterSetting.css" />
<script type="text/javascript" src="@/resource/static/js/CourseMasterSetting/courseMasterSetting.js" />
<template>
  <v-container fluid class="course-master-setting-outer">
    <v-container class="course-master-setting-inner">
      <!-- 対象店舗 -->
      <v-row>

        <v-col cols="6" class="py-0" :class="{disabled:!disableForm}">

          <form-group-layout
            :title="this.$i18n.t('C00215.S001')"
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
          <p class="ma-0 pa-0 text-left course-master-setting-row-count">
            {{ $t("C00215.S003") }}{{ dataCount }}{{ $t("C00215.S002") }}
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="py-0">
          <!-- 部屋一覧 -->
          <course-master-setting-list
            v-model="selectedIndexNo"
            :disabled="disableList"
            :course-master-list="courseMasterList"
            @selectionChanged="handleListSelectionChanged"
          />
        </v-col>
        <v-col class="py-0">
          <!-- 部屋設定項目欄 -->
          <course-master-setting-form
            ref="courseMasterSettingForm"
            v-model="selectedDataModel"
            :disabled="disableForm"
            :masterList="courseMasterList"
            :nodeIds="targetStoreCodes"
            @uploadedFile="getUploadedFile"
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
