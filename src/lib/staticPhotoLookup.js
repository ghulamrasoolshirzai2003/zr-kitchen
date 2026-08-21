import { menu as staticMenu } from '../data/menuData'
import { dishPhotos } from '../data/dishPhotos'

export const staticPhotoByName = {}
export const staticDescByName = {}
export const staticPhotoBySubItem = {}
export const staticDescBySubItem = {}

staticMenu.forEach((cat) => {
  cat.subsections.forEach((sub) => {
    sub.items.forEach((item) => {
      const compoundKey = sub.name + '::' + item.name
      if (item.photo) {
        staticPhotoByName[item.name] = dishPhotos[item.photo] ?? null
        staticPhotoBySubItem[compoundKey] = dishPhotos[item.photo] ?? null
      }
      if (item.description) {
        staticDescByName[item.name] = item.description
        staticDescBySubItem[compoundKey] = item.description
      }
    })
  })
})
