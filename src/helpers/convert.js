export const moneyFormat = (value) => {
	var parts = value.toString().split(".");
	return (
		parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
		(parts[1] ? "." + parts[1] : "")
	);
};
