// import { RemixLogo } from "#/components/remix-logo";
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";
import { Suspense } from "react";
import type { LoaderFunctionArgs } from "@vercel/remix";
import { json } from "@vercel/remix";
import { Await, NavLink, Outlet, useLoaderData } from "@remix-run/react";
// import { cartCount } from "#/app/cart-cookie";

export async function loader({ request }: LoaderFunctionArgs) {
  // const cookieHeader = request.headers.get("Cookie");
  //   const cookie = await cartCount.parse(cookieHeader);

  console.log("check the cookie?");

  return json({
    cartCount: 10, // cookie?.cartCount ?? 0,
  });
}

export default function AppLayout() {
  let { cartCount } = useLoaderData<typeof loader>();

  return (
    <main>
      <div className="flex items-center justify-between gap-x-3 rounded-lg bg-gray-800 px-3 py-3 lg:px-5 lg:py-4">
        <div className="flex gap-x-3">
          <div className="h-10 w-10 hover:opacity-70">
            {/* <RemixLogo /> */}
          </div>

          <div className="relative flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-300" />
            </div>
            <input
              aria-label="Search"
              type="search"
              name="search"
              id="search"
              className="block w-full rounded-full border-none bg-gray-600 pl-10 font-medium text-gray-200 focus:border-vercel-pink focus:ring-2 focus:ring-vercel-pink"
              autoComplete="off"
            />
          </div>
        </div>

        <div className="flex shrink-0 gap-x-3">
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-600 text-white">
            <ShoppingCartIcon className="w-6 text-white" />
            <div className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-vercel-cyan text-sm font-bold text-cyan-800">
              <Suspense fallback={<span></span>}>
                <Await resolve={cartCount}>
                  {(resolvedValue: number) => <span>{resolvedValue}</span>}
                </Await>
              </Suspense>
            </div>
          </div>

          <img
            src="/prince-akachi-LWkFHEGpleE-unsplash.jpg"
            className="rounded-full"
            width={40}
            height={40}
            alt="User"
          />
        </div>
      </div>
      <div className="flex gap-2">
        <nav className="flex flex-col gap-1 p-4">
          {[
            { to: "/", children: "Home" },
            { to: "/12345", children: "PDP" },
            { to: "/checkout", children: "Checkout" },
            { to: "/about", children: "About" },
          ].map(({ to, children }) => (
            <NavLink
              key={to}
              className={({ isActive }) =>
                `text-blue-800 hover:text-blue-600 ${
                  isActive && "font-semibold"
                }`
              }
              to={to}
            >
              {children}
            </NavLink>
          ))}
        </nav>
        <div className="border border-gray-400 p-4 rounded-sm w-full text-center">
          <Outlet />
        </div>
      </div>
    </main>
  );
}
