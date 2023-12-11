<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/CommonDesign/utils.css"></style>
<style scoped src="@/resource/static/css/PosReport/Tables/transactionReportTable.css"></style>
<script type="text/javascript" src="@/resource/static/js/PosReport/Tables/transactionReportTable.js"></script>

<template>
  <div>
    <div
      v-for="(store, key) in data"
      :key="key">
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
            cols="auto"
            class="text-start pt-6"
            v-if="!request.storeTotalize">
            <span class="pa-4 bg-wheat rounded-t">
              {{ $t("F32231.S013") }}： {{ endpoint.endpointId }}
            </span>
          </v-col>
          <v-col
            cols="auto"
            class="text-start pt-6">
            <span class="pa-4 bg-wheat rounded-t">
              {{ $t("F32231.S767") }}：{{ store.from }} ～ {{ store.to }}
            </span>
          </v-col>
        </v-row>
        <v-data-table
          :headers="headers"
          :items="endpoint.data"
          :items-per-page="-1"
          hide-default-header
          hide-default-footer
          :no-data-text="$t('F32231.E501')"
        >
          <template slot="header">
            <thead class="v-data-table-header">
              <tr>
                <th
                  class="columnheader"
                  :style="[
                    header.width && {
                      width: header.width, minWidth: header.width
                    }
                  ]"
                  :class="[header.align && `text-${header.align}`]"
                  v-for="header in headers.slice(0, 5)"
                  :key="header.text">
                  {{ header.text }}
                </th>
              </tr>
              <tr>
                <th
                  class="columnheader"
                  :style="[
                    header.width && {
                      width: header.width, minWidth: header.width
                    }
                  ]"
                  :class="[header.align && `text-${header.align}`]"
                  v-for="header in headers.slice(0, 2)"
                  :key="header.text"/>
                <th
                  class="columnheader"
                  :style="[
                    header.width && {
                      width: header.width, minWidth: header.width
                    }
                  ]"
                  :class="[header.align && `text-${header.align}`]"
                  v-for="header in headers.slice(5)"
                  :key="header.text">
                  {{ header.text }}
                </th>
              </tr>
            </thead>
          </template>
          <template
            v-slot:body="{ items }"
            v-if="endpoint.data.length">
            <template v-for="(item, index) in items">
              <tbody>
                <tr>
                  <td class="text-center">{{ addZeros(item.code) }}</td>
                  <td class="text-start">{{ doubleByteStringSlicer(item.name, 32) }}</td>
                  <td class="text-end">{{ Number(item.setQuantity) | CommaSeparated }}</td>
                  <td class="text-end">{{ Number(item.customerCount) | CommaSeparated }}</td>
                  <td class="text-end">{{ Number(item.itemQuantity) | CommaSeparated }}</td>
                </tr>
                <tr>
                  <td class="text-center"/>
                  <td class="text-start"/>
                  <td class="text-end">{{ Number(item.occurrence) | CommaSeparated }}</td>
                  <td class="text-end">{{ Number(item.sheets) | CommaSeparated }}</td>
                  <td class="text-end">{{ maskItem(Number(item.amount)) | CommaSeparated }}</td>
                </tr>
              </tbody>
            </template>
          </template>
        </v-data-table>
      </div>
    </div>
  </div>
</template>
<!-- KSD V001.000 AE -->
