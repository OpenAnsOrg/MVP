import { Box, Button } from "@mui/material";
import Link from "next/link";
import Log from "./Log";

function Menu() {
	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				width: 450,
				justifyContent: "space-between",
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

			<Log />
		</Box>
	);
}

export default Menu;
