import React from 'react'

function AuthHeader(props) {
  const token = localStorage.getItem('token')

  if (token)
    fetch('', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      }, //設定檔頭，確認Authorization是否有送出Bearer格式的token，'Bearer '一定後面要空一格
    })
      .then((r) => r.json())
      .then((obj) => {
        JSON.stringify(obj, null, 4)
      })

  return <></>
}

export default AuthHeader
