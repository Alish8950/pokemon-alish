/* eslint-disable react/jsx-filename-extension */
import localFont from "next/font/local";
import "./globals.css";
import PokemonProvider from "@/context/PokemonContext";
import Header from "@/components/Header";

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
  title: "Pokemon Explorer App",
  description: "Tech Test",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PokemonProvider>
          <Header />
          <div>{children}</div>
        </PokemonProvider>
      </body>
    </html>
  );
}
