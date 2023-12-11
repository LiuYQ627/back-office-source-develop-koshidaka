<style src="@/resource/static/css/CommonDesign/utils.css"/>
<style scoped src="@/resource/static/css/TransactionNameSetting/transactionNameOutput.css"/>
<script type="text/javascript" src="@/resource/static/js/TransactionNameSetting/transactionNameOutput.js"/>

<template>
  <v-container
    class="mt-15"
    style="background-color:white">

    <!-- 結果 -->
    <v-row
      no-gutters
      class="w-100">
      <v-row
        no-gutters
        class="d-flex flex-row-reverse">
        <v-col cols="4">
          {{ '出力日：' + dateFormatter() }}
        </v-col>
        <v-col
          cols="4"
          class="d-flex justify-center -center">
          <p style="font-size:25px"> {{ '取引別名称設定一覧' }}</p>
        </v-col>
      </v-row>
      <v-col
        cols="12"
        class="d-flex justify-left align-left">
        <v-row no-gutters>
          <v-col
            cols="2"
            class="d-flex"> {{ '設定運用日' }}</v-col>
          <v-col
            cols="10"
            class="d-flex"> {{ `： ${ changeDateText?dateFormat(changeDateText) : ''} ` }}</v-col>
        </v-row>
      </v-col>
      <v-col
        cols="12"
        class="d-flex justify-left align-left">
        <v-row no-gutters>
          <v-col
            cols="2"
            class="d-flex"> {{ '店舗' }}</v-col>
          <v-col
            cols="10"
            class="d-flex"> {{ `： ${storeName?storeName : ''} ` }}</v-col>
        </v-row>
      </v-col>
    </v-row>
    <br>
    <table class="tableList w-100 ">
      <tr style="width: auto;">
        <th style="width: 100px">{{ '取引別No.' }}</th>
        <th style="text-align:left;width: 200px">{{ '名称' }}</th>
        <th style="width: 100px">{{ '印字No.' }}</th>
        <th style="text-align:left;width: 240px">{{ '取引別名称（表示)' }}</th>
        <th style="text-align:left;width: 240px">{{ '取引別名称（印字)' }}</th>
      </tr>
      <tbody>
        <tr
          style="height: 24px !important;"
          v-for="(data, index) in list"
          :key="index">
          <td class="text-center">{{ data.transactionNo }}</td>
          <td class="text-left pl-1">{{ data.defaultName.default }}</td>
          <td class=" text-center">{{ data.printNo }}</td>
          <td class=" text-left pl-1">{{ data.displayName.default }}</td>
          <td class="text-left pl-1">{{ data.printName.default }}</td>
        </tr>
      </tbody>
    </table>
    <!-- その他ダイアログ等 -->
    <v-row>
      <v-col>
        <maint-button
          @close="clearButtonClicked"
          @backPrevious= "backToPrevious"
          @toSave = "toSave"
        />
      </v-col>
    </v-row>
    <popup ref="pop" />
  </v-container>
</template>
<style scoped>
.container {
  min-width: 1185px;
  max-width: 960px;
  font-size: 16px;
}
</style>
