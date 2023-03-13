import Mainline from "./Mainline"

export default function ChessTree({ data }) {
	// this is always the main line
	let mainLine = []
	let subVariation = []
	let current = data[0]
	while (current.children[0]) {
		if (current.name !== undefined) {
			mainLine.push(current.name)
		}

		current = data[current.children[0]]
	}
	mainLine.push(current.name)
	let subVariationCurrent = data[data[0].children[1]]

	while (subVariationCurrent.children[0]) {
		subVariation.push(subVariationCurrent.name)
		subVariationCurrent = data[subVariationCurrent.children[0]]
	}
	subVariation.push(subVariationCurrent.name)
	console.log("subvarcurr")
	console.log(subVariation)

	mainLine = ["e4", "d5", "c4"]
	subVariation = ["e4", "c6", "d4"] // ["...", "c6", "d4"]

	let temp = [
		{
			type: "mainline",
			moves: ["e4", "d5"],
			start_move: 1,
		},
		{
			type: "variation",
			moves: ["e4", "c6", "d4", "d5", "d8"],
			colour: "white",
			start_move: 1,
		},
		{
			type: "variation",
			moves: ["c6", "d4", "d5", "b5", "c5"],
			colour: "black",
			start_move: 3,
		},
		{
			type: "mainlineCont",
			moves: ["d4", "dxe4", "e5", "e3"],
			start_move: 2,
		},
	]
	return (
		<div className="ChessTree">
			<Mainline mainline={temp} sub={subVariation} />
		</div>
	)
}
