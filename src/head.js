/** @param {NS} ns */
export async function main(ns) {
    if (ns.args.length === 3) {
        const threads = ns.args[0];
        const targetServer = ns.args[1];
        let action = ns.args[2];
        ns.run(action + '.js', threads, targetServer);

        while (true) {
            let instructions = ns.peek(1)

            if (instructions != action) {
                ns.scriptKill(action + '.js', ns.getHostname())
                action = instructions
                ns.run(action + '.js', threads, targetServer);
            }
            await ns.sleep(10000)
        }
    }

    else {
        ns.tprint(`Error: head.js arguments required: 'targetServer' 'action' 'threads' - ${ns.getHostname()} ${ns.args}`);
        ns.print("Error: head.js arguments required: 'targetServer' 'action' 'threads'")
    }
}