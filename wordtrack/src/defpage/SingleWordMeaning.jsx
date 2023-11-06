const SingleWordMeaning = ({ meaningEntry }) => {
  let defCount = 1;
  let idCounter = 1;
  return (
    <>
      {/* <h3>{JSON.stringify(meaningEntry)}</h3> */}
      <div>
        <h3>Part of Speech: {meaningEntry["partOfSpeech"]}</h3>
        {meaningEntry["definitions"].map((x) => (
          <div key={idCounter++}>
            <p>
              {`Definition ${defCount++}`} {x["definition"]}
            </p>{" "}
            {x["example"] && <p>Exmaple: {x["example"]}</p>}
            {x.synonyms || (
              <div>
                Synonyms:
                <ul>
                  {x.synonyms.map((x) => (
                    <li key={idCounter++}>{x}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* <div>{JSON.stringify(meaningEntry)}</div> */}
      <hr />
    </>
  );
};

export default SingleWordMeaning;
