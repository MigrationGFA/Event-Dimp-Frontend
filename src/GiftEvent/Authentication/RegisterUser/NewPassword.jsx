import React, { useState } from 'react'; 
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import Logo from "../../../assets/DIMP logo colored.png";
import api from "../../../api/authApis"; 
import { showToast } from '../../../component/ShowToast';
import { LongInputWithPlaceholder } from '../../../component/Inputs';
import { LabelImportant } from '../../../component/Label';
import { ButtonSmallPurple } from '../../../component/Buttons';

// Define validation schema using Yup
const schema = yup.object().shape({
  newPassword: yup
    .string()
    .required('New Password is required')
    .min(8, 'Password must be at least 8 characters long'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const ResetPassword = () => {
  const { email } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for button

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // UseForm with Yup validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Handle form submission and API call
  const onSubmit = async (data) => {
    setLoading(true); // Set loading to true when submission starts

    try {
      // API call to reset the password
      const response = await api.creatorResetPassword({
        email, 
        password: data.newPassword,
      });

      showToast(response.data.message, "success");
      navigate('/auth/login');
    } catch (error) {
      console.error('Error:', error);
      showToast(error.response || 'Password reset failed. Please try again.', "error");
    } finally {
      setLoading(false); // Set loading to false when API call finishes
    }

    reset(); 
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-sec1 font-body">
      <div className="bg-primary1 p-8 rounded-lg shadow-lg w-full text-left max-w-md">
        {/* Logo */}
        <div className="flex mb-8">
          <img
            src={Logo}
            alt="Logo"
            className="w-20"
          />
        </div>

        <h2 className="text-2xl font-bold mb-2">New Password</h2>
        <p className=" text-ter11 mb-6">
          Fill the form to reset your password.
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* New Password */}
          <div className="mb-4 relative">
            <LabelImportant htmlFor="newPassword" className="block mb-1 font-medium">
              New Password
            </LabelImportant>
            <LongInputWithPlaceholder
              type={showPassword ? 'text' : 'password'}
              id="newPassword"
              {...register('newPassword')}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.newPassword
                  ? 'border-ter7 focus:ring-ter7'
                  : 'focus:ring-primary3'
              }`}
              placeholder="Password"
            />
            <span
              className="absolute top-9 right-3 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              <i className={`fas fa-eye${showPassword ? '' : '-slash'}`}></i>
            </span>
            {errors.newPassword && (
              <p className="text-ter7 text-sm mt-1">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-6 relative">
            <LabelImportant htmlFor="confirmPassword" className="block mb-1 font-medium">
              Confirm Password
            </LabelImportant>
            <LongInputWithPlaceholder
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              {...register('confirmPassword')}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.confirmPassword
                  ? 'border-ter7 focus:ring-ter7'
                  : 'focus:ring-primary3'
              }`}
              placeholder="Confirm Password"
            />
            <span
              className="absolute top-9 right-3 cursor-pointer"
              onClick={toggleConfirmPasswordVisibility}
            >
              <i className={`fas fa-eye${showConfirmPassword ? '' : '-slash'}`}></i>
            </span>
            {errors.confirmPassword && (
              <p className="text-ter7 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <ButtonSmallPurple
            type="submit"
            disabled={loading} // Disable button during loading
            className={`w-full text-primary1 font-semibold py-2 rounded-md transition duration-300 ${
              loading ? 'cursor-not-allowed opacity-50' : ''
            }`}
          >
            {loading ? "Resetting Password..." : "Reset Password"} 
          </ButtonSmallPurple>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
