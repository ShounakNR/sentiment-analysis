import Link from "next/link";
import Image from "next/image";
import { NavLinks } from "./navlinks";


export function Navbar() {
  return (
    <div className="flex px-3 py-4 md:px-2">
      <div>
        <div className="flex grow justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
          <NavLinks />
        </div>
      </div>
    </div>
  )
}