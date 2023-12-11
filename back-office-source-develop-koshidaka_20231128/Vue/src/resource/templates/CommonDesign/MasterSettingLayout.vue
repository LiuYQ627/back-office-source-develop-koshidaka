<!-- KSD V001.000 AS -->
<script
  type="text/javascript"
  src="@/resource/static/js/CommonDesign/masterSettingLayout.js"
></script>
<template>
  <v-container
    class="masterLayoutContainer baseFont"
  >
    <v-row>
      <v-col cols="7" class="pt-0">
        <v-row
          no-gutters
          class="masterLayoutContainerRow"
        >
          <form-group-layout
            :title="title"
            fixedHeader
            :headerWidth="146"
          >
            <store-select
              :disabled="isEditMode"
              hasCodeName
              v-model="targetStoreCodes"
              @change="changedStore"
              headquartersAuthorityCheckEnable
            />
          </form-group-layout>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="7">
        <slot name="table"></slot>
      </v-col>
      <v-col cols="5">
        <slot name="form"></slot>
      </v-col>
    </v-row>
    <v-row style="width: 100%;">
      <v-col>
        <maint-button
          @add="add"
          @close="closeTab"
          @toSave="toSave"
          @clear="cancel"
          @del="del"
          :isaddBtn="disableAdd"
          :isfixedBtn="disableToSave"
          :isclearBtn="disableCancel"
          :isdelBtn="disableDel"
          :isCloseBtn="!disableToSave"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<!-- KSD V001.000 AE -->
