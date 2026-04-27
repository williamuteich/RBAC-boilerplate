import LoginGoogle from "@/src/app/components/login-google";

export default function LoginAdmin() {
    return (
        <form className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-zinc-100">
            <div className="space-y-4 mb-6">
                <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1" htmlFor="email">
                        E-mail
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="teste@teste.com"
                        className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1" htmlFor="password">
                        Senha
                    </label>
                    <input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors"
                    />
                </div>
            </div>

            <button
                type="button"
                className="w-full cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:ring-offset-2"
            >
                Entrar como Admin
            </button>
            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-zinc-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-zinc-500">ou continue com</span>
                </div>
            </div>
            <LoginGoogle />
        </form>
    );
}