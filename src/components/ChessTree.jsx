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

	mainLine = ["e4", "d5", "c4"]
	subVariation = ["e4", "c6", "d4"] // ["...", "c6", "d4"]

	let temp = [
		{
			type: "mainline",
			moves: ["e4", "d5"],
			start_move: 1,
		},
		[
			{
				type: "variation",
				moves: ["c6", "d4", "d5", "f3"],
				colour: "black",
				start_move: 1,
				children: [],
			},
			{
				type: "variation",
				moves: ["b5", "b3"],
				colour: "black",
				start_move: 1,
				children: [{ type: "variation", moves: ["blah", "blah"], colour: "black", start_move: 3, children: [] }],
			},
		],
		{
			type: "mainlineCont",
			final: false,
			colour: "white",
			moves: ["d4"],
			start_move: 2,
		},
		[
			{
				type: "variation",
				moves: ["d3", "d4", "e5"],
				colour: "white",
				start_move: 2,
				children: [],
			},
		],
		{
			type: "mainlineCont",
			final: true,
			colour: "black",
			moves: ["dxe4", "d5", "e6"],
			start_move: 2,
		},
	]
	return (
		<div className="ChessTree">
			<Mainline mainline={temp} sub={subVariation} />
		</div>
	)
}

//1. e4 d5 (1... c6 2. d4 d5 3. f3) (1... b5 2. b3) 2. d4 (2. d3 d4 3. e5) 2... dxe4 3. d5 e6
