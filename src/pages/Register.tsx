import { RegisterForm } from "@/components/login/RegisterForm"
import { MedicalIllustration } from "@/components/login/MedicalIllustration"

export function Register() {
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
          </div>

          <RegisterForm />
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
              "Joining ZenCare was the best decision for my family's healthcare management. Everything is in one place and so easy to use."
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-slate-200" />
              <div>
                <p className="text-sm font-semibold text-slate-900">Sarah Jenkins</p>
                <p className="text-xs text-slate-500">Patient</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
