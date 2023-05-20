/** @param {NS} ns */
export async function main(ns) {
    await ns.sleep(1000)
    if (ns.args.length === 2) {
        let threads = ns.args[0];
        const targetServer = ns.args[1];
        let action = 'hack'
        ns.run(action + '.js', threads, targetServer);

        while (true) {
            let instructions = ns.peek(1)

            if (instructions != action) {
                ns.scriptKill(action + '.js', ns.getHostname())
                action = instructions
                ns.run(action + '.js', threads, targetServer)
            }
            while (!ns.scriptRunning(action + '.js', ns.getHostname())) {
                threads = Math.floor(threads * 0.95)
                ns.run(action + '.js', threads, targetServer)
            }
            await ns.sleep(10000)
        }
    }

    else {
        ns.tprint(`Error: head.js arguments required: 'targetServer' 'threads' - ${ns.getHostname()} ${ns.args}`);
        ns.print(`Error: head.js arguments required: 'targetServer' 'threads' - ${ns.args}`)
    }
}