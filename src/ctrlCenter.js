/** @param {NS} ns */
export async function main(ns) {
    const servers = ns.args.slice(1);
    ns.tprint(servers)

    for (let server of servers) {
        ns.scp(['hack.js', 'weaken.js', 'grow.js', 'runFn.js', 'head.js'], server)
        ns.toast(`Deployed to ${server}`);
        await (ns.sleep(100));
    }
    const targetServer = ns.args[0];
    const portTools = ns.peek(2)

    let action = 'hack';

    for (let server of servers) {
        let threads = Math.floor(ns.getServerMaxRam(server) / ns.getScriptRam('hack.js') - ns.getScriptRam('head.js'))
        ns.killall(server)
        if (threads > 0) {
            await (ns.sleep(1000))
            ns.tprint(`${server}: -MaxRAM: ${ns.getServerMaxRam(server)} - args: threads: ${threads}, target: ${targetServer}`)
            ns.exec('runFn.js', server, 1, 'head.js', 1, threads, targetServer);
        }
    }
    while (true) {
        if (ns.getServerSecurityLevel(targetServer) >= 10 + ns.getServerMinSecurityLevel(targetServer))
            action = 'weaken';
        else if (ns.getServerMoneyAvailable(targetServer) < ns.getServerMaxMoney(targetServer) * 0.9)
            action = 'grow';
        else
            action = 'hack';
        ns.clearPort(1)
        ns.writePort(1, action)

        await ns.sleep(20000)
        ns.run('setTargetServer.js')
        ns.run('checkPortTools.js')
        await (ns.sleep(1000))
        let newTarget = ns.peek(3)

        if (targetServer != newTarget) {
            ns.tprint(`Target changed: ${targetServer} -> ${newTarget}  Rebooting service...`)
            ns.spawn('start.js')
        }
        if (portTools != ns.peek(2)) {
            ns.tprint(`PortTools updated  Rebooting service...`)
            ns.spawn('start.js')
        }
    }
}