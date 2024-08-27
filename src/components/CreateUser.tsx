import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

type Common = {
  id: number,
  name: string,
  role: string,
  email: string,
  age: number,
  postCode: string,
  phone: string,
  hobbies: string[],
  url: string,
}

type Student = {
  studyMinutes: number,
  taskCode: number,
  studyLangs: string[],
  score: number,
  availableMentor: string[],
}

type Mentor = {
  experienceDays: number
  useLangs: string[],
  availableStartCode: number,
  availableEndCode: number,
  availableStudent: string[],
}

type All = Common & Partial<Student> & Partial<Mentor>

type Props = {
  userList: All[],
  setUserList: React.Dispatch<React.SetStateAction<All[]>>,
}

type FormData = {
  id: number,
  name: string,
  role: string,
  email: string,
  age: number,
  postCode: string,
  phone: string,
  hobbies: string[],
  url: string,
  studyMinutes: number,
  taskCode: number,
  studyLangs: string[],
  score: number,
  experienceDays: number,
  useLangs: string[],
  availableStartCode: number,
  availableEndCode: number,
}

export const CreateUser = ({userList, setUserList}: Props) => {
  const [formData, setFormData] = useState<FormData>({
    id: userList.length + 1,
    name: '',
    role: '',
    email: '',
    age: 0,
    postCode: '',
    phone: '',
    hobbies: [],
    url: '',
    studyMinutes: 0,
    taskCode: 0,
    studyLangs: [],
    score: 0,
    experienceDays: 0,
    useLangs: [],
    availableStartCode: 0,
    availableEndCode: 0,
  })
  const [selectUser, setSelectUser] = useState<'Student' | 'Mentor' | ''>('')

  const navigate = useNavigate()

  const onChangeSelectUser = (e: any) => {
    setSelectUser(e.target.value)
    setFormData({...formData, role: e.target.value === 'Student' ? 'student' : 'mentor'})
  }

  const onChange = (e: any) => {
    const {name, value} = e.target
    if (name === 'hobbies' || name === 'studyLangs' || name === 'useLangs') {
      setFormData({...formData, [name]: [value]})
    } else {
      setFormData({...formData, [name]: value})
    }
  }

  const onSubmit = (e: any) => {
    e.preventDefault()
    const newUserList: All[] = [...userList, formData]
    setUserList(newUserList)
    navigate('/')
  }

  return (
    <>
      <h2>新規登録</h2>
      <div className='mb-2'>
        <Link to='/'>戻る</Link>
      </div>
      <form onSubmit={onSubmit}>
        <select className="form-select mb-2" aria-label="Default select example" value={selectUser} onChange={onChangeSelectUser}>
          <option value=''>Select User</option>
          <option value="Student">Student</option>
          <option value="Mentor">Mentor</option>
        </select>
        <div className='form-group'>
          {selectUser &&
          <>
            <span>name:</span>
            <input
              className='form-control mb-2'
              type='text'
              name='name'
              value={formData.name}
              onChange={onChange}
              required
            />
            <span>email:</span>
            <input
              className='form-control mb-2'
              type='email'
              name='email'
              value={formData.email}
              onChange={onChange}
              required
            />
            <span>age:</span>
            <input
              className='form-control mb-2'
              type='number'
              name='age'
              value={formData.age}
              onChange={onChange}
              required
            />
            <span>postCode:</span>
            <input
              className='form-control mb-2'
              type='text'
              name='postCode'
              value={formData.postCode}
              onChange={onChange}
              required
            />
            <span>phone:</span>
            <input
              className='form-control mb-2'
              type='text'
              name='phone'
              value={formData.phone}
              onChange={onChange}
              required
            />
            <span>hobbies:</span>
            <input
              className='form-control mb-2'
              type='text'
              name='hobbies'
              value={formData.hobbies}
              onChange={onChange}
              required
            />
            <span>url:</span>
            <input
              className='form-control mb-2'
              type='text'
              name='url'
              value={formData.url}
              onChange={onChange}
              required
            />
          </>}
          {selectUser === 'Student' &&
          <>
            <span>studyMinutes:</span>
            <input
              className='form-control mb-2'
              type='number'
              name='studyMinutes'
              value={formData.studyMinutes}
              onChange={onChange}
              required
            />
            <span>taskCode:</span>
            <input
              className='form-control mb-2'
              type='number'
              name='taskCode'
              value={formData.taskCode}
              onChange={onChange}
              required
            />
            <span>studyLangs:</span>
            <input
              className='form-control mb-2'
              type='text'
              name='studyLangs'
              value={formData.studyLangs}
              onChange={onChange}
              required
            />
            <span>score:</span>
            <input
              className='form-control mb-2'
              type='number'
              name='score'
              value={formData.score}
              onChange={onChange}
              required
            />
          </>}
          {selectUser === 'Mentor' &&
          <>
            <span>experienceDays:</span>
            <input
              className='form-control mb-2'
              type='number'
              name='experienceDays'
              value={formData.experienceDays}
              onChange={onChange}
              required
            />
            <span>useLangs:</span>
            <input
              className='form-control mb-2'
              type='text'
              name='useLangs'
              value={formData.useLangs}
              onChange={onChange}
              required
            />
            <span>availableStartCode:</span>
            <input
              className='form-control mb-2'
              type='number'
              name='availableStartCode'
              value={formData.availableStartCode}
              onChange={onChange}
              required
            />
            <span>availableEndCode:</span>
            <input
              className='form-control mb-2'
              type='number'
              name='availableEndCode'
              value={formData.availableEndCode}
              onChange={onChange}
              required
            />
          </>}
        </div>
        {selectUser &&
          <button className='btn btn-primary' type='submit'>Create User</button>}
      </form>
    </>
  )
}
