import React from "react";
import { useForm } from "@inertiajs/react";
import Text from "../../components/shared/Text";
import Button from "../../components/shared/Button";

interface ForgotPasswordProps {
  errors?: {
    email?: string[];
  };
}

export default function ForgotPassword({ errors }: ForgotPasswordProps) {
  const { data, setData, post, processing } = useForm({
    email: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post("/users/password");
  };

  return (
    <div className="flex justify-center items-center px-2 mt-4 min-h-screen bg-brand-dark">
      <div className="border-white border-2 rounded-lg shadow-md flex flex-col gap-y-2 px-4 py-6 bg-brand-purple max-w-md w-full">
        <Text text="Forgot your password?" type="h2" alignment="left" />
        <p className="text-white mb-4">
          Enter your email address and we'll send you instructions to reset your
          password.
        </p>

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

          <Button
            text={processing ? "Sending..." : "Send reset instructions"}
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
