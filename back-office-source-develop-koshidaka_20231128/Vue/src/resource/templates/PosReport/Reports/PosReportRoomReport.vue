<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/CommonDesign/utils.css"/>
<style scoped src="@/resource/static/css/PosReport/Reports/posReportRoomReport.css"/>
<script type="text/javascript" src="@/resource/static/js/PosReport/Reports/posReportRoomReport.js"/>

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
      <div id="report-condition">
        <v-row
          no-gutters
          class="my-3">
          <v-col
            cols="2"
            class="text-h6 text-start">
            {{ $t("F32231.S761") }}
          </v-col>
          <v-col class="text-h6 text-start">
            {{ storeNames }}
          </v-col>
        </v-row>
        <v-row
          no-gutters
          class="my-3">
          <v-col
            cols="2"
            class="text-h6 text-start">
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
            {{ $t("F32231.S902") }}
          </v-col>
          <v-col class="text-h6 text-start">
            {{ roomNamesText }}
          </v-col>
        </v-row>
      </div>
      <template v-if="data.length>0">
        <div
          v-for="(store, key) in data"
          :key="key"
          class="per-store-table margin-30">
          <div
            class="margin-30">
              <v-col
                cols="auto"
                class="text-start pt-6">
                <span class="pa-4 bg-gray rounded-t-xl white--text text-white">
                  {{ $t("F32231.S903") }}{{ store.storeName }}
                </span>
              </v-col>
              <v-col
                cols="auto"
                class="text-start pt-6">
                <span class="pa-4 bg-wheat rounded-t">
                  {{ $t("F32231.S905") }}{{ responseConditionStr }}
                </span>
              </v-col>
            </v-row>
            <v-data-table
              :headers="headers"
              :items="store.data"
              :data-total= "store.data"
              :items-per-page="-1"
              :no-data-text="$t('F32231.E501')"
              hide-default-footer>
              <template v-slot:item="{ item }">
                <tr>
                  <td>{{ doubleByteStringSlicer(convertStringToHalfWidth(item.roomNo), 6) }}</td>
                  <td class="text-left">{{ doubleByteStringSlicer(item.roomName, 20) }}</td>
                  <td class="text-right">{{ NumberDisplayFormatter(item.useTime, 'Z9時間Z9分') }}</td>
                  <td class="text-right">{{ NumberDisplayFormatter(item.useRate, 'ZZ9.9%').replace('%', $t("F32231.S708")) }}</td>
                </tr>
              </template>
              <template v-slot:body.append="{headers}">
                <tr>
                  <td> {{ $t("F32231.S746") }} </td>
                  <td/>
                  <td class="text-end">{{ NumberDisplayFormatter(store.useTime, 'Z9時間Z9分') }}</td>
                  <td class="text-end">{{ NumberDisplayFormatter(store.useRate, 'ZZ9.9%').replace('%', $t("F32231.S708")) }}</td>
                </tr>
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
