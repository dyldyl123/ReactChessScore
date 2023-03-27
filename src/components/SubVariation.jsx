import SubVariationLine from "./SubVariationLine"

export default function SubVariation({ data, line, colour, start_move, children }) {
	function prepareArray(line, colour, start_move) {
		let renderedSubVariation = []
		for (let i = 0; i < line.length; i++) {
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
		return renderedSubVariation
	}
	let lines = []

	for (let variationIndex = 0; variationIndex < data.length; variationIndex++) {
		lines.push(prepareArray(data[variationIndex].moves, data[variationIndex].colour, data[variationIndex].start_move))
	}

	let newLines = lines.map((line) => <SubVariationLine data={line} />)

	return <div className="interrupt">{newLines}</div>
}
