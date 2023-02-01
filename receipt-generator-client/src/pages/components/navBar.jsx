import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useIsAuthenticated, useSignOut } from 'react-auth-kit';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import instance from '../instance';


function NavBar() {

	const isAuthenticated = useIsAuthenticated();
	const [authenticated, setAuthenticated] = useState();
	const [isAdmin, setIsAdmin] = useState(null);
	const signOut = useSignOut();
	const nav = useNavigate();

	useEffect(() => {
		setAuthenticated(isAuthenticated)
	}, [isAuthenticated])

	useEffect(() => {
		instance.get("me", { withCredentials: true })
			.then((response) => {
				if (response.status === 200) {
					if (response.data.user.role === 'admin') {
						setIsAdmin(true);
					}
				}
			})
			.catch((error) => {
			});
	}, [isAdmin])

	const signOutBtn = () => {
		signOut();
		nav('/login')
	}

	const navLink = {
		color: "white",
	};

	return (

		<Navbar bg="dark" expand="md" className='mb-3' variant='dark'>
			<Container>
				<Navbar.Brand href="/">Al-Burhan</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className='me-auto'>
					</Nav>
					<Nav>
						{
							authenticated ? (
								<>
									<Nav.Link href="/receipt/new">New Receipt</Nav.Link>
									<Nav.Link href="/profile">Profile</Nav.Link>
									{
										isAdmin ? (
											<>
												<Nav.Link href="/admin/register">Register User</Nav.Link>
												<Nav.Link href="/admin/users">All Users</Nav.Link>
												<Nav.Link href="/admin/receipts">All receipts</Nav.Link>
											</>
										) : ('')
									}
									<Nav.Link href="" onClick={() => signOutBtn()}>Logout</Nav.Link>
								</>
							) : ('')
						}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default NavBar;