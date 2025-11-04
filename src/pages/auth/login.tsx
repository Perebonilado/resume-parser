import React from "react";
import { signIn, getProviders, useSession } from "next-auth/react";
import Button from "@/@shared/ui/Button";
import GoogleIcon from "@/icons/GoogleIcon";
import LockIcon from "@/icons/LockIcon";
import ShieldCheckIcon from "@/icons/ShieldCheckIcon";
import PrivacyIcon from "@/icons/PrivacyIcon";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
import Container from "@/@shared/ui/Container";

export default function LoginPage({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-[40%] left-[50%] w-64 h-64 bg-pink-400/10 rounded-full blur-3xl"></div>
      </div>

      <Container>
        <div className="flex flex-col justify-center items-center min-h-screen py-12 relative z-10">
          <div className="w-full max-w-[480px] mx-auto px-4">
            {/* Logo or Brand Section */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg mb-4">
                <LockIcon className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Main Card */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
              <div className="p-8 sm:p-10">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-3">
                    Welcome Back
                  </h1>
                  <p className="text-gray-500 text-base">
                    Sign in to continue to your account
                  </p>
                </div>

                <div className="space-y-4">
                  <Button
                    title="Continue with Google"
                    variant="outlined"
                    size="large"
                    starticon={<GoogleIcon />}
                    type="button"
                    onClick={() => {
                      console.log(Object.values(providers))
                      signIn(Object.values(providers)[0].id)
                    }}
                    className="!w-full !text-gray-700 !font-semibold !py-4 !rounded-xl hover:!bg-gray-50 hover:!border-gray-300 transition-all duration-200 hover:shadow-md"
                  />

                  {/* Divider */}
                  <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-gray-500 font-medium">
                        Secure authentication
                      </span>
                    </div>
                  </div>

                  {/* Security badges */}
                  <div className="flex items-center justify-center gap-6 pt-4">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <ShieldCheckIcon className="w-4 h-4" fill="#10b981" />
                      <span>SSL Secured</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <PrivacyIcon className="w-4 h-4" fill="#3b82f6" />
                      <span>Privacy Protected</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-8 text-sm text-gray-500">
              <p>
                By signing in, you agree to our{" "}
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
