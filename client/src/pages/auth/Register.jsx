import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function Register() {
    const { register } = useAuth()
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(event) {
        event.preventDefault()
        setError('')
        setLoading(true)
        const details = Object.fromEntries(new FormData(event.currentTarget))

        try {
            await register(details)
            navigate('/login', { replace: true, state: { message: 'Account created. Please sign in.' } })
        } catch (requestError) {
            setError(requestError.response?.data?.message || 'Registration failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="grid min-h-screen place-items-center bg-[#f4f6f0] px-4 py-10 text-[#20332b]">
            <form className="w-full max-w-lg space-y-4 rounded-2xl border border-[#dfe4dc] bg-white p-7 shadow-sm sm:p-9" onSubmit={handleSubmit}>
                <div className="mb-5">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#c85c3b]">Mern Market</p>
                    <h1 className="mt-2 text-3xl font-bold">Create account</h1>
                    <p className="mt-2 text-sm text-[#718078]">A few details and you are all set.</p>
                </div>

                {error && <p className="alert alert-error py-2 text-sm">{error}</p>}

                <div className="grid gap-4 sm:grid-cols-2">
                    <label className="form-control gap-1">
                        <span className="label-text font-medium">Name</span>
                        <input autoComplete="name" className="input input-bordered w-full" name="name" required />
                    </label>
                    <label className="form-control gap-1">
                        <span className="label-text font-medium">Email</span>
                        <input autoComplete="email" className="input input-bordered w-full" name="email" required type="email" />
                    </label>
                    <label className="form-control gap-1">
                        <span className="label-text font-medium">Password</span>
                        <input autoComplete="new-password" className="input input-bordered w-full" name="password" required type="password" />
                    </label>
                    <label className="form-control gap-1">
                        <span className="label-text font-medium">Date of birth</span>
                        <input className="input input-bordered w-full" name="dob" required type="date" />
                    </label>
                    <label className="form-control gap-1">
                        <span className="label-text font-medium">Work phone</span>
                        <input autoComplete="tel" className="input input-bordered w-full" name="workphone_no" required type="tel" />
                    </label>
                    <label className="form-control gap-1">
                        <span className="label-text font-medium">Cell phone</span>
                        <input autoComplete="tel" className="input input-bordered w-full" name="cellphone_no" required type="tel" />
                    </label>
                    <label className="form-control gap-1 sm:col-span-2">
                        <span className="label-text font-medium">Address</span>
                        <input autoComplete="street-address" className="input input-bordered w-full" name="address" required />
                    </label>
                </div>

                <button className="btn mt-2 w-full border-0 bg-[#203b32] text-white hover:bg-[#315649]" disabled={loading} type="submit">
                    {loading ? 'Creating account...' : 'Create account'}
                </button>
                <p className="text-center text-sm text-[#718078]">
                    Already registered? <Link className="font-semibold text-[#c85c3b] hover:underline" to="/login">Sign in</Link>
                </p>
            </form>
        </main>
    )
}

export default Register