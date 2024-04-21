// // /app/admin/login/page.tsx
// import { headers } from "next/headers";

// const LoginPage = async ({
//   searchParams,
// }: {
//   searchParams: { error?: string };
// }) => {
//   const csrfToken = await fetch(`${process.env.serverURL}/api/auth/csrf`, {
//     headers: headers(),
//   })
//     .then((res) => res.json())
//     .then((csrfTokenObject) => csrfTokenObject?.csrfToken);

//   return (
//     //using TailwindCSS classes btw.
//     <main className="flex flex-col items-center mt-2">
//       <form
//         method="POST"
//         action={`${process.env.serverURL}/api/auth/callback/credentials`}
//         className="flex flex-col group gap-2"
//       >
//         <input
//           className="outline-none focus:border-b border-black"
//           required
//           placeholder="login"
//           name="login"
//         />

//         <input
//           className="outline-none focus:border-b border-black"
//           required
//           placeholder="password"
//           name="password"
//           type="password"
//         />

//         <input hidden value={csrfToken} name="csrfToken" readOnly />

//         <button
//           className="outline-none 
//             focus:underline focus:decoration-red-600 
//             focus:group-valid:decoration-green-600"
//         >
//           submit
//         </button>
//       </form>

//       {searchParams.error && (
//         <p className="text-red-600 text-center capitalize">login failed.</p>
//       )}
//     </main>
//   );
// };

// export default LoginPage;

'use client';


import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/app/actions/auth';
 
export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
 
  return (
    <form action={dispatch} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`mb-3 text-2xl`}>
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
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
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
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
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
  );
}
 
function LoginButton() {
  const { pending } = useFormStatus();
 
  return (
    <button className="mt-4 w-full" aria-disabled={pending}>
      Log in 
    </button>
  );
}