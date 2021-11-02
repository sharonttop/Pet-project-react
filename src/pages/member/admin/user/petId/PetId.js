import React, { useState, useEffect } from 'react'
import conf, {
  IMG_PATH,
  UPLOAD_AVATAR,
  // JWT_GET_DATA,
} from '../../../config'

import axios from 'axios'
import petIdRemoveMark from '../../../images/petIdRemoveMark80x80.svg'
import petIdAddMark from '../../../images/petIdAddMark80x80.svg'

import './PetId.scss'

function PetId(props) {
  console.log({ conf })
  const [inputList, setInputList] = useState([
    { avatar: '', petName: '', breed: '', petBirthday: '' },
  ])
  //上傳照片
  const [petImgSrc, setPetImgSrc] = useState('')
  //下拉選單:汪喵
  const [selectedOption, setSelectedOption] = useState('')

  const handleChange = (e, index) => {
    const { name, value } = e.target
    const list = [...inputList]
    list[index][name] = value
    setInputList(list)
  }

  const handleAddInput = () => {
    setInputList([
      ...inputList,
      { avatar: '', petName: '', breed: '', petBirthday: '' },
    ])
  }

  const handleRemoveInput = (index) => {
    const list = [...inputList]
    list.splice(index, 1)
    setInputList(list)
  }

  const doUpload = async () => {
    let myForm = document.querySelector('#avatar')
    const fd = new FormData(myForm)
    const r = await axios.post(UPLOAD_AVATAR, fd)

    console.log(r.data)
    setPetImgSrc(r.data.filename)
    // handleChange(e, i)
  }
  return (
    <>
      {inputList.map((item, i) => {
        return (
          <div className="card petIdCard">
            <div className="petIdBanner">
              <h2>毛孩ID</h2>
            </div>
            <div key={i} className="wrap">
              {/* <input
                type="hidden"
                className="form-control"
                name="avatar"
                value={petImgSrc}
              /> */}
              <form name="form1" style={{ display: 'none' }}>
                <input
                  className="form-control"
                  type="file"
                  id="avatar"
                  name="avatar"
                  accept="image/*"
                  onChange={doUpload}
                />
              </form>
              <form className="petIdForm" name="petId_form">
                <div
                  className="petIdAvatar"
                  onClick={(e) => document.querySelector('#avatar').click()}
                >
                  <img
                    src={
                      petImgSrc
                        ? IMG_PATH + '/' + petImgSrc
                        : IMG_PATH + '/default-avatar.svg'
                    }
                    alt=""
                    id="img01"
                  />
                </div>
                <div>
                  <input
                    type="hidden"
                    className="form-control"
                    name="avatar"
                    value={petImgSrc}
                  />
                </div>

                <div className="petIdForm-group">
                  <label>毛孩名</label>
                  <input
                    className="form-control"
                    type="text"
                    name="petName"
                    placeholder="Pet Name"
                    value={item.petName}
                    onChange={(e) => handleChange(e, i)}
                  />
                </div>
                <div className="petIdForm-group">
                  <label>汪喵</label>
                  <select
                    className="form-control"
                    name="breed"
                    value={selectedOption}
                    onChange={(e) => {
                      setSelectedOption(e.target.value)
                      handleChange(e, i)
                    }}
                  >
                    {/* 第一個值會用state的初始值 */}
                    <option value="">Cat/Dog</option>
                    <option value="貓">貓</option>
                    <option value="狗">狗</option>
                  </select>
                </div>
                <div className="petIdForm-group">
                  <label>毛孩生日</label>
                  <input
                    className="form-control"
                    type="date"
                    name="petBirthday"
                    placeholder="Pet Birthday"
                    value={item.petBirthday}
                    onChange={(e) => handleChange(e, i)}
                  />
                </div>
                {inputList.length !== 1 && (
                  <img
                    className="petIdRemoveMark"
                    src={petIdRemoveMark}
                    alt=""
                    onClick={() => handleRemoveInput(i)}
                  />
                )}
                {inputList.length - 1 === i && (
                  <img
                    className="petIdAddMark"
                    src={petIdAddMark}
                    alt=""
                    onClick={handleAddInput}
                  />
                )}
              </form>
            </div>
          </div>
        )
      })}
      {/* 轉成JSON測試有無收到值 */}
      <pre>{JSON.stringify(inputList, null, 2)}</pre>
    </>
  )
}

export default PetId
