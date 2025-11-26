import create from "zustand"
import {devtools} from "zustand/middleware"
import axios from 'axios';
axios.defaults.withCredentials=true
const authStore=(set,get)=>({
    user:null,
    isAuthenticated:false,
    error:false,
    isLoading:false,

    setLoading: (loading)=>set({isLoading:loading}),
    setError:(error)=>set({error}),
    clearError:()=>set({error:null}),

    register: async (userdata)=>{
        try {
            set({isLoading:true,error:null})
            const formdata=new FormData()
            formdata.append('username:', userdata.username)
            formdata.append('email:', userdata.email)
            formdata.append('password:', userdata.password)
            if(userdata.avatar){
                formdata.append('avatar:', userdata.avatar)
            }
             const response = await axios.post('/api/auth/register', formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true
      });
         set({ 
        user: response.data.data,
        isAuthenticated: true,
        isLoading: false,
        error: null 
      });

      return { success: true, user: response.data.data };
            
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.response?.data?.messgae || 'Registration failed';
      
      set({ 
        error: errorMessage, 
        isLoading: false,
        isAuthenticated: false 
      });
      return { success: false, error: errorMessage };
            
        }

    }


})
export const UseauthStore=create(devtools(authStore))