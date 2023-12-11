<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/SelfPOSMasterSetting/selfPOSMasterSettingCustomerFilePreview.css"></style>
<script type="text/javascript" src="@/resource/static/js/SelfPOSMasterSetting/selfPOSMasterSettingCustomerFilePreview.js"></script>
<template>
  <div class="self-pos-master-setting-preview-container">
    <!-- 客面ファイル設定 -->
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
            :src="resolveFileSourceCommon('ksdtaikiseidougacartoonfilename')"
            v-show="resolveFileSourceCommon('ksdtaikiseidougacartoonfilename') != null"
            v-if="settingItemFileName == 'ksdtaikiseidougacartoonfilename'"/>
          <img
            :src="resolveFileSourceIndividual('ksdtaikiseishigaimagefilename1')"
            v-show="resolveFileSourceIndividual('ksdtaikiseishigaimagefilename1') != null"
            v-if="settingItemFileName == 'ksdtaikiseishigaimagefilename1'">
          <img
            :src="resolveFileSourceIndividual('ksdtaikiseishigaimagefilename2')"
            v-show="resolveFileSourceIndividual('ksdtaikiseishigaimagefilename2') != null"
            v-if="settingItemFileName == 'ksdtaikiseishigaimagefilename2'">
          <img
            :src="resolveFileSourceIndividual('ksdtaikiseishigaimagefilename3')"
            v-show="resolveFileSourceIndividual('ksdtaikiseishigaimagefilename3') != null"
            v-if="settingItemFileName == 'ksdtaikiseishigaimagefilename3'">
          <img
            :src="resolveFileSourceIndividual('ksdtaikiseishigaimagefilename4')"
            v-show="resolveFileSourceIndividual('ksdtaikiseishigaimagefilename4') != null"
            v-if="settingItemFileName == 'ksdtaikiseishigaimagefilename4'">
          <img
            :src="resolveFileSourceIndividual('ksdtaikiseishigaimagefilename5')"
            v-show="resolveFileSourceIndividual('ksdtaikiseishigaimagefilename5') != null"
            v-if="settingItemFileName == 'ksdtaikiseishigaimagefilename5'">
          <img
            :src="resolveFileSourceIndividual('ksdtaikiseishigaimagefilename6')"
            v-show="resolveFileSourceIndividual('ksdtaikiseishigaimagefilename6') != null"
            v-if="settingItemFileName == 'ksdtaikiseishigaimagefilename6'">
          <img
            :src="resolveFileSourceIndividual('ksdtaikiseishigaimagefilename7')"
            v-show="resolveFileSourceIndividual('ksdtaikiseishigaimagefilename7') != null"
            v-if="settingItemFileName == 'ksdtaikiseishigaimagefilename7'">
          <img
            :src="resolveFileSourceIndividual('ksdtaikiseishigaimagefilename8')"
            v-show="resolveFileSourceIndividual('ksdtaikiseishigaimagefilename8') != null"
            v-if="settingItemFileName == 'ksdtaikiseishigaimagefilename8'">
          <img
            :src="resolveFileSourceIndividual('ksdtaikiseishigaimagefilename9')"
            v-show="resolveFileSourceIndividual('ksdtaikiseishigaimagefilename9') != null"
            v-if="settingItemFileName == 'ksdtaikiseishigaimagefilename9'">
          <img
            :src="resolveFileSourceIndividual('ksdtaikiseishigaimagefilename10')"
            v-show="resolveFileSourceIndividual('ksdtaikiseishigaimagefilename10') != null"
            v-if="settingItemFileName == 'ksdtaikiseishigaimagefilename10'">
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
