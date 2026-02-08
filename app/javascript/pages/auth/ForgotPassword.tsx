import React from "react";
import { useForm } from "@inertiajs/react";

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
    <div className="min-h-screen flex items-center justify-center p-6 md:p-12 bg-theme-primary">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-3 mb-8 justify-center">
          <img
            className="w-12 h-12"
            src="https://dual-watchlist.s3.eu-north-1.amazonaws.com/logo.png"
            alt="logo"
          />
          <h1 className="text-2xl font-titleFont text-theme-primary">What To Watch</h1>
        </div>

        <div className="bg-theme-secondary rounded-2xl p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-theme-primary mb-2">
            Forgot password?
          </h2>
          <p className="text-theme-secondary mb-6">
            No worries, we'll send you reset instructions.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-theme-primary mb-2">
                Email address
              </label>
              <input
                type="email"
                value={data.email}
                onChange={(e) => setData("email", e.target.value)}
                autoFocus
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg input-theme border border-theme focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all outline-none"
              />
              {errors?.email && (
                <p className="text-red-500 text-sm mt-2">{errors.email[0]}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={processing}
              className="w-full py-3 px-4 bg-brand-primary hover:bg-brand-primary/90 text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {processing ? "Sending..." : "Send reset instructions"}
            </button>
          </form>

          <a
            href="/users/sign_in"
            className="flex items-center justify-center gap-2 text-theme-secondary hover:text-theme-primary mt-6 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to sign in
          </a>
        </div>

        <p className="text-center text-theme-secondary mt-6">
          Don't have an account?{" "}
          <a
            href="/users/sign_up"
            className="text-brand-primary hover:text-brand-accent font-medium transition-colors"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

ForgotPassword.layout = (page: React.ReactNode) => page;
