<style src="@/resource/static/css/CommonDesign/utils.css" />
<style scoped src="@/resource/static/css/TransactionNameSetting/transactionNameSetting.css" />
<script type="text/javascript" src="@/resource/static/js/TransactionNameSetting/transactionNameSetting.js" />
<!--
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230316  xu.jh(Neusoft)  G001.00.0  issue課題#1444を対応します.
 * 20230625  wupsh(Neusoft)  G002.00.0  issue課題#1442を対応します.
 * 20230728  qurn(Neusoft)   G003.00.0  issue課題#1060を対応します.
 -->
<template>
  <v-container class="mt-15">
    <div>
      <!-- 変更基準日、店舗名200 -->
      <config-select-common-condition
        :target-store-codes="targetStoreCodes"
        :type-of-setting="typeOfSettingWithCloning"
        v-model="changeDateText" />
      <!-- ワード検索 -->
      <v-row
        no-gutters
        class="conditionRow w-100 d-flex align-center mt-5">
        <v-col
          cols="2"
          class="h-100">
          <label
            class="grayFrame h-100 w-100 d-flex justify-center align-center"
            for="searchWord">
            {{ "検索" }}
          </label>
        </v-col>
        <v-col
          cols="4"
          class="h-100">
          <input
            id="searchWord"
            class="whiteFrame h-100 w-100 pl-2"
            type="text"
            v-model="searchWord">
        </v-col>
        <!-- 「前を検索」ボタン -->
        <v-btn
          class="searchBtn ml-2"
          :disabled="noMatching"
          :tabindex="noMatching ? -1 : 0"
          @click="addSearchIndex(-1)">
          <label>{{ "前を検索" }}</label>
        </v-btn>
        <!-- 「次を検索」ボタン -->
        <v-btn
          class="searchBtn ml-2"
          :disabled="noMatching"
          :tabindex="noMatching ? -1 : 0"
          @click="addSearchIndex(1)">
          <label>{{ "次を検索" }}</label>
        </v-btn>

        <!-- ソート順ボタン -->
        <v-btn
          class="sortBtn ml-4"
          @click="incrementSortIndex">
          <label>{{ settingListSortKeys[sortIndex].displayName }}</label>
        </v-btn>
      </v-row>
    </div>
    <!-- 設定一覧166 -->
    <table class="tableList w-100 mt-10">
      <!-- ヘッダ200 238-->
      <tr>
        <th
          class="grayFrame text-center font-weight-regular"
          style="width: 100px ;border-right: solid 1px #fff;">
          {{ "取引別 No" }}
        </th>
        <th
          class="grayFrame text-center font-weight-regular"
          style="width: 249px ;border-right: solid 1px #fff;">
          {{ "名称" }}
        </th>
        <th
          class="grayFrame text-center font-weight-regular"
          style="width: 90px ;border-right: solid 1px #fff;">
          {{ "印字 No" }}
        </th>
        <th
          class="grayFrame text-center font-weight-regular"
          style="width: 240px ;border-right: solid 1px #fff;">
          {{ "取引別名称（表示）" }}
        </th>
        <th
          class="grayFrame text-center font-weight-regular"
          style="width: 230px ;border-right: solid 1px #fff;">
          {{ "取引別名称（印字）" }}
        </th>
        <th
          class="grayFrame text-center font-weight-regular"
          style="width: 46.5px ">
          {{ "編集" }}
        </th>
      </tr>
      <!-- コンテンツ -->
      <tbody id="id1">
        <tr
          v-for="(setting, index) in settingList"
          :ref="'chip' + index"
          :class="selectedIndex === index ? 'selectedItem' : ''"
          :key="index"
          :tabindex="index">
          <!-- <td class="whiteFrame text-center">{{ setting.transactionNo }}</td>
          <td class="whiteFrame text-left pl-1">{{ setting.defaultName.default }}</td>
          <td class="whiteFrame text-center">{{ setting.printNo }}</td>
          <td class="whiteFrame text-left pl-1">
            {{ setting.displayName.default }}
          </td>
          <td class="whiteFrame text-left pl-1">
            {{ setting.printName.default }}
          </td> -->
          <td
            class="whiteFrame text-center"
            style="width: 100px;">{{ setting.transactionNo }}</td>
          <td
            class="whiteFrame text-left pl-1"
            style="width: 249px;">{{ setting.defaultName.default }}</td>
          <td
            class="whiteFrame text-center "
            style="width: 90px;">{{ setting.printNo }}</td>
          <td
            class="whiteFrame text-left pl-1"
            style="width: 240px;">
            {{ setting.displayName.default }}
          </td>
          <td
            class="whiteFrame text-left pl-1"
            style="width: 230px;">
            {{ setting.printName.default }}
          </td>
          <td class="whiteFrame pl-1.5">
            <img
              v-if="typeOfSetting != 'past' || isCloning"
              src="@/assets/ico_edit@2x.png"
              class="editIcon"
              @keydown.enter="openEditDialog(index)"
              @click="openEditDialog(index)"
              style="width: 90%; height: 90%"
            >
            <img
              v-else
              src="@/assets/ico_edit_h@2x.png"
              class="editIcon"
            >
          </td>
        </tr>
      </tbody>
    </table>

    <!-- その他ダイアログ等 -->
    <v-row>
      <v-col>
        <!-- G001.00.0 Update start -->
        <!-- <maint-button
          @close="backToConfigSelect"
          @fixed="fixed"
          @clone="clone"
          @stop="stop"
          @del="del"
          :isfixedBtn="disabledFixedBtn"
          :isCloneBtn="disabledCloneBtn"
          :isdelBtn="disabledDeleteBtn"/> -->
        <!-- G001.00.0 Update start -->
        <!-- <maint-button
          @close="close"
          @fixed="fixed"
          @clone="clone"
          @stop="stop"
          @del="del"
          :isfixed-btn="disabledFixedBtn || !permissions.includes('CLOUDPOS_TRANSACTION_UPDATE')"
          :is-clone-btn="disabledCloneBtn"
          :isdel-btn="disabledDeleteBtn || !permissions.includes('CLOUDPOS_TRANSACTION_DELETE')"/> -->
        <maint-button
          @close="close"
          @fixed="fixed"
          @clone="clone"
          @stop="stop"
          @del="del"
          @list="listButtonClicked"
          :isfixed-btn="disabledFixedBtn || !permissions.includes('CLOUDPOS_TRANSACTION_UPDATE')"
          :is-clone-btn="disabledCloneBtn"
          :isdel-btn="disabledDeleteBtn || !permissions.includes('CLOUDPOS_TRANSACTION_DELETE')" />
          <!-- G001.00.0 Update start -->
          <!-- G001.00.0 Update end -->
      </v-col>
    </v-row>
    <edit-dialog
      ref="editDialog"
      @clickOk="saveCallback" />
    <popup ref="pop" />
    <dialog-store-select ref="dialogStoreSelect" />
  </v-container>
</template>

<style scoped>
tbody {
  display: block;
  overflow-x: hidden;
  overflow-y: auto;
  width: 971px;
  height: 650px;
}

.selectedItem td {
  border-left: none !important;
  background-color: #ffeacf;
}

</style>
