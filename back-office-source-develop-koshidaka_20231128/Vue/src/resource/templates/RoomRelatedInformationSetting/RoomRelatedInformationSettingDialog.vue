<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/MasterCommon/masterDialog.css" />
<style scoped src="@/resource/static/css/CommonDesign/utils.css" />
<style
  scoped
  src="@/resource/static/css/RoomRelatedInformationSetting/RoomRelatedInformationSettingDialog.css"
></style>
<script src="@/resource/static/js/RoomRelatedInformationSetting/RoomRelatedInformationSettingDialog.js" />

<template>
  <div class="text-center baseFont">
    <!-- マスタ新規・編集ダイアログ -->
    <v-dialog v-model="isDialogBoxOpen" persistent eager>
      <v-card class="basesize">
        <v-card-title class="headline dialog-line-blue title-label">
          <div id="changeLabel">
            <label id="newModelabel" v-if="mode === 1"
              ><b>{{ $t("C00220.S013") }}</b></label
            >
            <label id="changeModelabel" v-if="mode === 2"
              ><b>{{ $t("C00220.S012") }}</b></label
            >
          </div>
          <font class="dialog-title">{{ title }}</font>
        </v-card-title>
        <div id="baseTable">
          <v-container class="RoomRelatedDialogContainer">
            <v-row class="input-row room-input w-100">
              <v-col
                cols="4"
                class="grayFrame dialogLabels d-flex justify-center"
              >
                <label for="" class="input-labels">{{
                  $t("C00220.S004")
                }}</label>
              </v-col>
              <v-col class="d-flex whiteFrame inputs">
                <input
                  type="text"
                  style="padding-left: 5px;padding-right: 2px"
                  class="w-100 disabled"
                  :disabled="true"
                  :value="indexNo"
                />
              </v-col>
            </v-row>
            <v-row class="input-row room-input w-100">
              <v-col
                cols="4"
                class="grayFrame dialogLabels d-flex justify-center"
              >
                <label for="" class="input-labels">{{
                  $t("C00220.S005")
                }}</label>
              </v-col>
              <v-col class="inputs dropdown">
                <select
                  :class="{ errorHighlight: this.formErrors.tableNo != '' }"
                  ref="tableNoInput"
                  style="color:#000000;"
                  class="h-100 w-100 form-inputs"
                  v-model="roomInfo.tableNo"
                >
                  <option
                    v-for="room in roomList"
                    :key="'DialogRoom' + room.indexNo"
                    :selected="
                      mode == MODE.EDIT && room.indexNo == roomInfo.tableNo
                    "
                    :value="room.indexNo"
                    >{{ room.tblName }}</option
                  >
                </select>
                <div class="pulldownArrow" />
              </v-col>
            </v-row>
            <error-message :errorModel="this.formErrors.tableNo" />
            <v-row class="input-row room-input w-100" style="height: 80px;">
              <v-col
                cols="4"
                class="grayFrame dialogLabels d-flex justify-center"
                style="padding: 0 5px"
              >
                <label for="" class="input-labels">{{
                  $t("C00220.S008")
                }}</label>
              </v-col>
              <v-col ref="equipmentNo" class="inputs dropdown">
                <select
                  :class="{ errorHighlight: this.formErrors.modelNo != '' }"
                  style="color:#000000;white-space: normal;padding-right: 30px;"
                  class="h-100 w-100 form-inputs"
                  v-model="roomInfo.modelNo"
                >
                  <option
                    v-for="{ model, equipment } in this.boundEquipmentList"
                    :key="'DialogModel' + model.modelNo"
                    :selected="
                      mode == MODE.EDIT && roomInfo.modelNo == model.modelNo
                    "
                    :value="model.modelNo"
                    >{{ `${model.modelNo}${$t('C00220.S018')}${equipment.equipName}${$t('C00220.S019')}${model.modelName}` }}
                  </option>
                </select>
                <div class="pulldownArrow" />
              </v-col>
            </v-row>
            <error-message :errorModel="this.formErrors.modelNo" />
            <v-row class="input-row room-input w-100">
              <v-col
                cols="4"
                class="grayFrame dialogLabels d-flex justify-center"
              >
                <label for="" class="input-labels">{{
                  $t("C00220.S009")
                }}</label>
              </v-col>
              <v-col
                :class="{ errorHighlight: this.formErrors.startDate != '' }"
                @click="openDatePicker($refs.startDate)"
                @keypress.enter="openDatePicker($refs.startDate)"
                class="inputs form-inputs dateInput"
                tabindex="-1"
              >
                <date-input
                  ref="startDate"
                  format="Y/m/d"
                  style="border:0"
                  :styling="{
                    'margin-left': '0 !important',
                    'padding-left': '5px'
                  }"
                  v-model="roomInfo.startDate"
                />
              </v-col>
            </v-row>
            <error-message :errorModel="this.formErrors.startDate" />
            <v-row class="input-row room-input w-100">
              <v-col
                cols="4"
                class="grayFrame dialogLabels d-flex justify-center"
              >
                <label for="" class="input-labels">{{
                  $t("C00220.S010")
                }}</label>
              </v-col>
              <v-col
                :class="{ errorHighlight: this.formErrors.endDate != '' }"
                @click="openDatePicker($refs.endDate)"
                @keypress.enter="openDatePicker($refs.endDate)"
                class="inputs form-inputs dateInput"
                tabindex="-1"
              >
                <date-input
                  ref="endDate"
                  format="Y/m/d"
                  style="border:0"
                  :styling="{
                    'margin-left': '0 !important',
                    'padding-left': '5px'
                  }"
                  v-model="roomInfo.endDate"
                />
              </v-col>
            </v-row>
            <error-message :errorModel="this.formErrors.endDate" />
          </v-container>
        </div>
        <v-card-actions class="dialog-fotter">
          <v-spacer></v-spacer>
          <div class="deleteButton">
            <v-btn
              class="button dialog-fotter-button-blue footerButtonStyle"
              @click="onClickDelete()"
              v-if="mode === 2"
              :disabled="!$root.approvalFlg && !$root.deleteAuth"
            >
              {{ $t("O00004.S024") }}
            </v-btn>
          </div>
          <v-btn
            class="button dialog-fotter-button-gray footerButtonStyle"
            @click="onClickReturn()"
          >
            {{ $t("O00004.S003") }}
          </v-btn>
          <v-btn
            class="button dialog-fotter-button-orange footerButtonStyle"
            @click="onClickSave()"
            @keydown.tab="resetFocus($event)"
            @keyup.tab="
              e => {
                e.preventDefault();
              }
            "
            :disabled="!$root.approvalFlg && !$root.registerAuth"
          >
            {{ $t("O00004.S008") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <popup ref="pop" />
  </div>
</template>
<!-- KSD V001.000 AE -->
