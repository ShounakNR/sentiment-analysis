import { useState } from 'react';
import Link from 'next/link';

const Dropdown = ({ options } : any) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option : any) => {
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <button onClick={toggleDropdown} className="text-slate-900 flex">
        Admin
        {isOpen && (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-chevron-up"><polyline points="18 15 12 9 6 15"></polyline></svg>
        )}
        {!isOpen && (
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
        )}

      </button>
      {isOpen && (
        <div className="dropdown-menu">
          {options.map((option : any) => (
          <Link
            key={option.name}
            href={option.route}
            // as={link.route}
            className={"p-2 text-sm font-medium justify-start text-slate-900"}
          >
            <span className={"sm:block md:block font-serif text-m hover:text-slate-400 focus"}>{option.name}</span>
          </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
