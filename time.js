const now = new Date()

class Time {
  // date
  date() {
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    return year + '-' + this.completion(month) + '-' + this.completion(day);
  }

  // clock
  clock() {
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();
    return this.completion(hour) + ':' + this.completion(minute) + ':' +
      this.completion(second);
  }

  // start
  start() {
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    return year + '-' + this.completion(month) + '-' + this.completion(1);
  }

  // diff
  diff(index) {
    let next = now;
    next.setDate(next.getDate() + index);
    const year = next.getFullYear();
    const month = next.getMonth() + 1;
    const day = next.getDate();
    return year + '-' + this.completion(month) + '-' + this.completion(day);
  }

  // completion
  completion(data) {
    return data < 10 ? '0' + data : data;
  }
}

const time = new Time();
export default time