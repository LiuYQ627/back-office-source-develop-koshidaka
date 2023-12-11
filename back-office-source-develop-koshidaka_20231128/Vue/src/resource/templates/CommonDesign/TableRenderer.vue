<!-- KSD V001.000 AS -->
<style src="./../../static/css/CommonDesign/tableRenderer.css"></style>
<script type="text/javascript" src="./../../static/js/CommonDesign/tableRenderer.js"></script>
<template>
  <div style="position: relative;" :style="fitToContainer && { height: '100%' }">
    <div v-if="disableTable" class="d-flex disableTable"
      :style="{ height: `${hasScroll ? clientDivHeight + 30 : gitHeight()}px`, marginTop: hasCount ? '38px' : '0' }"
      :class="{ disableTable: disableTable }" />
    <v-row style="height: 38px; margin-top: -28px;" v-if="hasCount">
      <v-col style="text-align: left;">
        <font class="baseFont" style="font-size:20px;">
          <b style="font-weight:normal;">全{{ dataTable.length }}件</b>
        </font>
      </v-col>
    </v-row>
    <div class="tableRendereMainContainer" ref="tableRendereMainContainerRef"
      :style="fitToContainer && { height: '100%' }">
      <v-row no-gutters class="w-100 tableRendereHeadContainer">
        <div class="d-flex tableRendereHeadContainerDiv"
          :class="{ tableRendereHeadContainerDivPadRight: hasScroll, listHeaderExpand: listHeaderExpand }">
          <v-col :cols="row.cols" class="pa-0 tableRendereHead"
            v-for="(row, index) in checkHasEdit(tableProperties.header)" :style="row.style" :key="`${row.label}${index}`">
            <label class="ListHeader" :class="{
              ListHeaderNoBorderRight:
                !isEditWithBorder && checkHasEdit(tableProperties.header).length - 2 === index
            }
            ">{{ row.label }}</label>
          </v-col>
        </div>
      </v-row>
      <v-row no-gutters class="tableRendereBody"
        :style="[hasScroll && { overflowY: 'scroll' }, fitToContainer && { height: '100%', maxHeight: 'unset' }]">
        <div no-gutters class="w-100 tableRendereInnerBody" ref="tableRendereInnerBodyRef">
          <v-row no-gutters class="w-100 tableRendereInnerBodyRow" v-for="(row, index) in dataTable"
            :key="`${index}-${row}`" style="height: 50px;" @click="selectData(row, index, 'row', $event)"
            :class="{ tableRendereBodySelected: selectedIndex === index }">
            <v-col :cols="tableProperties.header[indx].cols"
              :style="[tableProperties.header[indx].style, data === 'editFn' && hasEdit && hasScroll && { minWidth: '45px', maxWidth: '45px' }]"
              v-for="data, indx in valueRenderer(row)" class="pa-0 tableRendereBodyListElement" :key="`${indx}`">
              <label class="ListElement" v-if="data !== 'editFn'"
                :style="[!isEditWithBorder && hasEdit && (indx + 1 === tableProperties.header.length - 1) && { borderRight: 0 }]">
                <div class="NameClass2" :class="tableProperties.header[indx].class">{{ data }}</div>
              </label>
              <label v-if="hasEdit && data === 'editFn'" class="ListSplitElement" style="border-right:1px solid #9ea0aa;"
                :class="tableProperties.header[indx].class"
                :style="[isEditWithBorder && { borderLeft: '1px solid #9ea0aa' }]">
                <img style="width: 45px; height: 45px;" src="@/assets/ico_edit@2x.png"
                  @keydown.enter="selectData(row, index, 'editIcon', $event)"
                  @keydown.space="selectData(row, index, 'editIcon', $event)"
                  @click="selectData(row, index, 'editIcon', $event)" alt=""
                  :tabindex="index + editTabIndexStartingPoint" />
              </label>
            </v-col>
          </v-row>
        </div>
      </v-row>
    </div>
  </div>
</template>
<!-- KSD V001.000 AE -->
