export const camelCaseToTitle = (text: string) => {
    if(!text){
        return ''
    }
    const result = text.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
}

export const findAndRemoveStr = (text: string, textToRemove: string) => {
    if (!text) {
        return ''
    }
    return text.replace(textToRemove, '')
}