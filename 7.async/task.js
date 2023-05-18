class AlarmClock {

  constructor() {

    this.alarmCollection = [];

    this.intervalId = null;

  }

 

  addClock(time, callback, id) {

    if (!time || !callback) {

      throw new Error('Отсутствуют обязательные аргументы');

    }

 

    const foundAlarm = this.alarmCollection.find(alarm => alarm.id === id);

    if (foundAlarm) {

      console.warn('Уже присутствует звонок с таким id');

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

    const initialLength = this.alarmCollection.length;

    const foundAlarm = this.alarmCollection.find(alarm => alarm.time === id);

    if (!foundAlarm) {

      // Если звонок с указанным временем не был найден, то выходим из метода

      return false;

    }

 

    this.alarmCollection = this.alarmCollection.filter(alarm => alarm.id !== id && alarm.time !== foundAlarm.time);

    return initialLength !== this.alarmCollection.length;

  }

 

  getCurrentFormattedTime() {

    const now = new Date();

    const hours = now.getHours().toString().padStart(2, '0');

    const minutes = now.getMinutes().toString().padStart(2, '0');

    return ${hours}:${minutes};

  }

 

  start() {

    if (this.intervalId) {

      return;

    }

 

    this.intervalId = setInterval(() => {

      const currentTime = this.getCurrentFormattedTime();

      this.alarmCollection.forEach(alarm => {

        if (alarm.time === currentTime && alarm.canCall) {

          alarm.canCall = false;

          alarm.callback();

        }

      });

    }, 1000);

  }

 

  stop() {

    clearInterval(this.intervalId);

    this.intervalId = null;

  }

 

  resetAllCalls() {

    this.alarmCollection.forEach(alarm => alarm.canCall = true);

  }

 

  clearAlarms() {

    if (this.alarmCollection.length === 0) {

      return;

    }

 

    this.stop();

    this.alarmCollection = [];

  }

}
