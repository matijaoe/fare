import type { CompatibilityEvent, H3Event } from 'h3'
import { StatusCodes, getReasonPhrase } from 'http-status-codes'
import type { Prisma } from '@prisma/client'
import { endOfMonth, isDate, isThisMonth, startOfMonth } from 'date-fns'

export const sendCustomError = (
  event: CompatibilityEvent,
  statusCode: StatusCodes,
  message?: string,
  additionalData?: object,
) => {
  const error = createError({
    statusCode,
    statusMessage: getReasonPhrase(statusCode),
    message,
    data: {
      message,
      ...additionalData,
    },
  })
  sendError(event, error)
}

export const sendInternalError = (
  event: CompatibilityEvent,
  originalError: any,
) => {
  const message = originalError?.meta?.cause ?? originalError?.message
  const statusCode = StatusCodes.INTERNAL_SERVER_ERROR

  const error = createError({
    statusCode,
    statusMessage: getReasonPhrase(statusCode),
    message,
    data: {
      message,
      originalError,
    },
  })

  sendError(event, error)
}

export const setResStatus = (
  { res }: CompatibilityEvent,
  statusCode: StatusCodes,
) => res.statusCode = statusCode

export const readParams = <T>(event: H3Event) => event.context.params as T

export const readUserId = (event: H3Event): string | undefined => event.context?.userId

export const getDateRange = (event: H3Event) => {
  const { month: monthQuery } = getQuery(event) as { month?: string }

  const hasDefinedMonth = !!monthQuery && isDate(new Date(monthQuery))

  const monthAsDate = hasDefinedMonth ? new Date(monthQuery) : null
  const monthStart = monthAsDate ? startOfMonth(monthAsDate) : null
  const monthEnd = monthAsDate ? endOfMonth(monthAsDate) : null

  const isCurrentMonth = monthAsDate ? isThisMonth(monthAsDate) : false

  const prismaRangeQuery: Prisma.DateTimeFilter | undefined = (monthStart && monthEnd)
    ? { gte: monthStart, lte: monthEnd }
    : undefined

  return {
    monthQuery, // 2022-11
    monthAsDate, // Tue Nov 01 2022 01:00:00 GMT+0100 (Central European Standard Time)
    hasDefinedMonth,
    monthStart,
    monthEnd,
    prismaRangeQuery,
    isCurrentMonth,
  }
}
