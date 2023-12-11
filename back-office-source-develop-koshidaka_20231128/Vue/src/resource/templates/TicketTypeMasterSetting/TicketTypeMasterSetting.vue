<!-- KSD V001.000 AS -->
<style src="@/resource/static/css/MasterCommon/masterCommon.css"></style>
<style
  src="@/resource/static/css/TicketTypeMasterSetting/ticketTypeMasterSetting.css"
></style>
<script
  type="text/javascript"
  src="@/resource/static/js/TicketTypeMasterSetting/ticketTypeMasterSetting.js"
></script>
<template>
  <v-container class="baseFont ticket-type-master-setting-container-body ticket-type-master-setting-container" fluid>
    <ticketTypeMasterSettingTemplate
      :changedStore="changedStore"
      :targetStoreCodesData="targetStoreCodesData"
      :toSave="toSave"
      :cancel="cancel"
      :del="del"
      :add="add"
      :disableToSave="disableAction.save"
      :disableCancel="disableAction.cancel"
      :disableDel="disableAction.delete"
      :disableAdd="disableAction.add"
      :title="$i18n.t('F322c1.S001')"
    >
      <template #table>
        <v-row class="ticket-type-master-setting-row-count">
          <v-col style="text-align: left;">
            <font class="baseFont" style="font-size:20px;">
              <b style="font-weight:normal;">{{$t('F322c1.S038')+dataTableLen+$t('F322c1.S002') }}</b>
            </font>
          </v-col>
        </v-row>
        <div style="height: 750px" :class="{ disabled: disableAction.table }">
          <tableRenderer
            ref="tableRenderer"
            :disableTable="disableAction.table"
            :dataTable="dataTable"
            :tableProperties="tableProperties"
            :dataRender="dataRender"
            :isClickableRow="true"
            :listHeaderExpand="false"
            :hasCount="false"
            :hasScroll="true"
            :hasEdit="false"
            :isEditWithBorder="true"
            @selectedData="selectedData"
            :editTabIndexStartingPoint="0"
            fitToContainer
          />
        </div>
      </template>
      <template #form>
        <buttonRenderer
          :disabledFields="disableAction.fields"
          :inputModelValue="selectedRow"
          :errMessage="errMessage"
          :targetStoreCd="targetStoreCodesData[0]"
          ref="inputRenderer"
          :isDisabledCode="isDisabledCode"
        />
      </template>
    </ticketTypeMasterSettingTemplate>
    <popup ref="pop" />
  </v-container>
</template>
<!-- KSD V001.000 AE -->
