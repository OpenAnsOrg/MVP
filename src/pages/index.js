import LoginButton from "../../components/LoginButton";
import { authHandle } from "../../firebase/firebaseClient";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../../components/Loading";
import { Typography, Box, Button, Link } from "@mui/material";

export default function Home() {
	const [user, loading, error] = useAuthState(authHandle);
	if (loading) {
		return <Loading />;
	}
	if (error) {
		return <div>{error}</div>;
	}
	if (user) {
		return (
			<>
				<Box sx={{ display: "flex", flexDirection: "column", m: "4rem" }}>
					<Typography variant="h4" sx={{ textAlign: "center" }}>
						Hello, {user?.displayName}
					</Typography>
					<Typography variant="h5" sx={{ textAlign: "center" }}>
						Start Solving 😉
					</Typography>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							width: 450,
							justifyContent: "space-between",
							flexDirection: "column",
							my: "2rem",
						}}
					>
						<Button variant="text">
							<Link href="/answers">
								<a style={{ textDecoration: "none", color: "white" }}>
									Answers
								</a>
							</Link>
						</Button>
						<Button variant="text">
							<Link href="/groups">
								<a style={{ textDecoration: "none", color: "white" }}>Groups</a>
							</Link>
						</Button>
						<Button variant="text">
							<Link href="/create">
								<a style={{ textDecoration: "none", color: "white" }}>Create</a>
							</Link>
						</Button>
						<Button variant="text">
							<Link href="/profile">
								<a style={{ textDecoration: "none", color: "white" }}>
									Profile
								</a>
							</Link>
						</Button>
					</Box>
				</Box>
			</>
		);
	}
	return (
		<>
			<Box sx={{ display: "flex", flexDirection: "column", m: "4rem" }}>
				<Typography variant="h5" sx={{ textAlign: "center" }}>
					Start Solving😉
				</Typography>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						width: 450,
						justifyContent: "space-between",
						flexDirection: "column",
						my: "2rem",
					}}
				>
					<Button variant="text">
						<Link href="/answers">
							<a style={{ textDecoration: "none", color: "white" }}>Answers</a>
						</Link>
					</Button>
					<Button variant="text">
						<Link href="/groups">
							<a style={{ textDecoration: "none", color: "white" }}>Groups</a>
						</Link>
					</Button>
					<Button variant="text">
						<Link href="/create">
							<a style={{ textDecoration: "none", color: "white" }}>Create</a>
						</Link>
					</Button>
					<Button variant="text">
						<Link href="/profile">
							<a style={{ textDecoration: "none", color: "white" }}>Profile</a>
						</Link>
					</Button>
				</Box>
			</Box>
		</>
	);
}
