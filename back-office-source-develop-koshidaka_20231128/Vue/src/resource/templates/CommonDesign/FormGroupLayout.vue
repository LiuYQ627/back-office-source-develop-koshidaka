<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/CommonDesign/formGroupLayout.css" />
<script type="text/javascript" src="@/resource/static/js/CommonDesign/formGroupLayout.js" />

<template>
  <v-row
    no-gutters
    class="form-group-container">
    <v-col>
      <v-row
        v-if="!isVertical"
        no-gutters
        class="form-group">
        <v-col
          :cols="fixedHeader ? undefined : headerCols"
          :style="{
            width: fixedHeader ? `${headerWidth}px !important` : undefined,
            'max-width': fixedHeader ? `${headerWidth}px !important` : undefined
          }"
        >
          <slot name="header">
            <label class="form-label">
              {{ title }}
            </label>
          </slot>
        </v-col>
        <v-col
          :cols="fixedHeader ? undefined : bodyCols"
          :class="{'has-error': hasError}">
          <slot/>
        </v-col>
      </v-row>
      <v-row
        v-else
        no-gutters
        class="form-group-vertical">
        <v-col>
          <v-row no-gutters>
            <v-col
              :style="{
                width: fixedHeader ? `${headerWidth}px !important` : undefined,
                'max-width': fixedHeader ? `${headerWidth}px !important` : undefined
              }"
            >
              <slot name="header">
                <label
                  class="form-label"
                  :style="{
                    height: headerHeight != null ? `${headerHeight}px !important` : undefined
                  }"
                >
                  {{ title }}
                </label>
              </slot>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col
              :class="{'has-error': hasError}"
            >
              <slot/>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <commonErrorMessageHandler
        v-if="hasError && errorText !== null"
        :error-padding="errorPadding"
        :error-model="errorText"
        :left-spacing="leftSpacing"
        :col-spacer="colSpacer"
        :renderHTML="errorRenderHTML"
      />
    </v-col>
  </v-row>
</template>
<!-- KSD V001.000 AE -->
