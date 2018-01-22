class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  // Creates new node object
  addToTail(key, value) {
    const newNode = {
      key,
      value,
      next: null,
    };

    // If the list is empty
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
      return;
    }

    // If the list isn't empty
    this.tail.next = newNode;
    this.tail = newNode;
  }

  // Removes node
  remove(key) {
    let current = this.head;
    let next = this.head.next;

    // If list is empty
    if (this.head === null) return;
    // If single item linked list
    if (this.head.next === null) {
      this.head = null;
      this.tail = null;
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

  // Checks the linked list for the given value
  contains(key) {
    // If the list is empty
    if (this.head === null) return false;
    // Recursive function if the linked list is populated
    const searchLinkedList = (node) => {
      // Checks if the current node's value matches the value we are seaching for.
      if (node.key === key) return true;
      // If the value doesn't match, and the current node points to null, it is the last node
      if (node.next === null) return false;
      // Recursive call to the the next node (node.next points to the next node)
      return searchLinkedList(node.next);
    };
    // returns Recursive function that searches the length list starting at the head
    return searchLinkedList(this.head);
  }
}

module.exports = LinkedList;
