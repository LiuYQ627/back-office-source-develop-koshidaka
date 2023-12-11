<!-- KSD V001.000 AS -->
<style src="./../../static/css/MasterCommon/masterCommon.css"></style>
<style src="./../../static/css/MemberRankSetting/MemberMaster.css"></style>
<script
  type="text/javascript"
  src="./../../static/js/MemberRankSetting/MemberRankSetting.js"
></script>
<template>
  <v-container
    style="width: 680px;margin-top:60px;"
    class="baseFont baseContainer"
  >
    <!-- KSD V001.000 DS FDR課題No.59 件数表示（全XX件）は不要 -->
    <!-- <v-row class="member-rank-row"> -->
    <!--   <v-col style="text-align: left;"> -->
    <!--     <font class="baseFont" style="font-size:20px;margin-left:-12px" -->
    <!--       ><b style="font-weight:normal;" -->
    <!--         >{{ $t("C00213.S011") }}{{ resultCount }}{{ $t("C00213.S012") }}</b -->
    <!--       ></font -->
    <!--     > -->
    <!--   </v-col> -->
    <!-- </v-row> -->
    <!-- KSD V001.000 DE FDR課題No.59 件数表示（全XX件）は不要 -->
    <v-row style="height: 30px;width: 680px;">
      <v-col :cols="1" style="padding: 0px;">
        <label id="ListHeader">{{ $t("C00213.S001") }}</label>
      </v-col>
      <v-col :cols="3" style="padding: 0px;">
        <label id="ListHeader">{{ $t("C00213.S002") }}</label>
      </v-col>
      <v-col :cols="4" style="padding: 0px;">
        <label id="ListHeader">{{ $t("C00213.S003") }}</label>
      </v-col>
      <v-col :cols="3" style="padding: 0px;">
        <label id="ListSplitHeader">{{ $t("C00213.S004") }}</label>
      </v-col>
      <v-col :cols="1" style="padding: 0px;">
        <label id="ListSplitHeader">
          <font style="margin-left:-21px">{{ $t("C00213.S005") }}</font>
        </label>
      </v-col>
    </v-row>
    <v-row
      v-if="operationLock === false"
      v-for="(memberItem, index) in displayData"
      :key="memberItem.name"
      style="min-height: 50px;width: 680px;"
    >
      <v-col :cols="1" style="padding: 0px;">
        <label class="CenterListElement" :id="'code' + index">
          <font class="NumericStyle" style="margin-left:10px;">{{
            memberItem.indexNo
          }}</font>
        </label>
      </v-col>
      <v-col :cols="3" style="padding: 0px;">
        <label class="RightListElement" :id="'code' + index">
          <font class="NumericStyle" style="margin-left:10px">{{
            memberItem.memberRankNo
          }}</font>
        </label>
      </v-col>
      <v-col :cols="4" style="padding: 0px;">
        <label class="ListElement" :id="'code' + index">
          <font class="NameClass" style="margin-left:10px">{{
            memberItem.memberRankName
          }}</font>
        </label>
      </v-col>
      <v-col :cols="3"
        style="padding: 0px;border-left: 1px solid #9ea0aa;"
      >
        <label class="ListSplitElement" :id="'code' + index">
          <font
            class="NumericStyle"
            style="margin-left:auto;margin-right: 15px;"
            >{{ memberItem.ticketNo }}</font
          >
        </label>
      </v-col>
      <v-col :cols="1" style="padding: 0px;" @click="selectedListDate(memberItem)">
        <label
          class="ListSplitElement"
          style="border-right:1px solid #9ea0aa;"
          :id="'edit' + index"
          ><img
            style="width: 45px; height: 45px;"
            src="@/assets/ico_edit@2x.png"
            @keydown.enter="selectedListDate(memberItem)"
            @keydown.space="selectedListDate(memberItem)"
            alt=""
            tabindex="5"
            class="scrollNone"
        /></label>
      </v-col>
    </v-row>
    <v-row style="width: 100%;">
      <v-col>
        <maint-button @close="closeTab" />
      </v-col>
    </v-row>
    <edit-dialog ref="editDialog" v-on:clickSubmit="dialogConfirm()" />
    <dialog-store-select ref="dialogStoreSelect" />
    <popup ref="pop" />
  </v-container>
</template>
<!-- KSD V001.000 AE -->
