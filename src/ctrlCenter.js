/** @param {NS} ns */
export async function main(ns) {
    const servers = ns.args.slice(1);

    for (let server of servers) {
        ns.scp(['hack.js', 'weaken.js', 'grow.js', 'runFn.js', 'head.js'], server)
        ns.toast(`Deployed to ${server}`);
        await (ns.sleep(100));
    }
    const targetServer = ns.args[0];

    let action = 'hack';
    for (let server of servers) {
        if (ns.getServerSecurityLevel(targetServer) > 10 + ns.getServerMinSecurityLevel(targetServer))
            action = 'weaken'
        else if (ns.getServerMoneyAvailable(targetServer) < ns.getServerMaxMoney(targetServer) * 0.9)
            action = 'grow';
        else
            action = 'hack';
        let threads = Math.floor((ns.getServerMaxRam(server) / ns.getScriptRam('hack.js')) - ns.getScriptRam('head.js'));
        ns.killall(server)
        await (ns.sleep(10))
        ns.tprint(`${server} - args :${threads} ${targetServer} ${action}`)
        ns.exec('runFn.js', server, 1, 'head.js', 1, threads, targetServer, action);
    }
    while (true) {
        if (ns.getServerSecurityLevel(targetServer) >= 10 + ns.getServerMinSecurityLevel(targetServer))
            action = 'weaken'
        else if (ns.getServerMoneyAvailable(targetServer) < ns.getServerMaxMoney(targetServer) * 0.9)
            action = 'grow';
        else
            action = 'hack';
        ns.clearPort(1)
        ns.writePort(1, action)

        await ns.sleep(20000)
    }
}