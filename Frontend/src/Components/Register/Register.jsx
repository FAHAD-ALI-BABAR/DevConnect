import React from 'react'
import {UseauthStore} from "../../stores/auth.js"
const Register = () => {
   const [formData, setFormData] = useState({
    Username: '',
    email: '',
    password: '',
    avatar: null
  });
    const {register,isloading,error}=UseauthStore();
    const handlesubmit=async(e)=>{
      e.preventDefault();
      if(!formData.Username || !formData.email || !formData.password){
        alert("please enter all fields")
        return
      }
      const registeruser=await register(formData);
      if(registeruser.success){
        console.log("registration successfull");
        
      }

    }
  return (
     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">L</span>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <span className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer transition-colors duration-200">
              sign in to existing account
            </span>
          </p>
        </div>
        
        <form onSubmit={handlesubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First name
                </label>
                <input
                  id="Username"
                  name="Username"
                  value={formData.Username}
                  disabled={isloading}
                  type="text"
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition-colors duration-200"
                  placeholder="Username"
                />
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition-colors duration-200"
                  placeholder="Last name"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.value}
                disabled={isloading}
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition-colors duration-200"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                disabled={isloading}
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition-colors duration-200"
                placeholder="Create a password"
              />
            </div>
            
            <div>
               <label htmlFor="avatar">Profile Picture (Optional)</label>
          <input
            id="avatar"
            type="file"
            name="avatar"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isloading}
          />
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="agree-terms"
              name="agree-terms"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-900">
              I agree to the{' '}
              <span className="text-blue-600 hover:text-blue-500 cursor-pointer transition-colors duration-200">
                Terms and Conditions
              </span>
            </label>
          </div>
            {error && (
          <div className="error-message">
            {error}
          </div>
        )}

          <div>
             <button 
          type="submit" 
          disabled={isloading}
          className="submit-btn"
        >
          {isloading ? 'Creating Account...' : 'Register'}
        </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
