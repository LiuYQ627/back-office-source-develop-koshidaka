<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/CommonDesign/utils.css" />
<style scoped src="@/resource/static/css/RoomInfoSubSetting/roomInfoSubSetting.css"></style>
<script type="text/javascript" src="@/resource/static/js/RoomInfoSubSetting/roomInfoSubSetting.js"/>

<template>
  <v-container>
    <!-- 対象店舗 -->
    <v-row class="no-gutters conditionRow w-100 d-flex align-center">
      <form-group-layout
        :title="$t('C00221.S001')"
        fixedHeader
        :headerWidth="146"
      >
        <store-select hasCodeName
          v-model="targetStoreCodes"
          headquartersAuthorityCheckEnable
          @change="(i) => handleStoreChange(i)"
          ref="storeSelect"
          :disabled="disabledParamPanel"
        />
      </form-group-layout>
    </v-row>
    <!-- パラメーター -->
    <div  v-if="showDetailPanels" class="mt-30">
      <v-row class="no-gutters conditionRow d-flex align-center">
        <v-col cols="2" class="h-100 primary">
          <label for="targetStore" class="grayFrame h-100 w-100 d-flex justify-center align-center">
            {{ $t("C00221.S002") }}
          </label>
        </v-col>
        <v-col cols="4" class="h-100 d-flex align-center pr-1">
            <room-select
              v-model="targetRoom"
              :roomDataList="masterRooms"
              :disabled="disabledParamPanel"
              @change="handleRoomChange()"
              ref="roomSelectDialog"
            />
        </v-col>
        <v-col cols="2" class="h-100 pl-1">
          <label for="targetStore" class="grayFrame h-100 w-100 d-flex justify-center align-center">
            {{ $t("C00221.S003") }}
          </label>
        </v-col>
        <v-col cols="4" class="h-100">
          <weekday-division-select
            :weekdayDivisionList="masterWeekdayDivisions"
            @change="(i) => handleWeekdaySelection(i)"
            :disabled="disabledParamPanel"
            ref="weekdayDivisionSelectOption"
          />
          <div class="pulldownArrow" v-if="!disabledParamPanel"/>
        </v-col>
      </v-row>
    </div>
    <div v-if="showDetailPanels" class="mt-30">
      <!-- 編集 -->
      <v-row class="no-gutters align-center ">
        <v-col cols="12">
          <v-btn
            align-center
            @click="handleEditTimeSettingPanel"
            tabindex="0"
            :disabled="disabledEditBtn"
            :id="disabledEditBtn ? 'disable-display_btn' : 'display-button'"
            >
            {{ $t("C00221.S016") }}
          </v-btn>
        </v-col>
      </v-row>
    </div>
    <div v-if="showDetailPanels" class="no-gutters w-100 mt-30">
      <!-- 時間区分 -->
      <table class="table-layout">
        <thead>
          <tr class="table-header">
            <th colspan="2" width="40%"> {{ $t("C00221.S004") }} </th>
            <th width="20%"> {{ $t("C00221.S005") }} </th>
            <th width="5%"> {{ "" }} </th>
            <th width="20%"> {{ $t("C00221.S006") }} </th>
            <th width="15%"> {{ $t("C00221.S007") }} </th>
          </tr>
        </thead>
        <tbody>
          <time-division-row
            v-model="timeSetting.timeDivision1"
            ref="timeDivision1"
            :divLabel="$t('C00221.S008')"
            :disabled="disabledInputs"
          />
          <time-division-row
            v-model="timeSetting.timeDivision2"
            ref="timeDivision2"
            :divLabel="$t('C00221.S009')"
            :disabled="disabledInputs"
          />
          <time-division-row
            v-model="timeSetting.timeDivision3"
            ref="timeDivision3"
            :divLabel="$t('C00221.S010')"
            :disabled="disabledInputs"
            />
          <time-division-row
            v-model="timeSetting.timeDivision4"
            ref="timeDivision4"
            :divLabel="$t('C00221.S011')"
            :disabled="disabledInputs"
          />
        </tbody>
      </table>
    </div>
    <!-- その他ダイアログ等 -->
    <v-row>
      <v-col>
        <maint-button
          @close="backToTop"
          @fixed="handleSaveRoomSubSetting"
          @stop="handleCancel"
          @copy="handleCopyBtn"
          :isCloseBtn="disabledCloseBtn"
          :isfixedBtn="disabledSaveBtn"
          :isStopBtn="disabledSaveBtn"
          :copyBtn="disabledCopyBtn"
        />
      </v-col>
    </v-row>
    <common-select-dialog
      ref="commonSelectDialog"
      :tableHeaderTitle="this.$i18n.t('C00221.S019')"
      :tableLeftUpperLabel="this.$i18n.t('C00221.S015')"
      :tableLeftFirstTitle="this.$i18n.t('C00221.S017')"
      :tableLeftSecondTitle="this.$i18n.t('C00221.S020')"
      :tableRightUpperLabel="this.$i18n.t('C00221.S018')"
      :tableRightFirstTitle="this.$i18n.t('C00221.S017')"
      :tableRightSecondTitle="this.$i18n.t('C00221.S020')"
      @clickSubmit="handleCopyRoomSubSetting"
    />

    <popup ref="pop" />
  </v-container>
</template>
<!-- KSD V001.000 AE -->
