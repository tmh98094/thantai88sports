import Link from "next/link";

type BrandLogoProps = {
  className?: string;
};

export function BrandLogo({ className = "" }: BrandLogoProps) {
  return (
    <Link aria-label="Thantai88sport - Trang chủ" className={`brand-logo ${className}`.trim()} href="/">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="Thantai88" height={416} src="/images/thantai88-logo-official.webp" width={1296} />
    </Link>
  );
}
