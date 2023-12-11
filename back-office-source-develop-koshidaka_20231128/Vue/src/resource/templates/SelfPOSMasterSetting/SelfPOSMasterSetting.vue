<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/CommonDesign/utils.css"></style>
<style scoped src="@/resource/static/css/SelfPOSMasterSetting/selfPOSMasterSetting.css"></style>
<script type="text/javascript" src="@/resource/static/js/SelfPOSMasterSetting/selfPOSMasterSetting.js"></script>
<template>
  <v-container class="container">
    <!-- 店舗選択エリア -->
    <form-group-layout
      fixed-header
      :header-width="146"
      :title="$t('C00222.S001')"
      class="mb-30"
    >
      <!-- 対象店舗は「店舗コード:店舗名称」の形式で表示する -->
      <store-select
        has-code-name
        v-model="targetStoreCodes"
        :confirm-proceed="!disabledFixedBtn"
        headquarters-authority-check-enable
        ref="storeSelect"
        @change="handleStoreSelectChange"
        @click="storeClicked"
      />
    </form-group-layout>
    <div
      v-show="isShowOptionItemSettingPanel"
      class="pageHeader">
      <v-row no-gutters>
        <v-col>
          <v-row
            no-gutters
            class="setting-label">
            {{ $t('C00222.S010') }}
          </v-row>
          <v-row no-gutters>
            <v-col>
              <table class="self-POS-master-setting-table">
                <thead>
                  <tr>
                    <th width="75%">{{ $t("C00222.S011") }}</th>
                    <th width="25%">{{ $t("C00222.S012") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{{ $t("C00222.S013") }}</td>
                    <td>
                      <select-input
                        class="form-control"
                        v-model="dataConfig.SELF_OPTION_SETTINGS.ringsound"
                        :options="doOptions"
                        :empty-option="false"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>{{ $t("C00222.S014") }}</td>
                    <td>
                      <select-input
                        class="form-control"
                        v-model="dataConfig.SELF_OPTION_SETTINGS.turiremain"
                        :options="doOptions"
                        :empty-option="false"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>{{ $t("C00222.S015") }}</td>
                    <td>
                      <select-input
                        class="form-control"
                        v-model="dataConfig.SELF_OPTION_SETTINGS.receiptwaitchange"
                        :options="doOptions"
                        :empty-option="false"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>{{ $t("C00222.S016") }}</td>
                    <td>
                      <select-input
                        class="form-control"
                        v-model="dataConfig.SELF_OPTION_SETTINGS.earlycheckout"
                        :options="doOptions"
                        :empty-option="false"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>{{ $t("C00222.S017") }}</td>
                    <td>
                      <select-input
                        class="form-control"
                        v-model="dataConfig.SELF_OPTION_SETTINGS.imageofstandby"
                        :options="topScreenOptions"
                        :empty-option="false"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>

    <!-- 画像音声 -->
    <div
      ref="imageAudioSettingPanel"
      v-show="isShowImageAudioSettingPanel"
      class="self-POS-master-setting-container pageHeader">
      <v-row no-gutters>
        <v-col>
          <v-row
            no-gutters
            class="setting-label">
            {{ $t('C00222.S060') }}
          </v-row>
          <v-row no-gutters>
            <table class="self-POS-master-setting-file-table">
              <thead>
                <tr>
                  <th width="50%">{{ $t("C00222.S061") }}</th>
                  <th
                    width="50%"
                    colspan="2">{{ $t("C00222.S062") }}</th>
                </tr>
              </thead>
              <tbody v-show="headquartersAuthority == 1">
                <tr>
                  <td width="50%">{{ $t("C00222.S063") }}</td>
                  <td
                    width="25%"
                    v-if="elemFileStatus[0] === false">{{ getElementFileStatusCommon(1) }}</td>
                  <td
                    width="25%"
                    v-if="elemFileStatus[0] === true">
                    <span class="cross-icon"><cross-icon/></span>
                  </td>
                  <td width="25%">
                    <file-input
                      @change="handleElemFileUploadCommon($event, 1)"
                      accept="*/*"
                      :title="$t('C00222.S072')"
                    />
                  </td>
                </tr>
                <tr>
                  <td width="50%">{{ $t("C00222.S064") }}</td>
                  <td
                    width="25%"
                    v-if="elemFileStatus[1] === false">{{ getElementFileStatusIndividual(2) }}</td>
                  <td v-if="elemFileStatus[1] === true">
                    <span class="cross-icon"><cross-icon/></span>
                  </td>
                  <td width="25%">
                    <file-input
                      @change="handleElemFileUploadIndividual($event, 2)"
                      accept="*/*"
                      :title="$t('C00222.S072')"
                    />
                  </td>
                </tr>
                <tr>
                  <td>{{ $t("C00222.S065") }}</td>
                  <td v-if="elemFileStatus[2] === false">{{ getElementFileStatusCommon(3) }}</td>
                  <td v-if="elemFileStatus[2] === true">
                    <span class="cross-icon"><cross-icon/></span>
                  </td>
                  <td>
                    <file-input
                      @change="handleElemFileUploadCommon($event, 3)"
                      accept="*/*"
                      :title="$t('C00222.S072')"
                    />
                  </td>
                </tr>
                <tr>
                  <td>{{ $t("C00222.S066") }}</td>
                  <td v-if="elemFileStatus[3] === false">{{ getElementFileStatusIndividual(4) }}</td>
                  <td v-if="elemFileStatus[3] === true">
                    <span class="cross-icon"><cross-icon/></span>
                  </td>
                  <td>
                    <file-input
                      @change="handleElemFileUploadIndividual($event, 4)"
                      accept="*/*"
                      :title="$t('C00222.S072')"
                    />
                  </td>
                </tr>
                <tr>
                  <td>{{ $t("C00222.S067") }}</td>
                  <td v-if="elemFileStatus[4] === false">{{ getElementFileStatusIndividual(5) }}</td>
                  <td v-if="elemFileStatus[4] === true">
                    <span class="cross-icon"><cross-icon/></span>
                  </td>
                  <td>
                    <file-input
                      @change="handleElemFileUploadIndividual($event, 5)"
                      accept="*/*"
                      :title="$t('C00222.S072')"
                    />
                  </td>
                </tr>
                <tr>
                  <td>{{ $t("C00222.S068") }}</td>
                  <td v-if="elemFileStatus[5] === false">{{ getElementFileStatusCommon(6) }}</td>
                  <td v-if="elemFileStatus[5] === true">
                    <span class="cross-icon"><cross-icon/></span>
                  </td>
                  <td>
                    <file-input
                      @change="handleElemFileUploadCommon($event, 6)"
                      accept="*/*"
                      :title="$t('C00222.S072')"
                    />
                  </td>
                </tr>
              </tbody>
              <tbody v-show="headquartersAuthority == 0">
                <tr>
                  <td width="50%">{{ $t("C00222.S064") }}</td>
                  <td
                    width="25%"
                    v-if="elemFileStatus[1] === false">{{ getElementFileStatusIndividual(2) }}</td>
                  <td v-if="elemFileStatus[1] === true">
                    <span class="cross-icon"><cross-icon/></span>
                  </td>
                  <td width="25%">
                    <file-input
                      @change="handleElemFileUploadIndividual($event, 2)"
                      accept="*/*"
                      :title="$t('C00222.S072')"
                    />
                  </td>
                </tr>
                <tr>
                  <td>{{ $t("C00222.S066") }}</td>
                  <td v-if="elemFileStatus[3] === false">{{ getElementFileStatusIndividual(4) }}</td>
                  <td v-if="elemFileStatus[3] === true">
                    <span class="cross-icon"><cross-icon/></span>
                  </td>
                  <td>
                    <file-input
                      @change="handleElemFileUploadIndividual($event, 4)"
                      accept="*/*"
                      :title="$t('C00222.S072')"
                    />
                  </td>
                </tr>
                <tr>
                  <td>{{ $t("C00222.S067") }}</td>
                  <td v-if="elemFileStatus[4] === false">{{ getElementFileStatusIndividual(5) }}</td>
                  <td v-if="elemFileStatus[4] === true">
                    <span class="cross-icon"><cross-icon/></span>
                  </td>
                  <td>
                    <file-input
                      @change="handleElemFileUploadIndividual($event, 5)"
                      accept="*/*"
                      :title="$t('C00222.S072')"
                    />
                  </td>
                </tr>
              </tbody>
              <tr>
                <td/>
                <td/>
                <td class="text-right"><small>{{ $t("C00222.S073") }}</small></td>
              </tr>
            </table>
          </v-row>
        </v-col>
      </v-row>
      <self-POS-master-setting-image-audio-preview
        class="preview-panel"
        ref="previewPanel"
        v-show="isShowPreviewPanel"
        :file-play="isShowImageAudioSettingPanel"
        :data-model-common="elementFileModelCommon"
        :data-model-individual="elementFileModelIndividual"
        :select-options="elementFileNameOptions"
        :headquarters-authority="headquartersAuthority"
        :target-store-codes="targetStoreCodes"
      />
    </div>

    <!-- 客面ファイル -->
    <div
      ref="customerFileSettingPanel"
      v-show="isShowCustomerFileSettingPanel"
      class="customer-file-setting-container pageHeader">
      <v-row no-gutters>
        <v-col>
          <v-row
            no-gutters
            class="setting-label">
            {{ $t('C00222.S120') }}
          </v-row>
          <v-row no-gutters>
            <table class="customer-file-setting-table">
              <thead>
                <tr>
                  <th width="40%">{{ $t("C00222.S061") }}</th>
                  <th
                    width="60%"
                    colspan="3">{{ $t("C00222.S062") }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-show="headquartersAuthority == 1">
                  <td width="40%">{{ $t("C00222.S121") }}</td>
                  <td
                    width="20%"
                    v-if="cusFileStatus[0] === false">{{ getCustomerFileStatusCommon(1) }}</td>
                  <td
                    width="20%"
                    v-if="cusFileStatus[0] === true">
                    <span class="cross-icon"><cross-icon/></span>
                  </td>
                  <td width="20%">
                    <file-input
                      @change="handleCusFileUploadCommon($event, 1)"
                      accept="*/*"
                      :title="$t('C00222.S072')"
                    />
                  </td>
                  <td width="20%">
                    <v-btn
                      :disabled="getCustomerFileStatusCommon(1) === '未設定'"
                      class="del-button"
                      @click="handleDeleteFileCommon(1)"
                    >{{ $t("C00222.S140") }}</v-btn>
                  </td>
                </tr>
                <tr>
                  <td width="40%">{{ $t("C00222.S130") }}</td>
                  <td
                    width="20%"
                    v-if="cusFileStatus[1] === false">{{ getCustomerFileStatusIndividual(2) }}</td>
                  <td
                    width="20%"
                    v-if="cusFileStatus[1] === true">
                    <span class="cross-icon"><cross-icon/></span>
                  </td>
                  <td width="20%">
                    <file-input
                      @change="handleCusFileUploadIndividual($event, 2)"
                      accept="*/*"
                      :title="$t('C00222.S072')"
                    />
                  </td>
                  <td width="20%">
                    <v-btn
                      :disabled="getCustomerFileStatusIndividual(2) === '未設定'"
                      class="del-button"
                      @click="handleDeleteFileIndividual(2)"
                    >{{ $t("C00222.S140") }}</v-btn>
                  </td>
                </tr>
                <tr>
                  <td>{{ $t("C00222.S131") }}</td>
                  <td v-if="cusFileStatus[2] === false">{{ getCustomerFileStatusIndividual(3) }}</td>
                  <td v-if="cusFileStatus[2] === true">
                    <span class="cross-icon"><cross-icon/></span>
                  </td>
                  <td>
                    <file-input
                      @change="handleCusFileUploadIndividual($event, 3)"
                      accept="*/*"
                      :title="$t('C00222.S072')"
                    />
                  </td>
                  <td>
                    <v-btn
                      :disabled="getCustomerFileStatusIndividual(3) === '未設定'"
                      class="del-button"
                      @click="handleDeleteFileIndividual(3)"
                    >{{ $t("C00222.S140") }}</v-btn>
                  </td>
                </tr>
                <tr>
                  <td>{{ $t("C00222.S132") }}</td>
                  <td v-if="cusFileStatus[3] === false">{{ getCustomerFileStatusIndividual(4) }}</td>
                  <td v-if="cusFileStatus[3] === true">
                    <span class="cross-icon"><cross-icon/></span>
                  </td>
                  <td>
                    <file-input
                      @change="handleCusFileUploadIndividual($event, 4)"
                      accept="*/*"
                      :title="$t('C00222.S072')"
                    />
                  </td>
                  <td>
                    <v-btn
                      :disabled="getCustomerFileStatusIndividual(4) === '未設定'"
                      class="del-button"
                      @click="handleDeleteFileIndividual(4)"
                    >{{ $t("C00222.S140") }}</v-btn>
                  </td>
                </tr>
                <tr>
                  <td>{{ $t("C00222.S133") }}</td>
                  <td v-if="cusFileStatus[4] === false">{{ getCustomerFileStatusIndividual(5) }}</td>
                  <td v-if="cusFileStatus[4] === true">
                    <span class="cross-icon"><cross-icon/></span>
                  </td>
                  <td>
                    <file-input
                      @change="handleCusFileUploadIndividual($event, 5)"
                      accept="*/*"
                      :title="$t('C00222.S072')"
                    />
                  </td>
                  <td>
                    <v-btn
                      :disabled="getCustomerFileStatusIndividual(5) === '未設定'"
                      class="del-button"
                      @click="handleDeleteFileIndividual(5)"
                    >{{ $t("C00222.S140") }}</v-btn>
                  </td>
                </tr>
                <tr>
                  <td>{{ $t("C00222.S134") }}</td>
                  <td v-if="cusFileStatus[5] === false">{{ getCustomerFileStatusIndividual(6) }}</td>
                  <td v-if="cusFileStatus[5] === true">
                    <span class="cross-icon"><cross-icon/></span>
                  </td>
                  <td>
                    <file-input
                      @change="handleCusFileUploadIndividual($event, 6)"
                      accept="*/*"
                      :title="$t('C00222.S072')"
                    />
                  </td>
                  <td>
                    <v-btn
                      :disabled="getCustomerFileStatusIndividual(6) === '未設定'"
                      class="del-button"
                      @click="handleDeleteFileIndividual(6)"
                    >{{ $t("C00222.S140") }}</v-btn>
                  </td>
                </tr>
                <tr>
                  <td>{{ $t("C00222.S135") }}</td>
                  <td v-if="cusFileStatus[6] === false">{{ getCustomerFileStatusIndividual(7) }}</td>
                  <td v-if="cusFileStatus[6] === true">
                    <span class="cross-icon"><cross-icon/></span>
                  </td>
                  <td>
                    <file-input
                      @change="handleCusFileUploadIndividual($event, 7)"
                      accept="*/*"
                      :title="$t('C00222.S072')"
                    />
                  </td>
                  <td>
                    <v-btn
                      :disabled="getCustomerFileStatusIndividual(7) === '未設定'"
                      class="del-button"
                      @click="handleDeleteFileIndividual(7)"
                    >{{ $t("C00222.S140") }}</v-btn>
                  </td>
                </tr>
                <tr>
                  <td>{{ $t("C00222.S136") }}</td>
                  <td v-if="cusFileStatus[7] === false">{{ getCustomerFileStatusIndividual(8) }}</td>
                  <td v-if="cusFileStatus[7] === true">
                    <span class="cross-icon"><cross-icon/></span>
                  </td>
                  <td>
                    <file-input
                      @change="handleCusFileUploadIndividual($event, 8)"
                      accept="*/*"
                      :title="$t('C00222.S072')"
                    />
                  </td>
                  <td>
                    <v-btn
                      :disabled="getCustomerFileStatusIndividual(8) === '未設定'"
                      class="del-button"
                      @click="handleDeleteFileIndividual(8)"
                    >{{ $t("C00222.S140") }}</v-btn>
                  </td>
                </tr>
                <tr>
                  <td>{{ $t("C00222.S137") }}</td>
                  <td v-if="cusFileStatus[8] === false">{{ getCustomerFileStatusIndividual(9) }}</td>
                  <td v-if="cusFileStatus[8] === true">
                    <span class="cross-icon"><cross-icon/></span>
                  </td>
                  <td>
                    <file-input
                      @change="handleCusFileUploadIndividual($event, 9)"
                      accept="*/*"
                      :title="$t('C00222.S072')"
                    />
                  </td>
                  <td>
                    <v-btn
                      :disabled="getCustomerFileStatusIndividual(9) === '未設定'"
                      class="del-button"
                      @click="handleDeleteFileIndividual(9)"
                    >{{ $t("C00222.S140") }}</v-btn>
                  </td>
                </tr>
                <tr>
                  <td>{{ $t("C00222.S138") }}</td>
                  <td v-if="cusFileStatus[9] === false">{{ getCustomerFileStatusIndividual(10) }}</td>
                  <td v-if="cusFileStatus[9] === true">
                    <span class="cross-icon"><cross-icon/></span>
                  </td>
                  <td>
                    <file-input
                      @change="handleCusFileUploadIndividual($event, 10)"
                      accept="*/*"
                      :title="$t('C00222.S072')"
                    />
                  </td>
                  <td>
                    <v-btn
                      :disabled="getCustomerFileStatusIndividual(10) === '未設定'"
                      class="del-button"
                      @click="handleDeleteFileIndividual(10)"
                    >{{ $t("C00222.S140") }}</v-btn>
                  </td>
                </tr>
                <tr>
                  <td>{{ $t("C00222.S139") }}</td>
                  <td v-if="cusFileStatus[10] === false">{{ getCustomerFileStatusIndividual(11) }}</td>
                  <td v-if="cusFileStatus[10] === true">
                    <span class="cross-icon"><cross-icon/></span>
                  </td>
                  <td>
                    <file-input
                      @change="handleCusFileUploadIndividual($event, 11)"
                      accept="*/*"
                      :title="$t('C00222.S072')"
                    />
                  </td>
                  <td>
                    <v-btn
                      :disabled="getCustomerFileStatusIndividual(11) === '未設定'"
                      class="del-button"
                      @click="handleDeleteFileIndividual(11)"
                    >{{ $t("C00222.S140") }}</v-btn>
                  </td>
                </tr>
              </tbody>
            </table>
            <v-row no-gutters>
              <v-col
                class="text-right"
                offset="10">
                <small>{{ $t("C00222.S073") }}</small>
              </v-col>
            </v-row>
          </v-row>
        </v-col>
      </v-row>
      <self-POS-master-setting-customer-file-preview
        class="preview-panel"
        ref="customerFilePreviewPanel"
        v-show="isShowCustomerFilePreviewPanel"
        :file-play="isShowCustomerFileSettingPanel"
        :data-model-common="customerFileModelCommon"
        :data-model-individual="customerFileModelIndividual"
        :select-options="customerFileNameOptions"
        :headquarters-authority="headquartersAuthority"
        :target-store-codes="targetStoreCodes"
      />
    </div>
    <self-POS-master-setting-time-setting
      ref="timeSettingPanel"
      v-show="isShowTimeSettingPanel"
      :data-model="dataConfig.SELF_TIMER_SETTINGS"
      class="pageHeader"
    />
    <self-POS-master-setting-payment-setting
      ref="paymentSettingPanel"
      v-show="isShowPaymentSettingPanel"
      :data-model="dataConfig.SELF_PAYMENT_SETTINGS"
      class="pageHeader"
    />
    <self-POS-master-setting-message-setting
      ref="messageSettingPanel"
      v-show="isShowMessageSettingPanel"
      :data-model="dataConfig.SELF_MESSAGE_SETTINGS"
      class="pageHeader"
    />
    <self-POS-master-setting-customer-option-setting
      ref="customerOptionSettingPanel"
      v-show="isShowCustomerOptionSettingPanel"
      :data-model="dataConfig.CUSTOMER_OPTION_SETTINGS"
      class="pageHeader"
    />
    <v-row>
      <v-col>
        <maint-button
          @close="handleMaintButtonClose"
          @fixed="handleMaintButtonFixed"
          @optionItemSetting="handleMaintButtonOptionItemSetting"
          @timeSetting="handleMaintButtonTimeSetting"
          @paymentSetting="handleMaintButtonPaymentSetting"
          @messageSetting="handleMaintButtonMessageSetting"
          @imageAudioSetting="handleMaintButtonImageAudioSetting"
          @customerOptionSetting="handleMaintButtonCustomerOptionSetting"
          @customerFileSetting="handleMaintButtonCustomerFileSetting"
          @iconPositionSetting="handleMaintButtonIconPositionSetting"
          :isfixed-btn="disabledFixedBtn"
          :is-option-item-setting-btn="disabledFixedBtn || isShowOptionItemSettingPanel"
          :istime-setting-btn="disabledFixedBtn || isShowTimeSettingPanel"
          :is-payment-setting-btn="disabledFixedBtn || isShowPaymentSettingPanel"
          :is-message-setting-btn="disabledFixedBtn || isShowMessageSettingPanel"
          :is-image-audio-setting-btn="disabledFixedBtn || isShowImageAudioSettingPanel"
          :is-customer-option-setting="disabledFixedBtn || isShowCustomerOptionSettingPanel"
          :is-customer-file-setting="disabledFixedBtn || isShowCustomerFileSettingPanel"
          :is-icon-position-setting-btn="disabledFixedBtn || disabledIconPositionButton"
        />
      </v-col>
    </v-row>
    <popup ref="pop"/>
  </v-container>
</template>
<!-- KSD V001.000 AE -->
