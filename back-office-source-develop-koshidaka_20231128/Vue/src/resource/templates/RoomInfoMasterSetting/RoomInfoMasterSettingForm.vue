<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/CommonDesign/utils.css" />
<style scoped src="@/resource/static/css/RoomInfoMasterSetting/roomInfoMasterSettingForm.css" />
<script type="text/javascript" src="@/resource/static/js/RoomInfoMasterSetting/roomInfoMasterSettingForm.js" />
<template>
  <div :class="{'disabled': disabled}">
    <!-- No -->
    <form-group-layout
      class="immutable mb-15"
      :headerCols="6"
      :bodyCols="5"
      :title="$t('C00208.S003')"
      :hasError="hasError('indexNo')"
      :errorText="errorText('indexNo')">
      <text-input
        type="number"
        class="form-control"
        min="0"
        max="300"
        maxlength="3"
        v-model="dataModel.indexNo"
        @input="handleFormInput"
        disabled
      />
    </form-group-layout>
    <!-- 部屋No -->
    <form-group-layout
      :class="{
        'mb-15': !hasError('table.tblNo'),
        'mb-0': hasError('table.tblNo')
      }"
      :headerCols="6"
      :bodyCols="5"
      :title="$t('C00208.S004')"
      :hasError="hasError('table.tblNo')"
      :errorText="errorText('table.tblNo')"
      leftSpacing='228px'>
      <text-input
        type="text"
        class="form-control"
        maxlength="5"
        :placeholder="$t('C00208.S016')"
        halfWidthOnly
        v-model="dataModel.table.tblNo"
        @input="(e) => handleFormInput(e, 'tblNo')"
        @focusout="handleTblNoFocusout"
        :disabled="disabled"
      />
    </form-group-layout>
    <!-- 部屋名称 -->
    <form-group-layout
      :class="{
        'mb-15': !hasError('table.tblName'),
        'mb-0': hasError('table.tblName')
      }"
      :headerCols="6"
      :bodyCols="6"
      :title="$t('C00208.S005')"
      :hasError="hasError('table.tblName')"
      :errorText="errorText('table.tblName')"
      leftSpacing='228px'>
      <text-input
        type="text"
        id="tblNameId"
        class="form-control"
        :maxlength="10"
        :maxByteLength="10"
        :placeholder="$t('C00208.S017')"
        v-model="dataModel.table.tblName"
        @input="(e) => handleFormInput(e, 'tblName')"
        :disabled="disabled"
      />
    </form-group-layout>
    <!-- 部屋名称（短縮名称）  -->
    <form-group-layout
      :class="{
        'mb-15': !hasError('table.tblNameShort'),
        'mb-0': hasError('table.tblNameShort')
      }"
      :headerCols="6"
      :bodyCols="6"
      :title="$t('C00208.S021')"
      :hasError="hasError('table.tblNameShort')"
      :errorText="errorText('table.tblNameShort')"
      leftSpacing='228px'>
      <text-input
        type="text"
        id="tblNameId"
        class="form-control"
        :maxlength="8"
        :maxByteLength="8"
        :placeholder="$t('C00208.S022')"
        v-model="dataModel.table.tblNameShort"
        @input="(e) => handleFormInput(e, 'tblNameShort')"
        :disabled="disabled"
      />
    </form-group-layout>
    <!-- 収容最大人数 -->
    <form-group-layout
      :class="{
        'mb-15': !hasError('room.maxCount'),
        'mb-0': hasError('room.maxCount')
      }"
      :headerCols="6"
      :bodyCols="5"
      :title="$t('C00208.S007')"
      :hasError="hasError('room.maxCount')"
      :errorText="errorText('room.maxCount')"
      leftSpacing='228px'>
      <text-input
        type="number"
        class="form-control"
        min="1"
        max="100"
        maxlength="3"
        :placeholder="$t('C00208.S019')"
        v-model="dataModel.room.maxCount"
        @input="handleFormInput"
        :disabled="disabled"
      />
    </form-group-layout>
    <!-- 部屋プラス利用料金 -->
    <form-group-layout
      :class="{
        'mb-15': !hasError('room.roomPlusPrice'),
        'mb-0': hasError('room.roomPlusPrice')
      }"
      :headerCols="6"
      :bodyCols="4"
      :title="$t('C00208.S008')"
      :hasError="hasError('room.roomPlusPrice')"
      :errorText="errorText('room.roomPlusPrice')"
      leftSpacing='228px'>
      <text-input
        type="number"
        class="form-control"
        min="0"
        max="999999"
        maxlength="6"
        v-model="dataModel.room.roomPlusPrice"
        @input="handleFormInput"
        :disabled="disabled"
      />
    </form-group-layout>
    <!-- ルーム優先順位 -->
    <form-group-layout
      :class="{
        'mb-15': !hasError('room.roomPriority'),
        'mb-0': hasError('room.roomPriority')
      }"
      :headerCols="6"
      :bodyCols="2"
      :title="$t('C00208.S009')"
      :hasError="hasError('room.roomPriority')"
      :errorText="errorText('room.roomPriority')"
      leftSpacing='228px'>
      <text-input
        type="number"
        class="form-control"
        min="1"
        max="999"
        maxlength="3"
        v-model="dataModel.room.roomPriority"
        @input="handleFormInput"
        :disabled="disabled"
      />
    </form-group-layout>
    <!-- ドリンクバールーム優先順位 -->
    <form-group-layout
      :class="{
        'mb-15': !hasError('room.drinkbarRoomPriority'),
        'mb-0': hasError('room.drinkbarRoomPriority')
      }"
      :headerCols="9"
      :bodyCols="2"
      :title="$t('C00208.S010')"
      :hasError="hasError('room.drinkbarRoomPriority')"
      :errorText="errorText('room.drinkbarRoomPriority')"
      leftSpacing='342px'>
      <text-input
        type="number"
        class="form-control"
        min="1"
        max="999"
        maxlength="3"
        v-model="dataModel.room.drinkbarRoomPriority"
        @input="handleFormInput"
        :disabled="disabled"
      />
    </form-group-layout>
    <!-- 飲み放題ルーム優先順位 -->
    <form-group-layout
      :class="{
        'mb-15': !hasError('room.freeFlowingDrinkRoomPriority'),
        'mb-0': hasError('room.freeFlowingDrinkRoomPriority')
      }"
      :headerCols="9"
      :bodyCols="2"
      :title="$t('C00208.S011')"
      :hasError="hasError('room.freeFlowingDrinkRoomPriority')"
      :errorText="errorText('room.freeFlowingDrinkRoomPriority')"
      leftSpacing='342px'>
      <text-input
        type="number"
        class="form-control"
        min="1"
        max="999"
        maxlength="3"
        v-model="dataModel.room.freeFlowingDrinkRoomPriority"
        @input="handleFormInput"
        :disabled="disabled"
      />
    </form-group-layout>
    <!-- セルフ表示対象 -->
    <form-group-layout
      :class="{
        'mb-15': !hasError('room.selfDisplay'),
        'mb-0': hasError('room.selfDisplay')
      }"
      :headerCols="6"
      :bodyCols="5"
      :title="$t('C00208.S012')"
      :hasError="hasError('room.specialRoom')"
      :errorText="errorText('room.specialRoom')"
      leftSpacing='228px'>
      <radio-button
        class="form-control"
        :labels="labelsDo"
        v-model="dataModel.room.specialRoom"
        @input="handleFormInput"
        :disableButtons="disabled"
      />
    </form-group-layout>
    <!-- 予約割当対象 -->
    <form-group-layout
      :class="{
        'mb-15': !hasError('room.reservedAvailable'),
        'mb-0': hasError('room.reservedAvailable')
      }"
      :headerCols="6"
      :bodyCols="5"
      :title="$t('C00208.S013')"
      :hasError="hasError('room.reservedAvailable')"
      :errorText="errorText('room.reservedAvailable')"
      leftSpacing='228px'>
      <radio-button
        class="form-control"
        :labels="labelsDo"
        v-model="dataModel.room.reservedAvailable"
        @input="handleFormInput"
        :disableButtons="disabled"
      />
    </form-group-layout>
  </div>
</template>
<!-- KSD V001.000 AE -->
