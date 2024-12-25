import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ModalProvider } from "./context/ModalContext";
import { SessionWrapper } from "./SessionWrapper";
import { AuthProvider } from "./context/AuthContext";
import { OTPModalProvider } from "./context/OTPModalContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Maphy's Blog App",
  description:
    "Learn how to build a blog using Next.js and explore the best practices for developing modern web applications.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionWrapper>
          <AuthProvider>
            <ModalProvider>
              <OTPModalProvider>
                <Navbar />

                {children}
                <Footer />
              </OTPModalProvider>
            </ModalProvider>
          </AuthProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
