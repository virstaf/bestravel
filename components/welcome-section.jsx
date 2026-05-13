import WelcomeCard from "./welcome-card";
import { getProfileAction } from "@/actions/profiles";

const WelcomeSection = async () => {
  const { profile } = await getProfileAction();
  const profileData = profile?.kyc || profile;
  
  if (!profileData) {
    return (
      <WelcomeCard
        username="Traveler"
        firstName="Traveler"
        membershipTier="Free"
        onboardingCompleted={false}
      />
    );
  }

  const firstName =
    profileData.full_name?.split(" ")[0] ||
    profileData?.first_name ||
    "Traveler";
  const username = firstName.toLowerCase() || "Traveler";
  const onboardingCompleted = false;
  // const onboardingCompleted = profile?.is_kyc_completed || false;
  const membershipTier = profileData?.subscription_plan || "Free";

  return (
    <WelcomeCard
      username={username}
      firstName={firstName}
      membershipTier={membershipTier}
      onboardingCompleted={onboardingCompleted}
    />
  );
};

export default WelcomeSection;
