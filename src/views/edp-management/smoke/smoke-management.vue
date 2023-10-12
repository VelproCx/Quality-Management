<template>
  <div class="container">
    <Breadcrumb :items="['menu.edp', 'menu.edp.smoke']" />
    <a-card class="general-card" :title="$t('menu.task.searchTable')">
      <a-row>
        <a-col :flex="1">
          <a-form
            :model="formModel"
            :label-col-props="{ span: 6 }"
            :wrapper-col-props="{ span: 18 }"
            label-align="left"
          >
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item
                  field="taskId"
                  :label="$t('searchTable.form.taskId')"
                >
                  <a-input
                    v-model="formModel.taskId"
                    :placeholder="$t('searchTable.form.taskId.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="source"
                  :label="$t('searchTable.form.source')"
                >
                  <a-input
                    v-model="formModel.source"
                    :placeholder="$t('searchTable.form.source.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="status"
                  :label="$t('searchTable.form.status')"
                >
                  <a-select
                    v-model="formModel.status"
                    :options="statusOptions"
                    :placeholder="$t('searchTable.form.selectDefault')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="createdTime"
                  :label="$t('searchTable.form.createdTime')"
                >
                  <a-range-picker
                    v-model="formModel.createdTime"
                    style="width: 100%"
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-divider direction="vertical" />
        <a-col :flex="'86px'" style="text-align: right">
          <a-space direction="vertical" :size="18">
            <a-button type="primary" @click="search">
              <template #icon>
                <icon-search />
              </template>
              {{ $t('searchTable.form.search') }}
            </a-button>
            <!-- <a-button @click="reset">
              <template #icon>
                <icon-refresh />
              </template>
              {{ $t('searchTable.form.reset') }}
            </a-button> -->
          </a-space>
        </a-col>
      </a-row>
      <a-divider style="margin-top: 0" />
      <a-row style="margin-bottom: 16px">
        <a-col :span="12">
          <a-space>
            <a-button
              type="primary"
              html-type="submit"
              @click="openCreateDialog"
            >
              <template #icon>
                <icon-plus />
              </template>
              {{ $t('searchTable.operation.create') }}
            </a-button>
            <a-modal
              :visible="showCreateDialog"
              title="Create Task"
              okText="Confirm"
              cancelText="Cancel"
              @update:visible="showCreateDialog"
              @ok="createTask"
              @cancel="handleCancel"
              @before-ok="handleBeforeOk"
              maskClosable="false"
              width="1550px"
            >
              <a-form :model="createTaskForm">
                <!-- <a-form-item field="source" label="source" disabled>
                  <a-input
                    v-model="createTaskForm.source"
                    placeholder="please enter username"
                  />
                </a-form-item> -->
                <a-row :gutter="16">
                  <!-- <a-divider /> -->
                  <a-col :span="12">
                    <a-form-item field="ip" label="IP">
                      <a-input
                        v-model="createTaskForm.ip"
                        placeholder="please enter ip"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item field="port" label="Port">
                      <a-input
                        v-model="createTaskForm.port"
                        placeholder="please enter port"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item field="sender" label="Sender">
                      <a-select
                        v-model="createTaskForm.sender"
                        :options="senderOptions"
                        :placeholder="$t('createTable.form.selectDefault')"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item field="target" label="Target">
                      <a-select
                        v-model="createTaskForm.target"
                        :options="targetOptions"
                        :placeholder="$t('createTable.form.selectDefault')"
                      />
                    </a-form-item>
                  </a-col>
                  <!-- <span>Order Info</span> -->
                  <a-divider />
                  <a-col :span="12">
                    <a-form-item field="account" label="Account">
                      <a-select
                        v-model="createTaskForm.account"
                        :options="accountOptions"
                        :placeholder="$t('createTable.form.selectDefault')"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item field="market" label="Market" disabled>
                      <a-input
                        v-model="createTaskForm.market"
                        placeholder="please enter market"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item field="actionType" label="ActionType">
                      <a-select
                        v-model="createTaskForm.actionType"
                        :options="actionTypeOptions"
                        :placeholder="$t('createTable.form.selectDefault')"
                      />
                    </a-form-item>
                  </a-col>

                  <a-col :span="12">
                    <a-form-item field="orderQty" label="OrderQty">
                      <a-input
                        v-model="createTaskForm.orderQty"
                        placeholder="please enter orderQty"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item field="ordType" label="OrdType">
                      <a-select
                        v-model="createTaskForm.ordType"
                        :options="ordTypeOptions"
                        :placeholder="$t('createTable.form.selectDefault')"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12" v-if="createTaskForm.ordType === '2'">
                    <a-form-item field="price" label="Price">
                      <a-input
                        v-model="createTaskForm.price"
                        placeholder="please enter price"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item field="side" label="Side">
                      <a-select
                        v-model="createTaskForm.side"
                        :options="sideOptions"
                        :placeholder="$t('createTable.form.selectDefault')"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item field="symbol" label="Symbol">
                      <a-input
                        v-model="createTaskForm.symbol"
                        placeholder="please enter symbol"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item field="timeInForce" label="TimeInForce">
                      <a-select
                        v-model="createTaskForm.timeInForce"
                        :options="timeInForceOptions"
                        :placeholder="$t('createTable.form.selectDefault')"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      field="crossingPriceType"
                      label="CrossingPriceType"
                    >
                      <a-input
                        v-model="createTaskForm.crossingPriceType"
                        placeholder="please enter crossingPriceType"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item field="rule80A" label="Rule80A">
                      <a-input
                        v-model="createTaskForm.rule80A"
                        placeholder="please enter rule80A"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item field="cashMargin" label="CashMargin">
                      <a-input
                        v-model="createTaskForm.cashMargin"
                        placeholder="please enter cashMargin"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      field="marginTransactionType"
                      label="marginTransactionType"
                    >
                      <a-input
                        v-model="createTaskForm.marginTransactionType"
                        placeholder="please enter MarginTransactionType"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item field="minQty" label="MinQty">
                      <a-input
                        v-model="createTaskForm.minQty"
                        placeholder="please enter minQty"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      field="orderClassification"
                      label="OrderClassification"
                    >
                      <a-input
                        v-model="createTaskForm.orderClassification"
                        placeholder="please enter orderClassification"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      field="selfTradePreventionId"
                      label="SelfTradePreventionId"
                    >
                      <a-input
                        v-model="createTaskForm.selfTradePreventionId"
                        placeholder="please enter selfTradePreventionId"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
              </a-form>
            </a-modal>
          </a-space>
        </a-col>
        <a-col
          :span="12"
          style="display: flex; align-items: center; justify-content: end"
        >
          <a-tooltip :content="$t('searchTable.actions.refresh')">
            <div class="action-icon" @click="search"
              ><icon-refresh size="18"
            /></div>
          </a-tooltip>
          <a-dropdown @select="handleSelectDensity">
            <a-tooltip :content="$t('searchTable.actions.density')">
              <div class="action-icon"><icon-line-height size="18" /></div>
            </a-tooltip>
            <template #content>
              <a-doption
                v-for="item in densityList"
                :key="item.value"
                :value="item.value"
                :class="{ active: item.value === size }"
              >
                <span>{{ item.name }}</span>
              </a-doption>
            </template>
          </a-dropdown>
          <a-tooltip :content="$t('searchTable.actions.columnSetting')">
            <a-popover
              trigger="click"
              position="bl"
              @popup-visible-change="popupVisibleChange"
            >
              <div class="action-icon"><icon-settings size="18" /></div>
              <template #content>
                <div id="tableSetting">
                  <div
                    v-for="item in showColumns"
                    :key="item.dataIndex"
                    class="setting"
                  >
                    <div style="margin-right: 4px; cursor: move">
                      <icon-drag-arrow />
                    </div>
                    <div>
                      <a-checkbox
                        v-model="item.checked"
                        @change="
                          handleChange($event, item as TableColumnData, index)
                        "
                      >
                      </a-checkbox>
                    </div>
                    <div class="title">
                      {{ item.title === '#' ? ' 编号' : item.title }}
                    </div>
                  </div>
                </div>
              </template>
            </a-popover>
          </a-tooltip>
        </a-col>
      </a-row>
      <a-table
        row-key="id"
        :loading="loading"
        :pagination="pagination"
        :columns="(cloneColumns as TableColumnData[])"
        :data="renderData"
        :bordered="false"
        :size="size"
        @page-change="onPageChange"
      >
        <template #index="{ rowIndex }">
          {{ rowIndex + 1 + (pagination.current - 1) * pagination.pageSize }}
        </template>
        <template #status="{ record }">
          <span v-if="record.status === 'completed'" class="circle"></span>
          <span
            v-if="record.status === 'progressing'"
            class="circle pass"
          ></span>
          <span v-if="record.status === 'error'" class="circle err"></span>
          {{ $t(`searchTable.form.status.${record.status}`) }}
          <icon-exclamation-circle v-if="record.status === 'error'" />
        </template>
        <template #operations>
          <a-button type="text" size="small">
            {{ $t('searchTable.columns.operations.view') }}
          </a-button>
          <a-button type="text" size="small">
            {{ $t('searchTable.columns.operations.download') }}
          </a-button>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, reactive, watch, nextTick } from 'vue';
  import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';
  import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';
  import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
  import cloneDeep from 'lodash/cloneDeep';
  import Sortable from 'sortablejs';
  import { IconExclamationCircle } from '@arco-design/web-vue/es/icon';
  import { Pagination } from '@/types/global';
  import {
    queryPolicyList,
    PolicyRecord,
    PolicyParams,
    CreateEdpSmokePar,
  } from '@/api/smoke';
  import { Message } from '@arco-design/web-vue';

  type SizeProps = 'mini' | 'small' | 'medium' | 'large';
  type Column = TableColumnData & { checked?: true };

  const generateFormModel = () => {
    return {
      ip: '',
      port: '',
      sender: '',
      target: '',
      account: '',
      market: 'EDP',
      actionType: '',
      orderQty: null,
      ordType: '',
      side: '',
      symbol: '',
      timeInForce: '',
      crossingPriceType: 'EDP',
      rule80A: '',
      cashMargin: '',
      marginTransactionType: '',
      minQty: null,
      orderClassification: '',
      selfTradePreventionId: '',
      source: '',
      createdTime: [],
      status: '',
      taskId: '',
      price: '',
    };
  };
  const { loading, setLoading } = useLoading(true);
  const { t } = useI18n();
  const renderData: ref<PolicyRecord[]> = ref([]);
  const formModel = ref(generateFormModel());
  const cloneColumns = ref<Column[]>([]);
  const showColumns = ref<Column[]>([]);
  const size = ref<SizeProps>('medium');
  const showCreateDialog = ref(false);
  const Shell: (string | number)[] = [];
  const basePagination: Pagination = {
    current: 1,
    pageSize: 10,
  };

  const pagination = reactive({
    ...basePagination,
  });

  //   新建执行任务参数
  const createTaskForm = reactive({
    source: 'Admin',
    ip: '',
    port: '',
    sender: '',
    target: '',
    account: '',
    market: '' || 'EDP',
    actionType: '',
    orderQty: null,
    ordType: '',
    side: '',
    symbol: '',
    timeInForce: '',
    crossingPriceType: '' || 'EDP',
    rule80A: '',
    cashMargin: '',
    marginTransactionType: '',
    minQty: null,
    orderClassification: '',
    selfTradePreventionId: '',
    price: '',
  });
  // 定义列表显示密度选项
  const densityList = computed(() => [
    {
      name: t('searchTable.size.mini'),
      value: 'mini',
    },
    {
      name: t('searchTable.size.small'),
      value: 'small',
    },
    {
      name: t('searchTable.size.medium'),
      value: 'medium',
    },
    {
      name: t('searchTable.size.large'),
      value: 'large',
    },
  ]);
  // 定义列
  const columns = computed<TableColumnData[]>(() => [
    {
      title: t('searchTable.columns.index'),
      dataIndex: 'index',
      slotName: 'index',
    },
    {
      title: t('searchTable.columns.taskId'),
      dataIndex: 'taskId',
      slotName: 'taskId',
    },
    {
      title: t('searchTable.columns.symbol'),
      dataIndex: 'symbol',
      slotName: 'symbol',
    },
    {
      title: t('searchTable.columns.ordType'),
      dataIndex: 'ordType',
      slotName: 'ordType',
    },
    {
      title: t('searchTable.columns.side'),
      dataIndex: 'side',
      slotName: 'side',
    },
    {
      title: t('searchTable.columns.status'),
      dataIndex: 'status',
      slotName: 'status',
    },
    {
      title: t('searchTable.columns.source'),
      dataIndex: 'source',
    },
    {
      title: t('searchTable.columns.createdTime'),
      dataIndex: 'createdTime',
    },

    {
      title: t('searchTable.columns.operations'),
      dataIndex: 'operations',
      slotName: 'operations',
    },
  ]);
  // 定义状态项
  const statusOptions = computed<SelectOptionData[]>(() => [
    {
      label: t('searchTable.form.status.progressing'),
      value: 'progressing',
    },
    {
      label: t('searchTable.form.status.completed'),
      value: 'completed',
    },
    {
      label: t('searchTable.form.status.error'),
      value: 'error',
    },
  ]);
  //   定义account下拉框项
  const accountOptions = computed<SelectOptionData[]>(() => {
    const options = [];
    for (let i = 1; i <= 10; i += 1) {
      options.push({
        label: `RSIT_EDP_ACCOUNT_${i}`,
        value: `RSIT_EDP_ACCOUNT_${i}`,
      });
    }
    // for (let i = 1; i <= 10; i += 1) {
    //   options.push({
    //     label: `RSIT_ACCOUNT_${i}`,
    //     value: `RSIT_ACCOUNT_${i}`,
    //   });
    // }
    for (let i = 1; i <= 10; i += 1) {
      options.push({
        label: `RUAT_EDP_ACCOUNT_${i}`,
        value: `RUAT_EDP_ACCOUNT_${i}`,
      });
    }
    // for (let i = 1; i <= 10; i += 1) {
    //   options.push({
    //     label: `RUAT_ACCOUNT_${i}`,
    //     value: `RUAT_ACCOUNT_${i}`,
    //   });
    // }
    return options;
  });

  const senderOptions = computed<SelectOptionData[]>(() => {
    const options = [];
    for (let i = 1; i <= 10; i += 1) {
      options.push({
        label: `RSIT_EDP_${i}`,
        value: `RSIT_EDP_${i}`,
      });
    }
    // for (let i = 1; i <= 10; i += 1) {
    //   options.push({
    //     label: `RSIT_ACCOUNT_${i}`,
    //     value: `RSIT_ACCOUNT_${i}`,
    //   });
    // }
    for (let i = 1; i <= 10; i += 1) {
      options.push({
        label: `RUAT_EDP_${i}`,
        value: `RUAT_EDP_${i}`,
      });
    }
    // for (let i = 1; i <= 10; i += 1) {
    //   options.push({
    //     label: `RUAT_ACCOUNT_${i}`,
    //     value: `RUAT_ACCOUNT_${i}`,
    //   });
    // }
    return options;
  });

  const targetOptions = computed<SelectOptionData[]>(() => [
    {
      label: t('createTable.form.target.sit'),
      value: 'FSX_SIT_EDP',
    },
    {
      label: t('createTable.form.target.uat'),
      value: 'FSX_UAT_EDP',
    },
  ]);

  const actionTypeOptions = computed<SelectOptionData[]>(() => [
    {
      label: t('createTable.form.actionType.new'),
      value: 'NewAck',
    },
    {
      label: t('createTable.form.actionType.cancel'),
      value: 'CancelAck',
    },
  ]);

  const ordTypeOptions = computed<SelectOptionData[]>(() => [
    {
      label: t('createTable.form.ordType.market'),
      value: '1',
    },
    {
      label: t('createTable.form.ordType.limit'),
      value: '2',
    },
  ]);

  const sideOptions = computed<SelectOptionData[]>(() => [
    {
      label: t('createTable.form.side.buy'),
      value: '1',
    },
    {
      label: t('createTable.form.side.sell'),
      value: '2',
    },
  ]);

  const timeInForceOptions = computed<SelectOptionData[]>(() => [
    {
      label: t('createTable.form.timeInForce.day'),
      value: '0',
    },
    {
      label: t('createTable.form.timeInForce.ioc'),
      value: '3',
    },
  ]);

  const openCreateDialog = () => {
    showCreateDialog.value = true;
  };

  const handleCancel = () => {
    showCreateDialog.value = false;
  };

  const handleBeforeOk = (done: any) => {
    window.setTimeout(() => {
      done();
    }, 1000);
  };

  const createTask = async () => {
    setLoading(true);
    try {
      const response = await CreateEdpSmokePar(createTaskForm);
      const responseData = response.data;
      fetchData();
    } catch (error) {
      // 处理错误，例如显示错误消息或记录错误日志
      Message.error(t('createTask.form.status.fail'));
    } finally {
      Message.success(t('createTask.form.status.success'));
      showCreateDialog.value = false;
      setLoading(false);
    }
  };

  // 进入列表，加载数据
  const fetchData = async (
    params: PolicyParams = { current: 1, pageSize: 10 }
  ) => {
    setLoading(true);
    try {
      const { data } = await queryPolicyList(params);
      console.log(data.data);
      //   加载数据
      renderData.value = data.data;
      //   当前页码
      pagination.current = params.current;
      //   当前总数
      pagination.total = data.data.length;
    } catch (err) {
      //   Message.error('请求失败，请稍后重试');
      Message.error('Loading Error');
    } finally {
      setLoading(false);
    }
  };

  // 带查询条件进行数据查询
  const search = () => {
    fetchData({
      ...basePagination,
      ...formModel.value,
    } as unknown as PolicyParams);
  };

  const onPageChange = (current: number) => {
    fetchData({ ...basePagination, current });
  };

  fetchData();
  //   const reset = () => {
  //     formModel.value = generateFormModel();
  //   };
  // 选择显示列表密度
  const handleSelectDensity = (
    val: string | number | Record<string, any> | undefined,
    e: Event
  ) => {
    size.value = val as SizeProps;
  };
  // 列表显示数据列
  const handleChange = (
    checked: boolean | (string | boolean | number)[],
    columns: Column,
    index: number
  ) => {
    if (!checked) {
      cloneColumns.value = showColumns.value.filter(
        (item) => item.dataIndex !== columns.dataIndex
      );
    } else {
      cloneColumns.value.splice(index, 0, columns);
    }
  };
  //
  const exchangeArray = <T extends Array<any>>(
    array: T,
    beforeIdx: number,
    newIdx: number,
    isDeep = false
  ): T => {
    const newArray = isDeep ? cloneDeep(array) : array;
    if (beforeIdx > -1 && newIdx > -1) {
      // 先替换后面的，然后拿到替换的结果替换前面的
      newArray.splice(
        beforeIdx,
        1,
        newArray.splice(newIdx, 1, newArray[beforeIdx]).pop()
      );
    }
    return newArray;
  };

  const popupVisibleChange = (val: boolean) => {
    if (val) {
      nextTick(() => {
        const el = document.getElementById('tableSetting') as HTMLElement;
        const sortable = new Sortable(el, {
          onEnd(e: any) {
            const { oldIndex, newIndex } = e;
            exchangeArray(cloneColumns.value, oldIndex, newIndex);
            exchangeArray(showColumns.value, oldIndex, newIndex);
          },
        });
      });
    }
  };

  watch(
    () => columns.value,
    (val) => {
      fetchData();
      cloneColumns.value = cloneDeep(val);
      cloneColumns.value.forEach((item, index) => {
        item.checked = true;
      });
      showColumns.value = cloneDeep(cloneColumns.value);
    },
    { deep: true, immediate: true }
  );
</script>

<script lang="ts">
  export default {
    name: 'smoke',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
  }
  :deep(.arco-table-th) {
    &:last-child {
      .arco-table-th-item-title {
        margin-left: 16px;
      }
    }
  }
  .action-icon {
    margin-left: 12px;
    cursor: pointer;
  }
  .active {
    color: #0960bd;
    background-color: #e3f4fc;
  }
  .setting {
    display: flex;
    align-items: center;
    width: 200px;
    .title {
      margin-left: 12px;
      cursor: pointer;
    }
  }
  .arco-modal {
    width: 800px;
  }
</style>
