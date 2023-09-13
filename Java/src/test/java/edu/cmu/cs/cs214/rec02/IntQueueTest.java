package edu.cmu.cs.cs214.rec02;

import org.junit.Before;
import org.junit.Test;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Scanner;

import static org.junit.Assert.*;


/**
 * TODO: Write more unit tests to test the implementation of ArrayIntQueue
 * for the {@link LinkedIntQueue} and
 * {@link ArrayIntQueue} classes, as described in the handout. The
 * {@link ArrayIntQueue} class contains a few bugs. Use the tests you wrote for
 * the {@link LinkedIntQueue} class to test the {@link ArrayIntQueue}
 *
 * @author Alex Lockwood, George Guo
 */
public class IntQueueTest {

    private IntQueue mQueue;
    private List<Integer> testList;

    /**
     * Called before each test.
     */
    @Before
    public void setUp() {
        // comment/uncomment these lines to test each class
        // mQueue = new LinkedIntQueue();
        mQueue = new ArrayIntQueue();

        testList = new ArrayList<>(List.of(1, 2, 3));
    }

    @Test
    public void testIsEmpty() {
        assertTrue(mQueue.isEmpty());
    }

    @Test
    public void testNotEmpty() {
        mQueue.enqueue(1);
        assertFalse(mQueue.isEmpty());
    }

    @Test
    public void testPeekEmptyQueue() {
        assertNull(mQueue.peek());
    }

    @Test
    public void testPeekNoEmptyQueue() {
        Integer input = 1;
        mQueue.enqueue(input);
        assertEquals(input, mQueue.peek());
    }

    @Test
    public void testEnqueue() {
        for (int i = 0; i < testList.size(); i++) {
            mQueue.enqueue(testList.get(i));
            assertEquals(testList.get(0), mQueue.peek());
            assertEquals(i + 1, mQueue.size());
        }
    }

    @Test
    public void testDequeue() {
        testList.forEach(n -> mQueue.enqueue(n));
        for (int i = 0; i < testList.size(); i++) {
            assertEquals(testList.get(i), mQueue.dequeue());
            assertEquals(testList.size() - i - 1, mQueue.size());
        }
    }

    @Test
    public void testContent() throws IOException {
        InputStream in = new FileInputStream("src/test/resources/data.txt");
        try (Scanner scanner = new Scanner(in)) {
            scanner.useDelimiter("\\s*fish\\s*");

            List<Integer> correctResult = new ArrayList<>();
            while (scanner.hasNextInt()) {
                int input = scanner.nextInt();
                correctResult.add(input);
                System.out.println("enqueue: " + input);
                mQueue.enqueue(input);
            }

            for (Integer result : correctResult) {
                assertEquals(mQueue.dequeue(), result);
            }
        }
    }

    @Test
    public void testEnsureCapacity() {
        // these test cases aim to create test cases that 
        // queue tail index is before head index, and the queue is full at the same time
        // Finally, enque and make it extend. 
        List<Integer> enqueTestCases1 = Arrays.asList(0,1,2,3,4,5,6,7,8,9);
        List<Integer> enqueTestCases2 = Arrays.asList(10,11,12,13,14,15,16,17,18,19);
        List<Integer> answer = Arrays.asList(5,6,7,8,9,10,11,12,13,14,15,16,17,18,19);
        // first enque 10 items;
        enqueTestCases1.forEach(item -> {
            mQueue.enqueue(item);
        });
        // deque 5 items;
        int dequeTimes = 5;
        while(dequeTimes-->0) {
            mQueue.dequeue();
        }
        // add 10 items, force queue to extend
        enqueTestCases2.forEach(item -> {
            mQueue.enqueue(item);
        });
        answer.forEach(ans -> {
            Integer temp = mQueue.dequeue();
            assertEquals(temp, ans);
        });

        
    }

    @Test
    public void testClear() {
        testList.forEach(item -> mQueue.enqueue(item));
        mQueue.clear();
        assertTrue(mQueue.isEmpty());
    }

    @Test
    public void testNullDeque() {
        testList.forEach(item -> mQueue.enqueue(item));
        for (int i = 0; i < testList.size(); i++) {
            mQueue.dequeue();
        }
        int testTimes = 4;
        while(testTimes-->0) {
            Integer res = mQueue.dequeue();
            assertNull(res);
            res = mQueue.peek();
            assertNull(res);
        }
    }


}
