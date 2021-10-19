import { Typography, Box } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { storeHandle } from "../firebase/firebaseClient";
import { useState, useEffect } from "react";

const AnswerCard = ({ ansid }) => {
	// console.log("From ans Card", ansid);
	const [ans, setAns] = useState();

	useEffect(() => {
		async function fetchAns() {
			const docRef = doc(storeHandle, "answers", ansid);
			const docSnap = await getDoc(docRef);
			setAns(docSnap.data());
			// console.log(ans);
		}
		fetchAns();
	}, []);

	if (!ans) {
		return (
			<Box
				sx={{
					border: 1,
					borderRadius: "10px",
					borderColor: "#ff3d00",
					width: "100%",
					p: "1rem",
					m: "1rem",
					maxWidth: "800px",
					":hover": {
						borderColor: "#ff3d00",
						boxShadow: 3,
						transition: "ease-in-out",
						transitionDuration: ".25s",
						cursor: "pointer",
					},
				}}
			>
				<Typography variant="h5">Loading</Typography>
			</Box>
		);
	}

	return (
		<Box
			sx={{
				border: 1,
				borderRadius: "10px",
				borderColor: "#ff3d00",
				width: "100%",
				p: "1rem",
				m: "1rem",
				maxWidth: "800px",
				":hover": {
					borderColor: "#ff3d00",
					boxShadow: 3,
					transition: "ease-in-out",
					transitionDuration: ".25s",
					cursor: "pointer",
				},
			}}
			onClick={() => {
				window.location.replace(`/answers/${ansid}`);
			}}
		>
			<Typography variant="h4">{ans.title}</Typography>
			<Typography variant="caption">{ans.creatorName}</Typography>
			<Typography variant="body1">{ans.desc}</Typography>
		</Box>
	);
};

export default AnswerCard;
