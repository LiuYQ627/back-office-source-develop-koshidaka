<!-- KSD V001.000 AS -->
<style src="./../../static/css/MasterCommon/masterCommon.css"></style>
<style scope src="./../../static/css/ModelEquipmentMasterSetting/modelEquipmentMasterSetting.css"></style>
<script type="text/javascript" src="./../../static/js/ModelEquipmentMasterSetting/modelEquipmentMasterSetting.js"></script>

<template>
  <v-container class="baseFont model-container">
    <v-row id="inputRowModel" align="center">
      <v-col :cols="2" align="start" style="padding: 0px;" class="modelEquipmentMasterSettingInputLabel">
        <div class="inputLabel" v-html="$t('C00219.S001')"/>
      </v-col>
      <v-col class="bkColorBlue">
        <div class="underLine2 modelEquipmentMasterSettingInput">
          <input type="text" class="inputText" :style="`ime-mode:disabled; ${operationLock ? 'cursor: not-allowed;' : ''}`" v-model="settingCdInputData" ref="settingCdText" @keydown.enter="directInput" @input="settingCdInput" style="ime-mode:disabled;" :placeholder="this.$i18n.t('C00219.S002')" maxlength="4" :disabled="operationLock" tabindex="1"/>
        </div>
      </v-col>
    </v-row>

    <v-row style="height: 38px;width: 1432px;margin-top:-8px">
      <v-col style="text-align: left;">
        <font class="baseFont" style="font-size:20px;margin-left:-12px"><b style="font-weight:normal;">{{ $t("C00219.S017") }}{{resultCount}}{{ $t("C00219.S003") }}</b></font>
      </v-col>
    </v-row>

    <v-row style="height: 30px;width: 1500px;">
      <v-col :cols="1" style="padding: 0px;">
        <label id="listHeader">{{ $t("C00219.S004") }}</label>
      </v-col>
      <v-col :cols="2" style="padding: 0px;">
        <label id="listHeader">{{ $t("C00219.S005") }}</label>
      </v-col>
      <v-col :cols="5" style="padding: 0px;">
        <label id="listHeader"><font>{{ $t("C00219.S006") }}</font></label>
      </v-col>
      <v-col :cols="2" style="padding: 0px;">
        <label id="listHeader"><font>{{ $t("C00219.S007") }}</font></label>
      </v-col>
      <v-col :cols="1" style="padding: 0px;">
        <label id="listHeader" class="model-equipment-master-setting-second-to-last-col" style="border-right: 0px;"><font>{{ $t("C00219.S008") }}</font></label>
      </v-col>
      <v-col :cols="1" style="padding: 0px;">
        <label id="ListSplitHeader" style="width: 56px !important; border-right: none !important;"><font style="margin-left: -21px;">{{ $t("C00219.S009") }}</font></label>
      </v-col>
    </v-row>
    <v-row v-for="(modelItem, index) in modelSettingDataDisplay" :key="modelItem.index" style="height: 50px;width: 1500px;">
      <v-col :cols="1" style="padding: 0px;">
        <label class="ListElement" :id="'modelNo'+index" ><font class="NumericStyle" style="margin-left:10px; margin: auto">{{modelItem.modelNo}}</font></label>
      </v-col>
      <v-col :cols="2" style="padding: 0px;">
        <label class="listElement" :id="'equipNo'+index" style="border-left:1px solid #9ea0aa;" ><font class="NumericStyle ellipsis" style="margin-left:10px; vertical-align: super;"></font>{{modelItem.equipName}}</font></label>
      </v-col>
      <v-col :cols="5" style="padding: 0px;" >
        <label class="listElement" :id="'modelName'+index" style="border-right:1px solid #9ea0aa;" ><font class="NumericStyle ellipsis" style="margin-left:10px; vertical-align: super;"></font>{{modelItem.modelName}}</font></label>
      </v-col>
      <v-col :cols="2" style="padding: 0px;" >
        <label class="listElement" :id="'modelShortName'+index" style="border-right:1px solid #9ea0aa;" ><font class="NumericStyle ellipsis" style="margin-left:10px; vertical-align: super;"></font>{{modelItem.modelShortName}}</font></label>
      </v-col>
      <v-col :cols="1" style="padding: 0px;" >
        <label class="listElement model-equipment-master-setting-second-to-last-col" :id="'dispSeq'+index" style="border-right: none; text-align: right;" ><font class="NumericStyle ellipsis" style="margin-left:10px; vertical-align: super;"></font>{{modelItem.dispSeq}}</font></label>
      </v-col>
      <v-col :cols="1" style="padding: 0px;" @keydown.space="selectedModelSetting(modelItem.modelNo)" @keydown.enter="selectedModelSetting(modelItem.modelNo)" @click="selectedModelSetting(modelItem.modelNo)">
        <label class="ListSplitElement" :id ="'edit'+index" style="width: 56px !important; border-right:1px solid #9ea0aa; border-left: none;" ><img style="width: 45px; height: 45px;" src="@/assets/ico_edit@2x.png" alt="" tabindex="5" class="scrollNone" /></label>
      </v-col>
    </v-row>

    <!-- 右側 -->
    <v-row style="width: 100%">
          <v-col>
            <maint-button
              @close="closeTab"
            />
          </v-col>
        </v-row>
    <edit-dialog ref="editDialog" v-on:clickSubmit="dialogConfirm()"/>
    <popup ref="pop" />
  </v-container>
</template>
<!-- KSD V001.000 AE -->
