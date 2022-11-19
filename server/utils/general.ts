import type { CompatibilityEvent, H3Event } from 'h3'
import { StatusCodes, getReasonPhrase } from 'http-status-codes'

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

// TODO: create global server routes error interceptors
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
