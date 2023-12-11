<style src="./../../static/css/CommonDesign/dialog.css"></style>
<script type="text/javascript" src="./../../static/js/Login/changePassword.js"></script>

/*
 * ---------+-----------------+----------+---------------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+---------------------------------------
 *  20221215  zhaomingyue(Neusoft) G001.00.0  issue課題#808,#809,#1305を対応します.
 */
<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      persistent>
      <v-card
        class="basesize"
        style="height:auto;">
        <v-card-title class="headline dialog-line-blue">
          <font class="dialog-title">{{ title }}</font>
        </v-card-title>
        <v-card-text>
          <div class="dialog-content">
            <v-row style="height: 50px;margin-top:30px;">
              <span class="labelDiv">
                <label class="label3">{{ $t("O00001.S006") }}</label>
              </span>
              <span
                class="textDiv"
                style="margin-left:-7px;">
                <!-- G001.00.0 Update-Start -->
                <!-- <input type="password" id="inputPassword1" class="inputPassword2" style="font-family: 'Migu 1P';" ref="passwordOld" :placeholder="this.$i18n.t('O00001.S017')" autocomplete="new-password" maxlength="15"> -->
                <input
                  v-model="passwordOld"
                  type="password"
                  id="inputPassword1"
                  class="inputPassword2"
                  style="font-family: 'Migu 1P';"
                  ref="passwordOld"
                  :placeholder="this.$i18n.t('O00001.S017')"
                  autocomplete="new-password"
                  maxlength="15">
                <!-- G001.00.0 Update-End -->
                <a
                  href="#"
                  @click="ChangePassword('icon1','inputPassword1')"
                  @keyup.space="ChangePassword('icon1','inputPassword1')">
                  <span class="field-icon2" >
                    <p
                      toggle="password-field"
                      id="icon1"
                      class="mdi mdi-eye toggle-password"/>
                  </span>
                </a>
              </span>
            </v-row>
            <v-row style="height: 50px">
              <span class="labelDiv">
                <label class="label3">{{ $t("O00001.S007") }}</label>
              </span>
              <span
                class="textDiv"
                style="margin-left:-7px;">
                <!-- G001.00.0 Update-Start -->
                <!-- <input type="password" id="inputPassword2" class="inputPassword2" style="font-family: 'Migu 1P';" ref="passwordNew" :placeholder="this.$i18n.t('O00001.S017')" autocomplete="new-password" maxlength="15"> -->
                <input
                  v-model="passwordNew"
                  type="password"
                  id="inputPassword2"
                  class="inputPassword2"
                  style="font-family: 'Migu 1P';"
                  ref="passwordNew"
                  :placeholder="this.$i18n.t('O00001.S017')"
                  autocomplete="new-password"
                  maxlength="15">
                <!-- G001.00.0 Update-End -->
                <a
                  href="#"
                  @click="ChangePassword('icon2','inputPassword2')"
                  @keyup.space="ChangePassword('icon2','inputPassword2')">
                  <span class="field-icon2" >
                    <p
                      toggle="password-field"
                      id="icon2"
                      class="mdi mdi-eye toggle-password"/>
                  </span>
                </a>
              </span>
            </v-row>
            <v-row style="height: 50px;margin-bottom:10px;">
              <span class="labelDiv">
                <label class="label3">{{ $t("O00001.S012") }}</label>
              </span>
              <span
                class="textDiv"
                style="margin-left:-7px;">
                <!-- G001.00.0 Update-Start -->
                <!-- <input type="password" id="inputPassword3" class="inputPassword2" style="font-family: 'Migu 1P';" ref="passwordNewConf" :placeholder="this.$i18n.t('O00001.S017')" autocomplete="new-password" maxlength="15"> -->
                <input
                  v-model="passwordNewConf"
                  type="password"
                  id="inputPassword3"
                  class="inputPassword2"
                  style="font-family: 'Migu 1P';"
                  ref="passwordNewConf"
                  :placeholder="this.$i18n.t('O00001.S017')"
                  autocomplete="new-password"
                  maxlength="15">
                <!-- G001.00.0 Update-End -->
                <a
                  href="#"
                  @click="ChangePassword('icon3','inputPassword3')"
                  @keyup.space="ChangePassword('icon3','inputPassword3')">
                  <span class="field-icon2" >
                    <p
                      toggle="password-field"
                      id="icon3"
                      class="mdi mdi-eye toggle-password"/>
                  </span>
                </a>
              </span>
            </v-row>
          </div>
        </v-card-text>
        <v-card-actions class="dialog-fotter rule-container">
          <!-- KSD V001.000 DS -->
          <!-- <v-spacer/> -->
          <!-- KSD V001.000 DE -->
          <!-- G001.00.0 Update-Start -->
          <!-- <v-btn
                    class="button dialog-fotter-button-orange footerButtonStyle"
                    @click="onClickOk()"
                >
                    {{ $t("O00004.S071") }}
                </v-btn> -->
          <!-- KSD V001.000 AS -->
          <span class="rule-text"> {{ passwordRuleMessage() }} </span>
          <v-spacer/>
          <!-- KSD V001.000 AE -->
          <v-btn
            class="button dialog-fotter-button-blue footerButtonStyle"
            @click="onClickOk()"
          >
            {{ $t("O00004.S004") }}
          </v-btn>
          <!-- G001.00.0 Update-End -->
        </v-card-actions>
      </v-card>
    </v-dialog>
    <popup ref="pop"/>
  </div>
</template>
<style lang="css">
.label3 {
    color: #ffffff;
    font-size:20px;
    text-align: center;
    display: table-cell;
    vertical-align: middle;
}

.labelDiv{
  margin-left: auto;
  background-color: #9ea0aa;
  width: 230px;
  height: 48px;
  display: table;
}
.textDiv{
  margin-right: auto;
}
.icons2 {
  position: absolute;
  top: 8px;
  left: 0;
  padding: 9px 8px;
  transition: 0.3s;
  color: #aaaaaa;
}
.field-icon2 {
  color: #555;
  float: right;
  height: 20px;
  margin-right: 15px;
  margin-top: -35px;
  position: relative;
  z-index: 2;
}
.inputPassword2{
  background: #fff;
  border-color: #bbb;
  color: #555;
  height: 48px;
  box-sizing: border-box;
  display: block;
  width: 250px;
  border-width: 1px;
  border-style: solid;
  padding-left: 10px;
  padding-right: 30px;
  outline: 0;
  font-family: inherit;
  font-size:20px;
}
.inputPassword2:focus {
  border: 2px solid #ff9508;
  outline:solid 2px #ff9508;
  outline-offset: -2px;
}
</style>
