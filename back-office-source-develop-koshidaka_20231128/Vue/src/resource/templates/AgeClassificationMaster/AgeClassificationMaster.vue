<!-- // KSD V001.000 AS -->
<style src="./../../static/css/MasterCommon/masterCommon.css"></style>
<style scoped src="@/resource/static/css/AgeClassificationMaster/ageClassificationMaster.css" />
<script type="text/javascript" src="./../../static/js/AgeClassificationMaster/ageClassificationMaster.js"></script>
<template>
  <v-container style="margin-top:60px;" class="baseFont age-classification-page">
    <v-row>
      <v-col :cols="2" class="pa-0" style="min-width: 150px;max-width: 150px;">
        <label class="ListHeader" v-html="$t('C00216.S002')" />
      </v-col>
      <v-col :cols="3" class="pa-0" style="min-width: 240px; max-width: 240px;">
        <label class="ListHeader">{{$t("C00216.S003")}}</label>
      </v-col>
      <v-col :cols="2" class="pa-0" style="min-width: 90px;max-width: 90px;">
        <label class="ListHeader">{{$t("C00216.S004")}}</label>
      </v-col>
      <v-col :cols="2" class="pa-0" style="min-width: 90px;max-width: 90px;">
        <label class="ListHeader">{{$t("C00216.S005")}}</label>
      </v-col>
      <v-col :cols="2" class="pa-0 age-class-master-vcol-195">
        <label class="ListSplitHeader age-class-master-second-to-last-col" v-html="$t('C00216.S006')" />
      </v-col>
      <v-col class="pa-0">
        <label class="ListSplitHeader">
          <font style="margin-left:-21px">{{ $t("C00216.S007") }}</font>
        </label>
      </v-col>
    </v-row>
    <v-row v-if="operationLock === false"
      v-for="(row, index) in displayData"
      :key="`${row.ageDivisionCode}${index}`"
      style="height: 50px;"
    >
      <v-col :cols="2" class="pa-0" style="min-width: 150px;max-width: 150px;">
        <label class="ListElement">
          <font class="NameClass d-flex justify-center">{{ row.ageDivisionCode }}</font>
        </label>
      </v-col>
      <v-col :cols="3" class="pa-0" style="min-width: 240px; max-width: 240px;">
        <label class="ListElement">
          <font class="NameClass">{{ row.ageDivisionName }}</font>
        </label>
      </v-col>
      <v-col :cols="2" class="pa-0" style="min-width: 90px;max-width: 90px;">
        <label class="ListElement">
          <font class="NameClass d-flex justify-end mr-2">{{ row.startAge }}</font>
        </label>
      </v-col>
      <v-col :cols="2" class="pa-0" style="min-width: 90px;max-width: 90px;">
        <label class="ListElement">
          <font class="NameClass d-flex justify-end  mr-2">{{ row.endAge }}</font>
        </label>
      </v-col>
      <v-col :cols="2" class="pa-0 age-class-master-vcol-195" style="border-left:1px solid #9ea0aa;">
        <label class="ListSplitElement age-class-master-second-to-last-col">
          <font class="NameClass">{{ getOneOrderName(row.oneOrder) }}</font>
        </label>
      </v-col>
      <v-col class="pa-0 align-center" @click="selectedListDate(row, index)">
        <label class="ListSplitElement" style="border-right:1px solid #9ea0aa" :id ="'edit'+index">
          <img style="width: 45px; height: 45px;" src="@/assets/ico_edit@2x.png"
          @keydown.enter="selectedListDate(row, index)"
          @keydown.space="selectedListDate(row, index)" alt="" tabindex="0" class="scrollNone"/>
        </label>
      </v-col>
    </v-row>
    <v-row style="width: 100%;">
      <v-col>
        <maint-button @close="closeTab" />
      </v-col>
    </v-row>
    <edit-dialog ref="editDialog" v-on:clickSubmit="dialogConfirm()" :oneOrderList="oneOrderList"/>
    <!-- <dialog-store-select ref="dialogStoreSelect"/> -->
    <popup ref="pop"/>
  </v-container>
</template>
<!-- // KSD V001.000 AE -->
