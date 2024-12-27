type Dictionary<T> = { [key: string]: T };

export default function makeDictionary<T extends string | number>(array: T[]): Dictionary<number> {
    const dictionary: Dictionary<number> = {};

    for (const element of array) {
        if (dictionary[element]) {
            dictionary[element]++;
        } else {
            dictionary[element] = 1;
        }
    }

    return dictionary;
}

