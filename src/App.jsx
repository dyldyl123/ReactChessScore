import TreeView, { flattenTree } from "react-accessible-treeview"
import ChessTree from "./components/ChessTree.jsx"
import data from "./data"

class Node {
	constructor(move, parent = null) {
		this.name = move.notation.notation
		this.children = []
		if (parent) {
			parent.children.push(this)
		}
	}
}

const treeify = (moves) => {
	let result = []
	let [first, ...rest] = moves
	const firstNode = new Node(first)
	result.push(firstNode)

	for (let move of rest) {
		new Node(move, firstNode)
		if (move.variations) {
			for (let variation of move.variations) {
				firstNode.children = [...firstNode.children, ...treeify(variation)]
			}
		}
	}

	for (let variation of first.variations) {
		result.push(...treeify(variation))
	}

	return result
}

const treeData = flattenTree({
	children: treeify(data[0].moves),
})

export default function App() {
	return (
		<div>
			{/* <TreeView
        data={treeData}
        className="basic"
        aria-label="basic example tree"
        nodeRenderer={({ element, getNodeProps, level, handleSelect }) => (
          <div {...getNodeProps()} style={{ paddingLeft: 20 * (level - 1) }}>
            {element.name}
          </div>
        )}
      /> */}
			<ChessTree data={treeData} />
		</div>
	)
}
