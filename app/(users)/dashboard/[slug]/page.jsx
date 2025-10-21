// app/dashboard/[slug]/page.jsx
import { notFound } from "next/navigation";

const DashboardSlugPage = async ({ params }) => {
  const { slug } = await params;

  // Check if the slug exists in your data
  const isValidSlug = checkIfValidSlug(slug);

  if (!isValidSlug) {
    notFound(); // This will show the nearest not-found.jsx
  }

  return <div>Dashboard Page: {slug}</div>;
};

function checkIfValidSlug(slug) {
  // Your validation logic here
  const validSlugs = ["dashboard", "trips", "book", "reservations", "settings"];
  return validSlugs.includes(slug);
}

export default DashboardSlugPage;
