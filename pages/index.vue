<script lang="ts" setup>
import type { Prisma } from '@prisma/client'
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

    <VaButton :rounded="false" outline @click="router.push({ name: 'help' })">
      help
      <i i-carbon-arrow-down block />
    </VaButton>

    <h1>
      Users
    </h1>

    <div space-y-4>
      <h2>Add users</h2>
      <form
        flex
        gap-4
        items-center
        @submit.prevent="onUserCreate"
      >
        <VaInput v-model="userData.name" placeholder="Name" />
        <VaInput v-model="userData.username" placeholder="Username" />
        <VaInput v-model="userData.email" type="email" placeholder="Email" />
        <VaButton flat type="submit" :loading="isAddLoading">
          Add user
        </VaButton>
      </form>
    </div>

    <div v-if="isLoading">
      <p>loading...</p>
    </div>
    <ul
      v-else-if="users?.length"
      flex
      flex-col
      gap-4
      mb-12
    >
      <li
        v-for="user in users"
        :key="user.id"
        flex
        flex-col
        gap-1
      >
        <span text="green-400 xs" font="bold">@{{ user.username }}</span>
        {{ user.name }}
      </li>
    </ul>
  </div>
</template>
