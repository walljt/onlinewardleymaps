import ParseError from './ParseError';

export default class BaseStrategyRunner {
	constructor(data, config) {
		this.data = data;
		this.keyword = config.keyword;
		this.containerName = config.containerName;
		this.decorators = [];
	}
	addDecorator(fn) {
		this.decorators.push(fn);
	}
	apply() {
		let lines = this.data.trim().split('\n');
		let elementsToReturn = [];
		for (let i = 0; i < lines.length; i++) {
			try {
				const element = lines[i];
				if (element.trim().indexOf(this.keyword) === 0) {
					let baseElement = {
						id: 1 + i,
						line: 1 + i,
					};
					this.decorators.forEach(f => f(baseElement, element));
					elementsToReturn.push(baseElement);
				}
			} catch (err) {
				throw new ParseError(i);
			}
		}
		return { [this.containerName]: elementsToReturn };
	}
}