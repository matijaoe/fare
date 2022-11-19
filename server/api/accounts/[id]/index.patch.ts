import { sendInternalError, useContextUserId } from '~~/server/utils'
import { db } from '~~/lib/db'

export default defineEventHandler(async (event) => {
  const { id } = event.context.params
  const userId = useContextUserId(event)

  const data = await useBody<{ name: string }>(event)

  try {
    const account = await db.moneyAccount.updateMany({
      where: {
        id,
        userId,
      },
      data,
    })

    return account
  } catch (err: unknown) {
    console.error(err)
    sendInternalError(event, err)
  }
})
