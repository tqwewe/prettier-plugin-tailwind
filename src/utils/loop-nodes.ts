export default function loopNodes(node: any, fn: (node: any) => any) {
	if (node && typeof node === 'object' && typeof node.type === 'string') {
		node = fn(node)
	}

	if (node && typeof node === 'object') {
		const entries = Object.entries(node)
		for (const [key, child] of entries) {
			node[key] = loopNodes(child, fn)
		}
	}

	return node
}
