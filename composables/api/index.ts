import type { CompatibilityEvent } from 'h3'
import { H3Response } from 'h3'
import { StatusCodes, getReasonPhrase } from 'http-status-codes'

export const useRes = (
  { res }: CompatibilityEvent,
  statusCode: StatusCodes,
  message?: string,
  additionalData?: object,
) => {
  res.statusCode = statusCode
  return {
    message: message ?? getReasonPhrase(statusCode),
    ...additionalData,
  }
}

export const useErrorRes = (
  event: CompatibilityEvent,
  error: any,
  additionalData?: object,
) => {
  const msg = error?.meta?.cause ?? error?.message
  return useRes(
    event,
    StatusCodes.INTERNAL_SERVER_ERROR,
    msg,
    { error, ...additionalData },
  )
}

export const setResStatus = (
  { res }: CompatibilityEvent,
  statusCode: StatusCodes,
) => res.statusCode = statusCode
