export function MedicalIllustration() {
  return (
    <div className="relative hidden h-full w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-slate-800 p-10 text-white lg:flex">

      <div className="absolute inset-0 opacity-10">
        <svg
          className="h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
        </svg>
      </div>

      <div className="relative z-10 h-full w-full max-w-lg">

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <div className="h-64 w-64 animate-pulse rounded-full bg-blue-400/20 blur-3xl filter" />
          <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-blue-300/10 blur-2xl filter" />
        </div>

        <div className="absolute left-10 top-1/4 animate-[float_6s_ease-in-out_infinite]">
          <svg
            width="120"
            height="60"
            viewBox="0 0 120 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-blue-200/60"
          >
            <path
              d="M0 30H15L25 5L35 55L45 30H120"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="absolute right-10 top-1/3 animate-[float_8s_ease-in-out_infinite_1s]">
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-blue-100/40"
          >
            <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
            <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
            <circle cx="20" cy="10" r="2" />
          </svg>
        </div>

        <div className="absolute bottom-1/4 left-20 animate-[float_7s_ease-in-out_infinite_2s]">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white/80"
            >
              <path d="M12 6v12" />
              <path d="M6 12h12" />
            </svg>
          </div>
        </div>

        <div className="absolute bottom-1/3 right-20 animate-[float_9s_ease-in-out_infinite_0.5s]">
          <svg
            width="60"
            height="100"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-blue-200/30"
          >
            <path d="M2 15c6.667-6 13.333 0 20-6" />
            <path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993" />
            <path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993" />
            <path d="M17 12a5.702 5.702 0 0 1-.926 4.129" />
            <path d="M7 12a5.716 5.716 0 0 1 .929-4.129" />
            <path d="M2 9c6.667 6 13.333 0 20 6" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 mt-auto max-w-md text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-white">
          Streamlined Clinical Operations
        </h2>
        <p className="text-lg text-blue-100/80">
          Manage patients, appointments, and medical records with our secure,
          next-generation healthcare platform.
        </p>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  )
}
