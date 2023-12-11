<script type="text/javascript" src="./../../static/js/UserMaster/PwLockOutList.js"></script>
<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      persistent>
      <v-card class="basesize">
        <v-card-title class="headline dialog-line-blue">
          <font class="dialog-title">{{ title }}</font>
        </v-card-title>
        <div style="height: 354px; margin: 20px 26px; display:flex; flex-direction: column;">
          <div
            id="scroll-target"
            style="height: 243px; overflow-y:auto; padding-left:32px; padding-bottom: 5px;">
            <v-row style="height: 40px; width:100%;">
              <div style="width:171px;">
                <label
                  id="ListHeader"
                  style="height: 40px;border-right:1px solid #f2f3f5;"><font color ="white">{{ $t("F00001.S027") }}</font></label>
              </div>
              <div style="width:226px;">
                <label
                  id="ListHeader"
                  style="height: 40px;border-left:1px solid #f2f3f5;"><font color ="white">{{ $t("F00001.S028") }}</font></label>
              </div>
              <div style="width:50px">
                <label style="height: 50px;"/>
              </div>
            </v-row>
            <!-- v-rowで要素分回す -->
            <v-row
              v-for="(userItem,index) in lockUserDataList.userInfos"
              :key="userItem.userId"
              style="height: 40px; width:100%;">
              <div
                id="leftLabel"
                style="width:171px"><label
                  class="ListElement"
                  style="height: 40px"><font style="margin-left:10px; font-size:20px;">{{ userItem.displayCode }}</font></label></div>
              <div
                id="leftLabel"
                style="width:225px"><label
                  class="ListElement"
                  style="height: 40px"><font style="margin-left:10px; font-size:20px;">{{ userItem.name }}</font></label></div>
              <div style="margin-top:5px;width:50px">
                <label
                  id="checkLabel"
                  :class="'checkLabel'+index"
                  @keydown.space="onCheckKey(index)"
                  tabindex="201"
                  class="scrollNone"><input
                    :id="'check'+index"
                    type="checkbox"><span class="checkbox"/></label>
              </div>
            </v-row>
          </div>
          <v-row style="margin:0px;">
            <div style="margin-top:10px;margin-left:35px;margin-left: 5px;">
              <v-img
                :src="getIconSrc()"
                height="70px"
                width="70px"
                style="float:left; margin-right:10px;"/>
              <div style="margin-top:10px;width:450px;">
                <b><div
                  id="leftLabel"
                  v-html="$t('F00001.S029')"/></b>
              </div>
            </div>
          </v-row>
        </div>
        <v-card-actions class="dialog-fotter">
          <v-spacer/>
          <v-btn
            class="button dialog-fotter-button-gray footerButtonStyle"
            @click="dialog = false"
            tabindex="202">{{ $t("O00004.S003") }}</v-btn>
          <v-btn
            class="button dialog-fotter-button-orange footerButtonStyle"
            @click="onClickOk()"
            tabindex="203">{{ $t("O00004.S004") }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <popup ref="pop"/>
  </div>
</template>
