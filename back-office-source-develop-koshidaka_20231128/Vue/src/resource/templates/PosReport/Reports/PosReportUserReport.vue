<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/CommonDesign/utils.css"/>
<style scoped src="@/resource/static/css/PosReport/Reports/posReportUserReport.css"/>
<script type="text/javascript" src="@/resource/static/js/PosReport/Reports/posReportUserReport.js"/>

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
        <!-- 期間  -->
        <v-row
          no-gutters
          class="my-3">
          <v-col
            cols="2"
            class="text-h6 text-start">
            {{ $t('F32231.S767') }}
          </v-col>
          <v-col class="text-h6 text-start">
            {{ reportDuration }}
          </v-col>
        </v-row>
        <!-- 期間ﾀｲﾌ -->
        <v-row
          no-gutters
          class="my-3">
          <v-col
            cols="2"
            class="text-h6 text-start">
            {{ $t('F32231.S763') }}
          </v-col>
          <v-col class="text-h6 text-start">
            {{ durationType }}
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
        <!-- 時間明細 -->
        <v-row
          no-gutters
          class="my-3">
          <v-col
            cols="2"
            class="text-h6 text-start">
            {{ $t('F32231.S022') }}
          </v-col>
          <v-col class="text-h6 text-start">
            {{ timeDetail }}
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
                  {{ `${$t('F32231.S767')}${$t('F32231.S702')} ${store.from || responseDuration.from || request.duration.from} ${$t('F32231.S705')} ${store.to || responseDuration.to || request.duration.to}` }}
                </span>
              </v-col>
            </v-row>
            <v-simple-table>
              <thead>
                <!-- 責任者コード | 名称 -->
                <tr>
                  <th
                    class="text-left"
                    width="15%">{{ $t('F32231.S818') }}</th>
                  <th
                    width="15%"
                    class="text-left">{{ $t('F32231.S909') }}</th>
                  <th/>
                  <th width="20%"/>
                  <th width="20%"/>
                </tr>
                <!-- 時間帯コード | 時間帯 -->
                <tr v-if="hasTimeDetail">
                  <th class="text-left pl-10">{{ $t('F32231.S819') }}</th>
                  <th
                    class="text-left pl-10"
                    colspan="4">{{ $t('F32231.S768') }}</th>
                </tr>
                <!-- 客数 | 点数 | 金額 -->
                <tr>
                  <th
                    colspan="3"
                    class="text-right">{{ $t('F32231.S804') }}</th>
                  <th class="text-right">{{ $t('F32231.S805') }}</th>
                  <th class="text-right">{{ $t('F32231.S808') }}</th>
                </tr>
                <!-- 組数 | 値引/割引点数 | 値引/割引金額 -->
                <tr>
                  <th
                    colspan="3"
                    class="text-right">{{ $t('F32231.S803') }}</th>
                  <th class="text-right">{{ $t('F32231.S810') }}</th>
                  <th class="text-right">{{ $t('F32231.S811') }}</th>
                </tr>
                <!-- 返品点数 | 金額 -->
                <tr>
                  <th
                    colspan="4"
                    class="text-right">{{ $t('F32231.S812') }}</th>
                  <th class="text-right">{{ $t('F32231.S813') }}</th>
                </tr>
                <!-- 小計値割引回数 | 小計値割引回数 -->
                <tr>
                  <th
                    colspan="4"
                    class="text-right">{{ $t('F32231.S821') }}</th>
                  <th class="text-right">{{ $t('F32231.S822') }}</th>
                </tr>
                <!-- レジマイナス回数 | レジマイナス金額 -->
                <tr>
                  <th
                    colspan="4"
                    class="text-right">{{ $t('F32231.S816') }}</th>
                  <th class="text-right">{{ $t('F32231.S817') }}</th>
                </tr>
              </thead>
              <template v-if="endpoint.data.length === 0">
                <tbody>
                  <tr class="text-center v-data-table__empty-wrapper">
                    <td colspan="5">{{ $t('F32231.E501') }}</td>
                  </tr>
                </tbody>
              </template>
              <template v-for="data in endpoint.data">
                <!-- 時間明細: なし -->
                <!-- eslint-disable-next-line vue/require-v-for-key -->
                <tbody :class="hasTimeDetail ? 'data-header-row' : 'data-table-body'">
                  <!-- 責任者コード | 名称 -->
                  <tr>
                    <td class="text-left">{{ NumberDisplayFormatter(data.posUserName, '99999999') }}</td>
                    <td
                      colspan="4"
                      class="text-left user-id-row">
                      <span> {{ doubleByteStringSlicer(data.firstName, 20) }} </span>
                    </td>
                  </tr>
                  <template v-if="!hasTimeDetail">
                    <!-- 客数 | 点数 | 金額 -->
                    <tr>
                      <td
                        colspan="3"
                        class="text-right">{{ Number(data.customerCount).toLocaleString() }}</td>
                      <td class="text-end">{{ Number(data.itemQuantity).toLocaleString() }}</td>
                      <td class="text-end">{{ data.amountIncludeTax ? maskExcessDigits(data.amountIncludeTax) : maskExcessDigits(data.amountWithoutTax) }}</td>
                    </tr>
                    <!-- 組数 | 値引/割引点数 | 値引/割引金額 -->
                    <tr>
                      <td
                        colspan="3"
                        class="text-right">{{ Number(data.setQuantity).toLocaleString() }}</td>
                      <td class="text-end">{{ Number(data.discountItemQuantity).toLocaleString() }}</td>
                      <td class="text-end">{{ maskExcessDigits(data.discountAmount) }}</td>
                    </tr>
                    <!-- 返品点数 | 金額 -->
                    <tr>
                      <td colspan="3"/>
                      <td class="text-end">{{ Number(data.returnItemQuantity).toLocaleString() }}</td>
                      <td class="text-end">{{ data.returnAmountIncludeTax ? maskExcessDigits(data.returnAmountIncludeTax) : maskExcessDigits(data.returnAmountWithoutTax) }}</td>
                    </tr>
                    <!-- 小計値割引回数 | 小計値割引回数 -->
                    <tr>
                      <td colspan="3"/>
                      <td class="text-end">{{ Number(data.subTotalDiscountQuantity).toLocaleString() }}</td>
                      <td class="text-end">{{ maskExcessDigits(data.subTotalDiscountAmount) }}</td>
                    </tr>
                    <!-- レジマイナス回数 | レジマイナス金額 -->
                    <tr>
                      <td colspan="3"/>
                      <td class="text-end">{{ Number(data.registerMinusQuantity).toLocaleString() }}</td>
                      <td class="text-end">{{ data.registerMinusAmountIncludeTax ? maskExcessDigits(data.registerMinusAmountIncludeTax) : maskExcessDigits(data.registerMinusAmountWithoutTax) }}</td>
                    </tr>
                  </template>
                </tbody>
                <!-- 時間明細: あり -->
                <template v-if="hasTimeDetail">
                  <tbody
                    v-for="term in data.terms"
                    :key="term.code">
                    <!-- 時間帯コード | 時間帯 -->
                    <tr v-if="hasTimeDetail">
                      <td class="text-left pl-10">{{ String(term.hourZoneNumber).padStart(2, '0') }}</td>
                      <td
                        colspan="4"
                        class="text-left pl-10 hour-zone-row">
                        <span> {{ hourZoneFormatter(term.hourZoneName) }} </span>
                      </td>
                    </tr>
                    <!-- 客数 | 点数 | 金額 -->
                    <tr>
                      <td
                        colspan="3"
                        class="text-right">{{ Number(term.customerCount).toLocaleString() }}</td>
                      <td class="text-right">{{ Number(term.itemQuantity).toLocaleString() }}</td>
                      <td class="text-right">{{ term.amountIncludeTax ? maskExcessDigits(term.amountIncludeTax) : maskExcessDigits(term.amountWithoutTax) }}</td>
                    </tr>
                    <!-- 組数 | 値引/割引点数 | 値引/割引金額 -->
                    <tr>
                      <td
                        colspan="3"
                        class="text-right">{{ Number(term.setQuantity).toLocaleString() }}</td>
                      <td class="text-right">{{ Number(term.discountItemQuantity).toLocaleString() }}</td>
                      <td class="text-right">{{ maskExcessDigits(term.discountAmount) }}</td>
                    </tr>
                    <!-- 返品点数 | 金額 -->
                    <tr>
                      <td colspan="3"/>
                      <td class="text-right">{{ Number(term.returnItemQuantity).toLocaleString() }}</td>
                      <td class="text-right">{{ term.returnAmountIncludeTax ? maskExcessDigits(term.returnAmountIncludeTax) : maskExcessDigits(term.returnAmountWithoutTax) }}</td>
                    </tr>
                    <!-- 小計値割引回数 | 小計値割引回数 -->
                    <tr>
                      <td colspan="3"/>
                      <td class="text-right">{{ Number(term.subTotalDiscountQuantity).toLocaleString() }}</td>
                      <td class="text-right">{{ maskExcessDigits(term.subTotalDiscountAmount) }}</td>
                    </tr>
                    <!-- レジマイナス回数 | レジマイナス金額 -->
                    <tr>
                      <td colspan="3"/>
                      <td class="text-right">{{ Number(term.registerMinusQuantity).toLocaleString() }}</td>
                      <td class="text-right">{{ term.registerMinusAmountIncludeTax ? maskExcessDigits(term.registerMinusAmountIncludeTax) : maskExcessDigits(term.registerMinusAmountWithoutTax) }}</td>
                    </tr>
                  </tbody>
                </template>
                <!-- ＊小計＊ -->
                <!-- eslint-disable-next-line vue/require-v-for-key -->
                <tbody
                  class="row-group-border"
                  v-if="hasTimeDetail">
                  <tr>
                    <td
                      class="text-left"
                      colspan="5"> {{ $t("F32231.S745") }} </td>
                  </tr>
                  <!-- 客数 | 点数 | 金額 -->
                  <tr>
                    <td
                      colspan="3"
                      class="text-right">{{ Number(data.customerCount).toLocaleString() }}</td>
                    <td class="text-end">{{ Number(data.itemQuantity).toLocaleString() }}</td>
                    <td class="text-end">{{ data.amountIncludeTax ? maskExcessDigits(data.amountIncludeTax) : maskExcessDigits(data.amountWithoutTax) }}</td>
                  </tr>
                  <!-- 組数 | 値引/割引点数 | 値引/割引金額 -->
                  <tr>
                    <td
                      v-if="!hasTimeDetail"
                      colspan="3" />
                    <td
                      v-else
                      colspan="3"
                      class="text-end">{{ Number(data.setQuantity).toLocaleString() }}</td>
                    <td class="text-end">{{ Number(data.discountItemQuantity).toLocaleString() }}</td>
                    <td class="text-end">{{ maskExcessDigits(data.discountAmount) }}</td>
                  </tr>
                  <!-- 返品点数 | 金額 -->
                  <tr>
                    <td colspan="3"/>
                    <td class="text-end">{{ Number(data.returnItemQuantity).toLocaleString() }}</td>
                    <td class="text-end">{{ data.returnAmountIncludeTax ? maskExcessDigits(data.returnAmountIncludeTax) : maskExcessDigits(data.returnAmountWithoutTax) }}</td>
                  </tr>
                  <!-- 小計値割引回数 | 小計値割引回数 -->
                  <tr>
                    <td colspan="3"/>
                    <td class="text-end">{{ Number(data.subTotalDiscountQuantity).toLocaleString() }}</td>
                    <td class="text-end">{{ maskExcessDigits(data.subTotalDiscountAmount) }}</td>
                  </tr>
                  <!-- レジマイナス回数 | レジマイナス金額 -->
                  <tr>
                    <td colspan="3"/>
                    <td class="text-end">{{ Number(data.registerMinusQuantity).toLocaleString() }}</td>
                    <td class="text-end">{{ data.registerMinusAmountIncludeTax ? maskExcessDigits(data.registerMinusAmountIncludeTax) : maskExcessDigits(data.registerMinusAmountWithoutTax) }}</td>
                  </tr>
                </tbody>
              </template>
              <!-- 合計 -->
              <tbody class="row-group-border">
                <tr>
                  <td
                    class="text-left"
                    colspan="5"> {{ $t("F32231.S746") }} </td>
                </tr>
                <!-- 客数 | 点数 | 金額 -->
                <tr>
                  <td
                    colspan="3"
                    class="text-right">{{ Number(endpoint.customerCount).toLocaleString() }}</td>
                  <td class="text-end">{{ Number(endpoint.itemQuantity).toLocaleString() }}</td>
                  <td class="text-end">{{ endpoint.amountIncludeTax ? maskExcessDigits(endpoint.amountIncludeTax) : maskExcessDigits(endpoint.amountWithoutTax) }}</td>
                </tr>
                <!-- 組数 | 値引/割引点数 | 値引/割引金額 -->
                <tr>
                  <td
                    colspan="3"
                    class="text-end">{{ Number(endpoint.setQuantity).toLocaleString() }}</td>
                  <td class="text-end">{{ Number(endpoint.discountItemQuantity).toLocaleString() }}</td>
                  <td class="text-end">{{ maskExcessDigits(endpoint.discountAmount) }}</td>
                </tr>
                <!-- 返品点数 | 金額 -->
                <tr>
                  <td colspan="3"/>
                  <td class="text-end">{{ Number(endpoint.returnItemQuantity).toLocaleString() }}</td>
                  <td class="text-end">{{ endpoint.returnAmountIncludeTax ? maskExcessDigits(endpoint.returnAmountIncludeTax) : maskExcessDigits(endpoint.returnAmountWithoutTax) }}</td>
                </tr>
                <!-- 小計値割引回数 | 小計値割引回数 -->
                <tr>
                  <td colspan="3"/>
                  <td class="text-end">{{ Number(endpoint.subTotalDiscountQuantity).toLocaleString() }}</td>
                  <td class="text-end">{{ maskExcessDigits(endpoint.subTotalDiscountAmount) }}</td>
                </tr>
                <!-- レジマイナス回数 | レジマイナス金額 -->
                <tr>
                  <td colspan="3"/>
                  <td class="text-end">{{ Number(endpoint.registerMinusQuantity).toLocaleString() }}</td>
                  <td class="text-end">{{ endpoint.registerMinusAmountIncludeTax ? maskExcessDigits(endpoint.registerMinusAmountIncludeTax) : maskExcessDigits(endpoint.registerMinusAmountWithoutTax) }}</td>
                </tr>
              </tbody>
            </v-simple-table>
          </div>
        </div>
      </template>
      <v-row v-if="hasMaxDataErr">
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
