import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	sliderCustomArrowPrev: {
		cursor: "pointer",
		position: "absolute",
		top: "45%",
		left: 0,
		zIndex: 10,
	},

	sliderCustomArrowNext: {
		cursor: "pointer",
		position: "absolute",
		top: "45%",
		right: 0,
		zIndex: 10,
	},
}));

const CustomArrowNext = (props) => {
	const classes = useStyles();
	const { onClick } = props;
	return (
		<div className={classes.sliderCustomArrowNext} onClick={onClick}>
			<img
				style={{ height: "24px" }}
				src={`${process.env.PUBLIC_URL}/img/arrow-jump-right.png`}
				alt="Prev icon"
			/>
		</div>
	);
};
export default CustomArrowNext;
