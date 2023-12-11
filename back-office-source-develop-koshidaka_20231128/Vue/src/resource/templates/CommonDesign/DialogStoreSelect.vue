<!--
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230829  heqianlong(Neusoft)   G001.00.0  issue課題#903を対応します.
-->
<style src="./../../static/css/CommonDesign/dialogStoreSelect.css"></style>
<script type="text/javascript" src="./../../static/js/CommonDesign/dialogStoreSelect.js"></script>
<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="1147px !important"
      persistent>
      <v-card min-width="1147px">
        <v-card-title class="headline dialog-line-blue">
          <font
            class="popup-title"
            style="font-size:22px;"><b>{{ $t("O00004.S016") }}</b></font>
        </v-card-title>

        <v-card-text class="contentStyle">
          <div>
            <table>
              <tbody>
                <!-- KSD V001.000 DS -->
                <!-- <tr> -->
                <!--  <td class="titleCellStyle borderCellStyle"> -->
                <!--    {{ $t("O00004.S017") }} -->
                <!--  </td> -->
                <!--  <td -->
                <!--   class="pulldownCellStyle borderCellStyle" -->
                <!--   id="industries"> -->
                <!--   <select -->
                <!--     class="pulldownStyle" -->
                <!--     v-model="selectedIndustyValue" -->
                <!--     :items="industries" -->
                <!--     item-text="storeGroupName" -->
                <!--     item-value="storeGroupValue" -->
                <!--     @change="changeGroup()" -->
                <!--     tabindex="401" -->
                <!--     disabled> -->
                <!--     <option -->
                <!--       v-for="industry in industries" -->
                <!--       :key="industry.storeGroupValue" -->
                <!--       :value="industry.storeGroupValue"> -->
                <!--       {{ industry.storeGroupName }} -->
                <!--       </option> -->
                <!--   </select> -->
                <!--   <div class="pulldownArrow"/> -->
                <!-- </td> -->
                <!-- スペース -->
                <!-- <td class="standardCellSpaceStyle"/> -->
                <!-- <td class="titleCellStyle borderCellStyle"> -->
                <!--   {{ $t("O00004.S018") }} -->
                <!-- </td> -->
                <!-- <td -->
                <!--   class="pulldownCellStyle borderCellStyle" -->
                <!--   id="areas"> -->
                <!--   <select -->
                <!--   class="pulldownStyle" -->
                <!--   v-model="selectedAreaValue" -->
                <!--   :items="areas" -->
                <!--     item-text="storeGroupName" -->
                <!--     item-value="storeGroupValue" -->
                <!--     @change="changeGroup()" -->
                <!--     tabindex="402" -->
                <!--     disabled> -->
                <!--     <option -->
                <!--       v-for="area in areas" -->
                <!--       :key="area.storeGroupValue" -->
                <!--       :value="area.storeGroupValue"> -->
                <!--       {{ area.storeGroupName }} -->
                <!--     </option> -->
                <!--   </select> -->
                <!--   <div class="pulldownArrow"/> -->
                <!-- </td> -->
                <!--</tr> -->
                <!-- KSD V001.000 DE -->
                <!-- KSD V001.000 AS -->
                <tr>
                  <td class="titleCellStyle borderCellStyle">
                    {{ $t("F00003.S035") }}
                  </td>
                  <td
                    class="pulldownCellStyle borderCellStyle"
                    id="industries">
                    <select
                      class="pulldownStyle"
                      v-model="selectedIndustyValue"
                      :items="industries"
                      item-text="storeGroupName"
                      item-value="storeGroupValue"
                      ref="industry"
                      @change="changeGroup()"
                      tabindex="401">
                      <option :value= "-1"/>
                      <option
                        v-for="items in group1DataList.storeGroupInfos"
                        :key=" `${items.code}group1DataList`"
                        :value="items.code"
                      >{{ `${items.displayName.default}` }}
                      </option>
                    </select>
                    <div class="pulldownArrow"/>
                  </td>
                  <td class="standardCellSpaceStyle"/>
                  <td class="titleCellStyle borderCellStyle">
                    {{ $t("F00003.S036") }}
                  </td>
                  <td
                    class="pulldownCellStyle borderCellStyle"
                    id="areas">
                    <select
                      class="pulldownStyle"
                      v-model="selectedAreaValue"
                      :items="areas"
                      item-text="storeGroupName"
                      item-value="storeGroupValue"
                      @change="changeGroup()"
                      tabindex="402">
                      <option :value= "-1"/>
                      <option
                        v-for="items in group2DataList.storeGroupInfos"
                        :key="`${items.code}group2DataList`"
                        :value="items.code"
                      >{{ `${items.displayName.default}` }}
                      </option>
                    </select>
                    <div class="pulldownArrow"/>
                  </td>
                  <!-- KSD V001.000 AE -->
                </tr>
              </tbody>
            </table>
          </div>
          <div id="text-content">
            <p style="width:460px;">{{ $t("O00004.S019") }}</p>
            <p style="width:166px; "/>
            <p style="width:460px;">{{ $t("O00004.S026") }}</p>
          </div>
          <div style="overflow: hidden;height: 331px">
            <div class="storeTableStyle">
              <table>
                <thead>
                  <tr>
                    <th
                      class="titleCellStyle borderCellStyle"
                      style="border-right: 1px solid #fff; width:113px !important">{{ $t("O00004.S020") }}</th>
                    <th class="titleCellStyle borderCellStyle">{{ $t("O00004.S021") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(store, index) in getCandidateStores()"
                    :key="index"
                    @click.exact="clickCandidateRow(store.name, false)"
                    @click.ctrl.exact="clickCandidateRow(store.name, true)"
                    @click.shift.exact="clickCandidateRowWithShift(store.name, false)"
                    @click.shift.ctrl="clickCandidateRowWithShift(store.name, true)"
                    :class="tempCadidateStoreCodes.indexOf(store.name) !== -1 ? 'selectedItem' : ''">
                    <!-- G001.00.0 Update-Start -->
                    <!-- <td
                      class="NumericStyle"
                      style="width:95px">{{ store.name.slice(-6) }}</td> -->
                    <!-- <td :class='{"scrollChild":getCandidateStores().length > 7}'>{{ store.displayName.default }}</td> -->
                    <td
                      class="NumericStyle"
                      style="width:94px">{{ store.name.slice(-6) }}</td>
                    <td :style="getCandidateStores().length >= 7 ? 'width:349px' : 'width:366px'">{{ store.displayName.default }}</td>
                    <!-- G001.00.0 Update-End -->
                  </tr>
                </tbody>
              </table>
            </div>
            <div id="centerButtonDiv">
              <v-btn
                @click="onClickAllSelected()"
                :disabled="!isMultiMode || getCandidateStores().length === 0 "
                tabindex="403">
                <font style="margin-right: 15px;">{{ $t("O00004.S022") }}</font>
                <span class="selectArrow" />
              </v-btn>
              <v-btn
                @click="onClickSelected()"
                style="margin-top: 23px;"
                :disabled="getCandidateStores().length === 0 || tempCadidateStoreCodes.length === 0"
                tabindex="404">
                <font style="margin-right: 15px;">{{ $t("O00004.S023") }}</font>
                <span class="selectArrow" />
              </v-btn>
              <v-btn
                @click="onClickDelete()"
                style="margin-top: 86px;"
                :disabled="getSelectedStores().length === 0 || tempSelectedStoreCodes.length === 0"
                tabindex="405">
                <span class="selectArrow selectArrowReverse" />
                <font style="margin-left: 15px;">{{ $t("O00004.S024") }}</font>
              </v-btn>
              <v-btn
                @click="onClickAllDelete()"
                style="margin-top: 23px;"
                :disabled="!isMultiMode || getSelectedStores().length === 0 "
                tabindex="406">
                <span class="selectArrow selectArrowReverse" />
                <font style="margin-left: 15px;">{{ $t("O00004.S025") }}</font>
              </v-btn>
            </div>
            <div class="storeTableStyle">
              <table>
                <thead>
                  <th
                    class="titleCellStyle borderCellStyle"
                    style="border-right: 1px solid #fff; width:110.5px !important">{{ $t("O00004.S027") }}</th>
                  <th class="titleCellStyle borderCellStyle">{{ $t("O00004.S028") }}</th>
                </thead>
                <tbody>
                  <tr
                    v-for="(store, index) in getSelectedStores()"
                    :key="index"
                    @click.exact="clickSelectedRow(store.name, false)"
                    @click.ctrl.exact="clickSelectedRow(store.name, true)"
                    @click.shift.exact="clickSelectedRowWithShift(store.name, false)"
                    @click.shift.ctrl="clickSelectedRowWithShift(store.name, true)"
                    :class="tempSelectedStoreCodes.indexOf(store.name) !== -1 ? 'selectedItem' : ''">
                    <!-- G001.00.0 Update-Start -->
                    <!-- <td
                      class="NumericStyle"
                      style="width:20%">{{ store.name.slice(-6) }}</td> -->
                    <!-- <td :class='{"scrollChild":getSelectedStores().length > 7}'>{{ store.displayName.default }}</td> -->
                    <td
                      class="NumericStyle"
                      style="width:92px">{{ store.name.slice(-6) }}</td>
                    <td :style="getSelectedStores().length >= 7 ? 'width:353px' : 'width:368px'">{{ store.displayName.default }}</td>
                    <!-- G001.00.0 Update-End -->
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </v-card-text>

        <v-card-actions class="popup-fotter">
          <v-spacer/>
          <v-btn
            class="button"
            style="background-color: #565960; box-shadow: none;"
            dark
            @click="backFunction()"
            id="popupBtBack"
            tabindex="407"
          >
            {{ $t("O00004.S003") }}
          </v-btn>
          <v-btn
            class="button dialog-fotter-button-orange footerButtonStyle"
            style="box-shadow: none;"
            :disabled="getSelectedStores().length === 0"
            @click="exeFunction()"
            id="popupBtExe"
            tabindex="408"
          >
            {{ $t("O00004.S029") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <popup ref="pop"/>
  </div>
</template>
