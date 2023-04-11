import SubVariationLine from "./SubVariationLine"
import SubVariationLineWithBrackets from "./SubVariationLineWithBrackets"
import dfs from "../utils/dfs"
// this needs to be able to go 'between' needs to be injected
// if the depth of this subvariation is only 1 (eg no children) then we can bracket and between
// if the depth of this > 1 we split it onto a new line and then apply the above rule
export default function SubVariation({ data }) {
	// console.log("data coming in")
	// console.log(data)
	function prepareArray(line, colour, start_move, type) {
		let renderedSubVariation = []
		for (let i = 0; i < line?.length; i++) {
			if (colour === "black") {
				if (i === 0) {
					renderedSubVariation.push(<div className="subVarIndex">{start_move}...</div>)
					renderedSubVariation.push(<div className="move">{line[i]}</div>)
				} else {
					const digit = (i + 1) % 2 === 0 ? start_move + Math.floor(i / 2) + 1 : ""
					if (digit !== "") {
						renderedSubVariation.push(<div className="subVarIndex">{digit}.</div>)
					}
					renderedSubVariation.push(<div className="move">{line[i]}</div>)
				}
			} else {
				if (i === 0) {
					renderedSubVariation.push(<div className="subVarIndex">{start_move}.</div>)
					renderedSubVariation.push(<div className="move">{line[i]}</div>)
				} else {
					const digit = i % 2 === 0 ? start_move + Math.floor(i / 2) : ""
					if (digit !== "") {
						renderedSubVariation.push(<div className="subVarIndex">{digit}.</div>)
					}

					renderedSubVariation.push(<div className="move">{line[i]}</div>)
				}
			}
		}
		return [renderedSubVariation, type]
	}
	let lines = []

	for (let variationIndex = 0; variationIndex < data?.length; variationIndex++) {
		lines.push(prepareArray(data[variationIndex].moves, data[variationIndex].colour, data[variationIndex].start_move, "SubVariationLine"))
		// console.log(data[variationIndex].moves)
		// if variation has children
		if (data[variationIndex].children?.length > 0) {
			// counts tells us the number of children of this variation that start at a given move number
			// if that move number count >=2 it should be a seperate line
			let childrenCount = data[variationIndex].children?.length

			if (childrenCount > 1) {
				// handle SubVariationLIne
				for (let i = 0; i < data[variationIndex]?.children?.length; i++) {
					let currentChild = data[variationIndex]?.children[i]
					lines.push(prepareArray(currentChild.moves, currentChild.colour, currentChild.start_move, "SubVarationLineAtHigherDepth"))
				}
			} else {
				for (let i = 0; i < data[variationIndex]?.children?.length; i++) {
					let currentChild = data[variationIndex]?.children[i]
					currentChild.moves[0] = "(" + currentChild.moves[0]
					console.log("test")
					currentChild.moves[currentChild.length - 1] = currentChild.moves[currentChild.length - 1] + ")"
					console.log(currentChild.moves)
					let sm = data[variationIndex]?.start_move
					let childsm = currentChild.start_move
					let childcolour = currentChild.colour
					let colour = data[variationIndex].colour
					let diff = childsm - sm
					lines.push(prepareArray(currentChild.moves, currentChild.colour, currentChild.start_move, "SubVariationLineWithBrackets"))
				}
			}
			let counts = dfs(data[variationIndex], "bob")
			console.log("counts")
			console.log(counts)
		} else {
			lines.push(prepareArray(data[variationIndex].moves, data[variationIndex].colour, data[variationIndex].start_move, "SubVariationLine"))
		}
	}

	let newLines = lines.map((line) => {
		if (line[1] === "SubVariationLine") {
			return <SubVariationLine data={line[0]} />
		} else if (line[1] === "SubVariationLineWithBrackets") {
			return <SubVariationLineWithBrackets data={line[0]} />
		} else if (line[1] === "SubVarationLineAtHigherDepth") {
			return <SubVariationLineWithBrackets data={line[0]} />
		} else {
		}
	})
	// console.log("newlines")
	// console.log(newLines)
	return <div className="interrupt">{newLines}</div>
}
