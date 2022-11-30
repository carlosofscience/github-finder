import { createContext, useState, useEffect } from "react"

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({children})=>{
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers()
  }, []);

  const fetchUsers = async ()=>{
    const res = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, {
      headers:{
        Authorization:`token ${process.env.REACT_APP_GITHUB_TOKEN}`
      }
    })

    const data = await res.json()
    setUsers(data)
    setLoading(false)
  }

  return <GithubContext.Provider value={{users, loading, fetchUsers}}>
    {children}
  </GithubContext.Provider>
}

export default GithubContext