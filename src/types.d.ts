export type queryFilter = {
  sort_by: string | undefined
  order_by: 'asc' | 'desc' | undefined
  page: number | undefined
  limit: number | undefined
  [x: string]: string | number | undefined
}

export type findOptions = {
  sort?: object
  page?: number
  limit: number
}

export type userAuthType = {
  userIdAuth: string
  roleAuth: string
}
