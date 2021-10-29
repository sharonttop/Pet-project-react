export const debug = true
// 測試開發/營運網址
export const devUrl = 'http://localhost:3000'
export const prodUrl = 'http://www.abc.com'

//-----------------------------------------------------
let config = {}

export const API_HOST = 'http://localhost:3001'

export const CUSTOMERS_LIST =
  API_HOST + '/customers/api/list'
export const UPLOAD_AVATAR = API_HOST + '/try-upload2'
// export const UPLOAD_INFO = API_HOST + '/register'

export const IMG_PATH = API_HOST + '/img'
export const TEST_AVATAR = API_HOST + '/test_avatar'
export const SIGN_UP = API_HOST + '/sign-up'
export const REGISTER = API_HOST + '/register'
export const LOGIN_JWT = API_HOST + '/login-jwt'
export const JWT_GET_DATA = API_HOST + '/get-data-jwt'
export const AUTH_TOKEN = API_HOST + '/auth-token'
export const PASSWORD_CHANGE = API_HOST + '/password-change'

//------是像這種嗎，不建議
export const INFO_EDIT = API_HOST + '/sign-up/:id'

config = {
  API_HOST,
  CUSTOMERS_LIST,
  UPLOAD_AVATAR,
  IMG_PATH,
  TEST_AVATAR,
  SIGN_UP,
  LOGIN_JWT,
  INFO_EDIT,
  JWT_GET_DATA,
  AUTH_TOKEN,
  PASSWORD_CHANGE,
}
export default config
//-----------------------------------------------------

export const pathnameList = [
  '/about',
  '/login',
  '/signup',
  '/admin',
  '/admin/user/order',
  '/admin/user/infoedit',
  '/admin/user/passwordchange',
  '/admin/user/addressedit',
  '/admin/user/petid',
  '/product',
  '/product/baby',
  '/product/baby/birth',
  '/product/men',
  '/product/women',
  '/productcategory',
  '/productcategory/pc',
  '/productcategory/mobile',
  '/productcategory/notebook',
  '/student',
]

export const pathnameTextList = [
  '/關於我們',
  '/會員登入',
  '/會員註冊',
  '/會員專區',
  '/會員專區/訂單管理',
  '/會員專區/個人資料管理',
  '/會員專區/密碼修改',
  '/會員專區/收貨地址',
  '/會員專區/毛孩ID',
  '/產品',
  '/產品/嬰兒',
  '/產品/嬰兒/初生兒',
  '/產品/男性',
  '/產品/女性',
  '/產品分類',
  '/產品分類/電腦PC',
  '/產品分類/手機',
  '/產品分類/筆記型電腦',
  '/學生資料',
]
