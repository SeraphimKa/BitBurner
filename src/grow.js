/** @param {NS} ns */
export async function main(ns) {
    const server = ns.args[0] || 'foodnstuff';
    while (true)
        await ns.grow(server)
}