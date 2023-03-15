export default function Header() {
  return(
    <div>
      <header className="w-screen p-4 bg-teal-100 text-center text-dark-gray-500 bottom-0 border-b-2 border-solid border-y-teal-700">
        <nav>
          <button className="p-1 mt-3 text-white border-4 rounded bg-metal right absolute top-0 right-0 h-10 w-16 mr-4">
              Logout
          </button>
          </nav>
            <p className="text-2xl">Welcome To Your Dashboard</p>
        </header>
    </div>
    )
  }
