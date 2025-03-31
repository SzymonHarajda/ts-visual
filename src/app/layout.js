import localFont from "next/font/local";
import "./globals.css";

const myFont = localFont({
  src: "../../public/fonts/HeyWow-Medium.ttf",
});

export const metadata = {
  title: "tmvisual",
  description: "tmvisual - Tomasz Michałek",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={myFont.className}>{children}</body>
    </html>
  );
}
