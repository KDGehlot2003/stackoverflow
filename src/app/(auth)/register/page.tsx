"use client";
import { useAuthStore } from '@/store/auth';
import React from 'react'

const ResgisterPage = () => {

    const {createAccount, login} = useAuthStore();
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState("");

    const handleSumbit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //collect form data
        const formData = new FormData(e.currentTarget);
        const firstname = formData.get('firstname');
        const lastname = formData.get('lastname');
        const email = formData.get('email');
        const password = formData.get('password');

        //validate form data

        if (!firstname || !lastname || !email || !password) {
            setError(() => "All fields are required");
            return
        }

        //call the store

        setIsLoading(() => true);
        setError("");

        const response = await createAccount(
          `${firstname} ${lastname}`,
          email?.toString(),
          password?.toString()
        )

        if (response.error) {
            setError(() => response.error!.message);
        } else {
          const loginResponse = await login(email?.toString(), password?.toString());

          if (loginResponse.error) {
              setError(() => loginResponse.error!.message);
          }
        }
      
        setIsLoading(() => false);

    }

  return (
    <div>ResgisterPage</div>
  )
}

export default ResgisterPage