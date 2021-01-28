export default function useLocalStorage(key: string): [() => any, (any) => void] {
    function getValue() {
        if (!localStorage)
            console.log('Error: You trying to access localStore in server side.')
        return JSON.parse(localStorage.getItem(key))
    }

    function setValue(object: any) {
        if (!localStorage)
            console.log('Error: You trying to access localStore in server side.')
        localStorage.setItem(key, JSON.stringify(object))
    }

    return [ getValue, setValue ]
}