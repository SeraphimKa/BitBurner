/** @param {NS} ns */
export async function main(ns) {
    let servers = ns.scan()

    for (let server of servers) {
        let scanServers = ns.scan(server)
        for (let scanServer of scanServers) {
            if (!servers.includes(scanServer) && scanServer !== 'home') {
                servers.push(scanServer)
            }
        }
    }
    let text = ''
    for (let server of servers) {
        text += `${server}\n`
    }
    text.trim
    ns.rm('servers.txt')
    ns.write('servers.txt', text, 'w')
}