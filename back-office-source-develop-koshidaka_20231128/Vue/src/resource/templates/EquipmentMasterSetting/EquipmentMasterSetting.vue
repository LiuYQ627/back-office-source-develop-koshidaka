 <!-- KSD V001.000 AS -->
 <style src="./../../static/css/MasterCommon/masterCommon.css"></style>
 <style src="./../../static/css/EquipmentMasterSetting/EquipmentMaster.css"></style>
<script type="text/javascript" src="./../../static/js/EquipmentMasterSetting/EquipmentMasterSetting.js"></script>
 <template>
   <v-container style="width: 680px;margin-top:60px;" class="baseFont baseContainer">
     <v-row id="inputRow" align="center">
       <v-col :cols="4" align="start" style="padding: 0px;">
         <div class="inputLabel" v-html="$t('C00218.S001')"/>
       </v-col>
       <v-col class="bkColorBlue">
         <div class="underLine2 equipmentClass">
           <input type="text" class="inputText" ref="directInputText" v-model="equipCdData"  @keydown.enter="directInput" @input="equipCdInput" style="ime-mode:disabled;" :placeholder="this.$i18n.t('C00218.S002')" maxlength="2" :disabled="operationLock" tabindex="1"/>
         </div>
       </v-col>
     </v-row>
     <v-row style="height: 38px;width: 680px;margin-top:-8px">
      <v-col style="text-align: left;">
        <font class="baseFont" style="font-size:20px;margin-left:-12px"><b style="font-weight:normal;">{{ $t("C00218.S014") }}{{resultCount}}{{ $t("C00218.S003") }}</b></font>
      </v-col>
    </v-row>
     <v-row style="height: 30px;width: 680px;">
       <v-col :cols="3" style="padding: 0px;">
         <label id="ListHeader">{{ $t("C00218.S004") }}</label>
       </v-col>
       <v-col :cols="4" style="padding: 0px;">
         <label id="ListHeader">{{ $t("C00218.S005") }}</label>
       </v-col>
       <v-col :cols="4" style="padding: 0px;">
         <label id="ListSplitHeader">{{ $t("C00218.S006") }}</label>
       </v-col>
       <v-col :cols="1" style="padding: 0px;">
         <label id="ListSplitHeader"><font style="margin-left:-21px">{{ $t("C00218.S007") }}</font></label>
       </v-col>
     </v-row>
     <v-row  v-if="operationLock === false" v-for="(masterItem,index) in findEquipmentList" :key="masterItem.name" style="min-height: 50px;width: 680px;">
       <v-col :cols="3" style="padding: 0px;">
         <label class="ListElement" :id ="'code'+index"><font class="CenterNameClass" style="margin-left:10px">{{masterItem.equipNo}}</font></label>
       </v-col>
       <v-col :cols="4" style="padding: 0px;">
         <label class="ListElement" :id ="'code'+index"><font class="NameClass" style="margin-left:10px">{{masterItem.equipName}}</font></label>
       </v-col>
       <v-col :cols="4" style="padding: 0px;">
         <label class="ListSplitElement" style="border-left:1px solid #9ea0aa;" :id ="'name'+index"><font class="NameClass" >{{masterItem.equipShortName}}</font></label>
       </v-col>
       <v-col :cols="1" style="padding: 0px;" @click="selectedListDate(masterItem)">
         <label class="ListSplitElement" style="border-right:1px solid #9ea0aa;" :id ="'edit'+index"><img style="width: 45px; height: 45px;" src="@/assets/ico_edit@2x.png" @keydown.enter="selectedListDate(masterItem)" @keydown.space="selectedListDate(masterItem)" alt="" tabindex="5" class="scrollNone"/></label>
       </v-col>

     </v-row>
     <v-row style="width: 100%;">
       <v-col>
         <maint-button @close="closeTab" />
       </v-col>
     </v-row>
     <edit-dialog ref="editDialog" v-on:clickSubmit="dialogConfirm()" />
     <dialog-store-select ref="dialogStoreSelect"/>
     <popup ref="pop"/>
   </v-container>
 </template>
  <!-- KSD V001.000 AE -->
