<style src="@/resource/static/css/CommonDesign/utils.css" />
<script type="text/javascript" src="@/resource/static/js/ConfigSelect/configCommonCondition.js" />

<template>
  <v-row
    no-gutters
    class="w-100">
    <v-col class="w-100">
      <!-- 変更基準日 -->
      <v-row
        v-if="typeOfSetting !== 'current'"
        no-gutters
        class="conditionRow w-100 d-flex align-center mt-5"
      >
        <v-col
          cols="2"
          class="h-100">
          <label class="grayFrame h-100 d-flex justify-center align-center">
            {{ "変更基準日" }}
          </label>
        </v-col>

        <v-col
          cols="3"
          class="h-100 d-flex align-center">
          <date-input
            format="Y-m-d"
            :disabled="typeOfSetting === 'past'"
            :value="changeDateText"
            :disabled-func="disabledFunc"
            @input="updateDate"
          />
        </v-col>
      </v-row>
      <popup ref="pop" />
    </v-col>
  </v-row>
</template>
