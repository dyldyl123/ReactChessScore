import MoveNumber from "./MoveNumber"
import SubVariation from "./SubVariation"

// export default function Mainline({ mainline, sub }) {
//   const renderedMainLine = mainline.map((move) => {
//     return <div className="Line"> {move} </div>;
//   });

//   return (
//     <div className="analysis">
//       <div className="mainline-box">
//         {renderedMainLine}

//         <SubVariation line = {sub}/>
//       </div>
//     </div>
//   );
// }
export default function Mainline({ mainline, sub }) {
	let otherRender = []
	for (let key of mainline) {
		if (key.type === "mainline") {
			if (key.start_move) {
				otherRender.push(<MoveNumber variation="false" number={key.start_move} />)
			}
			for (let i = 0; i < key.moves.length; i++) {
				if (i > 0 && i % 2 === 0) {
					otherRender.push(<MoveNumber variation="false" number={key.start_move + i / 2} />)
				}

				otherRender.push(<div className="Line"> {key.moves[i]}</div>)
			}
		}
		if (Array.isArray(key) && key[0]?.type === "variation") {
			otherRender.push(<SubVariation data={key} />)
		}
		if (key.type === "mainlineCont") {
			if (key.start_move) {
				otherRender.push(<MoveNumber colour={key.colour} variation="false" number={key.start_move} />)
			}

			if (key.colour === "black") {
				otherRender.push(<div className="Line">...</div>)
			}
			for (let i = 0; i < key.moves.length; i++) {
				if (key.colour === "white" && i > 0 && i % 2 === 0) {
					otherRender.push(<MoveNumber variation="false" number={key.start_move + i / 2} />)
				} else if (key.colour === "black" && i + 1 > 0 && (i + 1) % 2 === 0) {
					otherRender.push(<MoveNumber variation="false" number={key.start_move + (i + 1) / 2} />)
				}
				otherRender.push(<div className="Line"> {key.moves[i]}</div>)
			}
			if (key.moves.length % 2 === 1) {
				otherRender.push(<div className="Line">...</div>)
			}
		}
	}

	// const renderedMainLine = mainline.map((move) => {
	//   return <div className="Line"> {move} </div>;
	// });

	return (
		<div className="analysis">
			<div className="mainline-box">{otherRender}</div>
		</div>
	)
}
