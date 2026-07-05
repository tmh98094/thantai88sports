import Link from "next/link";

type BrandLogoProps = {
  className?: string;
};

export function BrandLogo({ className = "" }: BrandLogoProps) {
  return (
    <Link aria-label="Thantai88sport - Trang chủ" className={`brand-logo ${className}`.trim()} href="/">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="Thantai88 Sports" height={724} src="/images/logo.png" width={2172} />
    </Link>
  );
}
