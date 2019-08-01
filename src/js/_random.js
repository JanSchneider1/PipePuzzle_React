module.exports = {
    randomInt : function randomInt(...probabilities){
        if (probabilities.length === 0){
            throw Error('Probabilities cannot be empty');
        }
        if (probabilities.reduce((previous, current) => { return previous + current }) !== 1.0){
            throw Error('Probabilities ' + probabilities + " don't add up to 1.0s");
        }
        if (!probabilities.every(i => i >= 0)){
            throw Error('Probabilities ' + probabilities + " aren't allowed to contain negative numbers");
        }
        const random = Math.random();
        let sumOfProbabilities = probabilities[0];
        for (let i=1; i<=probabilities.length; i++){
            if (random < sumOfProbabilities){
                return i-1;
            }
            sumOfProbabilities += probabilities[i];
        }
    }
};