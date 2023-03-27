export default function MoveNumber({ colour, variation, number }) {
	if (variation === "false") {
		return <div className="Index">{number}</div>
	} else {
		return <div>...</div>
	}
}
