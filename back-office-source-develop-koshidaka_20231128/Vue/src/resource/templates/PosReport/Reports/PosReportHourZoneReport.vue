<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/CommonDesign/utils.css"/>
<style scoped src="@/resource/static/css/PosReport/Reports/posReportHourZoneReport.css"/>
<script type="text/javascript" src="@/resource/static/js/PosReport/Reports/posReportHourZoneReport.js"/>

<template>
  <div
    id="pdf-result-container">
    <div
      id="pdf-result">
      <!-- タイトルと時刻 -->
      <v-row no-gutters>
        <v-col
          cols="12"
          class="text-h5 text-center mt-10">
          {{ reportTitle }}
        </v-col>
      </v-row>
      <div id="report-condition">
        <!-- 店舗名 -->
        <v-row
          no-gutters
          class="my-3">
          <v-col
            cols="2"
            class="text-h6 text-start">
            {{ $t('F32231.S761') }}
          </v-col>
          <v-col class="text-h6 text-start">
            {{ storeNames }}
          </v-col>
        </v-row>
        <!-- 端末ID -->
        <v-row
          no-gutters
          class="my-3">
          <v-col
            cols="2"
            class="text-h6 text-start">
            {{ isTotalized ? $t('F32231.S764') : $t('F32231.S762') }}
          </v-col>
          <v-col
            v-if="!isTotalized"
            class="text-h6 text-start">
            {{ registerIdsText }}
          </v-col>
        </v-row>
        <!-- 日付  -->
        <v-row
          no-gutters
          class="my-3">
          <v-col
            cols="2"
            class="text-h6 text-start">
            {{ $t('F32231.S906') }}
          </v-col>
          <v-col class="text-h6 text-start">
            {{ reportDate }}
          </v-col>
        </v-row>
        <!-- 時間帯 -->
        <v-row
          no-gutters
          class="my-3">
          <v-col
            cols="2"
            class="text-h6 text-start">
            {{ $t('F32231.S768') }}
          </v-col>
          <v-col class="text-h6 text-start">
            {{ hourZoneDuration }}
          </v-col>
        </v-row>
        <!-- 売上 -->
        <v-row
          no-gutters
          class="my-3">
          <v-col
            cols="2"
            class="text-h6 text-start">
            {{ $t('F32231.S793') }}
          </v-col>
          <v-col class="text-h6 text-start">
            {{ salesCode }}
          </v-col>
        </v-row>
        <!-- 集計時間 -->
        <v-row
          no-gutters
          class="my-3">
          <v-col
            cols="2"
            class="text-h6 text-start">
            {{ $t('F32231.S794') }}
          </v-col>
          <v-col class="text-h6 text-start">
            {{ aggregateTime }}
          </v-col>
        </v-row>
      </div>
      <template>
        <div
          class="table-separator margin-30"
          v-for="(store, key) in data"
          :key="key">
          <div
            v-for="(endpoint, idx) in store.endpoints"
            :key="idx"
            :id="'store' + key.toString().padStart(2, '0')"
            class="table-separator margin-30">
            <v-row>
              <v-col
                cols="auto"
                class="text-start pt-6">
                <span class="pa-4 bg-gray rounded-t-xl white--text text-white">
                  {{ `${$t('F32231.S761')}${$t('F32231.S702')} ${store.storeName}` }}
                </span>
              </v-col>
              <v-col
                v-if="!isTotalized"
                cols="auto"
                class="text-start pt-6">
                <span class="pa-4 bg-wheat rounded-t">
                  {{ `${$t('F32231.S762')}${$t('F32231.S702')} ${endpoint.endpointId}` }}
                </span>
              </v-col>
              <v-col
                cols="auto"
                class="text-start pt-6">
                <span class="pa-4 bg-wheat rounded-t">
                  {{ `${$t('F32231.S906')}${$t('F32231.S702')} ${tableDateStrip}` }}
                </span>
              </v-col>
            </v-row>
            <v-data-table
              :headers="headers"
              :items="endpoint.data"
              :items-per-page="-1"
              hide-default-header
              hide-default-footer
            >
              <template slot="header">
                <thead class="v-data-table-header">
                  <!-- 責任者コード | 名称 -->
                  <tr>
                    <th
                      class="columnheader"
                      :style="[
                        header.width && {
                          width: header.width, minWidth: header.width
                        }
                      ]"
                      :class="[header.align && `text-${header.align}`]"
                      v-for="header in headers"
                      :key="header.text">
                      {{ header.text }}
                    </th>
                  </tr>
                </thead>
              </template>
              <template
                v-slot:body="{ items }">
                <template v-if="endpoint.data.length === 0">
                  <tbody>
                    <tr class="text-center v-data-table__empty-wrapper">
                      <td colspan="5">{{ $t('F32231.E501') }}</td>
                    </tr>
                  </tbody>
                </template>
                <template v-if="endpoint.data.length">
                  <tbody
                    v-for="data in items"
                    :key="data.hourZoneNumber">
                    <tr>
                      <td class="text-left">{{ hourFormatter(data.hourZoneName) }}</td>
                      <td class="text-end">{{ (Number(data.saleKyakusu) || 0) | CommaSeparated }}</td>

                      <td class="text-end">{{ (request.aggregateTime === 0 ? (Number(data.checkSalesItemQuantity) || 0) : (Number(data.orderSalesItemQuantity) || 0)) | CommaSeparated }}</td>
                      <td class="text-end">{{ (request.aggregateTime === 0 ? maskItem((Number(data[`checkSales${request.sale + 1}Amount`]) || 0)) : maskItem((Number(data[`orderSales${request.sale + 1}Amount`]) || 0))) | CommaSeparated }}</td>
                    </tr>
                  </tbody>
                </template>
                <!-- 合計 -->
                <tbody class="row-group-border">
                  <tr>
                    <td class="text-left">{{ $t('F32231.S746') }}</td>
                    <td class="text-end">{{ Number(endpoint.saleKyakusu).toLocaleString() }}</td>
                    <td class="text-end">{{ (request.aggregateTime === 0 ? (Number(endpoint.checkSalesItemQuantity) || 0) : (Number(endpoint.orderSalesItemQuantity) || 0)) | CommaSeparated }}</td>
                    <td class="text-end">{{ (request.aggregateTime === 0 ? maskItem((Number(endpoint[`checkSales${request.sale + 1}Amount`]) || 0)) : maskItem((Number(endpoint[`orderSales${request.sale + 1}Amount`]) || 0))) | CommaSeparated }}</td>
                  </tr>
                </tbody>
              </template>
            </v-data-table>
          </div>
        </div>
      </template>
      <v-row v-if="overDispDataMsg">
        <v-col class="text-left over-display-msg">
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
