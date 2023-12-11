<style src="./../../static/css/CommonDesign/popup.css"></style>
<script type="text/javascript" src="./../../static/js/CommonDesign/popup.js"></script>

 <!--
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230116  litie(Neusoft)    G001.00.0  issue課題#835を対応します.
-->

<template>
  <div
    class="text-center"
    style="z-index:600;">
    <v-dialog
      v-model="dialog"
      persistent>
      <v-card
        class="basesize"
        style="height:auto;">
        <v-card-title
          class="headline"
          :class="getBorderColorClass()">
          <font class="popup-title"><b>{{ title }}</b></font>
        </v-card-title>

        <v-card-text class="popup-content">
          <div class="popup-inner-content">
            <div
              class="popup-status"
              v-if="!isNonDispStatus">
              <!-- G001.00.0 Update-Start -->
              <!-- <v-img class="popup-icon" :class="code !== '' ? 'popup-code' : 'popup-non-code'" v-bind:src="getIconSrc()" max-height="70" max-width="70" v-if="mode !== 4"></v-img>
                        <div class="loader" v-if="mode === 4"></div> -->
              <v-img
                class="popup-icon"
                :class="code !== '' ? 'popup-code' : 'popup-non-code'"
                :src="getIconSrc()"
                max-height="70"
                max-width="70"
                v-if="mode !== 4 && mode !== 5"/>
              <div
                class="loader"
                v-if="mode === 4 || mode === 5"/>
              <!-- G001.00.0 Update-End -->
              <p
                class="const-code"
                v-if="code !== ''">ｺｰﾄﾞ:<span>{{ code }}</span></p>
            </div>
            <div class="popup-message">
              <!-- KSD V001.000 DS -->
              <!-- <p v-html="message"/> -->
              <!-- KSD V001.000 DE -->
              <!-- KSD V001.000 AS -->
              <p
                v-html="message"
                :style="`overflow-y: ${yscroll};`"
              />
              <!-- KSD V001.000 AE -->
            </div>
          </div>
        </v-card-text>

        <v-card-actions class="popup-fotter">
          <v-spacer/>
          <v-btn
            class="button popup-fotter-button-gray"
            @click="backFunction()"
            v-if="isBackBtn"
            id="popupBtBack"
            tabindex="500"
          >
            {{ $t("O00004.S003") }}
          </v-btn>
          <!-- G001.00.0 Update-Start -->
          <!-- <v-btn
                    class="button"
                    v-if="mode !== 4"
                    v-bind:class="getFotterButtonClass()"
                    @click="exeFunction()"
                    id="popupBtExe"
                    tabindex="501"
                >
                    {{ $t("O00004.S005") }}
                </v-btn> -->
          <v-btn
            class="button"
            v-if="mode !== 4 && mode !== 5"
            :class="getFotterButtonClass()"
            @click="exeFunction()"
            id="popupBtExe"
            tabindex="501"
          >
            {{ $t("O00004.S005") }}
          </v-btn>
          <v-btn
            class="button popup-fotter-button-blue"
            @click="stopFunction()"
            v-if="mode === 5"
            id="popupBtStop"
            tabindex="502"
          >
            {{ $t("O00004.S076") }}
          </v-btn>
          <!-- G001.00.0 Update-End -->
          <button
            type="hidden"
            v-if="mode === 4"
            id="hiddenInput"
            tabindex="500" />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
