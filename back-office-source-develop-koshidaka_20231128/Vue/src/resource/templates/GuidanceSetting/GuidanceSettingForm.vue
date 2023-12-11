<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/CommonDesign/utils.css" />
<style scoped src="@/resource/static/css/MasterCommon/masterCommon.css"></style>
<style scoped src='@/resource/static/css/GuidanceSetting/GuidanceSettingForm.css'></style>
<script type="text/javascript" src="@/resource/static/js/GuidanceSetting/guidanceSettingForm.js" />
<template>
  <div :class="{'disabled': disabled}">
    <!-- ScpNo -->
    <form-group-layout
      class="immutable"
      style="margin-bottom: 15px;"
      :header-cols="4"
      :body-cols="6"
      :title="$t('F32283.S012')">
      <div class='scp-no-input'>
        <text-input
          @click.native="openSelectDialog()"
          style='width: 30%'
          type="text"
          class="form-control"
          v-model="scpNoValue"
          disabled
        />
        <text-input
          style='width: 70%; margin-left: 5px;'
          type="text"
          class="form-control"
          :value="dataModel.guidanceSetting.ScpNo ? selectDataOptions[getGuidanceType].name : ''"
          disabled
        />
      </div>
    </form-group-layout>
    <!-- ガイダンス名称 -->
    <form-group-layout
      style="margin-bottom: 15px;"
      :header-cols="4"
      :body-cols="6"
      :has-error="hasError('guidanceSetting.GidName')"
      :title="$t('F32283.S013')"
      left-spacing="219.55px">
      <text-input
        style='width: 100%'
        type="text"
        :placeholder="$t('F32283.S024')"
        maxLength="24"
        :max-byte-length="24"
        class="form-control"
        :disabled="!dataModel.guidanceSetting.ScpNo"
        v-model="dataModel.guidanceSetting.GidName"
        id="gid-name-input"
      />
    </form-group-layout>
    <!-- セルフガイダンス（英） -->
    <form-group-layout
      class="immutable"
      style="margin-bottom: 15px;"
      :header-cols="4"
      :body-cols="6"
      :title="$t('F32283.S014')">
      <text-input
        style='width: 100%'
        type="text"
        class="form-control"
        disabled
      />
    </form-group-layout>
    <!-- 最小～最大 数量 -->
    <form-group-layout
      style="margin-bottom: 15px;"
      class="remove-bottom-margin"
      :header-cols="4"
      :body-cols="6"
      :title="$t('F32283.S015')"
      :has-error="hasError('guidanceSetting.MaxQty')"
      left-spacing="219.55px"
      error-render-html>
      <div class='min-max-quantity-input'>
        <text-input
          id="min-quantity-input"
          style='width: 35%; border-color: #959ea9 !important'
          :style="{'background': !disableMinMax ? '#fff !important' : ''}"
          type="number"
          min="0"
          max="9"
          maxLength="1"
          class="form-control"
          :placeholder="$t('F32283.S025')"
          :disabled="disableMinMax"
          v-model="dataModel.guidanceSetting.MinQty"
        />
        <div>{{ $t('F32283.S016') }}</div>
        <text-input
          id="max-quantity-input"
          style='width: 35%'
          type="number"
          min="1"
          max="9"
          maxLength="1"
          class="form-control"
          :placeholder="$t('F32283.S025')"
          :disabled="disableMinMax"
          v-model="dataModel.guidanceSetting.MaxQty"
        />
      </div>
    </form-group-layout>
    <v-row>
      <v-col cols="5" />
      <v-col cols="2" />
      <v-col
        cols="5"
        style="padding:0px 12px; margin-bottom: 0px;"
      >
        <select-input
          style="max-height: 50px;margin: auto; width: 270.89px;"
          class='form-control'
          value="1"
          :options='departmentOptions'
          :empty-option='false'
          disabled
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="5"
        style="padding-top:0px">
        <menu-code-list
          v-model='selectedMenuCode'
          :menu-code-list='dataModel.guidanceSetting.MenuCodes'
          :global-menu-code-list='filteredGlobalMenuCodesList'
          @selectionChanged='handleListSelectionChanged'
          @addMenuCode="(transferData) => addMenuCode(transferData)"
          @moveMenuCode="(transferData) => moveMenuCode(transferData)" />
      </v-col>
      <v-col
        cols="2"
        style="margin:auto">
        <v-row>
          <v-btn
            class="menu-code-list-btn"
            :disabled="disableAddMenuCode"
            @click="() => addMenuCode()">
            <span class="menu-code-list-btn-text">
              {{ $t('F32283.S022') }}
            </span>
          </v-btn>
        </v-row>
        <v-row>
          <v-btn
            class="menu-code-list-btn"
            :disabled="disableRemoveMenuCode"
            @click="() => removeMenuCode()"
          >
            <span class="menu-code-list-btn-text">
              {{ $t('F32283.S023') }}
            </span>
          </v-btn>
        </v-row>
      </v-col>
      <v-col
        cols="5"
        style="padding-top:0px">
        <global-menu-code-list
          v-model='selectedGlobalMenuCode'
          :global-menu-code-list='filteredGlobalMenuCodesList'
          :menu-code-list='dataModel.guidanceSetting.MenuCodes'
          @selectedMenuCodes='getProcessedGlobalMenuCodeList'
          @selectionChanged='handleListSelectionChanged'/>
      </v-col>
    </v-row>
    <popup ref="pop" />
  </div>
</template>
<!-- KSD V001.000 AE -->
