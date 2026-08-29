import { LoginForm } from "@/components/login/LoginForm"
import { MedicalIllustration } from "@/components/login/MedicalIllustration"

export function Login() {
  return (
    <div className="flex min-h-screen">

      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="mb-8">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
                <span className="text-xl font-bold text-white">ZC</span>
              </div>
              <h1 className="text-2xl font-bold text-slate-900">ZenCare</h1>
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-slate-900">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Please sign in to your account to continue
            </p>
          </div>

          <LoginForm />
        </div>
      </div>

      <div className="relative hidden flex-1 lg:block">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-indigo-600/10" />
        <div className="flex h-full items-center justify-center p-12">
          <MedicalIllustration />
        </div>

        <div className="absolute bottom-12 left-12 right-12">
          <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-md border border-white/20">
            <p className="text-lg font-medium text-slate-800">
              "ZenCare has completely transformed how we manage our clinic. The interface is intuitive and the features are exactly what we need."
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-slate-200" />
              <div>
                <p className="text-sm font-semibold text-slate-900">Dr. Sarah Mitchell</p>
                <p className="text-xs text-slate-500">Chief Medical Officer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
