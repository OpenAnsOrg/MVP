import { Typography, TextField, Box, Button, Container } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { storeHandle, storageHandle } from "../../../firebase/firebaseClient";
import Highlight from "react-highlight.js";
import Pyodide from "../../../components/Pyodide";
import { useState } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import Link from "next/link";
import Image from "next/image";

function PostView({ data, content }) {
	const [call, setCall] = useState("");
	const [cont, setCont] = useState(content);
	if (!data) {
		return (
			<Box sx={{ my: "3rem" }}>
				<Typography variant="h4">Answer does not exist</Typography>
			</Box>
		);
	}
	if (data.fileAdded == false) {
		return (
			<Box sx={{ my: "3rem" }}>
				<Typography variant="h4">File not added yet</Typography>
			</Box>
		);
	}
	const {
		title,
		desc,
		functionName,
		numberOfVariables,
		variablesDesc,
		exampleCall,
		fileURL,
	} = data;
	const handleCallChange = (e) => {
		setCall(e.target.value);
	};
	const handleCallSubmit = () => {
		setCont(cont + "\n" + call);
		// console.log(cont);
	};
	return (
		<Container
			sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
		>
			<Box
				sx={{
					my: "1rem",
					width: "100%",
					maxWidth: "700px",
					display: "flex",
					flexDirection: "column",
				}}
			>
				<Typography variant="h3" sx={{ my: "0.5rem" }}>
					{title}
				</Typography>
				<Button variant="text" sx={{ width: "130px" }}>
					<Box
						sx={{
							borderRadius: "50%",
							mr: ".3rem",
							display: "flex",
							alignItems: "center",
						}}
					>
						<Image
							src={data.creatorImg}
							alt={data.creatorName}
							width="20"
							height="20"
						/>
					</Box>
					<Link href={"/profile/" + data.userid}>
						<a style={{ textDecoration: "none", color: "#ff3d00" }}>
							{data.creatorName}
						</a>
					</Link>
				</Button>
				<Typography variant="caption" sx={{ my: "1rem" }}>
					{data.createdAt}
				</Typography>
				<Typography variant="h6">Description: </Typography>
				<Typography variant="body1" sx={{ my: ".3rem" }}>
					{desc}
				</Typography>
				<Typography variant="h6" sx={{ my: "1rem" }}>
					Parameter Description:{" "}
				</Typography>
				<Typography variant="body1" sx={{ my: ".3rem" }}>
					{variablesDesc}
				</Typography>

				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						flexDirection: "column",
						my: "2rem",
					}}
				>
					<TextField
						id="call"
						name="call"
						label="Function Call"
						value={call}
						onChange={handleCallChange}
						sx={{ my: "1rem", width: "100%" }}
						variant="outlined"
						placeholder={exampleCall}
					/>
					<Button
						variant="contained"
						component="label"
						onClick={handleCallSubmit}
						sx={{ mx: "2rem" }}
					>
						Run Program
					</Button>
				</Box>
				<Box>
					<Pyodide pythonCode={cont} />
				</Box>
				<Typography variant="h6" sx={{ my: ".3rem" }}>
					Code:
				</Typography>
				<Highlight language="python" style={{ fontWeight: 500 }}>
					{content || null}
				</Highlight>
			</Box>
		</Container>
	);
}

export async function getServerSideProps({ resolvedUrl }) {
	const ansid = resolvedUrl.replace("/answers/", "");
	const docRef = doc(storeHandle, "answers", ansid);
	const docSnap = await getDoc(docRef);
	const pathReference = ref(storageHandle, `py_prgs/${ansid}`);
	const url = await getDownloadURL(pathReference);
	const response = await fetch(url);
	const content = (await response.text()) || null;
	// console.log(docSnap.data());
	return {
		props: {
			id: ansid,
			data: docSnap.data() || null,
			content: content,
		},
	};
}

export default PostView;
