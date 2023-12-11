<style src="./../../static/css/MasterCommon/masterCommon.css"></style>
<style src="./../../static/css/ProductDivMaster/productDivMaster.css"></style>
<script type="text/javascript" src="./../../static/js/ProductDivMaster/productDivMaster.js"></script>

<!--
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
-->

<template>
  <v-container style="margin-left:15%;width:800px;margin-top:60px;" class="baseFont">
    <!-- １）店舗選択エリア -->
    <div class="selectStoreContentStyle" style="margin-left:85px">
      <label style="border-bottom: 1px solid #fff;"><p>{{ $t("F00203.S001")}}</p></label>
      <span class ="storeSelectSpan">
        <input type="text" class="storeNameText" ref="targetStoreText" v-model="targetStoreText" :disabled="true"/>
        <div class="buttomLabel">
          <v-btn tabindex="1" style="width: 28px; height: 40px;" id="storeSelectBtn" @click="storeSelect" :disabled="operationLock">
            <span class="rightArrow2" />
          </v-btn>
        </div>
      </span>
    </div>
    <!-- 余白 -->
    <v-row style="height: 30px"><v-col><v-spacer/></v-col></v-row>
    <!-- ２）商品分類階層設定エリア -->
    <v-row style="height: 30px;width: 900px;">
      <v-col :cols="1" style="padding: 0px;">
        <label id="ListHeader">{{ $t("F00203.S002") }}</label>
      </v-col>
      <v-col :cols="3" style="padding: 0px;">
        <label id="ListSplitHeader">{{ $t("F00203.S003") }}</label>
      </v-col>
      <v-col :cols="5" style="padding: 0px;">
        <label id="ListSplitHeader">{{ $t("F00203.S004") }}</label>
      </v-col>
      <v-col :cols="1" style="padding: 0px;">
        <label id="ListSplitHeader">{{ $t("F00203.S005") }}</label>
      </v-col>
      <v-col :cols="2" style="padding: 0px;">
        <label id="ListSplitHeader">{{ $t("F00203.S006") }}</label>
      </v-col>
    </v-row>
    <!-- ２－６）商品分類階層情報一覧 -->
    <v-row v-if="operationLock === false" v-for="(divisionItem,index) in dispDataList" :key="divisionItem.productClassificationNumber" style="height: 50px;width: 900px;">
      <v-col :cols="1" style="padding: 0px;">
        <label class="ListElement" :id ="'No'+index"><font style="margin-left:30px">{{divisionItem.productClassificationNumber}}</font></label>
      </v-col>
      <v-col :cols="3" style="padding: 0px;">
        <div class="ListSplitElement" style="border-left:1px solid #9ea0aa;">
          <label :class="useErrorMsg[index] !== '' ? 'errorUsedflg' : 'labelUsedflg'"><input type="radio" class="editUsedflg" :value="index" ref="rowTop" v-model="topIndex" :tabindex="(index*4)+2" v-on:keydown.tab="onKeyTabAtUsedflg"/></label>
        </div>
      </v-col>
      <v-col :cols="5" style="padding: 0px;">
        <div class="ListSplitElement" style="border-left:1px solid #9ea0aa;">
          <input type="text" :class="[nameErrorMsg[index] !== '' ? 'errorNameBox' : 'editNameBox', index < topIndex ? 'readOnly' : '']" ref="rowNam" v-model="divisionItem.productName" maxlength="32" :placeholder="placeholderProductName" :tabindex="(index*4)+3" :@input="inputLimit(index,32)" :disabled="index < topIndex" />
        </div>
      </v-col>
      <v-col :cols="1" style="padding: 0px;">
        <div class="ListSplitElement" style="border-left:1px solid #9ea0aa;">
          <input type="text" :class="[lengthErrorMsg[index] !== '' ? 'errorLengthBox' : 'editLengthBox', index < topIndex ? 'readOnly' : '']" ref="rowLen" maxlength="1" v-model.number="divisionItem.length" :tabindex="(index*4)+4" :disabled="index < topIndex" :@input="numInputRegulation(index)" />
        </div>
      </v-col>
      <v-col :cols="2" style="padding: 0px;">
        <div class="ListSplitElement" style="border-left:1px solid #9ea0aa;">
          <select v-model="divisionItem.registrationType" :class="[regTypeErrorMsg[index] !== '' ? 'errorRegTypeBox' : 'editRegTypeBox', index < topIndex ? 'readOnly' : '']" ref="rowReg" :tabindex="(index*4)+5" :disabled="index < topIndex" >
            <option v-for="registrationTypeItem in registrationTypeList" :key="registrationTypeItem.code" :value="registrationTypeItem.code">{{ registrationTypeItem.value }}</option>
          </select>
        </div>
      <div class="pulldownArrow"></div>
      </v-col>
    </v-row>
    <v-row style="width: 100%;">
      <v-col>
        <maint-button
          @close="closeTab"
          @fixed="fixedTab"
          :isfixedBtn="disabledFixedBtn"
        />
      </v-col>
    </v-row>
    <dialog-store-select ref="dialogStoreSelect" v-on:clickSubmit="storeSelectOk"/>
    <popup ref="pop" />
  </v-container>
</template>
