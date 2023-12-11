<style src="./../../static/css/MasterCommon/masterCommon.css"></style>
<script type="text/javascript" src="./../../static/js/UserMaster/userMaster.js"></script>
<template>
  <v-container
    style="width: 680px;margin-top:60px;"
    class="baseFont baseContainer">
    <!-- (1)コード新規/ダイレクト編集エリア -->
    <v-row
      id="inputRow"
      align="center">
      <v-col
        :cols="4"
        align="start"
        style="padding: 0px;">
        <div
          class="inputLabel"
          v-html="$t('F00001.S001')"/>
      </v-col>
      <v-col class="bkColorBlue">
        <div class="underLine2">
          <input
            type="text"
            class="inputText"
            v-model="userIdData"
            ref="userIdText"
            @keydown.enter="directInput"
            @input="userIdInput"
            style="ime-mode:disabled;"
            :placeholder="this.$i18n.t('F00001.S034')"
            maxlength="10"
            :disabled="operationLock"
            tabindex="1">
        </div>
      </v-col>
    </v-row>
    <!-- 余白 -->
    <v-row style="height: 30px"><v-col><v-spacer/></v-col></v-row>
    <!-- (2)フィルタリング条件入力エリア -->
    <v-row
      id="inputRow"
      style="background-color: #ffffff;height: 86px;"
      align="center">
      <v-col
        :cols="4"
        align="start"
        align-content="center"
        style="padding: 0px;">
        <label class="inputLabel">{{ $t("F00001.S003") }}</label>
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
              :tabindex="operationLock ? -1 : 2"
              class="scrollNone">{{ $t("F00001.S004") }}</label></div>
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
              :tabindex="operationLock ? -1 : 3"
              class="scrollNone">{{ $t("F00001.S005") }}</label></div>
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
            tabindex="4">
        </div>
      </v-col>
    </v-row>
    <!-- (3)ユーザ一覧エリア -->
    <v-row style="height: 38px;width: 680px;margin-top:-8px">
      <v-col style="text-align: left;">
        <font
          class="baseFont"
          style="font-size:20px;margin-left:-12px"><b style="font-weight:normal;">{{ $t("F00001.S006") }}{{ resultCount }}{{ $t("F00001.S007") }}</b></font>
      </v-col>
    </v-row>
    <v-row style="height: 30px;width: 680px;">
      <v-col
        :cols="4"
        style="padding: 0px;">
        <label id="ListHeader">{{ $t("F00001.S008") }}</label>
      </v-col>
      <v-col
        :cols="7"
        style="padding: 0px;">
        <label id="ListSplitHeader">{{ $t("F00001.S009") }}</label>
      </v-col>
      <v-col
        :cols="1"
        style="padding: 0px;">
        <label id="ListSplitHeader"><font style="margin-left:-21px">{{ $t("F00001.S010") }}</font></label>
      </v-col>
    </v-row>
    <v-row
      v-if="operationLock === false"
      v-for="(userItem,index) in dispUserDataList"
      :key="userItem.userRecord.username"
      style="height: 50px;width: 680px;">
      <v-col
        :cols="4"
        style="padding: 0px;">
        <label
          class="ListElement"
          :id ="'code'+index"><font style="margin-left:10px">{{ userItem.userRecord.displayCode }}</font></label>
      </v-col>
      <v-col
        :cols="7"
        style="padding: 0px;">
        <label
          class="ListSplitElement"
          style="border-left:1px solid #9ea0aa;width: 397px"
          :id ="'name'+index"><font class="NameClass">{{ userItem.userRecord.firstName }}</font></label>
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
            tabindex="5"
            class="scrollNone"></label>
      </v-col>
    </v-row>
    <v-row style="width: 100%;">
      <v-col>
        <maint-button
          @pwLock="openPwLock"
          @close="closeTab"
          :is-button-pw-lock="disablePwLockBtn || !this.permissions.includes('CLOUDPOS_USER_OTHER_1')" />
      </v-col>
    </v-row>
    <base-dialog
      ref="baseDialog"
      @clickSubmit="dialogConfirm()"/>
    <edit-dialog
      ref="editDialog"
      @clickSubmit="dialogConfirm()"/>
    <dialog-store-select ref="dialogStoreSelect"/>
    <popup ref="pop"/>
  </v-container>
</template>
