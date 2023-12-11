<style src="@/resource/static/css/MasterCommon/masterCommon.css"></style>
<style src="@/resource/static/css/EmployeeCodePrint/employeeCodePrint.css"></style>
<script type="text/javascript" src="@/resource/static/js/EmployeeCodePrint/employeeCodePrint.js"></script>
<template>
  <v-container
    style="width: 680px;margin-top:60px;"
    class="baseFont baseContainer">
    <!-- (1)店舗選択エリア -->
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
          <v-btn
            tabindex="1"
            style="width: 28px; height: 40px;"
            id="storeSelectBtn"
            @click="storeSelect"
            :disabled="headquartersAuthority != 1 || this.operationLock">
            <span class="rightArrow2" />
          </v-btn>
        </div>
      </span>
    </div>
    <!-- 余白 -->
    <v-row style="height: 30px"><v-col><v-spacer/></v-col></v-row>
    <!-- (2)フィルタリング条件入力エリア -->
    <v-row
      id="inputRow"
      style="background-color: #ffffff;height: 86px; width: 1000px; margin-left: -170px"
      align="center">
      <v-col
        :cols="4"
        align="start"
        align-content="center"
        style="padding: 0px;">
        <label class="inputLabel">{{ $t("C00227.S002") }}</label>
        <div class="employee-inline-radio">
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
              class="scrollNone">{{ $t("C00227.S003") }}</label></div>
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
              class="scrollNone">{{ $t("C00227.S004") }}</label></div>
        </div>
      </v-col>
      <v-col>
        <div class="employee-underLine2">
          <input
            type="text"
            class="employee-inputText"
            v-model="searchData"
            style="ime-mode:disabled;margin-top: 25px;"
            ref="searchText"
            :disabled="operationLock"
            tabindex="4">
        </div>
      </v-col>
    </v-row>
    <!-- 余白 -->
    <v-row style="height: 30px"><v-col><v-spacer/></v-col></v-row>
    <!-- (3)ユーザ一覧エリア -->
    <div style="width: 1000px; margin-left: -160px">
      <v-row
        style="width: 100%;">
        <v-col
          :cols="1"
          style="padding: 0px;">
          <label class="ListHeader">{{ $t("C00227.S005") }}</label>
        </v-col>
        <v-col
          :cols="2"
          style="padding: 0px;">
          <label class="ListHeader">{{ $t("C00227.S006") }}</label>
        </v-col>
        <v-col
          :cols="3"
          style="padding: 0px;">
          <label class="ListHeader">{{ $t("C00227.S007") }}</label>
        </v-col>
        <v-col
          :cols="2"
          style="padding: 0px;">
          <label class="ListHeader">{{ $t("C00227.S008") }}</label>
        </v-col>
        <v-col
          :cols="2"
          style="padding: 0px;">
          <label class="ListHeader">{{ $t("C00227.S009") }}</label>
        </v-col>
        <v-col
          :cols="2"
          style="padding: 0px;">
          <label class="ListHeader">{{ $t("C00227.S010") }}</label>
        </v-col>
      </v-row>
      <v-row
        v-for="(row, index) in dispUserDataList"
        :key="`${row.userNumber}${index}`"
        style="width: 100%;">
        <v-col
          :cols="1"
          style="padding: 0px;">
          <label class="CenterListElement">{{ index + 1 }}</label>
        </v-col>
        <v-col
          :cols="2"
          style="padding: 0px;">
          <label class="ListElement">{{ row.userNumber }}</label>
        </v-col>
        <v-col
          :cols="3"
          style="padding: 0px;">
          <label class="ListElement">{{ row.userName }}</label>
        </v-col>
        <v-col
          :cols="2"
          style="padding: 0px;">
          <label class="CenterListElement">{{ $t("C00227.S011") }}</label>
        </v-col>
        <v-col
          :cols="2"
          style="padding: 0px;">
          <label class="CenterListElement">{{ $t("C00227.S011") }}</label>
        </v-col>
        <v-col
          :cols="2"
          style="padding: 0px;">
          <span
            class="CenterListElement"
            style="text-align: center;">
            <v-btn
              class="checkBox"
              :checked="employeeSelected[index]"
              @click="toggleSelected(index)"
            />
          </span>
        </v-col>
      </v-row>
    </div>
    <v-row style="width: 100%;">
      <v-col>
        <maint-button
          @close="closeTab"
          @printPdf="printPdf"
          :isprint-pdf-btn="disabledPrintPdfBtn"
        />
      </v-col>
    </v-row>
    <dialog-store-select
      ref="dialogStoreSelect"
      @clickSubmit="storeSelectOk"/>
    <popup ref="pop"/>
  </v-container>
</template>
