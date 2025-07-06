import {
  Navbar,
  Typography,
  Button,
} from "@material-tailwind/react"

export function MyNavbar() {
  return (
    <Navbar
      className="fixed top-0 left-0 z-50 w-full rounded border-hidden border-gray-900/40 
      bg-gradient-to-r from-[#0f0f0f]/80 to-[#1a1a1a]/80 px-8 py-4 backdrop-blur-md shadow-md opacity-70"
    >
      <div className="flex items-center justify-between text-white">
        {/* Logo */}
        <Typography
          as="a"
          href="#"
          className="text-2xl font-bold italic tracking-wide hover:text-slate-500 transition-all duration-200"
        >
          Promptify
        </Typography>

        {/* GitHub icon */}
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/skools-here"
            className="hover:scale-110 transition-transform duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://www.svgrepo.com/show/303615/github-icon-1-logo.svg"
              width={36}
              height={36}
              alt="GitHub"
              className="invert opacity-80 hover:opacity-100"
            />
          </a>

          {/* Login button */}
          <Button
            size="sm"
            color="blue"
            className="rounded-md font-medium text-sm px-4 py-1 shadow-md"
          >
            Login
          </Button>
        </div>
      </div>
    </Navbar>
  )
}
