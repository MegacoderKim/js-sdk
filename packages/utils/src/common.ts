export const indexBy = (array: any[], key: string = 'id') => {
    return array.reduce((acc, item) => {
        return {...acc, [item[key]]: item}
    }, {})
}