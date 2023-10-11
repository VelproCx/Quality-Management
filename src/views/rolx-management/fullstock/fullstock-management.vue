<template>
  <div class="container">
    <Breadcrumb :items="['menu.rolx', 'menu.rolx.fullstock']" />
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
                  field="Source"
                  :label="$t('searchTable.form.Source')"
                >
                  <a-input
                    v-model="formModel.taskName"
                    :placeholder="$t('searchTable.form.Source.placeholder')"
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
            <a-button type="primary">
              <template #icon>
                <icon-plus />
              </template>
              {{ $t('searchTable.operation.create') }}
            </a-button>

            <!-- <a-upload action="/">
              <template #upload-button>
                <a-button>
                  {{ $t('searchTable.operation.import') }}
                </a-button>
              </template>
            </a-upload> -->
          </a-space>
        </a-col>
        <a-col
          :span="12"
          style="display: flex; align-items: center; justify-content: end"
        >
          <!-- <a-button>
            <template #icon>
              <icon-download />
            </template>
            {{ $t('searchTable.operation.download') }}
          </a-button> -->
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
                    v-for="(item, index) in showColumns"
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
                      {{ item.title === '#' ? '序列号' : item.title }}
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
          <span v-if="record.status === 'Planning'" class="circle"></span>
          <span v-else class="circle pass"></span>
          {{ $t(`searchTable.form.status.${record.status}`) }}
        </template>
        <template #operations>
          <a-button v-permission="['admin']" type="text" size="small">
            {{ $t('searchTable.columns.operations.view') }}
          </a-button>
        </template>
      </a-table>
    </a-card>
  </div>
  <template>
    <a-dialog v-model="showAddTaskDialog" title="新增任务">
      <a-form>
        <a-form-item label="TapdID" field="tapdId">
          <a-input v-model="newTask.tapd" />
        </a-form-item>
        <a-form-item label="任务名称" field="taskName">
          <a-input v-model="newTask.taskName" />
        </a-form-item>
        <a-form-item label="来源" field="Source">
          <a-input v-model="newTask.Source" />
        </a-form-item>
        <a-form-item label="状态" field="status">
          <a-select v-model="newTask.status" :options="statusOptions" />
        </a-form-item>
      </a-form>
      <a-button @click="addTask">确定</a-button>
    </a-dialog>
  </template>
</template>

<script lang="ts" setup>
  import { computed, ref, reactive, watch, nextTick } from 'vue';
  import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';
  import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';
  import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
  import cloneDeep from 'lodash/cloneDeep';
  import Sortable from 'sortablejs';
  import { Pagination } from '@/types/global';
  import { queryPolicyList, PolicyRecord, PolicyParams } from '@/api/task';
  //   import { Message } from 'arco-ui';

  type SizeProps = 'mini' | 'small' | 'medium' | 'large';
  type Column = TableColumnData & { checked?: true };

  const generateFormModel = () => {
    return {
      id: '',
      Source: '',
      createdTime: [],
      status: '',
    };
  };
  const { loading, setLoading } = useLoading(true);
  const { t } = useI18n();
  const renderData: ref<PolicyRecord[]> = ref([]);
  const formModel = ref(generateFormModel());
  const cloneColumns = ref<Column[]>([]);
  const showColumns = ref<Column[]>([]);
  const size = ref<SizeProps>('medium');
  const showAddTaskDialog = ref(false);
  const basePagination: Pagination = {
    current: 1,
    pageSize: 50,
  };

  const pagination = reactive({
    ...basePagination,
  });

  const newTask = reactive({
    Source: '',
    status: '', // 这里默认为空，你可以设置默认值或者通过下拉框选择
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
      title: t('searchTable.columns.createdTime'),
      dataIndex: 'createdTime',
    },

    {
      title: t('searchTable.columns.source'),
      dataIndex: 'source',
    },
    {
      title: t('searchTable.columns.status'),
      dataIndex: 'status',
      slotName: 'status',
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
  ]);

  // 进入列表，加载数据
  const fetchData = async (
    params: PolicyParams = { current: 1, pageSize: 10 }
  ) => {
    setLoading(true);
    try {
      const { data } = await queryPolicyList(params);
      //   加载数据
      renderData.value = data;
      //   console.log(data);
      //   当前页码
      pagination.current = params.current;
      //   当前总数
      pagination.total = data.total;
    } catch (err) {
      // you can report use errorHandler or other
      //   Message.error('请求失败，请稍后重试');
      console.error(err);
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
  const reset = () => {
    formModel.value = generateFormModel();
  };
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
      cloneColumns.value = cloneDeep(val);
      cloneColumns.value.forEach((item, index) => {
        item.checked = true;
      });
      showColumns.value = cloneDeep(cloneColumns.value);
    },
    { deep: true, immediate: true }
  );

  const addTask = () => {
    const requestData = {
      source: newTask.source,
      status: newTask.status,
    };

    // 关闭弹出框
    showAddTaskDialog.value = false;
  };
</script>

<script lang="ts">
  export default {
    name: 'fullstock',
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
</style>
