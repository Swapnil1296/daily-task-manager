import React from 'react'

export const NavBar = () => {

    const toggleMenu = () => {
        const navToggle = document.getElementsByClassName("toggle");
        for (let i = 0; i < navToggle.length; i++) {
          navToggle?.item(i).classList.toggle("hidden");
        }
      };
    return (
        <nav className="flex flex-wrap items-center justify-between p-3 bg-lime-200">
            <img src="https://tailwindflex.com/public/favicon.ico" className="h-10 w-10" alt="" />
            <div className="flex md:hidden">
                <button id="hamburger" onClick={toggleMenu}>
                    <img className="toggle block" src="https://img.icons8.com/fluent-systems-regular/2x/menu-squared-2.png" width="48" height="48" />
                    <img className="toggle hidden" src="https://img.icons8.com/fluent-systems-regular/2x/close-window.png" width="48" height="48" />
                </button>
            </div>
            <div
                className="toggle hidden w-full md:w-auto md:flex text-right text-bold mt-5 md:mt-0 border-t-2 border-teal-900 md:border-none">
                <a href="#"
                    className="block md:inline-block text-teal-900 hover:text-teal-500 px-3 py-3 border-b-2 border-teal-900 md:border-none">Home
                </a>
                <a href="#"
                    className="block md:inline-block text-teal-900 hover:text-teal-500 px-3 py-3 border-b-2 border-teal-900 md:border-none">Products
                </a>
                <a href="#"
                    className="block md:inline-block text-teal-900 hover:text-teal-500 px-3 py-3 border-b-2 border-teal-900 md:border-none">Pricing
                </a>
                <a href="#"
                    className="block md:inline-block text-teal-900 hover:text-teal-500 px-3 py-3 border-b-2 border-teal-900 md:border-none">Contact
                </a>
            </div>
            <a href="#"
                className="toggle hidden md:flex w-full md:w-auto px-4 py-2 text-right bg-teal-900 hover:bg-teal-500 text-white md:rounded">Create
                Account
            </a>
        </nav>
    )
}
