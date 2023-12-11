<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/CommonDesign/utils.css"/>
<style scoped src="@/resource/static/css/PosReport/Reports/posReportGroupReport.css"/>
<script type="text/javascript" src="@/resource/static/js/PosReport/Reports/posReportGroupReport.js"/>

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
          {{ `${reportTitle}${$t('F32231.S110')}` }}
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
        <!-- 期間ﾀｲﾌﾟ -->
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
        <!-- 商品構成 -->
        <v-row
          no-gutters
          class="my-3">
          <v-col
            cols="2"
            class="text-h6 text-start">
            {{ $t('F32231.S773') }}
          </v-col>
          <v-col class="text-h6 text-start">
            {{ request.classificationNo }}
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
        <!-- 明細出力 -->
        <v-row
          no-gutters
          class="my-3">
          <v-col
            cols="2"
            class="text-h6 text-start">
            {{ $t('F32231.S769') }}
          </v-col>
          <v-col class="text-h6 text-start">
            {{ detailOutput }}
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
                <!-- 商品構成ｺｰﾄﾞ | 名称 -->
                <tr>
                  <th
                    class="text-left"
                    width="15%">{{ $t('F32231.S823') }}</th>
                  <th
                    width="15%"
                    class="text-left">{{ $t('F32231.S802') }}</th>
                  <th width="15%"/>
                  <th width="20%"/>
                  <th width="20%"/>
                  <th width="15%"/>
                </tr>
                <!-- 明細出力: 商品 -->
                <!-- PLUｺｰﾄﾞ | 商品名称 -->
                <tr v-if="request.detailOutput === 1">
                  <th class="text-left pl-10">{{ $t('F32231.S772') }}</th>
                  <th
                    class="text-left pl-10"
                    colspan="5">{{ $t('F32231.S796') }}</th>
                </tr>
                <!-- 明細出力: 時間 -->
                <!-- 時間帯ｺｰﾄﾞ | 時間帯 -->
                <tr v-if="request.detailOutput === 2">
                  <th class="text-left pl-10">{{ $t('F32231.S819') }}</th>
                  <th
                    class="text-left pl-10"
                    colspan="5">{{ $t('F32231.S768') }}</th>
                </tr>
                <!-- 客数 | 点数 | 金額 | 構成比 -->
                <tr>
                  <th
                    colspan="3"
                    class="text-right">{{ $t('F32231.S804') }}</th>
                  <th class="text-right">{{ $t('F32231.S805') }}</th>
                  <th class="text-right">{{ $t('F32231.S808') }}</th>
                  <th class="text-right">{{ $t('F32231.S809') }}</th>
                </tr>
                <!-- 値引/割引点数 | 値引/割引金額 -->
                <tr>
                  <th
                    colspan="4"
                    class="text-right">{{ $t('F32231.S810') }}</th>
                  <th class="text-right">{{ $t('F32231.S811') }}</th>
                  <th />
                </tr>
                <!-- 返品点数 | 返品金額 -->
                <tr>
                  <th
                    colspan="4"
                    class="text-right">{{ $t('F32231.S812') }}</th>
                  <th class="text-right">{{ $t('F32231.S813') }}</th>
                  <th />
                </tr>
              </thead>
              <template v-if="endpoint.data.length === 0">
                <tbody>
                  <tr class="text-center v-data-table__empty-wrapper">
                    <td colspan="6">{{ $t('F32231.E501') }}</td>
                  </tr>
                </tbody>
              </template>
              <template v-for="data in endpoint.data">
                <!-- eslint-disable-next-line vue/require-v-for-key -->
                <tbody :class="!hasTerms?'no-terms-row':'has-terms-row'">
                  <tr>
                    <td class="text-left">{{ addLeadingZeros(data.code, 6) }}</td>
                    <td
                      colspan="5"
                      class="text-left grey-row">
                      <span> {{ doubleByteStringSlicer(data.groupName, 32) }} </span>
                    </td>
                  </tr>
                  <!-- 明細出力: 無し-->
                  <template v-if="!hasTerms">
                    <tr>
                      <td
                        colspan="3"
                        class="text-right">{{ Number(data.customerCount).toLocaleString() }}</td>
                      <td class="text-end">{{ Number(data.itemQuantity).toLocaleString() }}</td>
                      <td class="text-end">{{ data.amountIncludeTax || Number(data.amountIncludeTax) === 0 ? maskExcessDigits(data.amountIncludeTax) : maskExcessDigits(data.amountWithoutTax) }}</td>
                      <td class="text-end">{{ data.amountRatioGroup }}</td>
                    </tr>
                    <tr>
                      <td
                        colspan="4"
                        class="text-end">{{ Number(data.discountItemQuantity).toLocaleString() }}</td>
                      <td class="text-end">{{ maskExcessDigits(data.discountAmount) }}</td>
                      <td />
                    </tr>
                    <tr>
                      <td colspan="3"/>
                      <td class="text-end">{{ Number(data.returnItemQuantity).toLocaleString() }}</td>
                      <td class="text-end">{{ data.returnAmountIncludeTax || Number(data.returnAmountIncludeTax) === 0 ? maskExcessDigits(data.returnAmountIncludeTax) : maskExcessDigits(data.returnAmountWithoutTax) }}</td>
                      <td />
                    </tr>
                  </template>
                </tbody>
                <!-- 明細出力: 時間 || 商品-->
                <template v-if="hasTerms">
                  <tbody
                    v-for="term in data.terms"
                    :key="term.uid"
                    class="has-terms-row">
                    <tr>
                      <td class="text-left pl-10">{{ term.hourZoneNumber ? addLeadingZeros(term.hourZoneNumber, 2) : addLeadingZeros(term.code, 13) }}</td>
                      <td
                        colspan="5"
                        class="text-left pl-10 grey-row">
                        <span> {{ doubleByteStringSlicer(term.hourZoneName ? term.hourZoneName : term.pluName, 32) }} </span>
                      </td>
                    </tr>
                    <tr>
                      <td
                        colspan="3"
                        class="text-right">{{ Number(term.customerCount).toLocaleString() }}</td>
                      <td class="text-end">{{ Number(term.itemQuantity).toLocaleString() }}</td>
                      <td class="text-end">{{ term.amountIncludeTax || Number(term.amountIncludeTax) === 0 ? maskExcessDigits(term.amountIncludeTax) : maskExcessDigits(term.amountWithoutTax) }}</td>
                      <td class="text-end">{{ term.amountRatioGroup ? term.amountRatioGroup : term.amountRatioData }}</td>
                    </tr>
                    <tr>
                      <td
                        colspan="4"
                        class="text-end">{{ Number(term.discountItemQuantity).toLocaleString() }}</td>
                      <td class="text-end">{{ maskExcessDigits(term.discountAmount) }}</td>
                      <td />
                    </tr>
                    <tr>
                      <td colspan="3"/>
                      <td class="text-end">{{ Number(term.returnItemQuantity).toLocaleString() }}</td>
                      <td class="text-end">{{ term.returnAmountIncludeTax || Number(term.returnAmountIncludeTax) === 0 ? maskExcessDigits(term.returnAmountIncludeTax) : maskExcessDigits(term.returnAmountWithoutTax) }}</td>
                      <td />
                    </tr>
                  </tbody>
                  <!-- ＊小計＊ -->
                  <!-- eslint-disable-next-line vue/require-v-for-key -->
                  <tbody class="row-group-border">
                    <tr>
                      <td
                        class="text-left"
                        colspan="6"> {{ $t("F32231.S745") }} </td>
                    </tr>
                    <tr>
                      <td
                        colspan="3"
                        class="text-right">{{ Number(data.customerCount).toLocaleString() }}</td>
                      <td class="text-end">{{ Number(data.itemQuantity).toLocaleString() }}</td>
                      <td class="text-end">{{ data.amountIncludeTax || Number(data.amountIncludeTax) === 0 ? maskExcessDigits(data.amountIncludeTax) : maskExcessDigits(data.amountWithoutTax) }}</td>
                      <td class="text-end">{{ data.amountRatioGroup }}</td>
                    </tr>
                    <tr>
                      <td
                        colspan="4"
                        class="text-end">{{ Number(data.discountItemQuantity).toLocaleString() }}</td>
                      <td class="text-end">{{ maskExcessDigits(data.discountAmount) }}</td>
                      <td />
                    </tr>
                    <tr>
                      <td colspan="3"/>
                      <td class="text-end">{{ Number(data.returnItemQuantity).toLocaleString() }}</td>
                      <td class="text-end">{{ data.returnAmountIncludeTax || Number(data.returnAmountIncludeTax) === 0 ? maskExcessDigits(data.returnAmountIncludeTax) : maskExcessDigits(data.returnAmountWithoutTax) }}</td>
                      <td />
                    </tr>
                  </tbody>
                </template>
              </template>
              <!-- 合計 -->
              <tbody class="row-group-border">
                <tr>
                  <td
                    class="text-left"
                    colspan="6"> {{ $t("F32231.S746") }} </td>
                </tr>
                <tr>
                  <td
                    colspan="3"
                    class="text-right">{{ Number(endpoint.customerCount).toLocaleString() }}</td>
                  <td class="text-end">{{ Number(endpoint.itemQuantity).toLocaleString() }}</td>
                  <td class="text-end">{{ endpoint.amountIncludeTax || Number(endpoint.amountIncludeTax) === 0 ? maskExcessDigits(endpoint.amountIncludeTax) : maskExcessDigits(endpoint.amountWithoutTax) }}</td>
                  <td />
                </tr>
                <tr>
                  <td
                    colspan="4"
                    class="text-end">{{ Number(endpoint.discountItemQuantity).toLocaleString() }}</td>
                  <td class="text-end">{{ maskExcessDigits(endpoint.discountAmount) }}</td>
                  <td />
                </tr>
                <tr>
                  <td colspan="3"/>
                  <td class="text-end">{{ Number(endpoint.returnItemQuantity).toLocaleString() }}</td>
                  <td class="text-end">{{ endpoint.returnAmountIncludeTax || Number(endpoint.returnAmountIncludeTax) === 0 ? maskExcessDigits(endpoint.returnAmountIncludeTax) : maskExcessDigits(endpoint.returnAmountWithoutTax) }}</td>
                  <td />
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
