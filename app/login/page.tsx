'use client'
import { lusitana } from '@/app/ui/fonts';
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/app/lib/actions'


export default function LoginPage() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined)
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <form className="space-y-3" action={dispatch}>
          <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
            <h1 className="mb-3 text-2xl text-slate-900">
              Please log in to continue.
            </h1>
            <div className="w-full">
              <div>
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                  htmlFor="email"
                >
                  Email
                </label>
                <div className="relative">
                  <input
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500 text-slate-900"
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
              </div>
              <div className="mt-4">
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500 text-slate-900"
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    required
                    minLength={6}
                  />
                </div>
              </div>
            </div>
            <LoginButton />
            <div
              className="flex h-8 items-end space-x-1"
              aria-live="polite"
              aria-atomic="true"
            >
              {errorMessage && (
                <>
                  <p className="text-sm text-red-500">{errorMessage}</p>
                </>
              )}
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}

function LoginButton() {
  const { pending } = useFormStatus()
  return (
    <button className="mt-4 w-full bg-slate-300 text-slate-900 h-10" aria-disabled={pending}>
      Log in
    </button>
  );
}