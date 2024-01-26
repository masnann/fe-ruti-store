import { Fragment, useState } from "react";
import {
  Dialog,
  Disclosure,
  Menu,
  Popover,
  Transition,
} from "@headlessui/react";

import {
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  XMarkIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon, BellIcon } from "@heroicons/react/20/solid";
import { checkLoginStatus, isSignUpPage, isLoginPage } from "../../utils/Auth";
import useProfile from "../../hooks/profile/Profile";
import NotificationPage from "../../pages/home/NotificationPage";
import { useNavigate } from "react-router-dom";

// NavbarComponents.jsx
const products = [
  {
    name: "Koleksi Unggulan",
    description:
      "Jelajahi koleksi unggulan kami yang memberikan kinerja dan gaya yang tak tertandingi",
    href: "/product",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Rekomendasi Khusus",
    description:
      "Dapatkan rekomendasi khusus dari Ruti Store. Pilih dari berbagai produk yang direkomendasikan untuk tampil trendy dan fashionable setiap saat.",
    href: "/product/recommendation",
    icon: ChartPieIcon,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavbarComponents() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isLoggedIn = checkLoginStatus();
  const signUpPage = isSignUpPage(location.pathname);
  const { profileData, isLoading, error } = useProfile();

  const navigate = useNavigate();

  const handleSignOut = () => {
    // Clear token from sessionStorage
    sessionStorage.removeItem("token");
    // Navigate to the login page
    navigate("/login");
  };

  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Ruti Store</span>
            <span className="text-blue-600 font-extrabold">RUTI STORE</span>
          </a>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Buka menu utama</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
              Produk
              <ChevronDownIcon
                className="h-5 w-5 flex-none text-gray-400"
                aria-hidden="true"
              />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {products.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                    >
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <item.icon
                          className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="flex-auto">
                        <a
                          href={item.href}
                          className="block font-semibold text-gray-900"
                        >
                          {item.name}
                          <span className="absolute inset-0" />
                        </a>
                        <p className="mt-1 text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>

            {/* Menu */}
          </Popover>
          <a
            href="/article"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Artikel
          </a>
          <a
            href="/about"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Tentang Kami
          </a>
          <a
            href="#contact"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Kontak
          </a>
        </Popover.Group>

        {/* Navbar log */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {!isLoggedIn ? (
            signUpPage ? (
              <a
                href="/login"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Masuk <span aria-hidden="true">&rarr;</span>
              </a>
            ) : (
              <a
                href="/signup"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Daftar <span aria-hidden="true">&rarr;</span>
              </a>
            )
          ) : (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* Button Keranjang */}
              <div className="ml-3 lg:ml-4">
                <button
                  className="relative flex items-center rounded-full bg-gray-200 text-sm p-2 focus:outline-none focus:ring focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  onClick={() => {
                    navigate('/order/cart');
                  }}
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Buka keranjang</span>
                  <ShoppingCartIcon className="h-5 w-5" />
                </button>
              </div>
              {/* Button Notifikasi */}
              <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                <div className="relative ml-3">
                  <Popover>
                    {({ open }) => (
                      <>
                        <Popover.Button
                          className={`${
                            open ? "text-gray-900" : "text-gray-500"
                          } relative flex items-center rounded-full bg-gray-200 p-1.5 focus:outline-none focus:ring focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800`}
                        >
                          <BellIcon className="h-6 w-6" aria-hidden="true" />
                        </Popover.Button>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Popover.Panel className="absolute z-10 top-full right-0 w-80 mt-2 -mr-4 overflow-hidden bg-white rounded-lg shadow-lg ring-1 ring-gray-900/5">
                            <NotificationPage />
                          </Popover.Panel>
                        </Transition>
                      </>
                    )}
                  </Popover>
                </div>
              </div>

              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <div>
                  <Menu.Button className="relative flex rounded-full bg-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Buka menu pengguna</span>
                    {profileData && (
                      <img
                        className="h-8 w-8 rounded-full"
                        src={profileData.photo_profile}
                        alt=""
                      />
                    )}
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="/user/profile"
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Profil Kamu
                        </a>
                      )}
                    </Menu.Item>
                    {/* <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Settings
                        </a>
                      )}
                    </Menu.Item> */}
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          onClick={handleSignOut} // Call handleSignOut on click
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Keluar
                        </a>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          )}
          <MobileMenuDialog
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
          />
        </div>
      </nav>
    </header>
  );
}

function MobileMenuDialog({ mobileMenuOpen, setMobileMenuOpen }) {
  const isLoggedIn = checkLoginStatus();
  const signUpPage = isSignUpPage(location.pathname);
  const loginPage = isLoginPage(location.pathname);

  return (
    <Dialog
      as="div"
      className="lg:hidden"
      open={mobileMenuOpen}
      onClose={setMobileMenuOpen}
    >
      <div className="fixed inset-0 z-10" />
      <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div className="flex items-center justify-between">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Ruti Store</span>
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </a>
          <button
            type="button"
            className="-m-2.5 rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="sr-only">Tutup Menu</span>
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">
              <Disclosure as="div" className="-mx-3">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                      Produk
                      <ChevronDownIcon
                        className={classNames(
                          open ? "rotate-180" : "",
                          "h-5 w-5 flex-none"
                        )}
                        aria-hidden="true"
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="mt-2 space-y-2">
                      {products.map((item) => (
                        <Disclosure.Button
                          key={item.name}
                          as="a"
                          href={item.href}
                          className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        >
                          {item.name}
                        </Disclosure.Button>
                      ))}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
              <a
                href="/article"
                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                Artikel
              </a>
              <a
                href="/about"
                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                Tentang Kami
              </a>
              <a
                href="#contact"
                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                Kontak
              </a>
            </div>
            <div className="py-6">
              {isLoggedIn ? (
                <div>
                  <a
                    href="/user/profile"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Profil Kamu
                  </a>
                  {/* Tulisan Notifikasi
                  <div className="mt-2">
                    <a
                      href="/notifications"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Notifications
                    </a>
                  </div> */}
                </div>
              ) : loginPage ? (
                <a
                  href="/signup"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Daftar
                </a>
              ) : signUpPage ? (
                <a
                  href="/login"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Masuk
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}
