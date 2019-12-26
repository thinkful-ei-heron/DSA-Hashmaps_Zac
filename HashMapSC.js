'use strict';

class _Node {
	constructor(key = null, value = null, next = null) {
		this.key = key;
		this.value = value;
		this.next = next;
	}

}

class HashMapSC {
	constructor(initialCapacity = 8) {
		this.length = 0;
		this._hashTable = [];
		this._capacity = initialCapacity;
	}

	get(key) {
		const hash = HashMap._hashString(key);
		const index = hash % this._capacity;
		if (this._hashTable[index] === NULL) {
			return -1;
		}
		else {
			let node = this._hashTable[index];
			while (node !== NULL && node.key !== key) {
				node = node.next;
			}
			if (node === NULL)
				return -1;
			else
				return node.value;
		}
	}

	set(key, value) {
		const loadRatio = (this.length + 1) / this._capacity;
		if (loadRatio > HashMapSC.MAX_LOAD_RATIO) {
			this._resize(this._capacity * HashMapSC.SIZE_RATIO);
		}
		//Find the slot where this key should be in
		const hash = HashMapSC._hashString(key);
		const index = hash % this._capacity;

		if (!this._hashTable[index] === undefined) {
			this._hashTable[index] = {};
			this._hashTable[index].next = new _Node(key, value, null);
			this.length++;
		}
		else {
			let node = this._hashTable[index];
			while (node.next !== null && node.key !== key) {
				node = node.next;
			}
			if (node.key === key) {
				node.value = value;
				this.length++;
			}
			else {
				node.next = new _Node(key, value, null);
				this._ength++;
			}
		}
	}

	delete(key) {
		const hash = HashMap._hashString(key);
		const index = hash % this._capacity;
		let previous = null;
		let current = this._hashTable[index];

		if (this._hashTable[index] !== undefined) {
			while (current.next !== null && current.key !== key) {
				previous = current;
				current = current.next;
			}
			if (current === null) {
				console.log('Item not found');
				return;
			}
			if (current.key === key) {
				previous.next = current.next;
				this.length--;
			}
		}
	}

	_findSlot(key) {
		const hash = HashMapSC._hashString(key);
		const index = hash % this._capacity;
		let slot = this._hashTable[index];

		if (!slot) {
			return this._hashTable[index] = { key };
		}
		if (slot.key === key)
			return slot;

		while (slot.next) {
			slot = slot.next;
			if (slot.key == key)
				return slot;
		}

		return slot.next = { key };
	}

	_resize(size) {
		const oldSlots = this._hashTable;
		this._capacity = size;
		// Reset the length - it will get rebuilt as you add the items back
		this.length = 0;
		this._hashTable = [];

		for (let i = 0; i < oldSlots.length; i++) {
			for (let slot = oldSlots[i]; slot; slot = slot.next) {
				if (!slot.deleted) this.insert(slot.key, slot.value);
			}
		}
	}

	static _hashString(string) {
		let hash = 5381;
		for (let i = 0; i < string.length; i++) {
			//Bitwise left shift with 5 0s - this would be similar to
			//hash*31, 31 being the decent prime number
			//but bit shifting is a faster way to do this
			//tradeoff is understandability
			hash = (hash << 5) + hash + string.charCodeAt(i);
			//converting hash to a 32 bit integer
			hash = hash & hash;
		}
		//making sure hash is unsigned - meaning non-negtive number. 
		return hash >>> 0;
	}
}
HashMapSC.MAX_LOAD_RATIO = 0.5;
HashMapSC.SIZE_RATIO = 3;

module.exports = HashMapSC;