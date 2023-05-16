/** @param {NS} ns */
export async function main(ns) {

    const target = "foodnstuff";

    const moneyThresh = ns.getServerMaxMoney(target) * 0.90;
    const securityThresh = ns.getServerMinSecurityLevel(target) + 5;
    ns.run('crawler.js')

    ns.run('checkPortTools.js')
    const portTools = ns.read('portTools.txt')

    const servers = ns.read('servers.txt').split('\n')
    const rooted = []
    await (ns.sleep(1000))
    for (let server of servers) {
        if (server !== '') {
            if (portTools >= ns.getServerNumPortsRequired(server)) {
                ns.run("root.js", 1, portTools, server)
                rooted.push(server)
                await (ns.sleep(100))
            }
        }
    }
    ns.run('runFn.js', 1, 'ctrlCenter.js', ...rooted)
}