<!-- KSD V001.000 AS -->
<style src="./../../static/css/MasterCommon/masterCommon.css"></style>
<style scope src="./../../static/css/DayOfTheWeekClassificationSetting/dayOfTheWeekClassificationSetting.css"></style>
<script type="text/javascript" src="./../../static/js/DayOfTheWeekClassificationSetting/dayOfTheWeekClassificationSetting.js"></script>

<template>
  <v-container class="day-of-the-week-body-container day-of-the-week-container">
    <div class="dayOfTheWeekselectStoreContentStyle">
    <label style="border-bottom: 1px solid #fff;"><p>{{ $t("C00214.S001")}}</p></label>
      <span class ="dayOfTheWeekstoreSelectSpan"><input type="text" class="storeNameText" ref="targetStoreText" v-model="targetStoreText" :disabled="true"/>
        <div class="buttomLabel"><v-btn tabindex="0" style="width: 28px; height: 40px;" id="storeSelectBtn" @click="storeSelect" :disabled="headquartersAuthority != 1">
            <span class="rightArrow2" />
          </v-btn>
        </div>
      </span>
    </div>
    <!-- KSD V001.000 DS FDR課題No.57 件数表示（全XX件）は不要 -->
    <!-- <v-row class="day-of-week-class-result-count-row"> -->
    <!--   <v-col style="text-align: left;"> -->
    <!--     <font class="baseFont" style="font-size:20px;margin-left:-12px"><b style="font-weight:normal;">{{ $t("C00214.S015") }}{{resultCount}}{{ $t("C00214.S016") }}</b> -->
    <!--     </font> -->
    <!--   </v-col> -->
    <!-- </v-row> -->
    <!-- KSD V001.000 DE FDR課題No.57 件数表示（全XX件）は不要 -->
    <!-- KSD V001.000 AS FDR課題No.57 件数表示（全XX件）は不要 -->
    <v-row style="height: 30px"
      ><v-col><v-spacer /></v-col
    ></v-row>
    <!-- KSD V001.000 AE FDR課題No.57 件数表示（全XX件）は不要 -->

    <v-row class="day-of-week-class-header-row">
      <v-col :cols="2" style="padding: 0px;">
        <label id="listHeader">{{ $t("C00214.S002") }}</label>
      </v-col>
      <v-col :cols="3" style="padding: 0px;">
        <label id="listHeader">{{ $t("C00214.S003") }}</label>
      </v-col>
      <v-col :cols="2" style="padding: 0px;">
        <label id="listHeader"><font>{{ $t("C00214.S004") }}</font></label>
      </v-col>
      <v-col :cols="3" style="padding: 0px;">
        <label id="ListSplitHeader" class="day-of-week-class-second-to-last-col-label" style="border-right: 0px;"><font>{{ $t("C00214.S005") }}</font></label>
      </v-col>
      <v-col :cols="1" style="padding: 0px;">
        <label id="ListSplitHeader" style=" width: 56px !important; border-right: none !important;"><font style="margin-left:-21px">{{ $t("C00214.S006") }}</font></label>
      </v-col>
    </v-row>
    <v-row v-for="(classItem, weekdayCode) in displayData" :key="classItem.weekdayCode" class="day-of-week-class-content-row">
      <v-col :cols="2" style="padding: 0px;">
        <label class="ListElement" :id="'code'+weekdayCode" ><font class="NumericStyle" style="margin-left:10px; margin: auto">{{classItem.weekdayCode}}</font></label>
      </v-col>
      <v-col :cols="3" style="padding: 0px;">
        <label class="listElement" :id="'weekday'+weekdayCode" style="border-left:1px solid #9ea0aa;" ><font class="NumericStyle ellipsis" style="margin-left:10px; vertical-align: super;"></font>{{classItem.weekdayName}}</font></label>
      </v-col>
      <v-col :cols="2" style="padding: 0px;" >
        <label class="listElement" :id="'weekdayShort'+weekdayCode" style="border-right:1px solid #9ea0aa;" ><font class="NumericStyle ellipsis" style="margin-left:10px; vertical-align: super;"></font>{{classItem.weekdayShortName}}</font></label>
      </v-col>
      <v-col :cols="3" class="day-of-week-class-second-to-last-vcol" style="padding: 0px;" >
        <label class="ListSplitElement day-of-week-class-second-to-last-col-label day-of-week-class-colored-label" :id="'backColor'+weekdayCode" style="border-left:1px solid #9ea0aa; border-right: none;" :style="{ color: classItem.textColorCode, backgroundColor: classItem.backColorCode}"><font class="NumericStyle ellipsis" style="margin-left:10px; vertical-align: super;">{{ classItem.weekdayName }}</font></label>
      </v-col>
      <v-col :cols="1" style="padding: 0px;" @keydown.enter="selectedColorSetting(classItem, weekdayCode)" @keydown.space="selectedColorSetting(classItem, weekdayCode)" @click="selectedColorSetting(classItem, weekdayCode)">
        <label class="ListSplitElement" :id ="'edit'+weekdayCode" style=" width: 56px !important; border-right:1px solid #9ea0aa; border-left: none;" ><img style="width: 45px; height: 45px;" src="@/assets/ico_edit@2x.png" alt="" tabindex="0" class="scrollNone" /></label>
      </v-col>
    </v-row>

    <!-- 右側 -->
    <v-row style="width: 100%">
        <v-col>
          <maint-button
            @close="closeTab"
          />
        </v-col>
      </v-row>
    <edit-dialog ref="editDialog" v-on:clickSubmit="dialogConfirm()"/>
    <dialog-store-select ref="dialogStoreSelect" v-on:clickSubmit="storeSelectOk"/>
    <popup ref="pop" />
  </v-container>
</template>
<!-- KSD V001.000 AE -->
