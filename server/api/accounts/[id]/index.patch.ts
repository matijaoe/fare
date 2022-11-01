import { sendInternalError } from '~~/composables/server'
import { db } from '~~/lib/db'

export default defineEventHandler(async (event) => {
  const { id } = event.context.params
  const data = await useBody<{ name: string }>(event)

  try {
    const account = await db.account.update({
      where: { id },
      data,
    })

    return account
  } catch (err: unknown) {
    console.error(err)
    sendInternalError(event, err)
  }
})
