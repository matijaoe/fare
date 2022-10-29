export type SelectItemProps = {
  label: string
  value: string | number
  disabled?: boolean
}

export type SelectItemDefault = SelectItemProps & Record<string, any>

export type SelectItem<T> = SelectItemProps & T
