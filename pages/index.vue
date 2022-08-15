<script lang="ts" setup>
import type { Prisma } from '@prisma/client'
import { NAlert, NButton, NInput } from 'naive-ui'
import { useUserCreate, useUsers } from '~/composables/api/user'

const router = useRouter()

const userData: Prisma.UserCreateInput = reactive({
  name: '',
  username: '',
  email: '',
})

const { data: users, isLoading } = useUsers()
const { mutate: addUser, isLoading: isAddLoading } = useUserCreate()

const onUserCreate = () => {
  if (!userData.name || !userData.username || !userData.email)
    return

  addUser(userData, {
    onSuccess: () => {
      userData.name = ''
      userData.username = ''
      userData.email = ''
    },
  })
}
</script>

<template>
  <div
    flex
    flex-col
    gap-8
    items-center
  >
    <h1>Ovo je moj homepage</h1>

    <n-space>
      <n-tag>Real Love</n-tag>
      <n-tag type="success">
        Yes It Is
      </n-tag>
      <n-tag type="warning">
        I'm Down
      </n-tag>
      <n-tag type="error">
        Yesterday
      </n-tag>
      <n-tag type="info">
        I'm Looking Through You
      </n-tag>
    </n-space>

    <h1>
      Users
    </h1>

    <NAlert
      title="Warning Text"
      type="success"
      w-xl
    >
      <div
        flex
        flex-col
        gap-8
      >
        Honey disconnect the phone
        <NButton type="primary" ml-auto>
          hey mum
        </NButton>
      </div>
    </NAlert>

    <div space-y-4>
      <h2>Add users</h2>
      <form
        flex
        gap-4
        items-center
        @submit.prevent="onUserCreate"
      >
        <NInput v-model:value="userData.name" placeholder="Name" size="large" />
        <NInput v-model:value="userData.username" placeholder="Username" />
        <NInput v-model:value="userData.email" type="email" placeholder="Email" />
        <NButton attr-type="submit" :bordered="true" :loading="isAddLoading">
          Add user
        </NButton>
      </form>
    </div>

    <div v-if="isLoading">
      <p>loading...</p>
    </div>
    <n-list
      v-else-if="users?.length"
      flex
      flex-col
      gap-4
      mb-12
    >
      <n-list-item
        v-for="user in users"
        :key="user.id"
      >
        <div
          flex
          flex-col
          gap-1
        >
          <span text="green-400 xs" font="bold">@{{ user.username }}</span>
          {{ user.name }}
        </div>
      </n-list-item>
    </n-list>
  </div>
</template>
