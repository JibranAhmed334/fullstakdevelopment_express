import { useState } from 'react'
import { Link } from 'react-router-dom'

function Navbar({ cartCount = 0, onCartClick, onSearch }) {
  const [searchTerm, setSearchTerm] = useState('')

  function handleSearch(event) {
    event.preventDefault()
    const query = searchTerm.trim()

    if (query) {
      onSearch?.(query)
    }
  }

  const navLinks = (
    <>
      <Link className="text-sm font-medium text-[#31433b] transition-colors hover:text-[#c85c3b]" to="/">
        Shop
      </Link>
      <Link className="text-sm font-medium text-[#31433b] transition-colors hover:text-[#c85c3b]" to="/login">
        Sign in
      </Link>
      <Link className="text-sm font-medium text-[#31433b] transition-colors hover:text-[#c85c3b]" to="/register">
        Create account
      </Link>
    </>
  )

  return (
    <header className="sticky top-0 z-50 border-b border-[#dfe4dc] bg-[#fbfcf8]/95 text-[#20332b] backdrop-blur-md">
      <div className="bg-[#203b32] px-4 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-[#f7f5eb]">
        Thoughtful finds for everyday living
      </div>

      <div className="navbar mx-auto min-h-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="navbar-start gap-3">
          <Link aria-label="Mern Market home" className="flex items-center gap-3" to="/">
            <span className="grid size-11 place-items-center rounded-xl bg-[#df7654] text-lg font-black text-white shadow-sm">
              M
            </span>
            <span className="leading-tight">
              <span className="block text-[15px] font-extrabold uppercase tracking-[0.12em]">Mern Market</span>
              <span className="mt-1 block text-[10px] font-medium uppercase tracking-[0.16em] text-[#718078]">Good things, well found</span>
            </span>
          </Link>
        </div>

        <nav aria-label="Main navigation" className="navbar-center hidden gap-8 lg:flex">
          {navLinks}
        </nav>

        <div className="navbar-end gap-2 sm:gap-3">
          <form aria-label="Product search" className="hidden items-center gap-2 rounded-full border border-[#dfe4dc] bg-white p-1 pl-4 md:flex" onSubmit={handleSearch} role="search">
            <input
              aria-label="Search products"
              className="w-36 bg-transparent text-sm outline-none placeholder:text-[#87928b] lg:w-48"
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Find something..."
              type="search"
              value={searchTerm}
            />
            <button className="btn btn-sm min-h-9 rounded-full border-0 bg-[#203b32] px-4 text-white hover:bg-[#315649]" type="submit">
              Search
            </button>
          </form>

          <button
            aria-label={`Shopping bag, ${cartCount} items`}
            className="btn btn-ghost btn-sm gap-2 rounded-full px-3 text-[#20332b] hover:bg-[#edf0e9]"
            onClick={onCartClick}
            type="button"
          >
            <span aria-hidden="true" className="text-base">Bag</span>
            <span className="badge badge-sm border-0 bg-[#df7654] font-semibold text-white">{cartCount}</span>
          </button>

          <div className="dropdown dropdown-end lg:hidden">
            <button aria-label="Open navigation menu" className="btn btn-ghost btn-square btn-sm rounded-xl" tabIndex={0} type="button">
              <span aria-hidden="true" className="flex w-5 flex-col gap-1">
                <span className="h-0.5 w-full rounded bg-[#20332b]" />
                <span className="h-0.5 w-full rounded bg-[#20332b]" />
                <span className="h-0.5 w-full rounded bg-[#20332b]" />
              </span>
            </button>
            <ul className="menu dropdown-content z-10 mt-3 w-56 rounded-xl border border-[#dfe4dc] bg-[#fbfcf8] p-2 text-[#20332b] shadow-lg">
              <li><Link to="/">Shop</Link></li>
              <li><Link to="/login">Sign in</Link></li>
              <li><Link to="/register">Create account</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
