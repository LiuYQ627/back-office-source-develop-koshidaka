<!-- KSD V001.000 AS -->
<style src="@/resource/static/css/MasterCommon/masterCommon.css"></style>
<style scoped src="@/resource/static/css/DenominationSetting/denominationSetting.css"></style>
<script type="text/javascript" src="@/resource/static/js/DenominationSetting/denominationSetting.js"></script>

<template>
  <v-container
    id="denomination-setting-container"
    class="baseFont baseContainer">
    <div class="select-store-content-style">
      <label id="store-select-text"><p>{{ $t("F322b6.S001") }}</p></label>
      <span class="store-select-span">
        <input
          type="text"
          class="storeNameText"
          ref="targetStoreText"
          v-model="targetStoreText"
          :disabled="true">
        <div class="button-label">
          <v-btn
            tabindex="0"
            id="store-select-button"
            @click="storeSelect"
            :disabled="headquartersAuthority != 1 || this.operationLock">
            <span class="right-arrow-2" />
          </v-btn>
        </div>
      </span>
    </div>
    <!-- 余白 -->
    <v-row id="margin-area"><v-col><v-spacer /></v-col></v-row>
    <!-- (2)コード新規/ダイレクト編集エリア -->
    <v-row
      id="inputRow"
      align="center">
      <v-col
        :cols="4"
        align="start"
        class="pa-0">
        <div
          class="inputLabel"
          v-html="$t('F322b6.S002')" />
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
            id="client-id-text"
            :placeholder="this.$i18n.t('F322b6.S045')"
            maxlength="4"
            :disabled="operationLockStore"
            tabindex="0">
        </div>
      </v-col>
    </v-row>
    <!-- 余白 -->
    <v-row id="margin-area"><v-col><v-spacer /></v-col></v-row>
    <!-- (3)フィルタリング条件入力エリア -->
    <v-row
      id="inputRow"
      class="filter-group"
      align="center">
      <v-col
        :cols="4"
        align="start"
        align-content="center"
        class="pa-0">
        <label class="inputLabel">{{ $t("F322b6.S003") }}</label>
        <div class="inline-radio">
          <div>
            <input
              type="radio"
              name="searchData"
              id="searchCode"
              ref="searchCode"
              :disabled="operationLock"
              tabindex="-1"
              @change="onRadioChange">
            <label
              @keydown.enter="enterCode"
              @keydown.space="enterCode"
              :tabindex="operationLock ? -1 : 0"
              class="scrollNone"
            >{{ $t("F322b6.S004") }}</label>
          </div>
          <div id="margin-area-left">
            <input
              type="radio"
              name="searchData"
              id="searchName"
              ref="searchName"
              :disabled="operationLock"
              checked
              tabindex="-1"
              @change="onRadioChange">
            <label
              @keydown.enter="enterName"
              @keydown.space="enterName"
              :tabindex="operationLock ? -1 : 0"
              class="scrollNone"
            >{{ $t("F322b6.S005") }}</label>
          </div>
        </div>
      </v-col>
      <v-col>
        <div class="underLine2">
          <input
            type="text"
            class="inputText"
            v-model="searchData"
            id="filter-text"
            ref="searchText"
            :disabled="operationLock"
            tabindex="0">
        </div>
      </v-col>
    </v-row>
    <!-- (4)ユーザ一覧エリア -->
    <v-row id="denomination-setting-header-row">
      <v-col>
        <p
          class="baseFont"
          id="list-total"><b id="denomination-setting-header-row-count">{{ $t("F322b6.S006") }}{{ resultCount }}{{ $t("F322b6.S007") }}</b></p>
      </v-col>
    </v-row>
    <v-row id="list-header-size">
      <v-col
        :cols="4"
        class="pa-0">
        <label id="ListHeader">{{ $t("F322b6.S008") }}</label>
      </v-col>
      <v-col
        :cols="7"
        class="pa-0">
        <label id="ListSplitHeader">{{ $t("F322b6.S009") }}</label>
      </v-col>
      <v-col
        :cols="1"
        class="pa-0">
        <label id="ListSplitHeader"><p id="denomination-setting-header-edit">{{ $t("F322b6.S010") }}</p></label>
      </v-col>
    </v-row>
    <v-row
      :v-if="operationLock === false"
      v-for="(denominationItem, index) in dispDataList"
      :key="denominationItem.endpointId"
      id="denomination-setting-detail-row">
      <v-col
        :cols="4"
        class="pa-0">
        <label
          class="ListElement"
          :id="'code' + index">
          <p id="align-table-row">{{ denominationItem.endpointId }}</p>
        </label>
      </v-col>
      <v-col
        :cols="7"
        class="pa-0">
        <label
          class="ListSplitElement"
          :id="'name-column-details' + index">
          <p id="align-table-row">{{ denominationItem.deviceName }}</p>
        </label>
      </v-col>
      <v-col
        :cols="1"
        class="pa-0"
        @click="selectedListDate(index)">
        <label
          class="ListSplitElement"
          :id="'edit-column-details' + index"
        ><img
          id="edit-image"
          src="@/assets/ico_edit@2x.png"
          @keydown.enter="selectedListDate(index)"
          @keydown.space="selectedListDate(index)"
          alt=""
          tabindex="0"
          class="scrollNone"
        ></label>
      </v-col>
    </v-row>
    <v-row class="w-100">
      <v-col>
        <maint-button
          @close="closeTab"
          @copy="copyButton"
          :is-copy-btn="enableCopyButton"
        />
      </v-col>
    </v-row>
    <edit-dialog
      ref="editDialog"
      @clickSubmit="dialogConfirm()" />
    <copy-dialog
      ref="copyDialog"
      @clickSubmit="dialogConfirm()" />
    <dialog-store-select
      ref="dialogStoreSelect"
      @clickSubmit="storeSelectOk"
    />
    <popup ref="pop" />
  </v-container>
</template>
<!-- KSD V001.000 AE -->
