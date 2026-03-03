import ReduxProvider from "@/store/provider";
import "./globals.css";
import Navbar from "@/components/Navbar"
import { getUser } from "@/helpers/getCurrentUser";

export const metadata = {
  title: "Workout Warehouse",
  template: "%s | Workout Warehouse"
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  const plainUser = user ? {
  ...JSON.parse(JSON.stringify(user)),
  _id: user._id.toString(),
} : null;
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <Navbar user={plainUser} />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
