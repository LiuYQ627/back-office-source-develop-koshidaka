<style src="@/resource/static/css/CommonDesign/utils.css" />
<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/ConfigSelect/configSelectCommonCondition.css" />
<!-- KSD V001.000 AE -->
<script type="text/javascript" src="@/resource/static/js/ConfigSelect/configSelectCommonCondition.js" />

<template>
  <v-row
    no-gutters
    class="w-100">
    <v-col class="w-100">
      <!-- 店舗選択 -->
      <v-row
        no-gutters
        class="conditionRow w-100 d-flex align-center">
        <v-col
          cols="2"
          class="h-100">
          <label
            class="
              grayFrame
              h-100
              w-100
              d-flex
              justify-center
              align-center
              pl-2
            "
            for="targetStoreText"
          >
            <!-- KSD V001.000 DS -->
            <!-- {{ "対象店舗" }} -->
            <!-- KSD V001.000 DE -->
            <!-- KSD V001.000 AS -->
            {{ storeHeaderLabel.length === 0 ? $t('F322b5.S001') : storeHeaderLabel }}
            <!-- KSD V001.000 AE -->
          </label>
        </v-col>

        <!-- KSD V001.000 DS -->
        <!-- <v-col -->
        <!--   cols="5" -->
        <!--   class="h-100"> -->
        <!--   <store-select -->
        <!--     v-model="targetStoreCodes" -->
        <!--     disabled /> -->
        <!-- </v-col> -->
        <!-- KSD V001.000 DE -->
        <!-- KSD V001.000 AS -->
        <v-col
          :cols="storeSelectFilledWidth ? undefined : 5"
          class="h-100">
          <store-select
            headquarters-authority-check-enable
            v-model="targetStoreCodes"
            disabled
          />
        </v-col>
        <!-- KSD V001.000 AE -->
      </v-row>

      <!-- 変更基準日 -->
      <!-- KSD V001.000 DS -->
      <!-- <v-row -->
      <!--   v-if="typeOfSetting !== 'current'" -->
      <!--   no-gutters -->
      <!--   class="conditionRow w-100 d-flex align-center mt-5" -->
      <!-- > -->
      <!-- KSD V001.000 DE -->
      <!-- KSD V001.000 AS -->
      <v-row
        v-if="typeOfSetting !== 'current'"
        no-gutters
        class="conditionRow w-100 d-flex align-center "
        :class="applyStandardSpacing ? 'standard-spacing' : 'mt-5'">
        <!-- KSD V001.000 AE -->
        <v-col
          cols="2"
          class="h-100">
          <label class="grayFrame h-100 d-flex justify-center align-center">
            <!-- KSD V001.000 DS -->
            <!-- {{ "変更基準日" }} -->
            <!-- KSD V001.000 DE -->
            <!-- KSD V001.000 AS -->
            {{ dateChangeHeaderLabel.length === 0 ? $t('F322b5.S002') : dateChangeHeaderLabel }}
            <!-- KSD V001.000 AE -->
          </label>
        </v-col>

        <v-col
          cols="3"
          class="h-100 d-flex align-center">
          <!-- KSD V001.000 DS -->
          <!-- <date-input -->
          <!-- format="Y-m-d" -->
          <!-- :disabled="typeOfSetting === 'past'" -->
          <!-- :value="changeDateText" -->
          <!-- :disabled-func="disabledFunc" -->
          <!-- @input="updateDate" -->
          <!-- /> -->
          <!-- KSD V001.000 DE -->
          <!-- KSD V001.000 AS -->
          <date-input
            v-if="!hasCloudPosAdminCheck"
            format="Y-m-d"
            :disabled="typeOfSetting === 'past'"
            :value="changeDateText"
            :disabled-func="disabledFunc"
            @input="updateDate"
          />
          <date-input
            v-else
            format="Y-m-d"
            :disabled="typeOfSetting === 'past' || !isCloudposAdmin"
            :value="changeDateText"
            :disabled-func="disabledFunc"
            @input="updateDate"
          />
          <!-- KSD V001.000 AE -->
        </v-col>
      </v-row>
      <popup ref="pop" />
    </v-col>
  </v-row>
</template>
