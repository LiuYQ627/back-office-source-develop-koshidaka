<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/CommonDesign/utils.css"/>
<style scoped src="@/resource/static/css/PosReport/Reports/posReportTicketReport.css"/>
<script type="text/javascript" src="@/resource/static/js/PosReport/Reports/posReportTicketReport.js"/>

<template>
  <div
    id="pdf-result-container">
    <div
      id="pdf-result">
      <!-- タイトルと時刻 -->
      <v-row no-gutters>
        <v-col
          cols="12"
          class="text-h5 text-center mt-10 text-font">
          {{ reportTitle }}
        </v-col>
      </v-row>
      <v-row
        no-gutters
        class="my-3">
        <v-col
          cols="2"
          class="text-h6 text-start text-font">
          {{ $t("F32231.S761") }}
        </v-col>
        <v-col class="text-start text-font">
          {{ storeNames }}
        </v-col>
      </v-row>
      <v-row
        v-if="request.storeTotalize"
        no-gutters
        class="my-3">
        <v-col
          cols="2"
          class="text-h6 text-start text-font">
          {{ $t("F32231.S764") }}
        </v-col>
        <v-col class="text-start text-font"/>
      </v-row>
      <v-row
        v-else
        no-gutters
        class="my-3">
        <v-col
          cols="2"
          class="text-h6 text-start text-font">
          {{ $t("F32231.S762") }}
        </v-col>
        <v-col class="text-start text-font">
          {{ registerIdsText }}
        </v-col>
      </v-row>
      <v-row
        no-gutters
        class="my-3">
        <v-col
          cols="2"
          class="text-h6 text-start text-font">
          {{ $t("F32231.S767") }}
        </v-col>
        <v-col class="text-start text-font">
          {{ reportDuration }}
        </v-col>
      </v-row>
      <v-row
        no-gutters
        class="my-3">
        <v-col
          cols="2"
          class="text-h6 text-start text-font">
          {{ $t("F32231.S763") }}
        </v-col>
        <v-col class="text-start text-font">
          {{ selectedDurationTypeName }}
        </v-col>
      </v-row>
      <v-row
        no-gutters
        class="my-3">
        <v-col
          cols="2"
          class="text-h6 text-start text-font">
          {{ $t("F32231.S771") }}
        </v-col>
        <v-col class="text-start text-font">
          {{ request.codeDuration.from }} {{ $t("F32231.S907") }} {{ request.codeDuration.to }}
        </v-col>
      </v-row>
      <template>
        <div
          v-for="(store, key) in data"
          :key="key"
          class="per-store-table margin-30">
          <div
            v-for="(endpoint, idx) in store.endpoints"
            :key="idx"
            :id="'store' + key.toString().padStart(2, '0')"
            class="margin-30">
            <v-row>
              <v-col
                cols="auto"
                class="text-start pt-6">
                <span class="pa-4 bg-gray rounded-t-xl white--text text-white">
                  {{ $t("F32231.S903") }}{{ store.storeName }}
                </span>
              </v-col>
              <v-col
                v-show="!request.storeTotalize"
                cols="auto"
                class="text-start pt-6">
                <span class="pa-4 bg-wheat rounded-t">
                  {{ $t("F32231.S904") }}{{ endpoint.endpointId }}
                </span>
              </v-col>
              <v-col
                cols="auto"
                class="text-start pt-6">
                <span class="pa-4 bg-wheat rounded-t">
                  {{ $t("F32231.S905") }}{{ tabDuration.from }} {{ $t("F32231.S907") }} {{ tabDuration.to }}
                </span>
              </v-col>
            </v-row>
            <v-data-table
              :headers="headers"
              :items="getModifiedData(key, idx)"
              :data-total= "data[key].endpoints[idx].data"
              :items-per-page="-1"
              hide-default-footer>
              <template slot="no-data">
                <div>
                  {{ $t('F32231.E501') }}
                </div>
              </template>
              <template v-slot:body.append="{headers}">
                <tr>
                  <td
                    colspan="3"
                    class="text-left"> {{ $t("F32231.S746") }} </td>
                  <td class="text-end">{{ data[key].endpoints[idx].sheets.toLocaleString() }}</td>
                  <td class="text-end">{{ data[key].endpoints[idx].occurrence.toLocaleString() }}</td>
                  <td class="text-end">{{ maskExcessDigits(data[key].endpoints[idx].amount) }}</td>
                </tr>
              </template>
            </v-data-table>
          </div>
        </div>
      </template>
      <v-row>
        <v-col
          v-show="overDispDataMsg !== '' || overDispDataMsg !== null"
          class="text-left over-display-msg">
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
          color="white"
        />
      </div>
    </v-overlay>
  </div>
</template>
<!-- KSD V001.000 AE -->
