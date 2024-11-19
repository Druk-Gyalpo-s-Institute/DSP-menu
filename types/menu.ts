export interface MenuItem {
  name: string
  description?: string
  price: number
  options?: string[]
}

export interface MenuCategory {
  category: string
  items: MenuItem[]
}

export interface MenuData {
  menu: MenuCategory[]
}