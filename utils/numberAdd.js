const addNum = (num1, num2) => {
	let sq1, sq2, multiple;
	try {
		sq1 = num1.toString().split(".")[1].length;
	} catch (e) {
		sq1 = 0;
	}
	try {
		sq2 = num2.toString().split(".")[1].length;
	} catch (e) {
		sq2 = 0;
	}
	multiple = Math.pow(10, Math.max(sq1, sq2) + 1);
	return (num1 * multiple + num2 * multiple) / multiple;
}
export default addNum