"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import Link from "next/link";

export default function RegisterPage() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [registerError, setRegisterError] = useState('');
    const [isCodeStep, setIsCodeStep] = useState(false);
    const [registerData, setRegisterData] = useState(); 
    const onRegisterSubmit = async (data) => {
        try {
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

            if (response.status === 200) {
                setIsCodeStep(true);
                const { token } = responseData;
                localStorage.setItem('jwt', token);
                setRegisterData(data);
            } else if (response.status === 409) {
                setRegisterError('El usuario ya existe. Por favor, intenta con un correo diferente.');
            }
        } catch (error) {
            console.error('Registration failed:', error);
            setRegisterError('Error de conexión con el servidor. Por favor, intenta nuevamente más tarde.');
        }
    };

    const sendPersonalData = async () => {
        console.log(registerData);
        try {
            const token = localStorage.getItem('jwt');
            const response = await fetch('https://bildy-rpmaya.koyeb.app/api/user/register', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    email: registerData.email,
                    name: registerData.firstName,
                    surnames: registerData.lastName,
                    nif: registerData.nif
                }),
            });

            const responseData = await response.json();

            if (response.status === 200) {
                console.log(responseData);
            }
        } catch (error) {
            console.log('Registration failed:', error);
            setRegisterError('Error de conexión con el servidor. Por favor, intenta nuevamente más tarde.');
        }
    }

    const onCodeSubmit = async (data) => {
        try {
            const token = localStorage.getItem('jwt');
            const response = await fetch('https://bildy-rpmaya.koyeb.app/api/user/validation', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    code: data.code,
                }),
            });

            if (response.ok) {
                sendPersonalData();
                router.push('/dashboard');
            } else if (response.status === 500) {
                setRegisterError('Código incorrecto');
            }
        } catch (error) {
            setRegisterError('Error en el servidor');
        }
    };

    

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
                    {isCodeStep ? 'Introduce el Código de Verificación' : 'Regístrate'}
                </h2>
                {registerError && <p className="text-red-600 text-center mb-4 bg-red-100 border border-red-500 rounded-md py-4 px-3">{registerError}</p>}
                {!isCodeStep ? (
                    <form onSubmit={handleSubmit(onRegisterSubmit)}>
                        <div className="mb-4 grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="firstName" className="block font-medium mb-1 text-gray-900">
                                    Nombre
                                </label>
                                <input
                                    id="firstName"
                                    type="text"
                                    {...register('firstName', { required: 'El nombre es requerido', maxLength: { value: 50, message: 'El nombre debe tener menos de 50 caracteres' } })}
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
                                    {...register('lastName', { required: 'El apellido es requerido', maxLength: { value: 50, message: 'El apellido debe tener menos de 50 caracteres' } })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 text-gray-900"
                                />
                                {errors.lastName && (
                                    <p className="text-red-600 mt-1">{errors.lastName.message}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="nif" className="block font-medium mb-1 text-gray-900">
                                NIF
                            </label>
                            <input
                                id="nif"
                                type="text"
                                {...register('nif', { required: 'El NIF es requerido', maxLength: { value: 9, message: 'El NIF debe tener 9 carácteres' }, minLength: { value: 9, message: 'El NIF debe tener 9 carácteres' } })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 text-gray-900"
                            />
                            {errors.nif && (
                                <p className="text-red-600 mt-1">{errors.nif.message}</p>
                            )}
                        </div>

                        <div className="mb-4 text-gray-900">
                            <label htmlFor="email" className="block font-medium mb-1">
                                Correo Electrónico
                            </label>
                            <input
                                id="email"
                                type="email"
                                {...register('email', { required: 'El correo electrónico es requerido', maxLength: { value: 50, message: 'El correo electrónico debe tener menos de 50 caracteres' } })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 text-gray-900"
                            />
                            {errors.email && (
                                <p className="text-red-600 mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="mb-4 text-gray-900">
                            <label htmlFor="password" className="block font-medium mb-1">
                                Contraseña
                            </label>
                            <input
                                id="password"
                                type="password"
                                {...register('password', { required: 'La contraseña es obligatoria' })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 text-gray-900"
                            />
                            {errors.password && (
                                <p className="text-red-600 mt-1">{errors.password.message}</p>
                            )}
                        </div>

                        <div className="mb-4 text-gray-900">
                            <label className="flex items-center">
                                <input type="checkbox" {...register('terms', { required: 'Debes aceptar los términos y condiciones' })} className="h-5 w-5 mr-2 cursor-pointer transition-all bg-white border border-gray-400"
                                />
                                <span className="text-gray-700">Acepto los términos y condiciones</span>
                            </label>
                            {errors.terms && (
                                <p className="text-red-600 mt-1">{errors.terms.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
                        >
                            Registrarse
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleSubmit(onCodeSubmit)}>
                        <p className="text-center mb-4 text-gray-900">Hemos enviado un código de verificación a tu correo electrónico.</p>
                        <input
                            id="code"
                            type="text"
                            {...register('code', { required: 'Código necesario', maxLength: { value: 6, message: 'El código debe ser de 6 carácteres' }, minLength: { value: 6, message: 'El apellido debe ser de 6 carácteres' } })}
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
                {!isCodeStep && (
                    <p className="text-center mt-4 text-gray-900">
                        ¿Ya tienes una cuenta? <Link href="/login"><span className='text-blue-500'>Inicia sesión aquí</span></Link>
                    </p>
                )}
            </div>
        </div>
    );
};