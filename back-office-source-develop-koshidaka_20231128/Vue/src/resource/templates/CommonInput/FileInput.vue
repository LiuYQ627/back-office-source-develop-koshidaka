<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/CommonInput/fileInput.css" />
<script type="text/javascript" src="@/resource/static/js/CommonInput/fileInput.js" />

<template>
  <v-row no-gutters class="file-input-container">
    <v-col class="file-input">
      <v-btn :id="id"
        :class="{
          'input-button': !large,
          'input-button-large': large
        }"
        @click="openFilePicker"
        :disabled="disabled"
      >
        {{ title }}
      </v-btn>
      <input
        ref="fileInput"
        :enctype="enctype"
        :type="type"
        :id="id"
        @change="handleChange"
        :accept="accept"
        :hidden="hidden"
        :disabled="disabled"
      >
    </v-col>
  </v-row>
</template>
<!-- KSD V001.000 AE -->
