<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/CommonDesign/commonSelectDialog.css"></style>
<script type="text/javascript" src="@/resource/static/js/CommonDesign/commonSelectDialog.js"></script>
<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="1147px !important" persistent>
      <v-card min-width="1147px">
        <v-card-title class="headline dialog-line-blue">
          <font class="  popup-title" style="font-size:22px;"><b>{{ tableHeaderTitle || $t("O00004.S016") }}</b></font>
        </v-card-title>
        <v-card-text class="content-style" style="margin-top: 0px;">
          <div id="text-content">
            <p style="width:460px;">{{ tableLeftUpperLabel }}</p>
            <p style="width:166px; "></p>
            <p style="width:460px;">{{ tableRightUpperLabel }}</p>
          </div>
          <div style="overflow: hidden;height: 331px; display: flex;">
            <div style="width: 460px;">
              <table class="fixed-header">
                <thead>
                  <tr>
                    <th :style="{ width: firstColWidth }"
                      class="title-cell-style-10 border-cell-style-3"
                      :class="{'room-no-left-col': isRoomNo}"
                      >
                      {{ tableLeftFirstTitle || $t("O00004.S020") }}
                    </th>
                    <th 
                      :style="{ width: secondColWidth }"
                      class="title-cell-style-10 border-cell-style-3"
                      :class="{'room-no-right-col': isRoomNo}"
                      >
                      {{ tableLeftSecondTitle || $t("O00004.S021") }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(store, index) in getCandidateList" :key="`candidate${index}`" style="height: 50px"
                    @click.exact="clickCandidateRow(store.code, false)"
                    @click.ctrl.exact="clickCandidateRow(store.code, true)"
                    @click.shift.exact="clickCandidateRowWithShift(store.code, false)"
                    @click.shift.ctrl="clickCandidateRowWithShift(store.code, true)"
                    @keydown.enter="clickCandidateRow(store.code, false)"
                    @keydown.space="clickCandidateRow(store.code, false)"
                    :class="tempCandidateDataList.indexOf(store.code) !== -1 ? 'selected-item' : ''">
                    <td
                      class="NumericStyle"
                      :class="{'room-no-left-col': isRoomNo}"
                      :style="{ width: firstColWidth }"
                      >
                      {{ store.code }}
                    </td>
                    <td 
                      :style="getCandidateList.length > 7 ? 'width: 290px' : `width:${secondColWidth}`"
                      :class="{'room-no-right-col': isRoomNo}"
                      >
                      {{ store.name }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div id="center-button-div">
              <v-btn @click="onClickAllSelected()" :disabled="onClickAllSelectedDisable" class="select-init-tab" tabindex="403">
                <font style="margin-right: 15px;">{{ $t("O00004.S022") }}</font>
                <span class="select-arrow" />
              </v-btn>
              <v-btn @click="onClickSelected()" style="margin-top: 23px;" :disabled="onClickSelectedDisable" class="select-init-tab" tabindex="404">
                <font style="margin-right: 15px;">{{ $t("O00004.S023") }}</font>
                <span class="select-arrow" />
              </v-btn>
              <v-btn @click="onClickDelete()"  style="margin-top: 86px;" :disabled="onClickDeleteDisable" class="select-init-tab" tabindex="405">
                <span class="select-arrow select-arrow-reverse" />
                <font style="margin-left: 15px;">{{ $t("O00004.S024") }}</font>
              </v-btn>
              <v-btn  @click="onClickAllDelete()" style="margin-top: 23px;" :disabled="onClickAllDeleteDisable" class="select-init-tab" tabindex="406">
                <span class="select-arrow select-arrow-reverse" />
                <font style="margin-left: 15px;">{{ $t("O00004.S025") }}</font>
              </v-btn>
            </div>
            <div style="width: 460px;">
              <table class="fixed-header">
                <thead>
                  <tr>
                    <th
                      :style="{ width: firstColWidth }"
                      class="title-cell-style-10 border-cell-style-3"
                      :class="{'room-no-left-col': isRoomNo}"
                      >
                      {{ tableRightFirstTitle || $t("O00004.S027") }}
                    </th>
                    <th
                      :style="{ width: secondColWidth }"
                      class="title-cell-style-10 border-cell-style-3"
                      :class="{'room-no-right-col': isRoomNo}"
                      >
                      {{ tableRightSecondTitle || $t("O00004.S028") }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(store, index) in getSelectedList" :key="`selected${index}`" style="height: 50px"
                  @click.exact="clickSelectedRow(store.code, false)"
                  @click.ctrl.exact="clickSelectedRow(store.code, true)"
                  @click.shift.exact="clickSelectedRowWithShift(store.code, false)"
                  @click.shift.ctrl="clickSelectedRowWithShift(store.code, true)"
                  :class="tempselectedDataList.indexOf(store.code) !== -1 ? 'selected-item' : ''">
                    <td
                      class="NumericStyle"
                      :style="{ width: firstColWidth }"
                      :class="{'room-no-left-col': isRoomNo}"
                      >
                      {{ store.code }}
                    </td>
                    <td
                      :style="getSelectedList.length > 7 ? 'width: 290px' : `width:${secondColWidth}`"
                      :class="{'room-no-right-col': isRoomNo}"
                      >
                      {{ store.name }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </v-card-text>

        <v-card-actions class="popup-fotter">
          <v-spacer></v-spacer>
          <v-btn
            class="button select-init-tab"
            style="background-color: #565960; box-shadow: none;"
            dark
            @click="backFunction()"
            id="popupBtBack"
            tabindex="407"
          >
            {{ $t("O00004.S003") }}
          </v-btn>
          <v-btn
            class="button dialog-fotter-button-orange footerButtonStyle select-init-tab"
            style="box-shadow: none;"
            :disabled="disableSave()"
            @click="exeFunction()"
            id="popupBtExe" tabindex="408"
          >
            {{ $t("O00004.S029") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <popup ref="pop"/>
  </div>
</template>
<!-- KSD V001.000 AE -->
