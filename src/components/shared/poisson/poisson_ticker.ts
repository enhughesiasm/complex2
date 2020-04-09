export default class PoissonTicker {
	interval: number;
	callback: Function;

	lifeTimeMs: number = 0;
	nextFireTime: number = 0;

	constructor(intervalMs: number, callback: Function) {
		this.interval = intervalMs;
		this.callback = callback;
		if (intervalMs < 0) {
			throw new Error(intervalMs + ' should be a non-negative number.');
		}
		this.reset();
	}

	reset() {
		this.lifeTimeMs = 0;
		this.nextFireTime = this.sample(this.interval);
	}

	sample(mean: number) {
		// this is the actual poisson distribution
		return -Math.log(Math.random()) * mean;
	}

	changeInterval(interval: number) {
		this.interval = interval;
	}

	tick(delta_ms: number) {
		this.lifeTimeMs += delta_ms;

		if (this.lifeTimeMs > this.nextFireTime) {
			this.reset();
			this.callback();
		}
	}
}
