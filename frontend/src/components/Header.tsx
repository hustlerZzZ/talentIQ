import { SignInButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="py-6 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center">
          <Link to="/" className="text-xl font-semibold text-gray-800">
            talentAid
          </Link>
          <div className="space-x-8 flex items-center justify-between">
            <Link to="/pricing">Our Pricing</Link>

            <div className="bg-[#1D4ED8] hover:bg-blue-800 text-white px-4 py-1.5 rounded">
              <SignInButton
                forceRedirectUrl="/interviewer-dashboard"
                signUpForceRedirectUrl="/interviewer-dashboard"
              />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
