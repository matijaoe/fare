export type SelectItem = {
  label: string
  value: string | number
  disabled?: boolean
} & Record<string, any>
