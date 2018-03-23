import * as _ from 'underscore';

export const NameCase = (name: string) => {
    if(name && typeof name == 'string') {
        let words = name.split(' ');
        words = _.map(words, word => {
            let uppercase = word.toUpperCase();
            let lowercase = word.toLowerCase();
            if(word == uppercase || word == lowercase) {
                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            } else {
                return word
            }
        });
        let newName = _.reduce(words, (string, word) => {
            return `${string} ${word}`
        }, '');
        return newName
    } else {
        return name
    }

}