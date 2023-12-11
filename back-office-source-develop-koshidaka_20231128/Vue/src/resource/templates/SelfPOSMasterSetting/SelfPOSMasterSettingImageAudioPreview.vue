<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/SelfPOSMasterSetting/selfPOSMasterSettingImageAudioPreview.css"></style>
<script type="text/javascript" src="@/resource/static/js/SelfPOSMasterSetting/selfPOSMasterSettingImageAudioPreview.js"></script>
<template>
  <div class="self-pos-master-setting-preview-container">
    <!-- 画像音声ファイル設定 -->
    <v-row>
      <v-col cols="9">
        <form-group-layout
          :header-cols="5"
          :body-cols="6"
          :title="$t('C00222.S075')"
        >
          <select-input
            class="form-control"
            v-model="settingItemFileName"
            :options="isPulldown == true ? settingItemFileNameOptions : selectOptions"
            :empty-option="false"
            @mousedown="pulldownSelect"
          />
        </form-group-layout>
      </v-col>
    </v-row>
    <v-row class="mt-0">
      <v-col>
        <div
          class="image-container"
          v-show="settingItemFileName != null && !pulldownError">
          <video
            autoplay
            loop
            :muted="!filePlay"
            :src="resolveFileSourceCommon('ksdtaikiseidougaimagefilename')"
            v-show="resolveFileSourceCommon('ksdtaikiseidougaimagefilename') != null"
            v-if="settingItemFileName == 'ksdtaikiseidougaimagefilename'"/>
          <img
            :src="resolveFileSourceCommon('ksdomiokuriImagefilename')"
            v-show="resolveFileSourceCommon('ksdomiokuriImagefilename') != null"
            v-if="settingItemFileName == 'ksdomiokuriImagefilename' &&
            isImage('ksdomiokuriImagefilename')">
          <video
            autoplay
            loop
            :muted="!filePlay"
            :src="resolveFileSourceCommon('ksdomiokuriImagefilename')"
            v-show="resolveFileSourceCommon('ksdomiokuriImagefilename') != null"
            v-if="settingItemFileName == 'ksdomiokuriImagefilename' &&
            !isImage('ksdomiokuriImagefilename')"/>
          <div
            class="audio-container"
            v-show="resolveFileSourceCommon('ksdomiokurivoicefilename') != null"
            v-if="settingItemFileName == 'ksdomiokurivoicefilename'" >
            <span class="audio-text">{{ $t("C00222.S076") }}</span>
            <audio
              autoplay
              loop
              :muted="!filePlay"
              :src="resolveFileSourceCommon('ksdomiokurivoicefilename')"/>
          </div>
          <img
            :src="resolveFileSourceIndividual('ksdtaikiseishigaimagefilename')"
            v-show="resolveFileSourceIndividual('ksdtaikiseishigaimagefilename') != null"
            v-if="settingItemFileName == 'ksdtaikiseishigaimagefilename'">
          <img
            :src="resolveFileSourceIndividual('ksdallcpiconiImagefilename')"
            v-show="resolveFileSourceIndividual('ksdallcpiconiImagefilename') != null"
            v-if="settingItemFileName == 'ksdallcpiconiImagefilename'">
          <img
            :src="resolveFileSourceIndividual('ksdallcticoniImagefilename')"
            v-show="resolveFileSourceIndividual('ksdallcticoniImagefilename') != null"
            v-if="settingItemFileName == 'ksdallcticoniImagefilename'">
        </div>
        <div
          class="image-container"
          v-show="pulldownError"/>
      </v-col>
    </v-row>
    <popup ref="pop"/>
  </div>
</template>
<!-- KSD V001.000 AE -->
