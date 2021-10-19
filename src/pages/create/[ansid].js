import { doc, getDoc, setDoc } from "firebase/firestore";
import {
	storeHandle,
	authHandle,
	storageHandle,
} from "../../../firebase/firebaseClient";
import { useAuthState } from "react-firebase-hooks/auth";
import { Typography, Box, Divider, Button } from "@mui/material";
import Log from "../../../components/Log";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import * as yup from "yup";
import { useFormik } from "formik";
import Loading from "../../../components/Loading";
import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const UploadPy = ({ id, data }) => {
	const [user, loading] = useAuthState(authHandle);
	const [program, setProgram] = useState(null);
	const [okFile, setOkFile] = useState(false);

	// console.log(data);
	if (loading) {
		return <Loading />;
	}
	if (!user) {
		return (
			<Box>
				<Typography variant="h6">You need to be signed in!</Typography>
				<Log />
			</Box>
		);
	}

	if (!data) {
		return (
			<Box>
				<Typography variant="h6">Invalid Document ID</Typography>
			</Box>
		);
	}
	if (user.uid != data.userid) {
		return (
			<Box sx={{ my: "3rem" }}>
				<Typography variant="h6">You do not have access to edit</Typography>
			</Box>
		);
	}
	if (data.fileAdded == true) {
		return (
			<Box sx={{ my: "3rem" }}>
				<Typography variant="h6">File already added</Typography>
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
	} = data;

	const handleChange = (e) => {
		if (e.target.files[0]) {
			const prog = e.target.files[0];
			if (prog?.type != "text/x-python") {
				alert("Enter only python files");
			}
			setProgram(prog);
			setOkFile(prog?.type == "text/x-python" || false);
		}
	};

	const updateDB = async () => {
		const fileURL = await getDownloadURL(
			ref(storageHandle, `gs://openansorg.appspot.com/py_prgs/${id}`)
		);
		await setDoc(
			doc(storeHandle, "answers", id),
			{
				fileAdded: true,
				fileURL: fileURL,
			},
			{ merge: true }
		);
	};

	const handleSubmit = async () => {
		const storageRef = ref(storageHandle, `py_prgs/${id}`);

		await uploadBytes(storageRef, program);
		updateDB();
		await setDoc(
			doc(storeHandle, "answers", id),
			{
				fileAdded: true,
				fileURL: `gs://openasnorg.appspot.com/py_prgs/${id}`,
				createdAt: new Date().toJSON().slice(0, 10).replace(/-/g, "/"),
			},
			{ merge: true }
		);
		window.location.replace(`/answers/${id}`);
	};

	// console.log(program?.type, okFile);

	return (
		<Box
			sx={{
				my: "3rem",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				width: "80%",
			}}
		>
			<Box
				sx={{
					my: "1rem",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					width: "70%",
				}}
			>
				<Typography variant="h5">Upload Program</Typography>
				<Box
					sx={{
						width: "90%",
						my: "1rem",
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-around",
						alignItems: "center",
						flexWrap: "wrap",
					}}
				>
					<Box sx={{ display: "flex", flexDirection: "column" }}>
						<Button variant="outlined" component="label">
							Choose File
							<input type="file" accept=".py" hidden onChange={handleChange} />
						</Button>
						<Typography variant="caption">Only upload .py files</Typography>
					</Box>
					{okFile == true ? (
						<Button
							variant="contained"
							component="label"
							sx={{ my: "2rem" }}
							endIcon={<FileUploadIcon />}
							onClick={handleSubmit}
						>
							Upload File
						</Button>
					) : (
						<Button
							variant="contained"
							component="label"
							sx={{ my: "2rem" }}
							endIcon={<FileUploadIcon />}
							onClick={handleSubmit}
							disabled
						>
							Upload File
						</Button>
					)}
					{/* <Button
						variant="contained"
						component="label"
						sx={{ my: "2rem" }}
						endIcon={<FileUploadIcon />}
						onClick={handleSubmit}
						disabled
					>
						Upload File
					</Button> */}
				</Box>
			</Box>

			<Divider />
			<Typography variant="h4">Details</Typography>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "flex-start",
					width: "70%",
				}}
			>
				<Box sx={{ my: "1rem", width: "100%" }}>
					<Typography
						variant="h6"
						sx={{
							opacity: 0.7,
						}}
					>
						Title:
					</Typography>
					<Typography variant="h5">{title}</Typography>
				</Box>
				<Box sx={{ my: "1rem" }}>
					<Typography
						variant="h6"
						sx={{
							opacity: 0.7,
						}}
					>
						Description:
					</Typography>
					<Typography variant="h5">{desc}</Typography>
				</Box>
				<Box sx={{ my: "1rem" }}>
					<Typography
						variant="h6"
						sx={{
							opacity: 0.7,
						}}
					>
						Function Name:
					</Typography>
					<Typography variant="h5">{functionName}</Typography>
				</Box>
				<Box sx={{ my: "1rem" }}>
					<Typography
						variant="h6"
						sx={{
							opacity: 0.7,
						}}
					>
						Number of Variables:
					</Typography>
					<Typography variant="h5">{numberOfVariables}</Typography>
				</Box>
				<Box sx={{ my: "1rem" }}>
					<Typography
						variant="h6"
						sx={{
							opacity: 0.7,
						}}
					>
						Variables Description:
					</Typography>
					<Typography variant="h5">{variablesDesc}</Typography>
				</Box>
				<Box sx={{ my: "1rem" }}>
					<Typography
						variant="h6"
						sx={{
							opacity: 0.7,
						}}
					>
						Example Function Call:
					</Typography>
					<Typography variant="h5">{exampleCall}</Typography>
				</Box>
			</Box>
		</Box>
	);
};

export async function getServerSideProps({ resolvedUrl }) {
	const ansid = resolvedUrl.replace("/create/", "");
	const docRef = doc(storeHandle, "answers", ansid);
	const docSnap = await getDoc(docRef);
	// console.log("Document data:", docSnap.data());
	return {
		props: {
			id: ansid,
			data: docSnap.data() || null,
		},
	};
}

export default UploadPy;
