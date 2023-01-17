import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from 'react-auth-kit'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<AuthProvider
			authType={"cookie"}
			authName={"token"}
			cookieDomain={window.location.hostname}
			cookieSecure={false}
		>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</AuthProvider>
	</React.StrictMode>,
)
