import { Button } from "@mui/material";
import { signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import { authHandle } from "../firebase/firebaseClient";
import LoginIcon from "@mui/icons-material/Login";

function LoginButton() {
	return (
		<div>
			<Button
				onClick={() => signInWithRedirect(authHandle, new GoogleAuthProvider())}
				variant="contained"
				startIcon={<LoginIcon />}
			>
				Sign In
			</Button>
		</div>
	);
}

export default LoginButton;
