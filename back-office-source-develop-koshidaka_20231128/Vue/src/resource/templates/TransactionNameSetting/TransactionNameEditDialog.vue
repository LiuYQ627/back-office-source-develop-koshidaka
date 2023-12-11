<style src="@/resource/static/css/CommonDesign/utils.css" />
<style src="@/resource/static/css/TransactionNameSetting/transactionNameEditDialog.css" />
<script type="text/javascript" src="@/resource/static/js/TransactionNameSetting/transactionNameEditDialog.js" />
<!--
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230104 duyouwei(Neusoft)  G001.00.0  issue課題#1380を対応します.
 * 20230116 duyouwei(Neusoft)  G002.00.0  issue課題#1248を対応します.
 * 20230116 bai.ry(Neusoft)  G003.00.0  issue課題#1515を対応します.
 -->
<template>
  <div>
    <!-- <common-dialog
      v-model="displayed"
      title="マスタ編集"
      :okLabel="$t('O00004.S008')"
      @clickBack="closeDialog"
      @clickOk="onClickOk"
    > -->
    <common-dialog
      v-model="displayed"
      :mode=2
      title="マスタ編集"
      :ok-label="$t('O00004.S008')"
      @clickBack="closeDialog"
      @clickOk="onClickOk"
    >
      <!-- 取引別No -->
      <v-row
        no-gutters
        class="conditionRow w-100 d-flex align-center justify-center"
      >
        <v-col
          cols="5"
          class="h-100 grayFrame d-flex justify-center align-center"
        >
          {{ "取引別No" }}
        </v-col>
        <v-col
          cols="7"
          class="h-100">
          <input
            type="text"
            class="h-100 w-100 lightgrayFrame pl-2"
            v-model="setting.transactionNo"
            disabled
            tabindex="-1"
          >
        </v-col>
      </v-row>

      <!-- 名称 -->
      <v-row
        no-gutters
        class="conditionRow w-100 d-flex align-center justify-center mt-1"
      >
        <v-col
          cols="5"
          class="h-100 grayFrame d-flex justify-center align-center"
        >
          {{ "名称" }}
        </v-col>
        <v-col
          cols="7"
          class="h-100">
          <!-- G001.00.0 Update-Start -->
          <!-- <input
            type="text"
            class="h-100 w-100 lightgrayFrame pl-2"
            v-model="setting.name"
            disabled
            tabindex="-1"
          /> -->
          <input
            type="text"
            class="h-100 w-100 lightgrayFrame pl-2"
            v-model="setting.defaultName.default"
            disabled
            tabindex="-1"
          >
          <!-- G001.00.0 Update -End -->
        </v-col>
      </v-row>

      <!-- 印字 No -->
      <v-row
        no-gutters
        class="conditionRow w-100 d-flex align-center justify-center mt-1"
      >
        <v-col
          cols="5"
          class="h-100 grayFrame d-flex justify-center align-center"
        >
          {{ "印字 No" }}
        </v-col>
        <v-col
          cols="7"
          class="h-100">
          <input
            type="text"
            class="h-100 w-100 whiteFrame pl-2"
            v-model="setting.printNo"
            maxlength=6
            :placeholder="this.$i18n.t('F00001.S080')"
            @input="numInputRegulation"
          >
        </v-col>
      </v-row>

      <!-- 取引別名称（表示） -->
      <v-row
        no-gutters
        class="conditionRow w-100 d-flex align-center justify-center mt-1"
      >
        <v-col
          cols="5"
          class="h-100 grayFrame d-flex justify-center align-center"
        >
          {{ "取引別名称（表示）" }}
        </v-col>
        <v-col
          cols="7"
          class="h-100">
          <!-- G001.00.0 Update-Start -->
          <!--<input
            type="text"
            class="h-100 w-100 whiteFrame pl-2"
            v-model="setting.displayName.default"
            :placeholder="this.$i18n.t('F00001.S081')"
            :@input="inputLimit(setting.displayName.default,16)"
          /> -->
          <input
            type="text"
            :class="this.displayNameErrorMsg !== '' ? 'errorTextBox h-100 w-100 whiteFrame pl-2' : 'h-100 w-100 whiteFrame pl-2'"
            v-model="setting.displayName.default"
            :placeholder="this.$i18n.t('F00001.S081')"
            :@input="inputLimit(setting.displayName.default,32)"
          >
          <!-- G001.00.0 Update-End -->
        </v-col>
      </v-row>

      <!-- G003.00.0 Add-Start -->
      <v-row
        v-if="this.displayNameErrorMsg!== ''"
        no-gutters
        class="conditionRow w-100 d-flex align-center justify-center mt-1"
        style="color: #f00;">
        <v-col cols="3"/>
        <v-col
          cols="7"
          class="h-100">
          {{ displayNameErrorMsg }}
        </v-col>
      </v-row>
      <!-- G003.00.0 Add-End -->

      <!-- 取引別名称（印字） -->
      <v-row
        no-gutters
        class="conditionRow w-100 d-flex align-center justify-center mt-1"
      >
        <v-col
          cols="5"
          class="h-100 grayFrame d-flex justify-center align-center"
        >
          {{ "取引別名称（印字）" }}
        </v-col>
        <v-col
          cols="7"
          class="h-100">
          <!-- G001.00.0 Update-Start -->
          <!--<input
            type="text"
            class="h-100 w-100 whiteFrame pl-2"
            v-model="setting.displayName.print"
            :placeholder="this.$i18n.t('F00001.S081')"
            :@input="inputLimit(setting.displayName.print,16)"
          /> -->
          <input
            type="text"
            :class="this.printNameErrorMsg !== '' ? 'errorTextBox h-100 w-100 whiteFrame pl-2' : 'h-100 w-100 whiteFrame pl-2'"
            v-model="setting.printName.default"
            :placeholder="this.$i18n.t('F00001.S081')"
            :@input="inputLimit(setting.printName.default,32)"
          >
          <!-- G001.00.0 Update-End -->
        </v-col>
      </v-row>

      <!-- G003.00.0 Add-Start -->
      <v-row
        v-if="this.printNameErrorMsg!== ''"
        no-gutters
        class="conditionRow w-100 d-flex align-center justify-center mt-1"
        style="color: #f00;">
        <v-col cols="3"/>
        <v-col
          cols="7"
          class="h-100">
          {{ printNameErrorMsg }}
        </v-col>
      </v-row>
      <!-- G003.00.0 Add-End -->

    </common-dialog>
    <popup ref="pop" />
  </div>
</template>
