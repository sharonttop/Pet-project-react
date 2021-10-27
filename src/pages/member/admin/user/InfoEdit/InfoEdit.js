import React, { useState, useEffect } from 'react'
import {
  Link,
  withRouter,
  Redirect,
} from 'react-router-dom'
import conf, {
  IMG_PATH,
  UPLOAD_AVATAR,
  SIGN_UP,
} from '../../../../../config'
import dayjs from 'dayjs'

import axios from 'axios'
import './InfoEdit.scss'

function InfoEdit() {
  //編輯功能--------------------------------------
  const [editFields, setEditFields] = useState({
    name: '',
    nickname: '',
    email: '',
    birthday: '',
    mobile: '',
    address: '',
  })
  // 2.存入錯誤訊息用
  const [editFieldsErrors, setEditFieldsErrors] = useState({
    name: '',
    nickname: '',
    email: '',
    birthday: '',
    mobile: '',
    address: '',
  })
  //上相片呈現資料資料----------
  const [editImgSrc, setEditImgSrc] = useState('')

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
      setEditFields(obj)
      setEditImgSrc(obj.avatar)
    })()
  }, [])

  //專用元件:地址、地區(還沒做)=================================================
  const doUpload = async () => {
    const fd = new FormData(document.form1)
    const r = await axios.post(UPLOAD_AVATAR, fd)

    console.log(r.data)
    setEditImgSrc(r.data.filename)
  }
  // 專門用來處理每個欄位的輸入用

  const doCancel = async (e) => {
    e.preventDefault()
  }

  const handleFieldChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    // const type = e.target.type

    // 預設值為輸入值
    let newValue = value

    // 1. 從原本的狀態物件拷貝新物件 / 2. 在拷貝的新物件上處理
    const updatedFields = {
      ...editFields,
      [name]: newValue,
    }

    // 3. 設定回原狀態物件
    setEditFields(updatedFields)
  }

  // 當整個表單有變動時觸發
  // 認定使用者正在輸入有錯誤的欄位
  // 清除某個欄位錯誤訊息
  const handleFormChange = (e) => {
    // 設定錯誤訊息狀態
    const updatedFieldErrors = {
      ...editFieldsErrors,
      [e.target.name]: '',
    }

    // 3. 設定回原錯誤訊息狀態物件
    setEditFieldsErrors(updatedFieldErrors)
  }

  // 當表單有檢查有不合法出現時觸發
  const handleFormInvalid = (e) => {
    // 阻擋form的預設行為(泡泡訊息)
    e.preventDefault()

    // 設定錯誤訊息狀態
    const updatedFieldErrors = {
      ...editFieldsErrors,
      [e.target.name]: e.target.validationMessage,
    }

    // 3. 設定回原錯誤訊息狀態物件
    setEditFieldsErrors(updatedFieldErrors)
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
      <div className="card infoEditCard">
        <div className="infoEditBanner">
          <h2>個人資料</h2>
        </div>
        <div className="infoEditWrap">
          <form
            className="infoEditForm"
            name="edit_form"
            onSubmit={handleSubmit}
            onChange={handleFormChange}
            onInvalid={handleFormInvalid}
          >
            <div className="infoEditInfo">
              <div className="infoEditForm-group">
                <label>姓名</label>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  value={editFields.name}
                  onChange={handleFieldChange}
                  placeholder="name"
                  required
                />
                {editFieldsErrors.name !== '' && (
                  <div className="error">
                    {editFieldsErrors.name}
                  </div>
                )}
              </div>
              <div className="infoEditForm-group">
                <label>暱稱</label>
                <input
                  className="form-control"
                  type="text"
                  name="nickname"
                  value={editFields.nickname}
                  onChange={handleFieldChange}
                  placeholder="nickname"
                  required
                />
                {editFieldsErrors.nickname !== '' && (
                  <div className="error">
                    {editFieldsErrors.nickname}
                  </div>
                )}
              </div>
              <div className="infoEditForm-group">
                <label>Email</label>
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  value={editFields.email}
                  onChange={handleFieldChange}
                  placeholder="email"
                  style={{ backgroundColor: 'lightgray' }}
                  readOnly
                />
                {editFieldsErrors.email !== '' && (
                  <div className="error">
                    {editFieldsErrors.email}
                  </div>
                )}
              </div>

              <div className="infoEditForm-group">
                <label>生日</label>
                <input
                  className="form-control"
                  type="date"
                  name="birthday"
                  value={dayjs(editFields.birthday).format(
                    'YYYY-MM-DD'
                  )}
                  onChange={handleFieldChange}
                  placeholder="brithday"
                />
                <br />
                <label>手機</label>
                <input
                  className="form-control"
                  type="mobile"
                  name="mobile"
                  value={editFields.mobile}
                  onChange={handleFieldChange}
                  placeholder="mobile"
                />
              </div>
              <div className="infoEditForm-group">
                <label>地址</label>
                <input
                  className="form-control"
                  name="address"
                  value={editFields.address}
                  onChange={handleFieldChange}
                  placeholder="address"
                />
              </div>
            </div>
            <div className="infoEditFull-upload">
              <div className="infoEditAvatar">
                <img
                  src={
                    editImgSrc
                      ? IMG_PATH + '/' + editImgSrc
                      : IMG_PATH + '/default-avatar.svg'
                  }
                  alt=""
                  id="img01"
                />
              </div>
              <button
                type="button"
                className="btn infoEditImg-upload"
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
                value={editImgSrc}
              />
            </div>
            <div className="infoEdit-group">
              <div className="infoEditAdvertise">
                <img
                  src={IMG_PATH + '/gift icon.svg'}
                  alt=""
                />
              </div>
              <button
                type="submit"
                className="btn infoEditBtn"
              >
                更新儲存
              </button>
              <button
                type="submit"
                className="btn cancelSubmit"
                onClick={() => {
                  doCancel()
                }}
              >
                放棄編輯
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

export default withRouter(InfoEdit)
