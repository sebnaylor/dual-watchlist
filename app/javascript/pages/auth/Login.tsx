import React from "react";
import { useForm } from "@inertiajs/react";

interface LoginProps {
  errors?: {
    email?: string[];
    password?: string[];
  };
  csrfToken: string;
}

export default function Login({ errors, csrfToken }: LoginProps) {
  const { data, setData, post, processing } = useForm({
    email: "",
    password: "",
    remember_me: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post("/users/sign_in");
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/90 to-brand-accent/80" />
        <div className="relative z-10 flex flex-col justify-center p-12 xl:p-16">
          <div className="flex items-center gap-4 mb-8">
            <img
              className="w-14 h-14"
              src="https://dual-watchlist.s3.eu-north-1.amazonaws.com/logo.png"
              alt="logo"
            />
            <h1 className="text-3xl font-titleFont text-white">What To Watch</h1>
          </div>
          <h2 className="text-4xl xl:text-5xl font-bold text-white mb-6 leading-tight">
            Track movies together
            <br />
            with your partner
          </h2>
          <p className="text-white/80 text-lg max-w-md">
            Create shared watchlists, see what each other wants to watch, and never argue about what to watch again.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 bg-theme-primary">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <img
              className="w-10 h-10"
              src="https://dual-watchlist.s3.eu-north-1.amazonaws.com/logo.png"
              alt="logo"
            />
            <h1 className="text-xl font-titleFont text-theme-primary">What To Watch</h1>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-theme-primary mb-2">
            Welcome back
          </h2>
          <p className="text-theme-secondary mb-8">
            Sign in to continue to your watchlist
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

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-theme-primary">
                  Password
                </label>
                <a
                  href="/users/password/new"
                  className="text-sm text-brand-primary hover:text-brand-accent transition-colors"
                >
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                value={data.password}
                onChange={(e) => setData("password", e.target.value)}
                autoComplete="current-password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-lg input-theme border border-theme focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all outline-none"
              />
              {errors?.password && (
                <p className="text-red-500 text-sm mt-2">{errors.password[0]}</p>
              )}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                checked={data.remember_me}
                onChange={(e) => setData("remember_me", e.target.checked)}
                className="w-4 h-4 rounded border-theme text-brand-primary focus:ring-brand-primary/20"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-theme-secondary">
                Remember me for 30 days
              </label>
            </div>

            <button
              type="submit"
              disabled={processing}
              className="w-full py-3 px-4 bg-brand-primary hover:bg-brand-primary/90 text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {processing ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-theme" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-theme-primary text-theme-muted">Or continue with</span>
            </div>
          </div>

          <form action="/users/auth/google_oauth2" method="post">
            <input type="hidden" name="authenticity_token" value={csrfToken} />
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-theme-secondary border border-theme rounded-lg font-medium text-theme-primary hover:bg-theme-tertiary transition-all"
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
              Continue with Google
            </button>
          </form>

          <p className="text-center text-theme-secondary mt-8">
            Don't have an account?{" "}
            <a
              href="/users/sign_up"
              className="text-brand-primary hover:text-brand-accent font-medium transition-colors"
            >
              Sign up for free
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

Login.layout = (page: React.ReactNode) => page;
