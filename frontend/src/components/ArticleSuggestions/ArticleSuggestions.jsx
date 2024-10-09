// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ArticleSuggestions = ({ diagnosis }) => {
//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchArticles = async () => {
//       setLoading(true);
//       try {
//         const prompt = `
//           Suggest 2 informative health articles for a patient with ${diagnosis} in the following format:
//           Jason Response: {
//             Title: <Title of the article>,
//             Url: <The URL of the article (ensure it's a valid and accessible link)>,
//             Summary: <Summary of the article>,
//             Image: <Direct link to an image related to the article (ensure it's a usable image URL for embedding)>
//           }
//         `;
//         const response = await axios.post(
//           'https://api.openai.com/v1/chat/completions',
//           {
//             model: 'gpt-3.5-turbo', // or 'gpt-4'
//             messages: [
//               { role: 'user', content: prompt }
//             ],
//             max_tokens: 400, // Increase tokens to allow for more content
//             temperature: 0.5,
//           },
//           {
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
//             },
//           }
//         );

//         // Access the response content properly for chat completion
//         const articleSuggestions = response.data.choices[0].message.content;
        
//         // Assuming the response is a string formatted in a structured way (e.g., JSON or CSV)
//         console.log("AI Respose DATA: ", articleSuggestions);
//         const formattedArticles = parseArticleSuggestions(articleSuggestions); // You'll need to implement this function
//         console.log("FORMATTED AI Respose DATA: ", formattedArticles);

//         setArticles(formattedArticles);
//       } catch (err) {
//         console.error("ERROR ", err); 
//         setError('Error fetching suggestions');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (diagnosis) {
//       fetchArticles();
//     }
//   }, [diagnosis]);

//   const parseArticleSuggestions = (suggestions) => {
//     const articleRegex = /Jason Response:\s*{[^}]+}/g;
//     const matches = suggestions.match(articleRegex);
  
//     if (!matches) return [];
//     const articlesArray = matches.map((match) => {
//       // Use another regex or simple string replacement to extract fields
//       const titleMatch = match.match(/Title:\s*"([^"]+)"/);
//       const urlMatch = match.match(/Url:\s*"([^"]+)"/);
//       const summaryMatch = match.match(/Summary:\s*"([^"]+)"/);
//       const imageMatch = match.match(/Image:\s*"([^"]+)"/);
      
//       console.log("Parsed data: ", titleMatch, urlMatch, summaryMatch, imageMatch);
//       return {
//         title: titleMatch ? titleMatch[1].trim() : '',
//         url: urlMatch ? urlMatch[1].trim() : '',
//         summary: summaryMatch ? summaryMatch[1].trim() : '',
//         imageUrl: imageMatch ? imageMatch[1].trim() : ''
//       };
//     });
  
//     // Return the top 2 articles
//     return articlesArray.slice(0, 2);
  
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div>
//     <h3>Suggested Articles for {diagnosis}</h3>
//     <ul>
//       {articles.map((article, index) => (
//         <li key={index}>
//           <h4>{article.title}</h4>
//           <a href={article.url} target="_blank" rel="noopener noreferrer">Read More</a>
//           <p>{article.summary}</p>
//           {article.imageUrl && <img src={article.imageUrl} alt={`Image for ${article.title}`} />}
//         </li>
//       ))}
//     </ul>
//   </div>

//   );
// };

// export default ArticleSuggestions;

// AI SUGGESTIONS USING SCRAPING

import axios from 'axios';
import { useState, useEffect } from 'react';

// const diagnosis = "Diabetes";
const fetchArticles = async (diagnosis) => {
  try {
    const response = await axios.get(`/scrape`, {
      params: { diagnosis }
    });
    console.log(response.data); // Check if you're receiving the response
  } catch (error) {
    console.error('Error fetching articles:', error);
  }
};

const ArticleSuggestions = ({ diagnosis }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // if (diagnosis) {
      fetchArticles(diagnosis).then((data) => setArticles(data));
    // }
  });

  return (
    <div>
      <h3>Suggested Articles for {diagnosis}</h3>
      <ul>
        {articles.map((article, index) => (
          <li key={index}>
            <a href={article.link}>{article.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleSuggestions;