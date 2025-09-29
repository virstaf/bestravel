import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Button } from "./ui/button";
import { IconArrowBack } from "@tabler/icons-react";
import { getBackLink } from "@/lib/getFormattedDate";
import { Fragment } from "react";

const NavSummary = ({ pathname, className }) => {
  const pathParts = pathname.split("/").filter((part) => part);
  const backLink = getBackLink(pathname);
  
  return (
    <div
      className={`w-full flex items-center justify-between mb-4 ${className}`}
    >
      <Breadcrumb>
        <BreadcrumbList>
          {pathParts.map((part, index) => (
            <Fragment key={index}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <Link href={`/${pathParts.slice(0, index + 1).join("/")}`}>
                  {part.charAt(0).toUpperCase() + part.slice(1)}
                </Link>
              </BreadcrumbItem>
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      <Button asChild>
        <Link href={backLink}>
          <IconArrowBack /> Back
        </Link>
      </Button>
    </div>
  );
};

export default NavSummary;
