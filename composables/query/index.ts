export const useCachedPayload = <T>(key: string) => {
  const app = useNuxtApp()
  return app.payload.data[key] as T | null | undefined
}
