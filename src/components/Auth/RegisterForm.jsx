"use client";  // Indica que este archivo debe ejecutarse en el lado del cliente en lugar del servidor (propio de Next.js).

import { useState } from 'react';  // Importa el hook `useState` de React para gestionar el estado local del componente.
import { useRouter } from 'next/navigation';  // Importa `useRouter` de Next.js para realizar navegaciones programáticas.
import { useForm } from "react-hook-form";  // Importa `useForm` del paquete `react-hook-form` para manejar formularios con validación.
import Link from "next/link";  // Importa el componente `Link` de Next.js para crear enlaces de navegación de forma eficiente.
import getCookie from "@/components/Auth/getCookie";


export default function RegisterPage() {
    //Cambio de páginas
    const router = useRouter(); // Utiliza `router` para navegar programáticamente entre las páginas de la aplicación.

    // Configuración del formulario con validación
    const { register, handleSubmit, formState: { errors } } = useForm();
    // `register` se usa para registrar campos del formulario.
    // `handleSubmit` maneja el envío del formulario.
    // `errors` contiene los errores de validación de los campos.

    // Estado para almacenar mensajes de error relacionados con el registro
    const [registerError, setRegisterError] = useState('');

    // Estado para controlar si el usuario está en el paso de ingreso del código de verificación
    const [isCodeStep, setIsCodeStep] = useState(false);

    // Estado para almacenar temporalmente los datos del registro antes de completar el proceso
    const [registerData, setRegisterData] = useState();

    const onRegisterSubmit = async (data) => {
        try {
            // Enviar una solicitud POST a la API para registrar un nuevo usuario
            const response = await fetch('https://bildy-rpmaya.koyeb.app/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                }),
            });

            const responseData = await response.json();

            // Si la respuesta es exitosa (código 200)
            if (response.status === 200) {
                setIsCodeStep(true);// Avanza al paso de verificación del código.

                // Almacena el token JWT en el almacenamiento local para autenticar al usuario.
                const { token } = responseData;
                document.cookie = `jwt=${token}; path=/`;

                // Guarda temporalmente los datos del registro.
                setRegisterData(data);

                // Si el usuario ya existe (código 409)
            } else if (response.status === 409) {
                setRegisterError('El usuario ya existe. Por favor, intenta con un correo diferente.');
            }

            // Manejo de errores en caso de fallo en la solicitud
        } catch (error) {
            setRegisterError('Error de conexión con el servidor. Por favor, intenta nuevamente más tarde.');
        }
    };

    const sendPersonalData = async () => {
        try {

            // Obtiene el token JWT almacenado en Cookies para autenticación
            const token = getCookie('jwt');

            // Envía una solicitud PUT a la API para actualizar los datos personales del usuario
            const response = await fetch('https://bildy-rpmaya.koyeb.app/api/user/register', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    email: registerData.email, // Correo del usuario (almacenado previamente en el estado)
                    name: registerData.firstName, // Nombre del usuario
                    surnames: registerData.lastName, // Apellidos del usuario
                    nif: registerData.nif // NIF (número de identificación fiscal) del usuario
                }),
            });
        } catch (error) {
            // Maneja errores en caso de fallo en la conexión o en la solicitud
            setRegisterError('Error de conexión con el servidor. Por favor, intenta nuevamente más tarde.');
        }
    }

    const onCodeSubmit = async (data) => {
        try {
            // Obtiene el token JWT almacenado en Cookies para autenticación
            const token = getCookie('jwt');

            // Envía una solicitud PUT a la API para validar el código de verificación
            const response = await fetch('https://bildy-rpmaya.koyeb.app/api/user/validation', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    code: data.code, // El código de verificación ingresado por el usuario
                }),
            });

            // Si la respuesta es exitosa (status 200)
            if (response.ok) {
                sendPersonalData(); // Envía los datos personales del usuario al servidor
                router.push('/dashboard'); // Redirige al usuario a la página del dashboard

                // Si el servidor devuelve un error 500 (código incorrecto)
            } else if (response.status === 500) {
                setRegisterError('Código incorrecto'); // Muestra un mensaje de error al usuario
            }

            // Manejo de errores en caso de fallos en la conexión o en la solicitud
        } catch (error) {
            setRegisterError('Error en el servidor'); // Muestra un mensaje genérico de error
        }
    };



    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">

            {/* Contenedor principal centrado en la pantalla */}
            <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">

                {/* Título dinámico que cambia según el paso actual */}
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
                    {isCodeStep ? 'Introduce el Código de Verificación' : 'Regístrate'}
                </h2>
                {/* Mensaje de error si ocurre algún problema */}
                {registerError && <p className="text-red-600 text-center mb-4 bg-red-100 border border-red-500 rounded-md py-4 px-3">{registerError}</p>}

                {/* Formulario para registrarse */}
                {!isCodeStep ? (
                    <form onSubmit={handleSubmit(onRegisterSubmit)}>
                        {/* Sección de nombre y apellido */}
                        <div className="mb-4 grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="firstName" className="block font-medium mb-1 text-gray-900">
                                    Nombre
                                </label>
                                <input
                                    id="firstName"
                                    type="text"
                                    {...register('firstName', {
                                        required: 'El nombre es requerido',
                                        maxLength: { value: 50, message: 'El nombre debe tener menos de 50 caracteres' }
                                    })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 text-gray-900"
                                />
                                {errors.firstName && (
                                    <p className="text-red-600 mt-1">{errors.firstName.message}</p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block font-medium mb-1 text-gray-900">
                                    Apellido
                                </label>
                                <input
                                    id="lastName"
                                    type="text"
                                    {...register('lastName', {
                                        required: 'El apellido es requerido',
                                        maxLength: { value: 50, message: 'El apellido debe tener menos de 50 caracteres' }
                                    })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 text-gray-900"
                                />
                                {errors.lastName && (
                                    <p className="text-red-600 mt-1">{errors.lastName.message}</p>
                                )}
                            </div>
                        </div>
                        
                        {/* Sección del NIF */}
                        <div>
                            <label htmlFor="nif" className="block font-medium mb-1 text-gray-900">
                                NIF
                            </label>
                            <input
                                id="nif"
                                type="text"
                                {...register('nif', {
                                    required: 'El NIF es requerido',
                                    maxLength: { value: 9, message: 'El NIF debe tener 9 carácteres' },
                                    minLength: { value: 9, message: 'El NIF debe tener 9 carácteres' }
                                })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 text-gray-900"
                            />
                            {errors.nif && (
                                <p className="text-red-600 mt-1">{errors.nif.message}</p>
                            )}
                        </div>

                        {/* Sección del correo electrónico */}
                        <div className="mb-4 text-gray-900">
                            <label htmlFor="email" className="block font-medium mb-1">
                                Correo Electrónico
                            </label>
                            <input
                                id="email"
                                type="email"
                                {...register('email', {
                                    required: 'El correo electrónico es requerido',
                                    maxLength: { value: 50, message: 'El correo electrónico debe tener menos de 50 caracteres' }
                                })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 text-gray-900"
                            />
                            {errors.email && (
                                <p className="text-red-600 mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Sección de la contraseña */}
                        <div className="mb-4 text-gray-900">
                            <label htmlFor="password" className="block font-medium mb-1">
                                Contraseña
                            </label>
                            <input
                                id="password"
                                type="password"
                                {...register('password', {
                                    required: 'La contraseña es obligatoria'
                                })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 text-gray-900"
                            />
                            {errors.password && (
                                <p className="text-red-600 mt-1">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Aceptación de términos y condiciones */}
                        <div className="mb-4 text-gray-900">
                            <label className="flex items-center">
                                <input type="checkbox" {...register('terms', {
                                    required: 'Debes aceptar los términos y condiciones'
                                })} className="h-5 w-5 mr-2 cursor-pointer transition-all bg-white border border-gray-400"
                                />
                                <span className="text-gray-700">Acepto los términos y condiciones</span>
                            </label>
                            {errors.terms && (
                                <p className="text-red-600 mt-1">{errors.terms.message}</p>
                            )}
                        </div>

                        {/* Botón de registro */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200">
                            Registrarse
                        </button>
                    </form>
                ) : (
                    // Formulario para validar el código de verificación
                    <form onSubmit={handleSubmit(onCodeSubmit)}>
                        <p className="text-center mb-4 text-gray-900">Hemos enviado un código de verificación a tu correo electrónico.</p>
                        <input
                            id="code"
                            type="text"
                            {...register('code', {
                                required: 'Código necesario',
                                maxLength: { value: 6, message: 'El código debe ser de 6 carácteres' },
                                minLength: { value: 6, message: 'El apellido debe ser de 6 carácteres' }
                            })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 text-gray-900"
                        />
                        {errors.code && (
                            <p className="text-red-600 text-center my-4 bg-red-100 border border-red-500 rounded-md py-3 px-3">{errors.code.message}</p>
                        )}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 mt-2"
                        >
                            Validar Código
                        </button>
                    </form>
                )}
                
                {/* Enlace para usuarios ya registrados */}
                {!isCodeStep && (
                    <p className="text-center mt-4 text-gray-900">
                        ¿Ya tienes una cuenta? <Link href="/login"><span className='text-blue-500'>Inicia sesión aquí</span></Link>
                    </p>
                )}
            </div>
        </div>
    );
};