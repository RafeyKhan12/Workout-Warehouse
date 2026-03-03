import Profile from "@/components/Profile";
import { getUser } from "@/helpers/getCurrentUser"

export const metadata = {
  title: "Profile"
}

export default async function page() {
    const user = await getUser();
     const plainUser = {
        ...user.toObject(),
        _id: user._id.toString()
    };
  return (
    <div>
      <Profile user={plainUser} />
    </div>
  )
}
