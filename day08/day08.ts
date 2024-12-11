
interface Node {
    left: string
    right: string
}

type Network = { [name: string]: Node }

export function parseNetwork(network: string): Network {
    const networkRx = /^(\w+)\s=\s\((\w+),\s(\w+)\)$/g
    console.log('networkRx', networkRx)

    const net: Network = {}
    const lines = network.split('\n')
    for (const line of lines) {
        const matches = [...line.matchAll(networkRx)][0]

        console.log(matches)
        const [_, name, left, right] = matches

        net[name] = { left, right }

    }

    return net
}

/*
RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)
*/

export function followMap(mapString: string): number {

    const [instructionsString, networkString] = mapString.split('\n\n')

    const net = parseNetwork(networkString)

    let currentNode = 'AAA'
    for (let i = 0; ; i++) {

        if (currentNode === 'ZZZ') {
            return i
        }

        const idx = i % instructionsString.length
        const dir = instructionsString[idx]

        if (dir === 'L') {
            currentNode = net[currentNode].left
        } else {
            currentNode = net[currentNode].right
        }
    }
}

// So we need to find the cycle counts for each starting thing
// what makes a cycle?
// has to be bigger than the length of instructionsString
// then we can find the LCM for all the cycles that lead to a Z?
// If we get to the same Z at the same MOD i, then that's a cycle
// could you have a cycle that's multiple i*n's? YES. in example one cycle is 2 and one is 3 n=2
// following the left/rights creates an array. how do you know if there is a cycle in a forever list?
// we're making a linked list, n -> next, 

// could just track final spots and see if we are cycling on the same period?

interface CycleTracker {
    currentNode: string
    zhits: { [name: string]: number[]}
}

export function followMapGhosts(mapString: string): number {

    const [instructionsString, networkString] = mapString.split('\n\n')

    const net = parseNetwork(networkString)

    let firstNodes: string[] = Object.keys(net).filter(n => n.endsWith('A'))

    let trackers: CycleTracker[] = firstNodes.map((n) => ({currentNode: n, zhits: {}}))
    // keep going until all Zs in path are in cycles?
    for (let i = 0; i < instructionsString.length * 1000; i++) {

        const idx = i % instructionsString.length
        const dir = instructionsString[idx]

        for (let j = 0; j < trackers.length; j++) {

            const tracker = trackers[j]
            const current = tracker.currentNode

            if (current.endsWith('Z')) {
                if (tracker.zhits[current] === undefined){ 
                    tracker.zhits[current] = []
                }
                tracker.zhits[current].push(i)
            }

            if (dir === 'L') {
                tracker.currentNode = net[tracker.currentNode].left
            } else {
                tracker.currentNode = net[tracker.currentNode].right
            }
        }

    }
    console.log('TRACKERS', trackers)

    for (const tracker of trackers) {
        const hitZs = Object.keys(tracker.zhits)
        for (const hitZ of hitZs) {
            console.log(hitZ)
            for (let k = 0; k < tracker.zhits[hitZ].length - 1; k++) {
                console.log(tracker.zhits[hitZ][k + 1] - tracker.zhits[hitZ][k])
            }
        }
    }


}

// TBZ: 21883 -> 43766 == 21883
// LQZ: 13019 -> 26038 === 13019
// QDZ: 19667 -> 39334 === 19667
// ZZZ : === 16343
// FNZ: === 18559
// FQZ: === 14681



export async function day08() {
    let input = await Bun.file('day08/day08.input').text()
    input = input.trim()

    const count = followMap(input)

    const ghostCount = followMapGhosts(input)

    console.log('day08a:', count)
    console.log('day08b:', '15,299,095,336,639') // LCM of the periods

}
