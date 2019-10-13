const OPEN = 'open';
const CLOSE = 'close';

function bracketsConfigMapper(brackets) {
    var prettyConfig = {};
    prettyConfig[OPEN] = {};
    prettyConfig[CLOSE] = {};
    brackets.forEach(function(bracket){
        if (bracket.length == 2) {
            var isSame = bracket[0] === bracket[1];
            prettyConfig[OPEN][bracket[0]] = {
                close: bracket[1],
                isSame: isSame
            };
            prettyConfig[CLOSE][bracket[1]] = {
                open: bracket[0],
                isSame: isSame
            };
        }
    });
    return prettyConfig;
}

module.exports = function check(str, bracketsConfig) {
    var testFlow = '';
    const config = bracketsConfigMapper(bracketsConfig);
    var isCorrect = true;
    var index = 0;
    while (isCorrect && index < str.length) {
        if (config[OPEN][str.charAt(index)]) {
             if (config[OPEN][str.charAt(index)].isSame) {
                 if (testFlow !== '') {
                     if (testFlow.charAt(testFlow.length - 1) === str.charAt(index)) {
                         testFlow = testFlow.substring(0, testFlow.length - 1);
                     } else {
                         testFlow = testFlow + str.charAt(index);
                     }
                 } else {
                     testFlow = testFlow + str.charAt(index);
                 }
             } else {
                 testFlow = testFlow + str.charAt(index);
             }
        } else {
            if (testFlow !== '') {
                if (config[CLOSE][str.charAt(index)]) {
                    if (testFlow.charAt(testFlow.length - 1) === config[CLOSE][str.charAt(index)][OPEN]) {
                        testFlow = testFlow.substring(0, testFlow.length - 1);
                    } else {
                        isCorrect = false;
                    }
                } else {
                    isCorrect = false;
                }
            } else {
                isCorrect = false;
            }
        }
        index++;
    }
    return isCorrect && testFlow === '';
};
