import { authenticate } from '@/lib/actions'

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4 animate-fade-in">
            <div className="card w-full max-w-md p-8 shadow-lg">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-primary mb-2">Giriş Yap</h1>
                    <p className="text-muted-foreground">Terapist Gelişim Takip Paneline Hoşgeldiniz</p>
                </div>

                <form action={authenticate} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium block">Email Adresi</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="ornek@email.com"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-sans"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-medium block">Şifre</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-sans"
                        />
                    </div>

                    <button type="submit" className="w-full btn btn-primary py-3">
                        Giriş Yap
                    </button>
                </form>

                <div className="mt-6 text-center text-sm">
                    <p className="text-muted-foreground">Hesabınız yok mu? <a href="/register" className="text-primary hover:underline">Kayıt Ol</a></p>
                </div>
            </div>
        </div>
    )
}
