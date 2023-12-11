<style src="./../../static/css/MasterCommon/masterCommon.css"></style>
<style src="./../../static/css/MasterCommon/masterDialog.css"></style>
<!-- KSD V001.000 AS -->
<style scope src="@/resource/static/css/DataRetentionSetting/dataRetentionSetting.css"></style>
<!-- KSD V001.000 AE -->
<script type="text/javascript" src="./../../static/js/DataRetentionSetting/dataRetentionSetting.js"></script>

<template>
  <!-- KSD V001.000 MS -->
  <!-- <v-container
          style="width: 680px;margin-top:60px;"
          class="baseFont baseContainer"> -->
  <v-container
    style="margin-top:60px;"
    class="baseFont baseContainer data-retention-container">
  <!-- KSD V001.000 ME -->
    <!-- KSD V001.000 AS -->
    <v-row align="center" no-gutters>
      <v-row class="zero-day-warning">
        <v-col :cols="12" style="padding: 0px;">
            {{ $t("F32212.S005")}}
        </v-col>
      </v-row>
    </v-row>
    <v-row style="height: 30px"><v-col><v-spacer/></v-col></v-row>
    <v-row align="center">
      <!-- ヘッダ -->
      <v-row
        justify="start"
        align-content="center"
        no-gutters
        style="margin-top:10px">
        <!-- ID, 店舗名 -->
        <v-col
          :cols="10"
          class="data-retention-table-header top-left-label"
          style="padding: 0px;">
          <!-- KSD V001.000 MS -->
          <!-- <label id="ListHeader">{{ "対象テーブル一覧" }}</label> -->
          <label id="ListHeader">
            <p class="top-left-label-text">{{ $t("F32212.S001")}}</p>
          </label>
          <!-- KSD V001.000 ME -->
        </v-col>
        <!-- 保存期間 -->
        <v-col
          :cols="2"
          class="data-retention-table-header data-retention-col-3"
          style="padding: 0px;">
          <!-- KSD V001.000 MS -->
          <!-- <label id="ListHeader">{{ "保存期間" }}</label> -->
          <label id="ListHeader"></label>
          <!-- KSD V001.000 ME -->
        </v-col>
      </v-row>
    </v-row>
    <!-- KSD V001.000 AE -->

    <v-row align="center">
      <!-- KSD V001.000 MS -->
      <!-- <v-row
              justify="start"
              align-content="center"
              style="margin-top:10px"> -->
      <v-row
        justify="start"
        align-content="center"
        no-gutters>
      <!-- KSD V001.000 ME -->
        <!-- KSD V001.000 DS -->
        <!-- <v-col
                :cols="10"
                style="padding: 0px;">
                <label id="ListHeader">{{ "対象テーブル一覧" }}</label>
        </v-col> -->
        <!-- 保存期間 -->
        <!-- <v-col
                :cols="2"
                style="padding: 0px;">
          <label id="ListHeader">{{ "保存期間" }}</label> -->
        <!-- KSD V001.000 DE -->
        <!-- KSD V001.000 AS -->
        <v-col
          :cols="4"
          style="padding: 0px;"
          class="data-retention-col-1">
          <label id="ListHeader">{{ $t("F32212.S002")}}</label>
        </v-col>
        <v-col :cols="6" style="padding: 0px;">
          <label id="ListHeader">{{ $t("F32212.S003")}}</label>
        </v-col>
        <!-- 保存期間 -->
        <v-col
          :cols="2"
          style="padding: 0px;" class="data-retention-col-3">
          <label id="ListHeader">{{ $t("F32212.S004")}}</label>
          <!-- KSD V001.000 AE -->
        </v-col>
      </v-row>

      <!-- コンテンツ -->
      <!-- KSD V001.000 MS -->
      <!-- <v-row
              v-for="(dataItem, index) in dispDataList"
              :key="dataItem.dataId"
              style="height: 50px; width: 680px;"> -->
      <div
        v-for="(dataItem, index) in dispDataList"
        :key="dataItem.id"
        class="data-retention-container">
        <v-row
          v-for="(table, tb_idx) in dataItem.tables"
          :key="table"
          no-gutters>
      <!-- KSD V001.000 ME -->
          <!-- ID -->
          <v-col
            :cols="4"
            style="padding: 0px;"
            class="data-retention-col-1">
            <label
              class="ListElement"
              style="border-left:1px solid #9ea0aa;"
              :id="'id'+index">
              <!-- KSD V001.000 MS -->
              <!-- <font
                      class="NumericStyle"
                      style="margin-left:10px">{{dataItem.dataId}}</font> -->
              <font
                v-if="tb_idx==0"
                class="data-retention-table-content-text"
                style="margin-left:10px">{{dataItem.displayName}}</font>
              <!-- KSD V001.000 ME -->
            </label>
          </v-col>
          <!-- 店舗名 -->
          <v-col
            :cols="6"
            style="padding: 0px;">
            <label
              class="ListElement"
              style="border-left:1px solid #9ea0aa;"
              :id="'store'+index">
              <!-- KSD V001.000 MS -->
              <!-- <font class="NameClass">{{dataItem.displayName}}</font> -->
              <font class="data-retention-table-content-text">{{table}}</font>
              <!-- KSD V001.000 ME -->
            </label>
          </v-col>
          <!-- 保存期間 -->
          <v-col
            :cols="2"
            style="padding: 0px"
            class="data-retention-col-3">
            <!-- KSD V001.000 MS -->
            <!-- <div
                    class="ListElement"
                    style="border-right:1px solid #9ea0aa;"
                    :id="'keepspan'+index">
                    <div style="margin-left: 10px;"></div>
                    <input
                      type="number"
                      class="inputExpiry underLine NumericStyle"
                      style="padding-left: 10px" v-model="dataItem.keepSpan"
                      maxlength="2"
                      tabindex="100" />
                      <label>{{ "ヶ月" }}</label> -->
            <div
              class="ListElement ret-period-column"
              style="border-right:1px solid #9ea0aa;"
              :id="'keepspan'+index">
              <div style="margin-left: 10px;"></div>
              <input type="number"
                v-if="tb_idx==0"
                class="inputExpiry underLine NumericStyle ret-period-element"
                v-model="dispDataList[index].nodeRetentions.nodes[retentionPeriodIdx[index]].nodeRetentionPeriod"
                tabindex="100"
                min="0"
                max="9999"
                style="padding-left: 10px"
                maxlength="4"
                oninput="this.value = this.value.replace(/\D/g)"
                @input="(e) => inputNumberLimit(e, dispDataList, index, 'nodeRetentionPeriod', 4)"
              />
              <label v-if="tb_idx==0">{{ $t("F32212.S006")}}</label>
            <!-- KSD V001.000 ME -->
            </div>
          </v-col>
        </v-row>
      </div>
    </v-row>

    <v-row style="width: 100%;">
      <v-col>
        <!-- KSD V001.000 MS -->
        <!-- <maint-button
          @close="closeTab"
          @fixed="save"/> -->
        <maint-button
          @close="closeTab"
          :isfixed-btn="(dispDataList.length === 0) || (edited===false)"
          @fixed="save"/>
        <!-- KSD V001.000 ME -->
      </v-col>
    </v-row>
    <!-- KSD V001.000 AS -->
    <popup ref="pop" />
    <!-- KSD V001.000 AE -->
  </v-container>
</template>
