<!-- KSD V001.000 DS -->
<!-- <style src="@/resource/static/css/CommonDesign/utils.css"/> -->
<!-- KSD V001.000 DE -->
<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/CommonDesign/utils.css"/>
<!-- KSD V001.000 AE -->
<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/PosReport/posReportOutput.css"/>
<!-- KSD V001.000 AE -->
<script type="text/javascript" src="@/resource/static/js/PosReport/posReportOutput.js"/>

<!--
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230411  qinshh(Neusoft)   G001.00.0  issue課題#1563を対応します.
-->

<template>
  <v-container class="pos-report-output">
    <!-- KSD V001.000 DS -->
    <!-- <div id="pdf-result"> -->
    <!--   <\\!-- タイトルと時刻 --\\> -->
    <!--   <v-row no-gutters> -->
    <!--     <v-col -->
    <!--       cols="12" -->
    <!--       class="text-h5 text-center mt-10">{{ targetReport }}</v-col> -->
    <!--   </v-row> -->
    <!--   <v-row -->
    <!--     no-gutters -->
    <!--     class="my-3 px-10"> -->
    <!--     <v-col -->
    <!--       cols="2" -->
    <!--       class="text-h6 text-start">{{ "店舗" }}</v-col> -->
    <!--     <v-col class="text-subtitle-1 text-start">{{ storeNames }}</v-col> -->
    <!--   </v-row> -->
    <!--   <v-row -->
    <!--     no-gutters -->
    <!--     class="my-3 px-10"> -->
    <!--     <v-col -->
    <!--       cols="2" -->
    <!--       class="text-h6 text-start">{{ "レジ番号" }}</v-col> -->
    <!--     <v-col class="text-subtitle-1 text-start">{{ registerIdsText }}</v-col> -->
    <!--   </v-row> -->
    <!--   <v-row -->
    <!--     no-gutters -->
    <!--     class="my-3 px-10"> -->
    <!--     <v-col -->
    <!--       cols="2" -->
    <!--       class="text-h6 text-start">{{ "期間" }}</v-col> -->
    <!--     <v-col class="text-subtitle-1 text-start">{{ durationFrom }} ～ {{ durationTo }}</v-col> -->
    <!--   </v-row> -->
    <!--  -->
    <!--   <template> -->
    <!--     <div -->
    <!--       v-for="(store, key) in data" -->
    <!--       :key="key"> -->
    <!--       <div -->
    <!--         v-for="(endpoint, idx) in store.endpoints" -->
    <!--         :key="idx" -->
    <!--         :id="'store' + key.toString().padStart(2, '0')"> -->
    <!--         <v-row> -->
    <!--           <v-col -->
    <!--             cols="auto" -->
    <!--             class="text-start pt-6"> -->
    <!--             <span class="pa-4 bg-gray rounded-t-xl white--text text-white">{{ $t("F32231.S761") }}：{{ store.storeName }}</span> -->
    <!--           </v-col> -->
    <!--           <v-col -->
    <!--             cols="auto" -->
    <!--             class="text-start pt-6"> -->
    <!--             <span class="pa-4 bg-wheat rounded-t">{{ $t("F32231.S767") }}：{{ endpoint.endpointId }}</span> -->
    <!--           </v-col> -->
    <!--           <v-col -->
    <!--             cols="auto" -->
    <!--             class="text-start pt-6"> -->
    <!--             <span class="pa-4 bg-wheat rounded-t">{{ $t("F32231.S767") }}：{{ durationFrom }} ～ {{ durationTo }}</span> -->
    <!--           </v-col> -->
    <!--         </v-row> -->
    <!--         <v-data-table -->
    <!--           :headers="headers" -->
    <!--           :items="data[key].endpoints[idx].data" -->
    <!--           :sort-by="['code']" -->
    <!--           :items-per-page="-1" -->
    <!--           hide-default-footer> -->
    <!--           <template v-slot:[`item.amount`]="{ item }"> -->
    <!--             {{ item.amount.toLocaleString() }} -->
    <!--           </template> -->
    <!--         </v-data-table> -->
    <!--       </div> -->
    <!--     </div> -->
    <!--   </template> -->
    <!--  -->
    <!--   <\\!-- v-data-table :headers="headers" :items="data" :items-per-page="-1" :sort-by="['storeName', 'endpointId']" hide-default-footer> -->
    <!--     <template v-slot:[`item.amount`]="{ item }"> -->
    <!--       {{ item.amount.toLocaleString() }} -->
    <!--     </template> -->
    <!--   </v-data-table --\\> -->
    <!-- </div> -->
    <!-- KSD V001.000 DE -->

    <!-- KSD V001.000 AS -->
    <template>
      <PosReportTransactionReport
        v-if="request.reportName === 'TRANSACTION'"
        :request="request"
        :report-title="reportTitle" />
      <pos-report-group-report
        v-if="request.reportName === 'GROUP'"
        :request="request"
        :report-title="additionalProps.GROUP" />
      <pos-report-PLU-Report
        v-if="request.reportName === 'PLU'"
        :request="request"
        :report-title="reportTitle" />
      <PosReportHourZoneReport
        v-if="request.reportName === 'HOURZONE'"
        :request="request"
        :report-title="reportTitle" />
      <pos-report-user-report
        v-if="request.reportName === 'USER'"
        :request="request"
        :report-title="reportTitle" />
      <pos-report-ticket-report
        v-if="request.reportName === 'TICKET'"
        :request="request"
        :report-title="reportTitle" />
      <pos-report-room-report
        v-if="request.reportName === 'ROOM'"
        :request="request"
        :report-title="reportTitle" />
    </template>
    <popup ref="pop" />
    <!-- KSD V001.000 AE -->

    <!-- KSD V001.000 DS -->
    <!-- <\\!-- その他ダイアログ等 --\\> -->
    <!-- <v-row> -->
    <!--   <v-col> -->
    <!--     <\\!-- // G001.00.0 Add-Start -->
    <!--     <maint-button -->
    <!--       @close="backToPosReport" -->
    <!--       @output="onPDFOutput" -->
    <!--     /> --\\> -->
    <!-- <maint-button -->
    <!-- @close="backToPosReport" -->
    <!-- @output="onPDFOutput" -->
    <!-- @backPrevious="backToPrevious" -->
    <!-- /> -->
    <!-- KSD V001.000 DE -->
    <!-- <maint-button -->
    <!-- @close="backToPosReport" -->
    <!-- @output="onPDFOutput" -->
    <!-- @backPrevious="backToPrevious" -->
    <!-- /> -->
    <!-- KSD V001.000 DE -->
    <!-- KSD V001.000 AS -->
    <maint-button
      @close="backToTopPage"
      @output="onPDFOutput"
      @backPrevious="backToPrevious"
    />
    <!-- KSD V001.000 AE -->
    <!-- KSD V001.000 DS -->
    <!--
        <\\!-- // G001.00.0 Add-End --\\>
      </v-col>
    </v-row>
    -->
    <!-- KSD V001.000 DE -->
    <!-- KSD V001.000 DS -->
    <!--
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
    -->
    <!-- KSD V001.000 DE -->
  </v-container>
