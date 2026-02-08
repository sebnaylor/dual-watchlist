import React, { useState } from "react";
import { useForm } from "@inertiajs/react";

interface EditAccountProps {
  user: {
    email: string;
    firstName: string;
    lastName: string;
    profileImage: string | null;
  };
  errors?: {
    email?: string[];
    current_password?: string[];
    image?: string[];
  };
  csrfToken: string;
}

export default function EditAccount({ user, errors, csrfToken }: EditAccountProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(user.profileImage);

  const { data, setData, put, processing } = useForm({
    email: user.email,
    current_password: "",
    image: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put("/users", {
      forceFormData: true,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setData("image", file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="page-container section-spacing">
      <div className="max-w-xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-theme-primary mb-2">
            Account Settings
          </h1>
          <p className="text-theme-secondary mb-8">
            Update your profile and account details
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-theme-secondary rounded-2xl p-6 md:p-8 space-y-6">
              <h2 className="text-lg font-semibold text-theme-primary">Profile</h2>

              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-white/10 flex-shrink-0">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-brand-purple flex items-center justify-center">
                      <span className="text-xl font-semibold text-white">
                        {user.firstName?.[0]?.toUpperCase()}{user.lastName?.[0]?.toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-theme-primary mb-2">
                    Profile photo
                  </label>
                  <input
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={handleImageChange}
                    className="w-full text-sm text-theme-secondary file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-brand-primary file:text-white hover:file:bg-brand-primary/90 file:cursor-pointer"
                  />
                  <p className="text-theme-muted text-xs mt-1">JPEG or PNG, max 1MB</p>
                  {errors?.image && (
                    <p className="text-red-500 text-sm mt-1">{errors.image[0]}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-theme-primary mb-2">
                    First name
                  </label>
                  <input
                    type="text"
                    value={user.firstName}
                    disabled
                    className="w-full px-4 py-3 rounded-lg input-theme border border-theme opacity-50 cursor-not-allowed outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-theme-primary mb-2">
                    Last name
                  </label>
                  <input
                    type="text"
                    value={user.lastName}
                    disabled
                    className="w-full px-4 py-3 rounded-lg input-theme border border-theme opacity-50 cursor-not-allowed outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="bg-theme-secondary rounded-2xl p-6 md:p-8 space-y-6">
              <h2 className="text-lg font-semibold text-theme-primary">Account</h2>

              <div>
                <label className="block text-sm font-medium text-theme-primary mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => setData("email", e.target.value)}
                  autoComplete="email"
                  className="w-full px-4 py-3 rounded-lg input-theme border border-theme focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all outline-none"
                />
                {errors?.email && (
                  <p className="text-red-500 text-sm mt-2">{errors.email[0]}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-theme-primary mb-2">
                  Current password
                </label>
                <input
                  type="password"
                  value={data.current_password}
                  onChange={(e) => setData("current_password", e.target.value)}
                  autoComplete="current-password"
                  placeholder="Required to save changes"
                  className="w-full px-4 py-3 rounded-lg input-theme border border-theme focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all outline-none"
                />
                {errors?.current_password && (
                  <p className="text-red-500 text-sm mt-2">{errors.current_password[0]}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={processing}
              className="w-full py-3 px-4 bg-brand-primary hover:bg-brand-primary/90 text-white font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {processing ? "Saving..." : "Save changes"}
            </button>
          </form>

          <div className="mt-8 bg-theme-secondary rounded-2xl p-6 md:p-8">
            <h2 className="text-lg font-semibold text-red-500 mb-2">Danger Zone</h2>
            <p className="text-theme-muted text-sm mb-4">
              Once you delete your account, there is no going back.
            </p>
            <form action="/users" method="post">
              <input type="hidden" name="authenticity_token" value={csrfToken} />
              <input type="hidden" name="_method" value="delete" />
              <button
                type="submit"
                onClick={(e) => {
                  if (!window.confirm("Are you sure you want to delete your account? This cannot be undone.")) {
                    e.preventDefault();
                  }
                }}
                className="px-4 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 font-medium rounded-xl transition-all"
              >
                Delete account
              </button>
            </form>
          </div>

          <div className="mt-4 text-center">
            <a
              href="/"
              className="text-theme-muted hover:text-theme-primary transition-colors text-sm"
            >
              Back to home
            </a>
          </div>
      </div>
    </div>
  );
}

