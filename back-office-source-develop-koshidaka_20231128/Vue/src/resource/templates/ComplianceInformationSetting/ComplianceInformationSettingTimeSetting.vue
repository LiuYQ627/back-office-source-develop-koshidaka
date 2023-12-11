<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/ComplianceInformationSetting/complianceInformationSettingTimeSetting.css"></style>
<script type="text/javascript" src="@/resource/static/js/ComplianceInformationSetting/complianceInformationSettingTimeSetting.js"></script>
<template>
  <div class="compliance-information-setting-time-setting">
    <v-row no-gutters>
      <v-col>
        <table class="compliance-information-setting-time-setting-table">
          <thead>
            <tr>
              <th width="50%">{{$t("C00210.S018")}}</th>
              <th width="30%">{{$t("C00210.S019")}}</th>
              <th width="20%">{{$t("C00210.S020")}}</th>
            </tr>
          </thead>
          <tbody>
            <!-- 未成年者保護者同伴 -->
            <time-division-row
              v-model="timeSettingDataModel.guardianTime"
              ref="guardianTimeStart"
              :div1Label="$t('C00210.S021')"
              :div2Label="$t('C00210.S024')"
              :displayDiv1="true"
              :displayStartTime="true"
              :displayEndTime="false"
            />
            <time-division-row
              v-model="timeSettingDataModel.guardianTime"
              ref="guardianTimeEnd"
              :div1Label="$t('C00210.S021')"
              :div2Label="$t('C00210.S025')"
              :displayDiv1="false"
              :displayStartTime="false"
              :displayEndTime="true"
            />
            <!-- 18歳未満 -->
            <time-division-row
              v-model="timeSettingDataModel.under18Time"
              ref="under18TimeStart"
              :div1Label="$t('C00210.S022')"
              :div2Label="$t('C00210.S024')"
              :displayDiv1="true"
              :displayStartTime="true"
              :displayEndTime="false"
            />
            <time-division-row
              v-model="timeSettingDataModel.under18Time"
              ref="under18TimeEnd"
              :div1Label="$t('C00210.S022')"
              :div2Label="$t('C00210.S025')"
              :displayDiv1="false"
              :displayStartTime="false"
              :displayEndTime="true"
            />
            <!-- 16歳未満 -->
            <time-division-row
              v-model="timeSettingDataModel.under16Time"
              ref="under16TimeStart"
              :div1Label="$t('C00210.S023')"
              :div2Label="$t('C00210.S024')"
              :displayDiv1="true"
              :displayStartTime="true"
              :displayEndTime="false"
            />
            <time-division-row
              v-model="timeSettingDataModel.under16Time"
              ref="under16TimeEnd"
              :div1Label="$t('C00210.S023')"
              :div2Label="$t('C00210.S025')"
              :displayDiv1="false"
              :displayStartTime="false"
              :displayEndTime="true"
            />
          </tbody>
        </table>
      </v-col>
    </v-row>
  </div>
</template>
<!-- KSD V001.000 AE -->
