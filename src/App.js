// 使用套件
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import React, { useState } from 'react'

// 頁面用元件
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/login/Login'
import ProductBaby from './pages/ProductBaby'
import ProductMen from './pages/ProductMen'
import ProductWomen from './pages/ProductWomen'
import NotFoundPage from './pages/NotFoundPage'
import ProductCategory from './pages/ProductCategory'
import Member from './pages/member/Member'
import InfoEdit from './pages/member/admin/user/InfoEdit/InfoEdit'
import Student from './pages/Student'
import SignUp from './pages/sign-up/SignUp'

// 組合用元件
import MyNavbar from './components/MyNavbar'
import MyFooter from './components/MyFooter'
import MainContent from './components/MainContent'
import ScrollToTop from './components/ScrollToTop'
//import BreadCrumb from './components/BreadCrumb'
import MultiLevelBreadCrumb from './components/MultiLevelBreadCrumb'

function App() {
  const [auth, setAuth] = useState(false)

  //註冊功能--------------------------------------
  const [fields, setFields] = useState({
    name: '',
    nickname: '',
    email: '',
    password: '',
    confirmPassword: '', // 有可能只是在瀏覽器檢查用而已
    birthday: '',
    mobile: '',
    address: '',
  })
  // 2.存入錯誤訊息用
  const [fieldErrors, setFieldErrors] = useState({
    name: '',
    nickname: '',
    email: '',
    password: '',
    confirmPassword: '', // 有可能只是在瀏覽器檢查用而已
    birthday: '',
    mobile: '',
    address: '',
  })
  //上相片呈現資料資料----------
  const [imgSrc, setImgSrc] = useState('')

  //--------------------------------------------

  return (
    <Router>
      <>
        {/* LOGO+標題+導覽列+上方選單 */}
        <MyNavbar auth={auth} />
        {/* 主內容區 */}
        <MainContent>
          <MultiLevelBreadCrumb />
          {/* 匹配路由表(路徑單一匹配) */}
          {/* 切換顯示的元件畫面放在這下面 */}
          {/* ScrollToTop是為了讓連到另一頁內容時，頁面回到最上方 */}
          <ScrollToTop>
            <Switch>
              <Route path="/student">
                <Student />
              </Route>
              <Route path="/product/women">
                <ProductWomen />
              </Route>
              <Route path="/product/men">
                <ProductMen />
              </Route>
              {/* 這裡要定義網址參數的屬性名稱 */}
              <Route path="/product/baby/:id?">
                <ProductBaby />
              </Route>
              <Route path="/login">
                {/* 利用props傳入頁面元件狀態 */}
                <Login auth={auth} setAuth={setAuth} />
              </Route>
              <Route path="/signup">
                {/* 利用props傳入頁面元件狀態 */}
                <SignUp
                  fields={fields}
                  setFields={setFields}
                  fieldErrors={fieldErrors}
                  setFieldErrors={setFieldErrors}
                  imgSrc={imgSrc}
                  setImgSrc={setImgSrc}
                />
              </Route>
              <Route path="/about">
                <About auth={auth} />
              </Route>
              <Route exact path="/">
                <Home auth={auth} />
              </Route>
              <Route path="/productcategory">
                <ProductCategory />
              </Route>
              {/* <Route path="/admin/user/infoedit">
                <InfoEdit
                  auth={auth}
                  setAuth={setAuth}
                  fields={fields}
                  setFields={setFields}
                  fieldErrors={fieldErrors}
                  setFieldErrors={setFieldErrors}
                  imgSrc={imgSrc}
                  setImgSrc={setImgSrc}
                />
              </Route> */}
              <Route path="/admin/user/:task?">
                <Member
                  auth={auth}
                  setAuth={setAuth}
                  fields={fields}
                  setFields={setFields}
                  fieldErrors={fieldErrors}
                  setFieldErrors={setFieldErrors}
                  imgSrc={imgSrc}
                  setImgSrc={setImgSrc}
                />
              </Route>
              <Route path="/admin">
                <Member auth={auth} setAuth={setAuth} />
              </Route>
              <Route path="*">
                <NotFoundPage />
              </Route>
            </Switch>
            {/* end 匹配路由表 */}
          </ScrollToTop>
        </MainContent>
        {/* 頁尾+版權訊息 */}
        <MyFooter />
      </>
    </Router>
  )
}

export default App
