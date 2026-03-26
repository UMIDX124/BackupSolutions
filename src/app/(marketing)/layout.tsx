import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import CookieConsent from "@/components/CookieConsent";
import StickyCTABar from "@/components/StickyCTABar";
import ExitIntentModal from "@/components/ExitIntentModal";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />
      <main className="flex-1">{children}</main>
      <Footer />
      <CookieConsent />
      <StickyCTABar />
      <ExitIntentModal />
    </>
  );
}
