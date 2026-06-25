import { useDispatch } from "react-redux";
import { supabase } from "../supaBaseClient";
import { resetUsers, setErrorUsers, setUsers } from "../sliceStore/user";
import { useEffect } from "react";
import { getUser } from "../dal/api";
import { resetCart } from "../sliceStore/Cart";


export type ActionUsers = {
  handleLogout: () => Promise<void>,
  handleLogin: (email: string, password: string) => Promise<boolean>,
  handleRegister: (email: string, password: string, name: string, gender: string) => Promise<boolean>
}

export const useUsers = () => {

  const dispatch = useDispatch()

  useEffect(() => {

    async function check() {
      const result = await getUser()

      if (result === null) {
        return
      }

      dispatch(setUsers(result))

    }

    check()

  }, [])


  const handleRegister = async (email: string, password: string, name: string, gender: string) => {

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          name: name,
          gender: gender
        }
      }
    })

    if (error) {
      console.log(`ОшибкаRegister: ${error.message}`)
      throw new Error(error.message)
    }

    dispatch(setUsers(data.user))
    dispatch(setErrorUsers(null))
    return true
  }


  const handleLogin = async (email: string, password: string) => {

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    })

    if (error) {
      console.log(`ОшибкаLogin: ${error.message}`)
      throw new Error(error.message)
    }

    dispatch(setUsers(data.user))
    
    return true
  }

  const handleLogout = async () => {

    const { error } = await supabase.auth.signOut()

    if (error) {
      return console.log(error)
    }

    dispatch(resetUsers())
    dispatch(resetCart())

  }

  const actionUsers = { handleLogout, handleLogin, handleRegister }


  return { actionUsers }
}

