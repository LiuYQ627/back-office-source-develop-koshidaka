 <!-- KSD V001.000 AS -->
 <style src="./../../static/css/EquipmentMasterSetting/EquipmentDialog.css"></style>
<script type="text/javascript" src="./../../static/js/EquipmentMasterSetting/EquipmentEditDialog.js"></script>
 <template>
 <div class="text-center baseFont">
   <v-dialog v-model="dialog" persistent>
     <v-card class="basesize">
       <v-card-title class="headline dialog-line-blue title-label">
         <div id="changeLabel">
           <label id="newModelabel" v-if="mode === 1"><b>{{ $t("C00218.S009") }}</b></label>
          <label id="changeModelabel" v-if="mode === 2"><b>{{ $t("C00218.S008") }}</b></label>
         </div>
         <font class="dialog-title" v-if="mode === 1">{{$t("C00218.S011")}}</font>
         <font class="dialog-title" v-if="mode === 2">{{$t("C00218.S010")}}</font>
       </v-card-title>
       <div id="equipmentTable">
         <table id="outerEquipmentTable">
           <tr>
             <th>{{ $t("C00218.S004") }}</th>
             <td>
               <input type="text" :id="'readOnlyText'"  v-model="equipmentData.equipNo" :disabled=true style="ime-mode:disabled;" maxlength="2" :tabindex="-1" />
             </td>
           </tr>
           <tr>
             <th>{{ $t("C00218.S005") }}</th>
             <td>
               <input type="text" :class="this.equipNameErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'"  ref="equipmentNameInput" v-model="equipmentData.equipName" :placeholder="this.$i18n.t('C00218.S012')" maxlength="16" :tabindex="102" @input="(e) => inputLimit(e, 16, equipmentData, 'equipName')" />
             </td>
           </tr>
           <tr v-if="this.equipNameErrorMsg !== ''" class="errorCell">
             <th />
             <td colspan="2">
               <div >
                 <label>{{  $t("C00218.E009") }}</label>
               </div>
             </td>
           </tr>
           <tr>
             <th>{{ $t("C00218.S006") }}</th>
             <td>
               <input type="text" :class="this.equipShortNameErrorMsg !== '' ? 'errorTextBox' : 'editTextBox'"  ref="equipmentShortNameInput" v-model="equipmentData.equipShortName" :placeholder="this.$i18n.t('C00218.S013')" maxlength="8" :tabindex="102" @input="(e) => inputLimit(e, 8, equipmentData, 'equipShortName')"/>
             </td>
           </tr>
           <tr v-if="this.equipShortNameErrorMsg !== ''" class="errorCell">
             <th />
             <td colspan="2">
               <div >
                 <label>{{  $t("C00218.E009") }}</label>
               </div>
             </td>
           </tr>
         </table>
       </div>
       <v-card-actions class="dialog-fotter">
         <v-spacer></v-spacer>
         <div class="deleteButton">
           <v-btn class="button dialog-fotter-button-blue footerButtonStyle" @click="onClickDelete()" v-if="mode === 2" :disabled="(!$root.approvalFlg && !$root.deleteAuth) || sessionBusinessUnitCd === equipmentData.businessUnitCd" :tabindex="114 + contractServices.length * 2 + 5">
             {{ $t("O00004.S024") }}
           </v-btn>
         </div>
         <v-btn class="button dialog-fotter-button-gray footerButtonStyle" @click="onClickReturn()" :tabindex="115 + contractServices.length * 2 + 6">
           {{ $t("O00004.S003") }}
         </v-btn>
         <v-btn class="button dialog-fotter-button-orange footerButtonStyle" @click="onClickSave()" :disabled="operationLock || (!$root.approvalFlg && !$root.registerAuth)" :tabindex="116 + contractServices.length * 2 + 7">
           {{ $t("O00004.S008") }}
         </v-btn>
       </v-card-actions>
     </v-card>
   </v-dialog>
   <popup ref="pop"/>
 </div>
 </template>
  <!-- KSD V001.000 AE -->
