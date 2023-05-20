/** @param {NS} ns */
export async function main(ns) {
    const portTools = ns.peek(2)

    const hacklevel = ns.getHackingLevel()

    let targetServer

    ns.tprint(`hack lvl: ${hacklevel}, port tools: ${portTools}`)
    if (portTools >= 3) {
        if (hacklevel >= 600)
            targetServer = 'computek'
    }
    else if (portTools >= 2) {
        if (hacklevel >= 400)
            targetServer = "omega-net"
        else if (hacklevel >= 300)
            targetServer = "silver-helix"
        else if (hacklevel >= 200)
            targetServer = "phantasy"
        else
            targetServer = "joesguns"
    }
    else if (portTools >= 1 && hacklevel >= 160)
        targetServer = "max-hardware"
    else
        targetServer = "foodnstuff"

    ns.clearPort(3)
    ns.writePort(3, targetServer)
}