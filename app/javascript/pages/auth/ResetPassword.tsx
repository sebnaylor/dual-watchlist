import React from "react";
import { useForm } from "@inertiajs/react";
import Text from "../../components/shared/Text";
import Button from "../../components/shared/Button";

interface ResetPasswordProps {
  resetPasswordToken: string;
  errors?: {
    password?: string[];
    password_confirmation?: string[];
  };
}

export default function ResetPassword({
  resetPasswordToken,
  errors,
}: ResetPasswordProps) {
  const { data, setData, put, processing } = useForm({
    password: "",
    password_confirmation: "",
    reset_password_token: resetPasswordToken,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put("/users/password");
  };

  return (
    <div className="flex justify-center items-center px-2 mt-4 min-h-screen bg-brand-dark">
      <div className="border-white border-2 rounded-lg shadow-md flex flex-col gap-y-2 px-4 py-6 bg-brand-purple max-w-md w-full">
        <Text text="Change your password" type="h2" alignment="left" />

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-white block mb-1">New password</label>
            <input
              type="password"
              value={data.password}
              onChange={(e) => setData("password", e.target.value)}
              autoFocus
              autoComplete="new-password"
              className="px-2 py-1 w-full text-black"
            />
            {errors?.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password[0]}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="text-white block mb-1">Confirm new password</label>
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
            text={processing ? "Changing password..." : "Change my password"}
            type="primary"
            pressed={false}
            icon={null}
            disabled={processing}
            onClick={() => {}}
          />
        </form>

        <hr className="border-gray-600 my-4" />

        <div className="flex gap-x-4 justify-between items-center">
          <a
            href="/users/sign_in"
            className="text-white bg-brand-primary px-4 py-2 rounded text-center w-1/2"
          >
            Log in
          </a>
          <a
            href="/users/sign_up"
            className="text-white bg-brand-primary px-4 py-2 rounded text-center w-1/2"
          >
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}
