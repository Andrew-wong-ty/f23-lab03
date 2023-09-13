import { newArrayIntQueue } from "../src/arrayqueue";
import { newLinkedListIntQueue } from "../src/linkedlistqueue.js";

// pick one queue implementation, can run test easily for both, due to subtype polymorphism
// let createQueue = newLinkedListIntQueue
let createQueue = newArrayIntQueue

// TODOs:
// write more test cases to test dequeue and clear functions.

test("test clear: after clearing, the queue should be empty", () => {
    const queue = createQueue()
    queue.enqueue(1)
    queue.enqueue(2)
    queue.clear()
    expect(queue.isEmpty()).toBeTruthy();
})

test("test ensureCapacity: enque and deque until tail index is smaller than head index", () => {
    const queue = createQueue()
    const enqueTestCases1 = [0,1,2,3,4,5,6,7,8,9]
    const enqueTestCases2 = [10,11,12,13,14,15,16,17,18,19]
    const answer = [5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]
    enqueTestCases1.forEach(item => {
        queue.enqueue(item)
    })
    let dequeTimes = 5
    while(dequeTimes-->0) {
        queue.dequeue()
    }
    enqueTestCases2.forEach(item => {
        queue.enqueue(item)
    })
    answer.forEach(item => {
        const popItem = queue.dequeue()
        expect(popItem).toEqual(item)
    })
})

test("test dequeue: when queue is empty, return null", () => {
    expect(createQueue().dequeue()).toBeNull()
})

test("test isEmpty: newly created list should be empty", () => {
    expect(createQueue().isEmpty()).toBeTruthy()
})

test("test isEmpty: list with 1 element is not empty", () => {
    const queue = createQueue()
    queue.enqueue(2)
    expect(queue.isEmpty()).toBeFalsy()
})

test("test peek: newly created list should peek null", () => {

    expect(createQueue().peek()).toBeNull()
})
// ? isn's the first added one? (head)
test("test peek: queue with 2 element should peek the one that was most recently added", () => {
    const queue = createQueue()
    queue.enqueue(2)
    queue.enqueue(3)
    expect(queue.peek()).toEqual(3)
})

let param = [5, 10, 1000000]
// parameterized test, apply to each value of the parameter
test.each(param)("test enqueue: enqueued number %d is correct", (nr) => {
    const queue = createQueue()
    queue.enqueue(nr)
    expect(queue.peek()).toBe(nr)
})

// can nest tests with shared descriptions for better readability
describe("test size: ", ()=> {
    test("1 entry", ()=>{
        const queue = createQueue()
        queue.enqueue(5)
        expect(queue.size()).toBe(1)
    })

    test("11 entries", ()=>{
        const queue = createQueue()
        for (let i =0;i<11;i++)
            queue.enqueue(i)
        expect(queue.size()).toBe(11)
    })
})