</template>
<!-- KSD V001.000 DS -->
<!-- <style scoped> -->
<!-- .pos-report-output { -->
<!--   max-width: initial; -->
<!--   width:100%; -->
<!--   padding-right:170px; -->
<!--   margin: 15px 0; -->
<!--   font-size: 20px; -->
<!-- } -->
<!-- .v-data-table >>> .v-data-table-header { -->
<!--   background-color:#9ea0aa; -->
<!-- } -->
<!-- .v-data-table >>> .v-data-table-header th { -->
<!--   color: white!important; -->
<!--   font-size: 1.25rem; -->
<!--   font-weight: normal; -->
<!-- } -->
<!-- .v-data-table >>> tbody tr td { -->
<!--   font-size: 1.25rem!important; -->
<!-- } -->
<!-- .v-data-table >>> tbody tr td:not(:last-child) { -->
<!--   border-right: 1px solid lightgray; -->
<!-- } -->
<!-- .bg-gray { background-color: gray; } -->
<!-- .bg-wheat { background-color: wheat; } -->
<!-- .text-white { color: white; } -->
<!-- .v-data-table { page-break-inside: auto } -->
<!-- .v-data-table >>> tbody tr { page-break-inside:avoid; page-break-after:auto } -->
<!-- */ -->
<!-- </style> -->
<!-- KSD V001.000 DE -->
