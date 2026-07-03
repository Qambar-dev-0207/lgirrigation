import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import CursorGlow from "@/components/CursorGlow";
import VisitorTracker from "@/components/VisitorTracker";

export const metadata = {
  title: "L G Irrigation | Premium HDPE & Sewerage Piping Systems",
  description: "L G Irrigation is an ISO 9001:2015 & ISI certified manufacturer of HDPE pipes, coils, sewerage pipes, and sprinkler irrigation systems. Serving infrastructure and agricultural sectors across India.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "var(--canvas-cream)", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <VisitorTracker />
        <Loader />
        <CursorGlow />
        <Header />
        <div style={{ flex: 1 }}>{children}</div>
        <Footer />
      </body>
    </html>
  );
}
