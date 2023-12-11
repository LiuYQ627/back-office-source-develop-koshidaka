<!-- KSD V001.000 AS -->
<style scoped src="./../../static/css/MasterCommon/masterCommon.css"></style>
<style
  scoped
  src="@/resource/static/css/RoomRelatedInformationSetting/RoomRelatedInformationSetting.css"
></style>
<script src="@/resource/static/js/RoomRelatedInformationSetting/RoomRelatedInformationSetting.js"></script>

<template>
  <v-container class="baseFont room-related-info-setting-container">
    <div class="selectStoreContentStyle">
      <label style="display: flex"
        ><p>{{ $t("C00220.S001") }}</p></label
      >
      <span class="storeSelectSpan" style="display: flex;margin:0;width:100%">
        <input
          tabindex="-1"
          type="text"
          class="storeNameText"
          style="width: 100%;"
          :class="{
            disableHeadquartersAuthorityStyling: headquartersAuthority != 1
          }"
          ref="targetStoreText"
          v-model="targetStoreText"
          disabled
        />
        <div
          class="buttomLabel roomInfoStoreSelectButton"
          :class="{
            disableHeadquartersAuthorityStyling: headquartersAuthority != 1
          }"
        >
          <v-btn
            tabindex="0"
            style="width: 28px; height: 40px"
            id="storeSelectBtn"
            @click="storeSelect"
            :disabled="headquartersAuthority != 1"
          >
            <span class="rightArrow2" />
          </v-btn>
        </div>
      </span>
    </div>

    <v-row style="height: 30px"
      ><v-col><v-spacer /></v-col
    ></v-row>

    <v-row no-gutters id="inputRow" class="room-related-info-setting-search-row" align="center" >
      <v-col :cols="2" align="start" style="padding: 0px;" class="roomRaleatedInformationSettingSearchCodeLabel">
        <div class="inputLabel" v-html="$t('C00220.S002')" />
      </v-col>
      <v-col class="bkColorBlue col">
        <div class="underLine2 roomRaleatedInformationSettingSearchCode">
          <input
            type="text"
            class="inputText"
            :class="{ disableHeadquartersAuthorityStyling: isOperationLockStoreCount !== 4 }"
            v-model="roomSearchCode"
            @input="sanitizeDirectInput"
            ref="roomSearchCode"
            @keydown.enter="directInput()"
            style="ime-mode:disabled;width: 100%;"
            :placeholder="this.$i18n.t('C00220.S003')"
            maxlength="4"
            :disabled="isOperationLockStoreCount !== 4"
            tabindex="0"
          />
        </div>
      </v-col>
    </v-row>
    <!-- Table Row Count  -->
    <v-row class="room-related-info-setting-table-row-count-row">
      <v-col class="room-related-info-setting-table-row-count-col" :cols="12">
        <font class="baseFont room-related-info-setting-table-row-count-font"
          ><b style="font-weight:normal;"
            >{{ $t("C00220.S016") }}{{ resultCount }}{{ $t("C00220.S017") }}</b
          ></font
        >
      </v-col>
    </v-row>
    <!-- Table Headers  -->
    <v-row no-gutters class="room-related-info-setting-header-row">
      <v-col class="NoColumn" style="padding: 0px">
        <label id="ListHeader">{{ $t("C00220.S004") }}</label>
      </v-col>
      <v-col class="TableNoColumn" style="padding: 0px;">
        <label id="ListHeader">{{ $t("C00220.S005") }}</label>
      </v-col>
      <v-col class="EquipmentColumn" style="padding: 0px;">
        <label id="ListHeader">{{ $t("C00220.S006") }}</label>
      </v-col>
      <v-col class="ModelColumn" style="padding: 0px;">
        <label id="ListHeader">{{ $t("C00220.S007") }}</label>
      </v-col>
      <v-col class="StartDateColumn" style="padding: 0px;">
        <label id="ListHeader">{{ $t("C00220.S009") }}</label>
      </v-col>
      <v-col class="EndDateColumn" style="padding: 0px;">
        <label id="ListHeader" class="room-related-info-setting-second-to-last-col">
          <font>{{ $t("C00220.S010") }}</font>
        </label>
      </v-col>
      <v-col class="EditColumn" :cols="1" style="padding: 0px;">
        <label id="ListHeader" class="room-related-info-setting-edit-header">
          <font style="margin-left: -21px;">{{ $t("C00220.S011") }}</font>
        </label>
      </v-col>
    </v-row>
    <!-- Table Content -->
    <v-row no-gutters
      v-for="(roomInfoItem, index) in dispRoomInfoDataList"
      :key="'Room:' + roomInfoItem.indexNo"
      style="height: 50px;width: 1300px;"
    >
      <v-col class="NoColumn" style="padding: 0px;">
        <label class="ListElement RoomListElement" :id="'code' + index">
          <font class="CenterStyle">{{ roomInfoItem.indexNo }}</font>
        </label>
      </v-col>
      <v-col class="TableNoColumn" style="padding: 0px;">
        <label class="ListElement RoomListElement" :id="'code' + index">
          <font class="NonNumericStyle">{{ `${roomInfoItem.roomName}` }}</font>
        </label>
      </v-col>
      <v-col class="EquipmentColumn" style="padding: 0px;">
        <label class="ListElement RoomListElement" :id="'code' + index">
          <font class="NonNumericStyle">{{ roomInfoItem.equipmentName }}</font>
        </label>
      </v-col>
      <v-col class="ModelColumn" style="padding: 0px;">
        <label class="ListElement RoomListElement" :id="'code' + index">
          <font class="NonNumericStyle">{{ roomInfoItem.modelName }}</font>
        </label>
      </v-col>
      <v-col class="StartDateColumn" style="padding: 0px;">
        <label
          class="ListElement RoomListElement"
          style="border-left:1px solid #9ea0aa;"
          :id="'name' + index"
        >
          <font class="CenterStyle">
            {{ roomInfoItem.formattedStartDate }}</font
          >
        </label>
      </v-col>
      <v-col class="EndDateColumn" :cols="2" style="padding: 0px;">
        <label
          class="ListElement RoomListElement room-related-info-setting-edit-content room-related-info-setting-second-to-last-col"
          :id="'name' + index"
        >
          <font class="CenterStyle"> {{ roomInfoItem.formattedEndDate }}</font>
        </label>
      </v-col>
      <v-col class="EditColumn" :cols="1" style="padding: 0px">
        <label
          class="ListSplitElement RoomListElement"
          style="border-right:1px solid #9ea0aa;"
          :id="'edit' + index"
          ><img
            style="width: 45px; height: 45px;"
            src="@/assets/ico_edit@2x.png"
            @click="selectedRoom(roomInfoItem.indexNo)"
            @keydown.enter="selectedRoom(roomInfoItem.indexNo)"
            @keydown.space="selectedRoom(roomInfoItem.indexNo)"
            alt=""
            tabindex="0"
            class="scrollNone"
        /></label>
      </v-col>
    </v-row>
    <v-row style="width: 100%;">
      <v-col>
        <maint-button @close="closeTab" />
      </v-col>
    </v-row>
    <upsert-dialog
      ref="upsertDialog"
      v-on:clickSubmit="dialogConfirm()"
      :businessUnitCd="sessionBusinessUnitCd"
      :targetStoreCd="targetStoreCd"
    />
    <dialog-store-select
      ref="dialogStoreSelect"
      v-on:clickSubmit="storeSelectOk"
    />
    <popup ref="pop" />
  </v-container>
</template>
<!-- KSD V001.000 AE -->
