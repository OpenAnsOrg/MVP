import { useAuthState } from "react-firebase-hooks/auth";
import { authHandle } from "../../../firebase/firebaseClient";
import { Box, Typography } from "@mui/material";
import Log from "../../../components/Log";
import Loading from "../../../components/Loading";
import CreateAns from "../../../components/CreateAns.js";

function Create() {
	const [user, loading, error] = useAuthState(authHandle);
	if (loading) {
		return <Loading />;
	}
	if (error) {
		return (
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					my: "4rem",
				}}
			>
				<Typography variant="h6">
					Oops, there was an error. Try Logging in again.
				</Typography>
			</Box>
		);
	}
	if (!user) {
		return (
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					my: "4rem",
					flexDirection: "column",
				}}
			>
				<Typography variant="h6" sx={{ my: "3rem" }}>
					You need to be Signed in to Create.
				</Typography>
				<Log />
			</Box>
		);
	}
	return <CreateAns />;
}

export default Create;
