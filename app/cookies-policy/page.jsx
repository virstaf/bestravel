import React from "react";

const CookiesPolicyPage = () => {
  return (
    <div className="CookiesPolicyPage container min-h-screen mt-16 px-4 ">
      <h1 className="text-4xl font-bold">Cookies Policy</h1>
      <div className="content">
        <p>
          This Cookies Policy explains how we use cookies and similar tracking
          technologies on our website.
        </p>
        <h2>What Are Cookies?</h2>
        <p>
          Cookies are small text files placed on your device by your web
          browser. They are widely used to make websites work more efficiently
          and to provide information to the site owners.
        </p>
        <h2>How We Use Cookies</h2>
        <p>We use cookies for various purposes, including:</p>
        <ul>
          <li>
            Essential cookies: These cookies are necessary for the website to
            function properly.
          </li>
          <li>
            Performance cookies: These cookies help us understand how visitors
            interact with our website.
          </li>
          <li>
            Functional cookies: These cookies enable enhanced functionality and
            personalization.
          </li>
        </ul>
        <h2>Managing Cookies</h2>
        <p>
          You can manage your cookie preferences through your browser settings.
          Please note that disabling cookies may affect your experience on our
          website.
        </p>
      </div>
    </div>
  );
};

export default CookiesPolicyPage;
