<style src="@/resource/static/css/CommonDesign/utils.css" />
<style src="@/resource/static/css/TransactionNameSetting/transactionNameEditDialog.css" />
<!-- G001.00.0 Update-Start -->
<style src="@/resource/static/css/ElectronicJournal/ConditionDialog.css" />
<!-- G001.00.0 Update-End -->
<script type="text/javascript" src="@/resource/static/js/ElectronicJournal/ConditionDialog.js" />

 <!--
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20221220  litie(Neusoft)    G001.00.0  issue課題#835を対応します.
 * 20221220  litie(Neusoft)    G002.00.0  issue課題#937を対応します.
 * 20230511  wangchunmei(Neusoft) G002.00.1  issue課題#937を対応します.
-->

<template>
  <div>
    <!-- G002.00.0 Update-Start -->
    <!-- <common-dialog
      v-model="displayed"
      title="詳細条件"
      :okLabel="$t('O00004.S029')"
      @clickBack="closeDialog"
      @clickOk="onClickOk"
    > -->
    <common-dialog
      v-model="displayed"
      :title="$t('F32271.S015')"
      :ok-label="$t('O00004.S029')"
      @clickBack="closeDialog"
      @clickOk="onClickOk"
      :has-reset-button="true"
      @clickReset="onClickReset"
    >
      <div class="h-100 w-100 ElectronicJournal-condition-content">
        <!-- G002.00.0 Update-End -->
        <!-- G002.00.0 Update-Start -->
        <!-- <v-row
        no-gutters
        class="conditionRow w-100 d-flex align-center mt-5"
      > -->
        <v-row
          no-gutters
          class="conditionRow w-100 d-flex align-center"
        >
          <!-- G002.00.0 Update-End -->
          <template>
            <!-- G002.00.0 Update-Start -->
            <!-- <v-col cols="3" class="h-100"> -->
            <v-col class="h-100 ElectronicJournal-condition-title">
              <!-- G002.00.0 Update-End -->
              <label
                for="businessTime"
                class="grayFrame h-100 w-100 d-flex justify-center align-center"
              >
                {{ "時刻" }}
              </label>
            </v-col>

            <!-- G002.00.0 Update-Start -->
            <!-- <v-col cols="3" class="h-100 d-flex align-center"> -->
            <v-col class="h-100 d-flex align-center ElectronicJournal-condition-input">
              <!-- G002.00.0 Update-End -->
              <!-- G001.00.0 Update-Start -->
              <!-- G002.00.1 Update-Start -->
              <!-- <input class="h-100 w-100 whiteFrame" style="outline: none;" type="time" v-model="businessTimeStart" /> -->
              <!-- <input ref="businessTimeStartInput" class="h-100 w-100 whiteFrame px-2" :class="{'ElectronicJournal-errorTextBox':businessTimeStartErrorMsg !== ''}"
              style="outline: none;" type="time" v-model="businessTimeStart" /> -->
              <!-- G001.00.0 Update-End -->
              <input
                ref="businessTimeStartInput"
                class="h-100 whiteFrame px-2"
                :class="{'ElectronicJournal-errorTextBox':businessTimeStartErrorMsg !== ''}"
                style="outline: none;color: #000000;width:168px"
                type="time"
                v-model="businessTimeStart" >
            <!-- G002.00.1 Update-End -->
            </v-col>

            <!-- G002.00.0 Update-Start -->
            <!-- <span class="mx-2">～</span> -->
            <span class="ElectronicJournal-condition-input-space">～</span>
            <!-- G002.00.0 Update-End -->

            <!-- G002.00.0 Update-Start -->
            <!-- <v-col cols="4" class="h-100 d-flex align-center"> -->
            <v-col class="h-100 d-flex align-center ElectronicJournal-condition-input">
              <!-- G002.00.0 Update-End -->
              <!-- G001.00.0 Update-Start -->
              <!-- <input class="h-100 w-100 whiteFrame" style="outline: none;" type="time" v-model="businessTimeEnd" /> -->
              <!-- G002.00.1 Update-Start -->
              <!-- <input ref="businessTimeEndInput" class="h-100 w-100 whiteFrame px-2" :class="{'ElectronicJournal-errorTextBox':businessTimeEndErrorMsg !== ''}"
              style="outline: none;" type="time" v-model="businessTimeEnd" /> -->
              <!-- G001.00.0 Update-End -->
              <input
                ref="businessTimeEndInput"
                class="h-100 whiteFrame px-2"
                :class="{'ElectronicJournal-errorTextBox':businessTimeEndErrorMsg !== ''}"
                style="outline: none;color: #000000;width:168px"
                type="time"
                v-model="businessTimeEnd" >
            <!-- G002.00.1 Update-End -->
            </v-col>
          </template>
        </v-row>
        <!-- G001.00.0 Update-Start -->
        <v-row
          v-if="businessTimeStartErrorMsg !== ''"
          no-gutters
          class="conditionRow ElectronicJournal-error w-100 d-flex align-center"
        >
          <template>
            <v-col class="h-100 ElectronicJournal-condition-title"/>
            <v-col
              cols="5"
              class="h-100 d-flex align-center">
              <label>{{ businessTimeStartErrorMsg }}</label>
            </v-col>
          </template>
        </v-row>
        <v-row
          v-if="businessTimeEndErrorMsg !== '' && businessTimeStartErrorMsg !== businessTimeEndErrorMsg"
          no-gutters
          class="conditionRow ElectronicJournal-error w-100 d-flex align-center"
        >
          <template>
            <v-col
              cols="12"
              class="h-100 d-flex align-center justify-end">
              <label>{{ businessTimeEndErrorMsg }}</label>
            </v-col>
          </template>
        </v-row>
        <!-- G001.00.0 Update-End -->
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
            <!-- <v-col cols="3" class="h-100"> -->
            <v-col class="h-100 ElectronicJournal-condition-title">
              <!-- G002.00.0 Update-End -->
              <label
                for="businessTime"
                class="grayFrame h-100 w-100 d-flex justify-center align-center"
              >
                {{ "取引No" }}
              </label>
            </v-col>

            <!-- G002.00.0 Update-Start -->
            <!-- <v-col cols="3" class="h-100 d-flex align-center"> -->
            <v-col class="h-100 d-flex align-center ElectronicJournal-condition-input">
              <!-- G002.00.0 Update-End -->
              <!-- G001.00.0 Update-Start -->
              <!-- <input class="h-100 w-100 whiteFrame" type="text" v-model="transactionNoStart" /> -->
              <input
                class="h-100 w-100 whiteFrame px-2"
                :class="{'ElectronicJournal-errorTextBox'
                :transactionNoStartErrorMsg !== ''}"
                type="text"
                v-model="transactionNoStart"
                maxlength="4"
                @input="transactionNoStartInputRegulation" >
            <!-- G001.00.0 Update-End -->
            </v-col>

            <!-- G002.00.0 Update-Start -->
            <!-- <span class="mx-2">～</span> -->
            <span class="ElectronicJournal-condition-input-space">～</span>
            <!-- G002.00.0 Update-End -->

            <!-- G002.00.0 Update-Start -->
            <!-- <v-col cols="4" class="h-100 d-flex align-center"> -->
            <v-col class="h-100 d-flex align-center ElectronicJournal-condition-input">
              <!-- G002.00.0 Update-End -->
              <!-- G001.00.0 Update-Start -->
              <!-- <input class="h-100 w-100 whiteFrame" type="text" v-model="transactionNoEnd" /> -->
              <input
                class="h-100 w-100 whiteFrame px-2"
                :class="{'ElectronicJournal-errorTextBox'
                :transactionNoEndErrorMsg !== ''}"
                type="text"
                v-model="transactionNoEnd"
                maxlength="4"
                @input="transactionNoEndInputRegulation" >
            <!-- G001.00.0 Update-End -->
            </v-col>
          </template>
        </v-row>
        <!-- G001.00.0 Update-Start -->
        <v-row
          v-if="transactionNoStartErrorMsg !== ''"
          no-gutters
          class="conditionRow ElectronicJournal-error w-100 d-flex align-center">
          <template>
            <v-col class="h-100 ElectronicJournal-condition-title"/>
            <v-col
              cols="8"
              class="h-100 d-flex align-center">
              <label>{{ transactionNoStartErrorMsg }}</label>
            </v-col>
          </template>
        </v-row>
        <v-row
          v-if="transactionNoEndErrorMsg !== ''"
          no-gutters
          class="conditionRow ElectronicJournal-error w-100 d-flex align-center">
          <template>
            <v-col
              cols="12"
              class="h-100 d-flex align-center justify-end">
              <label>{{ transactionNoEndErrorMsg }}</label>
            </v-col>
          </template>
        </v-row>
        <!-- G001.00.0 Update-End -->
        <!-- G002.00.0 Update-Start -->
        <!-- <v-row
        no-gutters
        class="conditionRow w-100 d-flex align-center mt-5"
      > -->
        <v-row
          no-gutters
          class="w-100 d-flex align-stretch mt-1"
        >
          <!-- G002.00.0 Update-End -->
          <template>
            <!-- G002.00.0 Update-Start -->
            <!-- <v-col cols="3" class="h-100"> -->
            <v-col class="ElectronicJournal-condition-title">
              <!-- G002.00.0 Update-End -->
              <label
                for="businessTime"
                class="grayFrame h-100 w-100 d-flex justify-center align-center"
              >
                {{ "キーワード" }}
              </label>
            </v-col>

            <!-- G002.00.0 Update-Start -->
            <!-- <v-col cols="9" class="h-100 d-flex align-center">
            <input class="h-100 w-100 whiteFrame" type="text" v-model="keyword" @input="changeKeyword" />
          </v-col> -->
            <v-col
              cols="auto"
              class="whiteFrame ElectronicJournal-condition-keyword-col">
              <v-row
                no-gutters
                class="conditionRow">
                <!-- CS KSD V001.000 #83851 -->
                <!--
                <v-col cols="12">
                  <input
                    class="h-100 w-100 px-2"
                    type="text"
                    v-model="keyword"
                    @input="changeKeyword"
                    maxlength="40">
                </v-col>
                -->
                <v-col cols="12">
                  <input
                    class="h-100 w-100 px-2"
                    type="text"
                    v-model="keyword"
                  >
                </v-col>
                <!-- CE KSD V001.000 #83851 -->
              </v-row>
              <v-row no-gutters>
                <v-col cols="12">
                  <v-spacer class="ElectronicJournal-condition-keyword-spacer"/>
                </v-col>
              </v-row>
              <v-row
                no-gutters
                class="conditionRow">
                <v-col
                  cols="12"
                  class="d-flex justify-start align-center">
                  <label
                    for="toggle-ElectronicJournal"
                    class="ElectronicJournal-condition-keyword-toggle-title">{{ $t("F32271.S008") }}</label>
                  <div
                    class="scrollNone ElectronicJournal-condition-keyword-toggle"
                    @keyup.space="keywordCaseSensitive = !keywordCaseSensitive">
                    <input
                      :id="'toggle-ElectronicJournal'"
                      class="toggleBtn toggleBtnRoundFlat"
                      type="checkbox"
                      :checked="keywordCaseSensitive"
                      @click="keywordCaseSensitive = !keywordCaseSensitive"
                    >
                    <label
                      :for="'toggle-ElectronicJournal'"
                      class="ElectronicJournal-condition-keyword-toggle-label"
                    ><span/></label>
                  </div>
                </v-col>
              </v-row>
            </v-col>
          <!-- G002.00.0 Update-End -->
          </template>
        </v-row>
      <!-- G002.00.0 Update-Start -->
      </div>
      <!-- G002.00.0 Update-End -->
    </common-dialog>
    <popup ref="pop" />
  </div>
</template>
