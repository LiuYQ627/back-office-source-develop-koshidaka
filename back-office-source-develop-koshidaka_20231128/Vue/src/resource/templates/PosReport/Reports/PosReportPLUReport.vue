<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/CommonDesign/utils.css"/>
<style scoped src="@/resource/static/css/PosReport/Reports/posReportPLUReport.css"/>
<script type="text/javascript" src="@/resource/static/js/PosReport/Reports/posReportPLUReport.js"/>

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
            {{ $t('F32231.S761') }}
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
            {{ $t('F32231.S762') }}
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
            {{ $t('F32231.S767') }}
          </v-col>
          <v-col class="text-h6 text-start">
            {{ displayDurationStr }}
          </v-col>
        </v-row>
        <v-row
          no-gutters
          class="my-3">
          <v-col
            cols="2"
            class="text-h6 text-start">
            {{ $t('F32231.S763') }}
          </v-col>
          <v-col class="text-h6 text-start">
            {{ periodType }}
          </v-col>
        </v-row>
        <v-row
          no-gutters
          class="my-3">
          <v-col
            cols="2"
            class="text-h6 text-start">
            {{ $t('F32231.S772') }}
          </v-col>
          <v-col class="text-h6 text-start">
            {{ pluCodes }}
          </v-col>
        </v-row>
        <v-row
          no-gutters
          class="my-3">
          <v-col
            cols="2"
            class="text-h6 text-start">
            {{ $t('F32231.S768') }}
          </v-col>
          <v-col class="text-h6 text-start">
            {{ timeZone }}
          </v-col>
        </v-row>
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
          class="margin-30"
          v-for="(store, key) in data"
          :key="key">
          <div
            v-for="(endpoint, idx) in store.endpoints"
            :key="idx"
            :id="'store' + key.toString().padStart(2, '0')"
            class="plu-table-container margin-30">
            <v-row>
              <v-col
                cols="auto"
                class="text-start pt-6">
                <span class="pa-4 bg-gray rounded-t-xl white--text text-white">
                  {{ $t('F32231.S903') }} {{ store.storeName }}
                </span>
              </v-col>
              <v-col
                v-if="!request.storeTotalize"
                cols="auto"
                class="text-start pt-6">
                <span class="pa-4 bg-wheat rounded-t">
                  {{ $t('F32231.S904') }} {{ endpoint.endpointId }}
                </span>
              </v-col>
              <v-col
                cols="auto"
                class="text-start pt-6">
                <span class="pa-4 bg-wheat rounded-t">
                  {{ $t('F32231.S905') }} {{ store.from }} {{ $t('F32231.S907') }} {{ store.to }}
                </span>
              </v-col>
            </v-row>
            <v-data-table
              :items="endpoint.data"
              :data-total= "endpoint.data"
              :items-per-page="-1"
              :hide-default-footer="true">
              <template v-slot:header>
                <thead>
                  <tr>
                    <th
                      class="text-left"> {{ $t('F32231.S772') }} </th>
                    <th
                      class="text-left"
                      colspan="5"> {{ $t('F32231.S802') }} </th>
                  </tr>
                  <tr v-if="showSecondRow">
                    <th
                      class="text-left time-zone-col"> {{ $t('F32231.S819') }} </th>
                    <th
                      class="text-left"
                      colspan="5"> {{ $t('F32231.S768') }} </th>
                  </tr>
                  <tr>
                    <th />
                    <th />
                    <th class="text-right count-col"> {{ $t('F32231.S804') }} </th>
                    <th class="text-right quantity-col"> {{ $t('F32231.S805') }} </th>
                    <th class="text-right tax-col"> {{ $t('F32231.S808') }} </th>
                    <th class="text-right total-col"> {{ $t('F32231.S809') }} </th>
                  </tr>
                  <tr>
                    <th />
                    <th />
                    <th />
                    <th class="text-right quantity-col"> {{ $t('F32231.S810') }} </th>
                    <th class="text-right tax-col"> {{ $t('F32231.S811') }} </th>
                    <th />
                  </tr>
                  <tr>
                    <th />
                    <th />
                    <th />
                    <th class="text-right quantity-col"> {{ $t('F32231.S812') }} </th>
                    <th class="text-right tax-col"> {{ $t('F32231.S813') }} </th>
                    <th />
                  </tr>
                </thead>
              </template>
              <template
                v-slot:body="{ items }">
                <template v-if="!endpoint.data.length">
                  <tbody>
                    <tr>
                      <td
                        colspan="6"
                        class="table-empty-msg"> {{ $t('F32231.E501') }} </td>
                    </tr>
                  </tbody>
                </template>
                <template v-for="(item) in items">
                  <template>
                    <tbody :class="request.timeDetail==1 ? 'group-data-row' : ''">
                      <tr v-if="request.timeDetail==1">
                        <td class="text-left plu-code-col">{{ NumberDisplayFormatter(item.code, '9999999999999') }}</td>
                        <td
                          colspan="5"
                          class="text-left plu-name-row">
                          <span> {{ doubleByteStringSlicer(item.pluName, 32) }} </span>
                        </td>
                      </tr>
                    </tbody>
                    <template v-for="(term) in item.terms">
                      <tbody
                        :class="request.timeDetail==1 ? 'term-group-body' : ''"
                        v-if="request.timeDetail == 1">
                        <tr>
                          <td class="text-left padding-left-40"> {{ NumberDisplayFormatter(term.hourZoneNumber, '99') }} </td>
                          <td
                            class="text-left padding-left-40 hour-zone-row"
                            colspan="5">
                            <span> {{ doubleByteStringSlicer(term.hourZoneName, 32) }} </span>
                          </td>
                        </tr>
                        <tr>
                          <td />
                          <td />
                          <td class="text-right count-col"> {{ Number(term.customerCount).toLocaleString() }} </td>
                          <td class="text-right quantity-col"> {{ Number(term.itemQuantity).toLocaleString() }} </td>
                          <td class="text-right tax-col"> {{ maskExcessDigits(term.amountIncludeTax ? term.amountIncludeTax : term.amountWithoutTax) }} </td>
                          <td class="text-right total-col"> {{ term.amountRatioData }} </td>
                        </tr>
                        <tr>
                          <td />
                          <td />
                          <td />
                          <td class="text-right quantity-col"> {{ Number(term.discountItemQuantity).toLocaleString() }} </td>
                          <td class="text-right tax-col"> {{ maskExcessDigits(term.discountAmount).toLocaleString() }} </td>
                          <td />
                        </tr>
                        <tr>
                          <td />
                          <td />
                          <td />
                          <td class="text-right quantity-col"> {{ Number(term.returnItemQuantity).toLocaleString() }} </td>
                          <td class="text-right tax-col"> {{ maskExcessDigits(term.returnAmountIncludeTax || Number(term.returnAmountIncludeTax) === 0 ? term.returnAmountIncludeTax : term.returnAmountWithoutTax) }} </td>
                          <td />
                        </tr>
                      </tbody>
                    </template>
                    <template>
                      <!-- eslint-disable-next-line vue/require-v-for-key -->
                      <tbody
                        :class="request.timeDetail==1 ? 'sub-total-row' : 'default-body-row'">
                        <tr v-if="request.timeDetail==0">
                          <td class="text-left plu-code-col">{{ NumberDisplayFormatter(item.code, '9999999999999') }}</td>
                          <td
                            colspan="5"
                            class="text-left plu-name-row">
                            <span> {{ doubleByteStringSlicer(item.pluName, 32) }} </span>
                          </td>
                        </tr>
                        <tr v-if="request.timeDetail==1">
                          <td
                            colspan="6"
                            class="text-left">{{ $t('F32231.S745') }}</td>
                        </tr>
                        <tr>
                          <td />
                          <td />
                          <td class="text-right count-col"> {{ Number(item.customerCount).toLocaleString() }} </td>
                          <td class="text-right quantity-col"> {{ Number(item.itemQuantity).toLocaleString() }} </td>
                          <td class="text-right tax-col"> {{ maskExcessDigits(item.amountIncludeTax ? item.amountIncludeTax : item.amountWithoutTax) }} </td>
                          <td class="text-right total-col"> {{ item.amountRatioPlu }} </td>
                        </tr>
                        <tr>
                          <td />
                          <td />
                          <td />
                          <td class="text-right quantity-col"> {{ Number(item.discountItemQuantity).toLocaleString() }} </td>
                          <td class="text-right tax-col"> {{ maskExcessDigits(item.discountAmount) }} </td>
                          <td />
                        </tr>
                        <tr>
                          <td />
                          <td />
                          <td />
                          <td class="text-right quantity-col"> {{ Number(item.returnItemQuantity).toLocaleString() }} </td>
                          <td class="text-right tax-col"> {{ maskExcessDigits(item.returnAmountIncludeTax || Number(item.returnAmountIncludeTax) === 0 ? item.returnAmountIncludeTax : item.returnAmountWithoutTax) }} </td>
                          <td />
                        </tr>
                      </tbody>
                    </template>
                  </template>
                </template>
                <tbody class="table-total-row">
                  <tr>
                    <td
                      colspan="6"
                      class="text-left"> {{ $t("F32231.S746") }} </td>
                  </tr>
                  <tr>
                    <td />
                    <td />
                    <td class="text-right count-col"> {{ Number(endpoint.customerCount).toLocaleString() }} </td>
                    <td class="text-right quantity-col"> {{ Number(endpoint.itemQuantity).toLocaleString() }} </td>
                    <td class="text-right tax-col"> {{ maskExcessDigits(endpoint.amountIncludeTax ? endpoint.amountIncludeTax : endpoint.amountWithoutTax) }} </td>
                    <td class="text-right total-col"/>
                  </tr>
                  <tr>
                    <td />
                    <td />
                    <td />
                    <td class="text-right quantity-col"> {{ Number(endpoint.discountItemQuantity).toLocaleString() }} </td>
                    <td class="text-right tax-col"> {{ maskExcessDigits(endpoint.discountAmount) }} </td>
                    <td />
                  </tr>
                  <tr>
                    <td />
                    <td />
                    <td />
                    <td class="text-right quantity-col"> {{ Number(endpoint.returnItemQuantity).toLocaleString() }} </td>
                    <td class="text-right tax-col"> {{ maskExcessDigits(endpoint.returnAmountIncludeTax || Number(endpoint.returnAmountIncludeTax) === 0 ? endpoint.returnAmountIncludeTax : endpoint.returnAmountWithoutTax) }} </td>
                    <td />
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
