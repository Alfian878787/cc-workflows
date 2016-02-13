class Cache {
    constructor({ maxAge }) {
        this.map = new Map();
        this.maxAge = maxAge;
    }

    has(id) {
        return !!this.get(id);
    }

    get(id) {
        if (!this.map.has(id)) {
            return;
        }

        let { timestamp, data } = this.map.get(id);
        if (Date.now() - timestamp > this.maxAge) {
            return;
        }

        return {
            data,
            timestamp
        };
    }

    set(id, data) {
        this.map.set(id, {
            timestamp: Date.now(),
            data
        });
    }
}

export default Cache;
