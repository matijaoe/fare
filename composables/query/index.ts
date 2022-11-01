export const useCachedPayload = <T>(key: string) => {
  const app = useNuxtApp()
  return app.payload.data[`$f${key}`] as T | null | undefined
}
