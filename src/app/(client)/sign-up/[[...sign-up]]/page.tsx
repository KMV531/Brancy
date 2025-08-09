import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create Your Account | Brancy – Beauty & Self-Care Experts',
  description:
    'Join Brancy today to explore premium beauty and self-care products. Sign up for a personalized shopping experience, exclusive offers, and the latest updates.',
}

export default function SignUpPage() {
  return (
    <main>
      <section className="relative w-full h-screen overflow-hidden">
        <div className="w-full h-[100px] bg-amber-50 text-gray-800 text-center flex items-center justify-center space-x-4 mt-20">
          <Link
            href={"/"}
            aria-label="Go to home page"
            className="hover:text-orange-600"
          >
            Home
          </Link>{" "}
          / &nbsp;<p>Sign Up</p>
        </div>
        <div className="my-8 flex items-center justify-center">
            <SignUp />
        </div>
      </section>
    </main>
  );
}
