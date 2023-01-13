import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginForm from './pages/login'
import NewReceipt from './pages/newReceipt'

function App() {

	return (
		<Routes>
			<Route path='/login' element={<LoginForm />} ></Route>
			<Route path="/receipt/new" element={<NewReceipt />}></Route>
		</Routes>
	)
}

export default App
