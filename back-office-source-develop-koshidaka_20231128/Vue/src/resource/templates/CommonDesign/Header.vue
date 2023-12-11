<script type="text/javascript" src="./../../static/js/CommonDesign/header.js"></script>
<style src="./../../static/css/CommonDesign/header.css"></style>
<template>
  <div>
    <!-- KSD V001.000 AS -->
    <div
      class="logo-header"
      v-if="this.$root.winId === 'O00001'">
      <v-toolbar class="logo-bar">
        <v-row no-gutters>
          <v-col class="logo">
            <a
              href="https://www.global.toshiba/jp/top.html"
              target="_blank">
              <img
                class="logo-img"
                src="@/assets/image/toshiba_logo.gif">
            </a>
            <div class="logo-text">{{ $t("O00001.S024") }}</div>
          </v-col>
          <v-col class="contact-us">
            <a
              class="contact-us-link"
              href="https://www.toshibatec.co.jp/contacts/products/product_form.html"
              target="_blank">
              <span class="question-icon"><question-icon/></span>
              <span class="contact-us-text">{{ $t("O00001.S025") }}</span>
            </a>
          </v-col>
        </v-row>
      </v-toolbar>
    </div>
    <div
      class="following-header1"
      v-if="this.$root.winId === 'O00001'">
      <v-row>
        <v-toolbar id="menubar" dense>
          <!-- 日付/時刻表示部 -->
          <v-col id="product-name">
            <div class="date-header">{{ date }}</div>
            <div>{{ time }}</div>
          </v-col>
          <!-- 画面タイトル -->
          <v-col id="bussiness-name">{{ this.$root.title }}</v-col>
          <!-- 右側のコンテンツ -->
          <div style="display: flex;">
            <!-- ドロワメニュー -->
            <v-col
              id="menu-header"
              v-if="this.$root.winId !== 'O00001' && this.$root.winId !== 'O00002'">
              <a @click='openModal'>
                <img
                  id="drawer"
                  @mouseover='changeImg("drawer")'
                  @mouseleave='returnImg("drawer")'
                  src="@/assets/ico_drawer_n.png"/>
              </a>
            </v-col>
            <!-- ログアウト -->
            <v-col
              id="logout-content"
              v-if="this.$root.winId === 'O00002'" @click='logout'>
              <a>
                <span class='exit-icon-color'>{{ $t("O00004.S012") }}</span>
                <img src="@/assets/tab_icon_drawer07.png"/>
              </a>
            </v-col>
          </div>
        </v-toolbar>
      </v-row>
      <div
        id="drawer-menu"
        v-show="showContent"
        @click.self='closeModal'>
        <div id="drawer-content">
          <div id="sysver-range">
            <p style="width:100%;"></p>
            <p class="sysver">
              <span class='version-color'>ver.{{ users.applicationVersion }}</span>
            </p>
            <p
              class="icon-range"
              @click='closeModal'>
              <a>
                <img
                  id="drawer-close"
                  @mouseover='changeImg("drawer-close")'
                  @mouseleave='returnImg("drawer-close")'
                  src="@/assets/ico_drawerclose_n.png"/>
              </a>
            </p>
          </div>
          <div id="user-range">
            <table>
              <tr>
                <td
                  rowspan="2"
                  style="vertical-align: top;">
                  <img src="@/assets/ico_drawer02.png"/>
                </td>
                <td>{{ $t("O00004.S001") }}{{ users.userCode }}</td>
              </tr>
              <tr><td>{{ $t("O00004.S002") }}{{ users.userName }}</td></tr>
            </table>
            <table>
              <tr>
                <td rowspan="3" style="vertical-align: top;"><img src="@/assets/ico_drawer03.png" /></td>
                <td>{{ $t("O00004.S013") }}{{ users.businessUnitName }}</td>
              </tr>
              <tr v-if="users.headquartersAuthority === 0 ">
                <td>{{ $t("O00004.S014") }}<span class="NumericStyle">{{ users.belongStoreCd }}</span></td>
              </tr>
              <tr v-if="users.headquartersAuthority === 0 ">
                <td>{{ $t("O00004.S015") }}{{ users.belongStoreName }}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <popup ref="pop"/>
    </div>
    <!-- KSD V001.000 AE -->
    <!-- KSD V001.000 MS -->
    <!-- <div class="following-header"> -->
    <div class="following-header" v-if="this.$root.winId !== 'O00001'">
    <!-- KSD V001.000 ME -->
      <v-row>
        <v-toolbar id="menubar" dense>
          <!-- 日付/時刻表示部 -->
          <v-col id="product-name">
            <div class="date-header">{{ date }}</div>
            <div>{{ time }}</div>
          </v-col>
          <!-- 画面タイトル -->
          <v-col id="bussiness-name">{{ this.$root.title }}</v-col>
          <!-- 右側のコンテンツ -->
          <div style="display: flex;">
            <!-- ヘルプ -->
            <v-col id="menu-header" v-if="this.$root.winId !== 'O00001'">
              <!-- <a @click='helpFunction'> -->
              <a >
                <img id="help" @mouseover='changeImg("help")' @mouseleave='returnImg("help")' src="@/assets/ico_help_n.png"/>
              </a>
            </v-col>
            <!-- ドロワメニュー -->
            <v-col id="menu-header" v-if="this.$root.winId !== 'O00001' && this.$root.winId !== 'O00002'">
              <a @click='openModal'>
                <img id="drawer" @mouseover='changeImg("drawer")' @mouseleave='returnImg("drawer")' src="@/assets/ico_drawer_n.png" />
              </a>
            </v-col>
            <!-- ログアウト -->
            <v-col id="logout-content" v-if="this.$root.winId === 'O00002'" @click='logout'>
              <a>
                <span class='exit-icon-color'>{{ $t("O00004.S012") }}</span>
                <img src="@/assets/tab_icon_drawer07.png" />
              </a>
            </v-col>
          </div>
        </v-toolbar>
      </v-row>
      <div id="drawer-menu" v-show="showContent" @click.self='closeModal'>
        <div id="drawer-content">
          <div id="sysver-range">
            <p style="width:100%;"></p>
            <p class="sysver"><span class='version-color'>ver.{{ users.applicationVersion }}</span></p>
            <p class="icon-range" @click='closeModal'><a><img id="drawer-close" @mouseover='changeImg("drawer-close")' @mouseleave='returnImg("drawer-close")' src="@/assets/ico_drawerclose_n.png" /></a></p>
          </div>
          <div id="user-range">
            <table>
              <tr>
                <td rowspan="2" style="vertical-align: top;"><img src="@/assets/ico_drawer02.png" /></td>
                <td>{{ $t("O00004.S001") }}{{ users.userCode }}</td>
              </tr>
              <tr><td>{{ $t("O00004.S002") }}{{ users.userName }}</td></tr>
            </table>
            <table>
              <tr>
                <td rowspan="3" style="vertical-align: top;"><img src="@/assets/ico_drawer03.png" /></td>
                <td>{{ $t("O00004.S013") }}{{ users.businessUnitName }}</td>
              </tr>
              <tr v-if="users.headquartersAuthority === 0 "><td>{{ $t("O00004.S014") }}<span class="NumericStyle">{{ users.belongStoreCd }}</span></td></tr>
              <tr v-if="users.headquartersAuthority === 0 "><td>{{ $t("O00004.S015") }}{{ users.belongStoreName }}</td></tr>
            </table>
          </div>
        </div>
      </div>
      <popup ref="pop"/>
    </div>
    <!-- KSD V001.000 AE -->
    <!-- KSD V001.000 MS -->
    <!-- <div class="following-header"> -->
    <div class="following-header" v-if="this.$root.winId !== 'O00001'">
    <!-- KSD V001.000 ME -->
      <v-row>
        <v-toolbar
          id="menubar"
          dense>
          <!-- 日付/時刻表示部 -->
          <v-col id="product-name">
            <div class="date-header">{{ date }}</div>
            <div>{{ time }}</div>
          </v-col>
          <!-- 画面タイトル -->
          <v-col id="bussiness-name">{{ this.$root.title }}</v-col>
          <!-- 右側のコンテンツ -->
          <div style="display: flex;">
            <!-- ヘルプ -->
            <!-- KSD V001.000 MS -->
            <!-- <v-col id="menu-header"> -->
            <!-- KSD V001.000 DS -->
            <!-- <v-col id="menu-header" v-if="this.$root.winId !== 'O00001'"> -->
            <!-- KSD V001.000 ME -->
              <!-- <a @click='helpFunction'> -->
              <!-- <a> -->
                <!-- <img -->
                  <!-- id="help" -->
                  <!-- @mouseover='changeImg("help")' -->
                  <!-- @mouseleave='returnImg("help")' -->
                  <!-- src="@/assets/ico_help_n.png"> -->
              <!-- </a> -->
            <!-- </v-col> -->
            <!-- KSD V001.000 DE -->
            <!-- ドロワメニュー -->
            <v-col
              id="menu-header"
              v-if="this.$root.winId !== 'O00001' && this.$root.winId !== 'O00002'">
              <a @click='openModal'>
                <img
                  id="drawer"
                  @mouseover='changeImg("drawer")'
                  @mouseleave='returnImg("drawer")'
                  src="@/assets/ico_drawer_n.png" >
              </a>
            </v-col>
            <!-- ログアウト -->
            <v-col
              id="logout-content"
              v-if="this.$root.winId === 'O00002'"
              @click='logout'>
              <a>
                <font color ="white">{{ $t("O00004.S012") }}</font>
                <img src="@/assets/tab_icon_drawer07.png" >
              </a>
            </v-col>
          </div>
        </v-toolbar>
      </v-row>
      <div
        id="drawer-menu"
        v-show="showContent"
        @click.self='closeModal'>
        <div id="drawer-content">
          <div id="sysver-range">
            <p style="width:100%;"/>
            <p class="sysver"><font color="#27B6DB">ver.{{ users.applicationVersion }}</font></p>
            <p
              class="icon-range"
              @click='closeModal'><a><img
                id="drawer-close"
                @mouseover='changeImg("drawer-close")'
                @mouseleave='returnImg("drawer-close")'
                src="@/assets/ico_drawerclose_n.png" ></a></p>
          </div>
          <div id="user-range">
            <table>
              <tr>
                <td
                  rowspan="2"
                  style="vertical-align: top;"><img src="@/assets/ico_drawer02.png" ></td>
                <td>{{ $t("O00004.S001") }}{{ users.userCode }}</td>
              </tr>
              <tr><td>{{ $t("O00004.S002") }}{{ users.userName }}</td></tr>
            </table>
            <table>
              <tr>
                <td
                  rowspan="3"
                  style="vertical-align: top;"><img src="@/assets/ico_drawer03.png" ></td>
                <td>{{ $t("O00004.S013") }}{{ users.businessUnitName }}</td>
              </tr>
              <tr v-if="users.headquartersAuthority === 0 "><td>{{ $t("O00004.S014") }}<font class="NumericStyle">{{ users.belongStoreCd }}</font></td></tr>
              <tr v-if="users.headquartersAuthority === 0 "><td>{{ $t("O00004.S015") }}{{ users.belongStoreName }}</td></tr>
            </table>
          </div>
        </div>
      </div>
      <popup ref="pop"/>
    </div>
  </div>
</template>
