class Flashcard {
  constructor(front, back, topic = null) {
    this._front = front;
    this._back = back;
    this._topic = topic;
    this._showFront = true;
  }

  toString() {
    return `${this._front}, ${this._back}, ${this._topic}`;
  }

  get front() {
    return this._front;
  }

  set front(front) {
    this._front = front;
  }

  get back() {
    return this._back;
  }

  set back(back) {
    this._back = back;
  }

  get topic() {
    return this._topic;
  }

  set topic(topic) {
    this._topic = topic;
  }

  get showFront() {
    return this._showFront;
  }

  set showFront(showFront) {
    this._showFront = showFront;
  }

  flip() {
    this._showFront = !this._showFront;
    return this._showFront ? this._front : this._back;
  }
}
