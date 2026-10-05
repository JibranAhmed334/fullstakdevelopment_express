import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function Login() {
    const { login } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(event) {
        event.preventDefault()
        setError('')
        setLoading(true)

        try {
            await login(Object.fromEntries(new FormData(event.currentTarget)))
            navigate('/', { replace: true })
        } catch (requestError) {
            setError(requestError.response?.data?.message || 'Login failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="grid min-h-screen place-items-center bg-[#f4f6f0] px-4 py-10 text-[#20332b]">
            <form className="w-full max-w-md space-y-5 rounded-2xl border border-[#dfe4dc] bg-white p-7 shadow-sm sm:p-9" onSubmit={handleSubmit}>
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#c85c3b]">Mern Market</p>
                    <h1 className="mt-2 text-3xl font-bold">Welcome back</h1>
                    <p className="mt-2 text-sm text-[#718078]">Sign in to continue to your account.</p>
                </div>

                {location.state?.message && <p className="alert alert-success py-2 text-sm">{location.state.message}</p>}
                {error && <p className="alert alert-error py-2 text-sm">{error}</p>}

                <label className="form-control w-full gap-1">
                    <span className="label-text font-medium">Email</span>
                    <input autoComplete="email" className="input input-bordered w-full" name="email" placeholder="you@example.com" required type="email" />
                </label>
                <label className="form-control w-full gap-1">
                    <span className="label-text font-medium">Password</span>
                    <input autoComplete="current-password" className="input input-bordered w-full" name="password" placeholder="Your password" required type="password" />
                </label>

                <button className="btn w-full border-0 bg-[#203b32] text-white hover:bg-[#315649]" disabled={loading} type="submit">
                    {loading ? 'Signing in...' : 'Sign in'}
                </button>
                <p className="text-center text-sm text-[#718078]">
                    New here? <Link className="font-semibold text-[#c85c3b] hover:underline" to="/register">Create an account</Link>
                </p>
            </form>
        </main>
    )
}

export default Login