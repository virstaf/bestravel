import Link from "next/link";
import React from "react";

const PrivacyPage = () => {
  return (
    <div className="">
      <div className="container mx-auto my-16 min-h-screen flex flex-col px-4">
        <div className="flex items-center justify-center">
          <h1 className="text-4xl font-bold">Privacy Policy Page</h1>
        </div>
        <div className="content bg-white p-6 rounded-lg shadow-md mt-8">
          <p>
            Welcome to Virstravel, operated by Virstaf LTD ("we", "us", "our").
            We are registered in England and Wales with a registered office at
            89-90 Paul Street, London, EC2A 4NE.
          </p>
          <p>
            Protecting your personal information is important to us. This
            Privacy Policy explains how we collect, use, and safeguard your
            information when you interact with our website and services.
          </p>
          <ol>
            <li>
              <h3>About Virstravel</h3>
              <p>
                Virstravel provides exclusive travel perks, flight and hotel
                deals to members of the Virstravel Club. Access to deals and
                services requires membership registration.
              </p>
            </li>
            <li>
              <h3>Information We Collect</h3>
              <p>
                We may collect and process the following categories of personal
                data:
              </p>
              <ul>
                <li>Identity Information (full name, date of birth)</li>
                <li>
                  Contact Information (email address, phone number, postal
                  address)
                </li>
                <li>
                  Payment Information (billing address, payment card details)
                </li>
                <li>
                  Travel Preferences (destinations, dates, accommodation
                  choices)
                </li>
                <li>
                  Technical Information (IP address, browser type, device
                  identifiers)
                </li>
                <li>
                  Communication Data (correspondence with our support team)
                </li>
              </ul>
            </li>
            <li>
              <h3>How We Use Your Information</h3>
              <p>We use your personal data to:</p>
              <ul>
                <li>Register you as a member of Virstravel Club</li>
                <li>Process payments for membership or purchases</li>
                <li>Provide tailored flight and hotel offers</li>
                <li>
                  Communicate with you (service updates, marketing offers)
                </li>
                <li>Comply with legal obligations</li>
                <li>Improve our website, services, and user experience</li>
              </ul>
            </li>
            <li>
              <h3>Legal Bases for Processing</h3>
              <p>We process your data based on:</p>
              <ul>
                <li>Your consent</li>
                <li>Performance of a contract (membership agreement)</li>
                <li>
                  Our legitimate interests (e.g., fraud prevention, business
                  development)
                </li>
                <li>Compliance with legal obligations</li>
              </ul>
            </li>
            <li>
              <h3>Sharing Your Information</h3>
              <p>We may share your personal data with:</p>
              <ul>
                <li>
                  Airline, travel perks, and hotel partners to fulfill your
                  bookings
                </li>
                <li>Payment processors to complete transactions</li>
                <li>
                  IT service providers for website and infrastructure support
                </li>
                <li>Regulatory authorities if required by law</li>
              </ul>
              <p>
                We require all third parties to respect the security of your
                personal data and to treat it in accordance with the law.
              </p>
            </li>
            <li>
              <h3>International Data Transfers</h3>
              <p>
                Some of our partners may be located outside the United Kingdom
                or European Economic Area. In such cases, we ensure appropriate
                safeguards are in place, such as standard contractual clauses.
              </p>
            </li>
            <li>
              <h3>Data Retention</h3>
              <p>
                We retain your personal data only for as long as necessary to
                fulfill the purposes outlined above, unless a longer retention
                period is required or permitted by law.
              </p>
            </li>
            <li>
              <h3>Your Data Protection Rights</h3>
              <p>
                Under the UK General Data Protection Regulation (UK GDPR), you
                have rights including:
              </p>
              <ul>
                <li>Right of access to your personal data</li>
                <li>Right to rectification if data is inaccurate</li>
                <li>Right to erasure ("right to be forgotten")</li>
                <li>Right to restrict processing</li>
                <li>Right to data portability</li>
                <li>Right to object to processing</li>
                <li>Right to withdraw consent at any time</li>
              </ul>
              <p>
                You can exercise these rights by contacting us using the details
                below.
              </p>
            </li>
            <li>
              <h3>Cookies and Tracking Technologies</h3>
              <p>
                Our website uses cookies to enhance your browsing experience.
                For more information, please see our{" "}
                <Link href="/cookies-policy">Cookies Policy</Link>.
              </p>
            </li>
            <li>
              <h3>Security Measures</h3>
              <p>
                We implement appropriate technical and organizational measures
                to protect your personal data from unauthorized access, loss, or
                misuse.
              </p>
            </li>
            <li>
              <h3>Changes to This Privacy Policy</h3>
              <p>
                We may update this Privacy Policy from time to time. We will
                notify you of any significant changes and post the updated
                policy on our website.
              </p>
            </li>
            <li>
              <h3>Contact Us</h3>
              <p>
                If you have any questions or concerns about this Privacy Policy,
                please contact us at:
              </p>
              <ul>
                <li className="list-none">Virstaf LTD</li>
                <li className="list-none">
                  89-90 Paul Street, London, EC2A 4NE
                </li>
                <li className="list-none">Email: info@virstaf.com</li>
              </ul>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
