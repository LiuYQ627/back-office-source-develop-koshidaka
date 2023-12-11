<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/CommonDesign/utils.css"></style>
<style scoped src="@/resource/static/css/PosReport/Tables/auditReportTable.css"></style>
<script type="text/javascript" src="@/resource/static/js/PosReport/Tables/auditReportTable.js"></script>

<template>
  <div>
    <div
      v-for="(store, key) in data"
      :key="key">
      <div
        v-for="(endpoint, idx) in store.endpoints"
        :key="idx"
        :id="'store' + key.toString().padStart(2, '0')">
        <v-row>
          <v-col
            cols="auto"
            class="text-start pt-6">
            <span class="pa-4 bg-gray rounded-t-xl white--text text-white">
              {{ $t("F32232.S903") }}{{ store.storeName }}
            </span>
          </v-col>
          <v-col
            cols="auto"
            class="text-start pt-6">
            <span class="pa-4 bg-wheat rounded-t">
              {{ $t("F32232.S904") }}{{ endpoint.endpointId }}
            </span>
          </v-col>
          <v-col
            cols="auto"
            class="text-start pt-6">
            <span class="pa-4 bg-wheat rounded-t">
              {{ $t("F32232.S905") }}{{ duration.from }} ～ {{ duration.to }}
            </span>
          </v-col>
        </v-row>
        <v-data-table
          :headers="headers[0]"
          :items="data[key].endpoints[idx].data"
          :items-per-page="-1"
          :no-data-text="$t('F32231.E501')"
          hide-default-header
          hide-default-footer
        >
          <template slot="header">
            <thead class="v-data-table-header audit-thead">
              <tr
                class="columnheader audit-thead-tr"
                v-for="(header, idx) in headers"
                :key="idx">
                <th
                  v-for="(dataRow, dataIdx) in header"
                  :key="dataIdx"
                  :class="[dataRow.align && `justify-${dataRow.align}`]"
                  :style="[ dataRow.width && { width: dataRow.width, minWidth: dataRow.width}]">
                  {{ dataRow.text }}
                </th>
              </tr>
            </thead>
          </template>
          <template
            v-slot:body="{ items }"
            v-if="endpoint.data.length">
            <template
              class="d-flex"
            >
              <tbody
                v-for="(item, idx) in items"
                :key="idx"
                class="audit-body">
                <tr>
                  <td
                    :class="[headers[0][0].align && `justify-${headers[0][0].align}`]"
                    :style="[headers[0][0].width && { width: headers[0][0].width }]">{{ doubleByteStringSlicer(item.auditName, 20) }}</td>
                  <td
                    :class="[headers[0][1].align && `justify-${headers[0][1].align}`]"
                    :style="[headers[0][1].width && { width: headers[0][1].width }]">{{ MaxFormatDisplay(item.transactionNumber, 4) }}</td>
                  <td
                    :class="[headers[0][2].align && `justify-${headers[0][2].align}`]"
                    :style="[headers[0][2].width && { width: headers[0][2].width }]">{{ item.slipNo }}</td>
                  <td
                    :class="[headers[0][3].align && `justify-${headers[0][3].align}`]"
                    :style="[headers[0][3].width && { width: headers[0][3].width }]">{{ doubleByteStringSlicer(item.posUserName, 10) }}</td>
                  <td
                    :class="[headers[0][4].align && `justify-${headers[0][4].align}`, `limit-row`]"
                    :style="[headers[0][4].width && { width: headers[0][4].width }]">
                    <span>{{ doubleByteStringSlicer(item.userName, 20) }}</span>
                  </td>
                  <td
                    :class="[headers[0][5].align && `justify-${headers[0][5].align}`]"
                    :style="[headers[0][5].width && { width: headers[0][5].width }]">{{ formattedDate(item.orderBillTimestamp) }}</td>
                </tr>
                <tr>
                  <td
                    :class="[headers[1][0].align && `justify-${headers[1][0].align}`]"
                    :style="[headers[1][0].width && { width: headers[1][0].width }]" />
                  <td
                    :class="[headers[1][1].align && `justify-${headers[1][1].align}`]"
                    :style="[headers[1][1].width && { width: headers[1][1].width }]">{{ item.tantoNo || item.tantoNo === 0 ? removeLeadingZerosExceptLast(item.tantoNo, true) : ''  }}</td>
                  <td
                    :class="[headers[1][2].align && `justify-${headers[1][2].align}`, `limit-row`]"
                    :style="[headers[1][2].width && { width: headers[1][2].width }]">
                    <span>{{ doubleByteStringSlicer(item.tantoName, 20) }}</span>
                  </td>
                  <td
                    v-if="item.auditCode === 1 || item.auditCode === 4 || item.auditCode === 5"
                    :class="[headers[1][3].align && `justify-${headers[1][3].align}`]"
                    :style="[headers[1][3].width && { width: headers[1][3].width }]">{{ formattedDate(item.deleteTimestamp) }}</td>
                  <td
                    v-else
                    :class="[headers[1][3].align && `justify-${headers[1][3].align}`]"
                    :style="[headers[1][3].width && { width: headers[1][3].width }]"
                  />
                </tr>
                <tr>
                  <td
                    :class="[headers[2][0].align && `justify-${headers[2][0].align}`]"
                    :style="[headers[2][0].width && { width: headers[2][0].width }]" />
                  <td
                    v-if="item.auditCode === 1"
                    :class="[headers[2][1].align && `justify-${headers[2][1].align}`]"
                    :style="[headers[2][1].width && { width: headers[2][1].width }]">{{ MaxFormatDisplay(item.originalSequenceNumber, 4) }}</td>
                  <td
                    v-else
                    :class="[headers[2][1].align && `justify-${headers[2][1].align}`]"
                    :style="[headers[2][1].width && { width: headers[2][1].width }]"
                  />
                  <td
                    v-if="item.auditCode === 5"
                    :class="[headers[2][2].align && `justify-${headers[2][2].align}`]"
                    :style="[headers[2][2].width && { width: headers[2][2].width }]">{{ doubleByteStringSlicer(item.originalPosUserName, 10) }}</td>
                  <td
                    v-else
                    :class="[headers[2][2].align && `justify-${headers[2][2].align}`]"
                    :style="[headers[2][2].width && { width: headers[2][2].width }]"
                  />
                  <td
                    v-if="item.auditCode === 5"
                    :class="[headers[2][3].align && `justify-${headers[2][3].align}`, `limit-row`]"
                    :style="[headers[2][3].width && { width: headers[2][3].width }]">
                    <span>{{ doubleByteStringSlicer(item.originalUserName, 20) }}</span>
                  </td>
                  <td
                    v-else
                    :class="[headers[2][3].align && `justify-${headers[2][3].align}`]"
                    :style="[headers[2][3].width && { width: headers[2][3].width }]"
                  />
                  <td
                    :class="[headers[2][4].align && `justify-${headers[2][4].align}`]"
                    :style="[headers[2][4].width && { width: headers[2][4].width }]">{{ item.total || item.total === 0 ? maskExcessDigits(item.total) : '' }}</td>
                </tr>
                <tr>
                  <td
                    :class="[headers[3][0].align && `justify-${headers[3][0].align}`]"
                    :style="[headers[3][0].width && { width: headers[3][0].width }]" />
                  <td
                    v-if="item.auditCode === 5"
                    :class="[headers[3][1].align && `justify-${headers[3][1].align}`]"
                    :style="[headers[3][1].width && { width: headers[3][1].width }]">{{ item.originalTantoNo || item.originalTantoNo === 0 ? removeLeadingZerosExceptLast(item.originalTantoNo, true) : '' }}</td>
                  <td
                    v-else
                    :class="[headers[3][1].align && `justify-${headers[3][1].align}`]"
                    :style="[headers[3][1].width && { width: headers[3][1].width }]"
                  />
                  <td
                    v-if="item.auditCode === 5"
                    :class="[headers[3][2].align && `justify-${headers[3][2].align}`, `limit-row`]"
                    :style="[headers[3][2].width && { width: headers[3][2].width }]">
                    <span>{{ doubleByteStringSlicer(item.originalTantoName, 20) }}</span>
                  </td>
                  <td
                    v-else
                    :class="[headers[3][2].align && `justify-${headers[3][2].align}`]"
                    :style="[headers[3][2].width && { width: headers[3][2].width }]"
                  />
                  <td
                    :class="[headers[3][3].align && `justify-${headers[3][3].align}`]"
                    :style="[headers[3][3].width && { width: headers[3][3].width }]">{{ item.reasonCode }}</td>
                </tr>
                <tr>
                  <td
                    :class="[headers[4][0].align && `justify-${headers[4][0].align}`]"
                    :style="[headers[4][0].width && { width: headers[4][0].width }]" />
                  <td
                    :class="[headers[4][1].align && `justify-${headers[4][1].align}`]"
                    :style="[headers[4][1].width && { width: headers[4][1].width }]" >{{ item.menuCode }}</td>
                  <td
                    :class="[headers[4][2].align && `justify-${headers[4][2].align}`, `limit-row`]"
                    :style="[headers[4][2].width && { width: headers[4][2].width }]">
                    <span>{{ doubleByteStringSlicer(item.menuName, 40) }}</span>
                  </td>
                </tr>
                <tr>
                  <td
                    :class="[headers[5][0].align && `justify-${headers[5][0].align}`]"
                    :style="[headers[5][0].width && { width: headers[5][0].width }]" />
                  <td
                    :class="[headers[5][1].align && `justify-${headers[5][1].align}`]"
                    :style="[headers[5][1].width && { width: headers[5][1].width }]">{{ doubleByteStringSlicer(String(item.menuTypeName), 8) }}</td>
                  <td
                    :class="[headers[5][2].align && `justify-${headers[5][2].align}`]"
                    :style="[headers[5][2].width && { width: headers[5][2].width }]" />
                  <td
                    :class="[headers[5][3].align && `justify-${headers[5][3].align}`]"
                    :style="[headers[5][3].width && { width: headers[5][3].width }]">{{ item.salePrice || item.salePrice === 0 ? removeLeadingZerosExceptLast(item.salePrice) : '' }}</td>
                </tr>
                <tr>
                  <td
                    :class="[headers[6][0].align && `justify-${headers[6][0].align}`]"
                    :style="[headers[6][0].width && { width: headers[6][0].width }]" />
                  <td
                    :class="[headers[6][1].align && `justify-${headers[6][1].align}`]"
                    :style="[headers[6][1].width && { width: headers[6][1].width }]">{{ item.itemQuantity || item.itemQuantity === 0 ? removeLeadingZerosExceptLast(item.itemQuantity) : ''}}</td>
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
