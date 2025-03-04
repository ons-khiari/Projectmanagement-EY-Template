"use client";

import { useState, useOptimistic } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import Image from "next/image";
import eylogo from "../public/images/EY-logo.png";

// Submit button with pending state
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded bg-[#ffe500] px-6 py-2 font-medium text-[#2e2e38] hover:bg-[#f5dc00] disabled:opacity-70"
    >
      {pending ? "Signing in..." : "Next"}
    </button>
  );
}

// Login form with React 19 features
export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  // Optimistic UI update using React 19's useOptimistic
  const [optimisticEmail, addOptimisticEmail] = useOptimistic(
    email,
    (state, newEmail: string) => newEmail
  );

  // Form submission using Next.js 15 Server Actions pattern
  async function handleSubmit(formData: FormData) {
    const email = formData.get("email") as string;

    // Optimistic update
    addOptimisticEmail(email);

    try {
      // Simulate authentication process
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, you would validate and authenticate here
      if (!email.includes("@")) {
        setErrorMessage("Please enter a valid email address");
        return;
      }

      // Redirect after successful login
      // router.push('/dashboard');
      console.log("Login successful with email:", email);
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
      console.error("Login error:", error);
    }
  }

  return (
    <div className="w-full max-w-md rounded bg-[#ffffff] p-8 shadow-lg">
      {/* EY Logo */}
      <div className="mb-6 flex items-center">
        <Image src={eylogo} alt="EY Logo" width={100} height={60} />
      </div>

      {/* Sign in heading */}
      <h2 className="mb-6 text-2xl font-medium text-[#2e2e38]">
        Sign in to EY Boards
      </h2>

      {/* Login form */}
      <form action={handleSubmit}>
        <div className="mb-6">
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full border-b border-gray-300 pb-2 pt-1 outline-none focus:border-[#007aff]"
            required
          />
          {errorMessage && (
            <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
          )}
        </div>

        {/* Help text */}
        <div className="mb-8">
          <a href="#" className="text-sm text-[#007aff] hover:underline">
            Can't access your account ?
          </a>
          <br />
          <a href="#" className="text-sm text-[#007aff] hover:underline">
            Sign in with EY account or a security key
          </a>
        </div>

        {/* Next button */}
        <div className="flex justify-end">
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
