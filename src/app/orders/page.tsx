import AllOrders from '@/components/AllOrders';
import UserOrders from '@/components/UserOrders';
import { getUser } from '@/helpers/getCurrentUser';

export const metadata = {
  title: "Orders"
}

export default async function Orders() {
    const user = await getUser();
    if(!user) return  <h1>Login to access this page</h1>
  return (
    <div>
      {user.role === "admin" ? (
        <AllOrders />
      ) : (
        <>
        <UserOrders />
        </>
      )}
    </div>
  )
}
