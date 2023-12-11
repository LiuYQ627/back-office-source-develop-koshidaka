<!-- KSD V001.000 AS -->
<script>
export default {
  props: {
    errorModel: {
      type: String,
      default: ''
    },
    leftSpacing: {
      type: String,
      default: '144.875px'
    },
    colSpacer: {
      type: Boolean,
      default: true
    },
    errorPadding: {
      type: String,
      default: 'padding: 5px 0 15px 0;'
    },
    renderHTML: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      spacing: this.leftSpacing || '144.875px'
    }
  }
}
</script>

<template>
  <v-row
    v-show="this.errorModel !== ''"
    :style="`${this.errorPadding} margin:auto;`"
  >
    <v-col
      v-if="colSpacer"
      :cols="leftSpacing ? null : 4"
      :style="{ 'max-width': spacing, 'min-width': spacing }"
    />
    <v-col class="errorMessage">
      <label
        v-if="renderHTML"
        v-html="this.errorModel"/>
      <label v-else>{{ this.errorModel }}</label>
    </v-col>
  </v-row>
</template>

<style>
.errorMessage {
  color: red;
  text-align: left;
  font-size: 20px;
  padding: 0;
  flex-direction: row;
}
</style>
<!-- KSD V001.000 AE -->
