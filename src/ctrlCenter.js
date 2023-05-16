/** @param {NS} ns */
export async function main(ns) {
    const servers = ns.args.slice(1);
    for (let server of servers) {
        ns.scp('hack.js', server);
        ns.scp('weaken.js', server);
        ns.scp('grow.js', server);
        ns.scp('runFn.js', server);
        ns.scp('head.js', server);
        ns.toast(`Deployed to ${server}`);
        await (ns.sleep(100));
    }
    const targetServer = 'foodnstuff';
    let restart = false;
    setTimeout(() => {
        restart = true;
    }, 600000);
    let action = 'hack';
    while (!restart) {
        for (let server of servers) {
            if (ns.getServerSecurityLevel(targetServer) > 5)
                action = 'weaken';
            else if (ns.getServerMoneyAvailable(targetServer) < ns.getServerMaxMoney(server) * 0.9)
                action = 'grow';
            else
                action = 'hack';
            let threads = Math.floor((ns.getServerMaxRam(server) / 1.75) - 2.60);
            ns.killall(server);
            ns.exec('runFn.js', server, 1, 'head.js', 1, threads, targetServer, action);
        }
        await (ns.sleep(10000));
    }
    ns.toast("Control Center restarting...");
}