<style src="@/resource/static/css/CommonDesign/utils.css" />
<style scoped src="@/resource/static/css/ElectronicJournal/electronicJournal.css" />
<script type="text/javascript" src="@/resource/static/js/ElectronicJournal/electronicJournal.js" />

 <!--
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20221220  litie(Neusoft)    G001.00.0  issue課題#835を対応します.
 * 20221220  litie(Neusoft)    G002.00.0  issue課題#937を対応します.
 * 20230103  litie(Neusoft)    G003.00.0  issue課題#939を対応します.
 * 20230113  litie(Neusoft)    G004.00.0  issue課題#1430を対応します.
 * 20230116  litie(Neusoft)    G005.00.0  issue課題#1437を対応します.
 * 20230228  litie(Neusoft)    G006.00.0  issue課題#1649を対応します.
 * 20230302  litie(Neusoft)    G007.00.0  issue課題#1651を対応します.
 * 20230412  litie(Neusoft)    G008.00.0  issue課題#937(#note_405626)を対応します.
-->

<template>
  <v-container class="mt-10">
    <v-row
      no-gutters
      class="w-100 d-flex mt-5">
      <!-- G001.00.0 Update-Start -->
      <v-col class="h-100 ElectronicJournal-left">
        <v-row
          no-gutters
          class="w-100">
          <!-- G001.00.0 Update-End -->
          <!-- G005.00.0 Update-Start -->
          <!-- <v-col cols="7" style="border: 1px solid #1ea7cb; padding: 20px; margin-right: 20px;">
        <h2>ジャーナル検索条件</h2> -->
          <v-col
            cols="12"
            class="ElectronicJournal-base-form">
            <label style="text-align: left;color: #1ea7cb;">ジャーナル検索条件</label>
            <!-- G005.00.0 Update-End -->
            <!-- 検索条件 -->
            <!-- G002.00.0 Update-Start -->
            <!-- <v-row
          no-gutters
          class="conditionRow w-100 d-flex align-center mt-5"
        > -->
            <v-row
              no-gutters
              class="conditionRow w-100 d-flex align-center mt-1"
            >
              <!-- G002.00.0 Update-End -->
              <!-- 店舗 -->
              <template >
                <!-- G002.00.0 Update-Start -->
                <!-- <v-col cols="2" class="h-100"> -->
                <v-col class="h-100 ElectronicJournal-form-title">
                  <!-- G002.00.0 Update-End -->
                  <label
                    for="targetStores"
                    class="grayFrame h-100 w-100 d-flex justify-center align-center"
                  >
                    {{ "店舗" }}
                  </label>
                </v-col>
                <!-- G008.00.0 Update-Start -->
                <!-- <v-col cols="7" class="h-100 d-flex align-center"> -->
                <v-col class="h-100 d-flex align-center ElectronicJournal-form-targetStoreCodes">
                  <!-- G008.00.0 Update-End -->
                  <!-- G003.00.0 Update-Start -->
                  <!-- <store-select multiple v-model="targetStoreCodes" /> -->
                  <store-select
                    v-model="targetStoreCodes"
                    headquarters-authority-check-enable />
                    <!-- G003.00.0 Update-End -->
                </v-col>
              </template>
            </v-row>
            <!-- G002.00.0 Update-Start -->
            <!-- <v-row
          no-gutters
          class="conditionRow w-100 d-flex align-center mt-5"
        > -->
            <v-row
              no-gutters
              class="conditionRow w-100 d-flex align-center mt-1"
            >
              <!-- G002.00.0 Update-End -->
              <template>
                <!-- G002.00.0 Update-Start -->
                <!-- <v-col cols="2" class="h-100"> -->
                <v-col class="h-100 ElectronicJournal-form-title">
                  <!-- G002.00.0 Update-End -->
                  <label
                    for="durationFrom"
                    class="grayFrame h-100 w-100 d-flex justify-center align-center"
                  >
                    {{ "期間" }}
                  </label>
                </v-col>

                <!-- G002.00.0 Update-Start -->
                <!-- <v-col cols="4" class="h-100 d-flex align-center"> -->
                <v-col class="h-100 d-flex align-center ElectronicJournal-form-input">
                  <!-- G002.00.0 Update-End -->
                  <!-- G001.00.0 Update-Start -->
                  <!-- <date-input v-model="businessDateStart" /> -->
                  <!-- G004.00.0 Update-Start -->
                  <!-- <date-input format="Y/m/d" v-model="businessDateStart" /> -->
                  <date-input
                    format="Y/m/d"
                    v-model="businessDateStart"
                    :disabled-func="businessDateDisabledFunc" />
                    <!-- G004.00.0 Update-End -->
                    <!-- G001.00.0 Update-End -->
                </v-col>

                <!-- G002.00.0 Update-Start -->
                <!-- <span class="mx-2">～</span> -->
                <span class="ElectronicJournal-form-input-space">～</span>
                <!-- G002.00.0 Update-End -->

                <!-- G002.00.0 Update-Start -->
                <!-- <v-col cols="4" class="h-100 d-flex align-center"> -->
                <v-col class="h-100 d-flex align-center ElectronicJournal-form-input">
                  <!-- G002.00.0 Update-End -->
                  <!-- G001.00.0 Update-Start -->
                  <!-- <date-input v-model="businessDateEnd" /> -->
                  <!-- G004.00.0 Update-Start -->
                  <!-- <date-input format="Y/m/d" v-model="businessDateEnd" /> -->
                  <date-input
                    format="Y/m/d"
                    v-model="businessDateEnd"
                    :disabled-func="businessDateDisabledFunc" />
                    <!-- G004.00.0 Update-End -->
                    <!-- G001.00.0 Update-End -->
                </v-col>
              </template>
            </v-row>
            <!-- G002.00.0 Update-Start -->
            <!-- <v-row
          no-gutters
          class="conditionRow w-100 d-flex align-center mt-5"
        > -->
            <v-row
              no-gutters
              class="conditionRow w-100 d-flex align-center mt-1"
            >
              <!-- G002.00.0 Update-End -->
              <template>
                <!-- G002.00.0 Update-Start -->
                <!-- <v-col cols="2" class="h-100"> -->
                <v-col class="h-100 ElectronicJournal-form-title">
                  <!-- G002.00.0 Update-End -->
                  <label
                    for="targetStores"
                    class="grayFrame h-100 w-100 d-flex justify-center align-center"
                  >
                    {{ "レジNo." }}
                  </label>
                </v-col>
                <!-- G008.00.0 Update-Start -->
                <!-- <v-col cols="7" class="h-100 d-flex align-center whiteFrame"> -->
                <v-col
                  cols="7"
                  class="h-100 d-flex align-center whiteFrame ElectronicJournal-form-endpoint">
                  <!-- G008.00.0 Update-End -->
                  <input
                    type="text"
                    id="targetStores"
                    class="px-2 h-100 w-100 ellipsis"
                    :value="selectedRegisterIdsText"
                    disabled
                  >
                  <v-btn
                    class="rightArrowButton mx-2"
                    @click="onShowRegisterIdsDialog"
                  />
                </v-col>
              </template>
            </v-row>
            <!-- G001.00.0 Update-Start -->
            <!-- <v-row>
          <v-btn color="#777" @click="showDetailCondition" style="width: 120px;height: 50px; margin-left: auto" tabindex="7"><font color ="white" size= "4px" style="font-weight:bold;">詳細条件</font></v-btn>
          <v-btn color="#f09415" @click="searchProc" style="width: 100px;height: 50px; margin-left: 20px;" tabindex="7"><font color ="white" size= "4px" style="font-weight:bold;">検索</font></v-btn>
        </v-row> -->
            <v-row
              no-gutters
              class="conditionRow w-100 d-flex align-center mt-3">
              <!-- G007.00.0 Update-Start -->
              <!-- <v-btn @click="showDetailCondition" class="ElectronicJournal-button ElectronicJournal-showDetailCondition-button" tabindex="7"> -->
              <v-btn
                @click="showDetailCondition"
                class="ElectronicJournal-button ElectronicJournal-showDetailCondition-button">
                <!-- G007.00.0 Update-End -->
                <label>{{ $t("F32271.S015") }}</label>
                <!-- <label>{{ $t("F32271.S025") }}</label> -->
                <div
                  v-if="hasDetailCondition"
                  class="ElectronicJournal-showDetailCondition-button-mark"/>
              </v-btn>
              <!-- G007.00.0 Update-Start -->
              <!-- <v-btn @click="searchProc" class="ElectronicJournal-button ElectronicJournal-searchProc-button" tabindex="7" :disabled="!hasAllRequiredCondition">{{ $t("F32271.S016") }}</v-btn> -->
              <v-btn
                @click="searchProc"
                class="ElectronicJournal-button ElectronicJournal-searchProc-button"
                :disabled="!hasAllRequiredCondition">{{ $t("F32271.S016") }}</v-btn>
                <!-- G007.00.0 Update-End -->
            </v-row>
          </v-col>
        </v-row>
        <!-- 余白 -->
        <v-row
          no-gutters
          class="w-100 ElectronicJournal-blank"><v-col><v-spacer /></v-col></v-row>
        <!-- 一覧エリア -->
        <v-row
          v-if="tempResults"
          no-gutters
          class="w-100">
          <v-col cols="12">
            <v-row
              no-gutters
              class="ElectronicJournal-count">
              <v-col>
                <font class="baseFont"><b>{{ $t("F32271.S021") }}{{ tempResults.length }}{{ $t("F32271.S022") }}</b></font>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col
                cols="12"
                class="h-100 ElectronicJournal-results-table">
                <table class="w-100">
                  <thead>
                    <tr :class="{'overflow-scroll' : tempResults.length > 9, 'overflow-hidden' : tempResults.length <= 9}">
                      <th style="width: 22% !important;">{{ $t("F32271.S023") }}</th>
                      <th style="width: 12% !important;">{{ $t("F32271.S006") }}</th>
                      <th style="width: 18% !important;">{{ $t("F32271.S007") }}</th>
                      <th style="width: 48% !important;">{{ $t("F32271.S024") }}</th>
                    </tr>
                    <tr
                      v-if="tempResults.length > 9"
                      class="scroll-tr"><th/></tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(result, index) in tempResults"
                      :key="index"
                      :class="{'ElectronicJournal-results-table-tr-selected': index === resultsSelectIndex}"
                      @click.exact="clickResultsRow(index, false)"
                      @click.ctrl.exact="clickResultsRow(index, true)"
                    >
                      <td style="width: 22% !important;">{{ result.businessDate | filterBusinessDate }}</td>
                      <td style="width: 12% !important;">{{ result.businessTime | filterBusinessTime }}</td>
                      <td style="width: 18% !important;">{{ result.transactionNo }}</td>
                      <td style="width: 48% !important; justify-content: end; text-align: right;">{{ result.total | filterTotal(result.type, that) }}</td>
                    </tr>
                  </tbody>
                </table>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <!-- G001.00.0 Update-End -->
      </v-col>
      <!-- G001.00.0 Update-Start -->
      <!-- <v-col cols="4" style="background-color: #fff; padding: 20px; max-height: 600px; overflow: auto;" id="pdf-result">
        <v-row v-for="(item, index) in tempResults" :key="index">
          <v-col>
            <p style="margin-bottom: 0; font-size: 16px;">{{ item.createTimestamp.substring(0, 10) }}({{ item.lastModifiedUserId }})</p>
            <p style="font-size: 12px;">店舗ID：{{ item.nodeId }}</p>
            <div style="word-break: break-all; font-size: 12px;">{{ item.formattedOutput }}</div>
          </v-col>
        </v-row>
        <v-row v-if="tempResults.length == 0">
          <v-col>
            <p style="font-size: 18px; color: #ff0000;">電子ジャーナル情報がありません。</p>
          </v-col>
        </v-row>
      </v-col> -->
      <v-col
        v-if="resultsSelectIndex > -1"
        class="ml-5 ElectronicJournal-right">
        <v-row
          no-gutters
          class="w-100 ElectronicJournal-formattedOutput-row">
          <v-col cols="12">
            <!-- <div v-html="$options.filters.formatOutput(results[resultsSelectIndex].formattedOutput)" class="ElectronicJournal-formattedOutput-html"></div> -->
            <pre class="ElectronicJournal-formattedOutput-pre">{{ tempResults[resultsSelectIndex].formattedOutput | filterFormattedOutput }}</pre>
          </v-col>
        </v-row>
      </v-col>
      <!-- G001.00.0 Update-End -->
    </v-row>
    <!-- G002.00.0 Update-Start -->
    <!-- <v-row
      no-gutters
      class="conditionRow w-100 d-flex align-center mt-5"
    >
      <v-col cols="2" class="h-100">
        <label
          for="durationFrom"
          class="grayFrame h-100 w-100 d-flex justify-center align-center"
        >
          {{ "パスワード" }}
        </label>
      </v-col>

      <v-col cols="4" class="h-100 d-flex align-center">
        <input type="password" class="h-100 w-100 whiteFrame" v-model="password" maxlength="4" />
      </v-col>
    </v-row>
    <div class="text-left mt-5">
      パスワードを、半角英数字４文字以内で入力してください。<br/>
      入力したパスワードはダウンロードした電子ジャーナルファイルの解凍する際に<br/>
      利用しますので、忘れないようにしてください。
    </div> -->
    <!-- G002.00.0 Update-End -->
    <!-- その他ダイアログ等 -->
    <v-row>
      <v-col>
        <maint-button
          @close="backToMenu"
          @toSave="toSave"
        />
      </v-col>
    </v-row>
    <popup ref="pop" />
    <!-- G001.00.0 Update-Start -->
    <!-- <dialog-register-select
      title="レジ番号選択"
      v-model="registerSelectDisplayed"
      :registerIds="availableRegisterIds"
      :availableRegisterIds="availableRegisterIds"
      :selectedRegisterIds="selectedRegisterIds"
      @clickOk="selectedRegisterIds = $event"
    ></dialog-register-select> -->
    <dialog-register-select
      title="レジ番号選択"
      :multiple="false"
      v-model="registerSelectDisplayed"
      :register-ids="availableRegisterIds"
      :available-register-ids="availableRegisterIds"
      :selected-register-ids="selectedRegisterIds"
      @clickOk="selectedRegisterIds = $event"
    />
    <!-- G001.00.0 Update-End -->
    <condition-dialog
      ref="conditionDialog"
      @clickOk="saveCallback" />
    <!-- G002.00.0 Update-Start -->
    <save-dialog
      ref="saveDialog"
      @clickOk="toSaveCallback" />
    <!-- G006.00.0 Update-Start -->
    <!-- <div class="ElectronicJournal-formattedOutput-pdf-area">
      <div id="pdf-result" class="ElectronicJournal-formattedOutput-pdf"> -->
    <!-- G006.00.0 Update-End -->
    <!-- G006.00.0 Update-Start -->
    <!-- <div v-for="rowIndex in Math.ceil(saveFormattedOutputs.length/3)"
          :key="'pdf-save-condition-results-row-' + rowIndex" class="ElectronicJournal-formattedOutput-pdf-page">
          <pre v-for="colIndex in 3" :key="'pdf-save-condition-results-row-' + rowIndex + '-col-' + colIndex"
            class="ElectronicJournal-formattedOutput-pre">{{ ((rowIndex-1)*3 + (colIndex-1)) < saveFormattedOutputs.length ? saveFormattedOutputs[(rowIndex-1)*3 + (colIndex-1)] : '' | filterFormattedOutput }}</pre>
        </div> -->
    <!-- G006.00.0 Update-Start -->
    <!-- <div v-for="(group, groupIndex) in saveFormattedOutputs"
          :key="'pdf-save-condition-results-group-' + groupIndex"
          class="ElectronicJournal-formattedOutput-pdf-group">
          <div v-for="(page, pageIndex) in group"
            :key="'pdf-save-condition-results-group-' + groupIndex + '-page-' + pageIndex"
            class="ElectronicJournal-formattedOutput-pdf-page">
            <pre v-for="(col, colIndex) in page"
              :key="'pdf-save-condition-results-group-' + groupIndex + '-page-' + pageIndex + '-col-' + colIndex"
              class="ElectronicJournal-formattedOutput-pre">{{ col | filterFormattedOutput }}</pre>
          </div>
        </div> -->
    <!-- G006.00.0 Update-End -->
    <!-- G006.00.0 Update-End -->
    <!-- G006.00.0 Update-Start -->
    <!-- </div>
    </div> -->
    <!-- G006.00.0 Update-End -->
    <!-- G002.00.0 Update-End -->
    <!-- G006.00.0 Update-Start -->
    <v-overlay :value="isLoading">
      <div class="text-center">
        <v-progress-circular
          indeterminate
          :size="70"
          :width="7"
          color="white"
        />
      </div>
    </v-overlay>
    <!-- G006.00.0 Update-End -->
  </v-container>
</template>
