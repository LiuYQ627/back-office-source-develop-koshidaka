<style scope src="./../../static/css/MasterCommon/masterCommon.css"></style>
<style scope src="./../../static/css/DataClear/dataClear.css"></style>
<script type="text/javascript" src="./../../static/js/DataClear/dataClear.js"></script>

<!--
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20221230  litie(Neusoft)    G001.00.0  issue課題#1058を対応します.
 * 20231121  wupsh(Neusoft)    G002.00.0  issue課題#1877を対応します.
-->

<template>
  <v-container
    style="width: 680px; margin-top: 60px"
    class="baseFont baseContainer"
  >
    <div class="selectConditionStyle">
      <!-- クリア種別選択エリア -->
      <div class="selectConditionBase">
        <label>
          <p>{{ "クリア種別" }}</p>
        </label>
        <span class="conditionSpan">
          <div class="space">
            <div class="inline-radio">
              <div>
                <input
                  type="radio"
                  name="clearTarget"
                  value="beforeOperation"
                  v-model="clearTarget"
                  :disabled="!initialized"
                  :tabindex="-1"
                >
                <label
                  class="scrollNone"
                  :tabindex="initialized ? 0 : -1"
                  @keydown.enter="clearTarget = 'beforeOperation'"
                  @keydown.space="clearTarget = 'beforeOperation'"
                >{{ "稼働前クリア" }}</label
                >
              </div>
              <div style="margin-left: 10px">
                <input
                  type="radio"
                  name="clearTarget"
                  value="stopUsing"
                  v-model="clearTarget"
                  :disabled="!initialized"
                  :tabindex="-1"
                >
                <label
                  class="scrollNone"
                  :tabindex="initialized ? 0 : -1"
                  @keydown.enter="clearTarget = 'stopUsing'"
                  @keydown.space="clearTarget = 'stopUsing'"
                >{{ "利用停止" }}</label
                >
              </div>
            </div>
          </div>
        </span>
      </div>

      <div class="selectConditionBase">
        <!-- 店舗選択エリア -->
        <label>
          <p>{{ "店舗" }}</p>
        </label>
        <span class="conditionSpan">
          <input
            type="text"
            class="textStore NameClass"
            v-model="targetStoreText"
            disabled
          >
          <div class="buttomLabel">
            <!-- G001.00.0 Update-Start -->
            <!-- <v-btn
              style="width: 28px; height: 40px"
              @click="storeSelect"
              :disabled="clearTarget === 'stopUsing'"
            > -->
            <v-btn
              style="width: 28px; height: 40px"
              @click="storeSelect"
              :disabled="headquartersAuthority != 1 || clearTarget === 'stopUsing'"
            >
              <!-- G001.00.0 Update-End -->
              <span class="rightArrow" />
            </v-btn>
          </div>
        </span>
      </div>

      <div
        class="selectConditionBase selectTableKindsStyle"
        :class="{ disabled: !targetSelected }"
      >
        <!-- テーブル種別 -->
        <label>
          <p>{{ "テーブル種別" }}</p>
        </label>
        <span class="conditionSpan">
          <select
            class="selectTableKindStyle"
            tabindex="0"
            :class="{ transparentStyle: !initialized }"
            :disabled="!targetSelected"
            v-model="tableCategory"
            style="color:#000000"
          >
            <option
              v-for="tableKind in tableKindList"
              :key="tableKind.tableCategory"
              :value="tableKind.tableCategory"
            >
              {{ tableKind.categoryName }}
            </option>
          </select>
        </span>
      </div>
    </div>

    <!-- 全選択/全解除ボタン
    <div class="buttonStyle">
      !-- 全選択ボタン --
      <div class="buttomLabel">
        <v-btn
          class="allSelectButton"
          :disabled="!initialized"
          @click="setAllCheckbox(true)"
        >
          <label>{{ "全選択" }}</label>
        </v-btn>
      </div>
      !-- 全解除ボタン --
      <div class="buttomLabel">
        <v-btn
          class="allSelectButton"
          :disabled="!initialized"
          @click="setAllCheckbox(false)"
        >
          <label>{{ "全解除" }}</label>
        </v-btn>
      </div>
    </div>
     -->

    <!-- 対象テーブル一覧 -->
    <!-- G002.00.0 Update-Start -->
    <!-- <div
      class="tableArea"
      v-if="tableCategory >= 0"> -->
    <div
      class="tableArea"
      v-if="clearTableList.length > 0">
      <!-- G002.00.0 Update-End -->
      <table class="tableList">
        <tr>
          <!-- <th class="headerCheckBox"></th> -->
          <th class="headerPhysicalName">
            <!-- テーブル物理名 -->
            {{ "テーブル物理名" }}
          </th>
          <th class="headerLogicalName">
            <!-- テーブル論理名 -->
            {{ "テーブル論理名" }}
          </th>
          <th class="headerRecordCount">
            <!-- レコード件数 -->
            {{ "レコード件数" }}
          </th>
        </tr>

        <template v-for="(item, index) in clearTableList">
          <tr
            :key="index"
            :class="{ dataClearSelectedItem: clearTableList[index].checked }"
          >
            <!-- チェックボックス -->
            <!--
            <td
              class="checkboxCell"
              :class="{ disabledCell: item.dataCount === '0' }"
            >
              <label
                :tabindex="item.dataCount === '0' ? -1 : 0"
                class="scrollNone"
                @keydown.enter="toggleClearTableChecked(index)"
                @keydown.space="toggleClearTableChecked(index)"
              >
                <input
                  :id="'checkbox' + index"
                  type="checkbox"
                  :checked="clearTableList[index].checked"
                  :disabled="item.dataCount === '0' || !targetSelected"
                  @click="toggleClearTableChecked(index)"
                />
                <span
                  class="checkbox"
                  :class="{ disabled: item.dataCount === '0' }"
                ></span>
              </label>
            </td>
            -->
            <!-- 物理名 -->
            <td
              class="physicalNameCell"
              :class="{ disabledCell: item.dataCount === '0' }"
            >
              <label
                class="lineClampStyle"
                style="max-height: 82px; text-align: left"
              >
                {{ item.physicalName }}
              </label>
            </td>
            <!-- 論理名 -->
            <td
              class="logicalNameCell"
              :class="{ disabledCell: item.dataCount === '0' }"
            >
              <label
                class="lineClampStyle logicalName"
                style="max-height: 82px"
              >{{ item.logicalName }}</label
              >
            </td>
            <!-- 件数 -->
            <td :class="{ disabledCell: item.dataCount === '0' }">
              <label class="lineClampStyle recordCount">{{
                item.dataCount + "件"
              }}</label>
            </td>
          </tr>
        </template>
      </table>
    </div>

    <!-- 右側 -->
    <v-row style="width: 100%">
      <v-col>
        <maint-button
          @close="closeTab"
          @dataClear="onClickDelete"
          :data-clear-btn="disabledClearBtn"
        />
      </v-col>
    </v-row>

    <dialog-store-select
      ref="dialogStoreSelect"
      @clickSubmit="storeSelectOk" />
    <popup ref="pop" />
  </v-container>
</template>
