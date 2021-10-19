import { useAuthState } from "react-firebase-hooks/auth";
import { authHandle, storeHandle } from "../../../firebase/firebaseClient";
import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";
import Log from "../../../components/Log";
import Loading from "../../../components/Loading";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import AnswerCard from "../../../components/AnswerCard";

function Profile({ userid }) {
	const [user, loading] = useAuthState(authHandle);
	const ans = [];
	if (loading) {
		return <Loading />;
	}
	if (!user) {
		return (
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					my: "5rem",
				}}
			>
				<Typography variant="h4" sx={{ my: "4rem", textAlign: "center" }}>
					You are not signed in!
				</Typography>
				<Log />
			</Box>
		);
	}

	(async function () {
		const ansRef = collection(storeHandle, "answers");
		const q = query(ansRef, where("userid", "==", userid));
		const res = await getDocs(q);
		res.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			// ans.push(doc.data());
			ans.push(doc.id);
		});
	})();
	// console.log(ans);

	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
			}}
		>
			<div style={{ margin: "3rem", borderRadius: "1rem" }}>
				<Image
					src={user.photoURL}
					alt={user.displayName}
					height="100"
					width="100"
				/>
			</div>
			<Typography variant="h4">Hello, {user.displayName}! </Typography>
			<Typography variant="h4"> Answers </Typography>
			{ans.forEach((answer) => {
				return <AnswerCard ansid={answer.id} />;
			})}
		</Box>
	);
}

export async function getServerSideProps({ resolvedUrl }) {
	const userid = resolvedUrl.replace("/profile/", "");
	return {
		props: {
			userid: userid,
		},
	};
}

export default Profile;
