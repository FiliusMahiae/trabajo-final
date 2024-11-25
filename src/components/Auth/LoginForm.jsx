"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import Link from "next/link";

export default function LoginForm(){
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loginError, setLoginError] = useState('');

  const onSubmit = async (data) => {
    try {
      const response = await fetch('https://bildy-rpmaya.koyeb.app/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.usuario,
          password: data.contrasena,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        const { token } = responseData;
        localStorage.setItem('jwt', token);
        router.push('/dashboard');
      } else if (response.status === 404 || response.status === 401) {
        setLoginError('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setLoginError('Error de conexión con el servidor. Por favor, intenta nuevamente más tarde.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">Inicia Sesión</h2>
        {loginError && <p className="text-red-600 text-center mb-4 bg-red-100 border border-red-500 rounded-md py-4 px-3">{loginError}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 text-gray-900">
            <label htmlFor="usuario" className="block font-medium mb-1 te">
              Correo Electrónico
            </label>
            <input
              id="usuario"
              type="email"
              {...register('usuario', { required: 'El correo electrónico es requerido', maxLength: { value: 50, message: 'El correo electrónico debe tener menos de 50 caracteres' } })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
            {errors.usuario && (
              <p className="text-red-600 mt-1">{errors.usuario.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="contrasena" className="block font-medium mb-1 text-gray-900">
              Contraseña
            </label>
            <input
              id="contrasena"
              type="password"
              {...register('contrasena', { required: 'La contraseña es obligatoria' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 text-gray-900"
            />
            {errors.contrasena && (
              <p className="text-red-600 mt-1">{errors.contrasena.message}</p>
            )}
          </div>

          <p className="text-right mb-4 text-gray-900">
            <Link href="/forgot-password">¿Has olvidado tu contraseña? <span className='text-blue-500'>Recupérala aquí</span></Link>
          </p>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Iniciar Sesión
          </button>
        </form>
        <p className="text-center mt-4 text-gray-900">
          No tienes cuenta? <Link href="/register"><span className='text-blue-500'>Crea una aquí</span></Link>
        </p>
      </div>
    </div>
  );
};
