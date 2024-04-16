import Link from "next/link";
import Image from "next/image";
import { NavLinks } from "./navlinks";


export function Navbar() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <div>
        <Link
          className="rounded-md p-4"
          href="/"
        >
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Sentify
          </h1>
        </Link>
        <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
          <NavLinks />
        </div>
      </div>
    </div>
  )
}