const localtunnel = require('localtunnel')
const debugTunnel = require('debug')('tunnel')

export async function getTunnulURL() {
	debugTunnel('Initiating tunneling ')
	const tunnel = await localtunnel({ port: 3000 })
	debugTunnel('Tunneling started ')

	// the assigned public url for your tunnel
	// i.e. https://abcdefgjhij.localtunnel.me
	tunnel.on('close', () => {
		debugTunnel('Closing tunneling')
	})
	return tunnel.url
}

export function resourceNeeded(baseURL) {
	let resources = baseURL.split('/')
	let len = resources.length
	let neededResouces = ['news']
	let itInclude = false
	itInclude = neededResouces.includes(resources[len - 1])
	if (itInclude) return resources[len - 1]
	itInclude = neededResouces.includes(resources[len - 2])
	if (itInclude) return resources[len - 2]
	return 'jibrish'
}
