<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/CommonDesign/utils.css" />
<script type="text/javascript" src="@/resource/static/js/RoomInfoSubSetting/roomSelect.js"/>

<template>
  <div
  class="h-100 w-100 d-flex align-center"
  :class="disabled ? 'lightgrayFrame' : 'whiteFrame'"
  >
    <input
      type="text"
      class="px-2 h-100 w-100 ellipsis"
      :value="valueText"
      disabled
    />
    <v-btn class="rightArrowButton mx-2"
      :disabled="disabled"
      @click="openDialog"
    />
    <common-select-dialog
      ref="commonSelectDialog"
      :tableHeaderTitle="$t('C00221.S014')"
      
      :tableLeftUpperLabel="$t('C00221.S015')"
      :tableRightUpperLabel="$t('C00221.S018')"
      :tableLeftFirstTitle="isRoomNo ? $t('F32231.S263') : $t('C00221.S017')"
      :tableLeftSecondTitle="$t('C00221.S002')"
      :tableRightFirstTitle="isRoomNo ? $t('F32231.S263') : $t('C00221.S017')"
      :tableRightSecondTitle="$t('C00221.S002')"
      v-on:clickSubmit="handleRoomChange"
      :is-room-no="isRoomNo"
    />
  </div>
</template>
<!-- KSD V001.000 AE -->
