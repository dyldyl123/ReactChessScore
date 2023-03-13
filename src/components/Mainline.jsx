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
		console.log(key)
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
		if (key.type === "variation") {
			otherRender.push(<SubVariation line={key.moves} colour={key.colour} start_move={key.start_move} />)
		}
		if (key.type === "mainlineCont") {
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
	}
	console.log(otherRender)
	// const renderedMainLine = mainline.map((move) => {
	//   return <div className="Line"> {move} </div>;
	// });

	return (
		<div className="analysis">
			<div className="mainline-box">{otherRender}</div>
		</div>
	)
}
