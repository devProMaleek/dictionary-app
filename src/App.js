import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import Definition from './components/definitions';
import './App.css';

function App() {
  const [wordsData, setWordsData] = useState([]);
  const [randomWord, setRandomWord] = useState([]);
  const [loading, setLoading] = useState(true);

  const axiosInstance = axios.create({
    baseURL: `https://api.dictionaryapi.dev/api/v2/entries/en/`,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const handleChange = async (value) => {
    if (value.length) {
      try {
        const response = await getWordMeaning(value);
        setWordsData(response.data);
      } catch (error) {}
    }
  };

  useEffect(() => {
    getRandomWordMeaningHandler();
  }, []);

  useEffect(() => {
    if (randomWord.length > 0 || wordsData.length > 0) {
      setLoading(false);
    }
  }, [randomWord.length, wordsData.length]);

  const getRandomWordMeaningHandler = async () => {
    try {
      const randomResp = await getRandomWordMeaning();
      setRandomWord(randomResp.data);
    } catch (error) {}
  };

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 800);
    };
  };

  async function getWordMeaning(word) {
    return axiosInstance.get(`/${word}`);
  }

  async function getRandomWordMeaning() {
    return axios.get(`https://random-words-api.vercel.app/word`);
  }

  const optimizedFn = useCallback(debounce(handleChange), []);

  return loading ? (
    <div className="spinner-border text-success"></div>
  ) : (
    <>
      <Definition optimizedFn={optimizedFn} wordsData={wordsData} randomWord={randomWord} />
    </>
  );
}

export default App;
