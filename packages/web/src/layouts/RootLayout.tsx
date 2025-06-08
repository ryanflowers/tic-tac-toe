import { Outlet } from 'react-router-dom'

export default function RootLayout() {
  // This is where the common chrome for all pages would start to be built out
  return (
    <div>
      <Outlet />
    </div>
  )
}
