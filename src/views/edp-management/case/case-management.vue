<template>
  <div class="container">
    <Breadcrumb :items="['menu.edp', 'menu.edp.case']" />
    <a-card class="general-card" :title="$t('menu.edp.searchTable')">
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
                  field="caseName"
                  :label="$t('searchTable.form.caseName')"
                >
                  <a-input
                    v-model="formModel.caseName"
                    :placeholder="$t('searchTable.form.caseName.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="Source"
                  :label="$t('searchTable.form.source')"
                >
                  <a-input
                    v-model="formModel.source"
                    :placeholder="$t('searchTable.form.source.placeholder')"
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
              {{ $t('searchTable.operation.createCase') }}
            </a-button>
            <a-modal
              :visible="showCreateDialog"
              title="Create Task"
              cancel-text="Cancel"
              ok-text="Confirm"
              mask-closable="false"
              width="600px"
              @update:visible="showCreateDialog"
              @ok="createTask"
              @cancel="handleCancel"
              :okLoading="confirmLoading"
            >
              <a-form :model="createTaskForm">
                <a-form-item field="source" label="source">
                  <a-input
                    v-model="createTaskForm.source"
                    placeholder="please enter your username..."
                    disabled
                  />
                </a-form-item>
                <a-form-item
                  v-for="(command, index) of createTaskForm.commands"
                  :key="index"
                  :field="`commands[${index}].value`"
                  :label="`Command-${index}`"
                  :rules="[{ required: true, message: 'Command is required' }]"
                >
                  <a-textarea v-model="command.value" auto-size />
                  <a-button
                    :style="{ marginLeft: '10px' }"
                    @click="handleDelete(index)"
                    >Delete</a-button
                  >
                </a-form-item>
              </a-form>
              <div>
                <a-button @click="handleAdd">Add Command</a-button>
              </div>
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
                        @change="handleChange($event, item, index)"
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
        :columns="cloneColumns"
        :data="renderData"
        :bordered="false"
        :size="size"
        @page-change="onPageChange"
      >
        <template #index="{ rowIndex }">
          {{ rowIndex + 1 + (pagination.current - 1) * pagination.pageSize }}
        </template>
        <template #operations="{ record }">
          <a-button type="text" size="small" @click="openViewDialog(record)">
            {{ $t('searchTable.columns.operations.editCase') }}
          </a-button>
        </template>
      </a-table>
    </a-card>
  </div>
  <a-modal
    :visible="showViewDialog"
    title="Case Details"
    ok-text="Confirm"
    cancel-text="Cancel"
    @cancel="closeViewDialog"
    width="900px"
  >
    <a-form :model="detailsForm">
      <a-row :gutter="12">
        <a-col v-for="(item, index) in detailsForm.data" :key="index">
          <a-collapse>
            <a-collapse-item :header="item.ScenarioName" accordion>
              <template v-for="(value, field) in item" :key="field">
                <a-form-item :field="`${index}.${field}`" :label="field">
                  <a-input
                    v-model="item[field]"
                    :placeholder="`请输入${field}`"
                  />
                </a-form-item>
              </template>
            </a-collapse-item>
          </a-collapse>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
  import { computed, ref, reactive, watch, nextTick } from 'vue';
  import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';
  import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';
  import { TableColumnData } from '@arco-design/web-vue/es/table/interface';
  import cloneDeep from 'lodash/cloneDeep';
  import Sortable from 'sortablejs';
  import { IconExclamationCircle } from '@arco-design/web-vue/es/icon';
  import { Pagination } from '@/types/global';
  import {
    queryPolicyList,
    PolicyRecord,
    PolicyParams,
    CreateEdpCasePar,
    CreateEdpCase,
    EditEdpCasePar,
    ViewEdpCaseDetail,
  } from '@/api/case';
  import { UserForm } from '@/api/user';
  import { Message } from '@arco-design/web-vue';

  type SizeProps = 'mini' | 'small' | 'medium' | 'large';
  type Column = TableColumnData & { checked?: true };

  const generateFormModel = () => {
    return {
      caseName: '',
      source: '',
      loadingDown: false,
    };
  };
  const { loading, setLoading } = useLoading(true);
  const { t } = useI18n();
  const renderData = ref<PolicyRecord[]>([]);
  const formModel = ref(generateFormModel());
  const cloneColumns = ref<Column[]>([]);
  const showColumns = ref<Column[]>([]);
  const size = ref<SizeProps>('medium');
  const showCreateDialog = ref(false);
  const storedData = sessionStorage.getItem('userData');
  const userData = ref<UserForm | null>(null);
  const confirmLoading = ref(false);
  const showViewDialog = ref(false);
  //   const detailsCase: ref<ViewEdpCaseDetail[]> = ref([]);

  const basePagination: Pagination = {
    current: 1,
    pageSize: 10,
  };
  const pagination = reactive({
    ...basePagination,
  });

  //   新建执行任务参数
  const createTaskForm = reactive({
    source: '',
    commands: [{ value: '' }],
  });

  //   const detailsForm: ViewEdpCaseDetail = reactive({
  //     id: '',
  //     scenarioName: '',
  //     account: '',
  //     market: '',
  //     actionType: '',
  //     comment: '',
  //     orderQty: 0, // 修改为数字类型
  //     ordType: '',
  //     side: '',
  //     symbol: '',
  //     timeInForce: '',
  //     crossingPriceType: '',
  //     rule80A: '',
  //     cashMargin: '',
  //     marginTransactionType: '',
  //     minQty: 0, // 修改为数字类型
  //     orderClassification: '',
  //     selfTradePreventionId: '',
  //     price: 0, // 修改为数字类型
  //     orderStatus: [],
  //     errorCode: '',
  //     taskId: '',
  //   });
  const detailsForm = reactive({
    data: [{ value: [] }],
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
      title: t('searchTable.columns.caseName'),
      dataIndex: 'caseName',
      slotName: 'caseName',
    },
    {
      title: t('searchTable.columns.updateTime'),
      dataIndex: 'updateTime',
    },

    {
      title: t('searchTable.columns.source'),
      dataIndex: 'source',
    },
    {
      title: t('searchTable.columns.operations'),
      dataIndex: 'operations',
      slotName: 'operations',
    },
  ]);

  const handleAdd = () => {
    createTaskForm.commands.push({
      value: '',
    });
  };
  const handleDelete = (index: number) => {
    createTaskForm.commands.splice(index, 1);
  };
  const openViewDialog = async (record: any) => {
    setLoading(true);
    try {
      showViewDialog.value = true;
      const data = await EditEdpCasePar(record);
      detailsForm.data = data.data;
      console.log(detailsForm.data);
    } catch (err) {
      Message.error('Loading Error');
    } finally {
      setLoading(false);
    }
  };

  const closeViewDialog = () => {
    // detailsForm.data = {};
    showViewDialog.value = false;
  };

  const openCreateDialog = () => {
    if (storedData) {
      userData.value = JSON.parse(storedData);
      if (userData.value) {
        createTaskForm.source = userData.value.name;
      }
      createTaskForm.commands = [];
      showCreateDialog.value = true;
    }
  };

  const handleCancel = () => {
    createTaskForm.commands = [];
    showCreateDialog.value = false;
  };

  const createTask = async () => {
    setLoading(true);
    confirmLoading.value = true;
    try {
      await CreateEdpCasePar(createTaskForm);
      fetchData();
    } catch (error) {
      // 处理错误，例如显示错误消息或记录错误日志
      Message.error(t('createTask.form.status.fail'));
    } finally {
      Message.success(t('createTask.form.status.success'));
      createTaskForm.commands = [];
      showCreateDialog.value = false;
      setLoading(false);
      confirmLoading.value = false;
    }
  };

  // 进入列表，加载数据
  const fetchData = async (
    params: PolicyParams = { current: 1, pageSize: 10 }
  ) => {
    setLoading(true);
    try {
      const { data } = await queryPolicyList(params);
      //   加载数据
      renderData.value = data.data;
      //   当前页码
      pagination.current = params.current;
      //   当前总数
      pagination.total = data.data.length;
    } catch (err) {
      //   Message.error('请求失败，请稍后重试');
      //   Message.error('Loading Error');
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
    fetchData({ ...basePagination, current, ...formModel.value });
  };

  fetchData();

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
    name: 'case',
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
    width: 600px;
  }
</style>
