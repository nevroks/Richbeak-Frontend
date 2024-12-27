import  { useState, useEffect } from 'react';

export default function useDebounce(value:any, delay:number) {
const [debouncedValue, setDebouncedValue] = useState(value);

useEffect(
    () => {
        // Выставить debouncedValue равным value (переданное значение)
        // после заданной задержки
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    },
    // Вызывается снова, только если значение изменится
    // мы так же можем добавить переменную "delay" в массива зависимостей ...
    // ... если вы собираетесь менять ее динамически.
    [value]
);

return debouncedValue;
}