<style src="@/resource/static/css/CommonDesign/utils.css" />
<style scoped src="@/resource/static/css/ElectronicJournal/SaveDialog.css" />
<script type="text/javascript" src="@/resource/static/js/ElectronicJournal/SaveDialog.js" />

 <!--
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20221220  litie(Neusoft)    G001.00.0  issue課題#937を対応します.
 * 20230103  litie(Neusoft)    G002.00.0  issue課題#939を対応します.
 * 20230113  litie(Neusoft)    G003.00.0  issue課題#1430を対応します.
 * 20230131  litie(Neusoft)    G004.00.0  issue課題#835を対応します.
 * 20230302  litie(Neusoft)    G005.00.0  issue課題#1650を対応します.
 * 20230412  litie(Neusoft)    G006.00.0  issue課題#937(#note_405626)を対応します.
 * 20230423  bai.ry(Neusoft)   G007.00.0  issue課題#937(#note_489174)を対応します.
 * 20230616  qinshh(Neusoft)   G008.00.0  issue課題#1527を対応します.
-->

<template>
  <div>
    <common-dialog
      v-model="displayed"
      :title="$t('O00004.S029')"
      :ok-label="$t('O00004.S029')"
      :disabled-o-k-button="!hasAllRequiredCondition"
      @clickBack="closeDialog"
      @clickOk="onClickOk">
      <v-row
        no-gutters
        class="w-100 d-flex align-stretch">
        <template>
          <v-col class="ElectronicJournal-form-title">
            <label class="grayFrame h-100 w-100 d-flex justify-center align-center">
              {{ $t("F32271.S009") }}
            </label>
          </v-col>
          <v-col cols="9">
            <v-row
              no-gutters
              class="ElectronicJournal-save-conditionRow">
              <v-col
                cols="12"
                class="ElectronicJournal-save-type-condition">
                <p>
                  <!-- KSD V001.000 DS #83871 -->
                  <!-- <label tabindex="1" @keyup.space="!saveSelectedDisabled ? saveSelected = !saveSelected : null" class="scrollNone ElectronicJournal-save-checkbox"> -->
                  <!-- KSD V001.000 DE #83871 -->
                  <!-- KSD V001.000 AS #83871 -->
                  <label
                    :tabindex="0"
                    @keyup.space="!saveSelectedDisabled ? saveSelected = !saveSelected : null"
                    class="scrollNone ElectronicJournal-save-checkbox">
                    <!-- KSD V001.000 AE #83871 -->
                    <input
                      type="checkbox"
                      :disabled="saveSelectedDisabled"
                      :checked="!saveSelected"
                      @click="saveSelected = !saveSelected">
                    <span :class="{ 'ElectronicJournal-save-checkbox-hover': !saveSelectedDisabled }"/>
                  </label>
                  <b>{{ $t("F32271.S036") }}</b>
                </p>
              </v-col>
            </v-row>
            <v-row
              no-gutters
              class="ElectronicJournal-save-conditionRow">
              <v-col
                cols="12"
                class="ElectronicJournal-save-type-selected">
                <p>
                  <!-- KSD V001.000 DS #83871 -->
                  <!-- <label :tabindex="2" @keyup.space="!saveSelectedDisabled ? saveSelected = !saveSelected : null" class="scrollNone ElectronicJournal-save-checkbox"> -->
                  <!-- KSD V001.000 DE #83871 -->
                  <!-- KSD V001.000 AS #83871 -->
                  <label
                    :tabindex="saveSelectedDisabled ? -1 : 0"
                    @keyup.space="!saveSelectedDisabled ? saveSelected = !saveSelected : null"
                    class="scrollNone ElectronicJournal-save-checkbox">
                    <!-- KSD V001.000 AE #83871 -->
                    <input
                      type="checkbox"
                      :disabled="saveSelectedDisabled"
                      :checked="saveSelected"
                      @click="saveSelected = !saveSelected">
                    <span :class="{ 'ElectronicJournal-save-checkbox-hover': !saveSelectedDisabled }"/>
                  </label>
                  <b>{{ $t("F32271.S037") }}</b>
                </p>
              </v-col>
            </v-row>
          </v-col>
        </template>
      </v-row>
      <v-row
        v-if="!saveSelected"
        no-gutters
        class="ElectronicJournal-save-conditionRow w-100 d-flex align-center mt-5">
        <template>
          <v-col class="h-100 ElectronicJournal-form-title">
            <label class="grayFrame h-100 w-100 d-flex justify-center align-center">
              {{ $t("F32271.S002") }}
            </label>
          </v-col>
          <!-- G006.00.0 Update-Start -->
          <!-- <v-col cols="7" class="h-100 d-flex align-center"> -->
          <v-col class="h-100 d-flex align-center ElectronicJournal-save-targetStoreCodes">
            <!-- G006.00.0 Update-End -->
            <!-- G002.00.0 Update-Start -->
            <!-- <store-select v-model="targetStoreCodes" /> -->
            <!-- G005.00.0 Update-Start -->
            <!-- <store-select v-model="targetStoreCodes" headquartersAuthorityCheckEnable /> -->
            <store-select
              v-if="displayed"
              v-model="targetStoreCodes"
              headquarters-authority-check-enable />
              <!-- G005.00.0 Update-End -->
              <!-- G002.00.0 Update-End -->
          </v-col>
        </template>
      </v-row>
      <v-row
        v-if="!saveSelected"
        no-gutters
        class="ElectronicJournal-save-conditionRow w-100 d-flex align-center mt-1">
        <template>
          <v-col class="h-100 ElectronicJournal-form-title">
            <label
              for="durationFrom"
              class="grayFrame h-100 w-100 d-flex justify-center align-center">
              {{ $t("F32271.S013") }}
            </label>
          </v-col>
          <v-col class="h-100 d-flex align-center ElectronicJournal-save-input">
            <!-- G003.00.0 Update-Start -->
            <!-- <date-input format="Y/m/d" v-model="businessDateStart" /> -->
            <date-input
              format="Y/m/d"
              v-model="businessDateStart"
              :disabled-func="businessDateDisabledFunc" />
              <!-- G003.00.0 Update-End -->
          </v-col>
          <span class="ElectronicJournal-save-input-space">～</span>
          <v-col class="h-100 d-flex align-center ElectronicJournal-save-input">
            <!-- G003.00.0 Update-Start -->
            <!-- <date-input format="Y/m/d" v-model="businessDateEnd" /> -->
            <date-input
              format="Y/m/d"
              v-model="businessDateEnd"
              :disabled-func="businessDateDisabledFunc" />
              <!-- G003.00.0 Update-End -->
          </v-col>
        </template>
      </v-row>
      <v-row
        v-if="!saveSelected"
        no-gutters
        class="ElectronicJournal-save-conditionRow w-100 d-flex align-center mt-1">
        <template>
          <v-col class="h-100 ElectronicJournal-form-title">
            <label class="grayFrame h-100 w-100 d-flex justify-center align-center">
              {{ $t("F32271.S014") }}
            </label>
          </v-col>
          <!-- G006.00.0 Update-Start -->
          <!-- <v-col cols="7" class="h-100 d-flex align-center whiteFrame"> -->
          <v-col class="h-100 d-flex align-center whiteFrame ElectronicJournal-save-endpoint">
            <!-- G006.00.0 Update-End -->
            <input
              type="text"
              class="px-2 h-100 w-100 ellipsis"
              :value="selectedRegisterIdsText"
              disabled >
            <v-btn
              class="rightArrowButton mx-2"
              @click="onShowRegisterIdsDialog" />
          </v-col>
        </template>
      </v-row>
      <!-- G008.00.0 Add-Start -->
      <v-row
        v-if="saveSelected"
        no-gutters
        class="ElectronicJournal-save-conditionRow w-100 d-flex align-center mt-5">
        <template>
          <v-col class="h-100 ElectronicJournal-form-title">
            <label
              class="grayFrame h-100 w-100 d-flex justify-center align-center">
              {{ $t('F32271.S040') }}
            </label>
          </v-col>
          <v-col
            cols="4"
            class="h-100">
            <radio-button
              v-model="config.totalPriceDiscount"
              :labels="allowanceLabels"
              :disabled="radioButtonDisabled"
            />
          </v-col>
        </template>
      </v-row>
      <!-- G008.00.0 Add-End -->
      <v-row
        no-gutters
        class="ElectronicJournal-save-conditionRow w-100 d-flex align-center mt-5">
        <template>
          <v-col class="h-100 ElectronicJournal-form-title">
            <label
              for="businessTime"
              class="grayFrame h-100 w-100 d-flex justify-center align-center">
              {{ $t('F32271.S011') }}
            </label>
          </v-col>
          <!-- G006.00.0 Update-Start -->
          <!-- <v-col cols="7" class="h-100 d-flex align-center"> -->
          <v-col class="h-100 d-flex align-center">
            <!-- G006.00.0 Update-End -->
            <div class="h-100 w-100">
              <input
                :type="passwordVisible ? 'text' : 'password'"
                v-model="password"
                autocomplete="new-password"
                maxlength="4"
                class="h-100 w-100 px-2 whiteFrame">
              <a
                href="#"
                @click="passwordVisible = !passwordVisible"
                @keyup.space="passwordVisible = !passwordVisible"
                class="ElectronicJournal-save-password-field-icon scrollNone">
                <span>
                  <!-- G007.00.0 Update-Start -->
                  <p
                    toggle="password-field"
                    :class="{
                      'mdi': true,
                      'mdi-eye': !passwordVisible,
                      'mdi-eye-off': passwordVisible,
                      'toggle-password': true,
                      'ElectronicJournal-save-password-show-icon': passwordVisible
                  }"/>
                  <!-- G007.00.0 Update-End -->
                </span>
              </a>
            </div>
          </v-col>
          <!-- G006.00.0 Update-Start -->
          <!-- <v-col cols="2" class="h-100 d-flex align-center"> -->
          <v-col
            cols="1"
            class="h-100 d-flex align-center">
            <!-- G006.00.0 Update-End -->
            <div
              :tip="$t('F32271.W002')"
              :class="{
                'ElectronicJournal-save-password-tip': true,
                'ElectronicJournal-save-password-tip-top': !saveSelected,
                'ElectronicJournal-save-password-tip-bottom': saveSelected,
            }">
              <p class="mdi mdi-help"/>
            </div>
          </v-col>
        </template>
      </v-row>
    </common-dialog>
    <popup ref="pop" />
    <dialog-register-select
      :title="$t('F32271.S018')"
      :multiple="false"
      v-model="registerSelectDisplayed"
      :register-ids="availableRegisterIds"
      :available-register-ids="availableRegisterIds"
      :selected-register-ids="selectedRegisterIds"
      @clickOk="selectedRegisterIds = $event"
    />
  </div>
</template>
