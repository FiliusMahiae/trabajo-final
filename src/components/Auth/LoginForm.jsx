"use client";  // Indica que este componente debe ejecutarse del lado del cliente (Next.js).

import { useState } from 'react';  // Hook de React para manejar estado local.
import { useRouter } from 'next/navigation';  // Hook de Next.js para realizar redirecciones programáticas.
import { useForm } from "react-hook-form";  // Biblioteca para gestionar formularios con validación.
import Link from 'next/link';

export default function LoginForm() {
  const router = useRouter();  // Para redirigir al usuario a otras rutas.
  const { register, handleSubmit, formState: { errors } } = useForm();  // Configuración del formulario y manejo de errores.
  const [loginError, setLoginError] = useState('');  // Estado para almacenar mensajes de error relacionados con el login.

  // Función que se ejecuta al enviar el formulario.
  const onSubmit = async (data) => {
    try {
      // Realiza una solicitud POST a la API de inicio de sesión.
      const response = await fetch('https://bildy-rpmaya.koyeb.app/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.usuario,  // Envía el correo electrónico ingresado por el usuario.
          password: data.contrasena,  // Envía la contraseña ingresada por el usuario.
        }),
      });

      if (response.ok) {
        // Si la autenticación es exitosa, guarda el token JWT en Cookies.
        const responseData = await response.json();
        const { token } = responseData;
        document.cookie = `jwt=${token}; path=/`;  // Almacena el token en Cookies.
        console.log(document.cookie);
        router.push('/dashboard');  // Redirige al usuario al dashboard.
      } else if (response.status === 404 || response.status === 401) {
        // Muestra un error si el usuario o contraseña no son válidos.
        setLoginError('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      // Manejo de errores en caso de problemas con la conexión o la API.
      console.error('Login failed:', error);
      setLoginError('Error de conexión con el servidor. Por favor, intenta nuevamente más tarde.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">Inicia Sesión</h2>
        
        {/* Mensaje de error si ocurre algún problema con el inicio de sesión */}
        {loginError && (
          <p className="text-red-600 text-center mb-4 bg-red-100 border border-red-500 rounded-md py-4 px-3">
            {loginError}
          </p>
        )}

        {/* Formulario de inicio de sesión */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Campo de correo electrónico */}
          <div className="mb-4 text-gray-900">
            <label htmlFor="usuario" className="block font-medium mb-1">
              Correo Electrónico
            </label>
            <input
              id="usuario"
              type="email"
              {...register('usuario', {
                required: 'El correo electrónico es requerido',
                maxLength: { value: 50, message: 'El correo electrónico debe tener menos de 50 caracteres' },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
            {errors.usuario && (
              <p className="text-red-600 mt-1">{errors.usuario.message}</p>
            )}
          </div>

          {/* Campo de contraseña */}
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

          {/* Botón de inicio de sesión */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Iniciar Sesión
          </button>
        </form>

        {/* Enlace para redirigir a la página de registro */}
        <p className="text-center mt-4 text-gray-900">
          ¿No tienes cuenta?{' '}
          <Link href="/register">
            <span className="text-blue-500">Crea una aquí</span>
          </Link>
        </p>
      </div>
    </div>
  );
}

