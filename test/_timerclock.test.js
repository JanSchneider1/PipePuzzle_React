const { TimerClock } = require('../src/js/_timerclock.js');

test("Creating timer clock with startMinutes = 3 and startSeconds = 40 creates timer with minutes = 3 and seconds = 40", () => {
    // When
    const timerClock = new TimerClock(3, 40);
    // Then
    expect(timerClock.minutes).toBe(3);
    expect(timerClock.seconds).toBe(40);
});

describe('Test if creating timer throws expected errors when given invalid arguments', () => {
    test("Timer with negative startMinutes throws error", () => {
        expect(() => { new TimerClock(-2, 20)})
            .toThrow(new Error("Cannot create timer with negative time (startMinutes = -2, startSeconds = 20)"));
    });
    test("Timer with negative startSeconds throws error", () => {
        expect(() => { new TimerClock(2, -20)})
            .toThrow(new Error("Cannot create timer with negative time (startMinutes = 2, startSeconds = -20)"));
    });
    test("Timer with StartSeconds = 60 throws error", () => {
        expect(() => { new TimerClock(1, 60)})
            .toThrow(new Error("Cannot create timer with startSeconds above 59 (startMinutes = 1, startSeconds = 60)"));
    });
    test("Timer with StartSeconds = 61 throws error", () => {
        expect(() => { new TimerClock(1, 61)})
            .toThrow(new Error("Cannot create timer with startSeconds above 59 (startMinutes = 1, startSeconds = 61)"));
    });
});

describe('Test adding seconds to timer results in the expected time', () => {
    test.each`
    secondsToAdd | currentMinutes | currentSeconds | expectedMinutes | expectedSeconds
    ${1}         | ${0}           | ${0}           | ${0}            | ${1}
    ${60}        | ${0}           | ${0}           | ${1}            | ${0}
    ${61}        | ${0}           | ${0}           | ${1}            | ${1}
    ${51}        | ${1}           | ${10}          | ${2}            | ${1}
    ${121}       | ${1}           | ${10}          | ${3}            | ${11}
    
    `('Adding $secondsToAdd to timer with $currentMinutes min and $currentSeconds sec results in time $expectedMinutes min and $expectedSeconds sec',
        ({ secondsToAdd, currentMinutes, currentSeconds, expectedMinutes, expectedSeconds }) => {
            // Given
            const timerClock = new TimerClock(currentMinutes, currentSeconds);
            // When
            timerClock.addSeconds(secondsToAdd);
            // Then
            expect(timerClock.minutes).toBe(expectedMinutes);
            expect(timerClock.seconds).toBe(expectedSeconds);
    })
});

test("Adding negative number to timer throws error", () => {
    expect(() => { new TimerClock(0, 0).addSeconds(-1)})
        .toThrow(new Error("Cannot add negative number (secondsToAdd = -1) to timer"));
});

describe('Test subtracting seconds from timer results in the expected time', () => {
    test.each`
    secondsToSubtract | currentMinutes | currentSeconds | expectedMinutes | expectedSeconds
    ${1}              | ${0}           | ${0}           | ${0}            | ${0}
    ${1}              | ${0}           | ${20}          | ${0}            | ${19}
    ${20}             | ${1}           | ${0}           | ${0}            | ${40}
    ${60}             | ${1}           | ${0}           | ${0}            | ${0}
    ${61}             | ${2}           | ${1}           | ${1}            | ${0}
    ${121}            | ${3}           | ${1}           | ${1}            | ${0}
    
    `('Subtracting $secondsToSubtract from timer with $currentMinutes min and $currentSeconds sec results in time $expectedMinutes min and $expectedSeconds sec',
        ({ secondsToSubtract, currentMinutes, currentSeconds, expectedMinutes, expectedSeconds }) => {
            // Given
            const timerClock = new TimerClock(currentMinutes, currentSeconds);
            // When
            timerClock.subSeconds(secondsToSubtract);
            // Then
            expect(timerClock.minutes).toBe(expectedMinutes);
            expect(timerClock.seconds).toBe(expectedSeconds);
        })
});

test("Subtracting negative number from timer throws error", () => {
    expect(() => { new TimerClock(0, 0).subSeconds(-1)})
        .toThrow(new Error("Cannot subtract negative number (secondsToSubtract = -1) from timer"));
});

describe('Test getting formatted time results in the expected string', () => {
    test.each`
    currentMinutes | currentSeconds    | expectedString
    ${0}           | ${0}              | ${"0:00"}     
    ${12}          | ${0}              | ${"12:00"}     
    ${1}           | ${12}             | ${"1:12"}  
    ${0}           | ${7}              | ${"0:07"}             
    
    `('Formatted string of timer with $currentMinutes min and $currentSeconds sec is $expectedString',
        ({ currentMinutes, currentSeconds, expectedString }) => {
            // Given
            const timerClock = new TimerClock(currentMinutes, currentSeconds);
            // When
            const resultString = timerClock.getFormattedTime();
            // Then
            expect(resultString).toEqual(expectedString);
        })
});