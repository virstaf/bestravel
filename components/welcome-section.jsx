import WelcomeCard from "./welcome-card";
import { getProfileAction } from "@/actions/profiles";

const WelcomeSection = async () => {
  const { profile } = await getProfileAction();
  const firstName =
    profile?.full_name?.split(" ")[0] || profile?.username || "Traveler";
  const membershipTier = profile?.membership_tier || "Gold";

  return (
    <WelcomeCard
      username={profile.username}
      firstName={firstName}
      membershipTier={membershipTier}
      onboardingCompleted={profile?.onboarding_completed}
    />
  );
};

export default WelcomeSection;
