import React, { useState } from 'react'

function PetId(props) {
  const [inputList, setInputList] = useState([
    { firstName: 'test', lastName: 'last name' },
  ])

  const handleChange = (e, index) => {
    const { name, value } = e.target
    const list = [...inputList]
    list[index][name] = value
    setInputList(list)
  }

  const handleAddInput = () => {
    setInputList([
      ...inputList,
      { firstName: '', lastName: '' },
    ])
  }

  const handleRemoveInput = (index) => {
    const list = [...inputList]
    list.splice(index, 1)
    setInputList(list)
  }

  return (
    <div className="App">
      {inputList.map((item, i) => {
        return (
          <div key={i} className="box">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="mr10"
              value={item.firstName}
              onChange={(e) => handleChange(e, i)}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="mr10"
              value={item.lastName}
              onChange={(e) => handleChange(e, i)}
            />
            {inputList.length !== 1 && (
              <input
                type="button"
                value="Remove"
                className="mr10"
                onClick={() => handleRemoveInput(i)}
              />
            )}
            {inputList.length - 1 === i && (
              <input
                type="button"
                value="Add"
                onClick={handleAddInput}
              />
            )}
          </div>
        )
      })}

      <pre>{JSON.stringify(inputList, null, 2)}</pre>
    </div>
  )
}

export default PetId
