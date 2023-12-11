<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/ComplianceInformationSetting/complianceInformationSettingPreview.css"></style>
<script type="text/javascript" src="@/resource/static/js/ComplianceInformationSetting/complianceInformationSettingPreview.js"></script>
<template>
  <div class="compliance-information-setting-preview-container">
    <!-- 利用時間条文設定 -->
    <v-row class="mb-3">
      <v-col cols="9">
        <form-group-layout
          :headerCols="5"
          :bodyCols="7"
          :title="$t('C00210.S017')"
        >
          <select-input
            class="form-control"
            v-model="usageTimeProvisionSetting"
            :options="usageTimeProvisionSettingOptions"
            :emptyOption="false"
          />
        </form-group-layout>
      </v-col>
      <v-col cols="3">
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="image-container">
          <img
            class="image-background"
            src="@/assets/image/compliance_preview_back.png"
          >
          <div class="table-overlay">
            <table>
              <thead>
                <tr>
                  <td colspan="2" class="preview-panel-heading"></td>
                </tr>
              </thead>
              <tbody class="preview-panel-body">
                <tr class="row-1">
                  <td>
                    <tr class="preview-image-container">
                      <img
                        :src="resolveImageSource('provisionsImageFile01')"
                        v-show="resolveImageSource('provisionsImageFile01') != null"
                      />
                    </tr>
                  </td>
                  <td></td>
                </tr>
                <tr class="row-2">
                  <td>
                    <tr class="preview-image-container">
                      <img
                        :src="resolveImageSource('provisionsImageFile02')"
                        v-show="resolveImageSource('provisionsImageFile02') != null"
                      />
                    </tr>
                  </td>
                  <td></td>
                </tr>
                <tr class="row-3">
                  <td>
                    <tr class="preview-image-container">
                      <img
                        :src="resolveImageSource('provisionsImageFile03')"
                        v-show="resolveImageSource('provisionsImageFile03') != null"
                        v-if="usageTimeProvisionSetting == 'provisionsImageFile03'"
                      />
                      <img
                        :src="resolveImageSource('provisionsImageFile04')"
                        v-show="resolveImageSource('provisionsImageFile04') != null"
                        v-if="usageTimeProvisionSetting == 'provisionsImageFile04'"
                      />
                      <img
                        :src="resolveImageSource('provisionsImageFile05')"
                        v-show="resolveImageSource('provisionsImageFile05') != null"
                        v-if="usageTimeProvisionSetting == 'provisionsImageFile05'"
                      />
                    </tr>
                  </td>
                  <td></td>
                </tr>
                <tr class="row-4">
                  <td>
                    <tr class="preview-image-container">
                      <img
                        :src="resolveImageSource('provisionsImageFile06')"
                        v-show="resolveImageSource('provisionsImageFile06') != null"
                      />
                    </tr>
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<!-- KSD V001.000 AE -->
