<style src="./../../static/css/MasterCommon/masterCommon.css"></style>
<style src="./../../static/css/ProductGroupMaster/productGroupMaster.css"></style>
<script type="text/javascript" src="./../../static/js/ProductGroupMaster/productGroupMaster.js"></script>

<!--
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
-->

<template>
  <v-container style="width: 680px;margin-top:60px;" class="baseFont baseContainer">
    <!-- １）店舗選択エリア -->
    <div class="selectStoreContentStyle">
      <label style="border-bottom: 1px solid #fff;"><p>{{ $t("F00204.S001")}}</p></label>
      <span class ="storeSelectSpan">
        <input type="text" class="storeNameText" ref="targetStoreText" v-model="targetStoreText" :disabled="true"/>
        <div class="buttomLabel">
          <v-btn tabindex="1" style="width: 28px; height: 40px;" id="storeSelectBtn" @click="storeSelect" :disabled="headquartersAuthority != 1">
            <span class="rightArrow2" />
          </v-btn>
        </div>
      </span>
    </div>
    <!-- 余白 -->
    <v-row style="height: 30px"><v-col><v-spacer/></v-col></v-row>
    <!-- ２）商品区分選択エリア -->
    <v-row style="width: 680px">
      <v-col class="authTitleStyle">{{ $t("F00204.S002")}}</v-col>
      <v-col class="authContentStyle" style="border: 1px solid #9ea0aa; background: #fff" >
        <select v-model="productClassificationNumber" class="SelectBox" style="color:#000000" @change="divisionSelect" :disabled="operationLockStore" tabindex="2" >
          <option v-for="divisionItem in dispDivisionList" :key="divisionItem.productClassificationNumber" :value="divisionItem.productClassificationNumber">{{ divisionItem.productName }}</option>
        </select>
        <div class="pulldownArrow"></div>
      </v-col>
    </v-row>
    <!-- 余白 -->
    <v-row style="height: 30px"><v-col><v-spacer/></v-col></v-row>
    <!-- ３）コード新規/ダイレクト編集エリア -->
    <v-row id="inputRow" align="center">
      <v-col :cols="4" align="start" style="padding: 0px;">
          <div class="inputLabel" v-html="$t('F00204.S003')"/>
      </v-col>
      <v-col class="bkColorBlue">
        <div class="underLine2">
          <input type="text" class="inputText" v-model="productIdData" ref="productIdText" @keydown.enter="directInput" @input="productIdInput" style="ime-mode:disabled;" :placeholder="this.$i18n.t('F00204.S053')" maxlength="6" :disabled="operationLockDivision" tabindex="3" />
        </div>
      </v-col>
    </v-row>
    <!-- 余白 -->
    <v-row style="height: 30px"><v-col><v-spacer/></v-col></v-row>
    <!-- ４）マスタ検索条件入力エリア -->
    <v-row id="inputRow" style="background-color: #ffffff;height: 86px;" align="center">
      <v-col :cols="4" align="start" align-content="center" style="padding: 0px;">
        <label class="inputLabel">{{ $t("F00204.S004") }}</label>
        <div class="inline-radio">
          <div>
            <input type="radio" name="searchData" id="searchCode" :disabled="operationLock" tabindex="-1" v-on:change="onRadioChange"/>
            <label @keydown.enter="enterCode" @keydown.space="enterCode" :tabindex="operationLock ? -1 : 4" class="scrollNone">{{ $t("F00204.S005") }}</label>
          </div>
          <div style="margin-left:10px">
            <input type="radio" name="searchData" id="searchName" :disabled="operationLock" checked tabindex="-1" v-on:change="onRadioChange"/>
            <label @keydown.enter="enterName" @keydown.space="enterName" :tabindex="operationLock ? -1 : 5" class="scrollNone">{{ $t("F00204.S006") }}</label>
          </div>
        </div>
      </v-col>
      <v-col>
        <div class="underLine2">
          <!-- KSD V001.000 DS -->
          <!-- <input type="text" class="inputText" v-model="searchData" @keydown.enter="searchDataEnter"  style="ime-mode:disabled;margin-top: 25px;" ref="searchText" :disabled="operationLockDivision" tabindex="6" /> -->
          <!-- KSD V001.000 DE -->
          <!-- KSD V001.000 AS -->
          <input type="text" class="inputText" v-model="searchData" @keydown.enter="searchDataEnter" @input="filterSearchCode" style="ime-mode:disabled;margin-top: 25px;" ref="searchText" :disabled="operationLockDivision" tabindex="6" />
          <!-- KSD V001.000 AE -->
        </div>
      </v-col>
    </v-row>
    <!-- ５）商品構成一覧エリア -->
    <v-row style="height: 38px;width: 680px;margin-top:-8px">
      <v-col style="text-align: left;">
        <font class="baseFont" style="font-size:20px;margin-left:-12px"><b style="font-weight:normal;">{{resultCount}}{{ $t("F00204.S007") }}</b> 
        </font>
      </v-col>
    </v-row>
    <v-row style="height: 30px;width: 680px;">
      <v-col :cols="4" style="padding: 0px;">
        <label id="ListHeader">{{ $t("F00204.S008") }}</label>
      </v-col>
      <v-col :cols="7" style="padding: 0px;">
        <label id="ListSplitHeader">{{ $t("F00204.S009") }}</label>
      </v-col>
      <v-col :cols="1" style="padding: 0px;">
        <label id="ListSplitHeader"><font style="margin-left:-21px">{{ $t("F00204.S010") }}</font></label>
      </v-col>
    </v-row>
    <!-- ５－５）商品構成マスタ一覧 -->
    <v-row v-if="operationLock === false" v-for="(productGroupItem,index) in dispDataList" :key="productGroupItem.productId" style="height: 50px;width: 680px;">
      <v-col :cols="4" style="padding: 0px;">
        <label class="ListElement" :id ="'code'+index"><font style="margin-left:10px">{{productGroupItem.productId}}</font></label>
      </v-col>
      <v-col :cols="7" style="padding: 0px;">
        <label class="ListSplitElement" style="border-left:1px solid #9ea0aa;width: 397px" :id ="'name'+index"><font class="NameClass" v-if="productGroupItem.displayName">{{productGroupItem.displayName.kanji}}</font></label>
      </v-col>
      <v-col :cols="1" style="padding: 0px;" @click="selectedListData(index)">
        <label class="ListSplitElement" style="border-right:1px solid #9ea0aa;" :id ="'edit'+index"><img style="width: 45px; height: 45px;" src="@/assets/ico_edit@2x.png" @keydown.enter="selectedListData(index)" @keydown.space="selectedListData(index)" alt="" tabindex="7" class="scrollNone"/></label>
      </v-col>
    </v-row>
    <v-row style="width: 100%;">
      <v-col>
        <!-- KSD V001.000 DS -->
        <!-- <maint-button -->
        <!--   @close="closeTab" -->
        <!--   @prev="prev" -->
        <!--   @next="next" -->
        <!--   :isPrevBtn="disabledPrevBtn" -->
        <!--   :isNextBtn="disabledNextBtn" -->
        <!-- /> -->
        <!-- KSD V001.000 DE -->
        <!-- KSD V001.000 AS -->
        <maint-button
          @close="closeTab"
          @prev="prev"
          @next="next"
          @csvInput="csvInput"
          @csvOutput="csvOutput"
          :isPrevBtn="disabledPrevBtn"
          :isNextBtn="disabledNextBtn"
          :iscsv-input-btn="disabledCsvInputBtn"
          :iscsv-output-btn="disabledCsvOutputBtn"
        />
        <!-- KSD V001.000 AE -->
      </v-col>
    </v-row>
    <!-- KSD V001.000 AS -->
    <input
      id="csvInputFileSelect"
      style="display: none"
      ref="csvInputFileSelect"
      type="file"
      accept=".csv"
      @change="selectedInputFile()"
    >
    <csv-dialog
      ref="csvDialog"
      @clickSubmit="dialogConfirm()"
      @changeName="changeName"
      :dialogType="'productGroupMaster'"
      hasclassificationNumber />
    <classification-number-csv-dialog
      ref="classificationNumberCsvDialog"
      :dialogType="'productGroupMaster'"
    />
    <!-- KSD V001.000 AE -->
    <edit-dialog ref="editDialog" v-on:clickSubmit="dialogConfirm()"/>
    <dialog-store-select ref="dialogStoreSelect" v-on:clickSubmit="storeSelectOk"/>
    <popup ref="pop"/>
  </v-container>
</template>
