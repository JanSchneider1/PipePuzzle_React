/* The % operator is wrong in JS as it doesn't return the mathematically right answer for negative values
 * See https://web.archive.org/web/20090717035140if_/javascript.about.com/od/problemsolving/a/modulobug.htm
 * So here we extend the Math object by a correct implementation */
Math.mod = (value, divisior) => {
    return ((value%divisior)+divisior)%divisior;
};

class TimerClock{
    constructor(startMinutes, startSeconds){
        if (startMinutes < 0 || startSeconds < 0){
            throw new Error(`Cannot create timer with negative time (startMinutes = ${startMinutes}, startSeconds = ${startSeconds})`);
        }
        if (startSeconds > 59){
            throw new Error(`Cannot create timer with startSeconds above 59 (startMinutes = ${startMinutes}, startSeconds = ${startSeconds})`);
        }
        this.startMinutes = startMinutes;
        this.startSeconds = startSeconds;
        this.resetTime();
    }

    resetTime(){
        this.minutes = this.startMinutes;
        this.seconds = this.startSeconds;
    }

    getFormattedTime(){
        return `${this.minutes}:${this.seconds < 10 ? `0${this.seconds}` : this.seconds}`;
    }

    subSeconds(secondsToSubtract){
        if (secondsToSubtract < 0) {
            throw new Error(`Cannot subtract negative number (secondsToSubtract = ${secondsToSubtract}) from timer`);
        }
        this.minutes -= Math.ceil((secondsToSubtract - this.seconds) / 60);
        this.seconds = Math.mod(this.seconds - secondsToSubtract, 60);
        // 0:00 is smallest time value
        if (this.minutes < 0) {
            this.minutes = 0;
            this.seconds = 0;
        }
        return this;
    }

    addSeconds(secondsToAdd){
        if (secondsToAdd < 0) {
            throw new Error(`Cannot add negative number (secondsToAdd = ${secondsToAdd}) to timer`);
        }
        this.minutes += Math.floor((this.seconds + secondsToAdd) / 60);
        this.seconds = (this.seconds + secondsToAdd) % 60;
        return this;
    }
}

module.exports = { TimerClock };