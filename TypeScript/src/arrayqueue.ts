import { IntQueue } from './queue'

/**
 * A resizable-array implementation of the {@link IntQueue} interface. The head of
 * the queue starts out at the head of the array, allowing the queue to grow and
 * shrink in constant time.
 *
 * TODO: This implementation contains two bugs! Use your tests to determine the
 * source of the bugs and correct them!
 *
 * @author Alex Lockwood
 * @author Ye Lu
 * @author Christian Kaestner
 */
function newArrayIntQueue (): IntQueue {
  /**
     * An array holding this queue's data
     */
  let elementData: number[] = []

  /**
     * Index of the next dequeue-able value
     */
  let head: number = 0

  /**
     * Current size of queue
     */
  let size: number = 0

  /**
     * The initial size for new instances of ArrayQueue
     */
  const INITIAL_SIZE = 10

  /**
     * Constructs an empty queue with an initial capacity of ten.
     *
     * Note, this is somewhat artificial translation from the Java code
     * where arrays always have a fixed size. Here we simulate fixed size
     * array's by sealing them. Typically one would just take advantage of
     * the existing flexibility of JavaScript arrays that are always dynamic,
     * but then this Queue implementation would be kind of trivial.
     */
  elementData = new Array(INITIAL_SIZE)
  elementData.fill(0)
  Object.seal(elementData)

  /**
     * Increases the capacity of this <tt>ArrayIntQueue</tt> instance, if
     * necessary, to ensure that it can hold at least size + 1 elements.
     */
  function ensureCapacity (): void {
    if (size === elementData.length) {
      const oldCapacity = elementData.length
      const newCapacity = 2 * oldCapacity + 1
      const newData: number[] = new Array(newCapacity)
      newData.fill(0)
      Object.seal(newData)
      for (let i = head; i < oldCapacity; i++) {
        newData[i - head] = elementData[i]
      }
      for (let i = 0; i < head; i++) {
        newData[head + i] = elementData[i]
      }
      elementData = newData
      head = 0
    }
  }

  return {
    clear: function (): void {
      elementData.fill(0)
      size = 0
      head = 0
    },

    dequeue: function (): number | null {
      if (this.isEmpty()) {
        return null
      }
      const value = elementData[head]
      head = (head + 1) % elementData.length
      size--
      return value
    },

    enqueue: function (value: number): boolean {
      ensureCapacity()
      const tail = (head + size) % elementData.length
      elementData[tail] = value
      size++
      return true
    },

    isEmpty: function (): boolean {
      return size == 0
    },

    peek: function (): number | null {
      return this.isEmpty()?null:elementData[ (head + this.size() -1) % elementData.length];
    },

    size: function (): number {
      return size
    }

  }
}

export { newArrayIntQueue }
