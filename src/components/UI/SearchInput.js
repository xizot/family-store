import { alpha, InputBase, makeStyles } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { useRef } from "react";
import { isNotEmpty } from "../../helpers/validate";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
	root: {
		position: "relative",
		borderRadius: theme.shape.borderRadius,
		border: (props) => (props?.border ? "1px solid #ddd" : "none"),
		backgroundColor: (props) =>
			props.backgroundColor || alpha(theme.palette.common.white, 0.15),
		"&:hover": {
			backgroundColor: (props) =>
				props.backgroundColor ||
				alpha(theme.palette.common.white, 0.25),
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: "100%",
		position: "absolute",
		top: 0,
		left: 0,
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	inputRoot: {
		color: "inherit",
		width: "100%",
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create("width"),
		width: "100%",
	},
}));

const SearchInput = ({ border }) => {
	const history = useHistory();
	const classes = useStyles({ border });
	const searchRef = useRef("");

	const formSubmitHandler = (e) => {
		e.preventDefault();
		const enteredSearch = searchRef.current?.value;
		if (!isNotEmpty(enteredSearch)) {
			return;
		}
		history.push(`/search?q=${enteredSearch}`);
	};

	return (
		<form className={classes.root} onSubmit={formSubmitHandler}>
			<div className={classes.searchIcon}>
				<Search />
			</div>
			<InputBase
				placeholder="What Are You Looking For?"
				classes={{
					root: classes.inputRoot,
					input: classes.inputInput,
				}}
				inputProps={{ "aria-label": "search" }}
				inputRef={searchRef}
			/>
		</form>
	);
};

export default SearchInput;
