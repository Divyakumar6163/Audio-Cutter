"user-client";
import "./globals.css";
export const metadata = {
  title: "Audio Cutter",
  description: "This is use to trim the Audio of Audio Track",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
