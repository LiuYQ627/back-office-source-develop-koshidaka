<!-- KSD V001.000 AS -->
<style src="./../../static/css/MasterCommon/masterCommon.css"></style>
<style src="@/resource/static/css/CommonDesign/utils.css"></style>
<script type="text/javascript" src="./../../static/js/FloorMasterSetting/floorMasterSetting.js"></script>
<style scope src="./../../static/css/FloorMasterSetting/floorMasterSetting.css"></style>
<template>
  <v-container style="width: 680px;margin-top:60px;" class="baseFont baseContainer">
    <div class="floorMasterSelectStoreContentStyle">
    <label style="border-bottom: 1px solid #fff; justify-content: right;"><p>{{ $t("F322b9.S001")}}</p></label>
      <span class ="floorMasterStoreSelectSpan">
        <input type="text" class="storeNameText" ref="targetStoreText" v-model="targetStoreText" :disabled="true"/>
        <div class="buttomLabel"><v-btn tabindex="0" style="width: 28px; height: 40px;" id="storeSelectBtn" @click="storeSelect" :disabled="headquartersAuthority != 1">
            <span class="rightArrow2" />
          </v-btn>
        </div>
      </span>
    </div>
    <v-row style="height: 30px"><v-col><v-spacer/></v-col></v-row>
    <v-row id="inputRow" align="center">
      <v-col :cols="4" style="padding: 0px;">
        <div class="inputLabel" v-html="$t('F322b9.S003')"/>
      </v-col>
      <v-col class="bkColorBlue">
        <div class="underLine2">
          <input type="text" class="inputText" v-model="businessUnitCdData" ref="directInputNoText" @keydown.enter="directInput" @input="businessUnitCdInput" :style="`ime-mode:disabled; ${operationLockStore ? 'cursor: not-allowed;' : ''}`" :placeholder="this.$i18n.t('F322b9.S018')" maxlength="2" :disabled="operationLockStore" tabindex="0"/>
        </div>
      </v-col>
    </v-row>
    <v-row style="height: 30px"><v-col><v-spacer/></v-col></v-row>
    <v-row id="inputRow" style="background-color: #ffffff;height: 86px;" align="center">
      <v-col :cols="4" align="start" align-content="center" style="padding: 0px;">
        <label class="inputLabel">{{ $t("F322b9.S004") }}</label>
        <div class="inline-radio">
          <div><input type="radio" name="searchData" id="searchCode" :disabled="operationLockStore" tabindex="-1" v-on:change="onRadioChange"><label @keydown.enter="enterCode" @keydown.space="enterCode" :tabindex="operationLock ? -1 : 0" class="scrollNone">{{ $t('F322b9.S005') }}</label></div>
          <div style="margin-left:10px"><input type="radio" name="searchData" id="searchName" checked :disabled="operationLockStore" tabindex="-1" v-on:change="onRadioChange"><label @keydown.enter="enterName" @keydown.space="enterName" :tabindex="operationLock ? -1 : 0" class="scrollNone" style="font-size: large;">{{ $t('F322b9.S006') }}</label></div>
        </div>
      </v-col>
      <v-col>
        <div class="underLine2">
          <input type="text" class="inputText" v-model="searchData" :style="`ime-mode:disabled; margin-top: 25px; ${operationLockStore ? 'cursor: not-allowed;' : ''}`" ref="searchText" :disabled="operationLockStore" tabindex="0"/>
        </div>
      </v-col>
    </v-row>
    <v-row style="height: 38px;width: 680px;margin-top:-8px">
      <v-col style="text-align: left;">
        <font class="baseFont" style="font-size:20px;margin-left:-12px"><b style="font-weight:normal;">{{ $t("F322b9.S007") }}{{resultCount}}{{ $t("F322b9.S008") }}</b>
        </font>
      </v-col>
    </v-row>
    <v-row style="height: 30px;width: 680px;">
      <v-col :cols="1" style="padding: 0px;">
        <label id="ListHeader">{{ $t('F322b9.S020') }}</label>
      </v-col>
      <v-col :cols="3" style="padding: 0px;">
        <label id="ListHeader">{{ $t("F322b9.S005") }}</label>
      </v-col>
      <v-col :cols="7" style="padding: 0px;">
        <label id="ListSplitHeader">{{ $t("F322b9.S006") }}</label>
      </v-col>
      <v-col :cols="1" style="padding: 0px;">
        <label id="ListSplitHeader"><font style="margin-left:-21px">{{ $t('F322b9.S021') }}</font></label>
      </v-col>
    </v-row>
    <v-row v-if="operationLock === false" v-for="(floorItem,index) in dispFloorDataList" :key="floorItem.IndexNo" style="height: 50px;width: 680px;">
      <v-col :cols="1" style="padding: 0px; display:inline-block;">
        <label class="ListElement" :id ="index" style="justify-content: center;"><font class="NumericStyle">{{floorItem.indexNo}}</font></label>
      </v-col>
      <v-col :cols="3" style="padding: 0px;">
        <label class="ListElement" style="justify-content: end;" :id ="index"><font class="NumericStyle" style="margin-right:10px">{{floorItem.floorNo}}</font></label>
      </v-col>
      <v-col :cols="7" style="padding: 0px;">
        <label class="ListSplitElement" style="border-left:1px solid #9ea0aa;" :id ="'name'+index"><font class="NameClass" v-if="floorItem.floorName">{{floorItem.floorName}}</font></label>
      </v-col>
      <v-col :cols="1" style="padding: 0px;" @click="selectedIndex(floorItem.indexNo)" @keydown.enter="selectedIndex(floorItem.indexNo)" @keydown.space="selectedIndex(floorItem.indexNo)">
        <label class="ListSplitElement" style="border-right:1px solid #9ea0aa;" :id ="'edit'+index"><img style="width: 45px; height: 45px;" src="@/assets/ico_edit@2x.png" @keydown.enter="selectedIndex(floorItem.indexNo)" @keydown.space="selectedIndex(floorItem.indexNo)" alt="" tabindex="0" class="scrollNone"/></label>
      </v-col>

    </v-row>
    <v-row style="width: 100%;">
      <v-col>
        <maint-button @close="closeTab" />
      </v-col>
    </v-row>
    <edit-dialog ref="editDialog" v-on:clickSubmit="dialogConfirm()"/>
    <dialog-store-select ref="dialogStoreSelect" v-on:clickSubmit="storeSelectOk"/>
    <popup ref="pop"/>
  </v-container>
</template>
<!-- KSD V001.000 AE -->
