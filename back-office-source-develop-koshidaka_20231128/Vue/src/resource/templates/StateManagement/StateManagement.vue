<style src="./../../static/css/MasterCommon/masterCommon.css"></style>
<style src="./../../static/css/StateManagement/stateManagement.css"></style>
<script type="text/javascript" src="./../../static/js/StateManagement/stateManagement.js"></script>

<!--
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230103  litie(Neusoft)    G001.00.0  issue課題#1014を対応します.
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
      <label style="border-bottom: 1px solid #fff;"><p>{{ $t("F00107.S001") }}</p></label>
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
    <v-row style="height: 30px"><v-col><v-spacer/></v-col></v-row>
    <!--
    <div class="selectDateContentStyle" v-if="headquartersAuthority == 1">
      <label style="border-bottom: 1px solid #fff;"><p>{{ $t("F00107.S002")}}</p></label>
      <span class ="dateSelectSpan">
      <div class="selectPeriodContentStyle">
        <table class="periodSelectStyle">
          <tr>
            <td id="startDateInput" class="textCellStyle">
              <table>
                <tr>
                  <td>
                    -- カレンダー表示用のflatPickr(開始・終了で共有) --
                    <flat-pickr tabindex="-1" :config="config" ref="flatPickr" v-model="calenderDate"/>
                  </td>
                  <td>
                    !-- step0では対象日付は非活性とする --
                    !-- ユーザ入力用期間（開始）input --
                    <input type="text"
                    class="startDateInputStyle"
                    id="inputStartDay"
                    style="ime-mode:disabled;"
                    :placeholder="this.$i18n.t('F00107.S003')"
                    v-model="startDateStr"
                    single-line
                    dense
                    @focus="borderFocus(0)"
                    @blur="startDateFormatCheck(),borderBlur(0)"
                    @keydown.enter="startDateFormatCheck()"
                    tabindex=3
                    maxlength=10
                    autocomplete="off" disabled="disabled"/>
                  </td>
                  <td>
                      <a tabindex=-4 id="startCalenderTd" @keydown.enter="showCalender(0)" @keydown.space="showCalender(0)"
                        @focus="changeImg('startCalender'),borderFocus(0)" @blur="returnImg('startCalender'),borderBlur(0)" style="pointer-events: none">
                        <img id="startCalender" v-bind:src="startCalenderImgScr"
                        @click="showCalender(0)"
                        @mouseover="changeImg('startCalender')"
                        @mouseleave="returnImg('startCalender')"
                        height="25" width="30" disabled="disabled"/>
                      </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
      </span>
    </div>
        -->
    <!-- (4)一覧エリア -->
    <v-row style="height: 38px;width: 680px;margin-top:-8px">
      <v-col style="text-align: left;">
        <font
          class="baseFont"
          style="font-size:20px;margin-left:-12px"><b style="font-weight:normal;">{{ $t("F00107.S004") }}{{ resultCount }}{{ $t("F00107.S005") }}</b></font>
      </v-col>
    </v-row>
    <v-row style="height: 30px;width: 800px;margin-left:-50px">
      <v-col
        :cols="3"
        style="padding: 0px;">
        <label id="ListHeader">{{ $t("F00107.S006") }}</label>
      </v-col>
      <v-col
        :cols="4"
        style="padding: 0px;">
        <label id="ListHeader">{{ $t("F00107.S007") }}</label>
      </v-col>
      <v-col
        :cols="2"
        style="padding: 0px;">
        <label id="ListHeader">{{ $t("F00107.S008") }}</label>
      </v-col>
      <v-col
        :cols="3"
        style="padding: 0px;">
        <label id="ListHeader">{{ $t("F00107.S009") }}</label>
      </v-col>
    </v-row>
    <v-row
      v-if="operationLock === false"
      v-for="(terminalItem,index) in dispDataList"
      :key="terminalItem.endpointStatus.name"
      style="height: 50px;width: 800px;margin-left:-50px">
      <v-col
        :cols="3"
        style="padding: 0px;">
        <label
          class="ListElement"
          :id ="'code'+index"><font style="margin-left:10px">{{ targetStoreCd.slice(-6) }}</font></label>
      </v-col>
      <v-col
        :cols="4"
        style="padding: 0px;">
        <label
          class="ListSplitElement"
          style="border-left:1px solid #9ea0aa;"
          :id ="'name'+index"><font class="NameClass">{{ targetStoreText }}</font></label>
      </v-col>
      <v-col
        :cols="2"
        style="padding: 0px;">
        <label
          class="ListSplitElement"
          style="border-left:1px solid #9ea0aa;"
          :id ="'satatus'+index"><font
            class="NameClass"
            v-if="terminalItem.deviceRecord">{{ terminalItem.deviceRecord.endpointId }}</font></label>
      </v-col>
      <v-col
        :cols="3"
        style="padding: 0px;">
        <label
          class="ListSplitElement"
          style="border-left:1px solid #9ea0aa;"
          :id ="'satatus'+index"><font class="StatusClass">{{ terminalItem.endpointStatus.status }}</font></label>
      </v-col>
    </v-row>
    <v-row style="width: 100%;">
      <v-col>
        <maint-button @close="closeTab" />
      </v-col>
    </v-row>
    <dialog-store-select
      ref="dialogStoreSelect"
      @clickSubmit="storeSelectOk"/>
    <popup ref="pop"/>
  </v-container>
</template>
