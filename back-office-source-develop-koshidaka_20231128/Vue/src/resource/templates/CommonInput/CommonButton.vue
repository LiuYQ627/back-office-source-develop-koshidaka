<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/CommonInput/commonButton.css" />
<script type="text/javascript" src="@/resource/static/js/CommonInput/commonButton.js" />
<template>
  <v-btn
    class="common-button"
    :class="classes"
    block
    dark
    color="secondary"
    :disabled="disabled"
    @click="this.emit('click', $event)">
    <slot></slot>
  </v-btn>
</template>
<!-- KSD V001.000 AE -->
