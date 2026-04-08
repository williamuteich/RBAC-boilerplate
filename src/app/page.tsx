import Link from "next/link";

export default function Home() {
  return (
    <>
      <section
        id="home"
        className="relative z-10 overflow-hidden bg-white pt-[120px] pb-16 md:pt-[150px] md:pb-[120px] xl:pt-[180px] xl:pb-[160px] dark:bg-gray-dark"
      >
        <div className="container mx-auto max-w-[1400px] px-4">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4 lg:w-1/2">
              <div
                className="wow fadeInUp mx-auto mb-[60px] max-w-[600px] lg:m-0"
                data-wow-delay=".15s"
              >
                <span className="mb-5 inline-block rounded-full bg-[#f1f4ff] py-2 px-6 text-sm font-semibold text-primary">
                  Crafted for App, Software and SaaS Sites
                </span>
                <h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                  A Solução Completa para <span className="text-primary italic">AdControl</span>.
                </h1>
                <p className="mb-12 text-base font-medium leading-relaxed! text-body-color dark:text-body-color-dark sm:text-lg md:text-xl">
                  Gerencie sua operação com eficiência e controle total. O AdControl oferece as ferramentas necessárias para escalar seu negócio com tecnologia de ponta.
                </p>
                <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 lg:justify-start">
                  <Link
                    href="/"
                    className="flex items-center gap-3 rounded-md bg-primary py-4 px-8 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80"
                  >
                    <span>Download Now</span>
                    <span className="h-6 w-px bg-white/20"></span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.1 2.48-1.34.03-1.77-.79-3.29-.79-1.53 0-1.99.77-3.27.82-1.31.05-2.31-1.32-3.14-2.52C4.25 17 2.94 12.45 4.7 9.39c.88-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.89 1.22-2.14 1.08-3.39-1.07.04-2.37.71-3.14 1.6-.69.8-1.29 2.06-1.13 3.28 1.19.09 2.4-.6 3.19-1.49z" /></svg>
                  </Link>
                  <div className="flex items-center gap-4">
                    <Link
                      href="/"
                      className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg text-primary duration-300 ease-in-out hover:bg-primary hover:text-white dark:bg-white/10 dark:text-white dark:hover:bg-primary"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.5 10L6.5 15.1962V4.80385L15.5 10Z" fill="currentColor" />
                      </svg>
                    </Link>
                    <div className="flex flex-col">
                      <span className="text-base font-bold text-black dark:text-white">Watch Demo</span>
                      <span className="text-sm text-body-color dark:text-body-color-dark">See how it works</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full px-4 lg:w-1/2">
              <div
                className="wow fadeInUp relative mx-auto aspect-25/24 max-w-[500px] lg:mr-0"
                data-wow-delay=".2s"
              >
                <div className="relative z-10 mx-auto w-full max-w-[400px]">
                  <div className="relative rounded-3xl border-8 border-gray-800 bg-white shadow-2xl p-4 aspect-9/19">
                    <div className="h-full w-full rounded-2xl bg-gray-100 flex items-center justify-center flex-col gap-4">
                      <div className="w-12 h-12 bg-primary rounded-full"></div>
                      <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
                      <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
                      <div className="w-full mt-4 space-y-2 px-4">
                        <div className="h-20 bg-white rounded-lg shadow-sm"></div>
                        <div className="h-20 bg-white rounded-lg shadow-sm"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-10 -right-10 -z-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl"></div>
                <div className="absolute -bottom-10 -left-10 -z-10 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}