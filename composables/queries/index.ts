import type { NitroFetchRequest } from 'nitropack'

export const useInitalData = async <T>(url: NitroFetchRequest) => (await useFetch(url)).data.value as T

export const useFetchedPayload = <T>(key: string) => {
  const app = useNuxtApp()
  return app.payload.data[`$f${key}`] as T | null | undefined
}
