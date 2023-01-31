import { RequireAuth } from 'react-auth-kit'
import { Route, Routes } from 'react-router-dom'
import NewReceipt from './pages/newReceipt'
import Login from './pages/login'
import Home from './pages/home'
import Profile from './pages/profile'
import Receipt from './pages/receipt'
import UpdateReceipt from './pages/updateReceipt'
import AllUsers from './pages/allUsers'
import Register from './pages/register'
import AdminUser from './pages/adminUser'
import AdminReceipts from './pages/adminReceipts'

function App() {

	return (
		<>
			<Routes>
				<Route path="/"
					element={
						<RequireAuth loginPath='/login'>
							<Home />
						</RequireAuth>
					}></Route>
				<Route path="/profile"
					element={
						<RequireAuth loginPath='/login'>
							<Profile />
						</RequireAuth>
					}></Route>
				<Route path='/login' element={<Login />} ></Route>
				<Route path="/receipt/new"
					element={
						<RequireAuth loginPath='/login'>
							<NewReceipt />
						</RequireAuth>
					}></Route>
				<Route path="/receipt/:id"
					element={
						<RequireAuth loginPath='/login'>
							<Receipt />
						</RequireAuth>
					}></Route>
				<Route path="/receipt/:id/update"
					element={
						<RequireAuth loginPath='/login'>
							<UpdateReceipt />
						</RequireAuth>
					}></Route>
				<Route path="/admin/users"
					element={
						<RequireAuth loginPath='/login'>
							<AllUsers />
						</RequireAuth>
					}></Route>
				<Route path="/admin/user/:id"
					element={
						<RequireAuth loginPath='/login'>
							<AdminUser />
						</RequireAuth>
					}></Route>
				<Route path="/admin/register"
					element={
						<RequireAuth loginPath='/login'>
							<Register />
						</RequireAuth>
					}></Route>
				<Route path="/admin/receipts"
					element={
						<RequireAuth loginPath='/login'>
							<AdminReceipts />
						</RequireAuth>
					}></Route>
			</Routes>
		</>
	)
}

export default App
