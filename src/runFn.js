/** @param {NS} ns */
export async function main(ns) {
    if (ns.args[0]) {
        if (ns.args[2]) {
            const script = ns.args[0]
            const threads = ns.args[1]
            ns.run(script, threads, ...ns.args.slice(2));
        }
        else {
            ns.run(ns.args[0]);
        }
    }
    else
        ns.toast("Error: runFn.js requires target function as arg");
}