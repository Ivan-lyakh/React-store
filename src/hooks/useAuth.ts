import { useState } from "react"
import { type Dispatch, type SetStateAction } from "react"

export type Atributes = {
  email: string,
  password: string,
  name: string,
  gender: string
}

export type Action = {
  setEmail: Dispatch<SetStateAction<string>>,
  setPassword: Dispatch<SetStateAction<string>>
  setName: Dispatch<SetStateAction<string>>
  setGender: Dispatch<SetStateAction<string>>
}

export const translateError = (message: string) => {

  const errors: Record<string, string> = {
    "missing email or phone": "Введите email и пароль!",
    "Password should be at least 6 characters.":
      "Пароль должен содержать минимум 6 символов",
    "Invalid login credentials":
      "Неверный email или пароль",
    "User already registered":
      "Пользователь с таким email уже был ранее зарегистрирован!",
    "resolve input!":
      "Заполните все поля!",
    "Signup requires a valid password":
      "Заполните все поля!",
    "Anonymous sign-ins are disabled" : 
      "Заполните все поля!",
    "Unable to validate email address: invalid format":
      "Неккоректный формат email!"
  }

  return errors[message] ?? "Неизвестная ошибка"
}

export const useAuth = () => {

  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')

  const [name, setName] = useState('')

  const [gender, setGender] = useState('')

  const reset = () => {
    setEmail('')
    setPassword('')
    setName('')
    setGender('')
  }

  const atributes = { email, password, name, gender }

  const action = { setEmail, setPassword, setName, setGender }


  return { atributes, action, reset }
}