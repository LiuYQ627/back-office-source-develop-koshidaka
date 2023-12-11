<style src="@/resource/static/css/CommonDesign/utils.css" />
<script type="text/javascript" src="@/resource/static/js/PresetMaster/presetListDialog.js" />
<!--<style src="@/resource/static/css/ReceiptSetting/receiptListDialog.css"/>-->

<template>
  <div style="position: relative;">
    <!-- DS KSD V001.000 83800 -->
    <!-- <common-dialog
      v-model="displayed"
      title="企画確認"
      @clickBack="closeDialog"
      :has-o-k-button="false"
      :width="1200"
    > -->
    <!-- DE KSD V001.000 83800 -->
    <!-- AS KSD V001.000 83800 -->
    <common-dialog
      v-model="displayed"
      title="企画確認"
      @clickBack="closeDialog"
      :has-o-k-button="false"
      :has-display-button="false"
      :width="1200"
    >
      <!-- AE KSD V001.000 83800 -->
      <div
        class="presetListActive"
        v-if="activeMode ==='calendar'">反映</div>
      <div
        class="presetListNormal"
        v-if="activeMode ==='calendar'">非反映</div>
      <v-btn
        outlined
        class="categoryButton"
        :selected="activeMode ==='calendar'"
        @click="selectCalendar('calendar')"
        style=" position: absolute;top: 15px;right: 100px;font-size: 14px;"
      >
        カレンダー
      </v-btn>
      <v-btn
        outlined
        class="categoryButton"
        :selected="activeMode ==='view'"
        @click="selectCalendar('view')"
        style=" position: absolute;top: 15px;right: 20px;font-size: 14px;"
      >
        一覧
      </v-btn>
      <div
        id="planCheckTableSize"
        v-if="activeMode==='calendar'"
        style="height: 335px; !important">
        <table id="planCheckTable">
          <!-- カレンダーヘッダー部 -->
          <thead>
            <tr style="height:100px">
              <!-- 1カ月前 -->
              <th
                class="calenderSetSize"
                style="padding: 0px 5px 0 10px;">
                <div @click="moveMonth(-1)">
                  <a class="whiteFont">
                    {{ $t("F00002.S078") }}
                    <img
                      src="@/assets/ico_plancheck02.png"
                      tabindex="701"
                      class="pointer reverse"
                      style="padding-bottom: 4px;" >
                  </a>
                </div>
              </th>
              <!-- 1日前 -->
              <th
                class="calenderSetSize"
                style="border-right: 1px solid #fff;">
                <div style="height:50px"/>
                <div
                  class="singleArrowDiv"
                  @click="moveDay(-1)">
                  <a class="singleArrow">
                    <img
                      src="@/assets/ico_plancheck01.png"
                      tabindex="702"
                      class="pointer reverse" >
                  </a>
                </div>
              </th>
              <!-- カレンダー日付表示 -->
              <th
                v-for="n of daysDisplayInCalendar"
                :class="isFirstDayOrCreteriaDate(n) ? 'calenderContentSize' : 'basicWidthStyle'"
                :key="n">
                <div style="height:50px">
                  <span>{{ getDate('Month', n-1, null) }}</span>
                  <span>{{ getDate('Slash', n-1, null) }}</span>
                </div>
                <div
                  style="height:50px;"
                  :style="isFirstDayOrCreteriaDate(n) ? '' : 'border-left:1px solid #fff;'"
                  :class="getWeekdayClass(n-1, null)">
                  <span>{{ getDate('Date', n-1, null) }}</span>
                  <span>{{ getDate('Weekday', n-1, null) }}</span>
                </div>
              </th>
              <!-- 1日送り -->
              <th class="calenderSetSize">
                <div style="height:50px"/>
                <div
                  class="singleArrowDiv"
                  @click="moveDay(1)"
                  style="border-left: 1px solid;">
                  <a class="singleArrow">
                    <img
                      src="@/assets/ico_plancheck01.png"
                      tabindex="703"
                      class="pointer" >
                  </a>
                </div>
              </th>
              <!-- 1カ月先 -->
              <th
                class="calenderSetSize"
                style="padding: 0px 27px 0 5px; width:62px;">
                <div @click="moveMonth(1)">
                  <a class="whiteFont" >
                    {{ $t("F00002.S080") }}
                    <img
                      src="@/assets/ico_plancheck02.png"
                      tabindex="704"
                      class="pointer"
                      style="padding-top: 4px;" >
                  </a>
                </div>
              </th>
            </tr>
          </thead>
          <!-- カレンダーボディ部 -->
          <tbody style="height: 240px; !important">
            <!-- カレンダー 空行1行目(固定) -->
            <tr class="calRow">
              <td colspan="2" />
              <td
                v-for="n of daysDisplayInCalendar"
                :key="n">
                <div
                  style="height: 25px;"
                  class="borderleft"
                  :class="getWeekdayClass(n-1, null)"/>
              </td>
              <td
                class="borderleft"
                colspan="2" />
            </tr>
            <tr
              v-for="presetPlan in presetPlans"
              :key="presetPlan.planCd">
              <td :colspan="daysDisplayInCalendar + 4">
                <table>
                  <!-- カレンダー 企画行1行目（2行で1セット） -->
                  <tr class="企画行1行目 calRow">
                    <!-- 「calenderTransparencyTop」クラスをつけると左右の余白部分がオレンジになる -->
                    <td
                      :class="isCreteriaDateBeforeFromPlan(presetPlan) && isCalendarDisplay(presetPlan) ? 'calenderTransparencyTop' : ''"
                      colspan="2" />
                    <!-- 「企画01」などの表記する行 -->
                    <template v-if="getCreteriaDateBeforeFromPlanDateFrom(presetPlan) > 0">
                      <td
                        v-for="n of getCreteriaDateBeforeFromPlanDateFrom(presetPlan)"
                        :key="n + '_0'"
                        class="borderleft">
                        <div
                          style="height: 25px;"
                          :class="getWeekdayClass(n-1, null)"/>
                      </td>
                    </template>
                    <td
                      class="calenderPlanTop"
                      v-if="isCalendarDisplay(presetPlan)"
                      :colspan="getTdCreateCount(presetPlan)"
                      :style="planWidthSize(presetPlan)"
                      :class="isCreteriaDateBeforeFromPlan(presetPlan) && isCalendarDisplay(presetPlan) ? '' : 'borderLeft'">
                      <a
                        v-if="getPresetPlanPeriodDaysOnCalendar(presetPlan) >= 0"
                        @click="onClickPresetCd(presetPlan)"
                        class="planTitle"
                        href="#"
                        tabindex="705">
                        {{ getPlanCodeFilledInZero(presetPlan.planCd) }}
                      </a>
                    </td>
                    <!-- 右端の三角部分のレイアウト -->
                    <td
                      style="display: table;"
                      v-if="!isCreteriaDateAfterFromPlan(presetPlan) && isCalendarDisplay(presetPlan)">
                      <span
                        class="planEndTopSquare"
                        :class="getTdCreateCount(presetPlan) === 0 && isCreteriaDateBeforeFromPlan(presetPlan) === false && isCalendarDisplay(presetPlan)? 'borderLeft' : ''" />
                      <span :class="getPlanEndTriangleClass(presetPlan, true)" />
                    </td>
                    <!-- 右端のボーダー -->
                    <template v-if="getCreteriaDateAfterFromPlanDateTo(presetPlan) > 0">
                      <td
                        v-for="n of getCreteriaDateAfterFromPlanDateTo(presetPlan)"
                        :key="n + '_1'"
                        class="borderleft">
                        <div
                          style="height: 25px;"
                          :class="getWeekdayClass(n-1, presetPlan)"/>
                      </td>
                    </template>
                    <!-- >と≫行のtd -->
                    <td
                      colspan="2"
                      v-if="isCalendarWithinByPlanStartWithEnd(presetPlan)"
                      class="calenderTransparencyTop" />
                    <template v-if="!isCalendarWithinByPlanStartWithEnd(presetPlan)">
                      <td
                        class="borderleft"
                        colspan="2" />
                    </template>
                  </tr>
                  <!-- カレンダー 企画行2行目（2行で1セット） -->
                  <tr class="企画行2行目 calRow">
                    <!-- 「calenderTransparencyTop」クラスをつけると左右の余白部分がオレンジになる -->
                    <td
                      :class="isCreteriaDateBeforeFromPlan(presetPlan) && isCalendarDisplay(presetPlan) ? 'calenderTransparencyBottom' : ''"
                      colspan="2" />
                    <!-- ●○を表示する行-->
                    <template v-if="getCreteriaDateBeforeFromPlanDateFrom(presetPlan) > 0">
                      <td
                        v-for="n of getCreteriaDateBeforeFromPlanDateFrom(presetPlan)"
                        :key="n"
                        class="borderleft">
                        <div
                          style="height: 25px;"
                          :class="getWeekdayClass(n-1, null)"/>
                      </td>
                    </template>
                    <td
                      class="calenderPlanBottom"
                      v-for="n of getTdCreateCount(presetPlan)"
                      :key="n + '_0'"
                      :class="n === 1 && isCreteriaDateBeforeFromPlan(presetPlan) === false && isCalendarDisplay(presetPlan) ? 'borderLeft' : ''">
                      <span :class="getClassForApply(presetPlan, n - 1)" />
                    </td>
                    <!-- 右端のボーダー -->
                    <td
                      v-if="!isCreteriaDateAfterFromPlan(presetPlan) && isCalendarDisplay(presetPlan)"
                      style="display: table; margin-bottom: -2px;">
                      <span
                        class="planEndBottomSquare"
                        :class="getTdCreateCount(presetPlan) === 0 && isCreteriaDateBeforeFromPlan(presetPlan) === false && isCalendarDisplay(presetPlan)? 'borderLeft' : ''">
                        <div><span
                          :class="getClassForApply(presetPlan, -1)"
                          style="margin-left: 3px;" /></div>
                      </span>
                      <span :class="getPlanEndTriangleClass(presetPlan, false)"/>
                    </td>
                    <template v-if="getCreteriaDateAfterFromPlanDateTo(presetPlan) > 0">
                      <td
                        v-for="n of getCreteriaDateAfterFromPlanDateTo(presetPlan)"
                        :key="n + '_1'"
                        class="borderleft">
                        <div
                          style="height: 25px;"
                          :class="getWeekdayClass(n-1, presetPlan)"/>
                      </td>
                    </template>
                    <!-- >と≫行のtd -->
                    <td
                      colspan="2"
                      v-if="isCalendarWithinByPlanStartWithEnd(presetPlan)"
                      class="calenderTransparencyBottom" />
                    <template v-if="!isCalendarWithinByPlanStartWithEnd(presetPlan)">
                      <td
                        class="borderleft"
                        colspan="2" />
                    </template>
                  </tr>
                  <!-- カレンダー 空行1行（基本ループはこの空行+企画行2行がワンセット） -->
                  <tr class="emptyLine calRow">
                    <td colspan="2" />
                    <td
                      v-for="n of daysDisplayInCalendar"
                      :key="n">
                      <div
                        class="borderleft"
                        :class="getWeekdayClass(n-1, null)"/>
                    </td>
                    <td
                      colspan="2"
                      style="border-left:1px solid #9eb8b8;" />
                  </tr>
                </table>
              </td>
            </tr>
            <!-- 企画の件数が5件以下の場合にテーブルの高さいっぱいに空行を表示する -->
            <template v-if="this.presetPlans.length < 5">
              <tr
                class="calRow"
                :style="getEmptyHeight()">
                <td
                  colspan="2"
                  style="height: 100%" />
                <td
                  v-for="n of daysDisplayInCalendar"
                  :key="n"
                  style="height: 100%">
                  <div
                    style="height: 100%;"
                    class="borderleft"
                    :class="getWeekdayClass(n-1, null)"/>
                </td>
                <td
                  class="borderleft"
                  colspan="2"
                  style="height: 100%" />
              </tr>
            </template>
          </tbody>
        </table>
      </div>
      <div v-if="activeMode==='view'">
        <v-row
          no-gutters
          class="w-100 mt-5"
          style="height: 30px">
          <v-col
            class="grayFrame d-flex justify-center align-center h-100 w-100"
          >
            {{ "コード" }}
          </v-col>
          <v-col
            class="grayFrame d-flex justify-center align-center h-100 w-100"
          >
            {{ "企画名称" }}
          </v-col>
          <v-col
            class="grayFrame d-flex justify-center align-center h-100 w-100"
          >
            {{ "対象店舗" }}
          </v-col>
          <v-col
            class="grayFrame d-flex justify-center align-center h-100 w-100"
          >
            {{ "基準店舗" }}
          </v-col>
          <v-col
            class="grayFrame d-flex justify-center align-center h-100 w-100"
          >
            {{ "開始期間" }}
          </v-col>
          <v-col
            class="grayFrame d-flex justify-center align-center h-100 w-100"
          >
            {{ "終了期間" }}
          </v-col>
          <v-col
            class="grayFrame d-flex justify-center align-center h-100 w-100"
          >
            {{ "曜日" }}
          </v-col>
        </v-row>

        <v-row
          v-for="(plan, index) in items"
          :key="index"
          no-gutters>
          <v-col class="whiteFrame d-flex align-center justify-start pr-2 ll">
            {{ plan.planningCode }}
          </v-col>
          <v-col class="whiteFrame d-flex align-center justify-start pl-2 ll">
            {{ plan.catalogName }}
          </v-col>
          <v-col class="whiteFrame d-flex align-center justify-start pr-2 ll" >
            {{ formatTargetStore(plan.targetStoreCode) }}
          </v-col>
          <v-col class="whiteFrame d-flex align-center justify-start pl-2 ll" >
            {{ storeMap[plan.standardStoreCode] }}
          </v-col>
          <v-col class="whiteFrame d-flex align-center justify-start pr-2 ll" >
            {{ plan.startDateTime | formatDate }}
          </v-col>
          <v-col class="whiteFrame d-flex align-center justify-start pr-2 ll" >
            {{ plan.endDateTime | formatDate }}
          </v-col>
          <v-col class="whiteFrame d-flex align-center justify-start pr-2 ll" >
            {{ formatWeek(plan) }}
          </v-col>
        </v-row>
      </div>
    </common-dialog>

    <popup ref="pop" />
  </div>
