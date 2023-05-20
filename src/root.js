/** @param {NS} ns */
export async function main(ns) {
    if (ns.args) {
        const portTools = Number(ns.peek(2))
        const server = ns.args[0]

        if (portTools >= 1)
            ns.brutessh(server)
        if (portTools >= 2)
            ns.ftpcrack(server)
        if (portTools >= 3)
            ns.relaysmtp(server)
        if (portTools >= 4)
            ns.httpworm(server)
        if (portTools == 5)
            ns.sqlinject(server)
        ns.nuke(server)
        ns.toast(`${server} Rooted`)
    }
    else {
        ns.toast('Error: root.js requires #port-tools & hostname')
    }
}