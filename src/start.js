/** @param {NS} ns */
export async function main(ns) {
    ns.run('crawler.js');
    ns.run('checkPortTools.js');
    await (ns.sleep(2000))

    const portTools = ns.peek(2);
    const servers = ns.read('servers.txt').split('\n');
    const rooted = [];
    ns.run('setTargetServer.js')
    await ns.sleep(1000)
    const targetServer = ns.peek(3);
    for (let server of servers) {
        if (ns.serverExists(server)) {
            if (portTools >= ns.getServerNumPortsRequired(server)) {
                ns.run("root.js", 1, server);
                rooted.push(server);
                await (ns.sleep(100));
            }
            if (server.includes('Server')) {
                rooted.push(server)
                await (ns.sleep(100))
            }
        }
    }
    ns.run('runFn.js', 1, 'ctrlCenter.js', 1, targetServer, ...rooted);
}