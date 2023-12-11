<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/CommonDesign/utils.css"/>
<style scoped src="@/resource/static/css/PosReport/auditReportOutput.css" />
<script type="text/javascript" src="@/resource/static/js/PosReport/auditReportOutput.js"/>
<template>
  <v-container class="pos-report-output">
    <div
      id="pdf-result-container">
      <div id="pdf-result">
        <v-row no-gutters>
          <v-col
            cols="12"
            class="text-h5 text-center mt-10">{{ targetReport }}</v-col>
        </v-row>
        <v-row
          no-gutters
          class="my-3">
          <v-col
            cols="2"
            class="text-h6 text-start">{{ $t("F32232.S802") }}</v-col>
          <v-col
            class="text-h6 text-start"
          >{{ storeNames }}</v-col>
        </v-row>
        <v-row
          no-gutters
          class="my-3">
          <v-col
            cols="2"
            class="text-h6 text-start"
          >{{ $t("F32232.S803") }}</v-col>
          <v-col
            class=" text-h6 family-style text-start"
          >{{ registerIdsText }}</v-col>
        </v-row>
        <v-row
          no-gutters
          class="my-3">
          <v-col
            cols="2"
            class="text-h6 text-start">{{ $t("F32232.S801") }}</v-col>
          <v-col
            class=" text-h6 text-start "
          >{{ this.duration.from }} ～ {{ this.duration.to }}</v-col>
        </v-row>
        <v-row
          no-gutters
          class="my-3">
          <v-col
            cols="2"
            class="text-h6 text-start">{{ $t("F32232.S701") }}</v-col>
          <v-col
            class=" text-h6 text-start"
          >{{ auditClassificationText }}</v-col>
        </v-row>
        <audit-report-table
          v-if="data.length>0"
          :data="data"
          :headers="headers"
          :duration="duration"
        />
        <v-row v-if="overDispDataMsg">
          <v-col class="text-left error-margin over-display-msg">
            {{ overDispDataMsg }}
          </v-col>
        </v-row>
      </div>
      <v-row>
        <maint-button
          @close="toTopPage"
          @output="onPDFOutput"
          @backPrevious="backToPrevious"
        />
      </v-row>
      <popup ref="pop" />
      <dialog-store-select ref="dialogStoreSelect" />
      <v-overlay :value="processing">
        <div class="text-center">
          <v-progress-circular
            indeterminate
            :size="70"
            :width="7"
            color="white"
          />
        </div>
      </v-overlay>
    </div>
  </v-container>
</template>
<!-- KSD V001.000 AE -->
