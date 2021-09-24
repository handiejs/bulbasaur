<template>
  <div class="DataTable">
    <div class="DataTable-tableWrapper">
      <el-table
        class="DataTable-table"
        :data="data"
        height="100%"
        border
        v-bind="$attrs"
        v-on="filteredListeners"
      >
        <template v-for="col in filteredColumns">
          <el-table-column v-bind="col" :key="col.prop" v-if="col.render">
            <template slot-scope="{ row, $index }">
              <expand :row-index="$index" :row="row" :column="col" :render-content="col.render" />
            </template>
          </el-table-column>
          <el-table-column v-bind="col" :key="col.prop" v-else />
        </template>
        <slot name="empty" slot="empty" />
      </el-table>
    </div>
    <slot name="pagination" v-if="!hidePagination">
      <el-pagination
        class="DataTable-pagination"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        :page-sizes="pageSizes"
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </slot>
  </div>
</template>

<script lang="ts" src="./logic.ts"></script>

<style lang="scss" src="./style.scss" scoped></style>
