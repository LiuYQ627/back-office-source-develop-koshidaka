<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/CommonDesign/utils.css"></style>
<style scoped src="@/resource/static/css/MasterCommon/masterDialog.css"></style>
<style scoped src="@/resource/static/css/ReceiptSetting/entranceSlipOptionalCommentDialog.css"></style>
<script type="text/javascript" src="@/resource/static/js/ReceiptSetting/EntranceSlipOptionalCommentDialog.js"></script>

<template>
  <div>
    <v-dialog
      v-model="optionalCommentMessageDisplayed"
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
          <label class="dialog-title">{{ $i18n.t("F322b3.S106") }}</label>
        </v-card-title>
        <div class="v-dialog-body-wrapper ">
          <!-- 領収証メッセージ（1行目） -->
          <v-row
            no-gutters
            class="conditionRow w-100 d-flex align-center">
            <v-col
              cols="5"
              class="h-100">
              <label class="grayFrame h-100 w-100 d-flex justify-center align-center">
                {{ $i18n.t("F322b3.S107") }}
              </label>
            </v-col>

            <v-col
              cols="6"
              class="h-100">
              <input
                id="optionalCommentMessage_1"
                class="whiteFrame h-100 w-100 pl-2"
                type="text"
                v-model="optionalComment.optionalCommentMessage_1"
                :placeholder="$i18n.t('F322b3.S112')"
                @input="inputLimit(optionalComment.optionalCommentMessage_1,32)"
                tabindex="106"
              >
            </v-col>
          </v-row>
          <v-row
            no-gutters
            class="conditionRow w-100 d-flex align-center mt-1">
            <v-col
              cols="5"
              class="h-100">
              <label class="grayFrame h-100 w-100 d-flex justify-center align-center">
                {{ $i18n.t("F322b3.S108") }}
              </label>
            </v-col>

            <v-col
              cols="6"
              class="h-100">
              <input
                id="optionalCommentMessage_2"
                class="whiteFrame h-100 w-100 pl-2"
                type="text"
                v-model="optionalComment.optionalCommentMessage_2"
                :placeholder="$i18n.t('F322b3.S112')"
                @input="inputLimit(optionalComment.optionalCommentMessage_2,32)"
                tabindex="107"
              >
            </v-col>
          </v-row>
          <v-row
            no-gutters
            class="conditionRow w-100 d-flex align-center mt-1">
            <v-col
              cols="5"
              class="h-100">
              <label class="grayFrame h-100 w-100 d-flex justify-center align-center">
                {{ $i18n.t("F322b3.S109") }}
              </label>
            </v-col>

            <v-col
              cols="6"
              class="h-100">
              <input
                id="optionalCommentMessage_3"
                class="whiteFrame h-100 w-100 pl-2"
                type="text"
                v-model="optionalComment.optionalCommentMessage_3"
                :placeholder="$i18n.t('F322b3.S112')"
                @input="inputLimit(optionalComment.optionalCommentMessage_3,32)"
                tabindex="108"
              >
            </v-col>
          </v-row>
          <v-row
            no-gutters
            class="conditionRow w-100 d-flex align-center mt-1">
            <v-col
              cols="5"
              class="h-100">
              <label class="grayFrame h-100 w-100 d-flex justify-center align-center">
                {{ $i18n.t("F322b3.S110") }}
              </label>
            </v-col>

            <v-col
              cols="6"
              class="h-100">
              <input
                id="optionalCommentMessage_4"
                class="whiteFrame h-100 w-100 pl-2"
                type="text"
                v-model="optionalComment.optionalCommentMessage_4"
                :placeholder="$i18n.t('F322b3.S112')"
                @input="inputLimit(optionalComment.optionalCommentMessage_4,32)"
                tabindex="109"
              >
            </v-col>
          </v-row>
          <v-row
            no-gutters
            class="conditionRow w-100 d-flex align-center mt-1">
            <v-col
              cols="5"
              class="h-100">
              <label class="grayFrame h-100 w-100 d-flex justify-center align-center">
                {{ $i18n.t("F322b3.S111") }}
              </label>
            </v-col>

            <v-col
              cols="6"
              class="h-100">
              <input
                id="optionalCommentMessage_5"
                class="whiteFrame h-100 w-100 pl-2"
                type="text"
                v-model="optionalComment.optionalCommentMessage_5"
                :placeholder="$i18n.t('F322b3.S112')"
                @input="inputLimit(optionalComment.optionalCommentMessage_5,32)"
                tabindex="110"
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
<!-- KSD V001.000 AE -->
