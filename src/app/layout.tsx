import ReduxProvider from "@/store/provider";
import "./globals.css";
import Navbar from "@/components/Navbar"
import { getUser } from "@/helpers/getCurrentUser";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  const plainUser = {
    ...user.toObject(),
    _id: user._id.toString(),
  };
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
