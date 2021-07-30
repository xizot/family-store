import { makeStyles, Typography } from "@material-ui/core";
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
const GenerateStar = ({ numOfStar, rootCustom, totalReviewed }) => {
	const classes = useStyles();
	return (
		<ul className={`${classes.root} ${rootCustom}`}>
			{[...Array(numOfStar)].map((_, index) => (
				<li key={index}>
					<StarRounded color="primary" fontSize="small" />
				</li>
			))}
			{[...Array(5 - numOfStar)].map((_, index) => (
				<li key={numOfStar + index - 1}>
					<StarBorderRounded color="primary" fontSize="small" />
				</li>
			))}
			{(totalReviewed || totalReviewed === 0) && (
				<li>
					<Typography
						variant="caption"
						className={classes.totalReviewed}
						color="primary"
					>
						({totalReviewed})
					</Typography>
				</li>
			)}
		</ul>
	);
};

export default GenerateStar;
