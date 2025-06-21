import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 sm:gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.svg"
              alt="Podcast Explorer Logo"
              width={32}
              height={32}
              className="h-6 w-6 sm:h-8 sm:w-8"
            />
            <span className="font-bold text-sm sm:text-base md:text-lg">
              <span className="block sm:hidden">Podcast</span>
              <span className="hidden sm:block">Podcast Explorer</span>
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
} 