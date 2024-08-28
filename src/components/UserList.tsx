import React, { useState } from 'react'
import { Link } from 'react-router-dom'

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

export const UserList = ({userList, setUserList}: Props) => {
  const [allState, setAllState] = useState<boolean>(true)
  const [studentState, setStudentState] = useState<boolean>(false)
  const [mentorState, setMentorState] = useState<boolean>(false)

  const [studentList, setStudentList] = useState<All[]>(userList.filter((user) => user.role === 'student'))
  const [mentorList, setMentorList] = useState<All[]>(userList.filter((user) => user.role === 'mentor'))
  const [sortOrderStudyMinutes, setSortOrderStudyMinutes] = useState<string>('')
  const [sortOrderScore, setSortOrderScore] = useState<string>('')
  const [sortOrderExperienceDays, setSortOrderExperienceDays] = useState<string>('')
  const [userHobby, setUserHobby] = useState<string>('')

  const onClickAll = () => {
    setAllState(true)
    setStudentState(false)
    setMentorState(false)
    setUserHobby('')
  }

  const onClickStudent = () => {
    setAllState(false)
    setStudentState(true)
    setMentorState(false)

    setUserHobby('')
  }

  const onClickMentor = () => {
    setAllState(false)
    setStudentState(false)
    setMentorState(true)

    setUserHobby('')
  }

  const onClickSortStudyMinutes = () => {
    if (sortOrderStudyMinutes === '') {
      setSortOrderStudyMinutes('asc')
    }
    const sortUserList = [...studentList].sort((a, b) => {
      // nullとundefinedの警告を回避
      if (a.studyMinutes == null) return 1
      if (b.studyMinutes == null) return -1

      if (sortOrderStudyMinutes === 'asc') {
        // 降順 昇順の逆
        return b.studyMinutes - a.studyMinutes
      } else {
        // 昇順 > 0 ならaをbの後に並べる
        return a.studyMinutes - b.studyMinutes
      }
    })
    setStudentList(sortUserList)
    setSortOrderStudyMinutes(sortOrderStudyMinutes === 'asc' ? 'desc' : 'asc')
    setSortOrderScore('')
  }

  const onClickSortScore = () => {
    if (sortOrderScore === '') {
      setSortOrderScore('asc')
    }
    const sortUserList = [...studentList].sort((a, b) => {
      if (a.score == null) return 1
      if (b.score == null) return -1

      if (sortOrderScore === 'asc') {
        return b.score - a.score
      } else {
        return a.score - b.score
      }
    })
    setStudentList(sortUserList)
    setSortOrderScore(sortOrderScore === 'asc' ? 'desc' : 'asc')
    setSortOrderStudyMinutes('')
  }

  const onClickSortExperienceDays = () => {
    if (sortOrderExperienceDays === '') {
      setSortOrderExperienceDays('asc')
    }
    const sortUserList = [...mentorList].sort((a, b) => {
      if (a.experienceDays == null) return 1
      if (b.experienceDays == null) return -1

      if (sortOrderExperienceDays === 'asc') {
        return b.experienceDays - a.experienceDays
      } else {
        return a.experienceDays - b.experienceDays
      }
    })
    setMentorList(sortUserList)
    setSortOrderExperienceDays(sortOrderExperienceDays === 'asc' ? 'desc' : 'asc')
  }

  return (
    <>
      <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
        <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" checked={allState} onChange={onClickAll} />
        <label className="btn btn-outline-primary" htmlFor="btnradio1">全員</label>

        <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" checked={studentState} onChange={onClickStudent} />
        <label className="btn btn-outline-primary" htmlFor="btnradio2">生徒</label>

        <input type="radio" className="btn-check" name="btnradio" id="btnradio3" autoComplete="off" checked={mentorState} onChange={onClickMentor} />
        <label className="btn btn-outline-primary" htmlFor="btnradio3">メンター</label>
      </div>
      <div className="m-2">
        <Link to='/create'>
          新規登録
        </Link>
      </div>
      <div>
        <input
          className='w-100'
          type="text"
          value={userHobby}
          onChange={(e) => setUserHobby(e.target.value)}
        />
      </div>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">名前</th>
              <th scope="col">ロール</th>
              <th scope="col">メールアドレス</th>
              <th scope="col">年齢</th>
              <th scope="col">郵便番号</th>
              <th scope="col">電話番号</th>
              <th scope="col">趣味</th>
              <th scope="col">URL</th>
              {allState && (
                <>
                  <th scope="col">勉強時間</th>
                  <th scope="col">課題番号</th>
                  <th scope="col">勉強中の言語</th>
                  <th scope="col">ハピネススコア</th>
                  <th scope="col">対応可能なメンター</th>
                  <th scope="col">実務経験月数</th>
                  <th scope="col">現場で使っている言語</th>
                  <th scope="col">担当できる課題番号初め</th>
                  <th scope="col">担当できる課題番号終わり</th>
                  <th scope="col">対応可能な生徒</th>
                </>)}
              {studentState && (
                <>
                  <th scope="col" onClick={onClickSortStudyMinutes} style={{ cursor: 'pointer' }}>勉強時間 {sortOrderStudyMinutes === 'asc' ? '▲' : sortOrderStudyMinutes === 'desc' ? '▼' : '-'}</th>
                  <th scope="col">課題番号</th>
                  <th scope="col">勉強中の言語</th>
                  <th scope="col" onClick={onClickSortScore} style={{ cursor: 'pointer' }}>ハピネススコア {sortOrderScore === 'asc' ? '▲' : sortOrderScore === 'desc' ? '▼' : '-'}</th>
                  <th scope="col">対応可能なメンター</th>
                </>)}
              {mentorState && (
                <>
                  <th scope="col" onClick={onClickSortExperienceDays} style={{ cursor: 'pointer' }}>実務経験月数 {sortOrderExperienceDays === 'asc' ? '▲' : sortOrderExperienceDays === 'desc' ? '▼': '-'}</th>
                  <th scope="col">現場で使っている言語</th>
                  <th scope="col">担当できる課題番号初め</th>
                  <th scope="col">担当できる課題番号終わり</th>
                  <th scope="col">対応可能な生徒</th>
                </>)}
            </tr>
          </thead>
          <tbody>
            {allState && (
              userList.filter((user) =>
                user.hobbies.some(hobby => hobby.toLowerCase().includes(userHobby.toLowerCase()))
              )
              .map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.role}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                  <td>{user.postCode}</td>
                  <td>{user.phone}</td>
                  <td>{user.hobbies.join(', ')}</td>
                  <td>{user.url}</td>
                  <td>{user.studyMinutes}</td>
                  <td>{user.taskCode}</td>
                  <td>{user.studyLangs?.join(', ')}</td>
                  <td>{user.score}</td>
                  <td>
                    {userList.filter((mentor) => mentor.role === 'mentor' &&
                      (user.taskCode != null && mentor.availableStartCode != null && mentor.availableEndCode != null) &&
                      user.taskCode >= mentor.availableStartCode &&
                      user.taskCode <= mentor.availableEndCode)
                    .map((mentor) => mentor.name)?.join(', ')}
                  </td>
                  <td>{user.experienceDays}</td>
                  <td>{user.useLangs?.join(', ')}</td>
                  <td>{user.availableStartCode}</td>
                  <td>{user.availableEndCode}</td>
                  <td>
                    {userList.filter((student) => student.role === 'student' &&
                      (student.taskCode != null && user.availableStartCode != null && user.availableEndCode != null) &&
                      student.taskCode >= user.availableStartCode &&
                      student.taskCode <= user.availableEndCode)
                    .map((student) => student.name)?.join(', ')}
                  </td>
                </tr>
              )))}
            {studentState && (
              studentList.filter((user) =>
                user.hobbies.some(hobby => hobby.toLowerCase().includes(userHobby.toLowerCase()))
              )
              .map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.role}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                  <td>{user.postCode}</td>
                  <td>{user.phone}</td>
                  <td>{user.hobbies.join(', ')}</td>
                  <td>{user.url}</td>
                  <td>{user.studyMinutes}</td>
                  <td>{user.taskCode}</td>
                  <td>{user.studyLangs?.join(', ')}</td>
                  <td>{user.score}</td>
                  <td>
                    {userList.filter((mentor) => mentor.role === 'mentor' &&
                      (user.taskCode != null && mentor.availableStartCode != null && mentor.availableEndCode != null) &&
                      user.taskCode >= mentor.availableStartCode &&
                      user.taskCode <= mentor.availableEndCode)
                    .map((mentor) => mentor.name)?.join(', ')}
                  </td>
                </tr>
              )))}
            {mentorState && (
              mentorList.filter((user) =>
                user.hobbies.some(hobby => hobby.toLowerCase().includes(userHobby.toLowerCase()))
              )
              .map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.role}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                  <td>{user.postCode}</td>
                  <td>{user.phone}</td>
                  <td>{user.hobbies.join(', ')}</td>
                  <td>{user.url}</td>
                  <td>{user.experienceDays}</td>
                  <td>{user.useLangs?.join(', ')}</td>
                  <td>{user.availableStartCode}</td>
                  <td>{user.availableEndCode}</td>
                  <td>
                    {userList.filter((student) => student.role === 'student' &&
                      (student.taskCode != null && user.availableStartCode != null && user.availableEndCode != null) &&
                      student.taskCode >= user.availableStartCode &&
                      student.taskCode <= user.availableEndCode)
                    .map((student) => student.name)?.join(', ')}
                  </td>
                </tr>
              )))}
          </tbody>
        </table>
      </div>
    </>
  )
}
