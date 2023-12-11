<!--
 * ---------+---------------------+----------+--------------------------------
 *  DATE    |NAME(Inc)            |GUIDE     |GUIDANCE
 * ---------+---------------------+----------+--------------------------------
 * 20230603  wupsh(Neusoft)        G001.00.0  Eslintを対応します.
-->
<style src="./../../static/css/OperationBtnSetting/drawerMenuSettingDialog.css"></style>
<script type="text/javascript" src="./../../static/js/OperationBtnSetting/drawerMenuSettingDialog.js"></script>

<template>
  <div class="text-center baseFont">
    <v-dialog
      :value="displayed"
      persistent>
      <v-card class="basesize">
        <!-- ヘッダー -->
        <v-card-title class="headline dialog-line-blue title-label">
          <div id="changeLabel">
            <label
              id="changeModelabel"
            ><b>{{ "編集" }}</b></label
            >
          </div>
          <font class="dialog-title">{{ "ドロアメニュー表示" }}</font>
        </v-card-title>

        <!-- 設定項目 -->

        <div
          id="baseTable"
          class="px-4"
          style="overflow: auto;">
          <v-row>
            <v-col
              cols="8"
              offset="2">
              <!-- G001.00.0 Update-Start -->
              <!-- <template
                v-for="([key, menu], index) in drawerMenu"
              > -->
              <v-row
                no-gutters
                v-for="([key, menu], index) in drawerMenu"
                :key="index">
                <!-- G001.00.0 Update-End -->
                <!-- G001.00.0 Delete-Start -->
                <!-- <v-row no-gutters> -->
                <!-- G001.00.0 Delete-End -->
                <!-- KSD V001.000 DS -->
                <!-- <v-col -->
                <!--  class="whiteFrame" -->
                <!--  style="vertical-align: middle; line-height: 36px;">{{ key | drawer_menu }}</v-col> -->
                <!-- KSD V001.000 DE -->
                <!-- KSD V001.000 AS -->
                <v-col
                  :class="displayItem(key) === true ? 'whiteFrame' : 'display-none'"
                  style="vertical-align: middle; line-height: 36px;">{{ key | drawer_menu }}</v-col>
                <!-- KSD V001.000 AE -->
                <!-- KSD V001.000 DS -->
                <!-- <v-col -->
                <!--  class="col-auto" -->
                <!--  style="width: 20px;"/> -->
                <!-- KSD V001.000 DE -->
                <!-- KSD V001.000 AS -->
                <v-col
                  :class="displayItem(key) === true ? 'col-auto' : 'display-none'"
                  style="width: 20px;"/>
                <!-- KSD V001.000 AE -->
                <!-- KSD V001.000 DS -->
                <!-- <v-col -->
                <!--  class="col-auto" -->
                <!--  style="width: 64px;"> -->
                <!-- KSD V001.000 DE -->
                <!-- KSD V001.000 AS -->
                <v-col
                  :class="displayItem(key) === true ? 'col-auto' : 'display-none'"
                  style="width: 64px;">
                  <!-- KSD V001.000 AE -->
                  <!-- KSD V001.000 DS -->
                  <!-- <v-btn -->
                  <!--  class="checkBox" -->
                  <!--  :checked="menu.active" -->
                  <!--  @click="toggleActive(index)" -->
                  <!-- /> -->
                  <!-- KSD V001.000 DE -->
                  <!-- KSD V001.000 AS -->
                  <v-btn
                    :class="displayItem(key) === true ? 'checkBox' : 'display-none'"
                    :checked="menu.active"
                    @click="toggleActive(index)"
                  />
                  <!-- KSD V001.000 AE -->
                </v-col>
              </v-row>
              <!-- G001.00.0 Delete-Start -->
              <!-- </template> -->
              <!-- G001.00.0 Delete-End -->
            </v-col>
          </v-row>
        </div>
        <!-- フッター -->
        <v-card-actions class="dialog-fotter">
          <v-spacer/>
          <v-btn
            class="button dialog-fotter-button-gray footerButtonStyle"
            @click="onClickReturn()"
          >
            {{ $t("O00004.S003") }}
          </v-btn>
          <v-btn
            :disabled="!this.permissions.includes('CLOUDPOS_OPERATION_BTN_UPDATE')"
            class="button dialog-fotter-button-orange footerButtonStyle"
            @click="onClickSave()"
          >
            {{ $t("O00004.S008") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <popup ref="pop" />
  </div>
</template>
