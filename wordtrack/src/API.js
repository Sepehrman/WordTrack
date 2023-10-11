async function getWordDefinition(word) {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await response.json();
    console.log(data[0].word);
    return data[0].meanings[0].definitions.map((definition) => definition.definition);
}

export { getWordDefinition };
