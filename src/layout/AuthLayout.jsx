import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <main className="flex flex-col min-h-screen md:flex-row md:justify-between">
        <Outlet />
    </main>
  )
}

export default AuthLayout