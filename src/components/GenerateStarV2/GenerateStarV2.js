import { makeStyles } from "@material-ui/core";
import { StarBorderRounded, StarRounded } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		alignItems: "center",
		listStyle: "none",
	},
	totalReviewed: {
		marginLeft: theme.spacing(2),
		[theme.breakpoints.down("xs")]: {
			marginLeft: theme.spacing(1),
		},
	},
}));
const GenerateStarV2 = ({ numOfStar, rootCustom, onChangeStar }) => {
	const classes = useStyles();
	return (
		<ul className={`${classes.root} ${rootCustom || ""}`}>
			{[...Array(numOfStar)].map((_, index) => (
				<li key={index}>
					<StarRounded
						color="primary"
						fontSize="small"
						onClick={() => onChangeStar(index + 1)}
					/>
				</li>
			))}
			{[...Array(5 - numOfStar)].map((_, index) => (
				<li key={numOfStar + index + 1}>
					<StarBorderRounded
						color="primary"
						fontSize="small"
						onClick={() => onChangeStar(numOfStar + index + 1)}
					/>
				</li>
			))}
		</ul>
	);
};

export default GenerateStarV2;
