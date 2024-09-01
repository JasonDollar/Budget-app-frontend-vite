export interface IApiCallState {
  name: string,
  loading: boolean,
  successMessage?: string,
  error?:  {
    message?: string
    errorData?: {
      message?: string
    }
  }
}

export interface IFilter { 
  search: string
  category: string
  dateRangeStart?: Date | string
  dateRangeEnd?: Date | string
  sortBy: 'DATE' | 'AMOUNT'
  sortDirection: 'ASC' | 'DESC'
}

export interface INotification {
  id: string,
  message: string
}

export interface ITheme {
  id: string
  name: string
  mainThemeColor: string
  boxShadow: string 
  textGreyColor: string
  textColor: string
  textColorInverted: string
  textColorWhite: string
  colorDanger: string
  colorAlert: string
  backgroundColor: string
}