<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/CommonDesign/utils.css" />
<style scoped src="@/resource/static/css/PriceListDisplayMasterSetting/priceListDisplayMasterSetting.css" />
<script type="text/javascript" src="@/resource/static/js/PriceListDisplayMasterSetting/priceListDisplayMasterSetting.js" />
<template>
  <v-container
    fluid
    class="price-list-display-master-setting-outer">
    <v-container class="price-list-display-master-setting-inner">
      <!-- 対象店舗 -->
      <v-row>

        <v-col
          cols="6"
          class="py-0"
          :class="{disabled:!disableForm}">

          <form-group-layout
            :title="this.$i18n.t('C00224.S001')"
            fixed-header
            :header-width="146"
          >
            <!-- 対象店舗は「店舗コード:店舗名称」の形式で表示する -->
            <store-select
              has-code-name
              v-model="targetStoreCodes"
              headquarters-authority-check-enable
              ref="storeSelect"
              :disabled="!disableForm || this.displayPairScreen || this.displayDefaultScreen"
            />
          </form-group-layout>

        </v-col>
      </v-row>
      <!-- データ件数 -->
      <v-row v-if="!displayDefaultScreen">
        <v-col
          cols="6"
          class="py-0">
          <p class="ma-0 pa-0 text-left price-list-display-master-setting-row-count">
            {{ $t("C00224.S002") }}{{ dataCount }}{{ $t("C00224.S003") }}
          </p>
        </v-col>
      </v-row>
      <v-row v-if="displayDefaultScreen">
        <v-col
          cols="6"
          class="py-0">
          <p class="ma-0 pa-0 text-left price-list-display-master-setting-row-count">
            {{ $t("C00224.S023") }}
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          v-if="!displayPairScreen && !displayDefaultScreen"
          class="py-0">
          <!-- 部屋一覧 -->
          <price-list-display-master-setting-list
            v-model="selectedIndexNo"
            :disabled="disableList"
            :price-list-display-master-list="priceListDisplayList"
            @selectionChanged="handleListSelectionChanged"
          />
        </v-col>
        <v-col
          v-if="!displayPairScreen && !displayDefaultScreen"
          class="py-0">
          <!-- 部屋設定項目欄 -->
          <price-list-display-master-setting-form
            ref="priceListDisplayMasterSettingForm"
            v-model="selectedDataModel"
            :disabled="disableForm"
            :master-list="priceListDisplayList"
            :node-ids="targetStoreCodes"
            :room-course-master-list="roomCourseList"
          />
        </v-col>
      </v-row>
      <v-row v-if="displayPairScreen">
        <v-col
          class="py-0">
          <!-- CS KSD V001.000 #83629 -->
          <!-- <price-list-display-master-setting-pair-display
            ref="priceListDisplayMasterSettingPairDisplay"
            v-model="selectedDataModel"
            :disabled="disablePairDisplay"
            :price-list-display-list="priceListDisplayList"
            :node-ids="targetStoreCodes"
            :room-course-master-list="roomCourseList" 
          /> -->
          <price-list-display-master-setting-pair-display
            ref="priceListDisplayMasterSettingPairDisplay"
            v-model="selectedDataModel"
            :disabled="disablePairDisplay"
            :price-list-display-list="priceListDisplayList"
            :node-ids="targetStoreCodes"
            :room-course-master-list="roomCourseList" 
          />
          <!-- CE KSD V001.000 #83629 -->
        </v-col>
      </v-row>
      <v-row
        v-if="displayDefaultScreen">
        <v-col
          class="py-0">
          <price-list-display-master-setting-default-display
            ref="priceListDisplayMasterSettingDefaultDisplay"
            v-model="selectedDataModel"
            :disabled="disableDefaultDisplay"
            :master-list="priceListDisplayList"
            :node-ids="targetStoreCodes"
            :price-list-display-default-list="priceListDisplayDefaultList"
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
          @pair="handlePairMaintButton"
          @default="handleDefaultMaintButton"
          @backPrevious="handleBackPreviousButton"
          :isfixed-btn="disableFixedButton"
          :is-stop-btn="disableStopButton"
          :isdel-btn="disableDelButton"
          :is-close-btn="disableCloseButton"
          :ispair-btn="disablePairButton"
          :isdefault-btn="disableDefaultButton"
          :isback-previous-btn="disableBackPreviousButton"
        />
      </v-col>
    </v-row>
    <popup ref="pop" />
  </v-container>
</template>
<!-- KSD V001.000 AE -->
