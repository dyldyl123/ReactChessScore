export default function SubVariation({ line, colour, start_move, children }) {
	console.log("subvar")
	console.log(children)
	let renderedSubVariation = []
	function prepareArray(line, colour, start_move) {
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
	}

	if (children.length === 0) {
		prepareArray(line, colour, start_move)
	} else {
		for (let i = 0; i < children.length; i++) {
			prepareArray(children[i].line, children[i].colour, children[i].start)
		}
	}

	console.log("rendered")
	console.log(renderedSubVariation)

	return (
		<div className="interrupt">
			<div className="interrupt-lines">{renderedSubVariation}</div>
		</div>
	)
}
