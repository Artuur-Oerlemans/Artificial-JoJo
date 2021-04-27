class AbstractDiceTreeNode {

	getMaxValue() {
	}

	getResultTree() {

	}

	static getDiceTree(diceRollDescription) {
		if (/^(\d+)d([1-9]\d*)$/.test(diceRollDescription)) {
			let times = diceRollDescription.match(/^(\d+)d([1-9]\d*)$/)[1];
			let sides = diceRollDescription.match(/^(\d+)d([1-9]\d*)$/)[2];
			return new DiceTreeRoll(times, sides)
		}
		else if (/^-?\d+$/.test(diceRollDescription)) {
			return new DiceTreeValue(diceRollDescription);
		} else {
			return new DiceTreeValue("-1");
		}
	}
}

class DiceTreeRoll extends AbstractDiceTreeNode {
	constructor(timesDescription, sidesDescription) {
		super();
		this.times = AbstractDiceTreeNode.getDiceTree(timesDescription);
		this.sides = AbstractDiceTreeNode.getDiceTree(sidesDescription);
	}

	getMaxValue() {
		return this.sides.getMaxValue() * this.times.getMaxValue();
	}
}

class DiceTreeValue extends AbstractDiceTreeNode {
	constructor(value) {
		super();
		this.value = parseInt(value);
	}

	getMaxValue() {
		return this.value;
	}
}

class DiceTreeRoot extends AbstractDiceTreeNode {
	constructor(diceRollDescription) {
		super();
		this.child = AbstractDiceTreeNode.getDiceTree(diceRollDescription);
	}

	getMaxValue() {
		return this.child.getMaxValue();
	}
}

export default DiceTreeRoot;