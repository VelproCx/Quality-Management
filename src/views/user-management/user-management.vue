<template>
  <div class="container">
    <Breadcrumb :items="['menu.user', 'menu.user.management']" />
    <a-card class="general-card" :title="$t('menu.user.searchTable')">
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
                <a-form-item field="name" :label="$t('searchTable.form.name')">
                  <a-input
                    v-model="formModel.name"
                    :placeholder="$t('searchTable.form.name.placeholder')"
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
              {{ $t('searchTable.operation.create') }}
            </a-button>
            <a-modal
              :visible="showCreateDialog"
              title="Create User"
              ok-text="Confirm"
              mask-closable="false"
              @cancel-text="Cancel"
              @update:visible="showCreateDialog"
              @ok="createUser"
              @cancel="handleCancel"
              @before-ok="handleBeforeOk"
            >
              <a-form :model="createTaskForm">
                <a-row :gutter="16">
                  <!-- <a-divider /> -->
                  <a-col>
                    <a-form-item field="email" label="Email">
                      <a-input
                        v-model="createUserForm.email"
                        placeholder="Enter your company email"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col>
                    <a-table-column>
                      <a-form-item field="name" label="Name">
                        <a-input
                          v-model="createUserForm.name"
                          placeholder="Enter your first name"
                        />
                      </a-form-item>
                    </a-table-column>
                  </a-col>

                  <a-col>
                    <a-form-item field="password" label="Password">
                      <a-input-password
                        v-model="createUserForm.password"
                        placeholder="Enter your password"
                        allow-clear
                      />
                    </a-form-item>
                  </a-col>
                  <a-col>
                    <a-form-item field="role" label="Role">
                      <a-input
                        v-model="createUserForm.role"
                        placeholder="please select role"
                        disabled
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
          <a-button type="text" size="small" @click="openEditDialog(record)">
            {{ $t('searchTable.columns.operations.edit') }}
          </a-button>

          <a-popconfirm
            content="Are you sure you want to delete?"
            type="error"
            @ok="deleteUser(record)"
          >
            <a-button type="text" size="small">
              {{ $t('searchTable.columns.operations.delete') }}
            </a-button>
          </a-popconfirm>
        </template>
      </a-table>
    </a-card>
  </div>
  <a-modal
    :visible="showEditDialog"
    title="User Details"
    ok-text="Confirm"
    @ok="updateUser(userInfo)"
    @update:visible="showEditDialog"
    @on-before-open="searchUserDetail"
  >
    <a-form :model="userInfo">
      <a-row :gutter="12">
        <a-col>
          <a-form-item field="email" label="Email">
            <a-input
              v-model="userInfo.email"
              placeholder="Enter your company email"
            />
          </a-form-item>
        </a-col>
        <a-col>
          <a-table-column>
            <a-form-item field="name" label="Name">
              <a-input v-model="userInfo.name" placeholder="Enter your name" />
            </a-form-item>
          </a-table-column>
        </a-col>

        <a-col>
          <a-form-item field="role" label="Role">
            <a-input v-model="userInfo.role" disabled />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
  import { computed, ref, reactive, watch, nextTick } from 'vue';
  import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';
  import { TableColumnData } from '@arco-design/web-vue/es/table/interface';
  import cloneDeep from 'lodash/cloneDeep';
  import Sortable from 'sortablejs';
  import { Pagination } from '@/types/global';
  import {
    queryUserList,
    UserForm,
    SearchParams,
    CreateUserReq,
    DeleteUserReq,
    DeleteUser,
    EditUser,
    EditUserReq,
    getUserDetail,
  } from '@/api/user';
  import { Message } from '@arco-design/web-vue';

  type SizeProps = 'mini' | 'small' | 'medium' | 'large';
  type Column = TableColumnData & { checked?: true };

  const generateFormModel = () => {
    return {
      name: '',
      id: '',
    };
  };
  const { loading, setLoading } = useLoading(true);
  const { t } = useI18n();
  const renderData: ref<UserForm[]> = ref([]);
  const formModel = ref(generateFormModel());
  const cloneColumns = ref<Column[]>([]);
  const showColumns = ref<Column[]>([]);
  const size = ref<SizeProps>('medium');
  const showCreateDialog = ref(false);
  const showEditDialog = ref(false);
  const editUserData: ref<UserForm[]> = ref([]);
  const basePagination: Pagination = {
    current: 1,
    pageSize: 10,
  };

  const pagination = reactive({
    ...basePagination,
  });

  //   新建执行任务参数
  const createUserForm = reactive({
    name: '',
    email: '',
    password: '',
    role: 'Admin',
  });

  const userInfo = reactive({
    name: '',
    email: '',
    role: '',
    id: '',
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
      title: t('searchTable.columns.id'),
      dataIndex: 'id',
      slotName: 'id',
    },
    {
      title: t('searchTable.columns.name'),
      dataIndex: 'name',
      slotName: 'name',
    },
    {
      title: t('searchTable.columns.role'),
      dataIndex: 'role',
      slotName: 'role',
    },
    {
      title: t('searchTable.columns.email'),
      dataIndex: 'email',
      slotName: 'email',
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

  const openCreateDialog = () => {
    createUserForm.email = '';
    createUserForm.name = '';
    createUserForm.password = '';
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

  const closeViewDialog = () => {
    showEditDialog.value = false;
  };

  const openEditDialog = async (params: EditUser) => {
    showEditDialog.value = true;
    const response = await getUserDetail(params);
    editUserData.value = response.data;
    const firstUserData = editUserData.value.data;
    userInfo.email = firstUserData.email;
    userInfo.name = firstUserData.name;
    userInfo.role = firstUserData.role;
    userInfo.id = firstUserData.id;
  };

  const updateUser = async (data: UserForm) => {
    setLoading(true);
    try {
      console.log(data);
      const updateUserRes = await EditUserReq(data);
      fetchData();
    } catch (error) {
      // 处理错误，例如显示错误消息或记录错误日志
      Message.error(t('updateUser.form.status.fail'));
    } finally {
      Message.success(t('updateUser.form.status.success'));
      showEditDialog.value = false;
      setLoading(false);
    }
  };

  const createUser = async () => {
    setLoading(true);
    try {
      const response = await CreateUserReq(createUserForm);
      const responseData = response.data;
      fetchData();
    } catch (error) {
      // 处理错误，例如显示错误消息或记录错误日志
      Message.error(t('createUser.form.status.fail'));
    } finally {
      Message.success(t('createUser.form.status.success'));
      showCreateDialog.value = false;
      setLoading(false);
    }
  };

  const deleteUser = async (data: DeleteUser) => {
    try {
      await DeleteUserReq(data);
    } catch (error) {
      Message.error(t('deleteUser.form.status.fail'));
    } finally {
      Message.success(t('deleteUser.form.status.success'));
      fetchData();
    }
  };

  // 进入列表，加载数据
  const fetchData = async (
    params: SearchParams = { current: 1, pageSize: 10 }
  ) => {
    setLoading(true);
    try {
      const { data } = await queryUserList(params);
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
    } as unknown as SearchParams);
  };

  const onPageChange = (current: number) => {
    fetchData({ ...basePagination, current });
  };

  fetchData();

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
    name: 'user',
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
