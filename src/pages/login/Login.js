import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import conf, { LOGIN_JWT } from '../../config'
import './Login.scss'

function Login(props) {
  console.log(props)

  console.log({ conf })

  const { auth, setAuth } = props

  // //驗證有無token
  // const token = localStorage.getItem('token')
  // if (token) {
  //   setAuth(true)
  // }

  const [fields, setFields] = useState({
    email: '',
    password: '',
  })

  // 每個欄位的錯誤訊息
  const [fieldErrors, setFieldErrors] = useState({
    email: '',
    password: '',
  })

  const [isLoading, setIsLoading] = useState(true)
  // 自動1秒後關閉指示的spinner
  useEffect(() => {
    if (isLoading) {
      setTimeout(() => setIsLoading(false), 1000)
    }
  }, [isLoading])

  // 處理每個欄位的變動
  const handleFieldChange = (e) => {
    // 更新輸入欄位的變動
    // 用新輸入的屬性值和原物件作合併
    const updatedFields = {
      ...fields,
      [e.target.name]: e.target.value,
    }

    setFields(updatedFields)
  }

  const login = async () => {
    setIsLoading(true)

    // // 回傳：
    // // 登入成功 -> 有id，回傳的user物件
    // // 登入失敗 -> 沒id，回傳有{message:'XXXX'}
    // UserDataService.login(fields).then((res) => {
    //   // 簡單的驗証
    //   if (res.data.id) {
    //     alert('登入成功！！')
    //     setAuth(true)
    //   } else {
    //     alert('登入失敗')
    //   }
    // })
    const usp = new URLSearchParams(
      new FormData(document.login_form)
    )
    // console.log(usp.toString());
    const r = await fetch(LOGIN_JWT, {
      method: 'POST',
      body: usp.toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    const data = await r.json()
    console.log(data)
    //---------
    if (data.success) {
      setAuth(true)
      localStorage.setItem(
        'member',
        JSON.stringify(data.member)
      )
      //將顧客資料基本資料從前端存到localStorage，注意不要存放敏感性資料，譬如身分證手機等等
      localStorage.setItem('token', data.token)
      //儲存到localStorage

      alert('登入成功')
    } else {
      alert('登入錯誤\n' + (data.error || ''))
    }
  }

  const logout = () => {
    // clean if has line token in localstorage
    localStorage.removeItem('member')
    localStorage.removeItem('token')
    setAuth(false)

    // UserDataService.logout().then((res) => {
    //   console.log(res.data)
    //   if (res.data.message === 'success') {
    //     setAuth(false)
    //   }
    // })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const formdata = new FormData(e.target)

    // 觀查formdata中的填入資料
    console.log('formdata中的填入資料')
    for (let pair of formdata.entries()) {
      console.log(pair)
    }

    // ex. 送到伺服器
    login()
  }

  // 整個表單有任何變動(ex.某個欄位有輸入)
  // 認為使用者正在改有錯誤的欄位
  // 清除某個欄位的錯誤訊息
  const handleFormChange = (e) => {
    console.log('更新欄位: ', e.target.name)

    // 該欄位的錯誤訊息清空
    const updatedFieldErrors = {
      ...fieldErrors,
      [e.target.name]: '',
    }

    setFieldErrors(updatedFieldErrors)
  }

  // 表單有不合法的檢查出現時
  const handleFormInvalid = (e) => {
    // 擋住錯誤訊息預設呈現方式(跳出的訊息泡泡)
    e.preventDefault()

    const updatedFieldErrors = {
      ...fieldErrors,
      [e.target.name]: e.target.validationMessage,
    }

    setFieldErrors(updatedFieldErrors)
  }

  const loading = (
    <>
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </>
  )

  const logoutDisplay = (
    <>
      {' '}
      <button
        type="button"
        onClick={() => {
          logout()
          props.history.push('/')
        }}
        className="btn btn-primary"
      >
        登出
      </button>
    </>
  )

  const loginDisplay = (
    <>
      <div className="card loginCard">
        <div className="loginBanner">
          <h2>登入會員</h2>
        </div>
        <div className="wrap">
          <form
            name="login_form"
            onSubmit={handleSubmit}
            onChange={handleFormChange}
            onInvalid={handleFormInvalid}
          >
            <div className="loginForm-group">
              <label>Email</label>
              <input
                name="email"
                type="email"
                state={fields.email}
                onChange={handleFieldChange}
                error={fieldErrors.email}
                className="form-control"
                placeholder="email"
                required
              />
              {fieldErrors.email !== '' && (
                <div className="error">
                  {fieldErrors.email}
                </div>
              )}
            </div>
            <div className="loginForm-group">
              <label>密碼</label>
              <input
                name="password"
                type="password"
                state={fields.password}
                onChange={handleFieldChange}
                error={fieldErrors.password}
                className="form-control"
                placeholder="Password"
                minLength="5"
                maxLength="8"
                required
              />
              {fieldErrors.password !== '' && (
                <div className="error">
                  {fieldErrors.password}
                </div>
              )}
            </div>
            <button type="submit" className="btn loginBtn">
              會員登入
            </button>
          </form>
        </div>
      </div>
    </>
  )

  return (
    <>
      {isLoading
        ? loading
        : auth
        ? logoutDisplay
        : loginDisplay}
    </>
  )
}

export default withRouter(Login)
