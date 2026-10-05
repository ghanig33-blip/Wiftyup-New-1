import "./globals.css";

export const metadata = {
  title: "WiftyUp",
  description: "Connect • Create • Earn",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
