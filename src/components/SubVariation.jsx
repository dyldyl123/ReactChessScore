export default function SubVariation({ line, colour, start_move }) {
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

	return (
		<div className="interrupt">
			<div className="interrupt-lines">{renderedSubVariation}</div>
		</div>
	)
}
