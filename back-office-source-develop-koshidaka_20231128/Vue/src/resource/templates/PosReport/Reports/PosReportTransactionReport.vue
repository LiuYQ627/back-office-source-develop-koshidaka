<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/CommonDesign/utils.css" />
<style scoped src="@/resource/static/css/PosReport/Reports/posReportTransactionReport.css" />
<script type="text/javascript" src="@/resource/static/js/PosReport/Reports/posReportTransactionReport.js" />

<template>
  <div
    id="pdf-result-container">
    <div id="pdf-result">
      <!-- タイトルと時刻 -->
      <v-row no-gutters>
        <v-col
          cols="12"
          class="text-h5 text-center mt-10">
          {{ reportTitle }}
        </v-col>
      </v-row>
      <v-row
        no-gutters
        class="my-3">
        <v-col
          cols="2"
          class="text-h6 text-start">
          <!--店舗名-->
          {{ $t("F32231.S761") }}
        </v-col>
        <v-col class="text-h6 text-start">
          {{ storeNames }}
        </v-col>
      </v-row>
      <v-row
        no-gutters
        class="my-3"
        v-if="request.storeTotalize">
        <v-col
          cols="2"
          class="text-h6 text-start">
          <!--端末ID-->
          {{ $t("F32231.S764") }}
        </v-col>
        <v-col class="text-h6 text-start" />
      </v-row>
      <v-row
        v-else
        no-gutters
        class="my-3">
        <v-col
          cols="2"
          class="text-h6 text-start">
          <!--端末ID-->
          {{ $t("F32231.S762") }}
        </v-col>
        <v-col class="text-h6 text-start">
          {{ registerIdsText }}
        </v-col>
      </v-row>
      <v-row
        no-gutters
        class="my-3">
        <v-col
          cols="2"
          class="text-h6 text-start">
          <!--期間-->
          {{ $t("F32231.S767") }}
        </v-col>
        <v-col class="text-h6 text-start">
          {{ responseConditionStr }}
        </v-col>
      </v-row>
      <v-row
        no-gutters
        class="my-3">
        <v-col
          cols="2"
          class="text-h6 text-start">
          <!--期間ﾀｲﾌﾟ-->
          {{ $t("F32231.S763") }}
        </v-col>
        <v-col class="text-h6 text-start">
          {{ generateType(request.duration.type) }}
        </v-col>
      </v-row>
      <transaction-report-table
        :data="data"
        :request="request"
        :headers="headers" />
      <v-row v-if="overDispDataMsg">
        <v-col class="text-left over-display-msg margin-30">
          {{ overDispDataMsg }}
        </v-col>
      </v-row>
    </div>
    <!-- その他ダイアログ等 -->
    <popup ref="pop" />
    <dialog-store-select ref="dialogStoreSelect" />
    <v-overlay :value="processing">
      <div class="text-center">
        <v-progress-circular
          indeterminate
          :size="70"
          :width="7"
          color="white" />
      </div>
    </v-overlay>
  </div>
</template>
<!-- KSD V001.000 AE -->
