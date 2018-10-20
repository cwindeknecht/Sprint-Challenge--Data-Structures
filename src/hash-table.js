/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */

const { LimitedArray, getIndexBelowMax } = require('./hash-table-helpers');
const LinkedList = require('./hash-table-helpers2');

class HashTable {
  constructor(limit = 8) {
    this.limit = limit;
    this.storage = new LimitedArray(this.limit);
    // Do not modify anything inside of the constructor
  }

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
