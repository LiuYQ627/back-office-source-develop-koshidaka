<!-- KSD V001.000 AS -->
<style src="./../../static/css/MemberRankSetting/MemberDialog.css"></style>
<script
  type="text/javascript"
  src="./../../static/js/MemberRankSetting/MemberEditDialog.js"
></script>
<template>
  <div class="text-center baseFont">
    <v-dialog v-model="dialog" persistent>
      <v-card class="basesize">
        <v-card-title class="headline dialog-line-blue title-label">
          <div id="changeLabel">
            <label id="newModelabel" v-if="mode === 1"><b>{{ $t("C00213.S015") }}</b></label>
            <label id="changeModelabel" v-if="mode === 2"
              ><b>{{ $t("C00213.S013") }}</b></label
            >
          </div>
          <font class="dialog-title">{{ title }}</font>
        </v-card-title>
        <div id="memberTable">
          <table id="outerMemberTable">
            <tr>
              <th>{{ $t("C00213.S006") }}</th>
              <td>
                <input
                  type="text"
                  :id="'readOnlyText'"
                  v-model="memberData.indexNo"
                  :disabled="true"
                  style="ime-mode:disabled;"
                  maxlength="2"
                  :tabindex="-1"
                />
              </td>
            </tr>
            <tr>
              <th>{{ $t("C00213.S007") }}</th>
              <td>
                <input
                  type="number"
                  class="disabled"
                  ref="memberRankNoInput"
                  v-model="memberData.memberRankNo"
                  maxlength="1"
                  :tabindex="101"
                  disabled
                />
              </td>
            </tr>
            <tr>
              <th v-html="$t('C00213.S008')"></th>
              <td>
                <text-input
                  type="text"
                  ref="memberRankNameText"
                  class="textName"
                  v-model="memberData.memberRankName"
                  :placeholder="this.$i18n.t('C00213.S009')"
                  :max-byte-length="16"
                  :tabindex="102"
                />
              </td>
            </tr>
            <tr>
              <th>{{ $t("C00213.S010") }}</th>
              <td>
                <input
                  type="number"
                  class="disabled"
                  ref="ticketNoInput"
                  pattern="\d*"
                  v-model="memberData.ticketNo"
                  maxlength="2"
                  :tabindex="102"
                  disabled
                />
              </td>
            </tr>
          </table>
        </div>
        <v-card-actions class="dialog-fotter">
          <v-spacer></v-spacer>
          <div class="deleteButton">
            <v-btn
              class="button dialog-fotter-button-blue footerButtonStyle"
              @click="onClickDelete()"
              v-if="mode === 2"
              :disabled="
                (!$root.approvalFlg && !$root.deleteAuth) ||
                  sessionBusinessUnitCd === memberData.businessUnitCd
              "
              :tabindex="114 + contractServices.length * 2 + 5"
            >
              {{ $t("O00004.S024") }}
            </v-btn>
          </div>
          <v-btn
            class="button dialog-fotter-button-gray footerButtonStyle"
            @click="onClickReturn()"
            :tabindex="115 + contractServices.length * 2 + 6"
          >
            {{ $t("O00004.S003") }}
          </v-btn>
          <v-btn
            class="button dialog-fotter-button-orange footerButtonStyle"
            @click="onClickSave()"
            :disabled="
              operationLock || (!$root.approvalFlg && !$root.registerAuth)
            "
            :tabindex="116 + contractServices.length * 2 + 7"
          >
            {{ $t("O00004.S008") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <popup ref="pop" />
  </div>
</template>
<!-- KSD V001.000 AE -->
