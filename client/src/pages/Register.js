import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import { useRegisterMutation } from '../features/auth/authApi';
const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [errorField, setErrorField] = useState([]);

  const [register, { data, isLoading, isError, error: resError }] =
    useRegisterMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (agreed) {
      if (confirmPassword !== password) {
        setError('password does not match.');
        setErrorField(['confirmPassword']);
      } else {
        register({
          name,
          email,
          mobile,
          password,
        });
      }
    }
  };

  useEffect(() => {
    if (resError) {
      const { errors } = resError.data;
      const keys = Object.keys(errors);
      if (keys?.length > 0) {
        let err = '';
        keys.map((key) => {
          err = err + ' ' + errors[key].msg;
        });
        setError(err);
      }
      setErrorField(keys);
    }
  }, [resError]);

  return (
    <div className="grid place-items-center h-screen bg-[#F9FAFB">
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <Link className=" w-full flex items-center justify-center" to="/">
              <img className=" w-32" src={logo} alt="mralim" />
            </Link>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Create your account
            </h2>
          </div>
          <form
            className="mt-8 space-y-6"
            action="#"
            method="POST"
            onSubmit={handleSubmit}
          >
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="name" className="sr-only">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  value={name}
                  type="Name"
                  autoComplete="Name"
                  required
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-slate-900 focus:border-slate-900 focus:z-10 sm:text-sm ${
                    errorField.includes('name') ? 'bg-red-200' : null
                  }`}
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  value={email}
                  autoComplete="email"
                  required
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-slate-900 focus:border-slate-900 focus:z-10 sm:text-sm ${
                    errorField.includes('email') ? 'bg-red-300' : null
                  }`}
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="mobile" className="sr-only">
                  Mobile Number
                </label>
                <input
                  id="mobile"
                  name="mobile"
                  type="number"
                  value={mobile}
                  autoComplete="mobile"
                  required
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-slate-900 focus:border-slate-900 focus:z-10 sm:text-sm ${
                    errorField.includes('mobile') ? 'bg-red-300' : 300
                  }`}
                  placeholder="Mobile Number"
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  autoComplete="current-password"
                  required
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-slate-900 focus:border-slate-900 focus:z-10 sm:text-sm ${
                    errorField.includes('password') ? 'bg-red-300' : null
                  }`}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="sr-only">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  autoComplete="current-confirmPassword"
                  required
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-slate-900 focus:border-slate-900 focus:z-10 sm:text-sm ${
                    errorField.includes('confirmPassword') ? 'bg-red-300' : null
                  }`}
                  placeholder="confirmPassword"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="agree"
                  name="agree"
                  type="checkbox"
                  className="h-4 w-4 text-slate-900 focus:ring-slate-900 border-gray-300 rounded"
                  checked={agreed}
                  required
                  onChange={(e) => setAgreed(e.target.checked)}
                />
                <label
                  htmlFor="accept-terms"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Agreed with the terms and condition
                </label>
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-slate-900 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                Sign up
              </button>
            </div>
            {error !== '' && <h2 className="text-red-500">{error}</h2>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
