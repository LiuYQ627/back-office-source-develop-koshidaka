<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/CommonDesign/utils.css" />
<style scoped src="@/resource/static/css/StoreMasterCopy/storeMasterCopy.css" />
<script type="text/javascript" src="@/resource/static/js/StoreMasterCopy/storeMasterCopy.js" />

<template>
  <v-container class="store-master-copy-outer-body store-master-copy-outer" fluid>
    <v-container class="store-master-copy-inner">
      <v-row
        no-gutters
        class="w-100 d-flex">
        <!-- 対象店舗 -->
        <v-row
          no-gutters
          class="w-100 d-flex align-center">
          <v-col
            :cols="12"
            class="h-100">
            <form-group-layout
              :title="$t('F32254.S001')"
              fixed-header
              :header-width="146">
              <store-select
                ref="sourceStore"
                v-model="storeCode.sourceStore"
                headquarters-authority-check-enable
                @change="(storeId) => {
                  dataModel.snodeId = storeId[0],
                  discardFlag = true
                }"
              />
            </form-group-layout>
          </v-col>
        </v-row>
        <!-- に -->
        <v-row
          no-gutters
          class="w-100 d-flex align-center">
          <div class="store-master-copy-dest-arrow">
            <span class="mdi mdi-menu-down mdi-menu-down-resize" />
          </div>
        </v-row>
        <!-- コピー先店舗 -->
        <v-row
          no-gutters
          class="w-100 d-flex align-center">
          <v-col
            :cols="12"
            class="h-100">
            <form-group-layout
              :title="$t('F32254.S002')"
              fixed-header
              :header-width="146"
            >
              <store-select
                ref="destinationStore"
                v-model="storeCode.destinationStore"
                headquarters-authority-check-enable
                @change="(storeId) => {
                  dataModel.dnodeId = storeId[0],
                  discardFlag = true
                }"
              />
            </form-group-layout>
          </v-col>
        </v-row>
        <!-- 更新方法 -->
        <v-row
          no-gutters
          class="w-100 d-flex align-center"
          style="height: 50px; margin-top: 30px;">
          <v-col
            :cols="12"
            class="h-100">
            <form-group-layout
              :title="$t('F32254.S003')"
              fixed-header
              :header-width="146">
              <div class="h-100">
                <radio-button
                  v-model="updateMethod.value"
                  :labels="updateMethod.labels"
                  tabindex="-1"
                  @input="(event) => {
                    dataModel.updateMode = event,
                    discardFlag = true
                  }"
                  fit-content-width />
              </div>
            </form-group-layout>
          </v-col>
        </v-row>
      </v-row>
      <v-row
        no-gutters
        class="w-100 d-flex align-center mt-5">
        <v-btn
          class="store-master-copy-table-selector"
          @click="checkAllRows"
        >
          <label>{{ $t("F32254.S007") }}</label>
        </v-btn>
        <v-btn
          class="store-master-copy-table-selector"
          @click="uncheckAllRows"
        >
          <label>{{ $t("F32254.S008") }}</label>
        </v-btn>
        <v-row
          no-gutters
          class="w-100 d-flex mt-5">
          <v-col>
            <table-select-input
              :title="$t(`F32254.S009`)"
              class="store-master-copy-outer-body"
              :empty-option="false"
              :options="updateFlags"
              v-model="selectedFlags"
              multiple
              :body-max-height="screenHeight"/>
          </v-col>
        </v-row>
      </v-row>
      <maint-button
        @close="backToTop"
        @copy="handleCopyBtn"
        :copy-btn="isCopyDisabled"
      />
      <popup ref="pop" />
    </v-container>
  </v-container>
</template>
<!-- KSD V001.000 AE -->
