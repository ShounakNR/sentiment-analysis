'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from 'clsx'

const navItems = [
  {
    name: 'Home',
    route: '/home'
  },
  {
    name: 'History',
    route: '/history',
  }
]


export function NavLinks() {
  const pathName = usePathname()
  const createQueryString = ((name: string, value: string | undefined)=>{
    const params = new URLSearchParams()
    params.set(name, value || '')
    return params.toString()
  })
  return (
    <div className="flex flex-col float-center w-1/2 mt-16 ">
      {navItems.map((link) => {
        const activeClass = clsx(
          {'text-slate-600': pathName === link.route}
        )
        return (
          <Link
            key={link.name}
            href={link.route}
            // as={link.route}
            className={"p-2 text-sm font-medium justify-start text-slate-900"}
          >
            <span className={`hidden md:block font-serif text-m hover:text-slate-400 focus ${activeClass} uppercase`}>{link.name}</span>
          </Link>
        );
      })}
    </div>

  )
}