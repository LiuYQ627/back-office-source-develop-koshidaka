<!-- KSD V001.000 DS -->
<!-- <style src="./../../static/css/Login/login.css"></style> -->
<!-- KSD V001.000 DE -->
<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/Login/login.css"></style>
<!-- KSD V001.000 AE -->
<script type="text/javascript" src="./../../static/js/Login/login.js"></script>
<template>
 <!-- KSD V001.000 DS -->
 <!-- <v-container> --> 
 <!-- KSD V001.000 DE -->
 <!-- KSD V001.000 AS -->
  <v-container class="login-container">
 <!-- KSD V001.000 AE -->
    <div id="pagecover">
      <div
        id="contents"
        style="padding-bottom:186px;">
        <v-row
          justify="center"
          align-content="center">
          <v-col
            cols="12"
            style="margin-top: 160px;">
            <v-row
              justify="center"
              align-content="center"
              class="loginContent">
              <label id="label2">{{ $t("O00001.S001") }}</label>
              <input
                type="text"
                class="text"
                style="margin-right: 11px;"
                v-model="companyCode"
                :placeholder="$t('O00001.S001')"
                tabindex="1"
                maxlength='15'>
              <p><b style="font-size:20px;">{{ $t("O00001.S003") }}：</b>
                <label
                  tabindex="2"
                  @keyup.space="SpaceKeyDownToCompanyCheck"
                  class="scrollNone">
                  <input
                    id="companyCheck"
                    type="checkbox"><span class="checkbox"/>
                </label>
              </p>
            </v-row>

            <v-row
              justify="center"
              align-content="center"
              class="loginContent"
              style="margin-top:25px;">
              <label id="label2">{{ $t('O00001.S002') }}</label>
              <input
                type="text"
                class="text"
                style="margin-right: 11px;"
                v-model="userCode"
                :placeholder="$t('O00001.S002')"
                tabindex="3"
                maxlength="10">
              <p><b style="font-size:20px;">{{ $t("O00001.S003") }}：</b>
                <label
                  tabindex="4"
                  @keyup.space="SpaceKeyDownToUserCheck"
                  class="scrollNone">
                  <input
                    id="userCheck"
                    type="checkbox"><span class="checkbox"/>
                </label>
              </p>
            </v-row>

            <v-row
              justify="center"
              align-content="center"
              style="margin-top:25px;margin-right: 116px;">
              <label id="label2">{{ $t("O00001.S004") }}</label>
              <p style="height: 40px;margin-bottom: 0;">
                <!-- KSD V001.000 DS -->
                <!-- <input -->
                <!--  type="password" -->
                <!--  id="inputPassword" -->
                <!--  class="inputPassword" -->
                <!--  style="font-family: 'Migu 1P';" -->
                <!--  ref="password" -->
                <!--  :placeholder="$t('O00001.S004')" -->
                <!--  tabindex="5" -->
                <!--  autocomplete="new-password" -->
                <!--  maxlength="15"> -->
                <!-- KSD V001.000 DE -->
                <!-- KSD V001.000 AS -->
                <input
                  type="password"
                  id="inputPassword"
                  class="inputPassword"
                  style="font-family: 'Migu 1P';"
                  v-model="password"
                  ref="password"
                  :placeholder="$t('O00001.S004')"
                  tabindex="5"
                  autocomplete="new-password"
                  maxlength="15">
                <!-- KSD V001.000 AE -->
                <a
                  href="#"
                  @click="ChangePassword('icon','inputPassword')"
                  @keyup.space="ChangePassword('icon','inputPassword')"
                  tabindex="6"
                  class="field-icon scrollNone" >
                  <span>
                    <p
                      toggle="password-field"
                      id="icon"
                      class="mdi mdi-eye toggle-password"/>
                  </span>
                </a>
              </p>
            </v-row>
            <v-row
              justify="center"
              align-content="center"
              style="margin-top:113px">
              <div @click="beforLogin">
                <v-btn
                  color="#1ea7cb"
                  style="width: 280px;height: 50px;"
                  tabindex="7"><font
                    color ="white"
                    size= "4px"
                    style="font-weight:bold;">{{ $t("O00001.S005") }}</font></v-btn><v-spacer/>
              </div>
            </v-row>
          </v-col>
        </v-row>
        <base-dialog
          ref="baseDialog"
          @method="Login"/>
      </div>
      <div id="footer">
        <v-row style="text-align:left;position:relative;padding-bottom:50px;">
          <v-col
            cols="6"
            class="footerCol"
            style="padding-left:23px;">
            <v-col class="footerContent">
              <label class="footerContentTitle">{{ $t("O00001.S015") }}</label>
              <hr>
              <div>
                <label id="latestNews" v-html="$t(latestNews)"></label>
              </div>
            </v-col>
          </v-col>
          <v-col
            cols="6"
            class="footerCol">
            <v-col class="footerContent">
              <label class="footerContentTitle">{{ $t("O00001.S016") }}</label>
              <hr>
              <div>
                <label id="maintenanceNotice" v-html="$t(maintenanceNotice)"></label>
              </div>
            </v-col>
          </v-col>
        </v-row>

      <v-row class="text-footer">
        <v-col class="privacy-policy">
          <a class="privacy-policy-link" href="https://www.toshibatec.co.jp/privacy/" target="_blank">
            <span class="arrow-icon"><arrow-icon/></span>
            <span class="privacy-policy-text">{{ $t("O00001.S026") }}</span>
          </a>
        </v-col>
        <v-col class="copyright">
          <span class="copyright-text">{{ $t("O00001.S027") }}</span>
        </v-col>
      </v-row>
      </div>

    </div>
    <popup ref="pop"/>
  </v-container>
</template>