</template>
<style scoped>
/* ダイアログのベースサイズ指定 */
.planCheckBaseSize {
    height: 580px;
    font-size: 20px;
    min-width: 1145px;
  }

  /* ダイアログタイトル調整用 */
  .plCheckTitleLabel {
    padding-bottom: 8px !important;
    padding-left: 150px !important;
    padding-right: 10px !important;
  }

  /* オレンジ色まる（反映アイコン） */
  .orangeCircle {
    display: inline-block;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: #ff9407;
    margin-bottom: -2px;
  }

  /* オレンジ枠白抜きまる（非反映アイコン） */
  .whiteCircle {
    display: inline-block;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: #fff;
    margin-bottom: -2px;
  }

  /* テーブルのベースサイズ指定 */
  #planCheckTableSize {
    height: 414px;
    width: 1090px;
    margin: 9px 26px;
    display: block;
  }

  /* カレンダーテーブル */
  table,
  #planCheckTable {
    color: #fff;
    border-collapse: collapse;
    line-height: 1.2;
  }
  #planCheckTable {
    border: 1px solid #9ea0aa;
  }
  #planCheckTable thead {
    display: block;
  }
  #planCheckTable tbody {
    overflow-y: scroll;
    height: 310px;
    display: block;
  }

  #planCheckTable thead tr {
    background-color: #9ea0aa;
    height: 50px;
  }

  #planCheckTable thead .calenderSetSize {
    width: 45px;
  }

  #planCheckTable thead .calenderContentSize {
    width: 30px;
    border-left: 1px solid #fff;
    /* display: grid; */
  }

  #planCheckTable th {
    background-color: #9ea0aa;
    font-weight: normal;
    height: 100%;
  }

  #planCheckTable tbody tr.calRow {
    background-color: #fff;
    height: 25px;
    display: flex;
  }

  #planCheckTable tbody tr.calRow td {
    background-color: #fff;
    height: 25px;
    width: 29.1px;
  }
  #planCheckTable tbody tr.calRow td:first-child {
    width: 85.77px;
    display: block;
  }

  #planCheckTable tbody tr.calRow td:last-child {
    width: 86.13px;
    display: block;
  }

  #planCheckTable .calRow .calenderTransparencyTop {
    background: rgba(255, 234, 207, 0.5);
    border-top: 2px solid rgb(255, 148, 7, 0.5);
  }

  #planCheckTable .calRow .calenderTransparencyBottom {
    background: rgba(255, 234, 207, 0.5);
    border-bottom: 2px solid rgb(255, 148, 7, 0.5);
  }

  #planCheckTable .calRow .calenderPlanTop {
    background: rgba(255, 234, 207);
    border-top: 2px solid rgb(255, 148, 7);
    text-align: left;
  }
  .borderLeft {
    border-left: 2px solid rgb(255, 148, 7);
  }
  #planCheckTable .calRow .calenderPlanBottom {
    background: rgba(255, 234, 207);
    border-bottom: 2px solid rgb(255, 148, 7);
  }

  .emptyLine {
    height: 13px !important;
  }
  .emptyLine td {
    height: 13px !important;
  }
  .emptyLine td div {
    height: 13px !important;
  }
  .borderleft {
    border-left: 1px solid #9ea0aa;
  }

  .pointer {
    cursor: pointer;
  }

  .reverse {
    transform: rotate(180deg);
  }

  .basicWidthStyle {
    width: 30px;
  }
  .whiteFont {
    color: white !important;
  }
  .singleArrowDiv {
    height: 50px;
  }
  .singleArrow {
    width: 90%;
    height: 50px;
    display: inline-block;
    padding-top: 10px;
  }
  /* 土曜日 */
  .saturdayStyle {
    background-color: #dcf8ff;
    color: #777777;
  }
  /* 日曜日 */
  .sundayStyle {
    background-color: #bbf1ff;
    color: #777777;
  }
  /* 企画名aタグスタイル */
  .planTitle {
    color: #1b21e9 !important;
    margin-left: 7px;
    text-decoration: none;
    border-bottom: 1px solid rgb(27, 33, 233);
    position: relative;
    display: block;
    width: 25px;
  }
  /* 企画（上）末尾 四角部分 */
  .planEndTopSquare {
    background: rgba(255, 234, 207);
    width: 20px;
    height: 26px;
    display: block;
    border-top: 2px solid rgb(255, 148, 7);
  }
  /* 企画（上）末尾 三角部分 */
  .planEndTopTriangle {
    background: linear-gradient(
        to bottom left,
        transparent 43%,
        rgb(255, 148, 7) 50%,
        rgba(255, 234, 207) calc(50% + 2px)
      )
      top right/ 100% 100% no-repeat;
    width: 10px;
    height: 25px;
    display: table-cell;
  }
  /* 企画（上）末尾 三角部分 土曜日用 */
  .planEndTopTriangle_Saturday {
    background: linear-gradient(
        to bottom left,
        rgb(220, 248, 255) 43%,
        rgb(255, 148, 7) 50%,
        rgba(255, 234, 207) calc(50% + 2px)
      )
      top right/ 100% 100% no-repeat;
    width: 10px;
    height: 25px;
    display: table-cell;
  }
  /* 企画（上）末尾 三角部分 日曜日用 */
  .planEndTopTriangle_Sunday {
    background: linear-gradient(
        to bottom left,
        rgb(187, 241, 255) 43%,
        rgb(255, 148, 7) 50%,
        rgba(255, 234, 207) calc(50% + 2px)
      )
      top right/ 100% 100% no-repeat;
    width: 10px;
    height: 25px;
    display: table-cell;
  }

  /* 企画（下）末尾 四角部分 */
  .planEndBottomSquare {
    background: rgba(255, 234, 207);
    width: 20px;
    height: 25px;
    display: block;
    border-bottom: 2px solid rgb(255, 148, 7);
  }
  /* 企画（下）末尾 三角部分 */
  .planEndBottomTriangle {
    background: linear-gradient(
        to top left,
        transparent 43%,
        rgb(255, 148, 7) 50%,
        rgba(255, 234, 207) calc(50% + 2px)
      )
      top right/ 100% 100% no-repeat;
    width: 10px;
    height: 25px;
    display: table-cell;
  }
  /* 企画（下）末尾 三角部分 土曜日用 */
  .planEndBottomTriangle_Saturday {
    background: linear-gradient(
        to top left,
        rgb(220, 248, 255) 43%,
        rgb(255, 148, 7) 50%,
        rgba(255, 234, 207) calc(50% + 2px)
      )
      top right/ 100% 100% no-repeat;
    width: 10px;
    height: 25px;
    display: table-cell;
  }
  /* 企画（下）末尾 三角部分 日曜日用 */
  .planEndBottomTriangle_Sunday {
    background: linear-gradient(
        to top left,
        rgb(187, 241, 255) 43%,
        rgb(255, 148, 7) 50%,
        rgba(255, 234, 207) calc(50% + 2px)
      )
      top right/ 100% 100% no-repeat;
    width: 10px;
    height: 25px;
    display: table-cell;
  }
  .presetListActive{
    position: absolute;
    top: 25px;
    left: 20px;
    font-size: 14px;
  }
  .presetListActive::before{
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #ff9407;
    display: inline-block;
    margin-right: 5px;
  }
  .presetListNormal{
    position: absolute;
    top: 25px;
    left: 80px;
    font-size: 14px;
  }
  .presetListNormal::before{
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 5px;
    border: #ff9407 solid 1px;
    display: inline-block;
    margin-right: 5px;
  }
  .ll {
    word-break: break-all;
    text-align: left;
    padding-left: 5px !important;
  }

</style>
