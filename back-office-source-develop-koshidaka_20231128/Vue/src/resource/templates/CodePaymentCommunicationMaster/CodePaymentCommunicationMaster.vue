<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/MasterCommon/masterCommon.css"></style>
<style scoped src="@/resource/static/css/CommonDesign/utils.css"></style>
<style scoped src="@/resource/static/css/CodePaymentCommunicationMaster/codePaymentCommunicationMaster.css"></style>
<script type="text/javascript" src="@/resource/static/js/CodePaymentCommunicationMaster/codePaymentCommunicationMaster.js"></script>
<template>
  <v-container class="code-pay-body-container code-pay-container">
    <!-- 店舗選択エリア -->
    <form-group-layout
      fixed-header
      :header-width="146"
      :title="$t('C00223.S001')"
      class="mb-30"
    >
      <!-- 対象店舗は「店舗コード:店舗名称」の形式で表示する -->
      <store-select
        has-code-name
        v-model="targetStoreCodes"
        :confirm-proceed="edited"
        headquarters-authority-check-enable
        ref="storeSelect"
        @change="handleStoreSelectChange"
        @click="storeClicked"
      />
    </form-group-layout>

    <!-- 通信設定１ -->
    <div
      v-show="!disabledFixedBtn && isShowCommSetting1Panel"
      ref="subscreen1">
      <div class="code-pay-subscreen-title mb-30">
        {{ $t('C00223.S005') }}
      </div>

      <form-group-layout
        fixed-header
        :header-height="50"
        :header-width="223"
        :title="$t('C00223.S006')"
        class="code-pay-left-text-box"
        :class="this.paycompanyCodeErrorMsg==='' ? 'mb-30' : ''"
        :has-error="this.paycompanyCodeErrorMsg !== ''"
      >
        <text-input
          class="h-100 w-60per code-pay-input-element form-control"
          type="number"
          maxlength="5"
          :placeholder="this.$i18n.t('C00223.S042')"
          v-model="configData.paycompanyCode"
          ref="paycompanyCode"
          id="paycompanyCode"
        />
      </form-group-layout>
      <v-row
        v-if="this.paycompanyCodeErrorMsg !== ''"
        class="errorCell h-30 mb-30 pl-223"
        no-gutters>
        <td>
          <label>{{ paycompanyCodeErrorMsg }}</label>
        </td>
      </v-row>

      <form-group-layout
        fixed-header
        :header-height="50"
        :header-width="223"
        :title="$t('C00223.S007')"
        class="code-pay-left-text-box"
        :class="this.paystoreCodeErrorMsg==='' ? 'mb-30' : ''"
        :has-error="this.paystoreCodeErrorMsg !== ''"
      >
        <text-input
          class="h-100 w-60per code-pay-input-element form-control"
          type="number"
          maxlength="6"
          :placeholder="this.$i18n.t('C00223.S043')"
          v-model="configData.paystoreCode"
          ref="paystoreCode"
          id="paystoreCode"
        />
      </form-group-layout>
      <v-row
        v-if="this.paystoreCodeErrorMsg !== ''"
        class="errorCell h-30 mb-30 pl-223"
        no-gutters>
        <td>
          <label>{{ paystoreCodeErrorMsg }}</label>
        </td>
      </v-row>

      <form-group-layout
        fixed-header
        :header-height="50"
        :header-width="223"
        :title="$t('C00223.S008')"
        class="code-pay-left-text-box"
        :class="this.payreqstorecodeErrorMsg==='' ? 'mb-30' : ''"
        is-vertical
        :has-error="this.payreqstorecodeErrorMsg !== ''"
        :col-spacer="false"
      >
        <text-input
          class="h-50px w-99per code-pay-input-element form-control"
          type="text"
          :placeholder="this.$i18n.t('C00223.S038')"
          v-model="configData.payreqstorecode"
          ref="payreqstorecode"
          id="payreqstorecode"
          @input="(e) => inputLimit(e, configData, 'payreqstorecode', 'alNum_-.', 32)"
        />
      </form-group-layout>
      <v-row
        v-if="this.payreqstorecodeErrorMsg !== ''"
        class="errorCell h-30 mb-30"
        no-gutters>
        <td>
          <label>{{ payreqstorecodeErrorMsg }}</label>
        </td>
      </v-row>

      <form-group-layout
        fixed-header
        :header-height="50"
        :header-width="223"
        :title="$t('C00223.S009')"
        class="code-pay-left-text-box"
        :class="this.payreqterminalcodeErrorMsg==='' ? 'mb-30' : ''"
        is-vertical
        :has-error="this.payreqterminalcodeErrorMsg !== ''"
        :col-spacer="false"
      >
        <text-input
          class="h-50px w-99per code-pay-input-element form-control"
          type="text"
          :placeholder="this.$i18n.t('C00223.S038')"
          v-model="configData.payreqterminalcode"
          ref="payreqterminalcode"
          id="payreqterminalcode"
          @input="(e) => inputLimit(e, configData, 'payreqterminalcode', 'alNum_-.', 32)"
        />
      </form-group-layout>
      <v-row
        v-if="this.payreqterminalcodeErrorMsg !== ''"
        class="errorCell h-30 mb-30"
        no-gutters>
        <td>
          <label>{{ payreqterminalcodeErrorMsg }}</label>
        </td>
      </v-row>

      <form-group-layout
        fixed-header
        :header-height="50"
        :header-width="223"
        :title="$t('C00223.S010')"
        class="code-pay-left-text-box"
        :class="this.paytreeidErrorMsg==='' ? 'mb-30' : ''"
        :has-error="this.paytreeidErrorMsg !== ''"
      >
        <text-input
          class="h-100 w-80per code-pay-input-element form-control"
          type="text"
          :placeholder="this.$i18n.t('C00223.S035')"
          v-model="configData.paytreeid"
          ref="paytreeid"
          id="paytreeid"
          @input="(e) => inputLimit(e, configData, 'paytreeid', 'alNum', 12)"
        />
      </form-group-layout>
      <v-row
        v-if="this.paytreeidErrorMsg !== ''"
        class="errorCell h-30 mb-30 pl-223"
        no-gutters>
        <td>
          <label>{{ paytreeidErrorMsg }}</label>
        </td>
      </v-row>

      <form-group-layout
        fixed-header
        :header-height="50"
        :header-width="223"
        :title="$t('C00223.S011')"
        class="mb-30 code-pay-left-text-box"
      >
        <select-input
          class="h-100 w-60per"
          :empty-option="false"
          :options="paydnsserverOptions"
          v-model="configData.paydnsserver"
          ref="paydnsserver"
          id="paydnsserver"
        />
      </form-group-layout>

      <form-group-layout
        fixed-header
        :header-height="50"
        :header-width="223"
        :title="$t('C00223.S012')"
        class="code-pay-left-text-box"
        :class="this.pay_ipadrErrorMsg==='' ? 'mb-30' : ''"
        is-vertical
        :has-error="this.pay_ipadrErrorMsg !== ''"
        :col-spacer="false"
      >
        <text-input
          class="h-50px w-99per code-pay-input-element form-control"
          type="text"
          :placeholder="this.$i18n.t('C00223.S037')"
          v-model="configData.pay_ipadr"
          ref="pay_ipadr"
          id="pay_ipadr"
          @input="(e) => inputLimit(e, configData, 'pay_ipadr', 'ipAdd', 15)"
        />
      </form-group-layout>
      <v-row
        v-if="this.pay_ipadrErrorMsg !== ''"
        class="errorCell h-30 mb-30"
        no-gutters>
        <td>
          <label>{{ pay_ipadrErrorMsg }}</label>
        </td>
      </v-row>

      <form-group-layout
        fixed-header
        :header-height="50"
        :header-width="223"
        :title="$t('C00223.S013')"
        class="code-pay-left-text-box"
        :class="this.paycenternameErrorMsg==='' ? 'mb-30' : ''"
        is-vertical
        :has-error="this.paycenternameErrorMsg !== ''"
        :col-spacer="false"
      >
        <text-input
          class="w-99per code-pay-textarea-row h-100px code-pay-input-element form-control"
          :placeholder="this.$i18n.t('C00223.S046')"
          :multiline="true"
          v-model="configData.paycentername"
          ref="paycentername"
          id="paycentername"
          @input="(e) => inputLimit(e, configData, 'paycentername', 'alNum%&.-', 100)"/>
      </form-group-layout>
      <v-row
        v-if="this.paycenternameErrorMsg !== ''"
        class="errorCell h-30 mb-30"
        no-gutters>
        <td>
          <label>{{ paycenternameErrorMsg }}</label>
        </td>
      </v-row>

      <form-group-layout
        fixed-header
        :header-height="50"
        :header-width="223"
        :title="$t('C00223.S014')"
        class="code-pay-left-text-box"
        :class="this.payportnoErrorMsg==='' ? 'mb-30' : ''"
        :has-error="this.payportnoErrorMsg !== ''"
      >
        <text-input
          class="h-100 w-60per code-pay-input-element form-control"
          type="number"
          maxlength="5"
          :placeholder="this.$i18n.t('C00223.S042')"
          v-model="configData.payportno"
          ref="payportno"
          id="payportno"
        />
      </form-group-layout>
      <v-row
        v-if="this.payportnoErrorMsg !== ''"
        class="errorCell h-30 mb-30 pl-223"
        no-gutters>
        <td>
          <label>{{ payportnoErrorMsg }}</label>
        </td>
      </v-row>
    </div>

    <!-- 通信設定２ -->
    <div
      v-show="!disabledFixedBtn && isShowCommSetting2Panel"
      ref="subscreen2">
      <div class="code-pay-subscreen-title mb-30">
        {{ $t('C00223.S015') }}
      </div>

      <form-group-layout
        fixed-header
        :header-height="50"
        :header-width="223"
        :title="$t('C00223.S016')"
        class="code-pay-left-text-box"
        :class="this.payurlErrorMsg==='' ? 'mb-30' : ''"
        is-vertical
        :has-error="this.payurlErrorMsg !== ''"
        :col-spacer="false"
      >
        <text-input
          class="h-300px w-99per code-pay-textarea-row code-pay-input-element form-control"
          :placeholder="this.$i18n.t('C00223.S039')"
          :multiline="true"
          v-model="configData.payurl"
          ref="payurl"
          id="payurl"
          @input="(e) => inputLimit(e, configData, 'payurl', 'commSet2TextArea', 255)" />
      </form-group-layout>
      <v-row
        v-if="this.payurlErrorMsg !== ''"
        class="errorCell h-30 mb-30"
        no-gutters>
        <td>
          <label>{{ payurlErrorMsg }}</label>
        </td>
      </v-row>

      <form-group-layout
        fixed-header
        :header-height="50"
        :header-width="260"
        :title="$t('C00223.S017')"
        class="code-pay-left-text-box"
        :class="this.payrcvtimeoutErrorMsg==='' ? 'mb-30' : ''"
        :has-error="this.payrcvtimeoutErrorMsg !== ''"
      >
        <text-input
          class="h-100 w-85per code-pay-input-element form-control"
          type="number"
          maxlength="10"
          :placeholder="this.$i18n.t('C00223.S044')"
          v-model="configData.payrcvtimeout"
          ref="payrcvtimeout"
          id="payrcvtimeout"
        />
      </form-group-layout>
      <v-row
        v-if="this.payrcvtimeoutErrorMsg !== ''"
        class="errorCell h-30 mb-30 pl-280"
        no-gutters>
        <td>
          <label>{{ payrcvtimeoutErrorMsg }}</label>
        </td>
      </v-row>

      <form-group-layout
        fixed-header
        :header-height="50"
        :header-width="260"
        :title="$t('C00223.S018')"
        class="code-pay-left-text-box"
        :class="this.payposopErrorMsg==='' ? 'mb-30' : ''"
        :has-error="this.payposopErrorMsg !== ''"
      >
        <text-input
          class="h-100 w-85per code-pay-input-element form-control"
          type="text"
          :placeholder="this.$i18n.t('C00223.S036')"
          v-model="configData.payposop"
          ref="payposop"
          id="payposop"
          @input="(e) => inputLimit(e, configData, 'payposop', 'alNum', 10)"
        />
      </form-group-layout>
      <v-row
        v-if="this.payposopErrorMsg !== ''"
        class="errorCell h-30 mb-30 pl-280"
        no-gutters>
        <td>
          <label>{{ payposopErrorMsg }}</label>
        </td>
      </v-row>

      <form-group-layout
        fixed-header
        :header-height="50"
        :header-width="223"
        :title="$t('C00223.S019')"
        class="code-pay-left-text-box"
        :class="this.payposappnameErrorMsg==='' ? 'mb-30' : ''"
        :has-error="this.payposappnameErrorMsg !== ''"
      >
        <text-input
          class="h-100 w-70per code-pay-input-element form-control"
          type="text"
          :placeholder="this.$i18n.t('C00223.S036')"
          v-model="configData.payposappname"
          ref="payposappname"
          id="payposappname"
          @input="(e) => inputLimit(e, configData, 'payposappname', 'alNum', 10)"
        />
      </form-group-layout>
      <v-row
        v-if="this.payposappnameErrorMsg !== ''"
        class="errorCell h-30 mb-30 pl-223"
        no-gutters>
        <td>
          <label>{{ payposappnameErrorMsg }}</label>
        </td>
      </v-row>

      <form-group-layout
        fixed-header
        :header-height="50"
        :header-width="223"
        :title="$t('C00223.S020')"
        class="code-pay-left-text-box"
        :class="this.payposappverErrorMsg==='' ? 'mb-30' : ''"
        :has-error="this.payposappverErrorMsg !== ''"
      >
        <text-input
          class="h-100 w-70per code-pay-input-element form-control"
          type="text"
          :placeholder="this.$i18n.t('C00223.S036')"
          v-model="configData.payposappver"
          ref="payposappver"
          id="payposappver"
          @input="(e) => inputLimit(e, configData, 'payposappver', 'alNum.', 10)"
        />
      </form-group-layout>
      <v-row
        v-if="this.payposappverErrorMsg !== ''"
        class="errorCell h-30 mb-30 pl-223"
        no-gutters>
        <td>
          <label>{{ payposappverErrorMsg }}</label>
        </td>
      </v-row>

      <form-group-layout
        fixed-header
        :header-height="50"
        :header-width="260"
        :title="$t('C00223.S021')"
        class="code-pay-left-text-box"
        :class="this.payretrywaittimeErrorMsg==='' ? 'mb-30' : ''"
        :has-error="this.payretrywaittimeErrorMsg !== ''"
      >
        <text-input
          class="h-100 w-50per code-pay-input-element form-control"
          type="number"
          maxlength="4"
          v-model="configData.payretrywaittime"
          ref="payretrywaittime"
          id="payretrywaittime"
        />
      </form-group-layout>
      <v-row
        v-if="this.payretrywaittimeErrorMsg !== ''"
        class="errorCell h-30 mb-30 pl-280"
        no-gutters>
        <td>
          <label>{{ payretrywaittimeErrorMsg }}</label>
        </td>
      </v-row>

      <form-group-layout
        fixed-header
        :header-height="50"
        :header-width="260"
        :title="$t('C00223.S022')"
        class="code-pay-left-text-box"
        :class="this.payretrycountErrorMsg==='' ? 'mb-30' : ''"
        :has-error="this.payretrycountErrorMsg !== ''"
      >
        <text-input
          class="h-100 w-40per code-pay-input-element form-control"
          type="number"
          maxlength="2"
          v-model="configData.payretrycount"
          ref="payretrycount"
          id="payretrycount"
        />
      </form-group-layout>
      <v-row
        v-if="this.payretrycountErrorMsg !== ''"
        class="errorCell h-30 mb-30 pl-280"
        no-gutters>
        <td>
          <label>{{ payretrycountErrorMsg }}</label>
        </td>
      </v-row>

      <div class="code-pay-footer"><small>{{ $t("C00223.S023") }}</small></div>
    </div>

    <!-- ﾒｯｾｰｼﾞ設定 -->
    <div
      v-show="!disabledFixedBtn && isShowMessSettingPanel"
      ref="subscreen3">
      <div class="code-pay-subscreen-title mb-30">
        {{ $t('C00223.S024') }}
      </div>

      <v-row no-gutters>
        <v-col :cols="9">
          <label id="ListHeader">{{ $t("C00223.S025") }}</label>
        </v-col>
        <v-col :cols="3">
          <label id="ListHeader">{{ $t("C00223.S026") }}</label>
        </v-col>
      </v-row>
      <v-row
        class="code-pay-content-row"
        no-gutters>
        <v-col
          :cols="9"
          class="whiteFrame code-pay-left-align">
          <label>{{ $t("C00223.S030") }}</label>
        </v-col>
        <v-col :cols="3">
          <select-input
            :empty-option="false"
            :options="printOptions"
            v-model="alarmData.payalarmmsg1prt"
            @input="(e) => handlePrintChange(e, 1)"
            ref="payalarmmsg1prt"
            id="payalarmmsg1prt"
          />
        </v-col>
      </v-row>
      <v-row
        :class="this.payalarmmsg1ErrorMsg==='' ? 'mb-30' : ''"
        no-gutters>
        <form-group-layout
          fixed-header
          :header-width="655"
          :header-height="0"
          is-vertical
          :has-error="this.payalarmmsg1ErrorMsg !== ''"
          :col-spacer="false"
        >
          <v-col id="ListHeader">
            <label class="code-pay-sub3-message-header">{{ $t("C00223.S029") }}</label>
          </v-col>
          <text-input
            class="w-100per code-pay-textarea-row code-pay-input-element form-control h-100px"
            :disabled="alarmData.payalarmmsg1prt != 0"
            :placeholder="this.$i18n.t('C00223.S045')"
            :multiline="true"
            v-model="alarmData.payalarmmsg1"
            ref="payalarmmsg1"
            id="payalarmmsg1"
            @input="(e) => inputLimit(e, alarmData, 'payalarmmsg1', null, 32)" />
        </form-group-layout>
      </v-row>
      <v-row
        v-if="this.payalarmmsg1ErrorMsg !== ''"
        class="errorCell h-30 mb-30"
        no-gutters>
        <td>
          <label>{{ payalarmmsg1ErrorMsg }}</label>
        </td>
      </v-row>

      <v-row
        no-gutters>
        <v-col :cols="9">
          <label id="ListHeader">{{ $t("C00223.S025") }}</label>
        </v-col>
        <v-col :cols="3">
          <label id="ListHeader">{{ $t("C00223.S026") }}</label>
        </v-col>
      </v-row>
      <v-row
        class="code-pay-content-row"
        no-gutters>
        <v-col
          :cols="9"
          class="whiteFrame code-pay-left-align">
          <label>{{ $t("C00223.S031") }}</label>
        </v-col>
        <v-col :cols="3">
          <select-input
            :empty-option="false"
            :options="printOptions"
            v-model="alarmData.payalarmmsg2prt"
            @input="(e) => handlePrintChange(e, 2)"
            ref="payalarmmsg2prt"
            id="payalarmmsg2prt"
          />
        </v-col>
      </v-row>
      <form-group-layout
        fixed-header
        :header-width="655"
        :header-height="0"
        is-vertical
        :has-error="this.payalarmmsg2ErrorMsg !== ''"
        :col-spacer="false"
      >
        <v-col id="ListHeader">
          <label class="code-pay-sub3-message-header">{{ $t("C00223.S029") }}</label>
        </v-col>
        <text-input
          class="w-100per code-pay-textarea-row code-pay-input-element form-control h-100px"
          :class="this.payalarmmsg2ErrorMsg==='' ? 'mb-30' : ''"
          :disabled="alarmData.payalarmmsg2prt != 0"
          :placeholder="this.$i18n.t('C00223.S045')"
          :multiline="true"
          v-model="alarmData.payalarmmsg2"
          ref="payalarmmsg2"
          id="payalarmmsg2"
          @input="(e) => inputLimit(e, alarmData, 'payalarmmsg2', null, 32)" />
      </form-group-layout>
      <v-row
        v-if="this.payalarmmsg2ErrorMsg !== ''"
        class="errorCell h-30 mb-30"
        no-gutters>
        <td>
          <label>{{ payalarmmsg2ErrorMsg }}</label>
        </td>
      </v-row>

      <v-row
        no-gutters>
        <v-col :cols="9">
          <label id="ListHeader">{{ $t("C00223.S025") }}</label>
        </v-col>
        <v-col :cols="3">
          <label id="ListHeader">{{ $t("C00223.S026") }}</label>
        </v-col>
      </v-row>
      <v-row
        class="code-pay-content-row"
        no-gutters>
        <v-col
          :cols="9"
          class="whiteFrame code-pay-left-align">
          <label>{{ $t("C00223.S032") }}</label>
        </v-col>
        <v-col :cols="3">
          <select-input
            :empty-option="false"
            :options="printOptions"
            v-model="alarmData.payalarmmsg3prt"
            @input="(e) => handlePrintChange(e, 3)"
            ref="payalarmmsg3prt"
            id="payalarmmsg3prt"
          />
        </v-col>
      </v-row>
      <form-group-layout
        fixed-header
        :header-width="655"
        :header-height="0"
        :class="this.payalarmmsg3ErrorMsg==='' ? 'mb-30' : ''"
        is-vertical
        :has-error="this.payalarmmsg3ErrorMsg !== ''"
        :col-spacer="false"
      >
        <v-col id="ListHeader">
          <label class="code-pay-sub3-message-header">{{ $t("C00223.S029") }}</label>
        </v-col>
        <text-input
          class="w-100per code-pay-textarea-row code-pay-input-element form-control h-100px"
          :disabled="alarmData.payalarmmsg3prt != 0"
          :placeholder="this.$i18n.t('C00223.S045')"
          :multiline="true"
          v-model="alarmData.payalarmmsg3"
          ref="payalarmmsg3"
          id="payalarmmsg3"
          @input="(e) => inputLimit(e, alarmData, 'payalarmmsg3', null, 32)" />
      </form-group-layout>
      <v-row
        v-if="this.payalarmmsg3ErrorMsg !== ''"
        class="errorCell h-30 mb-30"
        no-gutters>
        <td>
          <label>{{ payalarmmsg3ErrorMsg }}</label>
        </td>
      </v-row>

      <v-row
        no-gutters>
        <v-col :cols="9">
          <label id="ListHeader">{{ $t("C00223.S025") }}</label>
        </v-col>
        <v-col :cols="3">
          <label id="ListHeader">{{ $t("C00223.S026") }}</label>
        </v-col>
      </v-row>
      <v-row
        class="code-pay-content-row"
        no-gutters>
        <v-col
          :cols="9"
          class="whiteFrame code-pay-left-align">
          <label>{{ $t("C00223.S033") }}</label>
        </v-col>
        <v-col :cols="3">
          <select-input
            :empty-option="false"
            :options="printOptions"
            v-model="alarmData.payalarmmsg4prt"
            @input="(e) => handlePrintChange(e, 4)"
            ref="payalarmmsg4prt"
            id="payalarmmsg4prt"
          />
        </v-col>
      </v-row>
      <form-group-layout
        fixed-header
        :header-width="655"
        :header-height="0"
        is-vertical
        :has-error="this.payalarmmsg4ErrorMsg !== ''"
        :col-spacer="false"
      >
        <v-col id="ListHeader">
          <label class="code-pay-sub3-message-header">{{ $t("C00223.S029") }}</label>
        </v-col>
        <text-input
          class="w-100per code-pay-textarea-row code-pay-input-element form-control h-100px"
          :class="this.payalarmmsg4ErrorMsg==='' ? 'mb-30' : ''"
          :disabled="alarmData.payalarmmsg4prt != 0"
          :placeholder="this.$i18n.t('C00223.S045')"
          :multiline="true"
          v-model="alarmData.payalarmmsg4"
          ref="payalarmmsg4"
          id="payalarmmsg4"
          @input="(e) => inputLimit(e, alarmData, 'payalarmmsg4', null, 32)" />
      </form-group-layout>
      <v-row
        v-if="this.payalarmmsg4ErrorMsg !== ''"
        class="errorCell h-30 mb-30"
        no-gutters>
        <td>
          <label>{{ payalarmmsg4ErrorMsg }}</label>
        </td>
      </v-row>

      <v-row
        no-gutters>
        <v-col :cols="9">
          <label id="ListHeader">{{ $t("C00223.S025") }}</label>
        </v-col>
        <v-col :cols="3">
          <label id="ListHeader">{{ $t("C00223.S026") }}</label>
        </v-col>
      </v-row>
      <v-row
        class="code-pay-content-row"
        no-gutters>
        <v-col
          :cols="9"
          class="whiteFrame code-pay-left-align">
          <label>{{ $t("C00223.S034") }}</label>
        </v-col>
        <v-col :cols="3">
          <select-input
            :empty-option="false"
            :options="printOptions"
            v-model="alarmData.payalarmmsg5prt"
            @input="(e) => handlePrintChange(e, 5)"
            ref="payalarmmsg5prt"
            id="payalarmmsg5prt"
          />
        </v-col>
      </v-row>
      <form-group-layout
        fixed-header
        :header-width="655"
        :header-height="0"
        is-vertical
        :has-error="this.payalarmmsg5ErrorMsg !== ''"
        :col-spacer="false"
      >
        <v-col id="ListHeader">
          <label class="code-pay-sub3-message-header">{{ $t("C00223.S029") }}</label>
        </v-col>
        <text-input
          class="w-100per code-pay-textarea-row code-pay-input-element form-control h-100px"
          :class="this.payalarmmsg5ErrorMsg==='' ? 'mb-30' : ''"
          :disabled="alarmData.payalarmmsg5prt != 0"
          :placeholder="this.$i18n.t('C00223.S045')"
          :multiline="true"
          v-model="alarmData.payalarmmsg5"
          ref="payalarmmsg5"
          id="payalarmmsg5"
          @input="(e) => inputLimit(e, alarmData, 'payalarmmsg5', null, 32)" />
      </form-group-layout>
      <v-row
        v-if="this.payalarmmsg5ErrorMsg !== ''"
        class="errorCell h-30 mb-30"
        no-gutters>
        <td>
          <label>{{ payalarmmsg5ErrorMsg }}</label>
        </td>
      </v-row>
    </div>

    <v-row>
      <v-col>
        <maint-button
          @close="handleMaintButtonClose"
          @fixed="handleMaintButtonFixed"
          @commSetting1="handleMaintButtonCommSetting1"
          @commSetting2="handleMaintButtonCommSetting2"
          @messSetting="handleMaintButtonMessSetting"
          :isfixed-btn="disabledFixedBtn"
          :iscomm-setting-btn1="disabledFixedBtn || isShowCommSetting1Panel"
          :iscomm-setting-btn2="disabledFixedBtn || isShowCommSetting2Panel"
          :ismess-setting-btn="disabledFixedBtn || isShowMessSettingPanel"
        />
      </v-col>
    </v-row>
    <popup ref="pop"/>
  </v-container>
</template>
<!-- KSD V001.000 AE -->
