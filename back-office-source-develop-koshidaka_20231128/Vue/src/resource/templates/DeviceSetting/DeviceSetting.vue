<style src="./../../static/css/MasterCommon/masterCommon.css"></style>
<style src="./../../static/css/DeviceSetting/deviceSetting.css"></style>
<script type="text/javascript" src="./../../static/js/DeviceSetting/deviceSetting.js"></script>

<!--
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20221230  litie(Neusoft)    G001.00.0  issue課題#1014を対応します.
-->

<template>
  <v-container
    style="width: 680px;margin-top:60px;"
    class="baseFont baseContainer">
    <!-- (1)店舗選択エリア -->
    <!-- G001.00.0 Update-Start -->
    <!-- <div class="selectStoreContentStyle" v-if="headquartersAuthority == 1"> -->
    <div class="selectStoreContentStyle">
      <!-- G001.00.0 Update-End -->
      <label style="border-bottom: 1px solid #fff;"><p>{{ $t("F00013.S001") }}</p></label>
      <span class ="storeSelectSpan">
        <input
          type="text"
          class="storeNameText"
          ref="targetStoreText"
          v-model="targetStoreText"
          :disabled="true">
        <div class="buttomLabel">
          <!-- G001.00.0 Update-Start -->
          <!-- <v-btn tabindex="1" style="width: 28px; height: 40px;" id="storeSelectBtn" @click="storeSelect" :disabled="this.operationLock"> -->
          <v-btn
            tabindex="1"
            style="width: 28px; height: 40px;"
            id="storeSelectBtn"
            @click="storeSelect"
            :disabled="headquartersAuthority != 1 || this.operationLock">
            <!-- G001.00.0 Update-End -->
            <span class="rightArrow2" />
          </v-btn>
        </div>
      </span>
    </div>
    <!-- 余白 -->
    <!-- G001.00.0 Update-Start -->
    <!-- <v-row style="height: 30px" v-if="headquartersAuthority == 1"><v-col><v-spacer/></v-col></v-row> -->
    <v-row style="height: 30px"><v-col><v-spacer/></v-col></v-row>
    <!-- G001.00.0 Update-End -->
    <!-- (2)コード新規/ダイレクト編集エリア -->
    <v-row
      id="inputRow"
      align="center">
      <v-col
        :cols="4"
        align="start"
        style="padding: 0px;">
        <div
          class="inputLabel"
          v-html="$t('F00013.S002')"/>
      </v-col>
      <v-col class="bkColorBlue">
        <div class="underLine2">
          <input
            type="text"
            class="inputText"
            v-model="clientIdData"
            ref="clientIdText"
            @keydown.enter="directInput"
            @input="clientIdInput"
            style="ime-mode:disabled;"
            :placeholder="this.$i18n.t('F00013.S021')"
            maxlength="4"
            :disabled="operationLockStore"
            tabindex="2">
        </div>
      </v-col>
    </v-row>
    <!-- 余白 -->
    <v-row style="height: 30px"><v-col><v-spacer/></v-col></v-row>
    <!-- (3)フィルタリング条件入力エリア -->
    <v-row
      id="inputRow"
      style="background-color: #ffffff;height: 86px;"
      align="center">
      <v-col
        :cols="4"
        align="start"
        align-content="center"
        style="padding: 0px;">
        <label class="inputLabel">{{ $t("F00013.S003") }}</label>
        <div class="inline-radio">
          <div><input
            type="radio"
            name="searchData"
            id="searchCode"
            :disabled="operationLock"
            tabindex="-1"
            @change="onRadioChange"><label
              @keydown.enter="enterCode"
              @keydown.space="enterCode"
              :tabindex="operationLock ? -1 : 3"
              class="scrollNone">{{ $t("F00013.S004") }}</label></div>
          <div style="margin-left:10px"><input
            type="radio"
            name="searchData"
            id="searchName"
            :disabled="operationLock"
            checked
            tabindex="-1"
            @change="onRadioChange"><label
              @keydown.enter="enterName"
              @keydown.space="enterName"
              :tabindex="operationLock ? -1 : 4"
              class="scrollNone">{{ $t("F00013.S005") }}</label></div>
        </div>
      </v-col>
      <v-col>
        <div class="underLine2">
          <input
            type="text"
            class="inputText"
            v-model="searchData"
            style="ime-mode:disabled;margin-top: 25px;"
            ref="searchText"
            :disabled="operationLock"
            tabindex="5">
        </div>
      </v-col>
    </v-row>
    <!-- (4)ユーザ一覧エリア -->
    <v-row style="height: 38px;width: 680px;margin-top:-8px">
      <v-col style="text-align: left;">
        <font
          class="baseFont"
          style="font-size:20px;margin-left:-12px"><b style="font-weight:normal;">{{ $t("F00013.S006") }}{{ resultCount }}{{ $t("F00013.S007") }}</b></font>
      </v-col>
    </v-row>
    <v-row style="height: 30px;width: 680px;">
      <v-col
        :cols="4"
        style="padding: 0px;">
        <label id="ListHeader">{{ $t("F00013.S008") }}</label>
      </v-col>
      <v-col
        :cols="7"
        style="padding: 0px;">
        <label id="ListSplitHeader">{{ $t("F00013.S009") }}</label>
      </v-col>
      <v-col
        :cols="1"
        style="padding: 0px;">
        <label id="ListSplitHeader"><font style="margin-left:-21px">{{ $t("F00013.S010") }}</font></label>
      </v-col>
    </v-row>
    <v-row
      v-if="operationLock === false"
      v-for="(terminalItem,index) in dispDataList"
      :key="terminalItem.endpointId"
      style="height: 50px;width: 680px;">
      <v-col
        :cols="4"
        style="padding: 0px;">
        <label
          class="ListElement"
          :id ="'code'+index"><font style="margin-left:10px">{{ terminalItem.endpointId }}</font></label>
      </v-col>
      <v-col
        :cols="7"
        style="padding: 0px;">
        <label
          class="ListSplitElement"
          style="border-left:1px solid #9ea0aa;width: 397px"
          :id ="'name'+index"><font class="NameClass">{{ terminalItem.deviceName }}</font></label>
      </v-col>
      <v-col
        :cols="1"
        style="padding: 0px;"
        @click="selectedListDate(index)">
        <label
          class="ListSplitElement"
          style="border-right:1px solid #9ea0aa;"
          :id ="'edit'+index"><img
            style="width: 45px; height: 45px;"
            src="@/assets/ico_edit@2x.png"
            @keydown.enter="selectedListDate(index)"
            @keydown.space="selectedListDate(index)"
            alt=""
            tabindex="6"
            class="scrollNone"></label>
      </v-col>
    </v-row>
    <v-row style="width: 100%;">
      <v-col>
        <maint-button @close="closeTab" />
      </v-col>
    </v-row>
    <edit-dialog
      ref="editDialog"
      @clickSubmit="dialogConfirm()"/>
    <dialog-store-select
      ref="dialogStoreSelect"
      @clickSubmit="storeSelectOk"/>
    <popup ref="pop"/>
  </v-container>
</template>
