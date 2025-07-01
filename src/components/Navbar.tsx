import Image from "next/image";

export const Navbar = () => {
  return (
    <header>
      <div className="navbar w-full fixed top-0 left-0 z-50 bg-black text-white">
        <div className="flex items-center justify-between p-2 md:p-4">
          <button className="p-2">Menu</button>
          <div className="absolute left-1/2 -translate-x-1/2 transform">
            <Image src="/logo.svg" width={180} height={30} alt="elite essence" className="w-32 md:w-44" />
          </div>

          <div className="flex">Icons</div>
        </div>
      </div>
    </header>
  );
};
