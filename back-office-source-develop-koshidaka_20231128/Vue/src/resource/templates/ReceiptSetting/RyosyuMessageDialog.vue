 <!--
 * ---------+---------------------+----------+--------------------------------
 *  DATE    |NAME(Inc)            |GUIDE     |GUIDANCE
 * ---------+---------------------+----------+--------------------------------
 * 20230206  wangchunmei(Neusoft)  G001.00.0  issue課題#836を対応します.
-->
<style src="@/resource/static/css/CommonDesign/utils.css" />
<style src="./../../static/css/MasterCommon/masterDialog.css"></style>
<script type="text/javascript" src="@/resource/static/js/ReceiptSetting/RyosyuMessageDialog.js"/>

<template>
  <div>
    <v-dialog
      v-model="ryosyuMessageDisplayed"
      persistent
      width="800px">
      <v-card class="basesize">
        <v-card-title class="headline dialog-line-blue title-label">
          <div id="changeLabel">
            <label
              id="newModelabel"
              v-if="!params.id"><b>{{ $i18n.t("F322b3.S035") }}</b></label>
            <label
              id="changeModelabel"
              v-if="params.id"><b>{{ $i18n.t("F322b3.S036") }}</b></label>
          </div>
          <font class="dialog-title">{{ $i18n.t("F322b3.S014") }}</font>
        </v-card-title>
        <div style="height: 354px;overflow-y: auto;margin: 20px 26px;">
          <!-- 領収証メッセージ（1行目） -->
          <v-row
            no-gutters
            class="conditionRow w-100 d-flex align-center">
            <v-col
              cols="5"
              class="h-100">
              <label class="grayFrame h-100 w-100 d-flex justify-center align-center">
                {{ $i18n.t('F322b3.S015') }}
              </label>
            </v-col>

            <v-col
              cols="6"
              class="h-100">
              <input
                id="ryosyuMessage_1"
                class="whiteFrame h-100 w-100 pl-2"
                type="text"
                v-model="params.ryosyuMessage_1"
                :placeholder="this.$i18n.t('F322b3.S053')"
                @input="inputLimit(params.ryosyuMessage_1,30)"
              >
            </v-col>
          </v-row>

          <!-- 領収証メッセージ（2行目） -->
          <v-row
            no-gutters
            class="conditionRow w-100 d-flex align-center mt-1">
            <v-col
              cols="5"
              class="h-100">
              <label class="grayFrame h-100 w-100 d-flex justify-center align-center">
                {{ $i18n.t('F322b3.S016') }}
              </label>
            </v-col>

            <v-col
              cols="6"
              class="h-100">
              <input
                id="ryosyuMessage_2"
                class="whiteFrame h-100 w-100 pl-2"
                type="text"
                v-model="params.ryosyuMessage_2"
                :placeholder="this.$i18n.t('F322b3.S053')"
                @input="inputLimit(params.ryosyuMessage_2,30)"
              >
            </v-col>
          </v-row>

          <!-- 領収証メッセージ（3行目） -->
          <v-row
            no-gutters
            class="conditionRow w-100 d-flex align-center mt-1">
            <v-col
              cols="5"
              class="h-100">
              <label class="grayFrame h-100 w-100 d-flex justify-center align-center">
                {{ $i18n.t('F322b3.S017') }}
              </label>
            </v-col>

            <v-col
              cols="6"
              class="h-100">
              <input
                id="ryosyuMessage_3"
                class="whiteFrame h-100 w-100 pl-2"
                type="text"
                v-model="params.ryosyuMessage_3"
                :placeholder="this.$i18n.t('F322b3.S053')"
                @input="inputLimit(params.ryosyuMessage_3,30)"
              >
            </v-col>
          </v-row>

          <!-- 領収証メッセージ（4行目） -->
          <v-row
            no-gutters
            class="conditionRow w-100 d-flex align-center mt-1">
            <v-col
              cols="5"
              class="h-100">
              <label class="grayFrame h-100 w-100 d-flex justify-center align-center">
                {{ $i18n.t('F322b3.S018') }}
              </label>
            </v-col>

            <v-col
              cols="6"
              class="h-100">
              <input
                id="ryosyuMessage_4"
                class="whiteFrame h-100 w-100 pl-2"
                type="text"
                v-model="params.ryosyuMessage_4"
                :placeholder="this.$i18n.t('F322b3.S053')"
                @input="inputLimit(params.ryosyuMessage_4,30)"
              >
            </v-col>
          </v-row>

          <!-- 領収証メッセージ（5行目） -->
          <v-row
            no-gutters
            class="conditionRow w-100 d-flex align-center mt-1">
            <v-col
              cols="5"
              class="h-100">
              <label class="grayFrame h-100 w-100 d-flex justify-center align-center">
                {{ $i18n.t('F322b3.S019') }}
              </label>
            </v-col>

            <v-col
              cols="6"
              class="h-100">
              <input
                id="ryosyuMessage_5"
                class="whiteFrame h-100 w-100 pl-2"
                type="text"
                v-model="params.ryosyuMessage_5"
                :placeholder="this.$i18n.t('F322b3.S053')"
                @input="inputLimit(params.ryosyuMessage_5,30)"
              >
            </v-col>
          </v-row>

          <!-- 領収証メッセージ（6行目） -->
          <v-row
            no-gutters
            class="conditionRow w-100 d-flex align-center mt-1">
            <v-col
              cols="5"
              class="h-100">
              <label class="grayFrame h-100 w-100 d-flex justify-center align-center">
                {{ $i18n.t('F322b3.S020') }}
              </label>
            </v-col>

            <v-col
              cols="6"
              class="h-100">
              <input
                id="ryosyuMessage_6"
                class="whiteFrame h-100 w-100 pl-2"
                type="text"
                v-model="params.ryosyuMessage_6"
                :placeholder="this.$i18n.t('F322b3.S053')"
                @input="inputLimit(params.ryosyuMessage_6,30)"
              >
            </v-col>
          </v-row>

          <!-- 領収証メッセージ（7行目） -->
          <v-row
            no-gutters
            class="conditionRow w-100 d-flex align-center mt-1">
            <v-col
              cols="5"
              class="h-100">
              <label class="grayFrame h-100 w-100 d-flex justify-center align-center">
                {{ $i18n.t('F322b3.S021') }}
              </label>
            </v-col>

            <v-col
              cols="6"
              class="h-100">
              <input
                id="ryosyuMessage_7"
                class="whiteFrame h-100 w-100 pl-2"
                type="text"
                v-model="params.ryosyuMessage_7"
                :placeholder="this.$i18n.t('F322b3.S053')"
                @input="inputLimit(params.ryosyuMessage_7,30)"
              >
            </v-col>
          </v-row>

          <!-- 領収証メッセージ（8行目） -->
          <v-row
            no-gutters
            class="conditionRow w-100 d-flex align-center mt-1">
            <v-col
              cols="5"
              class="h-100">
              <label class="grayFrame h-100 w-100 d-flex justify-center align-center">
                {{ $i18n.t('F322b3.S022') }}
              </label>
            </v-col>

            <v-col
              cols="6"
              class="h-100">
              <input
                id="ryosyuMessage_8"
                class="whiteFrame h-100 w-100 pl-2"
                type="text"
                v-model="params.ryosyuMessage_8"
                :placeholder="this.$i18n.t('F322b3.S053')"
                @input="inputLimit(params.ryosyuMessage_8,30)"
              >
            </v-col>
          </v-row>

          <!-- 領収証メッセージ（9行目） -->
          <v-row
            no-gutters
            class="conditionRow w-100 d-flex align-center mt-1">
            <v-col
              cols="5"
              class="h-100">
              <label class="grayFrame h-100 w-100 d-flex justify-center align-center">
                {{ $i18n.t('F322b3.S023') }}
              </label>
            </v-col>

            <v-col
              cols="6"
              class="h-100">
              <input
                id="ryosyuMessage_9"
                class="whiteFrame h-100 w-100 pl-2"
                type="text"
                v-model="params.ryosyuMessage_9"
                :placeholder="this.$i18n.t('F322b3.S053')"
                @input="inputLimit(params.ryosyuMessage_9,30)"
              >
            </v-col>
          </v-row>

          <!-- 領収証メッセージ（10行目） -->
          <v-row
            no-gutters
            class="conditionRow w-100 d-flex align-center mt-1">
            <v-col
              cols="5"
              class="h-100">
              <label class="grayFrame h-100 w-100 d-flex justify-center align-center">
                {{ $i18n.t('F322b3.S024') }}
              </label>
            </v-col>

            <v-col
              cols="6"
              class="h-100">
              <input
                id="ryosyuMessage_10"
                class="whiteFrame h-100 w-100 pl-2"
                type="text"
                v-model="params.ryosyuMessage_10"
                :placeholder="this.$i18n.t('F322b3.S053')"
                @input="inputLimit(params.ryosyuMessage_10,30)"
              >
            </v-col>
          </v-row>

          <!-- 領収証メッセージ（11行目） -->
          <v-row
            no-gutters
            class="conditionRow w-100 d-flex align-center mt-1">
            <v-col
              cols="5"
              class="h-100">
              <label class="grayFrame h-100 w-100 d-flex justify-center align-center">
                {{ $i18n.t('F322b3.S025') }}
              </label>
            </v-col>

            <v-col
              cols="6"
              class="h-100">
              <input
                id="ryosyuMessage_11"
                class="whiteFrame h-100 w-100 pl-2"
                type="text"
                v-model="params.ryosyuMessage_11"
                :placeholder="this.$i18n.t('F322b3.S053')"
                @input="inputLimit(params.ryosyuMessage_11,30)"
              >
            </v-col>
          </v-row>

          <!-- 領収証メッセージ（12行目） -->
          <v-row
            no-gutters
            class="conditionRow w-100 d-flex align-center mt-1">
            <v-col
              cols="5"
              class="h-100">
              <label class="grayFrame h-100 w-100 d-flex justify-center align-center">
                {{ $i18n.t('F322b3.S026') }}
              </label>
            </v-col>

            <v-col
              cols="6"
              class="h-100">
              <input
                id="ryosyuMessage_12"
                class="whiteFrame h-100 w-100 pl-2"
                type="text"
                v-model="params.ryosyuMessage_12"
                :placeholder="this.$i18n.t('F322b3.S053')"
                @input="inputLimit(params.ryosyuMessage_12,30)"
              >
            </v-col>
          </v-row>
        </div>
        <v-card-actions class="dialog-fotter">
          <v-spacer/>
          <v-btn
            class="button dialog-fotter-button-gray footerButtonStyle"
            @click="closeDialog()"
            tabindex="112">
            {{ $t("O00004.S003") }}
          </v-btn>
          <v-btn
            :disabled="!this.permissions.includes('CLOUDPOS_RECEIPT_UPDATE')"
            class="button dialog-fotter-button-orange footerButtonStyle"
            @click="onClickOk()"
            tabindex="113">
            {{ $t("O00004.S008") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <popup ref="pop" />
  </div>
</template>
