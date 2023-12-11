<!--
 * ---------+---------------------+----------+--------------------------------
 *  DATE    |NAME(Inc)            |GUIDE     |GUIDANCE
 * ---------+---------------------+----------+--------------------------------
 * 20230603  wupsh(Neusoft)        G001.00.0  Eslintを対応します.
 * 20230713  zxh(Neusoft)          G002.00.0  issue#1125課題を対応します.
 * 20230721  zxh(Neusoft)          G003.00.0  issue#1131課題を対応します.
-->
<style src="./../../static/css/AccessAuthorityRegistration/accessAuthorityRegistration.css"></style>
<script type="text/javascript" src="./../../static/js/AccessAuthorityRegistration/accessAuthorityRegistration.js"></script>

<template>
  <v-container style="width: 870px; margin-top: 60px">
    <!-- 権限種別 -->
    <v-row style="width: 556px">
      <v-col class="authTitleStyle">{{ "権限種別" }}</v-col>
      <v-col
        class="authContentStyle"
        style="border: 1px solid #9ea0aa; background: #fff"
      >
        <select
          tabindex="0"
          id="authority"
          ref="authority"
          v-model="authoritys"
          :class="{ transparentStyle: !initialized }"
          :disabled="!initialized"
          @change="changeAuthority"
          style="color:#000000"
        >
          <option
            v-for="(roleList,index) in authorityListSelect"
            :key="index"
            :value="index"
          >
            {{ roleList.displayName }}
          </option>
        </select>
        <div class="pulldownArrow"/>
      </v-col>
      <!-- G002.00.0 Delete-Start -->
      <!-- <v-col class="">
        <div>
          <v-btn color="#1ea7cb" style="width: 148px;height: 40px;margin-right: 16px;top:-6px;" @click="nameInput"
            :disabled="this.disabledNameBtn">
            <font color="white" size="4px" style="font-weight:bold;">権限名称変更</font>
          </v-btn>
        </div>
      </v-col> -->
      <!-- G002.00.0 Delete-End -->
    </v-row>

    <!-- G002.00.0 Add-Start -->
    <div style="margin-top: 30px;"/>
    <!-- 名称 -->
    <v-row style="width: 556px">
      <v-col
        v-if="authority !== 0"
        class="authTitleStyle">{{ "名称" }}</v-col>
      <v-col
        v-if="authority !== 0"
        class="authContentStyle"
        style="border: 1px solid #9ea0aa; background: #fff">
        <input
          style="border: 1px solid #9ea0aa; background: #fff;width: 354px;height: 49px; font-size: 22px;padding-left: 10px;"
          :style="brandIDErrorStyle"
          type="text"
          v-model="authorityListSelect[authority].name"
          tabindex="0"
          ref="displayName">
      </v-col>
      <div v-if="brandIDErrorShow">
        <div style="visibility: hidden !important" />
        <div style="color: red; font-size: 20px; text-align: left;margin-left: 201px;width:420px;">
          <font>{{ brandIDError }}</font>
        </div>
      </div>
    </v-row>
    <!-- G002.00.0 Add-End -->
    <!-- 業務メニュー -->
    <div v-show="authority !== 0">
      <!-- メインメニュー -->
      <!-- G001.00.0 Update-Start -->
      <!-- <div
        v-for="(mainMenu, mainIndex) in mainMenuList"
        :key="mainMenu.menuitemCd"
      > -->
      <div
        v-for="(mainMenu) in mainMenuList"
        :key="mainMenu.menuitemCd"
      >
        <!-- G001.00.0 Update-End -->
        <!-- メインメニュー用トグルスイッチ
        <div :id="'mainmenuArea' + mainIndex">
          <v-row style="width: 556px; margin-top: 30px">
            <v-col
              class="authTitleStyle"
              :class="{ lengthTitle: isLongTitle(mainMenu.menuitemCd) }"
              >{{ mainMenu.name }}</v-col
            >
            <v-col
              class="authContentStyle"
              :class="{ lengthTitle: isLongTitle(mainMenu.menuitemCd) }"
              style="padding: 8px 0 0 15px"
            >
              <label style="font-size: 20px">
                {{ "メインメニュー表示" }}
              </label>
              <div
                tabindex="0"
                class="switch scrollNone"
                @keyup.space="toggleMain(mainIndex)"
              >
                <input
                  :id="'toggle-' + mainMenu.menuitemCd"
                  class="toggleBtn toggleBtnRoundFlat"
                  type="checkbox"
                  :checked="mainMenuList[mainIndex].checked"
                  @click="toggleMain(mainIndex)"
                />
                <label
                  :for="'toggle-' + mainMenu.menuitemCd"
                  style="text-align: center"
                  ><span></span
                ></label>
              </div>
            </v-col>
          </v-row>
        </div> -->

        <!-- サブメニュー -->
        <div
          v-for="(subMenu, subIndex) in subMenuList"
          :key="subMenu.menuitemCd"
        >
          <!-- メインコードとの照会 -->
          <div
            v-if="mainMenu.mainmenuCd === subMenu.mainmenuCd"
            :id="'submenuArea' + subIndex"
          >
            <v-row style="width: 870px; margin-top: 30px">
              <v-col
                class="tableTitleStyle"
                :class="{ lengthTitle: isLongTitle(subMenu.menuitemCd) }"
              >{{ subMenu.name }}</v-col
              >
              <v-col
                class="tableContentStyle"
                :class="{ lengthTitle: isLongTitle(subMenu.menuitemCd) }"
                style="padding: 8px 0 0 15px"
              >
                <label>{{ "表示" }}</label>
                <div
                  tabindex="0"
                  class="switch scrollNone"
                  @keyup.space="toggleSub(subIndex)"
                >
                  <input
                    :id="'toggle-' + subMenu.menuitemCd"
                    class="toggleBtn toggleBtnRoundFlat"
                    type="checkbox"
                    :checked="subMenuList[subIndex].checked"
                    @click="toggleSub(subIndex)"
                  >
                  <label
                    :for="'toggle-' + subMenu.menuitemCd"
                    style="text-align: center"
                  ><span/></label>
                </div>
              </v-col>
            </v-row>

            <div
              v-show="subMenuList[subIndex].checked"
              id="businessArea">
              <!-- ヘッダー部 -->
              <v-row>
                <v-col
                  class="subMenuHeader"
                  style="width: 200px" />
                <v-col
                  class="subMenuHeader collStyle"
                  style="border-left: 1px solid #fff"
                >
                  <label>{{ "起動" }}</label>
                </v-col>
                <v-col class="subMenuHeader collStyle">
                  <label>{{ "保存" }}</label>
                </v-col>
                <v-col class="subMenuHeader collStyle">
                  <label>{{ "削除" }}</label>
                </v-col>
                <v-col class="subMenuHeader otherCollStyle">
                  <label>{{ "その他１" }}</label>
                </v-col>
                <v-col class="subMenuHeader otherCollStyle">
                  <label>{{ "その他２" }}</label>
                </v-col>
              </v-row>

              <!-- 業務メニュー コンテンツ部 -->
              <div
                v-for="(businessMenu, businessIndex) in businessMenuList"
                :key="businessMenu.menuitemCd"
              >
                <!-- コードを照合 -->
                <v-row
                  v-if="
                    mainMenu.mainmenuCd === businessMenu.mainmenuCd &&
                      subMenu.submenuCd === businessMenu.submenuCd
                  "
                  :class="{ lengthTitle: isLongTitle(businessMenu.menuitemCd) }"
                >
                  <v-col class="businessMenuHeader">
                    <div>
                      <label>{{ businessMenu.name }}</label>
                    </div>
                  </v-col>

                  <!-- 起動 -->
                  <v-col
                    class="businessMenuContent collStyle"
                    :class="{
                      transparentStyle: isButtonDisabled(
                        businessMenu.menuitemCd,
                        'Start'
                      ),
                    }"
                  >
                    <div
                      v-if="isButtonDisabled(businessMenu.menuitemCd, 'Start')"
                      class="switch scrollNone"
                      style="display: block"
                      tabindex="-1"
                    >
                      <!-- 無効 -->
                      <input
                        :id="'toggle-' + businessMenu.menuitemCd + '-S'"
                        class="toggleBtn toggleBtnRoundFlat"
                        type="checkbox"
                      >
                      <label
                        :for="'toggle-' + businessMenu.menuitemCd + '-S'"
                        style="text-align: center"
                      ><span/></label>
                    </div>
                    <div
                      v-else
                      class="switch scrollNone"
                      style="display: block"
                      tabindex="0"
                      @keyup.space="toggleBusiness(businessIndex, 'S')"
                    >
                      <!-- 有効 -->
                      <input
                        :id="'toggle-' + businessMenu.menuitemCd + '-S'"
                        class="toggleBtn toggleBtnRoundFlat"
                        type="checkbox"
                        :checked="businessMenuList[businessIndex].checked.s"
                        v-model="businessMenuList[businessIndex].checked.s"
                        @click="toggleBusiness(businessIndex, 'S')"
                      >
                      <label
                        :for="'toggle-' + businessMenu.menuitemCd + '-S'"
                        style="text-align: center"
                      ><span/></label>
                    </div>
                  </v-col>

                  <!-- 保存 -->
                  <v-col
                    class="businessMenuContent collStyle"
                    :class="{
                      transparentStyle: isButtonDisabled(
                        businessMenu.menuitemCd,
                        'Register'
                      ),
                    }"
                  >
                    <div
                      v-if="
                        isButtonDisabled(businessMenu.menuitemCd, 'Register')
                      "
                      class="switch scrollNone"
                      style="display: block"
                      tabindex="-1"
                    >
                      <!-- 無効 -->
                      <input
                        :id="'toggle-' + businessMenu.menuitemCd + '-R'"
                        class="toggleBtn toggleBtnRoundFlat"
                        type="checkbox"
                      >
                      <label
                        :for="'toggle-' + businessMenu.menuitemCd + '-R'"
                        style="text-align: center"
                      ><span/></label>
                    </div>
                    <div
                      v-else
                      class="switch scrollNone"
                      style="display: block"
                      tabindex="0"
                      @keyup.space="toggleBusiness(businessIndex, 'R')"
                    >
                      <!-- 有効 -->
                      <input
                        :id="'toggle-' + businessMenu.menuitemCd + '-R'"
                        class="toggleBtn toggleBtnRoundFlat"
                        type="checkbox"
                        :checked="businessMenuList[businessIndex].checked.r"
                        v-model="businessMenuList[businessIndex].checked.r"
                        @click="toggleBusiness(businessIndex, 'R')"
                      >
                      <label
                        :for="'toggle-' + businessMenu.menuitemCd + '-R'"
                        style="text-align: center"
                      ><span/></label>
                    </div>
                  </v-col>

                  <!-- 削除 -->
                  <v-col
                    class="businessMenuContent collStyle"
                    :class="{
                      transparentStyle: isButtonDisabled(
                        businessMenu.menuitemCd,
                        'Delete'
                      ),
                    }"
                  >
                    <div
                      v-if="isButtonDisabled(businessMenu.menuitemCd, 'Delete')"
                      class="switch scrollNone"
                      style="display: block"
                      tabindex="-1"
                    >
                      <!-- 無効 -->
                      <input
                        :id="'toggle-' + businessMenu.menuitemCd + '-D'"
                        class="toggleBtn toggleBtnRoundFlat"
                        type="checkbox"
                      >
                      <label
                        :for="'toggle-' + businessMenu.menuitemCd + '-D'"
                        style="text-align: center"
                      ><span/></label>
                    </div>
                    <div
                      v-else
                      class="switch scrollNone"
                      style="display: block"
                      tabindex="0"
                      @keyup.space="toggleBusiness(businessIndex, 'D')"
                    >
                      <!-- 有効 -->
                      <input
                        :id="'toggle-' + businessMenu.menuitemCd + '-D'"
                        class="toggleBtn toggleBtnRoundFlat"
                        type="checkbox"
                        :checked="businessMenuList[businessIndex].checked.d"
                        v-model="businessMenuList[businessIndex].checked.d"
                        @click="toggleBusiness(businessIndex, 'D')"
                      >
                      <label
                        :for="'toggle-' + businessMenu.menuitemCd + '-D'"
                        style="text-align: center"
                      ><span/></label>
                    </div>
                  </v-col>

                  <!-- その他1 -->
                  <v-col
                    class="businessMenuContent otherCollStyle"
                    :class="{
                      transparentStyle: isButtonDisabled(
                        businessMenu.menuitemCd,
                        'Other1'
                      ),
                    }"
                    style="padding: 8px 0 0 8px"
                  >
                    <div
                      style="
                        width: 122px;
                        height: 40px;
                        text-align: initial;
                        float: left;
                      "
                    >
                      <label>{{
                        getOtherLabel(businessMenu.menuitemCd, 1)
                      }}</label>
                    </div>

                    <div
                      v-if="isButtonDisabled(businessMenu.menuitemCd, 'Other1')"
                      class="switch scrollNone"
                      style="display: block; margin-left: 122px"
                      tabindex="-1"
                    >
                      <!-- 無効 -->
                      <input
                        :id="'toggle-' + businessMenu.menuitemCd + '-O1'"
                        class="toggleBtn toggleBtnRoundFlat"
                        type="checkbox"
                      >
                      <label
                        :for="'toggle-' + businessMenu.menuitemCd + '-O1'"
                        style="text-align: center"
                      ><span/></label>
                    </div>
                    <div
                      v-else
                      class="switch scrollNone"
                      style="display: block; margin-left: 122px"
                      tabindex="0"
                      @keyup.space="toggleBusiness(businessIndex, 'O1')"
                    >
                      <!-- 有効 -->
                      <input
                        :id="'toggle-' + businessMenu.menuitemCd + '-O1'"
                        class="toggleBtn toggleBtnRoundFlat"
                        type="checkbox"
                        :checked="businessMenuList[businessIndex].checked.o1"
                        v-model="businessMenuList[businessIndex].checked.o1"
                        @click="toggleBusiness(businessIndex, 'O1')"
                      >
                      <label
                        :for="'toggle-' + businessMenu.menuitemCd + '-O1'"
                        style="text-align: center"
                      ><span/></label>
                    </div>
                  </v-col>

                  <!-- その他2 -->
                  <v-col
                    class="businessMenuContent otherCollStyle"
                    :class="{
                      transparentStyle: isButtonDisabled(
                        businessMenu.menuitemCd,
                        'Other2'
                      ),
                    }"
                    style="padding: 8px 0 0 8px"
                  >
                    <div
                      style="
                        width: 122px;
                        height: 40px;
                        text-align: initial;
                        float: left;
                      "
                    >
                      <label>{{
                        getOtherLabel(businessMenu.menuitemCd, 2)
                      }}</label>
                    </div>

                    <div
                      v-if="isButtonDisabled(businessMenu.menuitemCd, 'Other2')"
                      class="switch scrollNone"
                      style="display: block; margin-left: 122px"
                      tabindex="-1"
                    >
                      <!-- 無効 -->
                      <input
                        :id="'toggle-' + businessMenu.menuitemCd + '-O2'"
                        class="toggleBtn toggleBtnRoundFlat"
                        type="checkbox"
                      >
                      <label
                        :for="'toggle-' + businessMenu.menuitemCd + '-O2'"
                        style="text-align: center"
                      ><span/></label>
                    </div>
                    <div
                      v-else
                      class="switch scrollNone"
                      style="display: block; margin-left: 122px"
                      tabindex="0"
                      @keyup.space="toggleBusiness(businessIndex, 'O2')"
                    >
                      <!-- 有効 -->
                      <input
                        :id="'toggle-' + businessMenu.menuitemCd + '-O2'"
                        class="toggleBtn toggleBtnRoundFlat"
                        type="checkbox"
                        :checked="businessMenuList[businessIndex].checked.o2"
                        v-model="businessMenuList[businessIndex].checked.o2"
                        @click="toggleBusiness(businessIndex, 'O2')"
                      >
                      <label
                        :for="'toggle-' + businessMenu.menuitemCd + '-O2'"
                        style="text-align: center"
                      ><span/></label>
                    </div>
                  </v-col>
                </v-row>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- その他ダイアログ等 -->
    <v-row style="width: 100%">
      <v-col>
        <maint-button
          @close="closeTab"
          @fixed="fixedTab"
          @clear="clearTab"
          @csvInput="csvInput"
          @csvOutput="csvOutput"
          :isfixed-btn="disabledFixedBtn"
          :isclear-btn="disabledClearBtn"
          :iscsv-input-btn="disabledCsvInputBtn"
          :iscsv-output-btn="disabledCsvOutputBtn"
        />
      </v-col>
    </v-row>
    <input
      id="csvInputFileSelect"
      style="display: none"
      ref="csvInputFileSelect"
      type="file"
      accept=".csv"
      @change="selectedInputFile()"
    >
    <popup ref="pop" />
    <!-- KSD V001.000 DS -->
    <!-- <csv-dialog -->
    <!--  ref="csvDialog" -->
    <!--  @clickSubmit="dialogConfirm()" -->
    <!--  @changeName="changeName"/> -->
    <!-- KSD V001.000 DE -->
    <!-- KSD V001.000 AS -->
    <csv-dialog
      ref="csvDialog"
      @clickSubmit="dialogConfirm()"
      @changeName="changeName"
      :dialogType="'accessAuthorityRegistration'"/>
    <!-- KSD V001.000 AE -->
    <edit-dialog
      ref="editDialog"
      @clickSubmit="dialogConfirm()"
      @changeName="changeName" />
  </v-container>
</template>
