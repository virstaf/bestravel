import Link from "next/link";
import { Button } from "./ui/button";

const WelcomeCard = ({
  username,
  firstName,
  membershipTier,
  onboardingCompleted,
}) => {
  // console.log("username::", username);

  return (
    <div className="flex flex-col relative items-start justify-center w-full h-full bg-white rounded-2xl overflow-hidden shadow-lg p-6">
      <div className="absolute top-0 bottom-0 right-0 left-0 clipPath heroBg overflow-hidden"></div>

      {onboardingCompleted ? (
        <>
          <div className="flex items-center gap-3 mb-2 z-10">
            <p className="text-3xl text-gray-600 italic text-left py-1 backdrop-blur-3xl pr-2 rounded">
              Hello, {firstName} 👋
            </p>
          </div>
          <p className="text-sm text-gray-500 mb-2 backdrop-blur-3xl pr-2 rounded z-10">
            Membership: {membershipTier} | Active
          </p>
        </>
      ) : (
        <p className="text-3xl text-gray-600 italic text-left py-1 mb-2 backdrop-blur-3xl pr-2 rounded z-10">
          Howdy {username}!
        </p>
      )}

      <p className="text-gray-600 py-2 mb-2 backdrop-blur-3xl pr-2 rounded z-10">
        Checkout the latest travel deals and offers
      </p>
      <Button
        asChild
        className="px-4 py-2 bg-secondary z-10 text-white rounded-lg hover:bg-secondary/80 transition duration-200"
      >
        <Link href="/dashboard/deals">Explore Deals</Link>
      </Button>
    </div>
  );
};

export default WelcomeCard;
