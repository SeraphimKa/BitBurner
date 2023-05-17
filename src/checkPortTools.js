/** @param {NS} ns */
export async function main(ns) {
    let portTools = 0;
    if (ns.fileExists("BruteSSH.exe")) {
        portTools++;
    }
    if (ns.fileExists("FTPCrack.exe")) {
        portTools++;
    }
    if (ns.fileExists("RelaySMTP.exe")) {
        portTools++;
    }
    if (ns.fileExists("HTTPWorm.exe")) {
        portTools++;
    }
    if (ns.fileExists("SQLInject.exe")) {
        portTools++;
    }
    ns.write('portTools.txt', portTools, 'w');
}