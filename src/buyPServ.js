/** @param {NS} ns */
export async function main(ns) {
    let servers = ns.getPurchasedServers()
    while (servers.length < 25) {
        if (ns.getServerMoneyAvailable('home') > 2 * ns.getPurchasedServerCost(16))
            ns.purchaseServer(`Server-${ns.getPurchasedServerLimit.length}`, 16)
        else
            await ns.sleep(100000)
        await ns.sleep(50)
        servers = ns.getPurchasedServers()
    }

    servers = ns.getPurchasedServers()

    for (let i = 5; i <= 20; i += 5) {
        let ram = 2 ** i
        for (let server of servers) {
            let upgraded = false
            if (ns.getServerMaxRam(server) < ram) {
                while (!upgraded) {
                    if (ns.upgradePurchasedServer(server, ram))
                        upgraded = true
                    else
                        await ns.sleep(100000)
                    await ns.sleep(50)
                }
            }
        }
    }
}