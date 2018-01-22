/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */

/*
Full Disclosure:  This is completely broken.  The notes don't necessarily match up because I made the
notes on the original code and then tried to change it to implement the linked list (with terrible execution).  After
hours of breaking this code I've come to the realization that I won't be able to do this at my current understanding.
I started to hit undo repeatedly (I suppose this is why commits are preferable...) to get back to a point where I hadn't
demolished it and realized I had just confused myself more.

Conceptually, and at what I assume is a basic level, I understand how both a hash table and a linked list are formed.  One is a
table based on a hashed key with indexed buckets holding a list of values, either via an array or a linked list (and I'm sure other
data types).  A linked list is an object with a head and tail reference; it holds nodes that are comprised of data and a pointer
to the next node object.

I think (emphasis on the I, this (a) may not actually be the case, and (b) may only be the case for me) the assignment
would have been better if it had just been "create a hash table with buckets made of linked lists from scratch" because transforming
one to the other just confused me to no end.  Had I not struggled with this for hours, I may have tried this, but I thought that
would defeat the purpose of the sprint challenge.  Not to mention, when reading over the channels for a clue as to what I was doing
so wrong, an instructor said at some point that you shouldn't spend more than 4 hours on this and I'm far passed that.

I realize we weren't expected to do this perfectly, but if this was a pass/fail type of thing, there is no doubt into which this would
fall...
*/
const { LimitedArray, getIndexBelowMax } = require('./hash-table-helpers');
const LinkedList = require('./hash-table-helpers2');

class HashTable {
  constructor(limit = 8) {
    this.limit = limit;
    this.storage = new LimitedArray(this.limit);
    // Do not modify anything inside of the constructor
  }

  // presumably don't need to touch this
  resize() {
    // doubles the original limit
    this.limit *= 2;

    // stores the current hash table in a variable
    const oldStorage = this.storage;

    // resets the constructor with a new Limited Array with double the limit
    this.storage = new LimitedArray(this.limit);

    // takes each bucket, checks whether it exists, and then inserts each key/value into the "new" storage's buckets
    oldStorage.each((bucket) => {
      if (!bucket) return;
      bucket.forEach((pair) => {
        this.insert(pair[0], pair[1]);
      });
    });
  }

  // presumably don't need to touch this
  capacityIsFull() {
    let fullCells = 0;

  // if a bucket exists, increments the count
    this.storage.each((bucket) => {
      if (bucket !== undefined) fullCells++;
    });

    // returns boolean value if the limit has hit 75% or not
    return fullCells / this.limit >= 0.75;
  }

  // Adds the given key, value pair to the hash table
  // Fetch the bucket associated with the given key using the getIndexBelowMax function
  // If no bucket has been created for that index, instantiate a new bucket and add the key, value pair to that new bucket
  // If the key already exists in the bucket, the newer value should overwrite the older value associated with that key
  insert(key, value) {
    // Checks whether 75% capacity and resizes if so
    if (this.capacityIsFull()) this.resize();

    // Gets the index to put the pair in the proper bucket
    const index = getIndexBelowMax(key.toString(), this.limit);

    // Stores the bucket of the afforemention key's index
    // If the bucket doesn't exist, create new array.
    const bucket = this.storage.get(index) || new LinkedList();

    // Adds the new key value array to the bucket
    bucket.addToTail(key, value);

    // Updates the bucket with the new array of key value pairs
    this.storage.set(index, bucket);
  }
  // Removes the key, value pair from the hash table
  // Fetch the bucket associated with the given key using the getIndexBelowMax function
  // Remove the key, value pair from the bucket
  remove(key) {
    const index = getIndexBelowMax(key.toString(), this.limit);
    const bucket = this.storage.get(index) || new LinkedList();

    let current = bucket.head;
    let next = bucket.head.next;

    // If list is empty
    if (bucket.head === null) return;
    // If single item linked list
    if (bucket.head.next === null) {
      bucket.head = null;
      bucket.tail = null;
    }

    // if the first node's key matches, set the first node to the second
    if (current.key === key) return current = next;

    // as long as current holds a node
    while (next !== null) {
      // if a match
      if (next.key === key) return current.next = next;
      current = next;
      next = next.next;
    }
  }
  // Fetches the value associated with the given key from the hash table
  // Fetch the bucket associated with the given key using the getIndexBelowMax function
  // Find the key, value pair inside the bucket and return the value
  retrieve(key) {
    // Gets the key hash index
    const index = getIndexBelowMax(key.toString(), this.limit);

    // Stores the bucket of the afforemention key
    const bucket = this.storage.get(index) || new LinkedList();

    // variable to store the retrieved key value pair
    let retrieved;

    // If the bucket exists
    if (bucket) {
      // returns the node's value
      const retrieveNode = (node) => {
        // Checks current node
        if (node.key === key) return retrieved = node.value;
        // if last node
        if (node.next === null) return;
        // Recursive call to the the next node (node.next points to the next node)
        return retrieveNode(node.next);
      };
    }

    // returns the value of the retrieved key if it was found, undefined otherwise
    return retrieved ? retrieved[1] : undefined;
  }
}

module.exports = HashTable;
