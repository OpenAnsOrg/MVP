import { Typography, Box } from "@mui/material";
import AnswerCard from "../../../components/AnswerCard";
import { collection, getDocs, query, where } from "firebase/firestore";
import { storeHandle } from "../../../firebase/firebaseClient";
import { useEffect, useState } from "react";

function Browse() {
	const [ans, setAns] = useState([]);

	useEffect(() => {
		let a = [];
		(async function () {
			const ansRef = collection(storeHandle, "answers");
			const q = query(ansRef, where("fileAdded", "==", true));
			const res = await getDocs(q);
			res.forEach((doc) => {
				// doc.data() is never undefined for query doc snapshots
				// ans.push(doc.id);
				a.push(doc.id);
				setAns(a);
			});
		})();
		// setAns(a);
	}, []);

	return (
		<>
			<Typography variant="h3" sx={{ my: "1rem" }}>
				Answers
			</Typography>
			{ans?.map((answer, i) => {
				// console.log("From answers", answer, i);
				return <AnswerCard ansid={answer} key={i} />;
			})}
		</>
	);
}

export default Browse;
