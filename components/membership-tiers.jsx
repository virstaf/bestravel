import { Table, TableBody, TableCell, TableHeader, TableRow } from "./ui/table";
import { tierTableHeaders, tierTableData } from "@/lib/data";

const MembershipTiers = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 my-8">
      <h2 className="mb-4 text-primary font-semibold text-xl text-center md:text-left">
        Membership Tiers at a Glance
      </h2>
      <Table className="shadow-md px-4 bg-white rounded-lg overflow-hidden">
        <TableHeader>
          <TableRow className="bg-white ">
            {tierTableHeaders.map((header) => (
              <TableCell key={header.key} className="font-bold px-2">
                {header.title}
              </TableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tierTableData.map((tier, index) => (
            <TableRow key={index} className="hover:bg-gray-50 text-sm">
              <TableCell className="font-medium px-2">{tier.feature}</TableCell>
              <TableCell className="px-2">{tier.silver}</TableCell>
              <TableCell className="px-2">{tier.gold}</TableCell>
              <TableCell className="px-2">{tier.platinum}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MembershipTiers;
