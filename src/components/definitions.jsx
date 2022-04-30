import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';

const Definition = ({optimizedFn, wordsData, randomWord}) => {
  return (
    <>
      <div className="body">
        <div className="dictionary-section my-3">
          <div className="search-btn">
            <form>
              <label htmlFor="search"></label>
              <input
                id="search"
                type="search"
                pattern=".*\S.*"
                required
                onChange={(e) => optimizedFn(e.target.value)}
                placeholder="Search here ..."
              />
              <span className="caret"></span>
            </form>
          </div>
          <div className="shadow bg-white rounded p-4 my-3">
            {wordsData.length > 0
              ? wordsData?.map((wordData, index) => {
                  let { meanings, phonetics } = wordData;
                  return (
                    <div key={index}>
                      <div className="pb-3 mb-2 border-bottom">
                        <h1 className="searchWord mb-0 ms-2">{wordData.word}</h1>{' '}
                        <span className="ms-3 d-block mb-2">[{wordData.phonetic}]</span>
                        <audio controls>
                          <source
                            src={phonetics && (phonetics[0]?.audio || phonetics[1]?.audio)}
                            type="audio/mp3"
                          />
                        </audio>
                      </div>
                      {meanings.map((meaning, index) => {
                        let { definitions } = meaning;
                        return (
                          <div key={index}>
                            <h5>
                              <i>{meaning.partOfSpeech}</i>
                            </h5>
                            {definitions.map((definition, index) => {
                              return (
                                <div key={index} className="definition">
                                  <p className="mb-0">
                                    <span className="me-2">
                                      <i> {index + 1}.</i>
                                    </span>
                                    {definition.definition}
                                  </p>
                                  {definition.example ? (
                                    <div className="examples mt-0 mb-2">
                                      <h6 className="mb-0">example(s)</h6>
                                      <span>{definition.example}</span>
                                    </div>
                                  ) : (
                                    ''
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>
                  );
                })
              : randomWord?.map((item, index) => {
                  return (
                    <div key={index}>
                      <div className="pb-3 mb-2 border-bottom">
                        <h1 className="searchWord mb-0">{item.word}</h1>{' '}
                        <span>[{item.pronunciation}]</span>
                      </div>
                      <p>{item.definition}</p>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Definition;
