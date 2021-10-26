import React, { useState, useEffect } from 'react'
import conf, {
  IMG_PATH,
  UPLOAD_AVATAR,
  SIGN_UP,
} from '../../../../config'
import dayjs from 'dayjs'

import axios from 'axios'

function InfoEdit(props) {
  const {
    // auth,
    // setAuth,
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

  //抓取登入客人資料-----------
  const userId = JSON.parse(
    localStorage.getItem('member')
  ).id

  //-------抓客人資料
  useEffect(() => {
    setIsLoading(true)
    ;(async () => {
      const r = await fetch(SIGN_UP + '/' + userId)
      const obj = await r.json()
      setFields(obj)
      setImgSrc(obj.avatar)
    })()
  }, [])

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
    // if (
    //   formData.get('password') !==
    //   formData.get('confirmPassword')
    // ) {
    //   // 設定錯誤訊息狀態
    //   const updatedFieldErrors = {
    //     ...fieldErrors,
    //     password: '密碼與確認密碼欄位輸入值不相同',
    //     confirmPassword: '密碼與確認密碼欄位輸入值不相同',
    //   }

    //   // 3. 設定回原錯誤訊息狀態物件
    //   setFieldErrors(updatedFieldErrors)

    //   // 不送出資料到伺服器
    //   return
    // }

    // ex. 以下用fetch api/axios送到伺服器
    /*    const usp = new URLSearchParams(
      new FormData(document.edit_form)
    )
    // console.log(usp.toString());
    const r = await fetch(INFO_EDIT, {
      method: 'POST',
      body: usp.toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    const data = await r.json()
    console.log(data)
  }
  */
    // ****** 修改 ******
    const usp = new URLSearchParams(
      new FormData(document.edit_form)
    )
    // console.log(usp.toString());
    const r = await fetch(SIGN_UP + '/' + userId, {
      method: 'PUT',
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
      <form
        name="edit_form"
        onSubmit={handleSubmit}
        onChange={handleFormChange}
        onInvalid={handleFormInvalid}
      >
        <img
          src={
            imgSrc
              ? IMG_PATH + '/' + imgSrc
              : IMG_PATH + '/default-avatar.svg'
          }
          alt=""
          width="300px"
          id="img01"
        />
        <br />
        <button
          type="button"
          className="btn btn-success"
          onClick={(e) =>
            document.querySelector('#avatar').click()
          }
        >
          上傳大頭貼
        </button>
        <input
          type="hidden"
          className="form-control"
          name="avatar"
          value={imgSrc}
        />
        <br />
        <label>姓名</label>
        <input
          type="text"
          name="name"
          value={fields.name}
          onChange={handleFieldChange}
          required
        />
        {fieldErrors.name !== '' && (
          <div className="error">{fieldErrors.name}</div>
        )}
        <br />
        <label>暱稱</label>
        <input
          type="text"
          name="nickname"
          value={fields.nickname}
          onChange={handleFieldChange}
          required
        />
        {fieldErrors.nickname !== '' && (
          <div className="error">
            {fieldErrors.nickname}
          </div>
        )}
        <br />
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={fields.email}
          onChange={handleFieldChange}
          style={{ backgroundColor: 'lightgray' }}
          readOnly
        />
        {fieldErrors.email !== '' && (
          <div className="error">{fieldErrors.email}</div>
        )}
        {/* <label>密碼</label>
        <input
          type="password"
          name="password"
          value={fields.password}
          onChange={handleFieldChange}
          required
          minLength="5"
        />
        {fieldErrors.password !== '' && (
          <div className="error">
            {fieldErrors.password}
          </div>
        )}
        <br />
        <label>確認密碼</label>
        <input
          type="password"
          name="confirmPassword"
          value={fields.confirmPassword}
          onChange={handleFieldChange}
          required
          minLength="5"
        />
        {fieldErrors.confirmPassword !== '' && (
          <div className="error">
            {fieldErrors.confirmPassword}
          </div>
        )} */}
        <br />
        <label>生日</label>
        <input
          type="date"
          name="birthday"
          value={dayjs(fields.birthday).format(
            'YYYY-MM-DD'
          )}
          onChange={handleFieldChange}
        />
        <br />
        <label>電話</label>
        <input
          type="mobile"
          name="mobile"
          value={fields.mobile}
          onChange={handleFieldChange}
        />
        <br />
        <label>地址</label>
        <textarea
          name="address"
          value={fields.address}
          onChange={handleFieldChange}
          cols="30"
          rows="3"
        />

        <button type="submit" className="btn btn-primary">
          更新儲存
        </button>
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
    </>
  )

  return (
    <>
      <h1>個人資料</h1>
      <hr />
      {isLoading ? loading : display}
    </>
  )
}

export default InfoEdit
