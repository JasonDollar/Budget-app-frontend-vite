// categories: (9) ["home", "health", "food", "leisure", "shop", "restaurant", "clothing", "transport", "gift"]
// createdAt: "2021-03-19T14:41:49.294Z"
// email: "qwe4@qwe.qwe"
// name: "jason"
// settings: {currency: "PLN", locale: "pl-PL"}
// updatedAt: "2021-06-15T17:01:29.985Z"
// __v: 20
// _id: "6054b82d5aaf592eec615eff"

export interface IUserSettings {
  currency: string,
  locale: string
}

export interface IUserData {
  categories?: string[]
  createdAt?: string
  email?: string
  name?: string
  settings: IUserSettings
  updatedAt?: string
  __v?: number
  _id?: string
} 