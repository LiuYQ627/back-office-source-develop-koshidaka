<style src="./../../static/css/CommonDesign/mainButton.css"></style>
<script type="text/javascript" src="./../../static/js/CommonDesign/maintButton.js"></script>
<template>
  <div>
    <div
      id="scrl-button"
      :class='{"open-side-scrl":!isOpen}'>
      <a v-show="scrollButtonActive">
        <img
          id="scrl"
          @click="returnTop"
          @mouseover='changeImg("scrl")'
          @mouseleave='returnImg("scrl")'
          src="@/assets/btn_scrl_jump_n.png" >
      </a>
    </div>
    <div
      id="maint-button-bar-outer"
      :class='{"open-side":isOpen}'>
      <div id="maint-button-bar-inner">
        <!-- スクロール領域 -->
        <div class="maint-scroll">
          <div id="side-button" >
            <!-- 終了ボタン -->
            <!-- KSD V001.000 MS -->
            <!-- <v-btn -->
            <!--   id="bt-exit" -->
            <!--   @click="closeTab" -->
            <!--   v-show="isOpen">{{ $t("O00004.S007") }}</v-btn> -->
            <v-btn
              id="bt-exit"
              @click="closeTab"
              v-show="isOpen"
              :disabled="isCloseDisabled">
              {{ $t("O00004.S007") }}
            </v-btn>
            <!-- KSD V001.000 ME -->
            <!-- その他ボタン -->
            <div
              v-show="subArea&&isOpen"
              style="padding-right: 15px;">
              <v-btn
                v-for="(subAreaData, index) in subAreaDatas"
                :key="index"
                :id="subAreaData.param"
                :class="subAreaData.class"
                :disabled="buttonDisableds[subAreaData.bindName]"
                @click="handleFunctionCall(subAreaData.param)">
                {{ subAreaData.btnName }}
              </v-btn>
            </div>
          </div>
          <div id="side-arrow">
            <a
              class="arrow-range arrow"
              id="bt-open"
              @click="toggleAccordion"
              :class='{open:isOpen}'/>
          </div>
        </div>
      </div>
      <popup ref="pop"/>
    </div>
  </div>
</template>
