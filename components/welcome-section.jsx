import WelcomeCard from "./welcome-card";

/**
 * WelcomeSection component.
 * Optimized to accept profile data as a prop to avoid redundant database queries.
 */
const WelcomeSection = ({ profile }) => {
  const firstName =
    profile?.full_name?.split(" ")[0] || profile?.username || "Traveler";
  const membershipTier = profile?.membership_tier || "Gold";

  return (
    <WelcomeCard
      username={profile?.username}
      firstName={firstName}
      membershipTier={membershipTier}
      onboardingCompleted={profile?.onboarding_completed}
    />
  );
};

export default WelcomeSection;
