/** @param {NS} ns */
export async function main(ns) {
    if (ns.args.length === 3) {
        const threads = ns.args[0];
        const targetServer = ns.args[1];
        const action = ns.args[2];
        while (true) {
            ns.run(action + '.js', threads, targetServer);
            await (ns.sleep(100));
        }
    }
    else
        ns.toast("Error: head.js arguments required: 'targetServer' 'action' 'threads'");
}