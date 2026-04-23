import WelcomeCard from "./welcome-card";
import { getProfileAction } from "@/actions/profiles";

const WelcomeSection = async () => {
  const { profile } = await getProfileAction();
  const profileData = profile?.kyc;
  const firstName = profileData?.first_name || "Traveler";
  const username = profileData?.first_name || "Traveler";
  const onboardingCompleted = false;
  // const onboardingCompleted = profile?.is_kyc_completed || false;
  const membershipTier = profileData?.membership_tier || "Free";

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
