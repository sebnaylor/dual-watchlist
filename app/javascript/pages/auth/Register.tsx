import React from "react";
import { useForm } from "@inertiajs/react";
import Text from "../../components/shared/Text";
import Button from "../../components/shared/Button";

interface RegisterProps {
  errors?: {
    email?: string[];
    password?: string[];
    password_confirmation?: string[];
    first_name?: string[];
    last_name?: string[];
  };
  csrfToken: string;
}

export default function Register({ errors, csrfToken }: RegisterProps) {

  const { data, setData, post, processing } = useForm({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password_confirmation: "",
    image: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post("/users", {
      forceFormData: true,
    });
  };

  return (
    <div className="flex justify-center items-center px-2 mt-4 min-h-screen bg-brand-dark">
      <div className="border-white border-2 rounded-lg shadow-md flex flex-col gap-y-2 px-4 py-6 bg-brand-purple max-w-md w-full">
        <Text text="Sign up" type="h2" alignment="left" />

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-white block mb-1">Email</label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => setData("email", e.target.value)}
              autoFocus
              autoComplete="email"
              className="px-2 py-1 w-full text-black"
            />
            {errors?.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>
            )}
          </div>

          <div className="flex gap-x-2 mb-4">
            <div className="w-1/2">
              <label className="text-white block mb-1">First name</label>
              <input
                type="text"
                value={data.first_name}
                onChange={(e) => setData("first_name", e.target.value)}
                autoComplete="given-name"
                className="px-2 py-1 w-full text-black"
              />
              {errors?.first_name && (
                <p className="text-red-500 text-sm mt-1">{errors.first_name[0]}</p>
              )}
            </div>

            <div className="w-1/2">
              <label className="text-white block mb-1">Last name</label>
              <input
                type="text"
                value={data.last_name}
                onChange={(e) => setData("last_name", e.target.value)}
                autoComplete="family-name"
                className="px-2 py-1 w-full text-black"
              />
              {errors?.last_name && (
                <p className="text-red-500 text-sm mt-1">{errors.last_name[0]}</p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="text-white block mb-1">Profile image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setData("image", e.target.files?.[0] || null)}
              className="w-full text-white"
            />
          </div>

          <div className="mb-4">
            <label className="text-white block mb-1">Password</label>
            <input
              type="password"
              value={data.password}
              onChange={(e) => setData("password", e.target.value)}
              autoComplete="new-password"
              className="px-2 py-1 w-full text-black"
            />
            {errors?.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password[0]}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="text-white block mb-1">Confirm password</label>
            <input
              type="password"
              value={data.password_confirmation}
              onChange={(e) => setData("password_confirmation", e.target.value)}
              autoComplete="new-password"
              className="px-2 py-1 w-full text-black"
            />
            {errors?.password_confirmation && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password_confirmation[0]}
              </p>
            )}
          </div>

          <Button
            text={processing ? "Signing up..." : "Sign up"}
            type="primary"
            pressed={false}
            icon={null}
            disabled={processing}
            onClick={() => {}}
          />
        </form>

        <hr className="border-gray-600 my-4" />

        <form action="/users/auth/google_oauth2" method="post">
          <input
            type="hidden"
            name="authenticity_token"
            value={csrfToken}
          />
          <button
            type="submit"
            className="flex items-center justify-center gap-2 w-full bg-white text-gray-800 px-4 py-2 rounded font-medium hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign up with Google
          </button>
        </form>

        <hr className="border-gray-600 my-4" />

        <div className="flex gap-x-4 justify-between items-center">
          <a
            href="/users/sign_in"
            className="text-white bg-brand-primary px-4 py-2 rounded text-center w-1/2"
          >
            Log in
          </a>
          <a href="/users/password/new" className="text-blue-400 underline w-1/2">
            Forgot your password?
          </a>
        </div>
      </div>
    </div>
  );
}
