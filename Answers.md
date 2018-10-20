## Questions

1. What are the order of insertions/removals for the following data structures?
   - **Stack** The last item inserted/pushed is the first removed/popped.
   - **Queue** The first item inserted/pushed is the first removed/popped.
2. What is the retreival time complexity for the following data structures?
   - **Linked List** O(n) where n is the number of input.
   - **Hash Table** O(n) where n is the number of input.
   - **Binary Search Trees** O(log n) where n is the number of input.
3. What are some advantages to using a Hash Tables over an array in JavaScript?
   - If searching for a key/value in a large data set, a hash table reduces search time. For example, an array of 100 elements could potentially take one hundred iterations. A hash table on the other hand would only take 2 log 100 iterations which is substantially less.
