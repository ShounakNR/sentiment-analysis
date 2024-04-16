'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from 'clsx'
import Dropdown from "./dropdown";

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
      <Dropdown options = {navItems}/>
    </div>

  )
}