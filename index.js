module.sevem = class Sevem {
  constructor() {
    this.events = new Map();
  }

  emit(name, data) {
    if (!name) { throw 'Missing name argument.'; }
    const event = this.events.get(name);
    if (!event) { throw 'Event name does not exist.'; }
    if (data) { event.forEach(c => c(data)); }
    else { event.forEach(c => c()); }
  }

  on(name, callback) {
    if (!name) { throw 'Missing name argument.'; }
    if (!callback) { throw 'Missing callback argument.'; }
    if (!this.events.get(name)?.add(callback)) {
      this.events.set(name, new Set([callback]));
    }
  }

  off(name, callback) {
    if (!name) { throw 'Missing name argument.'; }
    if (!callback) { throw 'Missing callback argument.'; }
    this.events.get(name)?.delete(callback);
  }

  clear() {
    this.events.clear();
  }

  get state() {
    return new Map(this.events);
  }
}
