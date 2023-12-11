<style scoped src="@/resource/static/css/PresetMaster/dialogPresetImageSearch.css"/>
<script type="text/javascript" src="@/resource/static/js/PresetMaster/dialogPresetImageSearch.js"/>
<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="1147px !important"
      persistent>
      <v-card class="presetImageBasesize">
        <!-- ダイアログタイトル部 -->
        <v-card-title class="headline dialog-line-blue">
          <font class="dialog-title">{{ title }}</font>
        </v-card-title>
        <!-- ダイアログコンテンツ部 -->
        <v-card-text
          class="presetContentStyle"
          style="padding-bottom: 0;">
          <div id="scrollInformation">
            <div
              v-for="(image,index) in images"
              :key="index"
              @click="onClickImage(image, index)"
              class="image-box"
              :class="index === selectedIndex? 'selectedCellStyle' : ''">
              <img
                :src="image.preSignedUrl"
                style="filter: drop-shadow(2px 3px 3px rgba(0,0,0,0.2));width: 130px;height: 130px;">
              <div
                class="ribbon"
                v-if="image.ribbon"/>
              <div class="nameStyle"><span>
                <font color="black">{{ image.fileName }}</font>
              </span></div>
            </div>
          </div>
        </v-card-text>
        <!-- ダイアログヘッダー部 -->
        <v-card-actions class="dialog-fotter">
          <v-spacer/>
          <div style="position: absolute;">
            <v-btn
              class="button dialog-fotter-button-blue footerButtonStyle"
              @click="onClickimageAdd()"
              tabindex="301"
              id="imageAddBtn"
              style="font-weight: normal;">
              {{ $t("F00002.S060") }}
            </v-btn>
            <v-btn
              class="button dialog-fotter-button-blue footerButtonStyle"
              @click="onClickimageDelete(imageInformation)"
              :disabled="isDisabledForDeleteBtn()"
              tabindex="302"
              style="font-weight: normal;">
              {{ $t("F00002.S071") }}
            </v-btn>
          </div>
          <v-btn
            class="button dialog-fotter-button-gray footerButtonStyle"
            @click="onClickReturn()"
            tabindex="303">
            {{ $t("O00004.S003") }}
          </v-btn>
          <v-btn
            class="button dialog-fotter-button-orange footerButtonStyle"
            @click="onClickOk()"
            :disabled="imageInformation.fileName === initImageInfo.fileName"
            tabindex="304">
            {{ $t("O00004.S004") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <popup ref="pop" />
    <form @submit.prevent="imageUpload">
      <input
        id="imgFileSelect"
        style="display: none"
        ref="imgFileSelect"
        type="file"
        @change="selectedFile">
      <input
        type="submit"
        style="display: none">
    </form>
  </div>
</template>
