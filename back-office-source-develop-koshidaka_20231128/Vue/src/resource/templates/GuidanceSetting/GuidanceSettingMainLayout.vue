<!-- KSD V001.000 AS -->
<style scoped src='@/resource/static/css/CommonDesign/utils.css' />
<style scoped src='@/resource/static/css/MasterCommon/masterCommon.css'></style>
<style scoped src='@/resource/static/css/GuidanceSetting/GuidanceSettingMainLayout.css'></style>
<script type="text/javascript" src="@/resource/static/js/GuidanceSetting/guidanceSettingMainLayout.js" />

<template>
  <v-container
    fluid
    class='guidance-setting-outer'>
    <v-container class='guidance-setting-inner'>
      <v-row>
        <v-col
          cols='8'
          class='py-0 guidance-setting-store-select'>
          <!-- 対象店舗 -->
          <form-group-layout
            :title="$t('F32283.S001')"
            fixed-header
            :header-width='146'
          >
            <!-- 対象店舗は「店舗コード:店舗名称」の形式で表示する -->
            <store-select
              v-model='targetStoreCodes'
              :disabled="disableSelectionList"
              headquarters-authority-check-enable
              ref='storeSelect'
            />
          </form-group-layout>
        </v-col>
      </v-row>
      <div v-show="hideScreenContent">
        <v-row class='guidance-setting-spacing'>
          <v-col
            cols='8'
            class='guidance-setting-type-select'>
            <!-- ガイダンス種別選択 -->
            <form-group-layout
              :title="$t('F32283.S002')"
              fixed-header
              :header-width='260'
            >
              <select-input
                class='form-control'
                :disabled="disableSelectionList"
                v-model='dataModel.selectData'
                :options='selectDataOptions'
                :empty-option='false'
              />
            </form-group-layout>
          </v-col>
        </v-row>
        <v-row class='guidance-left-row'>
          <v-col cols='4'>
            <!-- ガイダンス一覧 -->
            <div style="text-align: left;">{{ $t("F32283.S009") }}</div>
            <guidance-setting-list
              :select-data-option='Number(dataModel.selectData)'
              v-model='selectedIndexNo'
              :disabled='disableList'
              :guidance-setting-list='guidanceSettingList'
              @selectionChanged='handleListSelectionChanged'
            />
          </v-col>
          <v-col style="margin-top: 30px; margin-left: 21px;">
            <guidance-setting-form
              :select-data-option='Number(dataModel.selectData)'
              ref='GuidanceSettingForm'
              v-model='selectedDataModel'
              :disabled='disableForm'
              :target-store-codes='targetStoreCodes'
              :global-menu-codes='globalMenuCodesList'/>
          </v-col>
        </v-row>
      </div>
      <v-row>
        <v-col>
          <maint-button
            @close="handleCloseMaintButton"
            @fixed="handleFixedMaintButton"
            @stop="handleStopMaintButton"
            @del="handleDelMaintButton"
            :isfixed-btn="disableFixedButton"
            :is-stop-btn="disableStopButton"
            :isdel-btn="disableDelButton"
            :is-close-btn="disableCloseButton"
          />
        </v-col>
      </v-row>
    </v-container>
    <popup ref="pop" />
  </v-container>
</template>
<!-- KSD V001.000 AE -->
