import { useState } from 'react'
import styles from '../css/Auth.module.css'
import type { ActionUsers } from '../hooks/useUsers';
import { useAuth } from '../hooks/useAuth';
import { type Dispatch, type SetStateAction } from "react"
import { translateError } from '../hooks/useAuth';



type Props = {
  actionUsers: ActionUsers
  setAuthOpen: Dispatch<SetStateAction<boolean>>
}

export const Auth = (props: Props) => {

  const { atributes, action, reset } = useAuth()

  const { email, password, name, gender } = atributes

  const [registerMode, setRegisterMode] = useState(false)

  const [error, setError] = useState<null | string>(null)

  const [hidePassword, setHidePassword] = useState(true)

  const toggleMode = () => {
    setRegisterMode(prev => !prev);
  };


  return (
    <div className={styles.auth}>
      <div className='container'>

        <div>
          <h2 className={styles.title}>{registerMode ? "Регистрация" : "Вход"}</h2>
        </div>

        <div className={styles.body}>

          {error !== null &&
            <div className={styles.column}>
              <h3>{error}</h3>
            </div>
          }





          <div className={styles.bodyForm}>
            <div className={styles.column}>
              <input
                value={atributes.email}
                className={styles.input} type="email"
                placeholder='*email'
                required
                onChange={(e) => action.setEmail(e.target.value)} /> 
            </div>

            <div className={styles.column}>
              <div className={styles.passwordBody}>
                <input
                  value={atributes.password}
                  required
                  className={styles.input}
                  type={hidePassword ? "password" : "text"}
                  placeholder='*password'
                  onChange={(e) => action.setPassword(e.target.value)} />
                <button
                  className={styles.password}
                  onClick={() => {
                    setHidePassword(prev => !prev)
                  }}>
                  {hidePassword ? "🙈" : "🙉"}</button>
              </div>
            </div>

            {registerMode &&
              <div>

                <div className={styles.column}>
                  <input className={styles.input}
                    value={atributes.name}
                    type="text"
                    placeholder='*Введите имя'
                    required
                    onChange={(e) => action.setName(e.target.value)} />
                </div>

                <div className={styles.column}>
                  <div className={styles.orientation}>
                    <h2>Выберите свой пол:</h2>
                    <select value={atributes.gender} required name="orientation" id="orientation"
                      onChange={(e) => action.setGender(e.target.value)}
                    >
                      <option value="">-</option>
                      <option value="men">Мужской</option>
                      <option value="women">Женский</option>
                    </select>
                  </div>
                </div>

              </div>
            }

            <div className={styles.column}>
              {registerMode
                ?

                <button
                  onClick={async () => {

                    setError(null)

                    try {

                      if (!name) {
                        throw new Error("resolve input!")
                      }

                      if (!gender) {
                        throw new Error("resolve input!")
                      }

                      await props.actionUsers.handleRegister(email, password, name, gender)
                      props.setAuthOpen(false)

                    }
                    catch (error) {
                      if (error instanceof Error) {
                        console.log(`ОшибкаRegister: ${error.message}`)
                        setError(translateError(error.message))
                      }
                    }

                  }}
                >Регистрация</button>

                :

                <button
                  onClick={async () => {
                    setError(null)

                    try {

                      await props.actionUsers.handleLogin(email, password)
                      props.setAuthOpen(false)

                    }

                    catch (error) {

                      if (error instanceof Error) {
                        setError(translateError(error.message))
                      }

                    }

                  }}
                >Войти</button>}

            </div>
          </div>



          <div>
            <div className={styles.column}>
              <div className={styles.span}>
                {registerMode
                  ? <h2>Уже есть аккаунт?
                    <span onClick={() => {
                      toggleMode()
                      reset()
                      setError(null)
                    }}> Войти </span>
                  </h2>
                  : <h2>Нет аккаунта?
                    <span onClick={() => {
                      toggleMode()
                      reset()
                      setError(null)
                    }}> Создайте </span> его прямо сейчас! </h2>}
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  )
}