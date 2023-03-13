export default function MoveNumber({ variation, number }) {
	if (variation === "false") {
		return <div className="Index">{number}</div>
	} else {
		return <div>...</div>
	}
}
