import { useNavigate } from "react-router-dom"
import axiosConfig from "../config/axios"
import { useState } from "react"
import { useEffect } from "react"

export default function SecuredPage (){

    const [user, setUser] = useState("")

    const navi = useNavigate()
    const logout = ()=>{
         sessionStorage.removeItem('token')
         navi("/login")
      }
    
      useEffect(()=>{
        const fetchData =()=>{
            try{
                const token = sessionStorage.getItem('token')
                const response = axiosConfig.get("/user/login",{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                })
                response.then((data)=>{
                    console.log(data.data)
                    setUser(data.data)
                })
            }catch(e){
                console.log(e)
            }
        }
        fetchData()
      }, [])
    

    return <div>
        <button onClick={logout}>logout</button>
        <h1>This is authenticated page safe to use</h1>

        <h1>user is: {user.username} </h1>

        
    </div>
}