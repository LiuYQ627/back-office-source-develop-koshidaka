<style src="./../../static/css/Top/topPage.css"></style>
<script type="text/javascript" src="./../../static/js/Top/topPage.js"></script>
<template>
  <div style="height: 100%;padding-top: 50px;">
    <div id="menu">
      <perfect-scrollbar>
        <ul
          style="list-style:none;"
          class="menuUl">
          <li
            v-for="val in mainMenuMap"
            :key="val.mainmenuCd"
            color="#1ea7cb"
            style="text-align: left;">
            <v-hover v-slot:default="{ hover }">
              <v-chip
                :color="subMenuId === val.mainmenuCd ? '#f2f3f5' : hover ? '#b8e2f5':'#1ea7cb'"
                :text-color="subMenuId === val.mainmenuCd ? '#1ea7cb' : hover ?'#1ea7cb':'white'"
                :id="subMenuId === val.mainmenuCd ? 'selectChips' : 'chips'"
                @click="portalMenu(val.mainmenuCd)"
                class="mt-5"
                :ref="'chip'+val.mainmenuCd"
              >
                <v-icon v-if="val.mainmenuCd === 1">
                  mdi-chat-alert
                </v-icon>
                <v-icon v-if="val.mainmenuCd === 2">
                  mdi-settings
                </v-icon>
                <v-icon v-if="val.mainmenuCd > 2">
                  mdi-office-building
                </v-icon>
                <font style="font-size:22px;margin-left:12px;font-weight: normal">
                  {{ val.name }}
                </font>
              </v-chip>
            </v-hover>
          </li>
        </ul>
      </perfect-scrollbar>
    </div>
    <div id="menuContent">
      <div>
        <div
          id="divcenter"
          v-if="subMenuId === 1">
          <img src="@/assets/image/5_web.png">
        </div>
        <div id="menuArea">
          <div
            v-for="[key, val] in getSubManu()"
            :key="key">
            <table class="subTable">
              <!-- sub -->
              <tr><th class="titleLabel"><font>{{ val.name }}</font></th></tr>
              <!-- busi -->
              <tr
                v-for="business in getBusinessMenu(key)"
                :key="business.menuitemCd"
                @click="forword(business.menuitemCd,business.name)">
                <td class="linkedLabel"><font>{{ business.name }}</font></td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
    <popup ref="pop"/>
  </div>
</template>
