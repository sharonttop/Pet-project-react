import React, { useState, useEffect } from 'react'
import conf, {
  IMG_PATH,
  UPLOAD_AVATAR,
  REGISTER,
} from '../../config'

import axios from 'axios'
import './SignUp.scss'

function SignUp(props) {
  const {
    fields,
    setFields,
    fieldErrors,
    setFieldErrors,
    imgSrc,
    setImgSrc,
  } = props

  console.log({ conf })

  const [isLoading, setIsLoading] = useState(true)
  // 自動1秒後關閉指示的spinner
  useEffect(() => {
    if (isLoading) {
      setTimeout(() => setIsLoading(false), 1000)
    }
  }, [isLoading])

  //專用元件:地址、地區(還沒做)=================================================
  const doUpload = async () => {
    const fd = new FormData(document.form1)
    const r = await axios.post(UPLOAD_AVATAR, fd)

    console.log(r.data)
    setImgSrc(r.data.filename)
  }
  // 專門用來處理每個欄位的輸入用

  const handleFieldChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    // const type = e.target.type

    // 預設值為輸入值
    let newValue = value

    // 1. 從原本的狀態物件拷貝新物件 / 2. 在拷貝的新物件上處理
    const updatedFields = {
      ...fields,
      [name]: newValue,
    }

    // 3. 設定回原狀態物件
    setFields(updatedFields)
  }

  // 當整個表單有變動時觸發
  // 認定使用者正在輸入有錯誤的欄位
  // 清除某個欄位錯誤訊息
  const handleFormChange = (e) => {
    // 設定錯誤訊息狀態
    const updatedFieldErrors = {
      ...fieldErrors,
      [e.target.name]: '',
    }

    // 3. 設定回原錯誤訊息狀態物件
    setFieldErrors(updatedFieldErrors)
  }

  // 當表單有檢查有不合法出現時觸發
  const handleFormInvalid = (e) => {
    // 阻擋form的預設行為(泡泡訊息)
    e.preventDefault()

    // 設定錯誤訊息狀態
    const updatedFieldErrors = {
      ...fieldErrors,
      [e.target.name]: e.target.validationMessage,
    }

    // 3. 設定回原錯誤訊息狀態物件
    setFieldErrors(updatedFieldErrors)
  }

  // 在 表單完成驗証 之後，才會觸發==========================
  const handleSubmit = async (e) => {
    // 阻擋form的預設送出行為
    e.preventDefault()

    // 利用FormData Api 得到各欄位的值 or 利用狀態值
    // FormData 利用的是表單元素的 name
    const formData = new FormData(e.target)
    console.log(formData.get('name'))
    console.log(formData.get('nickname'))
    console.log(formData.get('email'))
    console.log(formData.get('birthday'))
    console.log(formData.get('mobile'))
    console.log(formData.get('address'))

    // 檢查確認密碼&密碼欄位
    if (
      formData.get('password') !==
      formData.get('confirmPassword')
    ) {
      // 設定錯誤訊息狀態
      const updatedFieldErrors = {
        ...fieldErrors,
        password: '密碼與確認密碼欄位輸入值不相同',
        confirmPassword: '密碼與確認密碼欄位輸入值不相同',
      }

      // 3. 設定回原錯誤訊息狀態物件
      setFieldErrors(updatedFieldErrors)

      // 不送出資料到伺服器
      return
    }

    // ex. 以下用fetch api/axios送到伺服器
    const usp = new URLSearchParams(
      new FormData(document.fake_form)
    )
    // console.log(usp.toString());
    const r = await fetch(REGISTER, {
      method: 'POST',
      body: usp.toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    const data = await r.json()
    console.log(data)
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

  const display = (
    <>
      <div className="card signCard">
        <div className="signUpBanner">
          <h2>註冊</h2>
        </div>
        <div className="wrap">
          <form
            className="signUpForm"
            name="fake_form"
            onSubmit={handleSubmit}
            onChange={handleFormChange}
            onInvalid={handleFormInvalid}
          >
            <div className="info">
              <div className="signUpForm-group">
                <label>姓名</label>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  value={fields.name}
                  onChange={handleFieldChange}
                  placeholder="name"
                  required
                />
                {fieldErrors.name !== '' && (
                  <div className="error">
                    {fieldErrors.name}
                  </div>
                )}
              </div>
              <div className="signUpForm-group">
                <label>暱稱</label>
                <input
                  className="form-control"
                  type="text"
                  name="nickname"
                  value={fields.nickname}
                  onChange={handleFieldChange}
                  placeholder="nickname"
                  required
                />
                {fieldErrors.nickname !== '' && (
                  <div className="error">
                    {fieldErrors.nickname}
                  </div>
                )}
              </div>
              <div className="signUpForm-group">
                <label>Email</label>
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  value={fields.email}
                  onChange={handleFieldChange}
                  placeholder="email"
                  required
                />
                {fieldErrors.email !== '' && (
                  <div className="error">
                    {fieldErrors.email}
                  </div>
                )}
              </div>
              <div className="signUpForm-group">
                <label>密碼</label>
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  value={fields.password}
                  onChange={handleFieldChange}
                  required
                  minLength="5"
                  placeholder="Password"
                />
                {fieldErrors.password !== '' && (
                  <div className="error">
                    {fieldErrors.password}
                  </div>
                )}
              </div>
              <div className="signUpForm-group">
                <label>確認密碼</label>
                <input
                  className="form-control"
                  type="password"
                  name="confirmPassword"
                  value={fields.confirmPassword}
                  onChange={handleFieldChange}
                  required
                  minLength="5"
                  placeholder="confirmPassword"
                />
                {fieldErrors.confirmPassword !== '' && (
                  <div className="error">
                    {fieldErrors.confirmPassword}
                  </div>
                )}
              </div>
              <div className="signUpForm-group">
                <label>生日</label>
                <input
                  className="form-control"
                  type="date"
                  name="birthday"
                  value={fields.birthday}
                  onChange={handleFieldChange}
                  placeholder="brithday"
                />
                <br />
                <label>手機</label>
                <input
                  className="form-control"
                  type="mobile"
                  name="mobile"
                  value={fields.mobile}
                  onChange={handleFieldChange}
                  placeholder="mobile"
                />
              </div>
              <div className="signUpForm-group">
                <label>地址</label>
                <input
                  className="form-control"
                  name="address"
                  value={fields.address}
                  onChange={handleFieldChange}
                  placeholder="address"
                />
              </div>
            </div>
            <div className="full-upload">
              <div className="signUpAvatar">
                <img
                  src={
                    imgSrc
                      ? IMG_PATH + '/' + imgSrc
                      : IMG_PATH + '/default-avatar.svg'
                  }
                  alt=""
                  id="img01"
                />
              </div>
              <button
                type="button"
                className="btn img-upload"
                onClick={(e) =>
                  document.querySelector('#avatar').click()
                }
              >
                上傳照片
              </button>
              <input
                type="hidden"
                className="form-control"
                name="avatar"
                value={imgSrc}
              />
            </div>
            <div className="signUp-group">
              <div className="advertise">
                <img
                  src={IMG_PATH + '/Hostel icon.svg'}
                  alt=""
                />
                <img
                  src={IMG_PATH + '/Cart icon.svg'}
                  alt=""
                />
                <img
                  src={IMG_PATH + '/gift icon.svg'}
                  alt=""
                />
              </div>
              <button
                type="submit"
                className="btn signUpBtn"
              >
                會員註冊
              </button>
            </div>
          </form>
          <form name="form1" style={{ display: 'none' }}>
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/*"
              onChange={doUpload}
            />
          </form>
        </div>
      </div>
    </>
  )

  return <>{isLoading ? loading : display}</>
}

export default SignUp
