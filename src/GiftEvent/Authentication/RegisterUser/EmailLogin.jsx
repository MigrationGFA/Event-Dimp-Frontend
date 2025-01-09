import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Logo from "../../../assets/DIMP logo colored.png";
import { emailLogin } from "../../../features/authentication";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { showToast } from '../../../component/ShowToast';
import { ButtonSmallPurple } from '../../../component/Buttons';


// Create validation schema using Yup
const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Email is required'),
});

const EmailSignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error, user } = useSelector((state) => state.auth);

  // Set up the form with react-hook-form and Yup validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });


 

  // Handle form submission
  const onSubmit = async (data) => {
    console.log(data.email)
    try {
      // Dispatch the login action
      const resultAction = await dispatch(
        
        emailLogin({
          email: data.email,
        })
        
      );

      if (emailLogin.rejected.match(resultAction)) {
        // Login failed, access the payload from the rejected action
        const errorPayload = resultAction.payload || 'Login failed';
        showToast(errorPayload, "error");
      } else if (emailLogin.fulfilled.match(resultAction)) {
        // Login was successful
        showToast(resultAction.payload.message || "Login successful");
        navigate("/creator/dashboard/overview");
      }
    } catch (error) {
      // Handle unexpected errors, such as network issues
      showToast("An unexpected error occurred. Please try again.", "error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-sec1 font-body">
      <div className="bg-primary1 p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="text-center mb-6">
          <img
            src={Logo}
            alt="Dimp Logo"
            className="mx-auto mb-4 h-16"
          />
          <h2 className="text-2xl font-bold text-sec11">Sign In</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-sec11">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              {...register('email')}
              className={`mt-1 p-2 w-full border rounded-md ${
                errors.email ? 'border-ter7' : 'border-sec2'
              } focus:outline-none focus:ring-2 ${
                errors.email ? 'focus:ring-ter7' : 'focus:ring-primary3'
              }`}
            />
            {errors.email && (
              <p className="text-ter7 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="mt-6">
            <ButtonSmallPurple
              type="submit"
              className="w-full py-2 text-primary font-semibold rounded-md"
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </ButtonSmallPurple>
          </div>
        </form>

       
      </div>
    </div>
  );
};

export default EmailSignIn;
