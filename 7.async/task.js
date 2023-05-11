class AlarmClock {
  constructor() {
    this.alarmCollection = [];
    this.intervalId = null;
  }

  addClock(time, callback, id) {
    if (!time || !callback || !id) {
      throw new Error('Отсутствуют обязательные аргументы');
    }

    if (this.alarmCollection.some((alarm) => alarm.id === id)) {
      console.warn('Уже присутствует звонок на это же время');
      return;
    }

    this.alarmCollection.push({
      id,
      time,
      callback,
      canCall: true
    });
  }

  removeClock(id) {
    const alarmIndex = this.alarmCollection.findIndex((alarm) => alarm.id === id);
    if (alarmIndex !== -1) {
      this.alarmCollection.splice(alarmIndex, 1);
    }
  }

  getCurrentFormattedTime() {
    const date = new Date();
    const hours = date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`;
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
    return `${hours}:${minutes}`;
  }

  start() {
    if (!this.intervalId) {
      this.intervalId = setInterval(() => {
        this.alarmCollection.forEach((alarm) => {
          if (alarm.time === this.getCurrentFormattedTime() && alarm.canCall) {
            alarm.canCall = false;
            alarm.callback();
          }
        });
      }, 1000);
    }
  }

  stop() {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  resetAllCalls() {
    this.alarmCollection.forEach((alarm) => (alarm.canCall = true));
  }

  clearAlarms() {
    this.stop();
    this.alarmCollection = [];
  }
}
