class Node {
    constructor(data) {
      this.data = data;
      this.left = null;
      this.right = null;
    }
  }
  

  class Tree {
    constructor(array) {
      this.root = this.buildTree(array);
    }
  
    buildTree(array) {
      const uniqueSortedArray = [...new Set(array)].sort((a, b) => a - b);
      return this._buildTreeHelper(uniqueSortedArray);
    }
  
    _buildTreeHelper(array) {
      if (array.length === 0) return null;
  
      const midIndex = Math.floor(array.length / 2);
      const rootNode = new Node(array[midIndex]);
  
      rootNode.left = this._buildTreeHelper(array.slice(0, midIndex));
      rootNode.right = this._buildTreeHelper(array.slice(midIndex + 1));
  
      return rootNode;
    }
  
    insert(value) {
      this.root = this._insertNode(this.root, value);
    }
  
    _insertNode(node, value) {
      if (!node) return new Node(value);
  
      if (value < node.data) {
        node.left = this._insertNode(node.left, value);
      } else if (value > node.data) {
        node.right = this._insertNode(node.right, value);
      }
  
      return node;
    }
  
    deleteItem(value) {
      this.root = this._deleteNode(this.root, value);
    }
  
    _deleteNode(node, value) {
      if (!node) return null;
  
      if (value < node.data) {
        node.left = this._deleteNode(node.left, value);
      } else if (value > node.data) {
        node.right = this._deleteNode(node.right, value);
      } else {
        if (!node.left) return node.right;
        if (!node.right) return node.left;
  
        const minNode = this._findMinNode(node.right);
        node.data = minNode.data;
        node.right = this._deleteNode(node.right, minNode.data);
      }
  
      return node;
    }
  
    _findMinNode(node) {
      while (node.left) {
        node = node.left;
      }
      return node;
    }
  
    find(value) {
      return this._findNode(this.root, value);
    }
  
    _findNode(node, value) {
      if (!node) return null;
  
      if (value < node.data) {
        return this._findNode(node.left, value);
      } else if (value > node.data) {
        return this._findNode(node.right, value);
      } else {
        return node;
      }
    }
  
    levelOrder(callback) {
      if (!callback) throw new Error('Callback is required');
  
      const queue = [this.root];
      while (queue.length > 0) {
        const node = queue.shift();
        callback(node);
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }
    }
  
    inOrder(callback) {
      if (!callback) throw new Error('Callback is required');
      this._inOrderHelper(this.root, callback);
    }
  
    _inOrderHelper(node, callback) {
      if (node === null) return;
      this._inOrderHelper(node.left, callback);
      callback(node);
      this._inOrderHelper(node.right, callback);
    }
  
    preOrder(callback) {
      if (!callback) throw new Error('Callback is required');
      this._preOrderHelper(this.root, callback);
    }
  
    _preOrderHelper(node, callback) {
      if (node === null) return;
      callback(node);
      this._preOrderHelper(node.left, callback);
      this._preOrderHelper(node.right, callback);
    }
  
    postOrder(callback) {
      if (!callback) throw new Error('Callback is required');
      this._postOrderHelper(this.root, callback);
    }
  
    _postOrderHelper(node, callback) {
      if (node === null) return;
      this._postOrderHelper(node.left, callback);
      this._postOrderHelper(node.right, callback);
      callback(node);
    }
  
    height(node) {
      if (!node) return -1;
      return 1 + Math.max(this.height(node.left), this.height(node.right));
    }
  
    depth(node) {
      let depth = 0;
      let current = this.root;
      while (current !== node) {
        if (node.data < current.data) {
          current = current.left;
        } else {
          current = current.right;
        }
        depth++;
      }
      return depth;
    }
  
    isBalanced() {
      return this._isBalancedHelper(this.root);
    }
  
    _isBalancedHelper(node) {
      if (!node) return true;
  
      const leftHeight = this.height(node.left);
      const rightHeight = this.height(node.right);
  
      if (Math.abs(leftHeight - rightHeight) > 1) return false;
  
      return this._isBalancedHelper(node.left) && this._isBalancedHelper(node.right);
    }
  
    rebalance() {
      const nodesArray = [];
      this.inOrder(node => nodesArray.push(node.data));
      this.root = this.buildTree(nodesArray);
    }
  }

  const randomNumbers = () => Array.from({ length: 15 }, () => Math.floor(Math.random() * 100));

const tree = new Tree(randomNumbers());
console.log('Initial tree (level-order):');
tree.levelOrder(node => console.log(node.data));

console.log('Is the tree balanced?', tree.isBalanced());

console.log('In-order traversal:');
tree.inOrder(node => console.log(node.data));

console.log('Pre-order traversal:');
tree.preOrder(node => console.log(node.data));

console.log('Post-order traversal:');
tree.postOrder(node => console.log(node.data));

console.log('Unbalancing the tree by adding several numbers > 100.');
tree.insert(150);
tree.insert(200);
tree.insert(250);

console.log('Is the tree balanced after unbalancing?', tree.isBalanced());

console.log('Rebalancing the tree...');
tree.rebalance();
console.log('Is the tree balanced after rebalancing?', tree.isBalanced());

console.log('In-order traversal after rebalancing:');
tree.inOrder(node => console.log(node.data));

console.log('Pre-order traversal after rebalancing:');
tree.preOrder(node => console.log(node.data));

console.log('Post-order traversal after rebalancing:');
tree.postOrder(node => console.log(node.data));


const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
  
  // Example to use it:
  prettyPrint(tree.root);
  