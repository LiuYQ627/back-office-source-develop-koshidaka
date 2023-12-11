<!-- // KSD V001.000 AS -->
<style src="@/resource/static/css/CommonInput/codeNewDirectEdit.css" />
<script type="text/javascript" src="@/resource/static/js/CommonInput/CodeNewDirectEdit.js" />

<template>
  <v-row no-gutters class="inputRow" align="center" >
    <v-col :cols="inputLabelCols" align="start" class="pa-0">
      <div class="inputLabel inputLabelWorldBreak" v-html="inputLabel"/>
    </v-col>
    <v-col class="bkColorBlue">
      <div class="underLine2 mr-2">
        <input type="text" 
          class="inputText2" 
          v-model="inputVal"
          ref="inputRef"
          @keydown.enter="atEnter" 
          @input="atInput"
          oninput="this.value = this.value.replace(/[^0-9]/gi, '')"
          :style="inputStyle" 
          :placeholder="placeholder" 
          :maxlength="maxlength" 
          :disabled="disabled" 
          :tabindex="tabindex"
        />
      </div>
    </v-col>
  </v-row>
</template>
<!-- // KSD V001.000 AE -->
