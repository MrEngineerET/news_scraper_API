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
