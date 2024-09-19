import CommonForm from '@/components/common/form'
import { loginFormControl } from '@/config'
import { loginUser } from '@/store/slices/auth-slice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast'

const initialState = {
  email: '',
  password: ''
}

const AuthLogin = () => {

  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(loginUser(formData)).then((data)=> {
        if(data.payload?.success) {
          toast({
            title: data.payload?.message
          })
          // navigate('/auth/login')
        } else{
          toast({
            title: data.payload?.message,
            variant: 'destructive'
          })
        }
    })

  }


  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign In
        </h1>
        <p className="mt-2">
          Don't have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>

      <CommonForm
        formControls={loginFormControl}
        buttonText="Sign In"
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthLogin