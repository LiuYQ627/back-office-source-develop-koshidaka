<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/CommonInput/tableSelectInput.css"></style>
<script type="text/javascript" src="@/resource/static/js/CommonInput/tableSelectInput.js"></script>
<template>
  <v-container fluid class="table-select-input ma-0 pa-0">
    <v-row no-gutters>
      <v-col class="table-select-input-title">
        {{ title }}
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col class="table-select-input-body" :style="`max-height: ${bodyMaxHeight}px;`">
        <v-row
          no-gutters
          class="table-select-input-option-row"
          v-for="(option, index) in options"
          :key="index"
          :class="{
            'selected-item': selectedItems.indexOf(option.value) !== -1
          }"
          @click.stop="handleRowClick(option.value, $event)"
        >
          <v-col class="table-select-input-option">
            <checkbox-input
              class="me-2 no-pointer-events"
              :value="selectedItems.indexOf(option.value) !== -1"
              v-show="!hideCheckboxes"
              :tabindex="option.tabindex"
            />
            <span>{{ option.name }}</span>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<!-- KSD V001.000 AE -->
