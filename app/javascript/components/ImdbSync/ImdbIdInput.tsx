import React, { useState, useCallback } from "react";
import { Link2, AlertCircle, Loader2 } from "lucide-react";

interface ImdbIdInputProps {
  onSync: (imdbUserId: string) => void;
  isLoading: boolean;
  error?: string;
  savedImdbUserId?: string | null;
}

const ImdbIdInput: React.FC<ImdbIdInputProps> = ({
  onSync,
  isLoading,
  error,
  savedImdbUserId,
}) => {
  const [inputValue, setInputValue] = useState(savedImdbUserId || "");

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (inputValue.trim()) {
        onSync(inputValue.trim());
      }
    },
    [inputValue, onSync]
  );

  const extractUserIdPreview = (input: string): string | null => {
    if (!input) return null;
    const match = input.match(/ur\d+/);
    return match ? match[0] : null;
  };

  const userIdPreview = extractUserIdPreview(inputValue);

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="imdb-id"
            className="block text-sm font-medium text-brand-muted mb-2"
          >
            IMDB Profile URL or User ID
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Link2 className="w-5 h-5 text-brand-muted" />
            </div>
            <input
              id="imdb-id"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="https://www.imdb.com/user/ur12345678/ or ur12345678"
              className="w-full pl-10 pr-4 py-3 bg-brand-purple border border-brand-muted/30 rounded-lg text-white placeholder-brand-muted/50 focus:outline-none focus:border-brand-accent"
              disabled={isLoading}
            />
          </div>
          {userIdPreview && (
            <p className="mt-2 text-sm text-brand-muted">
              User ID: <span className="text-brand-accent">{userIdPreview}</span>
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading || !inputValue.trim()}
          className="w-full py-3 px-4 bg-brand-accent hover:bg-brand-accent/90 disabled:bg-brand-muted/30 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Syncing...
            </>
          ) : (
            "Sync Watchlist"
          )}
        </button>
      </form>

      {error && (
        <div className="flex items-center gap-2 text-red-500 bg-red-500/10 border border-red-500/30 rounded-lg p-3">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="bg-brand-purple/50 rounded-lg p-4">
        <h3 className="font-semibold text-white mb-2">How to find your IMDB ID:</h3>
        <ol className="text-brand-muted text-sm space-y-1 list-decimal list-inside">
          <li>Go to your IMDB profile page</li>
          <li>
            Copy the URL (e.g.,{" "}
            <code className="text-brand-accent">
              imdb.com/user/ur12345678
            </code>
            )
          </li>
          <li>Paste it above and click Sync</li>
        </ol>
        <p className="mt-3 text-brand-muted text-sm">
          <strong>Note:</strong> Your IMDB watchlist must be set to public for
          this to work.
        </p>
      </div>
    </div>
  );
};

export default ImdbIdInput;
