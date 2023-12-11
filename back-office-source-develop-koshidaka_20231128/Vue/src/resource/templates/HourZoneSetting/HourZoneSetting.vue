<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/CommonDesign/utils.css" />
<style scoped src="@/resource/static/css/HourZoneSetting/hourZoneSetting.css"></style>
<script type="text/javascript" src="@/resource/static/js/HourZoneSetting/hourZoneSetting.js"></script>

<template>
  <v-container
    fluid
    class="hour-zone-setting-outer">
    <v-container class="hour-zone-setting-inner mt-15">
      <config-select-common-condition
        v-model="selectedSetting.propChangeDateText"
        :target-store-codes="selectedSetting.targetStoreCodes"
        :type-of-setting="selectedSetting.typeOfSetting"
        :store-header-label="$t('F322b5.S001')"
        :date-change-header-label="$t('F322b5.S002')"
        store-select-filled-width
        apply-standard-spacing
      />
      <div class="hour-zone-setting-table">
        <table>
          <thead>
            <tr>
              <th
                width="7%"
                style="padding: 4px;">
                {{ $t('F322b5.S003') }}
              </th>
              <th width="25%">{{ $t('F322b5.S004') }}</th>
              <th width="5%"/>
              <th width="25%">{{ $t('F322b5.S005') }}</th>
              <th width="25%">{{ $t('F322b5.S006') }}</th>
              <th width="5%">{{ $t('F322b5.S007') }}</th>
            </tr>
          </thead>
          <tbody
            v-for="hourZoneValue in hourZoneValueList"
            :key="hourZoneValue.order">
            <tr>
              <td>{{ numericToString(hourZoneValue.order) }}</td>
              <td>{{ formattedTime(hourZoneValue.startTime) }}</td>
              <td>{{ $t('F322b5.S008') }}</td>
              <td>{{ formattedTime(hourZoneValue.hourZone) }}</td>
              <td>{{ formattedPrintFlag(hourZoneValue.printFlag) }}</td>
              <td>
                <img
                  v-if="allowEditBtn && hourZoneValue.allowEditBtn"
                  src="@/assets/ico_edit@2x.png"
                  tabindex="0"
                  @keydown.enter="handleEditBtn(hourZoneValue)"
                  @keypress.space.prevent="handleEditBtn(hourZoneValue)"
                  @click="handleEditBtn(hourZoneValue)"
                >
                <img
                  v-else
                  src="@/assets/ico_edit_h@2x.png"
                  class="disabled-edit-icon"
                  tabindex="-1"
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </v-container>
    <hour-zone-setting-edit-dialog
      ref="hourZoneSettingEditDialog"
      v-if="showEditDialog"
      v-model="selectedHourZoneItem"
      :show-edit-dialog.sync="showEditDialog"
      :is-new-master="selectedHourZoneItem.hourZone === null"
      :business-day-start-time="selectedSetting.businessDayStartTime"
      @submit="handleUpdateHourZoneRow"
      @delete="handleDeleteHourZoneRow"
    />
    <maint-button
      @close="backToTop"
      @fixed="handleFixedBtn"
      @clone="handleCloneBtn"
      @stop="handleStopBtn"
      @del="handleDelBtn"
      :isfixed-btn="disabledFixedBtn"
      :is-clone-btn="disabledCloneBtn"
      :isdel-btn="disabledDelBtn"
    />
    <popup
      ref="pop"
      :yscroll="'hidden'"
    />
  </v-container>

</template>
<!-- KSD V001.000 AE -->
