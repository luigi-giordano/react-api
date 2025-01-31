import { useState, useEffect } from 'react';
import axios from 'axios'

// const categories = ['Hobby', 'Casa', 'Lavoro', 'Studio'];

const availableTags = [
  { id: 1, name: 'Tempo libero' },
  { id: 2, name: 'Shopping' },
  { id: 3, name: 'Cibo' },
  { id: 4, name: 'Casa' },
  { id: 5, name: 'Sport' },
  { id: 6, name: 'Tecnologia' },
];

const defaultArticleData = {
  title: '',
  content: '',
  // category: '',
  tags: [],
  image: '',
  published: false,
};

const ArticleList = () => {
  const [articleList, setArticleList] = useState([]);

  //chiamare l'api e aggiornare 
  const fetchArticles = () => {
    axios.get('http://localhost:3001/posts/')
      .then(res => {
        setArticleList(res.data);
      })
      .catch(err => {
        console.error('Errore durante il recupero degli articoli:', err);
      });
  }
  const [formData, setFormData] = useState(defaultArticleData);

  useEffect(() => {
    fetchArticles()
  }, [])


  useEffect(() => {
    if (formData.published) {
      alert('Hai selezionato "Pubblica articolo", pertanto sarà visibile al pubblico.');
    }
  }, [formData.published]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevArticle) => ({
      ...prevArticle,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleTagChange = (tagName) => {
    setFormData((prevArticle) => {
      const updatedTags = prevArticle.tags.includes(tagName)
        ? prevArticle.tags.filter((tag) => tag !== tagName)
        : [...prevArticle.tags, tagName];
      return { ...prevArticle, tags: updatedTags };
    });
  };



  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:3001/posts", formData)
      .then((res) => {
        console.log("Articolo inviato con successo :", res.data);

        // Aggiorna la lista degli articoli con il nuovo articolo aggiunto
        setArticleList(res.data);

        // Resetta il form dopo l'invio
        setFormData(defaultArticleData);
      })
      .catch((err) => {
        console.error("Errore durante l'invio dell'articolo :", err);
      });
  };

  // useEffect(() => {
  //   console.log(articleList.map((article, index) => article.title));

  //   console.log(articleList)
  // }, [articleList]);

  const handleRemoveArticle = (index) => {
    setArticleList((prevList) => prevList.filter((_, i) => i !== index));
  };

  return (
    <div className="container my-5">
      <form onSubmit={handleSubmit}>
        <div className="title d-flex mb-3 justify-content-center">
          <h2>Il tuo Blog</h2>
        </div>

        <div className="mb-3">
          <label className="form-label">Titolo</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Inserisci il titolo"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contenuto</label>
          <textarea
            name="content"
            className="form-control"
            value={formData.content}
            onChange={handleInputChange}
            placeholder="Inserisci il contenuto"
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Tags</label>
          <div>
            {availableTags.map(({ id, name }) => (
              <div key={id} className="form-check form-check-inline">
                <input
                  type="checkbox"
                  id={id}
                  className="form-check-input"
                  checked={formData.tags.includes(name)}
                  onChange={() => handleTagChange(name)}
                />
                <label className="form-check-label" htmlFor={id}>
                  {name}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Immagine (URL)</label>
          <input
            type="text"
            name="image"
            className="form-control"
            value={formData.image}
            onChange={handleInputChange}
            placeholder="Inserisci URL dell'immagine"
          />
        </div>

        <div className="form-check mb-3">
          <input
            type="checkbox"
            name="published"
            className="form-check-input"
            id="published"
            checked={formData.published}
            onChange={handleInputChange}
          />
          <label className="form-check-label" htmlFor="published">
            Pubblica articolo
          </label>
        </div>

        <button className="btn btn-primary" type="submit">
          Aggiungi
        </button>
      </form>


      {/* <div className="mb-3">
          <label className="form-label">Categoria</label>
          <select
            name="category"
            className="form-select"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="">Seleziona una categoria</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div> */}


      <ul className="list-group mt-4">
        {articleList.map((article, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>{article.title}</span>
            <img src={`http://localhost:3001${article.image}`} alt="Immagine" />
            <i
              className="fa-solid fa-trash pointer"
              onClick={() => handleRemoveArticle(index)}
            ></i>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleList;
