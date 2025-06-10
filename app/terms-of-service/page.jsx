import Link from "next/link";
import React from "react";

const TermsOfServicePage = () => {
  return (
    <div>
      <div className="container mx-auto my-16 min-h-screen flex flex-col px-4">
        <div className="flex items-center justify-center">
          <h1 className="text-4xl font-bold">Terms of Service</h1>
        </div>
        <div className="content bg-white p-6 rounded-lg shadow-md mt-8">
          <p>
            Welcome to <span className="font-bold">Virstravel</span>, owned and
            operated by <span className="font-bold">Virstaf LTD</span>,
            registered at 89-90 Paul Street, London, EC2A 4NE ("we", "us",
            "our").
          </p>
          <p>
            By accessing or using this Website, you agree to these Terms of Use.
          </p>
          <ol>
            <li>
              <h3>Acceptance of Terms</h3>
              <p>
                Your access to and use of this Website is subject to these Terms
                of Use and all applicable laws. If you do not agree, please do
                not use the Website.
              </p>
            </li>
            <li>
              <h3>Website Access and Availability</h3>
              <p>
                We aim to ensure the Website is available at all times, but we
                do not guarantee uninterrupted access and may suspend or
                withdraw content without notice.
              </p>
            </li>
            <li>
              <h3>Use of the Website</h3>
              <p>You agree not to:</p>
              <ul>
                <li>Use the Website for unlawful purposes</li>
                <li>
                  Attempt to gain unauthorised access to any part of the Website
                </li>
                <li>Introduce malware or harmful code</li>
                <li>
                  Scrape or copy content or data from the Website without
                  permission
                </li>
              </ul>
            </li>
            <li>
              <h3>Intellectual Property</h3>
              <p>
                All content on this Website (including text, images, graphics,
                software, and branding) is owned by or licensed to Virstaf LTD.
                You may not copy, modify, distribute, or use our content without
                prior written permission.
              </p>
            </li>
            <li>
              <h3>User-Generated Content</h3>
              <p>If you submit reviews, feedback, or content:</p>
              <ul>
                <li>
                  You grant us a worldwide, royalty-free licence to use,
                  display, and modify it.
                </li>
                <li>
                  You confirm it does not infringe third-party rights or violate
                  laws.
                </li>
              </ul>
            </li>
            <li>
              <h3>Third-Party Links</h3>
              <p>
                Our Website may contain links to third-party sites. These are
                provided for your convenience only — we do not endorse or take
                responsibility for their content or policies.
              </p>
            </li>
            <li>
              <h3>Disclaimers</h3>
              <p>
                While we make every effort to ensure information is accurate, we
                do not guarantee completeness or reliability of any content. Use
                of the Website is at your own risk.
              </p>
            </li>
            <li>
              <h3>Limitation of Liability</h3>
              <p>
                To the maximum extent permitted by law, Virstaf LTD shall not be
                liable for any direct, indirect, incidental, or consequential
                damages arising out of your use of the Website.
              </p>
            </li>
            <li>
              <h3>Privacy</h3>
              <p>
                We process personal data in accordance with our{" "}
                <Link href="/privacy-policy">Privacy Policy</Link>.
              </p>
            </li>
            <li>
              <h3>Changes to Terms</h3>
              <p>
                We reserve the right to update these Terms at any time. Please
                check this page periodically. Your continued use of the Website
                indicates acceptance of updated terms.
              </p>
            </li>
            <li>
              <h3>Governing Law</h3>
              <p>
                These Terms are governed by the laws of England and Wales. Any
                disputes are subject to the exclusive jurisdiction of the courts
                of England and Wales.
              </p>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
