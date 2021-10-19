import { Typography, Box } from "@mui/material";

const Answertips = () => {
	return (
		<Box sx={{ m: "1rem" }}>
			<Typography variant="h4">Tips for uploading</Typography>
			<ul>
				<li>
					<Typography variant="body1">Only upload .py files</Typography>
				</li>
				<li>
					<Typography variant="body1">
						The program must contain a main function
					</Typography>
				</li>
				<li>
					<Typography variant="body1">
						When a user types the function call, it iss appended at the end of
						the file
					</Typography>
				</li>
				<li>
					<Typography variant="body1">
						Print statements will be shown on the console only
					</Typography>
				</li>
				<li>
					<Typography variant="body1">
						To display the answer on the screen just return it
					</Typography>
				</li>
			</ul>
		</Box>
	);
};

export default Answertips;
