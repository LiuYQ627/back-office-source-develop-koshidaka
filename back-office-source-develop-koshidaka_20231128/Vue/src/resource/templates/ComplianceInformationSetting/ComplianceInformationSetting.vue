<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/CommonDesign/utils.css"></style>
<style scoped src="@/resource/static/css/ComplianceInformationSetting/complianceInformationSetting.css"></style>
<script type="text/javascript" src="@/resource/static/js/ComplianceInformationSetting/complianceInformationSetting.js"></script>
<template>
  <v-container class="container">
    <!-- 店舗選択エリア -->
    <form-group-layout
      fixedHeader
      :headerWidth="146"
      :title="$t('C00210.S001')"
      class="mb-30"
    >
      <!-- 対象店舗は「店舗コード:店舗名称」の形式で表示する -->
      <store-select
        hasCodeName
        v-model="targetStoreCodes"
        headquartersAuthorityCheckEnable
        ref="storeSelect"
        @change="handleStoreSelectChange"
      />
    </form-group-layout>
    <!-- 画像設定欄 -->
    <div v-show="!disabledFixedBtn && isShowImageSettingPanel">
      <v-row no-gutters>
        <v-col>
          <v-row class="ma-0 mb-30">
            <!-- 言語選択 -->
            <v-col class="py-0 pl-0">
              <form-group-layout
                :headerCols="5"
                :bodyCols="7"
                :title="$t('C00210.S002')"
                class="languageSelectSpan"
              >
                <select-input
                  id="languageSelected"
                  :emptyOption="false"
                  :options="languageSelectOptions"
                  :value="selectedLanguage"
                  @input="handleLanguageSelectionInput"
                />
              </form-group-layout>
            </v-col>

            <!-- 言語名称 -->
            <v-col class="py-0 pr-0">
              <form-group-layout
                :headerCols="5"
                :bodyCols="7"
                :title="$t('C00210.S032')"
                class="language-name"
              >
                <text-input
                  v-if="selectedLanguage > 0"
                  type="text"
                  class="form-control"
                  maxlength="14"
                  :maxByteLength="14"
                  v-model="selectedLanguageName"
                  :placeholder="$t('C00210.S033')"
                />
                <text-input
                  v-else
                  type="text"
                  class="form-control"
                  disabled
                />
              </form-group-layout>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col>
              <!-- TABLE -->
              <table class="compliance-information-setting-image-setting-table">
                <thead>
                  <tr>
                    <th width="60%">{{ $t("C00210.S003") }}</th>
                    <th width="40%" colspan="2">{{ $t("C00210.S004") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td width="60%">{{ $t("C00210.S005") }}</td>
                    <td width="20%" v-if="fileStatus[0] === false">{{ getProvisionsImageFileStatus(1) }}</td>
                    <td width="20%" v-if="fileStatus[0] === true">
                      <span class="cross-icon"><cross-icon/></span>
                    </td>
                    <td width="20%">
                      <file-input
                        @change="handleImageUpload($event, 1)"
                        :title="$t('C00210.S030')"
                        :disabled="selectedLanguage === null"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>{{ $t("C00210.S006") }}</td>
                    <td v-if="fileStatus[1] === false">{{ getProvisionsImageFileStatus(2) }}</td>
                    <td v-if="fileStatus[1] === true">
                      <span class="cross-icon"><cross-icon/></span>
                    </td>
                    <td>
                      <file-input
                        @change="handleImageUpload($event, 2)"
                        :title="$t('C00210.S030')"
                        :disabled="selectedLanguage === null"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>{{ $t("C00210.S007") }}</td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td class="indent-content">{{ $t("C00210.S009") }}</td>
                    <td v-if="fileStatus[2] === false">{{ getProvisionsImageFileStatus(3) }}</td>
                    <td v-if="fileStatus[2] === true">
                      <span class="cross-icon"><cross-icon/></span>
                    </td>
                    <td>
                      <file-input
                        @change="handleImageUpload($event, 3)"
                        :title="$t('C00210.S030')"
                        :disabled="selectedLanguage === null"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td class="indent-content">{{ $t("C00210.S010") }}</td>
                    <td v-if="fileStatus[3] === false">{{ getProvisionsImageFileStatus(4) }}</td>
                    <td v-if="fileStatus[3] === true">
                      <span class="cross-icon"><cross-icon/></span>
                    </td>
                    <td>
                      <file-input
                        @change="handleImageUpload($event, 4)"
                        :title="$t('C00210.S030')"
                        :disabled="selectedLanguage === null"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td class="indent-content">{{ $t("C00210.S011") }}</td>
                    <td v-if="fileStatus[4] === false">{{ getProvisionsImageFileStatus(5) }}</td>
                    <td v-if="fileStatus[4] === true">
                      <span class="cross-icon"><cross-icon/></span>
                    </td>
                    <td>
                      <file-input
                        @change="handleImageUpload($event, 5)"
                        :title="$t('C00210.S030')"
                        :disabled="selectedLanguage === null"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>{{ $t("C00210.S008") }}</td>
                    <td v-if="fileStatus[5] === false">{{ getProvisionsImageFileStatus(6) }}</td>
                    <td v-if="fileStatus[5] === true">
                      <span class="cross-icon"><cross-icon/></span>
                    </td>
                    <td>
                      <file-input
                        @change="handleImageUpload($event, 6)"
                        :title="$t('C00210.S030')"
                        :disabled="selectedLanguage === null"
                      />
                    </td>
                  </tr>
                </tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td class="text-right"><small>{{ $t("C00210.S016") }}</small></td>
                </tr>
              </table>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <compliance-information-setting-preview
        ref="previewPanel"
        v-show="isShowPreviewPanel"
        :dataModel="languageDisplayModel"
      />
    </div>
    <ComplianceInformationSettingTimeSetting
      ref="timeSettingPanel"
      v-show="!disabledFixedBtn && !isShowImageSettingPanel"
      :dataModel="dataModel"
    />
    <v-row>
      <v-col>
        <maint-button
          @close="handleMaintButtonClose"
          @fixed="handleMaintButtonFixed"
          @imageSetting="handleMaintButtonImageSetting"
          @timeSetting="handleMaintButtonTimeSetting"
          :isfixedBtn="disabledFixedBtn"
          :isimageSettingBtn="disabledFixedBtn || isShowImageSettingPanel"
          :istimeSettingBtn="disabledFixedBtn || !isShowImageSettingPanel"
        />
      </v-col>
    </v-row>
    <popup ref="pop"/>
  </v-container>
</template>
<!-- KSD V001.000 AE -->
