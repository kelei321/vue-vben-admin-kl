<script lang="ts" setup>
import type { VbenFormProps } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { Page } from '@vben/common-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { orderListApi } from '#/api';

interface RowType {
  category: string;
  color: string;
  id: string;
  price: string;
  productName: string;
  releaseDate: string;
}

const formOptions: VbenFormProps = {
  // 默认展开
  collapsed: false,
  fieldMappingTime: [['date', ['start', 'end']]],
  schema: [
    {
      component: 'RadioGroup',
      defaultValue: 'all',
      fieldName: 'status',
      label: '订单状态',
    },
    {
      component: 'Input',
      fieldName: 'productName',
      label: 'ProductName',
    },
    {
      component: 'Input',
      fieldName: 'price',
      label: 'Price',
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: [
          {
            label: 'Color1',
            value: '1',
          },
          {
            label: 'Color2',
            value: '2',
          },
        ],
        placeholder: '请选择',
      },
      fieldName: 'color',
      label: 'Color',
    },
    {
      component: 'RangePicker',
      // defaultValue: [dayjs().subtract(7, 'days'), dayjs()],
      fieldName: 'date',
      label: 'Date',
    },
  ],
  // 控制表单是否显示折叠按钮
  showCollapseButton: true,
  // 是否在字段值改变时提交表单
  submitOnChange: true,
  // 按下回车时是否提交表单
  submitOnEnter: false,
};

const gridOptions: VxeTableGridOptions<RowType> = {
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },
  columns: [
    { title: '序号', type: 'seq', width: 50 },
    {
      field: 'orderId',
      title: '订单号',
      minWidth: 210,
      slots: { default: 'orderId' },
    },
    { field: 'orderType', title: '订单类型', minWidth: 110 },
    { field: 'realName', title: '收货人', minWidth: 110 },
    {
      field: 'product',
      title: '商品信息',
      minWidth: 400,
      slots: { default: 'product' },
    },
    { field: 'payPrice', title: '实际支付', minWidth: 80 },
    { field: 'payTypeStr', title: '支付方式', minWidth: 80 },
    { field: 'refundStatus', title: '订单状态', minWidth: 110 },
    { field: 'createTime', title: '下单时间', minWidth: 150 },
  ],
  exportConfig: {},
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        return await orderListApi({
          page: page.currentPage,
          limit: page.pageSize,
          type: 0,
          ...formValues,
        });
      },
    },
  },
  toolbarConfig: {
    custom: true,
    export: true,
    refresh: true,
    resizable: true,
    search: true,
    zoom: true,
  },
};

const [Grid] = useVbenVxeGrid({
  formOptions,
  gridOptions,
});
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #orderId="{ row }">
        <span style="display: block">{{ row.orderId }}</span>
        <span v-show="row.isDel" style="display: block; color: #ed4014">
          用户已删除
        </span>
      </template>
    </Grid>
  </Page>
</template>
