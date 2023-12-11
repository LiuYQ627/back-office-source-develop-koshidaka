<!--
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230720  qinshh(Neusoft)   G001.00.0  issue課題#903を対応します.
 * 20230808  qinshh(Neusoft)   G001.00.1  issue課題#903を対応します.
 * 20230831  heqianlong(Neusoft)   G001.00.2  issue課題#903を対応します.
-->
<style src="./../../static/css/CommonDesign/dialogStoreSelect.css"></style>
<script type="text/javascript" src="./../../static/js/CommonDesign/dialogExlusionSelect.js"></script>
<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="1147px !important"
      persistent>
      <v-card min-width="1147px">
        <v-card-title class="headline dialog-line-blue">
          <!-- G001.00.1 Update-Start -->
          <font
            class="popup-title"
            style="font-size:22px;"><b>決済種別(除外)選択</b></font>
            <!-- G001.00.1 Update-End -->
        </v-card-title>

        <v-card-text class="contentStyle">
          <div id="text-content">
            <p style="width:460px;">{{ $t("O00004.S019") }}</p>
            <p style="width:166px; "/>
            <p style="width:460px;">{{ $t("O00004.S026") }}</p>
          </div>
          <br>
          <div style="overflow: hidden;height: 331px">
            <div class="storeTableStyle">
              <table>
                <thead>
                  <tr>
                    <th
                      class="titleCellStyle borderCellStyle"
                      style="border-right: 1px solid #fff; width:146px !important">締めNo.</th>
                    <th class="titleCellStyle borderCellStyle">名称</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(exlusion, index) in getCandidateExlusions()"
                    :key="index"
                    @click.exact="clickCandidateRow(exlusion, false)"
                    @click.ctrl.exact="clickCandidateRow(exlusion, true)"
                    @click.shift.exact="clickCandidateRowWithShift(exlusion, false)"
                    @click.shift.ctrl="clickCandidateRowWithShift(exlusion, true)"
                    :class="tempCandidateExlusionCodes.indexOf(exlusion.value) !== -1 ? 'selectedItem' : ''">
                    <!-- G001.00.1 Update-Start -->
                    <!-- <td
                      class="NumericStyle"
                      style="width:150px">{{ exlusion.value }}</td> -->
                    <!-- G001.00.2 Update-Start -->
                    <!-- <td
                      class="NumericStyle"
                      :style="getCandidateExlusions().length < 7 ? 'width:150px !important' :
                      getCandidateExlusions().length === 7 ? 'width:157px !important' : 'width:124px !important'">{{ exlusion.value }}</td> -->
                    <!-- G001.00.1 Update-End -->
                    <!-- <td :class='{"scrollChild":getCandidateExlusions().length > 7}'>{{ exlusion.name }}</td> -->
                    <td
                      class="NumericStyle"
                      style="width:116px">{{ exlusion.value }}</td>
                    <td :style="getCandidateExlusions().length >= 7 ? 'width:327px' : 'width:344px'">{{ exlusion.name }}</td>
                    <!-- G001.00.2 Update-End -->
                  </tr>
                </tbody>
              </table>
            </div>
            <div id="centerButtonDiv">
              <v-btn
                @click="onClickAllSelected()"
                :disabled="!isMultiMode || exlusions.length === 0 "
                tabindex="403">
                <font style="margin-right: 15px;">{{ $t("O00004.S022") }}</font>
                <span class="selectArrow" />
              </v-btn>
              <v-btn
                @click="onClickSelected()"
                style="margin-top: 23px;"
                :disabled="exlusions.length === 0 || tempCandidateExlusionCodes.length === 0"
                tabindex="404">
                <font style="margin-right: 15px;">{{ $t("O00004.S023") }}</font>
                <span class="selectArrow" />
              </v-btn>
              <v-btn
                @click="onClickDelete()"
                style="margin-top: 86px;"
                :disabled="getSelectedExlusions().length === 0 || tempSelectedExlusionCodes.length === 0"
                tabindex="405">
                <span class="selectArrow selectArrowReverse" />
                <font style="margin-left: 15px;">{{ $t("O00004.S024") }}</font>
              </v-btn>
              <v-btn
                @click="onClickAllDelete()"
                style="margin-top: 23px;"
                :disabled="!isMultiMode || getSelectedExlusions().length === 0 "
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
                    style="border-right: 1px solid #fff; width:146px !important">締めNo.</th>
                  <th class="titleCellStyle borderCellStyle">名称</th>
                </thead>
                <tbody>
                  <tr
                    v-for="(exlusion, index) in getSelectedExlusions()"
                    :key="index"
                    @click.exact="clickSelectedRow(exlusion, false)"
                    @click.ctrl.exact="clickSelectedRow(exlusion, true)"
                    @click.shift.exact="clickSelectedRowWithShift(exlusion, false)"
                    @click.shift.ctrl="clickSelectedRowWithShift(exlusion, true)"
                    :class="tempSelectedExlusionCodes.indexOf(exlusion.value) !== -1 ? 'selectedItem' : ''">
                    <!-- G001.00.1 Update-Start -->
                    <!-- <td
                      class="NumericStyle"
                      style="width:150px">{{ exlusion.value }}</td> -->
                    <!-- G001.00.2 Update-Start -->
                    <!-- <td
                      class="NumericStyle"
                      :style="getSelectedExlusions().length < 7 ? 'width:150px !important' :
                      getSelectedExlusions().length === 7 ? 'width:157px !important' : 'width:124px !important'">{{ exlusion.value }}</td> -->
                    <!-- G001.00.1 Update-End -->
                    <!-- <td :class='{"scrollChild":getSelectedExlusions().length > 7}'>{{ exlusion.name }}</td> -->
                    <td
                      class="NumericStyle"
                      style="width:116px">{{ exlusion.value }}</td>
                    <td :style="getSelectedExlusions().length >= 7 ? 'width:327px' : 'width:344px'">{{ exlusion.name }}</td>
                    <!-- G001.00.2 Update-End -->
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
