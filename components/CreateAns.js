import { Typography, TextField, Box, Button, Divider } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { collection, addDoc } from "firebase/firestore";
import { storeHandle, authHandle } from "../firebase/firebaseClient";
import { useAuthState } from "react-firebase-hooks/auth";
import Log from "./Log";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Loading from "./Loading";

const validationSchema = yup.object({
	title: yup.string("Enter the title").required("Title is required"),
	desc: yup.string("Enter the description").required("Description is required"),
	functionName: yup
		.string("Enter the function name")
		.required("Exact function name is required"),
	numberOfVariables: yup
		.number("Enter the number or variables")
		.required("Number of variables is required"),
	variablesDesc: yup
		.string("Enter the Variables Description")
		.required("Variable description is required"),
	exampleCall: yup
		.string("Enter the example function call")
		.required("Example function call is required"),
});

const CreateAns = () => {
	const [user, loading] = useAuthState(authHandle);
	const formik = useFormik({
		initialValues: {
			title: "",
			desc: "",
			functionName: "",
			numberOfVariables: 0,
			variablesDesc: "",
			exampleCall: "",
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			// alert(JSON.stringify(values, null, 2));
			const docRef = await addDoc(collection(storeHandle, "answers"), {
				userid: user.uid,
				title: values.title,
				desc: values.desc,
				functionName: values.functionName,
				numberOfVariables: values.numberOfVariables,
				variablesDesc: values.variablesDesc,
				exampleCall: values.exampleCall,
				fileAdded: false,
				creatorName: user.displayName,
				creatorEmail: user.email,
				creatorImg: user.photoURL,
			});
			// console.log("Document written with ID: ", docRef.id, user);
			window.location.replace(`/create/${docRef.id}`);
		},
	});
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
	return (
		<Box
			component="form"
			sx={{
				width: "70%",
				my: "2rem",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
			noValidate
			autoComplete="off"
			onSubmit={formik.handleSubmit}
		>
			<Typography variant="h4">Create Answer</Typography>
			<TextField
				fullWidth
				id="title"
				name="title"
				label="Title"
				value={formik.values.title}
				onChange={formik.handleChange}
				error={formik.touched.title && Boolean(formik.errors.title)}
				helperText={formik.touched.title && formik.errors.title}
				sx={{ my: "1rem" }}
				variant="outlined"
			/>
			<TextField
				fullWidth
				id="desc"
				name="desc"
				label="Description"
				value={formik.values.desc}
				onChange={formik.handleChange}
				error={formik.touched.desc && Boolean(formik.errors.desc)}
				helperText={formik.touched.desc && formik.errors.desc}
				sx={{ my: "1rem" }}
				variant="outlined"
				multiline
			/>
			<Typography variant="caption">
				Include keywords for better search visibility
			</Typography>
			<TextField
				fullWidth
				id="functionName"
				name="functionName"
				label="Function Name"
				value={formik.values.functionName}
				onChange={formik.handleChange}
				error={
					formik.touched.functionName && Boolean(formik.errors.functionName)
				}
				helperText={formik.touched.functionName && formik.errors.functionName}
				sx={{ my: "1rem" }}
				variant="outlined"
				multiline
			/>
			<TextField
				fullWidth
				id="numberOfVariables"
				name="numberOfVariables"
				label="Number Of Variables"
				value={formik.values.numberOfVariables}
				onChange={formik.handleChange}
				error={
					formik.touched.numberOfVariables &&
					Boolean(formik.errors.numberOfVariables)
				}
				helperText={
					formik.touched.numberOfVariables && formik.errors.numberOfVariables
				}
				sx={{ my: "1rem" }}
				variant="outlined"
				multiline
			/>
			<TextField
				fullWidth
				id="variablesDesc"
				name="variablesDesc"
				label="Variables Description"
				value={formik.values.variablesDesc}
				onChange={formik.handleChange}
				error={
					formik.touched.variablesDesc && Boolean(formik.errors.variablesDesc)
				}
				helperText={formik.touched.variablesDesc && formik.errors.variablesDesc}
				sx={{ my: "1rem" }}
				variant="outlined"
				multiline
			/>
			<TextField
				fullWidth
				id="exampleCall"
				name="exampleCall"
				label="Example Function Call"
				value={formik.values.exampleCall}
				onChange={formik.handleChange}
				error={formik.touched.exampleCall && Boolean(formik.errors.exampleCall)}
				helperText={formik.touched.exampleCall && formik.errors.exampleCall}
				sx={{ my: "1rem" }}
				variant="outlined"
				multiline
			/>
			<Divider />
			<Button
				color="primary"
				variant="contained"
				type="submit"
				sx={{ my: "1rem" }}
				endIcon={<ChevronRightIcon />}
			>
				Next
			</Button>
		</Box>
	);
};

export default CreateAns;
