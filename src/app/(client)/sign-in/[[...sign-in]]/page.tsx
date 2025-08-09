import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Sign In to Your Account | Brancy – Beauty & Self-Care Experts',
  description:
    'Access your Brancy account to manage orders, track deliveries, and enjoy a seamless shopping experience for all your beauty and self-care needs.',
}

export default function SignInPage() {
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
          / &nbsp;<p>Sign In</p>
        </div>
        <div className="my-10 flex items-center justify-center">
            <SignIn />
        </div>
      </section>
    </main>
  );
}
