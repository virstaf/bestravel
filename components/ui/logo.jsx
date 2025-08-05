import Image from "next/image";
import Link from "next/link";

const Logo = ({ href }) => {
  return (
    <Link href={href} className="max-h-14 hover:cursor-pointer hover:scale-105">
      <div className="h-full relative">
        <Image
          src="/virstravel.png"
          alt="logo"
          width={805}
          height={310}
          className="h-12 w-31 object-fit"
        />
      </div>
    </Link>
  );
};

export default Logo;
