// @ts-nocheck
const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));

function Saga(fns) {
	this.fns = fns;
	this.pause = false;
}

Saga.prototype.start = async function (callback, time = 5000) {
	const isArray = Array.isArray(this.fns);

	while (!this.pause) {
		if (this.pause) break;
		const datas = isArray ? await Promise.all(this.fns.map((fn) => fn())) : await this.fns();
		callback(datas);
		await delay(time);
	}
};

Saga.prototype.stop = function () {
	this.pause = true;
};

export default Saga;
